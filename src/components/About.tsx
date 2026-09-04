import { personalInfo } from '@/data/personalInfo';
import { skillGroups } from '@/data/skills';
import EmailProtected from './EmailProtected';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 section-wash">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="About" title="About Me" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <Reveal className="space-y-6">
            <div className="space-y-4">
              {personalInfo.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Info */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-gray-800/80 rounded-xl ring-1 ring-white/5">
                <dt className="text-sm text-gray-400 mb-1">Email</dt>
                <dd className="text-white font-medium">
                  <EmailProtected showCopyButton={false} />
                </dd>
              </div>
              <div className="p-4 bg-gray-800/80 rounded-xl ring-1 ring-white/5">
                <dt className="text-sm text-gray-400 mb-1">Location</dt>
                <dd className="text-white font-medium">{personalInfo.location}</dd>
              </div>
            </dl>
          </Reveal>

          {/* Skills Section */}
          <Reveal delay={120} className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Skills &amp; Technologies
            </h3>

            <div className="space-y-6">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                    {group.label}
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ring-1 transition-transform hover:scale-105 ${group.chipClassName}`}
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
    </section>
  );
}
