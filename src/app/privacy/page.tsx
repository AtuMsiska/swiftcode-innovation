import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SwiftCode Innovation collects, uses, protects and shares personal information in accordance with the Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  const addr = `${site.address.street}, ${site.address.suburb}, ${site.address.city}, ${site.address.postalCode}`;
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="July 2026">
      <div>
        <h2>1. Introduction</h2>
        <p>
          {site.legalName} (&quot;{site.name}&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
          respects your privacy and is committed to protecting the personal information entrusted to us.
          This Privacy Policy explains how we collect, use, store, share and safeguard personal
          information, and the rights available to you, in accordance with the Protection of Personal
          Information Act, 4 of 2013 (&quot;POPIA&quot;) and other applicable law.
        </p>
        <p>
          It applies to visitors of our website, our clients, prospective clients, suppliers, service
          providers, job applicants and any other person whose personal information we process.
        </p>
      </div>

      <div>
        <h2>2. About POPIA</h2>
        <p>
          POPIA gives effect to the constitutional right to privacy by setting conditions for the lawful
          processing of the personal information of natural and juristic persons. It applies to a
          responsible party that is domiciled in South Africa, or that processes personal information
          using automated or non-automated means within South Africa. Where we determine the purpose and
          means of processing, we act as the &quot;responsible party&quot;; where we process information
          on behalf of a client, we act as an &quot;operator&quot;.
        </p>
      </div>

      <div>
        <h2>3. Information we collect</h2>
        <p>We collect and process personal information for defined, lawful purposes. This may include:</p>
        <ul>
          <li>Identity and contact details — name, email address, telephone number, company and role;</li>
          <li>Enquiry and project information you provide through our contact form or during an engagement;</li>
          <li>Correspondence and records of our communications with you;</li>
          <li>Supplier and service-provider details for procurement and payment purposes;</li>
          <li>Recruitment information from job applicants (CVs, qualifications, references);</li>
          <li>Technical and usage data collected automatically, such as anonymised analytics, where enabled.</li>
        </ul>
        <p>
          We collect information directly from you, in the course of our relationship or provision of
          services, from your use of our website, and — where lawful — from third parties and public
          sources.
        </p>
      </div>

      <div>
        <h2>4. Lawful basis for processing</h2>
        <p>We only process personal information where we have a lawful basis to do so, namely where:</p>
        <ul>
          <li>you have consented to the processing;</li>
          <li>the processing is necessary to conclude or perform a contract with you;</li>
          <li>the processing is required to comply with a legal obligation;</li>
          <li>the processing protects your legitimate interests; or</li>
          <li>the processing is necessary for our legitimate interests or those of a third party to whom the information is supplied, balanced against your rights.</li>
        </ul>
        <p>
          We do not process special personal information except in accordance with POPIA. Where we rely
          on consent, you may withdraw it at any time; this does not affect the lawfulness of processing
          carried out before withdrawal or processing justified on another lawful basis.
        </p>
      </div>

      <div>
        <h2>5. Purposes for processing</h2>
        <p>We generally process personal information to operate our business, including to:</p>
        <ul>
          <li>respond to enquiries and provide, manage and improve our services and products;</li>
          <li>research, design, build, deploy and support software and technology solutions;</li>
          <li>manage our relationships with clients, suppliers and service providers;</li>
          <li>process payments and manage invoicing and accounting;</li>
          <li>recruit and manage staff and contractors;</li>
          <li>monitor and secure our systems and online platforms;</li>
          <li>send you information about our services where permitted (see Direct marketing); and</li>
          <li>comply with applicable law and respond to lawful requests from regulatory or government authorities.</li>
        </ul>
      </div>

      <div>
        <h2>6. Keeping information accurate</h2>
        <p>
          We take reasonable steps to keep personal information accurate, complete and up to date for the
          purpose for which it is processed. Please notify us of any changes so that we can update our
          records.
        </p>
      </div>

      <div>
        <h2>7. Storage and third-party service providers</h2>
        <p>
          We may store personal information in electronic or hard-copy format on our own secured systems
          or with trusted third-party providers (such as reputable cloud, hosting and software providers)
          that support our operations. We require these operators, by written agreement, to process
          personal information only as instructed and to apply security measures at least as protective as
          our own.
        </p>
      </div>

      <div>
        <h2>8. Sharing personal information</h2>
        <p>
          We do not sell your personal information. We may share it with third parties who assist us —
          for example, hosting and infrastructure providers, payment processors, professional advisors,
          and auditors — and with government or regulatory authorities where required by law. We share
          information with your consent or where we are otherwise permitted to do so under applicable law.
        </p>
      </div>

      <div>
        <h2>9. Cross-border transfers</h2>
        <p>
          Some of our service providers may process or store personal information outside South Africa.
          Where we transfer personal information to another country, we do so only where a lawful basis
          under POPIA exists — for example, where the recipient is subject to laws or agreements that
          provide an adequate level of protection, or where you have consented. Information processed in
          another jurisdiction may be subject to the laws of that country.
        </p>
      </div>

      <div>
        <h2>10. Direct marketing</h2>
        <p>
          We may contact you about services that may be of interest to you where permitted by law. You
          may opt out of marketing communications at any time by contacting us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>, and we will stop processing your information
          for that purpose.
        </p>
      </div>

      <div>
        <h2>11. Data retention</h2>
        <p>
          We do not retain personal information for longer than is necessary to achieve the purpose for
          which it was collected, unless retention is required or authorised by law, is necessary for our
          lawful functions or a contract, you have consented to longer retention, or the record is kept
          for legitimate historical, research, archival or statistical purposes with appropriate
          safeguards. When no longer required, we securely delete, destroy or de-identify the information.
        </p>
      </div>

      <div>
        <h2>12. Data minimisation</h2>
        <p>
          We limit our processing of personal information to what is adequate, relevant and not excessive
          for the purpose for which it is collected.
        </p>
      </div>

      <div>
        <h2>13. Security and data breaches</h2>
        <p>
          We apply appropriate, reasonable technical and organisational measures to safeguard personal
          information against loss, damage, unlawful access and unauthorised destruction. If we have
          reasonable grounds to believe that personal information has been accessed or acquired by an
          unauthorised person, we will notify the Information Regulator and affected data subjects as soon
          as reasonably possible, in accordance with POPIA.
        </p>
      </div>

      <div>
        <h2>14. Cookies and similar technologies</h2>
        <p>
          Our website may use cookies and similar technologies to enable core functionality and, where
          enabled, to collect anonymised usage statistics. You can set your browser to refuse cookies;
          however, some parts of the website may not function as intended if you do so.
        </p>
      </div>

      <div>
        <h2>15. Your rights</h2>
        <p>Subject to applicable law, you have the right to:</p>
        <ul>
          <li>request access to the personal information we hold about you;</li>
          <li>request that we correct, update or delete your personal information on reasonable grounds;</li>
          <li>object, on reasonable grounds, to the processing of your personal information;</li>
          <li>withdraw consent where processing is based on consent; and</li>
          <li>lodge a complaint with the Information Regulator.</li>
        </ul>
        <p>
          To exercise these rights, contact our Information Officer (details below). We may ask you to
          verify your identity, and will respond within the timeframes required by law. Prescribed fees
          set out in our PAIA Manual may apply to certain requests.
        </p>
      </div>

      <div>
        <h2>16. Changes to this policy</h2>
        <p>
          We may amend this Privacy Policy from time to time and will publish the current version on our
          website. Material changes will be communicated where reasonably practicable.
        </p>
      </div>

      <div>
        <h2>17. Contact us</h2>
        <p>
          Questions, requests or complaints regarding this Policy or your personal information may be
          directed to our Information Officer:
        </p>
        <ul>
          <li>Information Officer: {site.infoOfficer}</li>
          <li>{site.legalName} (Registration number {site.regNumber})</li>
          <li>{addr}, {site.address.country}</li>
          <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li>Phone: {site.phone}</li>
        </ul>
        <p>
          You may also contact the Information Regulator (South Africa) at{" "}
          <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.
        </p>
      </div>
    </LegalPage>
  );
}
