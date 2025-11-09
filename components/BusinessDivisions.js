'use client';
import Link from 'next/link';
import { TrendingUp, Building, Hotel, Plane, Briefcase, ArrowRight } from 'lucide-react';

export default function BusinessDivisions() {
  const divisions = [
    {
      id: 'wealth',
      icon: TrendingUp,
      title: 'KNB Wealth',
      description: 'Comprehensive wealth management and investment solutions for individuals and institutions.',
      href: '/wealth',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      features: ['Trading & Broking', 'Mutual Funds', 'Insurance Services'],
    },
    {
      id: 'properties',
      icon: Building,
      title: 'KNB Properties',
      description: 'Premier real estate development, investment, and management services.',
      href: '/properties',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
      features: ['Property Development', 'Investment Services', 'Management'],
    },
    {
      id: 'hotels',
      icon: Hotel,
      title: 'Encore Hotels & Villas',
      description: 'Luxury hospitality experiences with world-class accommodations.',
      href: '/hotels',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      features: ['Luxury Hotels', 'Premium Villas', 'Guest Houses'],
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'KNB Travel & DMC',
      description: 'Curated travel experiences and destination management services.',
      href: '/travel',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      features: ['Thailand Packages', 'Dubai Tours', 'Flight Booking'],
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business Services',
      description: 'Complete business setup and corporate advisory solutions.',
      href: '/services',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      features: ['Business Setup', 'Corporate Advisory', 'Support Services'],
    },
  ];

  const colorMap = {
    wealth: { text: 'text-primary-600', bg: 'bg-primary-600', bgLight: 'bg-primary-100' },
    properties: { text: 'text-primary-700', bg: 'bg-primary-700', bgLight: 'bg-primary-100' },
    hotels: { text: 'text-secondary-600', bg: 'bg-secondary-600', bgLight: 'bg-secondary-100' },
    travel: { text: 'text-accent-600', bg: 'bg-accent-600', bgLight: 'bg-accent-100' },
    business: { text: 'text-secondary-700', bg: 'bg-secondary-700', bgLight: 'bg-secondary-100' },
  };

  return (
    <section id="business-divisions" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-blue-100/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Business Divisions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering excellence across multiple industries with integrated solutions for your success.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division, index) => {
            const IconComponent = division.icon;
            const colors = colorMap[division.id] || colorMap.wealth;
            
            return (
              <Link
                href={division.href}
                key={division.id}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <img
                    src={division.image}
                    alt={division.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  <div className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`h-7 w-7 ${colors.text}`} />
                  </div>
                  
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {division.title}
                    </h3>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {division.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {division.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className={`px-3 py-1.5 ${colors.bgLight} ${colors.text} text-xs font-semibold rounded-full`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-900 font-semibold group-hover:text-primary-600 transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300`}>
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
                alt="Business Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Discover how our expertise across multiple industries can help you achieve your goals.
              </p>
              <Link 
                href="/contact"
                className="bg-green-600 text-white hover:bg-green-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                Inquire About Our Services
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}