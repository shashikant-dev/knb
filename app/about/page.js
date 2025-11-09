'use client';

import { useState, useEffect, useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import { FaBullseye, FaEye, FaGem, FaUsers, FaAward, FaLock, FaChartLine, FaBuilding, FaHotel, FaPlane, FaBriefcase, FaGlassCheers } from 'react-icons/fa';

export default function AboutPage() {
  const leadership = [
    { name: 'John S. Carter', title: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces' },
    { name: 'Eleanor Vance', title: 'Group CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces' },
    { name: 'Raj Patel', title: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=200&h=200&fit=crop&crop=faces' },
    { name: 'Samantha Wu', title: 'Head of Operations', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop&crop=faces' },
  ];

  const timeline = [
    { year: '1998', event: 'KNB Group founded with a focus on financial services.', icon: FaChartLine },
    { year: '2005', event: 'Expanded into real estate with KNB Properties.', icon: FaBuilding },
    { year: '2012', event: 'Launched Encore Hotels & Villas in Thailand.', icon: FaHotel },
    { year: '2018', event: 'Established KNB Travel & DMC, offering global travel solutions.', icon: FaPlane },
    { year: '2022', event: 'Introduced Business Setup Support services.', icon: FaBriefcase },
    { year: '2025', event: 'Celebrating over 25 years of diversified excellence.', icon: FaGlassCheers },
  ];

  const values = [
    { icon: FaGem, title: 'Integrity', description: 'Upholding the highest standards of honesty and ethical behavior.' },
    { icon: FaAward, title: 'Excellence', description: 'Consistently delivering superior quality and performance.' },
    { icon: FaLock, title: 'Reliability', description: 'Being a trusted partner for all our clients and stakeholders.' },
  ];

  const timelineRef = useRef(null);
  const [isTimelineVisible, setTimelineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setTimelineVisible(true);
                observer.unobserve(entry.target);
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        }
    );

    if (timelineRef.current) {
        observer.observe(timelineRef.current);
    }

    return () => {
        if (timelineRef.current) {
            observer.unobserve(timelineRef.current);
        }
    };
  }, []);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="About KNB Group"
        subtitle="Forging a legacy of excellence and trust across diverse industries for over a quarter of a century."
        imageUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=320&fit=crop"
      />

      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                Founded in 1998, KNB Group began with a vision to provide unparalleled financial services. Driven by a commitment to excellence and a forward-thinking approach, we have grown from a specialized firm into a diversified global conglomerate.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Our journey has been marked by strategic expansion into real estate, hospitality, travel, and corporate services, always with the goal of creating exceptional value for our clients and partners.
              </p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=600&h=400&fit=crop" alt="Our Story" className="rounded-lg shadow-xl" />
            </div>
          </section>

          <section ref={timelineRef} className="mb-24 overflow-x-auto md:overflow-x-visible">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-20">Our Journey Through Time</h2>

            <div className="hidden md:block">
                <div className="relative max-w-7xl mx-auto px-4">
                    <svg className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${isTimelineVisible ? 'opacity-100' : 'opacity-0'}`} preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path
                            d="M 8.33 25 L 25 75 L 41.67 25 L 58.33 75 L 75 25 L 91.67 75"
                            vectorEffect="non-scaling-stroke"
                            strokeWidth="2"
                            className="stroke-gray-300 dark:stroke-gray-600"
                            fill="none"
                            style={{ strokeDasharray: 1, strokeDashoffset: isTimelineVisible ? 0 : 1, transition: 'stroke-dashoffset 2s ease-in-out' }}
                        />
                    </svg>

                    <div className="relative grid grid-cols-6 gap-x-4">
                        {timeline.map((item, index) => {
                            const Icon = item.icon;
                            const isUp = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`flex ${isUp ? 'items-start justify-center' : 'items-end justify-center'} h-80 transition-all duration-700 transform ${isTimelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className="relative flex flex-col items-center">
                                        <div className={`w-48 text-center ${isUp ? 'order-1 mb-4' : 'order-3 mt-4'}`}>
                                            <div className="p-1">
                                                <p className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-1 border-b-2 border-gray-300 dark:border-gray-500 inline-block">{item.year}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.event}</p>
                                            </div>
                                        </div>
                                        <div className="order-2 z-10">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary-600 to-blue-800 text-white shadow-2xl border-4 border-white dark:border-gray-800">
                                                {Icon ? <Icon className="w-7 h-7" /> : <span className="text-xs">?</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={`md:hidden relative container mx-auto px-4 transition-opacity duration-1000 ${isTimelineVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                <div className="space-y-12">
                    {timeline.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className={`relative pl-16 transition-all duration-700 transform ${isTimelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="absolute top-1 left-6 -translate-x-1/2 z-10">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white shadow-lg">
                                        {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs">?</span>}
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700">
                                    <p className="font-bold text-primary-500 text-lg mb-1">{item.year}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.event}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

          <section className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <FaBullseye className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">To empower our clients by delivering innovative and reliable solutions across all our business sectors, fostering growth and creating lasting value through expertise and integrity.</p>
            </div>
            <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <FaEye className="h-10 w-10 text-secondary-blue mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">To be a globally recognized leader in diversified services, known for our commitment to excellence, sustainable practices, and positive impact on the communities we serve.</p>
            </div>
          </section>

          <section className="mb-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary-100 dark:bg-gray-700 p-4 rounded-full">
                      <value.icon className="h-8 w-8 text-primary-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Meet Our Leadership</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {leadership.map((leader, index) => (
                <div key={index} className="group">
                  <img src={leader.image} alt={leader.name} className="rounded-full w-32 h-32 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300" />
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{leader.name}</h4>
                  <p className="text-primary-500">{leader.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}