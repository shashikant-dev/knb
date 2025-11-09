'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import { Plane, Map, Sun, ArrowRight, Clock, Users, MapPin, Facebook } from 'lucide-react';

export default function TravelPage() {
    const [travels, setTravels] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTravels();
    }, [filter]);

    const fetchTravels = async () => {
        try {
            const url = filter === 'all' ? '/api/travel' : `/api/travel?category=${filter}`;
            const res = await fetch(url);
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

    const destinations = [
        {
            name: 'Thailand Packages',
            description: 'From the bustling streets of Bangkok to the serene beaches of Phuket, explore the wonders of Thailand.',
            image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop',
            link: '/travel/thailand-packages'
        },
        {
            name: 'Dubai Packages',
            description: 'Experience the futuristic city of Dubai, from towering skyscrapers to desert safaris.',
            image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop',
            link: '/travel/dubai-packages'
        },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="KNB Travel & DMC"
                subtitle="Crafting unforgettable travel experiences. Explore our curated packages to world-class destinations."
                imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=320&fit=crop"
            />
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Travel Packages</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Discover our curated collection of travel experiences.</p>

                        <div className="flex justify-center mb-8">
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-secondary-700 border'}`}
                                >
                                    All Packages
                                </button>
                                <button
                                    onClick={() => setFilter('adventure')}
                                    className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'adventure' ? 'bg-primary-500 text-white' : 'bg-white text-secondary-700 border'}`}
                                >
                                    Adventure
                                </button>
                                <button
                                    onClick={() => setFilter('luxury')}
                                    className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'luxury' ? 'bg-primary-500 text-white' : 'bg-white text-secondary-700 border'}`}
                                >
                                    Luxury
                                </button>
                                <button
                                    onClick={() => setFilter('cultural')}
                                    className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'cultural' ? 'bg-primary-500 text-white' : 'bg-white text-secondary-700 border'}`}
                                >
                                    Cultural
                                </button>
                                <button
                                    onClick={() => setFilter('beach')}
                                    className={`px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'beach' ? 'bg-primary-500 text-white' : 'bg-white text-secondary-700 border'}`}
                                >
                                    Beach
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Loading travel packages...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {travels.map((travel) => (
                                <div key={travel._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border">
                                    {travel.images && travel.images[0] && (
                                        <div className="relative h-48">
                                            <img
                                                src={travel.images[0]}
                                                alt={travel.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{travel.name}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span>{travel.destination}</span>
                                        </div>

                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                <span>{travel.duration}</span>
                                            </div>
                                            {travel.maxGuests && (
                                                <div className="flex items-center">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    <span>Max {travel.maxGuests}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-2xl font-bold text-primary-600 mb-4">{travel.price}</p>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{travel.description}</p>

                                        {travel.includes && travel.includes.length > 0 && (
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {travel.includes.slice(0, 3).map((item, index) => (
                                                        <span key={index} className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <Link
                                            href={`/travel/${travel._id}`}
                                            className="inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                                        >
                                            View Package
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && travels.length === 0 && (
                        <div className="text-center py-12">
                            <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No travel packages available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Travel Solutions</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">From flights to activities, we handle every detail of your journey.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-gray-700 mb-12">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <Plane className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900">Flight Bookings</h3>
                            <p>Competitive fares on leading airlines worldwide.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <Map className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900">Destination Management</h3>
                            <p>Expert local guides and seamless transfers.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <Sun className="h-12 w-12 text-accent-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900">Custom Itineraries</h3>
                            <p>Personalized travel plans tailored to your interests.</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                        <a href="https://www.facebook.com/ChakDePattaya/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                            <Facebook className="h-4 w-4 mr-2" />
                            Chak De Pattaya
                        </a>
                        <a href="https://www.facebook.com/theparadisepattaya/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                            <Facebook className="h-4 w-4 mr-2" />
                            The Paradise Pattaya
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}