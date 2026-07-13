import Link from "next/link";
import type { ReactNode } from "react";
import { clsx } from "clsx";

/* ---------- Button / Link button ---------- */
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
  const cls = clsx(
    "group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-semibold transition-all duration-300",
    "active:scale-[0.98]",
    variant === "primary" &&
      "bg-gradient-to-br from-cyan to-royal text-ink shadow-[0_10px_30px_-8px_rgba(24,224,255,.5)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(24,224,255,.65)]",
    variant === "ghost" &&
      "glass text-fg hover:-translate-y-0.5 hover:border-[var(--color-line-strong)] hover:bg-white/[0.08]",
    className,
  );

  if (external) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ---------- Section heading ---------- */
type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, center, className }: HeadingProps) {
  return (
    <div className={clsx("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-cyan">
          <span className="h-px w-5 bg-cyan/60" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3.5 text-[clamp(30px,5vw,48px)]">{title}</h2>
      {intro && <p className="mt-4 text-[clamp(16px,2vw,18px)] text-body">{intro}</p>}
    </div>
  );
}

/* ---------- Eyebrow badge ---------- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-cyan">
      <span className="h-px w-5 bg-cyan/60" aria-hidden />
      {children}
    </span>
  );
}
