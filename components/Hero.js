'use client';
import Link from 'next/link';
import { ArrowRight, Mail, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
          alt="Modern Business Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 via-blue-600/85 to-blue-800/90"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-6 md:pb-10">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium mb-8 shadow-lg">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Established 1999 • Trusted Excellence
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent">KNB Group</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-3 md:mb-4 font-light max-w-4xl mx-auto">
            Diversified Excellence Across Industries
          </p>

          <p className="text-base sm:text-lg text-blue-200 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            From wealth management to real estate, hospitality to travel - we deliver comprehensive solutions for your success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12">
            <button
              onClick={() => document.getElementById('business-divisions')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              Explore Our Services
              <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/contact"
              className="group bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <Mail className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
              Get In Touch
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">25+</div>
              <div className="text-blue-200 font-medium text-sm">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">10K+</div>
              <div className="text-blue-200 font-medium text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">500+</div>
              <div className="text-blue-200 font-medium text-sm">Properties Managed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">15+</div>
              <div className="text-blue-200 font-medium text-sm">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}