import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import { Building, Home, DollarSign, Key, ArrowRight, CreditCard, Banknote } from 'lucide-react';

export default function PropertiesPage() {
    const services = [
        {
            icon: CreditCard,
            title: 'Rent Properties',
            description: 'Discover premium rental properties including residential and commercial spaces.',
            link: '/properties/rent',
        },
        {
            icon: Banknote,
            title: 'Outright Properties',
            description: 'Explore properties available for purchase with full ownership rights.',
            link: '/properties/outright',
        },
        {
            icon: Building,
            title: 'Commercial Properties',
            description: 'Explore premium office spaces, retail locations, and industrial properties for your business.',
            link: '/properties/commercial',
        },
        {
            icon: Home,
            title: 'Residential Properties',
            description: 'Find your dream home from our portfolio of luxury villas, apartments, and family houses.',
            link: '/properties/residential',
        },
        {
            icon: DollarSign,
            title: 'Investment Services',
            description: 'Discover high-yield real estate investment opportunities with our expert advisory.',
            link: '/investors',
        },
        {
            icon: Key,
            title: 'Property Management',
            description: 'Comprehensive management services to maintain and enhance the value of your assets.',
            link: '/contact',
        },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="KNB Properties"
                subtitle="Developing and managing premier real estate. Discover exceptional properties and lucrative investment opportunities with us."
                imageUrl="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=320&fit=crop"
            />

            <div className="py-16 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Explore Our Real Estate Divisions</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">We cover the full spectrum of real estate, from groundbreaking developments to expert property management.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <Link href={service.link} key={index} className="group block bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                    <div className="flex-shrink-0 bg-blue-100 p-3 sm:p-4 rounded-full group-hover:bg-blue-200 transition-colors">
                                        <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">{service.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-600 mb-4">{service.description}</p>
                                        <span className="font-semibold text-blue-500 group-hover:underline text-sm sm:text-base">
                                            Explore Now <ArrowRight className="inline h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Find Your Dream Property</h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">Whether you're looking to invest, buy, or lease, our team is ready to assist you. Contact us to explore our exclusive portfolio.</p>
                    <Link href="/contact" className="inline-flex items-center bg-primary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base">
                        Contact Our Real Estate Team
                    </Link>
                </div>
            </div>
        </div>
    );
}