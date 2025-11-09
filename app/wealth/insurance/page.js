import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { ShieldCheck, HeartPulse, Building, Plane, Umbrella, CheckCircle, ArrowRight } from 'lucide-react';

export default function InsurancePage() {
    const insuranceTypes = [
        { icon: HeartPulse, name: 'Life & Health Insurance', description: 'Protect your family\'s future and cover medical emergencies with comprehensive plans.' },
        { icon: Building, name: 'General Insurance', description: 'Safeguard your assets, including your home and business, against unforeseen events.' },
        { icon: Plane, name: 'Travel Insurance', description: 'Travel with peace of mind, knowing you are covered for medical issues, trip cancellations, and more.' },
    ];

    const benefits = [
        { title: 'Wide Network of Providers', description: 'We partner with the most trusted names in the insurance industry.' },
        { title: 'Dedicated Claims Support', description: 'Our team provides hassle-free assistance during the claims process.' },
        { title: 'Personalized Advice', description: 'We help you choose the right plan based on your unique needs and budget.' },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Insurance Services"
                subtitle="Secure your life, health, and assets with our comprehensive range of insurance solutions."
                imageUrl="https://images.unsplash.com/photo-1560346740-a8678c63a521?w=1920&h=320&fit=crop"
            />
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Umbrella className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Shield Against Uncertainty</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">We partner with leading insurance providers to offer you the best plans tailored to your specific needs, ensuring you and your loved ones are always protected.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {insuranceTypes.map((type, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-lg text-center shadow-lg">
                                <type.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.name}</h3>
                                <p className="text-gray-600">{type.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">The KNB Advantage</h2>
                            <ul className="space-y-6">
                                {benefits.map(benefit => (
                                    <li key={benefit.title} className="flex items-start">
                                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">{benefit.title}</h3>
                                            <p className="text-gray-600">{benefit.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center">
                             <img src="https://images.unsplash.com/photo-1587560699334-cc426240a24?w=600&h=400&fit=crop" alt="Insurance consultation" className="rounded-lg shadow-xl" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-blue-500">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold text-white mb-4">Get a Free Insurance Quote</h2>
                    <p className="text-lg text-blue-100 mb-8">Let us help you find the perfect insurance plan. It's fast, free, and there's no obligation.</p>
                    <Link href="/contact" className="inline-flex items-center bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
                        Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}