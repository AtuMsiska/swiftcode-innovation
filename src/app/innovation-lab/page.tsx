import type { Metadata } from "next";
import { projects } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { SectionHeading, Eyebrow, Button } from "@/components/ui";
import { ArrowUpRight, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Innovation Lab",
  description:
    "Inside the SwiftCode Innovation Lab — where we research emerging challenges and build products like AIDucate before the world asks for them.",
  alternates: { canonical: "/innovation-lab" },
};

const flagship = projects.find((p) => p.flagship)!;

export default function InnovationLabPage() {
  return (
    <>
      <PageHeader
        eyebrow="Innovation Lab"
        title={<>Where we build before the world asks.</>}
        intro="The Innovation Lab is our research-first engine — studying emerging market challenges and engineering the products that solve them."
      />

      {/* Pipeline */}
      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <Reveal>
          <div className="rounded-[24px] border border-[var(--color-line)] bg-gradient-to-br from-white/[0.05] to-transparent p-[clamp(28px,4vw,48px)]">
            <div className="max-w-2xl">
              <Eyebrow>Innovation pipeline</Eyebrow>
              <h2 className="mt-3.5 text-[clamp(26px,4vw,40px)]">Honest about where we are.</h2>
              <p className="mt-4 text-[16.5px] text-muted">
                We&apos;re a young company building deliberately. Transparency builds credibility.
              </p>
            </div>
            <div className="mt-10 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { v: <Counter to={1} />, l: "Flagship product complete" },
                { v: <Counter to={0} />, l: "Live commercial products" },
                { v: "Several", l: "Products in development" },
                { v: "Ongoing", l: "Active research projects" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="grad-text font-[family-name:var(--font-display)] text-[clamp(32px,5vw,48px)] font-bold">{s.v}</div>
                  <p className="mt-2 text-[14.5px] text-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Flagship */}
      <section className="container-x py-[clamp(20px,4vw,40px)]">
        <Reveal>
          <SectionHeading eyebrow="Current" title="AIDucate — our flagship innovation." />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-8 rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/[0.16] via-navy/40 to-cyan/[0.1] p-[clamp(28px,5vw,56px)] lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan/15 px-3 py-1 text-[13px] font-medium text-cyan">
                <FlaskConical className="h-3.5 w-3.5" /> Product complete · Launch phase
              </span>
              <h3 className="mt-4 text-[clamp(24px,3.5vw,36px)]">{flagship.name}</h3>
              <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-muted">{flagship.summary}</p>
              <div className="mt-7">
                <Button href="/case-studies/aiducate" variant="ghost">
                  Read the case study <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ul className="glass rounded-2xl p-7 text-[15px]">
              {[
                ["Technology", "USSD · works on any phone"],
                ["No smartphone", "No data required"],
                ["Built for", "Underserved communities"],
                ["Reach", "Across Africa"],
              ].map(([k, v], i) => (
                <li key={k} className={`flex items-center justify-between py-3.5 ${i > 0 ? "border-t border-[var(--color-line)]" : ""}`}>
                  <span className="text-muted">{k}</span>
                  <span className="font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Upcoming */}
      <section className="container-x py-[clamp(40px,7vw,90px)]">
        <Reveal><SectionHeading eyebrow="Upcoming" title="More in the pipeline." intro="Several products are in active development. We'll share them here as they're ready." /></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Reveal key={n} delay={n * 0.06}>
              <div className="glass flex min-h-[180px] flex-col justify-between rounded-2xl border-dashed p-7">
                <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">Confidential project {n}</span>
                <div>
                  <div className="text-[20px] font-[family-name:var(--font-display)] font-semibold text-muted">Coming soon</div>
                  <p className="mt-1 text-[14px] text-faint">In development</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
