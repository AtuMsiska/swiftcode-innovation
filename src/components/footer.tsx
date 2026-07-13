import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site, footerNav } from "@/lib/site";
import { Logo } from "@/components/logo";

/* Brand marks (lucide no longer ships brand icons) */
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

export function Footer() {
  return (
    <footer className="mt-[clamp(60px,8vw,110px)] border-t border-[var(--color-line)]">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand + summary */}
          <div>
            <Link href="/" aria-label="SwiftCode Innovation home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-[15px] text-muted">
              A South African technology company that researches real-world challenges before
              engineering the innovative products that solve them.
            </p>
            <div className="mt-5 flex gap-2.5">
              <SocialLink href={site.socials.linkedin} label="LinkedIn"><LinkedInIcon className="h-[18px] w-[18px]" /></SocialLink>
              <SocialLink href={site.socials.github} label="GitHub"><GitHubIcon className="h-[18px] w-[18px]" /></SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email"><Mail className="h-[18px] w-[18px]" /></SocialLink>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">{group}</h4>
              <ul>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block py-1.5 text-[15px] text-muted transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">Contact</h4>
            <ul className="space-y-3 text-[14.5px]">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cyan" />
                <a href={`mailto:${site.email}`} className="text-muted hover:text-white">{site.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cyan" />
                <a href={`mailto:${site.emailIt}`} className="text-muted hover:text-white">{site.emailIt}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-cyan" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-muted hover:text-white">{site.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <span className="text-muted">
                  {site.address.street}, {site.address.suburb},<br />
                  {site.address.city}, {site.address.postalCode}, {site.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-7 text-[14px] text-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {site.legalName}. Made in South Africa.</span>
          <span>Where Technology Meets Innovation.</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line)] text-muted transition-colors hover:border-[var(--color-line-strong)] hover:bg-white/5 hover:text-white"
    >
      {children}
    </a>
  );
}
