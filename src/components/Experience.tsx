import { experiences } from '@/data/experience';
import { formatDuration, formatRange } from '@/lib/dates';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where I've worked"
          description="Startups and scale-ups in Web3 and fintech, mostly on small teams with a lot of ownership."
        />

        <ol>
          {experiences.map((experience, index) => {
            const isCurrent = experience.endDate === 'Present';

            return (
              <li key={experience.id} className="border-t border-line">
                <Reveal delay={index * 80}>
                  <article className="grid gap-6 py-10 lg:grid-cols-[11rem_1fr] lg:gap-10">
                    <div className="font-mono text-xs text-faint">
                      <p className="text-fg">{formatRange(experience.startDate, experience.endDate)}</p>
                      <p className="mt-1">{formatDuration(experience.startDate, experience.endDate)}</p>
                      {isCurrent && (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                          Now
                        </p>
                      )}
                    </div>

                    <div className="max-w-3xl">
                      <header>
                        <h3 className="text-xl font-medium tracking-tight text-fg sm:text-2xl">
                          {experience.role}
                          <span className="text-muted"> · {experience.company}</span>
                        </h3>
                      </header>

                      <p className="mt-3 text-base leading-relaxed text-muted">{experience.description}</p>

                      <ul className="mt-6 space-y-2.5">
                        {experience.achievements.map((achievement) => (
                          <li
                            key={achievement.slice(0, 32)}
                            className="grid grid-cols-[1rem_1fr] gap-3 text-sm leading-relaxed text-muted"
                          >
                            <span className="mt-[0.7em] h-px w-3 bg-accent/70" aria-hidden="true" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-faint" aria-label="Technologies">
                        {experience.technologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
