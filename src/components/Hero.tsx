'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { personalInfo } from '@/data/personalInfo';
import { totalSkills } from '@/data/skills';
import { projects } from '@/data/projects';
import { scrollToSection } from '@/lib/scroll';

const Hero3DBackground = dynamic(() => import('./Hero3DBackground'), {
  ssr: false,
  loading: () => null,
});

const stats = [
  { value: `${personalInfo.yearsOfExperience}+`, label: 'Years Experience' },
  { value: `${totalSkills}+`, label: 'Technologies' },
  { value: `${projects.length}`, label: 'Featured Projects' },
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
    >
      <Hero3DBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 ring-1 ring-blue-400/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                </span>
                Hi, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                {personalInfo.role}
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
              {personalInfo.tagline}
            </p>

            {/* Core stack */}
            <ul className="flex flex-wrap gap-2" aria-label="Core technologies">
              {personalInfo.coreStack.map((tech) => (
                <li
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-200 text-sm font-medium ring-1 ring-white/10 backdrop-blur-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border border-blue-400/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 font-medium rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                Get In Touch
              </button>
            </div>

            {/* Quick Stats */}
            <dl className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-3xl font-bold text-blue-400">{stat.value}</dd>
                  <dt className="text-sm text-gray-400">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Image/Avatar */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Floating decoration */}
              <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-600/40 blur-3xl animate-blob" />
              <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-600/35 blur-3xl animate-blob animation-delay-2000" />

              {/* Profile Image */}
              <div className="relative z-10 h-full w-full overflow-hidden rounded-full ring-4 ring-blue-400/60 shadow-2xl">
                <Image
                  src="/maria-image.jpg"
                  alt={`Portrait of ${personalInfo.name}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-2 rounded-full text-gray-400 hover:text-blue-400 transition-colors animate-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-label="Scroll to about section"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}
