"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui";

const mobileItems = [{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[60] transition-colors duration-300 ${
          scrolled || open ? "border-b border-[var(--color-line)] bg-ink/90 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-[64px] items-center justify-between md:h-[72px]">
          <Link href="/" aria-label="SwiftCode Innovation home" className="relative z-[70]">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-[14.5px] font-medium transition-colors ${
                    active ? "text-fg" : "text-muted hover:bg-white/5 hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex">
              <Button href="/contact" variant="primary">
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </span>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-line)] bg-white/[0.04] text-fg active:scale-95 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu — sibling of <header> so `fixed` is viewport-relative
          (a backdrop-filter on the header would otherwise trap it). CSS transitions
          for guaranteed visibility. */}
      <div
        className={`fixed inset-0 z-50 transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="absolute inset-0 bg-ink/[0.98] backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <nav className="absolute inset-0 flex flex-col overflow-y-auto px-6 pb-[max(28px,env(safe-area-inset-bottom))] pt-[calc(64px+28px)]">
          <ul className="flex flex-col">
            {mobileItems.map((item, i) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: open ? `${110 + i * 40}ms` : "0ms" }}
                    className={`flex min-h-[56px] items-center border-b border-[var(--color-line)] font-[family-name:var(--font-display)] text-[26px] font-semibold tracking-tight transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] active:text-cyan ${
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    } ${active ? "text-cyan" : "text-white"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div
            className={`mt-auto pt-8 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${110 + mobileItems.length * 40}ms` : "0ms" }}
          >
            <Button href="/contact" className="w-full text-[16px]">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
