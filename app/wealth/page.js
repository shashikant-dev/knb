import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import { TrendingUp, PieChart, ShieldCheck, LifeBuoy, ArrowRight, Phone, Facebook } from 'lucide-react';

export default function WealthPage() {
    const services = [
        {
            icon: TrendingUp,
            title: 'Trading & Broking',
            description: 'Access equity, derivatives, commodity, and currency markets with our state-of-the-art trading platforms and expert guidance.',
            link: '/wealth/trading-broking'
        },
        {
            icon: PieChart,
            title: 'Mutual Funds',
            description: 'Diversify your portfolio with a wide range of mutual funds, tailored to your risk appetite and financial goals.',
            link: '/wealth/mutual-funds'
        },
        {
            icon: ShieldCheck,
            title: 'Insurance Services',
            description: 'Secure your future with comprehensive life, health, general, and travel insurance plans from leading providers.',
            link: '/wealth/insurance'
        },
        {
            icon: LifeBuoy,
            title: 'Research & Support',
            description: 'Make informed decisions with our in-depth market research, analytical tools, and dedicated support services.',
            link: '/contact'
        },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="KNB Wealth"
                subtitle="Your trusted partner in financial growth and security. We provide expert-led wealth management solutions to help you achieve your financial aspirations."
                imageUrl="https://images.unsplash.com/photo-1633158829875-e5316a358c6f?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <div className="py-16 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Comprehensive Financial Services</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">From investment strategies to risk management, we offer a complete suite of services to manage and grow your wealth.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                                            Learn More <ArrowRight className="inline h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img src="https://images.unsplash.com/photo-1554224155-1696413565d3?w=600&h=400&fit=crop" alt="Financial Planning" className="rounded-lg shadow-xl w-full" />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose KNB Wealth?</h2>
                            <ul className="space-y-4 sm:space-y-6 text-gray-600">
                                <li className="flex items-start">
                                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-sm sm:text-base"><span className="font-semibold text-gray-800">Unmatched Security:</span> Your investments are protected with top-tier security protocols and regulatory compliance.</span>
                                </li>
                                <li className="flex items-start">
                                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-sm sm:text-base"><span className="font-semibold text-gray-800">Expert Advisors:</span> Our team of seasoned financial experts provides personalized strategies to maximize your returns.</span>
                                </li>
                                <li className="flex items-start">
                                    <LifeBuoy className="h-5 w-5 sm:h-6 sm:w-6 text-accent-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-sm sm:text-base"><span className="font-semibold text-gray-800">Client-Centric Approach:</span> We prioritize your financial well-being, offering transparent advice and dedicated support.</span>
                                </li>
                            </ul>
                            <div className="mt-6 sm:mt-8">
                                <Link href="/contact" className="inline-flex items-center bg-primary-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base">
                                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             <div className="bg-primary-600">
                <div className="max-w-4xl mx-auto text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                        <span className="block">Ready to build your financial future?</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg leading-6 text-blue-100">
                        Speak with one of our wealth advisors today and take the first step towards financial freedom.
                    </p>
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="tel:+1800KNBGROUP" className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                           <Phone className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" /> Call Us Now
                        </a>
                        <a href="https://www.facebook.com/knbwealth" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
                            <Facebook className="h-5 w-5 mr-2" />
                            Follow us on Facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}