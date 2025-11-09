'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, BedDouble, ArrowLeft, Phone, Mail, Calendar, Users, Wifi, Car, Coffee, Utensils, Dumbbell, Waves } from 'lucide-react';
import ImageCarousel from '../../../components/ImageCarousel';

export default function HotelDetailPage() {
    const params = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);


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
                setHotel(data.data);
            }
        } catch (error) {
            console.error('Error fetching hotel:', error);
        } finally {
            setLoading(false);
        }
    };

    const getAmenityIcon = (amenity) => {
        const amenityLower = amenity.toLowerCase();
        if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return Wifi;
        if (amenityLower.includes('parking') || amenityLower.includes('car')) return Car;
        if (amenityLower.includes('coffee') || amenityLower.includes('breakfast')) return Coffee;
        if (amenityLower.includes('restaurant') || amenityLower.includes('dining')) return Utensils;
        if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return Dumbbell;
        if (amenityLower.includes('pool') || amenityLower.includes('spa')) return Waves;
        return Coffee; // default icon
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading hotel details...</p>
                </div>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
                    <Link href="/hotels" className="text-primary-500 hover:text-primary-600">
                        ← Back to Hotels
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/hotels" className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Hotels
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images and Details */}
                    <div className="lg:col-span-2">
                        <ImageCarousel images={hotel.images} title={hotel.name} />

                        {/* Hotel Info */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span className="text-lg">{hotel.location}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-primary-500 mb-2">{hotel.price}</div>
                                    <span className="text-gray-500">per night</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 mb-6">
                                {hotel.rating && (
                                    <div className="flex items-center">
                                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                                        <span className="text-lg font-semibold">{hotel.rating}/5</span>
                                        <span className="text-gray-500 ml-1">Rating</span>
                                    </div>
                                )}
                                {hotel.rooms && (
                                    <div className="flex items-center">
                                        <BedDouble className="h-5 w-5 text-gray-400 mr-1" />
                                        <span className="text-lg font-semibold">{hotel.rooms}</span>
                                        <span className="text-gray-500 ml-1">Rooms</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 text-gray-400 mr-1" />
                                    <span className="text-lg font-semibold">2-4</span>
                                    <span className="text-gray-500 ml-1">Guests</span>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Hotel</h3>
                                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                            </div>
                        </div>

                        {/* Amenities */}
                        {hotel.amenities && hotel.amenities.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Amenities & Services</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {hotel.amenities.map((amenity, index) => {
                                        const IconComponent = getAmenityIcon(amenity);
                                        return (
                                            <div key={index} className="flex items-center">
                                                <IconComponent className="h-5 w-5 text-primary-500 mr-3" />
                                                <span className="text-gray-700">{amenity}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Video Section */}
                        {hotel.videoUrl && typeof hotel.videoUrl === 'string' && hotel.videoUrl.trim() && (hotel.videoUrl.includes('youtube.com') || hotel.videoUrl.includes('youtu.be')) && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Hotel Video</h3>
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                    <iframe
                                        src={hotel.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        {/* Location Section */}
                        {hotel.mapsUrl && typeof hotel.mapsUrl === 'string' && hotel.mapsUrl.trim() && (hotel.mapsUrl.includes('maps.google.com') || hotel.mapsUrl.includes('goo.gl/maps') || hotel.mapsUrl.includes('google.com/maps')) && (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Location</h3>
                                <div className="bg-gray-100 p-6 rounded-lg text-center">
                                    <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-gray-600 mb-4">View this hotel's location on Google Maps</p>
                                    <a
                                        href={hotel.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                                    >
                                        <MapPin className="h-4 w-4 mr-2" />
                                        Open in Google Maps
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Hotel Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                            <div className="text-center mb-6">
                                <div className="text-4xl font-bold text-primary-500 mb-2">{hotel.price}</div>
                                <p className="text-gray-600">per night</p>
                            </div>

                            {hotel.category && (
                                <div className="mb-6">
                                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {hotel.category}
                                    </span>
                                </div>
                            )}

                            <div className="space-y-4 mb-6">
                                {hotel.rating && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Rating</span>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="font-semibold">{hotel.rating}/5</span>
                                        </div>
                                    </div>
                                )}
                                {hotel.rooms && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Available Rooms</span>
                                        <span className="font-semibold">{hotel.rooms}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Max Guests</span>
                                    <span className="font-semibold">2-4 People</span>
                                </div>
                            </div>

                            <Link
                                href={`/contact?service=hotels&hotel=${hotel.name}`}
                                className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors text-center block mb-6"
                            >
                                Book Now
                            </Link>

                            <div className="border-t pt-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <Phone className="h-4 w-4 mr-3 text-primary-500" />
                                        <div>
                                            <p className="text-sm font-medium">Phone</p>
                                            <p className="text-sm">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Mail className="h-4 w-4 mr-3 text-primary-500" />
                                        <div>
                                            <p className="text-sm font-medium">Email</p>
                                            <p className="text-sm">hotels@knbgroup.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start text-gray-600">
                                        <MapPin className="h-4 w-4 mr-3 text-primary-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium">Location</p>
                                            <p className="text-sm">{hotel.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}