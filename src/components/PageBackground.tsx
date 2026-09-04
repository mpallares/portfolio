/**
 * Ambient page background.
 *
 * One layer spanning the whole document (not the viewport), so the colour
 * fields are anchored to page positions and drift past as you scroll — the hero
 * simply sits at the top of the same continuous field rather than owning a
 * separate backdrop. Plain CSS radial gradients keep it free of filters, and a
 * fine grain overlay stops the large soft gradients from banding.
 */
const colourFields = [
  // Hero
  'radial-gradient(75rem 50rem at 18% 2%, rgb(99 102 241 / 0.16), transparent 62%)',
  // About / Projects
  'radial-gradient(60rem 45rem at 96% 24%, rgb(56 189 248 / 0.09), transparent 62%)',
  // Projects / Experience
  'radial-gradient(60rem 45rem at 4% 56%, rgb(45 212 191 / 0.07), transparent 62%)',
  // Contact / Footer
  'radial-gradient(55rem 40rem at 82% 88%, rgb(139 92 246 / 0.08), transparent 62%)',
];

export default function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="absolute inset-0" style={{ backgroundImage: colourFields.join(', ') }} />
      <div className="grain absolute inset-0" />
    </div>
  );
}
