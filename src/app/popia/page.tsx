import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "POPIA Compliance",
  description:
    "SwiftCode Innovation's POPIA compliance statement — how we meet the eight conditions for lawful processing under the Protection of Personal Information Act.",
  alternates: { canonical: "/popia" },
  robots: { index: true, follow: false },
};

export default function PopiaPage() {
  return (
    <LegalPage eyebrow="Legal" title="POPIA Compliance" updated="July 2026">
      <p className="text-[15px]">
        This statement should be read together with our <a href="/privacy">Privacy Policy</a> and{" "}
        <a href="/paia">PAIA Manual</a>.
      </p>

      <div>
        <h2>1. Our commitment</h2>
        <p>
          {site.legalName} is committed to processing personal information lawfully, transparently and
          securely in accordance with the Protection of Personal Information Act, 4 of 2013
          (&quot;POPIA&quot;). POPIA gives effect to the constitutional right to privacy and regulates how
          organisations collect, use, store and share personal information. This statement explains how we
          meet our obligations.
        </p>
      </div>

      <div>
        <h2>2. Responsible party and operator</h2>
        <p>
          Where we determine the purpose and means of processing personal information (for example, our
          own client, supplier and employee data), we act as the <strong>responsible party</strong>. Where
          we process personal information on behalf of a client under their instructions — for instance
          when building or operating a platform for them — we act as an <strong>operator</strong> and
          apply appropriate security measures and confidentiality obligations.
        </p>
      </div>

      <div>
        <h2>3. The eight conditions for lawful processing</h2>
        <p>We align our processing with the eight conditions set out in POPIA:</p>
        <ul>
          <li><strong>Accountability</strong> — we take responsibility for ensuring the conditions for lawful processing are met.</li>
          <li><strong>Processing limitation</strong> — we process personal information lawfully, minimally, and with consent or another lawful justification, and collect it directly from the data subject where reasonable.</li>
          <li><strong>Purpose specification</strong> — we collect information for specific, explicitly defined and lawful purposes, and retain it only for as long as necessary.</li>
          <li><strong>Further processing limitation</strong> — any further processing is compatible with the purpose for which the information was originally collected.</li>
          <li><strong>Information quality</strong> — we take reasonable steps to keep information accurate, complete and up to date.</li>
          <li><strong>Openness</strong> — we document our processing and notify data subjects of the collection of their information (see our Privacy Policy).</li>
          <li><strong>Security safeguards</strong> — we secure the integrity and confidentiality of personal information through appropriate technical and organisational measures.</li>
          <li><strong>Data subject participation</strong> — we uphold the rights of data subjects to access and correct their personal information.</li>
        </ul>
      </div>

      <div>
        <h2>4. Rights of data subjects</h2>
        <p>Subject to applicable law, data subjects have the right to:</p>
        <ul>
          <li>be notified that their personal information is being collected and processed;</li>
          <li>request access to the personal information we hold about them;</li>
          <li>request correction, deletion or destruction of their personal information;</li>
          <li>object, on reasonable grounds, to the processing of their personal information;</li>
          <li>withdraw consent where processing is based on consent; and</li>
          <li>lodge a complaint with the Information Regulator.</li>
        </ul>
      </div>

      <div>
        <h2>5. Consent</h2>
        <p>
          Where we rely on consent, we ensure it is specific, informed and voluntary. Special personal
          information and the personal information of children are only processed where POPIA permits.
          Consent may be withdrawn at any time, without affecting the lawfulness of processing carried out
          beforehand or on another lawful basis.
        </p>
      </div>

      <div>
        <h2>6. Security safeguards and breach notification</h2>
        <p>
          We implement appropriate, reasonable technical and organisational measures to protect the
          confidentiality and integrity of personal information, and we require operators who process
          information on our behalf to do the same. If we reasonably believe that personal information has
          been accessed or acquired by an unauthorised person, we will notify the Information Regulator and
          the affected data subjects as soon as reasonably possible.
        </p>
      </div>

      <div>
        <h2>7. Cross-border transfers</h2>
        <p>
          Where personal information is transferred outside South Africa (for example, to cloud providers),
          we do so only where POPIA permits — such as where the recipient is bound by laws or agreements
          that provide an adequate level of protection, or with the data subject&apos;s consent.
        </p>
      </div>

      <div>
        <h2>8. Information Officer</h2>
        <p>
          Our Information Officer is responsible for encouraging and monitoring compliance with POPIA,
          dealing with requests and complaints, and liaising with the Information Regulator. Requests and
          queries may be directed to:
        </p>
        <ul>
          <li>Information Officer: {site.infoOfficer}</li>
          <li>{site.legalName} (Registration number {site.regNumber})</li>
          <li>{site.address.street}, {site.address.suburb}, {site.address.city}, {site.address.postalCode}, {site.address.country}</li>
          <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li>Phone: {site.phone}</li>
        </ul>
      </div>

      <div>
        <h2>9. Complaints to the Information Regulator</h2>
        <p>
          If you believe we have not handled your personal information in accordance with POPIA, you may
          lodge a complaint with the Information Regulator (South Africa) at{" "}
          <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.
        </p>
      </div>
    </LegalPage>
  );
}
