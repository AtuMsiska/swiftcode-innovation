import {
  Rocket, BrainCircuit, Code2, CloudCog, PenTool, Compass, ShieldCheck,
  DraftingCompass, HardHat, Landmark, GraduationCap, HeartPulse,
  ShoppingBag, Banknote, Factory, Sprout, Pickaxe,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  // services
  Rocket, BrainCircuit, Code2, CloudCog, PenTool, Compass, ShieldCheck,
  // industries
  DraftingCompass, HardHat, Landmark, GraduationCap, HeartPulse,
  ShoppingBag, Banknote, Factory, Sprout, Pickaxe,
};

/** Renders a lucide icon by name (used with config-driven lists). */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Code2;
  return <Cmp className={className} strokeWidth={1.6} aria-hidden />;
}
