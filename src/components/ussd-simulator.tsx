"use client";

import { useState } from "react";
import { Delete, RotateCcw } from "lucide-react";

/**
 * Interactive USSD simulator for AIDucate. Users tap menu numbers (or the
 * keypad) to walk a realistic *120*2483# session on a feature phone — showing
 * how the zero-data platform responds without a smartphone.
 */
type Option = { n: string; label: string; to: string };
type Screen = { title: string; prompt?: string; text?: string; options: Option[] };

const SCREENS: Record<string, Screen> = {
  home: {
    title: "AIDucate",
    prompt: "Reply with a number:",
    options: [
      { n: "1", label: "Search anything", to: "search" },
      { n: "2", label: "Education", to: "education" },
      { n: "3", label: "News & Info", to: "news" },
      { n: "4", label: "Health tips", to: "health" },
      { n: "5", label: "My account", to: "account" },
    ],
  },
  search: {
    title: "Search",
    prompt: "What do you need?",
    options: [
      { n: "1", label: "Nearest clinic", to: "searchResult" },
      { n: "2", label: "Matric results", to: "searchResult" },
      { n: "3", label: "Government grants", to: "grantResult" },
      { n: "0", label: "Back", to: "home" },
    ],
  },
  searchResult: {
    title: "Nearest clinic",
    text: "Cecilia Makiwane Hospital — 12 km. Open 24h. Tel 043 708 2111.",
    options: [{ n: "0", label: "Back to menu", to: "home" }],
  },
  grantResult: {
    title: "Government grants",
    text: "SASSA grant top-ups are paid from the 1st. Nearest office: Mdantsane, 6 km.",
    options: [{ n: "0", label: "Back to menu", to: "home" }],
  },
  education: {
    title: "Education",
    prompt: "Choose a subject:",
    options: [
      { n: "1", label: "Mathematics", to: "eduResult" },
      { n: "2", label: "Physical Science", to: "eduResult" },
      { n: "3", label: "Past exam papers", to: "eduResult" },
      { n: "4", label: "Bursaries", to: "eduResult" },
      { n: "0", label: "Back", to: "home" },
    ],
  },
  eduResult: {
    title: "Education",
    text: "Lesson sent by SMS. Reply 1 for the next lesson, or 0 for the menu.",
    options: [
      { n: "1", label: "Next lesson", to: "eduResult" },
      { n: "0", label: "Menu", to: "home" },
    ],
  },
  news: {
    title: "News & Info",
    text: "Today: load-shedding suspended nationwide. Matric results release 15 Jan.",
    options: [{ n: "0", label: "Menu", to: "home" }],
  },
  health: {
    title: "Health tips",
    text: "Free clinic check-ups Mon–Fri, 8am–4pm. Bring your ID. Stay hydrated.",
    options: [{ n: "0", label: "Menu", to: "home" }],
  },
  account: {
    title: "My account",
    text: "Airtime balance: R12.50. Free AIDucate sessions left today: 5.",
    options: [{ n: "0", label: "Menu", to: "home" }],
  },
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

export function UssdSimulator() {
  const [screenKey, setScreenKey] = useState("home");
  const screen = SCREENS[screenKey];

  function press(n: string) {
    const opt = screen.options.find((o) => o.n === n);
    if (opt) setScreenKey(opt.to);
  }

  return (
    <div className="relative mx-auto w-[248px]">
      {/* Task-2 glow: blue → emerald radial behind the device */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[56px] bg-gradient-to-r from-blue-600/25 to-emerald-500/20 blur-2xl"
      />
      <div className="animate-float rounded-[40px] border border-[var(--color-line-strong)] bg-gradient-to-b from-navy-2 to-ink p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
        <div className="relative flex h-[500px] flex-col overflow-hidden rounded-[30px] border border-[var(--color-line)] bg-ink">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 text-[11px] text-muted">
            <span>09:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Vodacom
            </span>
          </div>

          {/* USSD dialog */}
          <div className="flex flex-1 flex-col p-4">
            <div key={screenKey} className="flex-1 animate-[ussd-in_.28s_ease]">
              <div className="rounded-2xl border border-[var(--color-line-strong)] bg-navy-2/90 p-4 shadow-xl backdrop-blur">
                <div className="flex items-center justify-between text-[11px] font-medium text-faint">
                  <span>USSD · *120*2483#</span>
                  <span className="text-cyan">{screen.title}</span>
                </div>

                {screen.prompt && <p className="mt-3 text-[13px] text-muted">{screen.prompt}</p>}
                {screen.text && <p className="mt-3 text-[14px] leading-relaxed text-body">{screen.text}</p>}

                <ul className="mt-3 space-y-1.5">
                  {screen.options.map((o) => (
                    <li key={o.n}>
                      <button
                        onClick={() => press(o.n)}
                        className="flex min-h-[40px] w-full items-center gap-2.5 rounded-lg px-1.5 text-left text-[14px] text-body transition-colors hover:bg-white/[0.06] active:bg-white/[0.1]"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-cyan to-royal text-[12px] font-bold text-ink">
                          {o.n}
                        </span>
                        {o.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-3 px-1 text-center text-[11px] text-faint">
                Tap a number to reply — try 1 or 2
              </p>
            </div>

            {/* keypad */}
            <div className="mt-auto grid grid-cols-3 gap-1.5">
              {KEYS.map((k) => {
                const active = screen.options.some((o) => o.n === k);
                return (
                  <button
                    key={k}
                    onClick={() => press(k)}
                    aria-label={`Key ${k}`}
                    className={`flex h-9 items-center justify-center rounded-lg border text-[15px] font-medium transition-colors ${
                      active
                        ? "border-cyan/40 bg-cyan/10 text-white hover:bg-cyan/20"
                        : "border-[var(--color-line)] text-faint"
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
            <div className="mt-1.5 flex gap-1.5">
              <button
                onClick={() => setScreenKey("home")}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--color-line)] py-2 text-[12px] text-muted transition-colors hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </button>
              <button
                onClick={() => setScreenKey("home")}
                aria-label="Cancel session"
                className="flex items-center justify-center rounded-lg border border-[var(--color-line)] px-3 py-2 text-muted transition-colors hover:text-white"
              >
                <Delete className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
