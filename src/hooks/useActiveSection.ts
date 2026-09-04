'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Cheaper than measuring every section on each scroll event.
 */
export function useActiveSection(sectionIds: string[], offset = 80) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // The section covering the most of the viewport wins, falling back to
        // document order so ties resolve predictably.
        let best: string | null = null;
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = visible.get(id);
          if (ratio !== undefined && ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        if (best) setActiveSection(best);
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // sectionIds is a module-level constant; join keeps the dep primitive.
  }, [sectionIds, offset]);

  return activeSection;
}
