import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "PAIA Manual",
  description: "Promotion of Access to Information Act (PAIA) manual for SwiftCode Innovation.",
  alternates: { canonical: "/paia" },
  robots: { index: true, follow: false },
};

export default function PaiaPage() {
  return (
    <LegalPage eyebrow="Legal" title="PAIA Manual" updated="July 2026">
      <div>
        <h2>1. Purpose of this manual</h2>
        <p>
          This manual is published in terms of section 51 of the Promotion of Access to Information Act,
          2000 (PAIA), and describes how requesters may access records held by {site.legalName}.
        </p>
      </div>

      <div>
        <h2>2. Particulars of the company</h2>
        <ul>
          <li>Company: {site.legalName}</li>
          <li>Registration number: {site.regNumber}</li>
          <li>Registered address: {site.address.street}, {site.address.suburb}, {site.address.city}, {site.address.postalCode}</li>
          <li>Information Officer: {site.infoOfficer}</li>
          <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
        </ul>
      </div>

      <div>
        <h2>3. How to request access</h2>
        <p>
          Requests must be made on the prescribed form and submitted to the Information Officer. We will
          respond within the timeframes set out in PAIA. Applicable fees may be payable.
        </p>
      </div>

      <div>
        <h2>4. Records available</h2>
        <p>
          Certain records are available in terms of other legislation, and others may be requested in terms
          of PAIA subject to the grounds for refusal set out in the Act.
        </p>
      </div>
    </LegalPage>
  );
}
