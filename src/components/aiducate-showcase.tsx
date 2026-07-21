import { Reveal } from "@/components/reveal";
import { MagneticButton } from "@/components/magnetic";
import { UssdSimulator } from "@/components/ussd-simulator";
import { CheckCircle2, Rocket, ArrowUpRight, Smartphone, WifiOff, Globe2 } from "lucide-react";

/* Stylised continental-reach map */
function AfricaReach() {
  const hubs = [
    { x: 150, y: 34, label: "Cairo" },
    { x: 52, y: 120, label: "Accra" },
    { x: 66, y: 128, label: "Lagos" },
    { x: 142, y: 150, label: "Nairobi" },
    { x: 120, y: 188, label: "Johannesburg" },
    { x: 101, y: 210, label: "Cape Town" },
  ];
  const hub = { x: 105, y: 130 };
  return (
    <div className="relative">
      <svg viewBox="0 0 190 230" className="w-full max-w-[360px]" role="img" aria-label="SwiftCode Innovation's reach across Africa">
        <defs>
          <linearGradient id="afr" x1="0" y1="0" x2="190" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E6BFF" stopOpacity="0.35" />
            <stop offset="1" stopColor="#18E0FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M78 18 C110 12 140 14 150 26 C156 34 150 46 156 58 C162 70 178 74 176 92 C174 110 158 116 150 132 C142 150 150 168 138 184 C128 198 120 210 108 214 C98 217 96 205 92 194 C86 178 74 168 66 150 C58 132 66 118 56 104 C48 92 34 92 30 76 C26 62 40 54 46 42 C52 30 58 24 78 18 Z"
          fill="url(#afr)"
          stroke="rgba(24,224,255,0.35)"
          strokeWidth="1"
        />
        {hubs.map((h) => (
          <line key={`l-${h.label}`} x1={hub.x} y1={hub.y} x2={h.x} y2={h.y} stroke="rgba(24,224,255,0.3)" strokeWidth="0.6" />
        ))}
        {hubs.map((h) => (
          <g key={h.label}>
            <circle cx={h.x} cy={h.y} r="2.6" fill="#18E0FF" style={{ animation: "node-pulse 3s ease-in-out infinite" }} />
            <circle cx={h.x} cy={h.y} r="6" fill="none" stroke="rgba(24,224,255,0.3)" strokeWidth="0.6" />
          </g>
        ))}
        <circle cx={hub.x} cy={hub.y} r="3.4" fill="#fff" />
      </svg>
    </div>
  );
}

export function AiducateShowcase() {
  return (
    <section className="container-x py-[clamp(56px,9vw,120px)]">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-[var(--color-line-strong)] bg-[linear-gradient(135deg,rgba(30,107,255,0.14),rgba(7,28,44,0.6)_45%,rgba(24,224,255,0.1))] p-[clamp(28px,5vw,64px)]">
          {/* header */}
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/15 px-3 py-1.5 text-[13px] font-semibold text-cyan">
              <CheckCircle2 className="h-4 w-4" /> Product Complete
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/20 px-3 py-1.5 text-[13px] font-semibold text-white">
              <Rocket className="h-4 w-4" /> Launch Phase
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-cyan">Flagship Innovation</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(32px,5.5vw,56px)] font-bold">AIDucate</h2>
              <p className="mt-2 text-[clamp(18px,2.6vw,24px)] font-medium text-cyan">
                Bringing digital access to every mobile phone.
              </p>
              <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-body">
                AIDucate is a USSD-powered intelligent information platform designed to bridge the digital
                divide — providing accessible search, education and information services to users without
                smartphones. The platform has been fully developed and is currently preparing for launch.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { icon: Smartphone, k: "Any phone", v: "No smartphone needed" },
                  { icon: WifiOff, k: "No data", v: "Works over USSD" },
                  { icon: Globe2, k: "Africa", v: "Built for the continent" },
                ].map((s) => (
                  <div key={s.k} className="glass rounded-2xl p-4">
                    <s.icon className="h-5 w-5 text-cyan" strokeWidth={1.6} />
                    <div className="mt-3 text-[15px] font-semibold text-white">{s.k}</div>
                    <div className="mt-0.5 text-[12.5px] text-muted">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <MagneticButton href="/case-studies/aiducate">
                  Explore AIDucate <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
                <div className="hidden sm:block">
                  <AfricaReach />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <UssdSimulator />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
