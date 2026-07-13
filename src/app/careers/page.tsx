import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui";
import { Sparkles, MapPin, HeartHandshake, TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join SwiftCode Innovation — a South African technology company building the products that move the continent forward.",
  alternates: { canonical: "/careers" },
};

const perks = [
  { icon: Sparkles, title: "Real innovation", body: "Work on research-first products that reach people who need them." },
  { icon: TrendingUp, title: "Grow fast", body: "Small, senior team — you'll own meaningful work from day one." },
  { icon: HeartHandshake, title: "Ownership culture", body: "Founder-led, transparent, and genuinely collaborative." },
  { icon: MapPin, title: "Based in Gauteng", body: "Headquartered in Boksburg, working across South Africa." },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={<>Build technology that matters.</>}
        intro="We're a young, ambitious team. When we open roles, they'll appear here — but we're always keen to meet exceptional people."
      />

      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.06}>
              <div className="glass card-hover h-full rounded-2xl p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/25 to-cyan/15 text-cyan">
                  <p.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h2 className="text-[18px]">{p.title}</h2>
                <p className="mt-2 text-[14.5px] text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/20 to-cyan/10 p-[clamp(28px,4vw,48px)]">
            <h2 className="text-[clamp(24px,3.5vw,34px)]">No open roles right now — but talk to us anyway.</h2>
            <p className="mt-3 max-w-[56ch] text-muted">
              If you&apos;re an engineer, designer or researcher who wants to build things that reach
              real people, send us a note and a link to your work.
            </p>
            <div className="mt-7">
              <Button href={`mailto:${site.email}?subject=Careers%20at%20SwiftCode`}>
                Introduce yourself <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
