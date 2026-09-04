// Shared smooth-scrolling helpers so every nav surface uses the same offset.

/** Height of the fixed header, in pixels. */
export const HEADER_OFFSET = 80;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const behavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth');

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: behavior() });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: behavior() });
}
