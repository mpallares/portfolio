/**
 * Drawing logic for the hero dot field, kept free of React and the DOM so it
 * can be driven frame by frame outside a browser.
 *
 * The grid breathes with a slow ripple and leans toward the pointer, and is
 * masked to an ellipse so it fades out before reaching the headline column.
 */

export const SPACING = 26;
export const BASE_RADIUS = 1.25;
export const CURSOR_RADIUS = 170;
export const CURSOR_PULL = 22;

const ACCENT = '232, 184, 74';
const NEUTRAL = '242, 240, 234';

/** The subset of CanvasRenderingContext2D the field draws with. */
export interface DotCanvasContext {
  fillStyle: string | CanvasGradient | CanvasPattern;
  clearRect(x: number, y: number, w: number, h: number): void;
  beginPath(): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void;
  fill(): void;
}

export interface Ellipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

interface Dot {
  x: number;
  y: number;
  /** Mask weight, 0..1, fixed per layout. */
  mask: number;
  accent: boolean;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Soft elliptical mask, 1 at the centre and 0 past the rim. */
export function maskAt(x: number, y: number, { cx, cy, rx, ry }: Ellipse) {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return 1 - smoothstep(0.55, 1.05, Math.sqrt(dx * dx + dy * dy));
}

export function buildGrid(width: number, height: number, ellipse: Ellipse): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.ceil(width / SPACING) + 1;
  const rows = Math.ceil(height / SPACING) + 1;
  const offsetX = (width - (cols - 1) * SPACING) / 2;
  const offsetY = (height - (rows - 1) * SPACING) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetX + col * SPACING;
      const y = offsetY + row * SPACING;
      const mask = maskAt(x, y, ellipse);
      if (mask < 0.02) continue;
      // Deterministic sprinkle of accent dots so the field is stable across resizes.
      const hash = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
      dots.push({ x, y, mask, accent: hash - Math.floor(hash) < 0.22 });
    }
  }
  return dots;
}

export interface DotField {
  /** Rebuilds the grid for a new canvas size (in CSS pixels) and mask. */
  layout(width: number, height: number, ellipse: Ellipse): void;
  /** Moves the pointer target, in canvas coordinates. */
  pointTo(x: number, y: number): void;
  /** Lets the pointer influence fade out. */
  release(): void;
  /** Draws one frame at time `now` (ms). Returns the number of dots drawn. */
  draw(now: number): number;
}

export function createDotField(ctx: DotCanvasContext): DotField {
  let dots: Dot[] = [];
  let width = 0;
  let height = 0;
  let start: number | null = null;
  let last = 0;

  // Pointer state in canvas coordinates; `strength` eases in and out so the
  // field never snaps when the cursor enters or leaves.
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, targetStrength: 0 };

  const colourCache = new Map<string, string>();
  const colour = (rgb: string, alpha: number) => {
    const step = (alpha * 50) | 0;
    const key = `${rgb}:${step}`;
    let value = colourCache.get(key);
    if (!value) {
      value = `rgba(${rgb}, ${step / 50})`;
      colourCache.set(key, value);
    }
    return value;
  };

  return {
    layout(nextWidth, nextHeight, ellipse) {
      width = nextWidth;
      height = nextHeight;
      dots = buildGrid(width, height, ellipse);
    },

    pointTo(x, y) {
      pointer.targetX = x;
      pointer.targetY = y;
      pointer.targetStrength = 1;
    },

    release() {
      pointer.targetStrength = 0;
    },

    draw(now) {
      if (start === null) {
        start = now;
        last = now;
      }
      const t = (now - start) / 1000;
      // Time-based easing so the response feels the same at any frame rate.
      const dt = Math.min(Math.max(now - last, 0) / 1000, 0.1);
      last = now;
      const follow = 1 - Math.exp(-dt * 8);
      const fade = 1 - Math.exp(-dt * 5);

      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * follow;
      pointer.y += (pointer.targetY - pointer.y) * follow;
      pointer.strength += (pointer.targetStrength - pointer.strength) * fade;

      let drawn = 0;
      for (const dot of dots) {
        // Slow ripple across the grid.
        const wave = Math.sin(dot.x * 0.018 + t * 0.9) * Math.cos(dot.y * 0.014 - t * 0.6);
        let x = dot.x + wave * 2.5;
        let y = dot.y + Math.sin(dot.y * 0.02 + t * 0.7) * 2;
        let alpha = dot.mask * (0.3 + 0.26 * (wave * 0.5 + 0.5));
        let radius = BASE_RADIUS;

        if (pointer.strength > 0.01) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS * 2) {
            const influence =
              Math.exp(-(dist * dist) / (CURSOR_RADIUS * CURSOR_RADIUS)) * pointer.strength;
            const pull = (CURSOR_PULL * influence) / Math.max(dist, 1);
            x += dx * pull;
            y += dy * pull;
            alpha += influence * 0.7;
            radius += influence * 1.8;
          }
        }

        if (alpha < 0.02) continue;
        ctx.fillStyle = colour(dot.accent ? ACCENT : NEUTRAL, Math.min(alpha, 0.95));
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        drawn++;
      }
      return drawn;
    },
  };
}
