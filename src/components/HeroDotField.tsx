'use client';

import { RefObject, useEffect, useRef } from 'react';
import { createDotField, Ellipse } from '@/lib/dotField';

/**
 * Ambient dot grid behind the hero: a plain 2D canvas, no library.
 *
 * The drawing itself lives in `lib/dotField`. This wrapper owns the canvas,
 * sizes it for the device pixel ratio, feeds it pointer events, and stops
 * rendering while the hero is off screen or the tab is hidden. Visitors who
 * prefer reduced motion get a single static frame.
 */

interface HeroDotFieldProps {
  /** Element the field gathers around, normally the portrait. */
  anchorRef?: RefObject<HTMLElement | null>;
}

/** Ellipse around the anchor element, or around the right half when there is none. */
function ellipseFor(canvas: HTMLCanvasElement, anchor: HTMLElement | null, width: number, height: number): Ellipse {
  if (anchor) {
    const canvasRect = canvas.getBoundingClientRect();
    const rect = anchor.getBoundingClientRect();
    // Below the lg breakpoint the portrait sits under the copy, so the ellipse
    // is pulled down and flattened to keep the dots off the buttons above it.
    const beside = width >= 1024;
    return {
      cx: rect.left - canvasRect.left + rect.width / 2,
      cy: rect.top - canvasRect.top + rect.height * (beside ? 0.5 : 0.68),
      rx: rect.width * 1.3,
      ry: rect.height * (beside ? 1.05 : 0.72),
    };
  }
  return { cx: width * 0.74, cy: height * 0.5, rx: width * 0.34, ry: height * 0.62 };
}

export default function HeroDotField({ anchorRef }: HeroDotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const field = createDotField(ctx);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;

    const loop = (now: number) => {
      frame = 0;
      field.draw(now);
      if (!reduceMotion.matches && visible && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      field.layout(rect.width, rect.height, ellipseFor(canvas, anchorRef?.current ?? null, rect.width, rect.height));
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion.matches || event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      field.pointTo(event.clientX - rect.left, event.clientY - rect.top);
    };
    const onPointerLeave = () => field.release();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    if (anchorRef?.current) resizeObserver.observe(anchorRef.current);
    resize();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', schedule);
    reduceMotion.addEventListener('change', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', schedule);
      reduceMotion.removeEventListener('change', schedule);
    };
  }, [anchorRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
