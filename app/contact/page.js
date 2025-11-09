'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '../../components/PageHeader';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', subject: '', message: '', service: 'general' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    useEffect(() => {
        const serviceFromQuery = searchParams.get('service');
        if (serviceFromQuery) {
            setFormData(prevData => ({ ...prevData, service: serviceFromQuery }));
        } else {
            setFormData(prevData => ({ ...prevData, service: 'general' }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // For mobile field, only allow numbers
        if (name === 'mobile') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData({ ...formData, [name]: numericValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length > 50) {
            newErrors.name = 'Name must be 50 characters or less';
        }

        if (formData.email) {
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
            } else if (formData.email.length > 100) {
                newErrors.email = 'Email must be 100 characters or less';
            }
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (formData.mobile.length < 10 || formData.mobile.length > 15) {
            newErrors.mobile = 'Mobile number must be 10-15 digits';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.length > 100) {
            newErrors.subject = 'Subject must be 100 characters or less';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length > 500) {
            newErrors.message = 'Message must be 500 characters or less';
        }

        if (!formData.service) newErrors.service = 'Please select a service';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setShowThankYouModal(true);
                setFormData({ name: '', email: '', mobile: '', subject: '', message: '', service: 'general' });
                setErrors({});
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const serviceOptions = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'wealth', label: 'KNB Wealth' },
        { value: 'properties', label: 'KNB Properties' },
        { value: 'hotels', label: 'Encore Hotels & Villas' },
        { value: 'travel', label: 'KNB Travel & DMC' },
        { value: 'services', label: 'Business Services' },
        { value: 'investors', label: 'Investor Relations' },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Contact Us"
                subtitle="We're here to help. Reach out to us through any of the channels below, and we'll get back to you promptly."
                imageUrl="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1920&h=320&fit=crop"
            />
            <div className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="service" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Service of Interest</label>
                                    <select
                                        name="service"
                                        id="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                                            errors.service ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    >
                                        <option value="" disabled>Select a service...</option>
                                        {serviceOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Full Name (Max 50 characters)</label>
                                    <input type="text" name="name" id="name" maxLength="50" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`} />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Email Address (Optional)</label>
                                    <input type="text" name="email" id="email" maxLength="100" value={formData.email} onChange={handleChange} placeholder="Enter your email address" className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`} />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Mobile Number (10-15 digits)</label>
                                    <input type="text" name="mobile" id="mobile" maxLength="15" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                                        errors.mobile ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`} />
                                    {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Subject (Max 100 characters)</label>
                                    <input type="text" name="subject" id="subject" maxLength="100" value={formData.subject} onChange={handleChange} placeholder="Enter subject" className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                                        errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`} />
                                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Message (Max 500 characters)</label>
                                    <textarea name="message" id="message" rows="4" maxLength="500" value={formData.message} onChange={handleChange} placeholder="Enter your message" className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                                        errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>
                                <div>
                                    <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400">
                                        {isSubmitting ? 'Sending...' : <><FaPaperPlane className="h-5 w-5 mr-2" /> Send Message</>}
                                    </button>
                                </div>
                                {submitStatus === 'error' && <p className="text-red-600">Sorry, there was an error sending your message. Please try again.</p>}
                            </form>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
                                <a href="https://www.google.com/maps/place/KNB+GROUP/@22.5720971,88.3516362,17z/data=!3m1!4b1!4m6!3m5!1s0x3a0277e6b5a422eb:0x6a741c3cedc65790!8m2!3d22.5720971!4d88.3516362!16s%2Fg%2F11y3z8qz8q" target="_blank" rel="noopener noreferrer" className="flex items-start mb-4 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                                    <FaMapMarkerAlt className="h-5 w-5 mr-3 text-primary-500 mt-1 flex-shrink-0" />
                                    <span>294 B B Ganguly Street, Room No 205, 2nd Floor, Kolkata 700012</span>
                                </a>
                                <a href="tel:03345001863" className="flex items-center mb-4 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                                    <FaPhone className="h-5 w-5 mr-3 text-primary-500" />
                                    <span>033 45001863</span>
                                </a>
                                <a href="mailto:info@knbgrp.com" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                                    <FaEnvelope className="h-5 w-5 mr-3 text-primary-500" />
                                    <span>info@knbgrp.com</span>
                                </a>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Department Contacts</h3>
                                <p className="text-gray-700 dark:text-gray-300"><strong>Wealth:</strong> <a href="mailto:wealth@knbgrp.com" className="text-primary-500 hover:underline">wealth@knbgrp.com</a></p>
                                <p className="text-gray-700 dark:text-gray-300"><strong>Properties:</strong> <a href="mailto:properties@knbgrp.com" className="text-primary-500 hover:underline">properties@knbgrp.com</a></p>
                                <p className="text-gray-700 dark:text-gray-300"><strong>Travel:</strong> <a href="mailto:travel@knbgrp.com" className="text-primary-500 hover:underline">travel@knbgrp.com</a></p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Office Hours</h3>
                                <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-700 dark:text-gray-300">Saturday: 10:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3684.1872988398036!2d88.3516362!3d22.5720971!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277e6b5a422eb%3A0x6a741c3cedc65790!2sKNB%20GROUP!5e0!3m2!1sen!2sin!4v1759686203006!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="KNB Group Office Location"
                ></iframe>
            </div>

            {/* Thank You Modal */}
            {showThankYouModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
                        <div className="p-6 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Thank You!</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Your message has been sent successfully. We'll get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => setShowThankYouModal(false)}
                                className="w-full bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}