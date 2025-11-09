import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { Users, Compass, GitMerge, Shield, ArrowRight, CheckCircle, BarChart } from 'lucide-react';

export default function CorporateAdvisoryPage() {
    const advisoryAreas = [
        { icon: Compass, title: 'Market Entry Strategy', description: 'In-depth analysis and strategic planning for successful entry into new markets.' },
        { icon: GitMerge, title: 'Mergers & Acquisitions (M&A)', description: 'End-to-end support for identifying targets, due diligence, and deal structuring.' },
        { icon: Shield, title: 'Corporate Governance', description: 'Implementing best practices for board structure, compliance, and stakeholder management.' },
        { icon: BarChart, title: 'Business Structuring', description: 'Optimizing your corporate structure for tax efficiency, liability protection, and operational effectiveness.' },
    ];

    const caseStudies = [
        { client: 'Global Tech Inc.', challenge: 'Entering the Southeast Asian market.', solution: 'Developed a phased market entry strategy, resulting in a 200% ROI within two years.' },
        { client: 'Luxury Retail Group', challenge: 'Acquiring a local competitor.', solution: 'Managed the M&A process, leading to a successful acquisition that increased market share by 15%.' },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Corporate Advisory"
                subtitle="Strategic guidance to navigate complex business challenges and unlock your company's full potential."
                imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=320&fit=crop"
            />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop" alt="Advisory meeting" className="rounded-lg shadow-xl" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Strategic Growth Partner</h2>
                            <p className="text-lg text-gray-600 mb-6">KNB Group's advisory services provide the data-driven insights and experienced counsel your business needs to make critical decisions. We partner with you to turn challenges into opportunities and strategies into successful outcomes.</p>
                            <Link href="/contact" className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 shadow-md hover:shadow-lg">
                                Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Advisory Expertise</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {advisoryAreas.map((area, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <area.icon className="h-10 w-10 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{area.title}</h3>
                                <p className="text-gray-600">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Client Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {caseStudies.map((study, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-bold text-blue-600 mb-4">{study.client}</h3>
                                <p className="font-semibold text-gray-700">Challenge:</p>
                                <p className="text-gray-600 mb-4">{study.challenge}</p>
                                <p className="font-semibold text-gray-700">Our Solution:</p>
                                <p className="text-gray-600">{study.solution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}