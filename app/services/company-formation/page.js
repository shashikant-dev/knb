import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { ArrowRight, CheckCircle, HelpCircle, Briefcase, BookOpen, Landmark } from 'lucide-react';

export default function CompanyFormationPage() {
    const steps = [
        { name: 'Consultation', description: 'We start with a detailed consultation to understand your business needs and advise on the best legal structure.' },
        { name: 'Documentation', description: 'Our team assists you in preparing and verifying all necessary incorporation documents.' },
        { name: 'Registration', description: 'We handle the entire submission process with the relevant government authorities.' },
        { name: 'Post-Incorporation', description: 'Receive your official company documents and guidance on next steps like bank account opening.' },
    ];

    const pricing = [
        { plan: 'Starter', price: '$499', features: ['Company Name Reservation', 'Registration Certificate', 'Basic Documentation'] },
        { plan: 'Business', price: '$999', features: ['All Starter Features', 'Bank Account Assistance', 'Tax Registration (VAT/GST)'], popular: true },
        { plan: 'Enterprise', price: 'Custom', features: ['All Business Features', 'Corporate Secretary', 'Annual Compliance Support'] },
    ];
    
    const faqs = [
        { q: 'What type of company should I form?', a: 'The best structure (e.g., LLC, Corporation) depends on your business goals, liability, and tax considerations. Our initial consultation will help you decide.' },
        { q: 'How long does the process take?', a: 'Typically, a company can be registered within 5-7 business days, depending on the jurisdiction and government processing times.' },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Company Formation"
                subtitle="Launch your business with confidence. We provide a fast, reliable, and transparent incorporation process."
                imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=320&fit=crop"
            />
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our 4-Step Process</h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500 text-white rounded-full text-2xl font-bold mb-4">{index + 1}</div>
                                <h3 className="text-lg font-semibold mb-2">{step.name}</h3>
                                <p className="text-gray-600">{step.description}</p>
                                {index < steps.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" style={{transform: 'translateX(50%)'}}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pricing Plans</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pricing.map((plan) => (
                            <div key={plan.plan} className={`bg-white p-8 rounded-lg shadow-lg border-2 ${plan.popular ? 'border-blue-500' : 'border-gray-200'}`}>
                                <h3 className="text-xl font-semibold text-center mb-2">{plan.plan}</h3>
                                <p className="text-4xl font-bold text-center mb-6">{plan.price}</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map(f => <li key={f} className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />{f}</li>)}
                                </ul>
                                <Link href="/contact" className={`w-full block text-center px-6 py-3 rounded-lg font-semibold ${plan.popular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'}`}>Get Started</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-lg flex items-center mb-2"><HelpCircle className="h-5 w-5 text-blue-500 mr-2" />{faq.q}</h3>
                                <p className="text-gray-600 pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}