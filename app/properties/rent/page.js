'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { MapPin, Bed, Bath, Car, Square, Eye } from 'lucide-react';

export default function RentPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/properties?category=rent'
        : `/api/properties?category=rent&type=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Rent Properties"
        subtitle="Discover premium rental properties including residential and commercial spaces with flexible terms."
        imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=320&fit=crop"
      />

      <div className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Available for Rent</h2>
              <p className="text-gray-600 mt-2">Find your perfect rental property</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('residential')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'residential'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setFilter('commercial')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'commercial'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Commercial
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No rental properties found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div key={property._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={property.images?.[0] || '/assets/images/placeholder-property.jpg'}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        For Rent
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        property.type === 'residential'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {property.type === 'residential' ? 'Residential' : 'Commercial'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-4">{property.price}</div>
                    
                    {property.type === 'residential' && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        {property.beds && (
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.beds} Beds</span>
                          </div>
                        )}
                        {property.baths && (
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.baths} Baths</span>
                          </div>
                        )}
                        {property.parking && (
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-1" />
                            <span>{property.parking}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {property.area && (
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.area}</span>
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                    
                    <Link
                      href={`/properties/${property._id}`}
                      className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}