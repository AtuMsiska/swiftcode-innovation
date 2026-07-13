import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink, Clock } from "lucide-react";
import { projects, site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { MagneticButton } from "@/components/magnetic";
import { LogoImg } from "@/components/logo-img";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.summary.slice(0, 160),
    alternates: { canonical: `/case-studies/${project.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isAiducate = project.slug === "aiducate";

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: `${site.url}/case-studies` },
        { "@type": "ListItem", position: 3, name: project.name, item: `${site.url}/case-studies/${project.slug}` },
      ],
    },
  ];
  if (isAiducate) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "AIDucate",
      applicationCategory: "EducationalApplication",
      operatingSystem: "USSD (any mobile phone)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
      creator: { "@type": "Organization", name: site.legalName },
      description: project.summary,
    });
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-x relative pb-[clamp(40px,6vw,72px)] pt-[clamp(32px,5vw,56px)]">
        <Reveal>
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-cyan">
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
        </Reveal>
        <Reveal delay={0.06}><div className="mt-6"><Eyebrow>{project.type}</Eyebrow></div></Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-4 text-[clamp(34px,6vw,64px)] font-bold">{project.name}</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-[15px] font-medium text-cyan">{project.industry}</span>
            {project.url && project.urlStatus === "live" && (
              <MagneticButton href={project.url} variant="ghost" className="min-h-[44px] px-5 text-[14px]">
                Visit website <ExternalLink className="h-4 w-4" />
              </MagneticButton>
            )}
            {project.url && project.urlStatus === "soon" && (
              <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white/[0.03] px-4 py-2.5 text-[14px] font-medium text-muted">
                <Clock className="h-4 w-4 text-cyan" /> Launching soon
              </span>
            )}
          </div>
        </Reveal>
        </div>
      </section>

      {/* Visual band */}
      <section className="container-x pt-[clamp(32px,5vw,56px)]">
        <Reveal>
          <div
            className="relative h-[clamp(200px,32vw,380px)] overflow-hidden rounded-[24px] border border-[var(--color-line)]"
            style={{
              background:
                "radial-gradient(60% 80% at 25% 15%, rgba(30,107,255,.5), transparent), radial-gradient(60% 80% at 85% 30%, rgba(24,224,255,.4), transparent), #071c2c",
            }}
          >
            <div className="grid-bg absolute inset-0 opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <LogoImg
                src={project.logo}
                alt={`${project.name} logo`}
                plate
                plateClassName="px-8 py-6 sm:px-12 sm:py-8"
                className="max-h-[clamp(56px,12vw,120px)] w-auto"
              />
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[13px] text-muted">
              <span className="h-2 w-2 rounded-full bg-cyan" /> {project.name} — {project.industry}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Body */}
      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <div className="space-y-10">
              <div>
                <h2 className="text-[clamp(22px,3vw,30px)]">Overview</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-body">{project.summary}</p>
              </div>
              {project.challenge && (
                <div>
                  <h2 className="text-[clamp(22px,3vw,30px)]">The challenge</h2>
                  <p className="mt-4 text-[17px] leading-relaxed text-body">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h2 className="text-[clamp(22px,3vw,30px)]">Our solution</h2>
                  <p className="mt-4 text-[17px] leading-relaxed text-body">{project.solution}</p>
                </div>
              )}
              {project.outcome && (
                <div>
                  <h2 className="text-[clamp(22px,3vw,30px)]">The outcome</h2>
                  <p className="mt-4 text-[17px] leading-relaxed text-body">{project.outcome}</p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="glass sticky top-24 rounded-2xl p-7">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">What we did</h3>
              <ul className="mt-4 space-y-3">
                {project.services.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[15px] text-body">
                    <Check className="h-4 w-4 shrink-0 text-cyan" strokeWidth={2.5} />
                    {s}
                  </li>
                ))}
              </ul>

              <h3 className="mt-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">Technology</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-[var(--color-line)] bg-white/[0.03] px-3 py-1.5 text-[13px] text-muted">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 border-t border-[var(--color-line)] pt-6">
                <dl className="space-y-3 text-[14px]">
                  <div className="flex justify-between"><dt className="text-muted">Industry</dt><dd className="font-medium text-white">{project.industry}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Type</dt><dd className="font-medium text-white">{project.type}</dd></div>
                </dl>
              </div>

              {project.url && (
                <a
                  href={project.urlStatus === "live" ? project.url : undefined}
                  target={project.urlStatus === "live" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-disabled={project.urlStatus === "soon"}
                  className={`mt-6 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold ${
                    project.urlStatus === "live"
                      ? "bg-gradient-to-br from-cyan to-royal text-ink"
                      : "cursor-default border border-[var(--color-line)] text-muted"
                  }`}
                >
                  {project.urlStatus === "live" ? (
                    <>Visit website <ArrowUpRight className="h-4 w-4" /></>
                  ) : (
                    <>Launching soon <Clock className="h-4 w-4" /></>
                  )}
                </a>
              )}
            </aside>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/20 to-cyan/10 p-[clamp(28px,4vw,48px)] sm:flex-row sm:items-center">
            <h2 className="max-w-[24ch] text-[clamp(22px,3.5vw,32px)]">Have a project like this in mind?</h2>
            <MagneticButton href="/contact">Start a project <ArrowRight className="h-4 w-4" /></MagneticButton>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
