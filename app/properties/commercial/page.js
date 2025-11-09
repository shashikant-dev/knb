'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { MapPin, Building, Square } from 'lucide-react';

export default function CommercialPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties?type=commercial');
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div>
      <PageHeader
        title="Commercial Properties"
        subtitle="Premium office spaces, retail locations, and industrial properties for your business needs."
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=320&fit=crop"
      />

      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {property.images && property.images[0] && (
                  <div className="relative h-48">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{property.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <p className="text-2xl font-bold text-primary-500 mb-4">{property.price}</p>
                  
                  {property.size && (
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.size}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{property.description}</p>
                  
                  {property.features && property.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {property.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Link
                    href={`/properties/${property._id}`}
                    className="inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No commercial properties available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}