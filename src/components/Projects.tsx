'use client';

import { useMemo, useState } from 'react';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/data/types';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type Filter = ProjectCategory | 'All';

const categories: Filter[] = [
  'All',
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Filter>('All');

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Work"
          title="Featured Projects"
          description="Here are some of my recent projects that showcase my skills and experience in building modern web applications."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label="Filter projects by category">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === 'All'
                ? projects.length
                : projects.filter((project) => project.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isSelected}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                    : 'bg-gray-800 text-gray-300 ring-1 ring-white/5 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category}
                <span className={isSelected ? 'text-blue-100' : 'text-gray-500'}> ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80} className="h-full">
              <div className="h-full">
                <ProjectCard project={project} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <p className="text-center py-12 text-gray-400">
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
