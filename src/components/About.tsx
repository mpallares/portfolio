'use client';

import { personalInfo } from '@/data/personalInfo';
import { skillsByCategory } from '@/data/skills';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              {personalInfo.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Email
                </p>
                <p className="text-gray-900 dark:text-white font-medium break-all">
                  {personalInfo.email}
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Location
                </p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {personalInfo.location}
                </p>
              </div>
            </div>

            {/* Download Resume Button */}
            <div className="pt-4">
              <a
                href={personalInfo.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Skills & Technologies
              </h3>

              {/* Frontend Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsByCategory.frontend.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:scale-105 transition-transform cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsByCategory.backend.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium hover:scale-105 transition-transform cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Database
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsByCategory.database.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium hover:scale-105 transition-transform cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools Skills */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Tools & DevOps
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsByCategory.tools.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium hover:scale-105 transition-transform cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
