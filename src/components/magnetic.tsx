"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { clsx } from "clsx";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Magnetic CTA — the button subtly follows the cursor within its bounds,
 * with a strong hover lift. Falls back to a normal button under reduced motion
 * or on coarse-pointer (touch) devices.
 */
export function MagneticButton({ href, children, variant = "primary", className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer:fine)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  const cls = clsx(
    "group relative inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-7 text-[15px] font-semibold transition-[transform,box-shadow,background] duration-300 will-change-transform active:scale-[0.97]",
    variant === "primary" &&
      "bg-gradient-to-br from-cyan to-royal text-ink shadow-[0_10px_30px_-8px_rgba(24,224,255,.55)] hover:shadow-[0_20px_50px_-10px_rgba(24,224,255,.75)]",
    variant === "ghost" &&
      "glass text-fg hover:border-[var(--color-line-strong)] hover:bg-white/[0.09]",
    className,
  );

  const inner = (
    <>
      <span className="pointer-events-none relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -z-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </>
  );

  const props = {
    ref,
    className: cls,
    onMouseMove: onMove,
    onMouseLeave: reset,
  } as const;

  if (external) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...props}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {inner}
    </Link>
  );
}
