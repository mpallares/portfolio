'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { personalInfo } from '@/data/personalInfo';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-2">
              <p className="text-blue-600 dark:text-blue-400 font-medium text-base sm:text-lg">
                Hi, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 dark:text-gray-300 leading-tight">
                {personalInfo.role}
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {personalInfo.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium rounded-lg transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {personalInfo.yearsOfExperience}+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  3
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Companies
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  20+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Technologies
                </p>
              </div>
            </div>
          </div>

          {/* Image/Avatar */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Floating decoration */}
              <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" />
              <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" />

              {/* Profile Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-2xl">
                <Image
                  src="/maria-image.jpg"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
