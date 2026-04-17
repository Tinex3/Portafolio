import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface DeviceStats {
  device_id: string;
  total_records: number;
  last_record: string;
  avg_csq: number | null;
  registered_count: number;
}

interface DeviceDetail {
  id: number;
  device_id: string;
  timestamp: string;
  received_at: string;
  csq: number | null;
  network: string;
  network_type: string;
  registered: boolean;
  uptime_sec: number;
  attempt: number;
  source_ip: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DeviceStats[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.PROD ? '/api' : 'https://benrigom.site/api';

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${apiUrl}/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
        if (data.length > 0 && !selectedDevice) {
          setSelectedDevice(data[0].device_id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch device details
  useEffect(() => {
    if (!selectedDevice) return;

    const fetchDetails = async () => {
      setDetailsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/stability/${selectedDevice}?limit=50`);
        if (!response.ok) throw new Error('Failed to fetch details');
        const data = await response.json();
        setDeviceDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading details');
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchDetails();
    const interval = setInterval(fetchDetails, 5000);
    return () => clearInterval(interval);
  }, [selectedDevice]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold">Network Stability Monitor</h1>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
            ← Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded-lg">
            Error: {error}
          </div>
        )}

        {/* Device Stats Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Connected Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((device) => (
              <button
                key={device.device_id}
                onClick={() => setSelectedDevice(device.device_id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedDevice === device.device_id
                    ? 'bg-blue-900 border-blue-500'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <h3 className="font-semibold mb-2 truncate">{device.device_id}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Records:</span>
                    <span className="text-blue-400 font-mono">{device.total_records}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg CSQ:</span>
                    <span className="text-green-400 font-mono">
                      {device.avg_csq ? device.avg_csq.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Registered:</span>
                    <span className="text-yellow-400 font-mono">
                      {device.registered_count}/{device.total_records}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Device Details */}
        {selectedDevice && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-4">
              Details: <span className="text-blue-400">{selectedDevice}</span>
            </h2>

            {detailsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : deviceDetails.length === 0 ? (
              <p className="text-gray-400">No records found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-700">
                    <tr className="text-gray-400">
                      <th className="text-left py-3 px-2">Timestamp</th>
                      <th className="text-left py-3 px-2">CSQ</th>
                      <th className="text-left py-3 px-2">Network</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Registered</th>
                      <th className="text-left py-3 px-2">Attempt</th>
                      <th className="text-left py-3 px-2">Uptime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {deviceDetails.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-700 transition">
                        <td className="py-3 px-2 font-mono text-xs">
                          {new Date(record.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            record.csq === null ? 'bg-gray-700 text-gray-300' :
                            record.csq >= 20 ? 'bg-green-900 text-green-300' :
                            record.csq >= 10 ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {record.csq ?? 'NULL'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs text-gray-300">{record.network}</td>
                        <td className="py-3 px-2 text-xs text-gray-300">{record.network_type}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            record.registered ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                          }`}>
                            {record.registered ? '✓' : '✗'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs font-mono text-gray-300">#{record.attempt}</td>
                        <td className="py-3 px-2 text-xs font-mono text-gray-300">
                          {Math.floor(record.uptime_sec / 60)}m
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {selectedDevice && deviceDetails.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Records</p>
              <p className="text-3xl font-bold text-blue-400">{deviceDetails.length}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Registered Records</p>
              <p className="text-3xl font-bold text-green-400">
                {deviceDetails.filter(d => d.registered).length}
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Avg CSQ</p>
              <p className="text-3xl font-bold text-yellow-400">
                {(deviceDetails
                  .filter(d => d.csq !== null)
                  .reduce((sum, d) => sum + (d.csq || 0), 0) / deviceDetails.filter(d => d.csq !== null).length).toFixed(1)}
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Latest Uptime</p>
              <p className="text-3xl font-bold text-purple-400">
                {Math.floor(deviceDetails[0].uptime_sec / 60)}m
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
