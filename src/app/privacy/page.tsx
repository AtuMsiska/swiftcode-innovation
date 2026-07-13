import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SwiftCode Innovation collects, uses and protects personal information under POPIA.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="July 2026">
      <p className="rounded-xl border border-[var(--color-line)] bg-white/[0.03] p-4 text-[14px]">
        <strong className="text-fg">Template notice:</strong> This policy is a starting point and should
        be reviewed by a legal professional before publication to ensure full POPIA compliance.
      </p>

      <div>
        <h2>1. Introduction</h2>
        <p>
          {site.legalName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your
          privacy in accordance with the Protection of Personal Information Act, 2013 (POPIA). This policy
          explains how we collect, use, store and safeguard your personal information.
        </p>
      </div>

      <div>
        <h2>2. Information we collect</h2>
        <ul>
          <li>Contact details you provide (name, email, phone, company).</li>
          <li>Details of your enquiry or project.</li>
          <li>Technical data such as anonymised analytics, where enabled.</li>
        </ul>
      </div>

      <div>
        <h2>3. How we use your information</h2>
        <ul>
          <li>To respond to your enquiries and provide our services.</li>
          <li>To improve our website and offering.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>
      </div>

      <div>
        <h2>4. Your rights under POPIA</h2>
        <p>
          You have the right to access, correct or delete your personal information, and to object to its
          processing. To exercise these rights, contact our Information Officer at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>

      <div>
        <h2>5. Data security &amp; retention</h2>
        <p>
          We apply reasonable technical and organisational measures to protect your information and retain
          it only as long as necessary for the purposes described or as required by law.
        </p>
      </div>

      <div>
        <h2>6. Contact</h2>
        <p>
          {site.legalName}, {site.address.street}, {site.address.suburb}, {site.address.city},{" "}
          {site.address.postalCode}, {site.address.country}. Email:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
