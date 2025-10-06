'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CartIcon } from './CartIcon';
import { CartSidebar } from './CartSidebar';
import Footer from './ui/animated-footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className={`${isHomePage ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomePage 
            ? (isScrolled 
                ? 'bg-white/60 backdrop-blur-md shadow-sm border-b border-white/20' 
                : 'bg-transparent')
            : 'bg-white shadow-sm border-b'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 relative">
              {/* Mobile menu button - left on mobile */}
              <div className="flex items-center md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`focus:outline-none transition-colors duration-300 ${
                    isHomePage 
                      ? (isScrolled 
                          ? 'text-gray-700 hover:text-gray-900 focus:text-gray-900' 
                          : 'text-white hover:text-gray-200 focus:text-gray-200')
                      : 'text-gray-700 hover:text-gray-900 focus:text-gray-900'
                  }`}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Navigation links on the left - desktop only */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isHomePage 
                    ? (isScrolled 
                        ? 'text-gray-700 hover:text-pink-600' 
                        : 'text-white hover:text-pink-200')
                    : 'text-gray-700 hover:text-pink-600'
                }`}>
                  Home
                </Link>
                <Link href="/products" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isHomePage 
                    ? (isScrolled 
                        ? 'text-gray-700 hover:text-pink-600' 
                        : 'text-white hover:text-pink-200')
                    : 'text-gray-700 hover:text-pink-600'
                }`}>
                  Products
                </Link>
                <Link href="/about" className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isHomePage 
                    ? (isScrolled 
                        ? 'text-gray-700 hover:text-pink-600' 
                        : 'text-white hover:text-pink-200')
                    : 'text-gray-700 hover:text-pink-600'
                }`}>
                  About
                </Link>
              </nav>
              
              {/* Logo in the center - hidden on home page hero */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                isHomePage && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
                <Link href="/" className="flex items-center">
                  <Image 
                    src="/images/logocrace.png" 
                    alt="CRAVE ANGEL BAKES Logo" 
                    width={120} 
                    height={60} 
                    className="h-12 w-auto sm:h-16 object-contain"
                    priority
                  />
                </Link>
              </div>
              
              {/* Cart icon on the right */}
              <div className="flex items-center">
                <div className={`transition-colors duration-300 ${
                  isHomePage 
                    ? (isScrolled ? 'text-gray-700' : 'text-white')
                    : 'text-gray-700'
                }`}>
                  <CartIcon />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        <div className={`md:hidden ${isHomePage ? 'fixed' : 'relative'} top-16 left-0 right-0 z-40 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className={`${
            isHomePage 
              ? 'bg-white/95 backdrop-blur-md' 
              : 'bg-white'
          } border-b shadow-lg`}>
            <nav className="px-4 py-2 space-y-1">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors duration-200"
              >
                Products
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors duration-200"
              >
                About
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-25" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Animated Footer */}
        <Footer
          leftLinks={[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: "/about", label: "About" },
          ]}
          rightLinks={[
            { href: "mailto:info@craveangelbakes.com", label: "Email Us" },
            { href: "tel:+15551234567", label: "Call Us" },
            { href: "https://www.instagram.com/craveangelbakes", label: "Instagram" },
            { href: "https://www.facebook.com/craveangelbakes", label: "Facebook" },
            { href: "https://www.tiktok.com/@craveangelbakes", label: "TikTok" },
          ]}
          copyrightText="© 2024 CRAVE ANGEL BAKES. All rights reserved."
          barCount={25}
        />

        {/* Cart Sidebar */}
        <CartSidebar />
      </div>
  );
} 