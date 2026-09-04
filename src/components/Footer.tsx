'use client';

import { personalInfo } from '@/data/personalInfo';
import { navItems } from '@/lib/navigation';
import { scrollToSection, scrollToTop } from '@/lib/scroll';
import SocialLinks from './SocialLinks';

const quickLinks = navItems.filter((item) => item.id !== 'home');

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950/50 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{personalInfo.name}</h2>
            <p className="text-gray-400">{personalInfo.role}</p>
            <p className="text-sm text-gray-500 mt-2">{personalInfo.tagline}</p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <SocialLinks iconClassName="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Scroll to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
