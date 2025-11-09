'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, Star, CheckCircle } from 'lucide-react';
import ImageCarousel from '../../../components/ImageCarousel';

export default function TravelDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [travel, setTravel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTravel();
    }
  }, [id]);

  const fetchTravel = async () => {
    try {
      const response = await fetch(`/api/travel/${id}`);
      if (response.ok) {
        const result = await response.json();
        setTravel(result.data);
      }
    } catch (error) {
      console.error('Error fetching travel:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    router.push('/contact?service=travel');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!travel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Travel Package Not Found</h1>
          <p className="text-gray-600">The travel package you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gray-900">
        <img
          src={travel.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=400&fit=crop'}
          alt={travel.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{travel.name}</h1>
            <p className="text-xl md:text-2xl capitalize">{travel.category}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Details</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{travel.description}</p>
              
              {travel.highlights && travel.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {travel.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {travel.includes && travel.includes.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {travel.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
              <ImageCarousel images={travel.images} title={travel.name} />
            </div>

            {/* Video Section */}
            {travel.videoUrl && typeof travel.videoUrl === 'string' && travel.videoUrl.trim() && (travel.videoUrl.includes('youtube.com') || travel.videoUrl.includes('youtu.be')) && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Video</h2>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={travel.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Location Section */}
            {travel.mapsUrl && typeof travel.mapsUrl === 'string' && travel.mapsUrl.trim() && (travel.mapsUrl.includes('maps.google.com') || travel.mapsUrl.includes('goo.gl/maps') || travel.mapsUrl.includes('google.com/maps')) && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 mb-4">View this destination's location on Google Maps</p>
                  <a
                    href={travel.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {travel.price}
                </div>
                <p className="text-gray-600">per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{travel.destination}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{travel.duration}</span>
                </div>
                {travel.maxGuests && (
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-primary-500" />
                    <span>Max {travel.maxGuests} guests</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleBookNow}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}