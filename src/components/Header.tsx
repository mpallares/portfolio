'use client';

import { useEffect, useState } from 'react';
import { navItems } from '@/lib/navigation';
import { HEADER_OFFSET, scrollToSection } from '@/lib/scroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import ScrollProgressBar from './ScrollProgressBar';
import { personalInfo } from '@/data/personalInfo';

const sectionIds = navItems.map((item) => item.id);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrolled();
  const activeSection = useActiveSection(sectionIds, HEADER_OFFSET);

  // Close the mobile menu on Escape and whenever the viewport grows to desktop.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onChange = () => desktop.matches && setIsMobileMenuOpen(false);

    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [isMobileMenuOpen]);

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isMobileMenuOpen
          ? 'bg-gray-950/95 backdrop-blur-md border-b border-white/5'
          : isScrolled
            ? 'bg-gray-950/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center justify-between h-20">
          {/* Brand: a plain wordmark, revealed only once the hero's own
              headline has scrolled out of view. */}
          <button
            onClick={() => handleNavigate('home')}
            aria-label={`${personalInfo.name} — back to top`}
            className={`-mx-1 rounded-lg px-1 text-sm font-semibold tracking-tight text-gray-200 transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              isScrolled ? 'translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
            }`}
          >
            {personalInfo.name}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-blue-400" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  className={`text-left px-4 py-2.5 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-500/10 text-blue-400 font-medium'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <ScrollProgressBar />
    </header>
  );
}
