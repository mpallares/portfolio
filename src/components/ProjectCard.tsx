import { Project, ProjectCategory } from '@/data/types';

interface ProjectCardProps {
  project: Project;
}

/**
 * One muted accent per category, all drawn from the same blue-to-teal range so
 * the grid reads as a set rather than three competing colour schemes. The
 * accent is exposed as a CSS variable and only ever used at low opacity.
 */
const categoryAccents: Record<ProjectCategory, string> = {
  'Full Stack': '#818cf8', // indigo-400
  Frontend: '#38bdf8', // sky-400
  Backend: '#2dd4bf', // teal-400
};

/** Outline glyph hinting at where each category's work actually lives. */
const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
  'Full Stack': (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 3l9 4.5-9 4.5-9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5"
    />
  ),
  Frontend: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
  Backend: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
  ),
};

const MAX_VISIBLE_TECHNOLOGIES = 5;

export default function ProjectCard({ project }: ProjectCardProps) {
  const accent = categoryAccents[project.category];
  const visibleTechnologies = project.technologies.slice(0, MAX_VISIBLE_TECHNOLOGIES);
  const hiddenCount = project.technologies.length - visibleTechnologies.length;

  return (
    <article
      style={{ '--accent': accent } as React.CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/50 ring-1 ring-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800/70 hover:ring-white/20"
    >
      {/* Accent rule along the top edge */}
      <span
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ backgroundImage: `linear-gradient(to right, ${accent}, ${accent}40 35%, transparent 80%)` }}
        aria-hidden="true"
      />
      {/* Soft corner glow, the only other place the accent appears */}
      <span
        className="pointer-events-none absolute -left-16 -top-20 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-30"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col p-6">
        {/* Category */}
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/10">
          <svg
            className="h-3.5 w-3.5 text-[var(--accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {categoryIcons[project.category]}
          </svg>
          {project.category}
        </span>

        <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[var(--accent)]">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-400">{project.description}</p>

        {/* Technologies */}
        <ul className="mb-6 mt-4 flex flex-wrap gap-2">
          {visibleTechnologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/10"
            >
              {tech}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li
              className="px-2 py-1 text-xs font-medium text-gray-500"
              title={project.technologies.slice(MAX_VISIBLE_TECHNOLOGIES).join(', ')}
            >
              +{hiddenCount} more
            </li>
          )}
        </ul>

        {/* Links */}
        <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live demo
              <span className="sr-only">of {project.title}</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              Source
              <span className="sr-only">code for {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
