import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

/** Shared shell for legal / policy pages with readable prose styling. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={`Last updated: ${updated}`} />
      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <Reveal>
          <div className="mx-auto max-w-[72ch] space-y-8 text-[16px] leading-relaxed text-muted [&_h2]:mt-2 [&_h2]:text-[22px] [&_h2]:text-fg [&_h3]:text-[18px] [&_h3]:text-fg [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-cyan [&_a:hover]:underline">
            {children}
          </div>
        </Reveal>
      </section>
    </>
  );
}
