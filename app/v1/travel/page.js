'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';
import ConfirmModal from '../../../components/ConfirmModal';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function AdminTravelPage() {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async () => {
    try {
      const res = await fetch('/api/travel');
      const data = await res.json();
      if (data.success) {
        setTravels(data.data);
      }
    } catch (error) {
      console.error('Error fetching travel packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`/api/travel/${deleteModal.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        fetchTravels();
        console.log('Travel package deleted successfully');
      } else {
        console.error('Delete failed:', data.error || 'Unknown error');
        alert(`Failed to delete travel package: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting travel package:', error);
      alert('Network error occurred while deleting travel package');
    }
    setDeleteModal({ isOpen: false, id: null, name: '' });
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Travel Packages</h1>
            <p className="text-gray-600 mt-2">Add, edit, and manage travel packages</p>
          </div>
          <Link
            href="/v1/travel/new"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Package
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr. No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {travels.map((travel, index) => (
                <tr key={travel._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{travel.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{travel.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      travel.category === 'luxury' 
                        ? 'bg-primary-100 text-primary-800' 
                        : travel.category === 'adventure'
                        ? 'bg-primary-100 text-primary-800'
                        : travel.category === 'cultural'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-primary-100 text-primary-800'
                    }`}>
                      {capitalize(travel.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{travel.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{travel.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/v1/travel/edit/${travel._id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(travel._id, travel.name)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {travels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No travel packages found.</p>
              <Link
                href="/v1/travel/new"
                className="mt-4 inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Add Your First Package
              </Link>
            </div>
          )}
        </div>
        
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
          onConfirm={handleDeleteConfirm}
          title="Delete Travel Package"
          message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}