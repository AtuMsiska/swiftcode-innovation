import { Button } from "@/components/ui";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="grad-text font-[family-name:var(--font-display)] text-[clamp(80px,18vw,180px)] font-bold leading-none">
        404
      </span>
      <h1 className="mt-4 text-[clamp(24px,4vw,36px)]">This page took a detour.</h1>
      <p className="mt-3 max-w-[42ch] text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3.5">
        <Button href="/">
          <Home className="h-4 w-4" /> Back home
        </Button>
        <Button href="/contact" variant="ghost">
          Contact us <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
