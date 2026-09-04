'use client';

import { useLayoutEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger in milliseconds, applied as a transition delay. */
  delay?: number;
  className?: string;
}

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect;

/**
 * Fades and lifts its children into view the first time they are scrolled to.
 *
 * Content renders visible by default and is only hidden once JS has mounted and
 * confirmed the element is still below the fold, so it can never get stuck
 * invisible (no JS, no IntersectionObserver, or a delayed callback).
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    // Already on screen at mount: leave it visible rather than flashing it out.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setIsHidden(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isHidden ? '0ms' : `${delay}ms` }}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        isHidden ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}
