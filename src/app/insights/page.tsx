import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui";
import { Rss, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thinking from SwiftCode Innovation on AI, innovation and software — coming soon.",
  alternates: { canonical: "/insights" },
};

const topics = ["Artificial Intelligence", "Innovation", "Software Engineering", "Digital Transformation"];

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={<>Thinking on technology, AI and innovation.</>}
        intro="We're preparing a series of articles sharing how we research, build and think. Check back soon."
      />

      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <Reveal>
          <div className="glass flex flex-col items-center rounded-[24px] p-[clamp(40px,6vw,72px)] text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/25 to-cyan/15 text-cyan">
              <Rss className="h-7 w-7" strokeWidth={1.6} />
            </div>
            <h2 className="text-[clamp(24px,4vw,36px)]">Articles are on the way.</h2>
            <p className="mt-3 max-w-[48ch] text-muted">
              Our first pieces will cover the topics below. Want them in your inbox? Reach out and
              we&apos;ll let you know when we publish.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {topics.map((t) => (
                <span key={t} className="rounded-full border border-[var(--color-line)] bg-white/[0.03] px-4 py-2 text-[14px] text-muted">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/contact">Notify me <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
