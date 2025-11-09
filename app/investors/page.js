'use client';

import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import { Target, Shield, GitBranch, Users, ArrowRight, FileText, TrendingUp, Building } from 'lucide-react';

export default function InvestorsPage() {
    const philosophy = [
        { icon: Target, title: 'Client-Centric Strategy', description: 'Your financial goals are the foundation of our strategy. We build personalized portfolios designed to meet your unique objectives.' },
        { icon: Shield, title: 'Disciplined Risk Management', description: 'We prioritize capital preservation through rigorous analysis and a balanced approach to risk and reward.' },
        { icon: GitBranch, title: 'Diversified Opportunities', description: 'Our cross-industry expertise provides you with access to a wide spectrum of investment avenues, from capital markets to real estate.' },
        { icon: Users, title: 'Expert-Led Guidance', description: 'Leverage the deep market knowledge and experience of our seasoned team of financial advisors and analysts.' },
    ];

    const investmentAvenues = [
        {
            icon: TrendingUp,
            title: 'Capital Markets',
            description: 'Gain access to domestic and global equity, derivative, and fixed-income markets. We provide the tools and research you need to trade effectively.',
            link: '/wealth'
        },
        {
            icon: Building,
            title: 'Real Estate Investments',
            description: 'Explore curated investment opportunities in high-growth residential and commercial real estate projects, managed by our property experts.',
            link: '/properties'
        },
    ];

    const resources = [
        { name: 'Annual Report 2024 (PDF)', link: '/knb-annual-report-2024.pdf', isPdf: true },
        { name: '2025 Market Outlook (PDF)', link: '/knb-annual-report-2024.pdf', isPdf: true },
        { name: 'Guide to Real Estate Investing (PDF)', link: '/knb-annual-report-2024.pdf', isPdf: true },
        { name: 'Whitepaper: The Power of Diversification (PDF)', link: '/knb-annual-report-2024.pdf', isPdf: true },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Partner with KNB Group"
                subtitle="Leverage our cross-industry expertise to achieve your financial goals. Discover exclusive investment opportunities in wealth and real estate."
                imageUrl="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="py-16 sm:py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="mb-16 sm:mb-20 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Gateway to Premier Investments</h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            KNB Group is not a publicly traded entity. This page is for sophisticated investors, family offices, and institutions seeking a trusted partner to navigate the complexities of modern investment markets. We provide the expertise and access to help you build and preserve wealth.
                        </p>
                    </section>

                    <section className="mb-16 sm:mb-20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">Our Investment Philosophy</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {philosophy.map((item, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg text-center shadow-md">
                                    <div className="flex justify-center mb-4">
                                        <div className="bg-primary-100 dark:bg-gray-700 p-3 sm:p-4 rounded-full">
                                            <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-16 sm:mb-20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">Investment Avenues</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                           {investmentAvenues.map((avenue, index) => (
                                <div key={index} className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg border dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                        <div className="flex-shrink-0 bg-primary-100 dark:bg-gray-700 p-3 sm:p-4 rounded-full">
                                            <avenue.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{avenue.title}</h3>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{avenue.description}</p>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <Link href={avenue.link} className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold text-sm sm:text-base transition-colors">
                                                    Explore Opportunities <ArrowRight className="ml-1 h-4 w-4 transform hover:translate-x-1 transition-transform" />
                                                </Link>
                                                {/* <Link href="/contact" className="inline-flex items-center text-gray-600 hover:text-primary-500 font-semibold text-sm sm:text-base transition-colors">
                                                    Contact Us <ArrowRight className="ml-1 h-4 w-4 transform hover:translate-x-1 transition-transform" />
                                                </Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           ))}
                        </div>
                    </section>
                    <section className="bg-primary-600 text-white rounded-lg p-6 sm:p-8 lg:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Become a Client</h2>
                        <p className="max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">Partner with KNB Group to unlock your financial potential. Contact our advisory team for a confidential consultation to discuss your investment objectives.</p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8">
                            <Link href="/contact?service=investors" className="inline-flex items-center bg-white text-primary-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md text-sm sm:text-base">
                                <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Speak with an Advisor
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}