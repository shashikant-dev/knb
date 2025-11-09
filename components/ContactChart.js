'use client';
import { useEffect, useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ContactChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('1y');

  useEffect(() => {
    fetchStats(period);
  }, [period]);

  const fetchStats = async (selectedPeriod) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts/stats?period=${selectedPeriod}`);
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

  const getPeriodTitle = () => {
    switch(period) {
      case '1y': return 'New Inquiries (Last 12 Months)';
      case '30d': return 'New Inquiries (Last 30 Days)';
      case '7d': return 'New Inquiries (Last 7 Days)';
      default: return 'New Inquiries';
    }
  };

  if (loading) return <div className="text-center py-4">Loading chart...</div>;
  if (!data) return <div className="text-center py-4">No data available</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          {getPeriodTitle()}
        </h3>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="1y">Last 12 Months</option>
          </select>
        </div>
      </div>

      {/* Recharts Line Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#374151' }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              name="Total Inquiries"
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="Resolved"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{data.statusCounts.new}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{data.statusCounts.resolved}</div>
          <div className="text-xs text-gray-600">Resolved</div>
        </div>
      </div>
    </div>
  );
}