"use client";

import { useState, type ReactNode } from "react";

/**
 * Footer column that collapses into an accordion on mobile (tap to expand)
 * and renders as a normal always-open column on desktop (≥768px).
 */
export function FooterSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[var(--color-line)] md:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left md:pointer-events-none md:py-0"
      >
        <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">{title}</span>
        <span
          aria-hidden
          className="text-[22px] font-light leading-none text-faint transition-transform duration-300 md:hidden"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </button>
      <div className={`${open ? "block" : "hidden"} pb-4 md:block md:pb-0 md:pt-4`}>{children}</div>
    </div>
  );
}
