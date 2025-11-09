'use client';
import { useEffect, useState } from 'react';

export default function ContactChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/contacts/stats');
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching contact stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading chart...</div>;
  if (!data) return <div className="text-center py-4">No data available</div>;

  const maxCount = Math.max(...data.last7Days.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">New Inquiries (Last 7 Days)</h3>
      
      {/* Bar Chart */}
      <div className="flex items-end justify-between h-32 mb-4">
        {data.last7Days.map((day, index) => (
          <div key={index} className="flex flex-col items-center flex-1 mx-1">
            <div className="text-xs text-gray-600 mb-1">{day.count}</div>
            <div 
              className="bg-blue-500 w-full rounded-t"
              style={{ 
                height: `${(day.count / maxCount) * 100}%`,
                minHeight: day.count > 0 ? '4px' : '2px'
              }}
            />
            <div className="text-xs text-gray-500 mt-1">{day.label}</div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{data.statusCounts.new}</div>
          <div className="text-xs text-gray-600">New</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{data.statusCounts.contacted}</div>
          <div className="text-xs text-gray-600">Contacted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{data.statusCounts.resolved}</div>
          <div className="text-xs text-gray-600">Resolved</div>
        </div>
      </div>
    </div>
  );
}