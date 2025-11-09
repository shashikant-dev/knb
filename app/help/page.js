'use client';

import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { ChevronDown, Search, Phone, Mail, MessageCircle, FileText } from 'lucide-react';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      category: 'General',
      questions: [
        {
          id: 1,
          question: 'What services does KNB Group offer?',
          answer: 'KNB Group offers wealth management, property development, hotel & villa services, travel & DMC services, and comprehensive business services including company formation and licensing.'
        },
        {
          id: 2,
          question: 'How can I contact KNB Group?',
          answer: 'You can reach us at 033 45001863, email info@knbgrp.com, or visit our office at 294 B B Ganguly Street, Room No 205, 2nd Floor, Kolkata 700012.'
        },
        {
          id: 3,
          question: 'What are your office hours?',
          answer: 'We are open Monday-Friday: 9:00 AM - 6:00 PM, and Saturday: 10:00 AM - 2:00 PM.'
        }
      ]
    },
    {
      category: 'Wealth Management',
      questions: [
        {
          id: 4,
          question: 'What investment options are available?',
          answer: 'We offer mutual funds, trading & broking services, and comprehensive insurance solutions tailored to your financial goals.'
        },
        {
          id: 5,
          question: 'How do I start investing with KNB Wealth?',
          answer: 'Contact our wealth team at wealth@knbgrp.com or call us to schedule a consultation with our financial advisors.'
        }
      ]
    },
    {
      category: 'Properties',
      questions: [
        {
          id: 6,
          question: 'What types of properties do you offer?',
          answer: 'We offer both residential and commercial properties, including apartments, villas, office spaces, and retail outlets.'
        },
        {
          id: 7,
          question: 'How can I schedule a property viewing?',
          answer: 'Contact our properties team at properties@knbgrp.com or call us to arrange a viewing at your convenience.'
        }
      ]
    },
    {
      category: 'Travel & Hotels',
      questions: [
        {
          id: 8,
          question: 'Do you offer customized travel packages?',
          answer: 'Yes, we provide customized travel packages and DMC services. Contact travel@knbgrp.com for personalized itineraries.'
        },
        {
          id: 9,
          question: 'What hotel categories are available?',
          answer: 'Our Encore Hotels & Villas offer luxury, business, and resort accommodations to suit different preferences and budgets.'
        }
      ]
    }
  ];

  const supportOptions = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      contact: '033 45001863',
      action: 'tel:03345001863'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your queries via email',
      contact: 'info@knbgrp.com',
      action: 'mailto:info@knbgrp.com'
    },
    {
      icon: MessageCircle,
      title: 'Contact Form',
      description: 'Fill out our contact form',
      contact: 'Get in touch',
      action: '/contact'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Browse our resources',
      contact: 'View docs',
      action: '/blog'
    }
  ];

  const filteredFaqs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Help Center"
        subtitle="Find answers to common questions and get the support you need"
        imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=320&fit=crop"
      />

      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Support Options */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Get Support</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.action}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow text-center group"
                >
                  <option.icon className="h-8 w-8 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <span className="text-blue-600 font-medium">{option.contact}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFaqs.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                    <div className="space-y-4">
                      {category.questions.map((faq) => (
                        <div key={faq.id} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-500 transform transition-transform ${
                                openFaq === faq.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {openFaq === faq.id && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-700">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Help */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Still need help?</h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}