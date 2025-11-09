'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import { Building, Hotel, MapPin, Plus, BarChart3, Users, Eye, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    properties: 0,
    hotels: 0,
    travels: 0,
    blogs: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/v1/login');
      return;
    }
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      } else if (response.status === 401) {
        router.push('/v1/login');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-800">Dashboard</h1>
          <p className="text-primary-600 mt-2">Welcome back, Super Admin</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
                <p className="text-gray-600">Manage real estate listings</p>
              </div>
              <Building className="h-8 w-8 text-primary-500" />
            </div>
            <div className="mt-4 flex space-x-2">
              <Link href="/v1/properties" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                Manage
              </Link>
              <Link href="/v1/properties/new" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-secondary-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Hotels</h3>
                <p className="text-gray-600">Manage hotel listings</p>
              </div>
              <Hotel className="h-8 w-8 text-secondary-600" />
            </div>
            <div className="mt-4 flex space-x-2">
              <Link href="/v1/hotels" className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors">
                Manage
              </Link>
              <Link href="/v1/hotels/new" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Travel</h3>
                <p className="text-gray-600">Manage travel packages</p>
              </div>
              <MapPin className="h-8 w-8 text-primary-600" />
            </div>
            <div className="mt-4 flex space-x-2">
              <Link href="/v1/travel" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Manage
              </Link>
              <Link href="/v1/travel/new" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-secondary-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Blogs</h3>
                <p className="text-gray-600">Manage blog posts</p>
              </div>
              <FileText className="h-8 w-8 text-secondary-700" />
            </div>
            <div className="mt-4 flex space-x-2">
              <Link href="/v1/blogs" className="bg-secondary-700 text-white px-4 py-2 rounded-lg hover:bg-secondary-800 transition-colors">
                Manage
              </Link>
              <Link href="/v1/blogs/new" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Contact Inquiries</h3>
                <p className="text-gray-600">Manage customer inquiries</p>
              </div>
              <Users className="h-8 w-8 text-primary-700" />
            </div>
            <div className="mt-4">
              <Link href="/v1/contacts" className="bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors">
                View Inquiries
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Total Properties</span>
                <span className="font-bold text-primary-600">{loading ? '...' : stats.properties}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Total Hotels</span>
                <span className="font-bold text-secondary-600">{loading ? '...' : stats.hotels}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Travel Packages</span>
                <span className="font-bold text-primary-600">{loading ? '...' : stats.travels}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Blog Posts</span>
                <span className="font-bold text-secondary-700">{loading ? '...' : stats.blogs}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Contact Inquiries</span>
                <span className="font-bold text-primary-700">{loading ? '...' : stats.contacts}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link href="/properties" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">View Properties Page</h3>
                <p className="text-gray-600 text-sm">See how properties appear to visitors</p>
              </Link>
              <Link href="/hotels" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">View Hotels Page</h3>
                <p className="text-gray-600 text-sm">See how hotels appear to visitors</p>
              </Link>
              <Link href="/travel" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">View Travel Page</h3>
                <p className="text-gray-600 text-sm">See how travel packages appear to visitors</p>
              </Link>
              <Link href="/blog" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">View Blog Page</h3>
                <p className="text-gray-600 text-sm">See how blog posts appear to visitors</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}