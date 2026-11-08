import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CustomCursor — premium animated cursor for desktop devices.
 *
 * Design:
 *  - Small central dot (4px) that snaps to the real pointer position
 *  - Larger circular outline (32px) that follows with smooth easing
 *  - Purple accent glow matching the portfolio theme
 *  - Expands & changes on interactive elements (links, buttons, cards)
 *  - Respects prefers-reduced-motion
 *  - Disabled entirely on touch devices & small screens
 *  - pointer-events: none so it never blocks interactions
 */

interface CursorState {
  x: number;
  y: number;
  ringX: number;
  ringY: number;
  isHovering: boolean;
  isVisible: boolean;
}

const EASING = 0.12; // ring follow speed (0 = instant, 1 = never moves)

export const CustomCursor: React.FC = () => {
  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isTouch] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(hover: none)').matches || window.innerWidth < 768;
  });

  const stateRef = useRef<CursorState>({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    isHovering: false,
    isVisible: false,
  });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const animateRing = useCallback(() => {
    const s = stateRef.current;

    // Ease the ring toward the dot position
    s.ringX += (s.x - s.ringX) * EASING;
    s.ringY += (s.y - s.ringY) * EASING;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${s.x}px, ${s.y}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${s.ringX}px, ${s.ringY}px)`;
    }

    rafRef.current = requestAnimationFrame(animateRing);
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const s = stateRef.current;
      s.x = e.clientX;
      s.y = e.clientY;
      if (!s.isVisible) {
        s.ringX = e.clientX;
        s.ringY = e.clientY;
        s.isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    const handleMouseEnter = () => {
      stateRef.current.isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      stateRef.current.isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover], .project-card'
      );
      const isHovering = !!interactive;
      stateRef.current.isHovering = isHovering;

      if (ringRef.current) {
        if (isHovering) {
          ringRef.current.classList.add('cursor-ring--hover');
        } else {
          ringRef.current.classList.remove('cursor-ring--hover');
        }
      }
      if (dotRef.current) {
        if (isHovering) {
          dotRef.current.classList.add('cursor-dot--hover');
        } else {
          dotRef.current.classList.remove('cursor-dot--hover');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hide the native cursor globally on desktop
    document.documentElement.classList.add('custom-cursor-active');

    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, reducedMotion, animateRing]);

  // Don't render on touch devices or if user prefers reduced motion
  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Central Dot — snaps to pointer position */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
      {/* Outer Ring — follows with easing */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </>
  );
};
