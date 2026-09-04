import { experiences } from '@/data/experience';
import { formatDuration, formatRange } from '@/lib/dates';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 section-wash">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Career"
          title="Work Experience"
          description="My professional journey and the companies I’ve had the privilege to work with."
        />

        {/* Timeline */}
        <ol className="relative border-l border-blue-500/30 ml-3 md:ml-0 md:border-l-0 space-y-10">
          {/* Center line on desktop */}
          <span
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/30 to-transparent"
            aria-hidden="true"
          />

          {experiences.map((experience, index) => {
            const isCurrent = experience.endDate === 'Present';
            const alignRight = index % 2 !== 0;

            return (
              <li key={experience.id} className="relative md:flex md:items-start">
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[7px] md:left-1/2 md:-translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full border-4 border-gray-900 z-10 ${
                    isCurrent ? 'bg-blue-400' : 'bg-blue-600'
                  }`}
                  aria-hidden="true"
                />

                <div
                  className={`pl-6 w-full md:w-1/2 ${
                    alignRight ? 'md:ml-auto md:pl-12 md:pr-0' : 'md:pl-0 md:pr-12'
                  }`}
                >
                  <Reveal delay={index * 100}>
                    <article className="bg-gray-800/80 rounded-xl ring-1 ring-white/5 shadow-lg p-6 transition-all duration-300 hover:ring-white/10 hover:-translate-y-1">
                      <header className="mb-4">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold ring-1 ring-blue-400/20">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-blue-400 font-medium">{experience.company}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {formatRange(experience.startDate, experience.endDate)}
                          <span className="mx-2 text-gray-600">&middot;</span>
                          {formatDuration(experience.startDate, experience.endDate)}
                        </p>
                      </header>

                      <p className="text-gray-300 mb-4">{experience.description}</p>

                      <ul className="space-y-2 mb-5">
                        {experience.achievements.map((achievement) => (
                          <li key={achievement.slice(0, 32)} className="flex gap-3 text-sm text-gray-400">
                            <svg
                              className="w-4 h-4 mt-0.5 shrink-0 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <ul className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {experience.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
