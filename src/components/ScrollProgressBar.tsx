'use client';

import { useEffect, useRef } from 'react';

/**
 * Reading-progress bar.
 *
 * The transform is written straight to the DOM inside a rAF rather than going
 * through React state, and carries no CSS transition: the value already changes
 * once per frame, so a transition would only ever be re-targeted mid-flight and
 * make the bar lag behind the scroll in visible steps.
 */
export default function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;
    let scrollable = 0;

    // Cached so the scroll handler never reads scrollHeight (forced layout).
    const measure = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    const render = () => {
      frame = 0;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    const onResize = () => {
      measure();
      render();
    };

    measure();
    render();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Section reveals change the page height, so keep the scrollable range fresh.
    const observer = new ResizeObserver(onResize);
    observer.observe(document.documentElement);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transform: 'scaleX(0)' }}
      className="h-0.5 origin-left bg-gradient-to-r from-blue-500 to-purple-500 will-change-transform"
      aria-hidden="true"
    />
  );
}
