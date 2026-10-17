import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** The first two projects lead the grid at half width; the rest sit three across. */
const FEATURED_COUNT = 2;

export default function Projects() {
  return (
    <section id="projects" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Projects"
          title="Selected work"
          description="Side projects and production apps, mostly around payments, wallets and on-chain data."
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((project, index) => {
            const featured = index < FEATURED_COUNT;
            return (
              <li key={project.id} className={featured ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <Reveal delay={(index % 3) * 80} className="h-full">
                  <ProjectCard project={project} index={index} featured={featured} />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
