"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { processSteps } from "@/lib/site";
import { Search, ShieldCheck, Lightbulb, Code2, Rocket, TrendingUp, type LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [Search, ShieldCheck, Lightbulb, Code2, Rocket, TrendingUp];

export function InnovationFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative mt-14">
      {/* central line (desktop) / left line (mobile) */}
      <div className="absolute bottom-0 top-0 left-[19px] w-px bg-[var(--color-line)] lg:left-1/2 lg:-translate-x-1/2">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-cyan via-royal to-transparent"
          style={{ scaleY: reduce ? 1 : scaleY, bottom: 0 }}
        />
      </div>

      <ol className="space-y-8 lg:space-y-2">
        {processSteps.map((step, i) => {
          const Icon = icons[i] ?? Search;
          const left = i % 2 === 0;
          return (
            <li key={step.title} className="relative">
              <div className={`lg:grid lg:grid-cols-2 lg:gap-16 ${left ? "" : "lg:[&>*:first-child]:col-start-2"}`}>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                  className={`relative ml-14 lg:ml-0 ${left ? "lg:pr-4 lg:text-right" : "lg:pl-4"}`}
                >
                  <div className={`glow-card glass rounded-2xl p-6 ${left ? "lg:ml-auto" : ""}`}>
                    <div className={`flex items-center gap-3 ${left ? "lg:flex-row-reverse" : ""}`}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-line-strong)] bg-gradient-to-br from-royal/30 to-cyan/20 text-cyan">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div className={left ? "lg:text-right" : ""}>
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cyan">
                          Step {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[20px] leading-tight">{step.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-[15px] text-muted">{step.body}</p>
                  </div>
                </motion.div>
              </div>

              {/* node marker */}
              <span className="absolute top-6 left-[11px] flex h-4 w-4 items-center justify-center lg:left-1/2 lg:-translate-x-1/2">
                <span className="absolute h-4 w-4 rounded-full bg-cyan/25" style={{ animation: "node-pulse 3s ease-in-out infinite" }} />
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan to-royal ring-4 ring-ink" />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
