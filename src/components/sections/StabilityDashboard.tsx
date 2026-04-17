import React, { useEffect, useState } from 'react';

interface DeviceStats {
  device_id: string;
  total_records: number;
  last_record: string;
  avg_csq: number | null;
  registered_count: number;
}

export default function StabilityDashboard() {
  const [stats, setStats] = useState<DeviceStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // En producción: /api/stats (Nginx proxea)
        // En desarrollo: https://benrigom.site/api/stats (API remota)
        const apiUrl = import.meta.env.PROD 
          ? '/api/stats' 
          : 'https://benrigom.site/api/stats';
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  if (stats.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No devices connected yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((device) => (
          <div key={device.device_id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{device.device_id}</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total records</span>
                <span className="font-mono font-bold text-blue-600">{device.total_records}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg CSQ</span>
                <span className="font-mono font-bold text-green-600">
                  {device.avg_csq ? device.avg_csq.toFixed(1) : 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Registered</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {device.registered_count}/{device.total_records}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Last update</p>
                <p className="text-sm font-mono text-gray-700">
                  {new Date(device.last_record).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          ℹ️ Dashboard updates every 5 seconds. Total devices: <strong>{stats.length}</strong>
        </p>
      </div>
    </div>
  );
}
