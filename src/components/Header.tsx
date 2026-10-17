'use client';

import { useEffect, useState } from 'react';
import { navItems } from '@/lib/navigation';
import { HEADER_OFFSET, scrollToSection } from '@/lib/scroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import ScrollProgressBar from './ScrollProgressBar';
import { personalInfo } from '@/data/personalInfo';

const sectionIds = navItems.map((item) => item.id);
// The wordmark already takes you home, so the nav only lists the sections.
const sectionLinks = navItems.filter((item) => item.id !== 'home');

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

  const solid = isMobileMenuOpen || isScrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-line bg-bg/80 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12" aria-label="Main">
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark, revealed once the hero's own name line has scrolled away. */}
          <button
            onClick={() => handleNavigate('home')}
            aria-label={`${personalInfo.name} — back to top`}
            className={`-mx-1 rounded px-1 font-mono text-sm tracking-tight text-fg transition-all duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
              isScrolled ? 'translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
            }`}
          >
            {personalInfo.name}
          </button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {sectionLinks.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group inline-flex items-center gap-2 rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] transition-colors ${
                      isActive ? 'text-accent' : 'text-faint group-hover:text-muted'
                    }`}
                  >
                    0{index + 1}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="-mr-2 rounded-full p-2 text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-line py-3 md:hidden">
            <ul>
              {sectionLinks.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigate(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left text-lg transition-colors ${
                        isActive ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      <span className={`font-mono text-xs ${isActive ? 'text-accent' : 'text-faint'}`}>
                        0{index + 1}
                      </span>
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      <ScrollProgressBar />
    </header>
  );
}
