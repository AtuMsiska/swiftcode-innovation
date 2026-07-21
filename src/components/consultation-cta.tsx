"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X, Mail, MessageCircle, CalendarClock } from "lucide-react";
import { site } from "@/lib/site";
import { MagneticButton } from "@/components/magnetic";
import { Button } from "@/components/ui";
import { MouseGlow } from "@/components/mouse-glow";

/**
 * Prominent consultation highlight card + scheduling modal. If a Cal.com /
 * Calendly URL is set in site.scheduling, the modal embeds it; otherwise it
 * shows a graceful fallback (email, WhatsApp, contact form).
 */
export function ConsultationCTA() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <MouseGlow>
        <div className="relative overflow-hidden rounded-[24px] border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/25 via-navy/60 to-cyan/[0.14] p-[clamp(40px,6vw,80px)] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[13px] font-semibold text-cyan">
            <CalendarClock className="h-4 w-4" /> Free 30-minute consultation
          </span>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-balance text-[clamp(32px,5vw,56px)]">
            This isn&apos;t another dev shop. It&apos;s a technology company building the future.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[18px] text-body">
            Book a free 30-minute consultation with our founders. Honest, useful advice — whether or not
            you work with us.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <MagneticButton href="#" onClick={(e) => { e.preventDefault(); setOpen(true); }}>
              Book a consultation <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <Button href="/case-studies" variant="ghost">Explore our work</Button>
          </div>
        </div>
      </MouseGlow>

      {/* Scheduling modal — portalled to <body> so no transformed / will-change
          ancestor can trap its fixed positioning (see baseline §7). */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-[opacity,visibility] duration-300 ${
              open ? "visible opacity-100" : "invisible opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Book a consultation"
          >
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={() => setOpen(false)} />
        <div
          className={`relative flex max-h-[85vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[24px] border border-[var(--color-line-strong)] bg-navy-2 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-4">
            <div className="flex items-center gap-2 font-[family-name:var(--font-display)] text-[17px] font-semibold text-white">
              <CalendarClock className="h-5 w-5 text-cyan" /> Book a consultation
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-muted transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {site.scheduling ? (
            <iframe
              src={site.scheduling}
              title="Schedule a consultation"
              className="h-[600px] w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="overflow-y-auto p-6">
              <p className="text-[15px] text-body">
                Tell us a good time and we&apos;ll confirm within one business day. Reach us directly:
              </p>
              <div className="mt-5 grid gap-3">
                <a href={`mailto:${site.email}?subject=Consultation%20request`} className="glass flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-white/30">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line)] bg-white/[0.03] text-cyan"><Mail className="h-5 w-5" /></span>
                  <span><span className="block text-[13px] uppercase tracking-[0.08em] text-faint">Email</span><span className="text-[15px] font-medium text-white">{site.email}</span></span>
                </a>
                <a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-white/30">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-line)] bg-white/[0.03] text-cyan"><MessageCircle className="h-5 w-5" /></span>
                  <span><span className="block text-[13px] uppercase tracking-[0.08em] text-faint">WhatsApp</span><span className="text-[15px] font-medium text-white">Chat with us</span></span>
                </a>
              </div>
              <Button href="/contact" className="mt-5 w-full">
                Open the full contact form <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
