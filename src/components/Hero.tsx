'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { personalInfo } from '@/data/personalInfo';
import { experiences } from '@/data/experience';
import { scrollToSection } from '@/lib/scroll';
import SocialLinks from './SocialLinks';

const Hero3DBackground = dynamic(() => import('./Hero3DBackground'), {
  ssr: false,
  loading: () => null,
});

const current = experiences.find((experience) => experience.endDate === 'Present');

/** Splits the headline around the emphasised phrase so it can be set in the display face. */
function Headline({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis || !text.includes(emphasis)) return <>{text}</>;
  const [before, after] = text.split(emphasis);
  return (
    <>
      {before}
      <span className="em">{emphasis}</span>
      {after}
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-20 lg:px-12"
    >
      <Hero3DBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          {/* Text */}
          <div>
            <p
              className="rise mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-faint"
              style={{ animationDelay: '0ms' }}
            >
              <span className="text-fg">{personalInfo.name}</span>
              <span aria-hidden="true" className="text-line-strong">/</span>
              <span>{personalInfo.role}</span>
              <span aria-hidden="true" className="text-line-strong">/</span>
              <span>{personalInfo.location}</span>
            </p>

            <h1
              className="rise max-w-4xl text-[2.6rem] font-medium leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              <Headline text={personalInfo.headline} emphasis={personalInfo.headlineEmphasis} />
            </h1>

            <p
              className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              {personalInfo.intro}
            </p>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ animationDelay: '240ms' }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                See selected work
                <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full px-2 py-3 text-sm font-medium text-fg underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Get in touch
              </button>
              <SocialLinks className="sm:ml-auto" />
            </div>

            {current && (
              <p
                className="rise mt-12 inline-flex items-center gap-3 border-t border-line pt-6 font-mono text-xs text-faint"
                style={{ animationDelay: '320ms' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span>
                  Currently {current.role} at <span className="text-fg">{current.company}</span>
                </span>
              </p>
            )}
          </div>

          {/* Portrait */}
          <div className="rise flex justify-center lg:justify-end" style={{ animationDelay: '200ms' }}>
            <figure className="relative w-56 sm:w-72 lg:w-full lg:max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface ring-1 ring-line">
                <Image
                  src="/maria-image.jpg"
                  alt={`Portrait of ${personalInfo.name}`}
                  fill
                  className="object-cover grayscale contrast-[1.05]"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 384px"
                />
                <div className="grain absolute inset-0" aria-hidden="true" />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="absolute -bottom-3 left-1/2 w-max -translate-x-1/2 rounded-full border border-line bg-bg/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted backdrop-blur">
                <span className="sm:hidden">{personalInfo.yearsOfExperience}+ yrs experience</span>
                <span className="hidden sm:inline">
                  {personalInfo.yearsOfExperience}+ yrs · {personalInfo.coreStack.join(' · ')}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
