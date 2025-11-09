import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { PieChart, Zap, Shield, ArrowRight, CheckCircle, Calculator, UserCheck, Search, Landmark, Globe, Building, Target } from 'lucide-react';

export default function MutualFundsPage() {
    const featuredFunds = [
        { name: 'Apex Bluechip Growth', amc: 'Apex AMC', category: 'Equity', return: '18.5%', risk: 'High' },
        { name: 'Stellar Balanced Advantage', amc: 'Stellar Capital', category: 'Hybrid', return: '12.2%', risk: 'Medium' },
        { name: 'Quantum Corporate Bond Fund', amc: 'Quantum Funds', category: 'Debt', return: '7.8%', risk: 'Low' },
    ];

    const partnerAMCs = [
        { name: 'Apex Asset Management', icon: Landmark },
        { name: 'Stellar Capital', icon: Globe },
        { name: 'Quantum Funds', icon: Building },
        { name: 'Horizon Investments', icon: Target },
        { name: 'Meridian Trust', icon: Shield },
        { name: 'Vertex Financial', icon: Zap },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Your Gateway to Mutual Funds"
                subtitle="Access a wide spectrum of funds from India's leading asset management companies. We help you choose the right funds to achieve your financial goals."
                imageUrl="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1920&h=320&fit=crop"
            />
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Invest Through KNB Wealth?</h2>
                            <p className="text-lg text-gray-600 mb-6">Instead of being limited to one fund house, we provide you with a universe of choices, backed by expert, unbiased advice.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start"><PieChart className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span><span className="font-semibold text-gray-800">Unmatched Selection:</span> Access over 1,000 schemes from all major AMCs in one place.</span></li>
                                <li className="flex items-start"><UserCheck className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" /><span><span className="font-semibold text-gray-800">Expert Guidance:</span> Our advisors help you build a portfolio tailored to your goals and risk profile.</span></li>
                                <li className="flex items-start"><Zap className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span><span className="font-semibold text-gray-800">Seamless Platform:</span> Invest, track, and manage all your mutual funds through a single, easy-to-use dashboard.</span></li>
                            </ul>
                        </div>
                        <div>
                            <img src="https://plus.unsplash.com/premium_photo-1742119207785-8948a2817848?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Mutual Funds Growth" className="rounded-lg shadow-xl" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">We Partner with Leading Fund Houses</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {partnerAMCs.map((amc, index) => (
                            <div key={index} className="flex flex-col items-center justify-center text-center">
                                <amc.icon className="h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm font-semibold text-gray-600">{amc.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Top Performing Funds</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredFunds.map(fund => (
                            <div key={fund.name} className="border border-gray-200 rounded-lg p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold text-blue-600">{fund.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{fund.amc}</p>
                                <p className="text-4xl font-bold text-gray-900 mb-1">{fund.return} <span className="text-lg font-normal">5Y CAGR</span></p>
                                <p className="mb-4">Risk: <span className="font-semibold">{fund.risk}</span></p>
                                <Link href="/contact" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">Invest Now <ArrowRight className="inline h-4 w-4" /></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tools to Empower Your Decisions</h2>
                     <div className="grid md:grid-cols-3 gap-8 text-center">
                         <div className="bg-white p-8 rounded-lg shadow-md">
                             <UserCheck className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                             <h3 className="text-xl font-semibold">Risk Profiler</h3>
                             <p className="text-gray-600">Answer a few questions to find your risk appetite.</p>
                         </div>
                         <div className="bg-white p-8 rounded-lg shadow-md">
                             <Target className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                             <h3 className="text-xl font-semibold">Goal Planner</h3>
                             <p className="text-gray-600">Plan for your life goals like retirement or education.</p>
                         </div>
                         <div className="bg-white p-8 rounded-lg shadow-md">
                             <Calculator className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                             <h3 className="text-xl font-semibold">SIP Calculator</h3>
                             <p className="text-gray-600">See how small, regular investments can grow over time.</p>
                         </div>
                     </div>
                </div>
            </section>

             <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
                    <p className="text-lg text-blue-100 mb-8">A Systematic Investment Plan (SIP) is the perfect way to build wealth over time. Our experts can help you choose the right funds to start today.</p>
                    <Link href="/contact" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                       Talk to an Advisor <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}