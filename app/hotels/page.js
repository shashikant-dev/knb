'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import { BedDouble, MapPin, Star, ArrowRight, Home, Building, ConciergeBell, UtensilsCrossed, Leaf, Sparkles, Hotel, Facebook } from 'lucide-react';

export default function HotelsPage() {
    const [hotels, setHotels] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHotels();
    }, [filter]);

    const fetchHotels = async () => {
        try {
            const url = filter === 'all' ? '/api/hotels' : `/api/hotels?category=${filter}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.success) {
                setHotels(data.data);
            }
        } catch (error) {
            console.error('Error fetching hotels:', error);
        } finally {
            setLoading(false);
        }
    };

    const locations = [
        {
            name: 'Pattaya, Thailand',
            description: 'Vibrant city life meets serene beaches. Explore our collection of luxury hotels and private pool villas.',
            image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&h=400&fit=crop',
            link: '/hotels/pattaya',
        },
        {
            name: 'Phuket, Thailand',
            description: 'Discover stunning coastlines, lush rainforests, and world-class hospitality at our exclusive resorts.',
            image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=400&fit=crop',
            link: '/hotels/phuket',
        },
    ];

    const propertyTypes = [
        { icon: Building, name: 'Luxury Hotels', description: 'Experience world-class service and amenities in prime city and beach locations.' },
        { icon: Home, name: 'Private Villas', description: 'Enjoy ultimate privacy and bespoke luxury in our exclusive, fully-serviced villas.' },
        { icon: BedDouble, name: 'Boutique Guesthouses', description: 'Charming and intimate stays offering a unique and personalized local experience.' },
    ];

    const encoreStandard = [
        { icon: ConciergeBell, title: '5-Star Service', description: 'Our dedicated concierge and staff are available 24/7 to cater to your every need.' },
        { icon: UtensilsCrossed, title: 'Exquisite Dining', description: 'Savor gourmet cuisine crafted by world-class chefs at our on-site restaurants.' },
        { icon: Leaf, title: 'Wellness & Spa', description: 'Rejuvenate your body and mind at our state-of-the-art spa and wellness centers.' },
        { icon: Sparkles, title: 'Impeccable Cleanliness', description: 'We adhere to the highest standards of hygiene for a safe and comfortable stay.' },
    ];

    const galleryImages = [
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop',
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Encore Hotels & Villas"
                subtitle="Experience unparalleled luxury and hospitality at our exquisite properties in Thailand."
                imageUrl="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&h=320&fit=crop"
            />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Hotel Collection</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Discover our carefully curated selection of luxury accommodations.</p>

                        <div className="flex justify-center mb-8">
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 border'}`}
                                >
                                    All Hotels
                                </button>
                                <button
                                    onClick={() => setFilter('luxury')}
                                    className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'luxury' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 border'}`}
                                >
                                    Luxury
                                </button>
                                <button
                                    onClick={() => setFilter('business')}
                                    className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'business' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 border'}`}
                                >
                                    Business
                                </button>
                                <button
                                    onClick={() => setFilter('budget')}
                                    className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base ${filter === 'budget' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 border'}`}
                                >
                                    Budget
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Loading hotels...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {hotels.map((hotel) => (
                                <div key={hotel._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border">
                                    {hotel.images && hotel.images[0] && (
                                        <div className="relative h-48">
                                            <img
                                                src={hotel.images[0]}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span>{hotel.location}</span>
                                        </div>

                                        <div className="flex items-center space-x-4 mb-4">
                                            {hotel.rating && (
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                                    <span>{hotel.rating}/5</span>
                                                </div>
                                            )}
                                            {hotel.rooms && (
                                                <div className="flex items-center">
                                                    <BedDouble className="h-4 w-4 mr-1" />
                                                    <span>{hotel.rooms} rooms</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-2xl font-bold text-primary-500 mb-4">{hotel.price}</p>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{hotel.description}</p>

                                        {hotel.amenities && hotel.amenities.length > 0 && (
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                                                        <span key={index} className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <Link
                                            href={`/hotels/${hotel._id}`}
                                            className="inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && hotels.length === 0 && (
                        <div className="text-center py-12">
                            <Hotel className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No hotels available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">A World of Choice</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Whether you seek a vibrant city hotel, a secluded private villa, or a charming guesthouse, Encore offers the perfect setting for your getaway.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
                        {propertyTypes.map((type, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                <type.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.name}</h3>
                                <p className="text-gray-600">{type.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Encore Standard</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Every stay with Encore is designed for comfort, convenience, and unforgettable memories. We are committed to providing world-class service and amenities.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {encoreStandard.map((standard, index) => (
                            <div key={index} className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <standard.icon className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">{standard.title}</h3>
                                    <p className="text-gray-600">{standard.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">A Glimpse of Luxury</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {galleryImages.map((img, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                <img src={img} alt={`Encore Gallery Image ${index + 1}`} className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Find Your Perfect Getaway</h2>
                    <p className="text-lg text-blue-100 mb-8">Your unforgettable luxury experience is just a click away. Explore our properties and book your stay today.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Link href="/contact?service=hotels" className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                            Book Your Stay <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                        <a href="https://www.facebook.com/encorehotelsvillas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
                            <Facebook className="h-4 w-4 mr-2" />
                            Encore Hotels & Villas
                        </a>
                        <a href="https://www.facebook.com/people/Marine-Paradise-Encore/100067914352467/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
                            <Facebook className="h-4 w-4 mr-2" />
                            Marine Paradise Encore
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}