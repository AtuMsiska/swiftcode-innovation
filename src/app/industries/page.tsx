import type { Metadata } from "next";
import { industries } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { MagneticButton } from "@/components/magnetic";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "SwiftCode Innovation partners with organisations across architecture, construction, government, education, healthcare, retail, finance, manufacturing, agriculture and mining.",
  alternates: { canonical: "/industries" },
};

const blurbs: Record<string, string> = {
  Architecture: "Corporate presence, project platforms and brand positioning for practices.",
  Construction: "Project, asset and workflow platforms for teams in the field.",
  Government: "Citizen-facing services and internal systems built for scale and accessibility.",
  Education: "Accessible learning platforms — including USSD services that reach any phone.",
  Healthcare: "Patient and provider tools that are reliable, private and easy to use.",
  Retail: "Commerce, inventory and AI merchandising that lift margin.",
  Finance: "Secure, compliant platforms — payments, portals and automation.",
  Manufacturing: "Operational systems, IoT and analytics for the plant floor.",
  Agriculture: "Data and mobile tools that reach producers wherever they are.",
  Mining: "Safety, operations and reporting systems for demanding environments.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={<>Built for organisations solving complex problems.</>}
        intro="We partner with teams across sectors where getting the technology right genuinely matters."
      />

      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((it, i) => (
            <Reveal key={it.name} delay={(i % 3) * 0.07}>
              <div className="group glow-card mouse-glow h-full rounded-[20px] border border-[var(--color-line)] bg-white/[0.03] p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/30 to-cyan/15 text-cyan transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                  <Icon name={it.icon} className="h-6 w-6" />
                </div>
                <h2 className="text-[19px]">{it.name}</h2>
                <p className="mt-2.5 text-[15px] text-muted">{blurbs[it.name]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/20 to-cyan/10 p-[clamp(28px,4vw,48px)] sm:flex-row sm:items-center">
            <h2 className="max-w-[24ch] text-[clamp(24px,3.5vw,34px)]">Don&apos;t see your industry? We&apos;d still love to talk.</h2>
            <MagneticButton href="/contact">Get in touch <ArrowRight className="h-4 w-4" /></MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
