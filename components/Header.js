'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Facebook } from 'lucide-react';

export default function Header() {
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  const isCompanyActive = () => [
    '/wealth', '/properties', '/hotels', '/travel', '/services'
  ].some(path => pathname.startsWith(path));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsCompaniesOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCompaniesOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/assets/images/knb_logo.svg"
              alt="KNB Group"
              className="h-10 sm:h-12 lg:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link href="/" className={`transition-colors font-medium ${
              isActive('/') ? 'text-primary-600 font-semibold' : 'text-secondary-700 hover:text-primary-600'
            }`}>
              Home
            </Link>
            <Link href="/about" className={`transition-colors font-medium ${
              isActive('/about') ? 'text-primary-600 font-semibold' : 'text-secondary-700 hover:text-primary-600'
            }`}>
              About KNB Group
            </Link>
            <Link href="/blog" className={`transition-colors font-medium ${
              pathname.startsWith('/blog') ? 'text-primary-600 font-semibold' : 'text-secondary-700 hover:text-primary-600'
            }`}>
              Blog
            </Link>
            <Link href="/investors" className={`transition-colors font-medium ${
              isActive('/investors') ? 'text-primary-600 font-semibold' : 'text-secondary-700 hover:text-primary-600'
            }`}>
              Investor Relations
            </Link>
            <Link href="/contact" className={`transition-colors font-medium ${
              isActive('/contact') ? 'text-primary-600 font-semibold' : 'text-secondary-700 hover:text-primary-600'
            }`}>
              Contact Us
            </Link>
            <Link href="/help" className={`transition-colors font-medium ${
              isActive('/help') ? 'text-primary-600 font-semibold' : 'text-secondary-700 hover:text-primary-600'
            }`}>
              Help
            </Link>

            {/* Desktop Companies Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCompaniesOpen(!isCompaniesOpen)}
                className={`flex items-center transition-colors font-medium ${
                  isCompanyActive() ? 'text-primary-600 font-semibold' : 'text-secondary-700 hover:text-primary-600'
                }`}
              >
                Our Group Companies
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${isCompaniesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCompaniesOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 z-10 border">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <Link
                      href="/wealth"
                      className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsCompaniesOpen(false)}
                    >
                      KNB Wealth
                    </Link>
                    <a
                      href="https://www.facebook.com/knbwealth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="h-3 w-3 mr-1" />
                      Facebook
                    </a>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <Link
                      href="/properties"
                      className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsCompaniesOpen(false)}
                    >
                      KNB Properties
                    </Link>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <Link
                      href="/hotels"
                      className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsCompaniesOpen(false)}
                    >
                      Encore Hotels & Villas
                    </Link>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <a
                        href="https://www.facebook.com/encorehotelsvillas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Facebook className="h-3 w-3 mr-1" />
                        Encore
                      </a>
                      <a
                        href="https://www.facebook.com/people/Marine-Paradise-Encore/100067914352467/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Facebook className="h-3 w-3 mr-1" />
                        Marine Paradise
                      </a>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <Link
                      href="/travel"
                      className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsCompaniesOpen(false)}
                    >
                      KNB Travel & DMC
                    </Link>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <a
                        href="https://www.facebook.com/ChakDePattaya/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Facebook className="h-3 w-3 mr-1" />
                        Chak De Pattaya
                      </a>
                      <a
                        href="https://www.facebook.com/theparadisepattaya/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Facebook className="h-3 w-3 mr-1" />
                        Paradise Pattaya
                      </a>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <Link
                      href="/services"
                      className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsCompaniesOpen(false)}
                    >
                      Business Services
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pl-4 border-b border-gray-200">
              <img src="assets/images/knb_logo.svg" alt="KNB Group" className="h-12 w-auto" />
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                  isActive('/') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                  isActive('/about') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                About KNB Group
              </Link>
              <Link
                href="/blog"
                className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                  pathname.startsWith('/blog') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
              <Link
                href="/investors"
                className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                  isActive('/investors') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Investor Relations
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                  isActive('/contact') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
              <Link
                href="/help"
                className={`block px-3 py-2 rounded-md transition-colors font-medium ${
                  isActive('/help') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Help
              </Link>

              {/* Mobile Companies Section */}
              <div className="pt-2">
                <button
                  onClick={() => setIsCompaniesOpen(!isCompaniesOpen)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors font-medium ${
                    isCompanyActive() ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  Our Group Companies
                  <ChevronDown className={`h-4 w-4 transform transition-transform ${isCompaniesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCompaniesOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    <div className="px-3 py-2">
                      <Link
                        href="/wealth"
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                        onClick={closeMobileMenu}
                      >
                        KNB Wealth
                      </Link>
                      <a
                        href="https://www.facebook.com/knbwealth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Facebook className="h-3 w-3 mr-1" />
                        Facebook
                      </a>
                    </div>
                    <Link
                      href="/properties"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      KNB Properties
                    </Link>
                    <div className="px-3 py-2">
                      <Link
                        href="/hotels"
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                        onClick={closeMobileMenu}
                      >
                        Encore Hotels & Villas
                      </Link>
                      <div className="flex flex-col gap-1 mt-1">
                        <a
                          href="https://www.facebook.com/encorehotelsvillas"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Facebook className="h-3 w-3 mr-1" />
                          Encore
                        </a>
                        <a
                          href="https://www.facebook.com/people/Marine-Paradise-Encore/100067914352467/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Facebook className="h-3 w-3 mr-1" />
                          Marine Paradise
                        </a>
                      </div>
                    </div>
                    <div className="px-3 py-2">
                      <Link
                        href="/travel"
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                        onClick={closeMobileMenu}
                      >
                        KNB Travel & DMC
                      </Link>
                      <div className="flex flex-col gap-1 mt-1">
                        <a
                          href="https://www.facebook.com/ChakDePattaya/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Facebook className="h-3 w-3 mr-1" />
                          Chak De Pattaya
                        </a>
                        <a
                          href="https://www.facebook.com/theparadisepattaya/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Facebook className="h-3 w-3 mr-1" />
                          Paradise Pattaya
                        </a>
                      </div>
                    </div>
                    <Link
                      href="/services"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Business Services
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          />
        )}
      </nav>
    </header>
  );
}