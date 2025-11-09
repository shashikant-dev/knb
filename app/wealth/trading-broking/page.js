import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { CandlestickChart, Laptop, ShieldCheck, FileText, Headset, Banknote, ArrowRight, HelpCircle } from 'lucide-react';

export default function TradingAndBrokingPage() {
    const markets = [
        { icon: CandlestickChart, name: 'Equity & Derivatives', description: 'Trade stocks and F&O contracts on major exchanges with high liquidity and real-time data feeds.' },
        { icon: Banknote, name: 'Commodity & Currency', description: 'Diversify with commodities like gold and oil, and trade global currency pairs in the forex market.' },
    ];
    
    const advantages = [
        { icon: FileText, title: 'Low Brokerage', description: 'Competitive pricing plans to maximize your profitability.' },
        { icon: Headset, title: 'Expert Research', description: 'Access to award-winning research reports and market insights.' },
        { icon: Laptop, title: 'Advanced Tools', description: 'Utilize cutting-edge tools for charting, analysis, and execution.' },
        { icon: ShieldCheck, title: 'Robust Security', description: 'Your funds and data are protected with multi-layered security.' },
    ];

    const faqs = [
        { q: 'What are the account opening charges?', a: 'We offer zero account opening charges for all our clients. You can start your investment journey with us for free.' },
        { q: 'How long does it take to activate an account?', a: 'Our fully digital KYC process ensures your account is activated within 24 hours of document submission.' },
        { q: 'Is my money safe with KNB Wealth?', a: 'Absolutely. We are a regulated entity and adhere to the highest standards of security and compliance to protect your funds.' },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Trading & Broking"
                subtitle="Empowering Your Trades with Advanced Platforms & Expert Insights"
                imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&h=320&fit=crop"
            />

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Access</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">One account, multiple investment opportunities across global markets.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {markets.map((market, index) => (
                            <div key={index} className="flex items-start p-6">
                                <market.icon className="h-12 w-12 text-blue-500 mr-6 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{market.name}</h3>
                                    <p className="text-gray-600">{market.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trade With KNB?</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {advantages.map((adv, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-blue-100 p-4 rounded-full">
                                        <adv.icon className="h-8 w-8 text-blue-500" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{adv.title}</h3>
                                <p className="text-gray-600">{adv.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="font-semibold text-lg flex items-center mb-2"><HelpCircle className="h-5 w-5 text-blue-500 mr-2" />{faq.q}</h3>
                                <p className="text-gray-600 pl-7">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">Get Started in 3 Simple Steps</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="text-5xl font-bold text-blue-300 mb-2">1</div>
                            <h3 className="text-xl font-semibold mb-2">Open an Account</h3>
                            <p className="text-blue-100">Complete our quick and easy digital KYC process.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl font-bold text-blue-300 mb-2">2</div>
                            <h3 className="text-xl font-semibold mb-2">Fund Your Account</h3>
                            <p className="text-blue-100">Add funds securely through multiple payment options.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-5xl font-bold text-blue-300 mb-2">3</div>
                            <h3 className="text-xl font-semibold mb-2">Start Trading</h3>
                            <p className="text-blue-100">Access the markets and begin your investment journey.</p>
                        </div>
                    </div>
                     <div className="mt-12">
                        <Link href="/contact" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                            Open an Account Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}