import { personalInfo } from '@/data/personalInfo';
import { experiences } from '@/data/experience';
import { skillGroups } from '@/data/skills';
import EmailProtected from './EmailProtected';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const current = experiences.find((experience) => experience.endDate === 'Present');

export default function About() {
  const facts: { label: string; value: React.ReactNode }[] = [
    { label: 'Location', value: personalInfo.location },
    { label: 'Experience', value: `${personalInfo.yearsOfExperience}+ years` },
    ...(current ? [{ label: 'Currently', value: `${current.role}, ${current.company}` }] : []),
    { label: 'Email', value: <EmailProtected showCopyButton={false} /> },
  ];

  return (
    <section id="about" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Product-minded engineer, <span className="em">fluent</span> across the stack.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-[11rem_1fr] lg:gap-10">
          {/* Spacer column keeps the body on the heading grid. */}
          <div className="hidden lg:block" aria-hidden="true" />

          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                {personalInfo.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <dl className="mt-10">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-t border-line py-3.5 last:border-b"
                  >
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-faint">{fact.label}</dt>
                    <dd className="text-sm text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-faint">
                Skills &amp; tools
              </h3>
              <div>
                {skillGroups.map((group) => (
                  <div
                    key={group.category}
                    className="grid gap-3 border-t border-line py-5 last:border-b sm:grid-cols-[7rem_1fr] sm:gap-4"
                  >
                    <h4 className="pt-1 text-sm font-medium text-fg">{group.label}</h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="rounded-md bg-surface px-2.5 py-1 font-mono text-[12px] text-muted ring-1 ring-line transition-colors hover:text-fg hover:ring-line-strong"
                        >
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
