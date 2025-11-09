'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '../../../../../components/AdminLayout';
import ImageUpload from '../../../../../components/ImageUpload';

export default function EditTravelPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    price: '',
    duration: '',
    description: '',
    category: 'adventure',
    maxGuests: '',
    images: [''],
    includes: [''],
    highlights: ['']
  });

  useEffect(() => {
    if (params.id) {
      fetchTravel();
    }
  }, [params.id]);

  const fetchTravel = async () => {
    try {
      const res = await fetch(`/api/travel/${params.id}`);
      const data = await res.json();
      if (data.success) {
        const travel = data.data;
        setFormData({
          name: travel.name || '',
          destination: travel.destination || '',
          price: travel.price || '',
          duration: travel.duration || '',
          description: travel.description || '',
          category: travel.category || 'adventure',
          maxGuests: travel.maxGuests?.toString() || '',
          images: travel.images || [],
          includes: travel.includes?.length ? travel.includes : [''],
          highlights: travel.highlights?.length ? travel.highlights : ['']
        });
      }
    } catch (error) {
      console.error('Error fetching travel:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedData = {
        ...formData,
        maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : undefined,
        images: formData.images.filter(img => img.trim() !== ''),
        includes: formData.includes.filter(item => item.trim() !== ''),
        highlights: formData.highlights.filter(item => item.trim() !== '')
      };

      const res = await fetch(`/api/travel/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (res.ok) {
        router.push('/v1/travel');
      } else {
        alert('Error updating travel package');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating travel package');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (fetching) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Travel Package</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Golden Triangle Tour"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="e.g., Delhi, Agra, Jaipur"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., ₹45,000 per person"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 7 days"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="adventure">Adventure</option>
                <option value="luxury">Luxury</option>
                <option value="cultural">Cultural</option>
                <option value="beach">Beach</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests</label>
              <input
                type="number"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleInputChange}
                placeholder="e.g., 12"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g., Explore India's most iconic destinations with our comprehensive Golden Triangle tour covering Delhi's historic monuments, Agra's Taj Mahal, and Jaipur's royal palaces..."
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <ImageUpload
            images={formData.images}
            onChange={(newImages) => setFormData(prev => ({ ...prev, images: newImages }))}
            label="Travel Package Images"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package Includes</label>
              {formData.includes.map((item, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'includes')}
                    placeholder="e.g., Flights"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {formData.includes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index, 'includes')}
                      className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('includes')}
                className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Add Item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'highlights')}
                    placeholder="e.g., Temple Tours"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {formData.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index, 'highlights')}
                      className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('highlights')}
                className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Add Highlight
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/v1/travel')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Package'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}