interface SectionHeadingProps {
  /** Two-digit section number, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

/**
 * Left-aligned section header. The number and eyebrow sit in a narrow mono
 * column on desktop, with the title and description beside them, so every
 * section opens on the same grid.
 */
export default function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 grid gap-6 border-t border-line pt-8 sm:mb-20 lg:grid-cols-[11rem_1fr] lg:gap-10">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
        {index && (
          <>
            <span className="text-accent">{index}</span>
            <span className="mx-2 text-line-strong">/</span>
          </>
        )}
        {eyebrow}
      </p>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
        {description && <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>}
      </div>
    </div>
  );
}
