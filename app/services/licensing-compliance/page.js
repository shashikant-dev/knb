import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { FileText, ShieldCheck, CheckCircle, ArrowRight, Gavel, Building, HeartPulse } from 'lucide-react';

export default function LicensingCompliancePage() {
    const services = [
        { icon: Gavel, title: 'Industry-Specific Licensing', description: 'Securing necessary permits for finance, real estate, travel, and hospitality sectors.' },
        { icon: FileText, title: 'Regulatory Filings & Reporting', description: 'Managing periodic filings with government bodies to ensure you remain in good standing.' },
        { icon: ShieldCheck, title: 'Compliance Audits & Health Checks', description: 'Proactively identifying and rectifying potential compliance gaps in your operations.' },
    ];

    const processSteps = [
        { name: 'Assessment', description: 'We analyze your business model to identify all licensing and compliance requirements.' },
        { name: 'Application', description: 'Our team prepares and submits all applications with meticulous attention to detail.' },
        { name: 'Liaison', description: 'We act as your representative, communicating with regulatory bodies on your behalf.' },
        { name: 'Approval & Maintenance', description: 'We ensure you receive your licenses and help you maintain ongoing compliance.' },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Licensing & Compliance"
                subtitle="Navigate the complex regulatory landscape with confidence. We ensure your business is fully licensed and compliant."
                imageUrl="https://images.unsplash.com/photo-1556761175-b413da4b248a?w=1920&h=320&fit=crop"
            />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Ahead of Regulations</h2>
                            <p className="text-lg text-gray-600 mb-6">In today's ever-changing business environment, maintaining compliance is not just a legal requirement—it's a competitive advantage. KNB Group removes the burden of navigating complex rules, allowing you to focus on growth.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /><span>Mitigate risks of fines and legal penalties.</span></li>
                                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /><span>Build trust with customers, investors, and partners.</span></li>
                                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /><span>Ensure smooth and uninterrupted business operations.</span></li>
                            </ul>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1586473216109-a8a57a5e870a?w=600&h=400&fit=crop" alt="Compliance documents" className="rounded-lg shadow-xl" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Compliance Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                                <service.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Streamlined Process</h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 text-blue-500 rounded-full text-2xl font-bold mb-4">{index + 1}</div>
                                <h3 className="text-lg font-semibold mb-2">{step.name}</h3>
                                <p className="text-gray-600">{step.description}</p>
                                {index < processSteps.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" style={{transform: 'translateX(50%)'}}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold text-white mb-4">Secure Your Business's Future</h2>
                    <p className="text-lg text-blue-100 mb-8">Don't let regulatory hurdles slow you down. Contact our compliance experts for a free consultation today.</p>
                    <Link href="/contact" className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
                        Request a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}