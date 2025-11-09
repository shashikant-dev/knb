'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Bed, Bath, Car, RectangleHorizontal, MessageCircle } from 'lucide-react';
import ImageCarousel from '../../../components/ImageCarousel';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/properties/${params.id}`);
      const data = await res.json();
      if (data.success) {

        setProperty(data.data);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <ImageCarousel images={property.images} title={property.name} />
            <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
            <div className="flex items-center justify-between mb-4">
              {property.location && property.mapsUrl && (
                <a
                  href={property.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </a>
              )}
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  property.category === 'rent'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {property.category === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  property.type === 'residential'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {property.type === 'residential' ? 'Residential' : 'Commercial'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <p className={`text-3xl font-bold ${
                property.category === 'rent' ? 'text-green-600' : 'text-orange-600'
              }`}>{property.price}</p>
              <a
                href="/contact?service=property"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Inquire Now
              </a>
            </div>

            {property.type === 'residential' && (
              <div className="flex space-x-6 mb-6">
                {property.beds && (
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.beds} Bedrooms</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.baths} Bathrooms</span>
                  </div>
                )}
                {property.parking && (
                  <div className="flex items-center">
                    <Car className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.parking} Parking</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center">
                    <RectangleHorizontal className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.area}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {property.videoUrl && typeof property.videoUrl === 'string' && property.videoUrl.trim() && (property.videoUrl.includes('youtube.com') || property.videoUrl.includes('youtu.be')) && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Property Video</h2>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={property.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {property.mapsUrl && typeof property.mapsUrl === 'string' && property.mapsUrl.trim() && (property.mapsUrl.includes('maps.google.com') || property.mapsUrl.includes('goo.gl/maps') || property.mapsUrl.includes('google.com/maps')) && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 mb-4">View this property's location on Google Maps</p>
                  <a
                    href={property.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}