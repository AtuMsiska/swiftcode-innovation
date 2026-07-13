import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, projects, techStack, industries, stats, faqs, site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { Icon } from "@/components/icon";
import { Button, SectionHeading, Eyebrow } from "@/components/ui";
import { MagneticButton } from "@/components/magnetic";
import { MouseGlow } from "@/components/mouse-glow";
import { LogoImg } from "@/components/logo-img";
import { HeroCanvas } from "@/components/hero-canvas";
import { InnovationFlow } from "@/components/innovation-flow";
import { AiducateShowcase } from "@/components/aiducate-showcase";

const flagship = projects.find((p) => p.flagship)!;
const clients = projects.filter((p) => !p.flagship);

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@type": "Organization", name: site.legalName },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="grid-bg absolute inset-0" />
          <HeroCanvas />
          {/* light scrim on the left keeps hero copy crisp over the network */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        </div>
        <MouseGlow className="relative z-10">
          <div className="container-x relative pb-[clamp(64px,10vw,130px)] pt-[clamp(56px,9vw,110px)]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-white/[0.05] py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-body">
                <span className="flex h-6 items-center gap-1.5 rounded-full bg-cyan/20 px-2.5 text-cyan">Innovation Company</span>
                Research-first · Est. 2024 · South Africa
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-8 text-[clamp(48px,9vw,110px)] font-bold leading-[0.98]">
                <span className="block text-white">We Research.</span>
                <span className="block text-white">We Build.</span>
                <span className="block grad-text-anim">We Transform.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[60ch] text-[clamp(18px,2.4vw,22px)] leading-relaxed text-body">
                SwiftCode Innovation is a South African technology company focused on researching
                real-world challenges before engineering innovative digital products and enterprise
                software solutions that shape the future.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <MagneticButton href="/innovation-lab">
                  Enter the Innovation Lab
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </MagneticButton>
                <MagneticButton href="/contact" variant="ghost">
                  Start a project
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-14 flex flex-wrap gap-2.5">
                {["Research-first innovation", "Flagship product: AIDucate", "Product complete · Launch phase"].map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white/[0.04] px-3.5 py-2 text-[13px] text-body">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </MouseGlow>
      </section>

      {/* ================= INNOVATION PHILOSOPHY (PRIMARY) ================= */}
      <section id="philosophy" className="container-x py-[clamp(56px,9vw,120px)]">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 text-[clamp(32px,5.5vw,56px)]">
              We don&apos;t just write software.<br />
              <span className="grad-text">We invent technology.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[60ch] text-[18px] text-body">
              Everything starts with research. We study the problem, its people and its market before a
              single line of code — then design, build and scale the solution.
            </p>
          </div>
        </Reveal>
        <InnovationFlow />
      </section>

      {/* ================= AIDUCATE (FLAGSHIP) ================= */}
      <AiducateShowcase />

      {/* ================= INNOVATION PIPELINE ================= */}
      <section className="container-x py-[clamp(40px,7vw,90px)]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-gradient-to-br from-white/[0.06] to-transparent p-[clamp(28px,4vw,52px)]">
            <div className="max-w-2xl">
              <Eyebrow>Innovation pipeline</Eyebrow>
              <h2 className="mt-4 text-[clamp(28px,4.5vw,44px)]">Building deliberately. Honest about where we are.</h2>
              <p className="mt-4 text-[17px] text-body">
                Our flagship product, AIDucate, is complete and in its launch phase. There are currently
                no active apps live on the platform — with several research and development projects in
                progress. Momentum, not vanity metrics.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { v: <Counter to={1} />, l: "Current products", note: "AIDucate — complete" },
                { v: <Counter to={0} />, l: "Live products", note: "Launching soon" },
                { v: "Several", l: "In development", note: "Actively building" },
                { v: "Ongoing", l: "Research projects", note: "Always exploring" },
              ].map((s, i) => (
                <div key={i} className="glow-card glass rounded-2xl p-6">
                  <div className="grad-text font-[family-name:var(--font-display)] text-[clamp(34px,5vw,52px)] font-bold leading-none">{s.v}</div>
                  <p className="mt-3 text-[15px] font-semibold text-white">{s.l}</p>
                  <p className="mt-1 text-[13px] text-muted">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= STATS ================= */}
      <section className="container-x py-[clamp(40px,7vw,90px)]">
        <Reveal>
          <div className="grid gap-y-10 gap-x-6 rounded-[24px] border border-[var(--color-line)] bg-navy/40 p-[clamp(28px,4vw,52px)] sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="grad-text font-[family-name:var(--font-display)] text-[clamp(30px,4vw,44px)] font-bold">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-[13.5px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= CASE STUDIES ================= */}
      <section id="work" className="container-x py-[clamp(56px,9vw,120px)]">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Innovation, and the work behind it."
            intro="Our flagship product plus the digital platforms we've delivered for others."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[flagship, ...clients].map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08} as="article">
              <Link
                href={`/case-studies/${p.slug}`}
                className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-navy p-8 transition-transform duration-500 hover:-translate-y-1.5"
              >
                <div
                  className="absolute inset-0 z-0 opacity-90"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(80% 80% at 20% 10%, rgba(30,107,255,.5), transparent), radial-gradient(70% 70% at 90% 30%, rgba(24,224,255,.35), transparent)"
                        : "radial-gradient(80% 80% at 80% 10%, rgba(24,224,255,.4), transparent), radial-gradient(70% 70% at 10% 40%, rgba(30,107,255,.4), transparent)",
                  }}
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-ink/50 to-ink/95" />
                <span className="absolute right-6 top-6 z-[2] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-white/[0.05] text-white transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-royal group-hover:text-ink">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <LogoImg
                  src={p.logo}
                  alt={`${p.name} logo`}
                  plate
                  plateClassName="absolute left-6 top-6 z-[2] px-3 py-2"
                  className="h-7 w-auto"
                />
                <div className="relative z-[2]">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-cyan">{p.type}</span>
                  <h3 className="mt-2.5 text-[26px]">{p.name}</h3>
                  <p className="mt-1.5 text-[13px] text-muted">{p.industry}</p>
                  <p className="mt-3 max-w-[46ch] text-[15px] text-body line-clamp-2">{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SERVICES (SECONDARY) ================= */}
      <section id="services" className="container-x py-[clamp(56px,9vw,120px)]">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Beyond our own products, we engineer for others."
            intro="When we partner with organisations, the same research-first rigour goes into enterprise software, AI and digital transformation."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08} as="article">
              <div className="glow-card mouse-glow h-full rounded-2xl border border-[var(--color-line)] bg-white/[0.03] p-7">
                <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/30 to-cyan/15 text-cyan transition-transform duration-300 group-hover:scale-110">
                  <Icon name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-[21px]">{s.title}</h3>
                <p className="mt-2.5 text-[15.5px] text-muted">{s.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-[var(--color-line)] bg-white/[0.02] px-2.5 py-1 text-[12px] text-muted">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="container-x py-[clamp(40px,7vw,90px)]">
        <Reveal>
          <SectionHeading
            eyebrow="Who we serve"
            title="Built for organisations solving complex problems."
            center
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 5) * 0.05}>
              <div className="group glow-card glass flex flex-col items-center gap-3 rounded-2xl p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/25 to-cyan/15 text-cyan transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                  <Icon name={ind.icon} className="h-6 w-6" />
                </span>
                <span className="text-[14.5px] font-medium text-white">{ind.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="border-y border-[var(--color-line)] py-[clamp(40px,6vw,64px)]">
        <p className="mb-8 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-faint">
          The technology we build with
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max gap-12 [animation:marquee_38s_linear_infinite]">
            {[...techStack, ...techStack].map((t, i) => (
              <span key={i} className="whitespace-nowrap font-[family-name:var(--font-display)] text-[22px] font-semibold text-body transition-colors hover:text-cyan">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="container-x py-[clamp(56px,9vw,120px)]">
        <Reveal>
          <SectionHeading eyebrow="Questions" title="What people ask us." />
        </Reveal>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-[var(--color-line)]">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 0.05}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-medium text-white">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-cyan transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[16px] text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="container-x pb-[clamp(20px,4vw,40px)]">
        <Reveal>
          <MouseGlow>
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/25 via-navy/60 to-cyan/[0.14] p-[clamp(40px,6vw,80px)] text-center">
              <h2 className="mx-auto max-w-[20ch] text-[clamp(32px,5vw,56px)]">
                This isn&apos;t another dev shop. It&apos;s a technology company building the future.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] text-[18px] text-body">
                Book a free 30-minute consultation with our founders. Honest, useful advice — whether or
                not you work with us.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3.5">
                <MagneticButton href="/contact">
                  Request a consultation <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <Button href="/case-studies" variant="ghost">Explore our work</Button>
              </div>
            </div>
          </MouseGlow>
        </Reveal>
      </section>
    </>
  );
}
