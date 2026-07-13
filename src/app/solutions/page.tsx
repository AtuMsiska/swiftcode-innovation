import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Outcome-focused technology solutions from SwiftCode Innovation — from custom platforms and AI automation to digital transformation.",
  alternates: { canonical: "/solutions" },
};

const solutions = [
  {
    problem: "Manual, repetitive work is slowing your team down.",
    solution: "Intelligent automation & AI assistants",
    body: "We automate workflows and embed AI where it removes real friction — freeing your people for higher-value work.",
  },
  {
    problem: "Your systems don't talk to each other.",
    solution: "Custom platforms & integrations",
    body: "We build the connective tissue — APIs, portals and platforms — so your data and tools finally work as one.",
  },
  {
    problem: "Legacy software is holding the business back.",
    solution: "Digital transformation",
    body: "We modernise architecture, migrate to the cloud, and re-platform without stopping the business.",
  },
  {
    problem: "You need to reach users on any device, anywhere.",
    solution: "Web, mobile & USSD products",
    body: "From native apps to USSD services that work on any phone, we meet users where they are — even offline.",
  },
  {
    problem: "You're sitting on data but no insight.",
    solution: "Data & machine learning",
    body: "We turn raw data into pipelines, dashboards and models that drive decisions and defensible advantage.",
  },
  {
    problem: "Security and scale keep you up at night.",
    solution: "Secure cloud & infrastructure",
    body: "We architect resilient, observable, secure infrastructure that scales as you grow.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={<>Technology that solves the problem in front of you.</>}
        intro="We start with the outcome you need — then bring the right mix of design, engineering and AI to get you there."
      />

      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.solution} delay={(i % 2) * 0.08}>
              <div className="glass card-hover h-full rounded-[20px] p-8">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">The problem</p>
                <p className="mt-2 text-[18px] font-medium">{s.problem}</p>
                <div className="my-6 h-px bg-[var(--color-line)]" />
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-cyan">Our solution</p>
                <h2 className="mt-2 text-[22px]">{s.solution}</h2>
                <p className="mt-3 text-[15.5px] text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/20 to-cyan/10 p-[clamp(28px,4vw,48px)] sm:flex-row sm:items-center">
            <h2 className="max-w-[24ch] text-[clamp(24px,3.5vw,34px)]">Tell us the outcome you need. We&apos;ll design the path.</h2>
            <Button href="/contact">Start a project <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
