'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { formatDate } from '../../lib/dateUtils';

export default function BlogPage() {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (data.success) {
                setBlogData(data.data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const featuredPost = blogData[0];
    const allPosts = blogData.slice(1);
    
    const categories = [
        'All',
        'KNB Wealth',
        'KNB Properties', 
        'Encore Hotels & Villas',
        'KNB Travel & DMC',
        'Business Services'
    ];

    const filteredPosts = activeCategory === 'All'
        ? allPosts
        : allPosts.filter(post => post.category === activeCategory);



    if (loading) {
        return (
            <div className="animate-fade-in">
                <PageHeader
                    title="KNB Group Insights"
                    subtitle="Expert analysis and updates from across our business divisions."
                    imageUrl="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920&h=320&fit=crop"
                />
                <div className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-gray-600 dark:text-gray-300">Loading blog posts...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="KNB Group Insights"
                subtitle="Expert analysis and updates from across our business divisions."
                imageUrl="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920&h=320&fit=crop"
            />

            <div className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Featured Post */}
                    {featuredPost && (
                        <div className="mb-16">
                            <Link href={`/blog/${featuredPost.slug}`} className="block group">
                                <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                    <img src={featuredPost.image} alt={featuredPost.title} className="h-64 lg:h-80 w-full object-cover" />
                                    <div className="p-8">
                                        <span className="text-sm font-semibold text-primary-500 uppercase">{featuredPost.category}</span>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white my-3 group-hover:text-primary-500 transition-colors">{featuredPost.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">{featuredPost.excerpt}</p>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                                                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                            </div>
                                            <span>{featuredPost.author.name}</span>
                                            <span className="mx-2">•</span>
                                            <span>{formatDate(featuredPost.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Category Filter Tabs */}
                    <div className="mb-12 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center -mb-px">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-3 text-base font-semibold transition-colors duration-300 border-b-2 ${
                                        activeCategory === category
                                            ? 'border-primary-500 text-primary-500'
                                            : 'border-transparent text-gray-500 hover:text-primary-500 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filtered Posts */}
                    <div className="space-y-12">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => (
                                <Link key={post._id} href={`/blog/${post.slug}`} className="block group">
                                    <div className="grid sm:grid-cols-3 gap-6 items-center">
                                        <div className="sm:col-span-1">
                                            <img src={post.image} alt={post.title} className="rounded-lg shadow-md h-48 w-full object-cover" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="text-xs font-semibold text-primary-500 uppercase">{post.category}</span>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-primary-500 transition-colors">{post.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{post.excerpt}</p>
                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                <span>{post.author.name}</span>
                                                <span className="mx-2">•</span>
                                                <span>{formatDate(post.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">No posts found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">There are no posts in this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}