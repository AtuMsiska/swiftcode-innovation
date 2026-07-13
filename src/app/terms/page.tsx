import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of the SwiftCode Innovation website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="July 2026">
      <p className="rounded-xl border border-[var(--color-line)] bg-white/[0.03] p-4 text-[14px]">
        <strong className="text-fg">Template notice:</strong> These terms are a starting point and should be
        reviewed by a legal professional before publication.
      </p>

      <div>
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing and using this website, you accept these terms and conditions in full. If you
          disagree with any part, please do not use the website.
        </p>
      </div>

      <div>
        <h2>2. Intellectual property</h2>
        <p>
          Unless otherwise stated, {site.legalName} owns the intellectual property rights in the website and
          its content. You may view and use the content for your own personal, non-commercial use only.
        </p>
      </div>

      <div>
        <h2>3. No warranties</h2>
        <p>
          This website is provided &quot;as is&quot; without any representations or warranties. Nothing on
          this website constitutes professional advice.
        </p>
      </div>

      <div>
        <h2>4. Limitation of liability</h2>
        <p>
          {site.legalName} will not be liable for any indirect, incidental or consequential loss arising from
          your use of this website, to the extent permitted by law.
        </p>
      </div>

      <div>
        <h2>5. Governing law</h2>
        <p>These terms are governed by the laws of the Republic of South Africa.</p>
      </div>

      <div>
        <h2>6. Contact</h2>
        <p>
          Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
