import { Project } from '@/data/types';
import { ArrowOut, SocialIcon } from './SocialLinks';

interface ProjectCardProps {
  project: Project;
  /** Position in the list, rendered as a two-digit index. */
  index: number;
  /** Featured cards are wider and show the long description. */
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const description = featured && project.longDescription ? project.longDescription : project.description;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-line transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-surface-strong hover:ring-line-strong sm:p-7">
      <header className="mb-5 flex items-center justify-between font-mono text-xs text-faint">
        <span>
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
        </span>
        <span className="uppercase tracking-[0.16em]">{project.category}</span>
      </header>

      <h3 className={`font-medium tracking-tight text-fg ${featured ? 'text-2xl sm:text-[1.75rem]' : 'text-xl'}`}>
        {project.title}
      </h3>
      <p className={`mt-3 leading-relaxed text-muted ${featured ? 'text-base' : 'text-sm'}`}>{description}</p>

      <ul className="mb-7 mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-faint" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <footer className="mt-auto flex items-center gap-5 border-t border-line pt-5">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-fg transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Live
            <ArrowOut />
            <span className="sr-only">: {project.title}</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <SocialIcon icon="github" className="h-4 w-4" />
            Source
            <span className="sr-only"> code for {project.title}</span>
          </a>
        )}
      </footer>
    </article>
  );
}
