/**
 * Ambient page background.
 *
 * One layer spanning the whole document (not the viewport), so the colour
 * fields are anchored to page positions and drift past as you scroll. Kept
 * nearly monochrome: a warm glow behind the hero, a cooler one further down,
 * and a fine grain overlay so the large soft gradients do not band.
 */
const colourFields = [
  // Hero
  'radial-gradient(70rem 45rem at 12% 0%, rgb(232 184 74 / 0.10), transparent 60%)',
  // Projects
  'radial-gradient(55rem 40rem at 100% 38%, rgb(255 255 255 / 0.04), transparent 60%)',
  // Contact
  'radial-gradient(60rem 40rem at 0% 92%, rgb(232 184 74 / 0.06), transparent 60%)',
];

export default function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0" style={{ backgroundImage: colourFields.join(', ') }} />
      <div className="grain absolute inset-0" />
    </div>
  );
}
