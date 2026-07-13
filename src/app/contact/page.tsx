import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with SwiftCode Innovation. Tell us about your product and we'll respond within one business day.",
  alternates: { canonical: "/contact" },
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.75-2.05C20.4 8.65 21 11 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9z" />
    </svg>
  );
}
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.suburb}, ${site.address.city}, ${site.address.postalCode}`,
)}`;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title={<>Let&apos;s build something worth talking about.</>}
        intro="Tell us about your product or challenge. We'll get back within one business day with clear next steps — no pushy sales calls."
      />

      <section className="container-x py-[clamp(48px,8vw,96px)]">
        <div className="grid gap-[clamp(32px,5vw,64px)] lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <div>
              {/* Method cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <MethodCard icon={<Mail className="h-5 w-5" />} label="General enquiries" value={site.email} href={`mailto:${site.email}`} />
                <MethodCard icon={<Mail className="h-5 w-5" />} label="Technical / CTO" value={site.emailIt} href={`mailto:${site.emailIt}`} />
                <MethodCard icon={<Phone className="h-5 w-5" />} label="Call us" value={site.phone} href={`tel:${site.phone.replace(/\s/g, "")}`} />
                <MethodCard icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="Chat with us" href={site.socials.whatsapp} />
              </div>

              {/* Socials */}
              <div className="mt-4 flex gap-3">
                <SocialCard href={site.socials.linkedin} label="LinkedIn"><LinkedInIcon className="h-5 w-5" /></SocialCard>
                <SocialCard href={site.socials.github} label="GitHub"><GitHubIcon className="h-5 w-5" /></SocialCard>
              </div>

              {/* Location / map */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 block overflow-hidden rounded-2xl border border-[var(--color-line)]"
              >
                <div
                  className="relative h-40"
                  style={{
                    background:
                      "radial-gradient(60% 90% at 30% 20%, rgba(30,107,255,.4), transparent), radial-gradient(60% 90% at 80% 60%, rgba(24,224,255,.3), transparent), #071c2c",
                  }}
                >
                  <div className="grid-bg absolute inset-0 opacity-50" />
                  <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <span className="absolute h-10 w-10 rounded-full bg-cyan/25" style={{ animation: "node-pulse 3s ease-in-out infinite" }} />
                    <MapPin className="relative h-7 w-7 text-cyan" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 bg-white/[0.03] px-5 py-4">
                  <div className="text-[14px] text-body">
                    {site.address.street}, {site.address.suburb}, {site.address.city}, {site.address.postalCode}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-cyan group-hover:underline">
                    Maps <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function MethodCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="glow-card glass rounded-2xl p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white/[0.03] text-cyan">{icon}</span>
      <div className="mt-4 text-[13px] uppercase tracking-[0.08em] text-faint">{label}</div>
      <div className="mt-1 text-[15px] font-medium text-white">{value}</div>
    </a>
  );
}

function SocialCard({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="glass flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-muted transition-colors hover:border-[var(--color-line-strong)] hover:text-white"
    >
      {children}
      <span className="text-[14px] font-medium">{label}</span>
    </a>
  );
}
