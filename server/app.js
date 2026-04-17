const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbDir = '/data/db';
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(path.join(dbDir, 'stability.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
  initializeDatabase();
});

// Initialize database table
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS stability_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id VARCHAR(64) NOT NULL,
      timestamp DATETIME NOT NULL,
      received_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      csq INTEGER,
      network VARCHAR(64),
      network_type VARCHAR(32),
      registered BOOLEAN,
      uptime_sec INTEGER,
      attempt INTEGER,
      source_ip VARCHAR(45)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Database table ready');
    }
  });

  // Create indexes
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_device_id_timestamp
    ON stability_records (device_id, timestamp DESC)
  `, (err) => {
    if (err) console.error('Error creating index 1:', err);
  });

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_timestamp
    ON stability_records (timestamp DESC)
  `, (err) => {
    if (err) console.error('Error creating index 2:', err);
  });
}

// Validation middleware
function validatePayload(req, res, next) {
  const requiredFields = [
    'device_id',
    'timestamp',
    'csq',
    'network',
    'network_type',
    'registered',
    'uptime_sec',
    'attempt'
  ];

  const missing = requiredFields.filter(field => !(field in req.body));

  if (missing.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      missing: missing
    });
  }

  // Validate field types
  const { device_id, timestamp, csq, network, network_type, registered, uptime_sec, attempt } = req.body;

  if (typeof device_id !== 'string' || device_id.length > 64) {
    return res.status(400).json({ error: 'Invalid device_id' });
  }

  if (typeof timestamp !== 'string') {
    return res.status(400).json({ error: 'Invalid timestamp format' });
  }

  if (csq !== null && (typeof csq !== 'number' || csq < 0 || csq > 31)) {
    return res.status(400).json({ error: 'Invalid csq value (must be 0-31 or null)' });
  }

  if (typeof network !== 'string' || network.length > 64) {
    return res.status(400).json({ error: 'Invalid network' });
  }

  if (typeof network_type !== 'string' || network_type.length > 32) {
    return res.status(400).json({ error: 'Invalid network_type' });
  }

  if (typeof registered !== 'boolean') {
    return res.status(400).json({ error: 'Invalid registered value' });
  }

  if (typeof uptime_sec !== 'number' || uptime_sec < 0) {
    return res.status(400).json({ error: 'Invalid uptime_sec' });
  }

  if (typeof attempt !== 'number' || attempt < 1) {
    return res.status(400).json({ error: 'Invalid attempt value (must be >= 1)' });
  }

  next();
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main endpoint to receive stability data
app.post('/api/stability', validatePayload, (req, res) => {
  const { device_id, timestamp, csq, network, network_type, registered, uptime_sec, attempt } = req.body;
  const source_ip = req.ip || req.connection.remoteAddress || 'unknown';
  const received_at = new Date().toISOString();

  const query = `
    INSERT INTO stability_records
    (device_id, timestamp, received_at, csq, network, network_type, registered, uptime_sec, attempt, source_ip)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [device_id, timestamp, received_at, csq, network, network_type, registered, uptime_sec, attempt, source_ip];

  db.run(query, params, function(err) {
    if (err) {
      console.error('Error inserting record:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log(`[${received_at}] Received from ${device_id} (attempt ${attempt}, CSQ ${csq})`);
    res.status(200).json({ status: 'ok', id: this.lastID });
  });
});

// Get latest records for a device
app.get('/api/stability/:device_id', (req, res) => {
  const { device_id } = req.params;
  const limit = parseInt(req.query.limit) || 100;

  const query = `
    SELECT * FROM stability_records
    WHERE device_id = ?
    ORDER BY timestamp DESC
    LIMIT ?
  `;

  db.all(query, [device_id, limit], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Get stats for all devices
app.get('/api/stats', (req, res) => {
  const query = `
    SELECT
      device_id,
      COUNT(*) as total_records,
      MAX(timestamp) as last_record,
      AVG(csq) as avg_csq,
      SUM(CASE WHEN registered = 1 THEN 1 ELSE 0 END) as registered_count
    FROM stability_records
    GROUP BY device_id
    ORDER BY MAX(timestamp) DESC
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
db.serialize(() => {
  app.listen(PORT, () => {
    console.log(`Stability API server running on port ${PORT}`);
    console.log(`POST  /api/stability      - Receive stability data`);
    console.log(`GET   /api/health         - Health check`);
    console.log(`GET   /api/stability/:id  - Get latest records for device`);
    console.log(`GET   /api/stats          - Get stats for all devices`);
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Closing database connection...');
  db.close(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});
