'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '../../../../../components/AdminLayout';
import ImageUpload from '../../../../../components/ImageUpload';

export default function EditHotelPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    category: 'luxury',
    rating: '',
    rooms: '',
    images: [''],
    amenities: ['']
  });

  useEffect(() => {
    if (params.id) {
      fetchHotel();
    }
  }, [params.id]);

  const fetchHotel = async () => {
    try {
      const res = await fetch(`/api/hotels/${params.id}`);
      const data = await res.json();
      if (data.success) {
        const hotel = data.data;
        setFormData({
          name: hotel.name || '',
          location: hotel.location || '',
          price: hotel.price || '',
          description: hotel.description || '',
          category: hotel.category || 'luxury',
          rating: hotel.rating?.toString() || '',
          rooms: hotel.rooms?.toString() || '',
          images: hotel.images || [],
          amenities: hotel.amenities?.length ? hotel.amenities : ['']
        });
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
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
        rating: formData.rating ? parseInt(formData.rating) : undefined,
        rooms: formData.rooms ? parseInt(formData.rooms) : undefined,
        images: formData.images.filter(img => img.trim() !== ''),
        amenities: formData.amenities.filter(amenity => amenity.trim() !== '')
      };

      const res = await fetch(`/api/hotels/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (res.ok) {
        router.push('/v1/hotels');
      } else {
        alert('Error updating hotel');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating hotel');
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Hotel</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Grand Palace Hotel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Goa, India"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., ₹15,000 per night"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="luxury">Luxury</option>
                <option value="business">Business</option>
                <option value="budget">Budget</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleInputChange}
              placeholder="e.g., 150"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g., Luxury beachfront hotel with world-class amenities, spa services, and fine dining restaurants..."
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <ImageUpload
            images={formData.images}
            onChange={(newImages) => setFormData(prev => ({ ...prev, images: newImages }))}
            label="Hotel Images"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'amenities')}
                  placeholder="e.g., Swimming Pool"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {formData.amenities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField(index, 'amenities')}
                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('amenities')}
              className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Amenity
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/v1/hotels')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Hotel'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}