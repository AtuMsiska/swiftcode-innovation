import type { Metadata } from "next";
import { site, processSteps, leadership, directors } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading, Eyebrow } from "@/components/ui";
import { MagneticButton } from "@/components/magnetic";
import { ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "SwiftCode Innovation is a South African technology company founded in 2023, researching emerging challenges and engineering the products that solve them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={<>An innovation company, not just a software agency.</>}
        intro="SwiftCode Innovation researches real-world challenges, engineers technology-driven solutions, and partners with organisations to accelerate digital transformation."
      />

      {/* Story */}
      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mt-4 text-[clamp(26px,4vw,40px)]">Founded in {site.founded}, built for what&apos;s next.</h2>
              <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-body">
                <p>
                  SwiftCode Innovation was founded by a team of engineers and builders who believe the
                  best technology starts with understanding the problem — deeply, and before writing any
                  code.
                </p>
                <p>
                  We&apos;re headquartered in Boksburg, Gauteng, and we work with organisations across
                  South Africa and the continent. Our flagship innovation, AIDucate, is a USSD-powered
                  platform built to bridge the digital divide — proof of the kind of technology we exist
                  to create.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-8">
              <dl className="grid grid-cols-2 gap-6">
                {[
                  ["Founded", site.founded],
                  ["Headquarters", "Boksburg, Gauteng"],
                  ["Ownership", "6 directors, equal shareholding"],
                  ["Focus", "Innovation & digital transformation"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[13px] uppercase tracking-[0.1em] text-faint">{k}</dt>
                    <dd className="mt-1 font-medium text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values / process */}
      <section className="container-x py-[clamp(40px,7vw,90px)]">
        <Reveal><SectionHeading eyebrow="How we think" title="Research. Innovation. Engineering." /></Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 3) * 0.08}>
              <div className="relative border-t-2 border-[var(--color-line)] pt-7">
                <span className="absolute -top-3.5 bg-ink pr-3 font-[family-name:var(--font-display)] text-[15px] font-semibold text-cyan">0{i + 1}</span>
                <h3 className="text-[20px]">{step.title}</h3>
                <p className="mt-2.5 text-[15px] text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="container-x py-[clamp(40px,7vw,90px)]">
        <Reveal>
          <SectionHeading eyebrow="Leadership" title="The people behind SwiftCode." intro="Led by our executive team, with six directors holding equal shareholding." />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="glow-card glass flex items-center gap-5 rounded-2xl p-6">
                <Avatar initials={p.initials} large />
                <div>
                  <div className="text-[19px] font-[family-name:var(--font-display)] font-semibold text-white">{p.name}</div>
                  <div className="mt-0.5 text-[15px] text-cyan">{p.role}</div>
                  {"email" in p && p.email && (
                    <a href={`mailto:${p.email}`} className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-cyan">
                      <Mail className="h-3.5 w-3.5" /> {p.email}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <h3 className="mt-14 text-[15px] font-semibold uppercase tracking-[0.1em] text-faint">Directors</h3>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {directors.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.06}>
              <div className="glass card-hover flex items-center gap-4 rounded-2xl p-5">
                <Avatar initials={p.initials} />
                <div className="text-[16px] font-medium text-white">{p.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-[clamp(40px,7vw,90px)]">
        <Reveal>
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-[24px] p-[clamp(28px,4vw,48px)] sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[clamp(24px,3.5vw,34px)]">Want to work with us?</h2>
              <p className="mt-2 text-body">Tell us about your challenge — we&apos;d love to help.</p>
            </div>
            <MagneticButton href="/contact">Start a project <ArrowRight className="h-4 w-4" /></MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Avatar({ initials, large }: { initials: string; large?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal to-cyan font-[family-name:var(--font-display)] font-semibold text-ink ${
        large ? "h-16 w-16 text-xl" : "h-12 w-12 text-base"
      }`}
    >
      {initials}
    </span>
  );
}
