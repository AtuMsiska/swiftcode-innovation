import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { LogoImg } from "@/components/logo-img";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected work from SwiftCode Innovation — our flagship AIDucate platform and corporate builds for TectArch and Mute IT.",
  alternates: { canonical: "/case-studies" },
};

const flagship = projects.find((p) => p.flagship)!;
const rest = projects.filter((p) => !p.flagship);
const ordered = [flagship, ...rest];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title={<>Products and platforms we&apos;ve delivered.</>}
        intro="Quality over quantity — real engagements, honestly described."
      />

      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-5 md:grid-cols-2">
          {ordered.map((p, i) => (
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
                <span className="absolute right-6 top-6 z-[2] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-white/[0.04] text-fg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-royal group-hover:text-ink">
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
                  <h2 className="mt-2.5 text-[26px]">{p.name}</h2>
                  <p className="mt-1.5 text-[13px] text-muted">{p.industry}</p>
                  <p className="mt-3 max-w-[46ch] text-[15px] text-muted line-clamp-3">{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
