import type { Metadata } from "next";
import { services } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end technology services from SwiftCode Innovation — product development, AI, software engineering, cloud, design, strategy and cybersecurity.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>End-to-end technology, under one roof.</>}
        intro="No hand-offs, no lost context. Strategy, design and engineering work as a single team so your product ships faster and holds together beautifully."
      />

      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08} as="article">
              <div className="glass card-hover flex h-full flex-col rounded-[20px] p-8">
                <div className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/25 to-cyan/15 text-cyan">
                  <Icon name={s.icon} className="h-6 w-6" />
                </div>
                <h2 className="text-[24px]">{s.title}</h2>
                <p className="mt-3 text-[16px] text-muted">{s.summary}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-[15px]">
                      <Check className="h-4 w-4 shrink-0 text-cyan" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/20 to-cyan/10 p-[clamp(28px,4vw,48px)] sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[clamp(24px,3.5vw,34px)]">Not sure where to start?</h2>
              <p className="mt-2 text-muted">Book a free consultation and we&apos;ll help you scope it.</p>
            </div>
            <Button href="/contact">Talk to us <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
