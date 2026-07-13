"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps a region and moves a radial glow (via CSS vars) toward the pointer.
 * Uses the `.mouse-glow` CSS defined in globals.css.
 */
export function MouseGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={onMove} className={`mouse-glow ${className}`}>
      {children}
    </div>
  );
}
