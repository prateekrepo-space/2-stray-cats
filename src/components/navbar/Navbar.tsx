'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PaletteThemeSwitcher from '../theme/PaletteThemeSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[rgba(8,12,24,0.92)] backdrop-blur-md border-b border-[#2a3050]/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="#hero" className="font-pixel text-white flex items-center gap-2 text-sm sm:text-base tracking-wider hover:text-[#ffcc44] transition-colors">
              <span>🐾</span> 2 STRAY CATS
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#hero" className="text-gray-300 hover:text-[#ffcc44] px-3 py-2 text-xs font-pixel transition-colors">Home</Link>
            <Link href="#intro" className="text-gray-300 hover:text-[#ffcc44] px-3 py-2 text-xs font-pixel transition-colors">Our Story</Link>
            <Link href="#features" className="text-gray-300 hover:text-[#ffcc44] px-3 py-2 text-xs font-pixel transition-colors">Memories</Link>
            <Link href="#features" className="text-gray-300 hover:text-[#ffcc44] px-3 py-2 text-xs font-pixel transition-colors">Little Things</Link>

            {/* Retro Color Palette Theme Switcher */}
            <PaletteThemeSwitcher />
          </div>
          
          {/* Mobile controls & menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <PaletteThemeSwitcher />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.1)] focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden fixed top-16 right-0 w-64 h-screen bg-[rgba(8,12,24,0.95)] backdrop-blur-md transform transition-transform duration-300 ease-in-out border-l border-gray-800 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-4 pt-6 pb-3 space-y-4 flex flex-col font-pixel text-xs">
          <Link href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ffcc44] block py-2 transition-colors">Home</Link>
          <Link href="#intro" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ffcc44] block py-2 transition-colors">Our Story</Link>
          <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ffcc44] block py-2 transition-colors">Memories</Link>
          <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ffcc44] block py-2 transition-colors">Little Things</Link>
        </div>
      </div>
    </nav>
  );
}
