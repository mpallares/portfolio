'use client';

import { personalInfo } from '@/data/personalInfo';
import { navItems } from '@/lib/navigation';
import { scrollToSection, scrollToTop } from '@/lib/scroll';
import { socialLinks } from '@/data/social';

const quickLinks = navItems.filter((item) => item.id !== 'home');

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 font-mono text-xs text-faint md:flex-row md:items-center md:justify-between">
        <p>
          <span className="text-fg">{personalInfo.name}</span>
          <span className="mx-2 text-line-strong">/</span>© {currentYear}
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {quickLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="rounded transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {item.label}
                </button>
              </li>
            ))}
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 self-start rounded transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:self-auto"
        >
          Back to top
          <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-6 6m6-6l6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
