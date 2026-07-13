import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

/** Consistent hero band for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative pb-[clamp(40px,6vw,72px)] pt-[clamp(40px,7vw,80px)]">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(30px,6vw,64px)] font-bold">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-[62ch] text-[clamp(16px,2.2vw,20px)] leading-relaxed text-body">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
