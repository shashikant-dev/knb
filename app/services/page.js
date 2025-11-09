import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import { Briefcase, FileText, Users, ArrowRight, Globe, Shield, Target } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            icon: Briefcase,
            title: 'Global Company Formation',
            description: 'Seamlessly establish your business presence in new countries. We manage the entire incorporation process, ensuring full compliance with local laws for all legal entity types.',
            link: '/services/company-formation'
        },
        {
            icon: FileText,
            title: 'Licensing & Legal Guidance',
            description: 'Secure all necessary operational licenses and permits. Our experts provide ongoing legal guidance to help you navigate complex regulatory landscapes and maintain compliance.',
            link: '/services/licensing-compliance'
        },
        {
            icon: Users,
            title: 'Strategic Corporate Advisory',
            description: 'Leverage our strategic advisory services for data-driven insights on market entry, M&A, corporate structuring, and governance to ensure sustainable growth.',
            link: '/services/corporate-advisory'
        },
    ];

    const benefits = [
        {
            icon: Globe,
            title: 'Global Network & Local Expertise',
            description: 'Our extensive network spans multiple countries, combining global reach with deep local knowledge of legal and business environments.'
        },
        {
            icon: Shield,
            title: 'Integrated One-Stop Solution',
            description: 'From initial legal guidance and licensing to long-term strategic advisory, we offer a cohesive suite of services under one roof.'
        },
        {
            icon: Users,
            title: 'Dedicated Expert Team',
            description: 'Your business is supported by a team of experienced lawyers, corporate secretaries, and business consultants dedicated to your success.'
        },
        {
            icon: Target,
            title: 'Client-Focused & Tailored',
            description: 'We believe every business is unique. Our services are customized to meet your specific objectives, ensuring a perfect fit for your expansion goals.'
        }
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Global Corporate Services"
                subtitle="From international company formation to strategic advisory, we provide comprehensive solutions to establish and scale your business across borders."
                imageUrl="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1920&h=320&fit=crop"
            />
            <div className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your Partner in Global Expansion</h2>
                            <p className="text-base sm:text-lg text-gray-600 mb-6">
                                Whether you're a startup or an established enterprise, expanding internationally presents unique challenges. KNB Group's Corporate Services division is your dedicated partner, providing the legal, strategic, and administrative support necessary to navigate new markets with confidence. We handle the complexities of global business setup, so you can focus on what you do best—growing your business.
                            </p>
                            <Link href="/contact" className="inline-flex items-center bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-600 shadow-md hover:shadow-lg transition-all text-sm sm:text-base">
                                Consult Our Experts <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Link>
                        </div>
                        <div className="order-1 md:order-2">
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop" alt="Business Meeting" className="rounded-lg shadow-xl w-full" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-16 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Our Core Corporate Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <Link href={service.link} key={index} className="group block text-center p-6 sm:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border hover:border-blue-500">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-blue-100 p-3 sm:p-4 rounded-full group-hover:bg-blue-200 transition-colors">
                                        <service.icon className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500" />
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">{service.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600 mb-4">{service.description}</p>
                                <span className="font-semibold text-blue-500 group-hover:underline text-sm sm:text-base">
                                    Learn More <ArrowRight className="inline h-4 w-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Partner with KNB Group?</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">We provide the expertise and infrastructure to make your international business ambitions a reality.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center p-4 sm:p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-blue-50 p-3 sm:p-4 rounded-full">
                                        <benefit.icon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                                    </div>
                                </div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-600">
                <div className="max-w-4xl mx-auto text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                        <span className="block">Ready to Take Your Business Global?</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg leading-6 text-blue-100">
                        Contact our corporate services team today for a confidential consultation and discover how we can facilitate your international growth.
                    </p>
                    <Link href="/contact" className="mt-6 sm:mt-8 w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors shadow-lg">
                       Request a Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
}