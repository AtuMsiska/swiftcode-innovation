import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing SwiftCode Innovation's services and the use of the swiftcode.co.za website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="July 2026">
      <div>
        <h2>1. Introduction and acceptance</h2>
        <p>
          These Terms and Conditions (&quot;Terms&quot;) govern the provision of services by{" "}
          {site.legalName} (&quot;{site.name}&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
          to a client (&quot;you&quot; or the &quot;Client&quot;), as well as your use of the
          swiftcode.co.za website. By engaging our services through a proposal, quotation, statement of
          work or order (an &quot;Order&quot;) that incorporates these Terms, or by using our website, you
          agree to be bound by these Terms. If you accept these Terms on behalf of an organisation, you
          warrant that you are authorised to bind that organisation.
        </p>
      </div>

      <div>
        <h2>2. Definitions</h2>
        <ul>
          <li><strong>&quot;Services&quot;</strong> — the technology services we provide, which may include product research, software development, artificial-intelligence solutions, cloud engineering, UI/UX design, technology strategy, cybersecurity and related professional services, as described in an Order.</li>
          <li><strong>&quot;Deliverables&quot;</strong> — the software, designs, documentation and other work product we create for you under an Order.</li>
          <li><strong>&quot;Client Materials&quot;</strong> — any content, data, systems, credentials or materials you provide to enable us to perform the Services.</li>
          <li><strong>&quot;Order&quot;</strong> — a proposal, quotation, statement of work or order document that describes the Services and incorporates these Terms.</li>
          <li><strong>&quot;Fees&quot;</strong> — the charges payable for the Services as set out in an Order.</li>
        </ul>
      </div>

      <div>
        <h2>3. Scope of services</h2>
        <p>
          We will perform the Services described in each Order with reasonable skill and care and in a
          professional manner. Any service not expressly described in an Order is out of scope. Changes to
          scope will be handled through a written change request and may affect timelines and Fees.
        </p>
      </div>

      <div>
        <h2>4. Engagement and term</h2>
        <p>
          An engagement commences on the effective date stated in the Order and continues until the
          Services are completed or the Order is terminated in accordance with these Terms. Where an Order
          provides for a recurring or retainer arrangement, it will renew and may be terminated by either
          party on the notice period stated in the Order or, if none is stated, on 30 days&apos; written
          notice.
        </p>
      </div>

      <div>
        <h2>5. Client responsibilities</h2>
        <p>You agree to:</p>
        <ul>
          <li>provide timely access to the Client Materials, information, systems and personnel we reasonably need;</li>
          <li>ensure you have all rights and consents necessary for us to use the Client Materials to perform the Services;</li>
          <li>review and provide feedback on Deliverables within agreed timeframes; and</li>
          <li>remain responsible for your own regulatory compliance in connection with your use of the Services and Deliverables.</li>
        </ul>
        <p>Delays caused by the Client may affect delivery timelines and Fees.</p>
      </div>

      <div>
        <h2>6. Intellectual property</h2>
        <p>
          You retain ownership of your Client Materials. Unless an Order states otherwise, ownership of
          the Deliverables transfers to you upon full payment of the applicable Fees. We retain ownership
          of our pre-existing intellectual property, tools, frameworks, know-how and any general
          methodologies used to create the Deliverables, and we grant you a licence to use those elements
          to the extent necessary to use the Deliverables. Third-party and open-source components are
          licensed to you under their own terms.
        </p>
      </div>

      <div>
        <h2>7. Fees and payment</h2>
        <p>
          Fees are set out in the applicable Order and are exclusive of VAT and disbursements unless
          stated otherwise. Unless agreed otherwise in writing, invoices are payable within the period
          stated in the Order. We may suspend the Services on written notice if undisputed invoices remain
          unpaid. Amounts already paid are non-refundable except as expressly provided in these Terms or
          the Order.
        </p>
      </div>

      <div>
        <h2>8. Confidentiality</h2>
        <p>
          Each party may receive information that is confidential to the other. Each party agrees to use
          the other&apos;s confidential information only to perform its obligations, to protect it with
          reasonable care, and not to disclose it to third parties except to those who need it and are
          bound by equivalent obligations. This does not apply to information that is public through no
          fault of the receiving party, is lawfully received from a third party, or is independently
          developed, or where disclosure is required by law.
        </p>
      </div>

      <div>
        <h2>9. Data protection</h2>
        <p>
          In performing the Services we will comply with our{" "}
          <a href="/privacy">Privacy Policy</a> and applicable data-protection law, including the
          Protection of Personal Information Act, 4 of 2013 (POPIA). Where we process personal information
          on your behalf, we do so as an operator in accordance with your lawful instructions and applies
          appropriate security safeguards.
        </p>
      </div>

      <div>
        <h2>10. Warranties and disclaimers</h2>
        <p>
          We warrant that the Services will be performed with reasonable skill and care. Except as
          expressly stated, the Services and Deliverables are provided without further warranties of any
          kind, whether express or implied, including implied warranties of merchantability, fitness for a
          particular purpose or non-infringement. We do not warrant that software will be error-free or
          uninterrupted, or that it will operate in combination with systems or content not provided by
          us. We are not responsible for issues arising from Client Materials, third-party content, or
          matters outside our reasonable control such as internet and communications failures.
        </p>
      </div>

      <div>
        <h2>11. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, neither party is liable for any indirect, incidental,
          special or consequential damages, or for loss of profit, revenue, data or goodwill. Our total
          aggregate liability arising out of or in connection with an Order, whether in contract, delict
          or otherwise, is limited to the Fees actually paid to us under that Order in the twelve (12)
          months preceding the event giving rise to the liability. Nothing in these Terms limits liability
          that cannot be limited by law.
        </p>
      </div>

      <div>
        <h2>12. Indemnity</h2>
        <p>
          Each party (the &quot;providing party&quot;) will defend and indemnify the other against
          third-party claims to the extent that materials it provided, used as permitted under an Order,
          infringe that third party&apos;s intellectual-property rights, provided the indemnified party
          gives prompt written notice, reasonable cooperation, and control of the defence and settlement.
          This indemnity does not apply where the claim arises from unauthorised modification or use, use
          of a superseded version, or combination with materials not provided by the providing party.
        </p>
      </div>

      <div>
        <h2>13. Term and termination</h2>
        <p>
          Either party may terminate an Order if the other commits a material breach and fails to remedy
          it within 30 days of written notice, or immediately if the other becomes insolvent, commences
          business rescue or ceases to trade. On termination, you will pay for Services properly performed
          up to the termination date. Clauses relating to intellectual property, confidentiality, payment,
          liability, indemnity and governing law survive termination.
        </p>
      </div>

      <div>
        <h2>14. Force majeure</h2>
        <p>
          Neither party is liable for failure or delay in performance caused by events beyond its
          reasonable control, including acts of God, war, civil unrest, pandemic, government restrictions,
          or failure of electrical, internet or telecommunications services not caused by that party. The
          affected party will use reasonable efforts to mitigate the effect of the event.
        </p>
      </div>

      <div>
        <h2>15. Governing law and jurisdiction</h2>
        <p>
          These Terms are governed by the laws of the Republic of South Africa, and the parties submit to
          the exclusive jurisdiction of the South African courts in respect of any dispute arising out of
          or relating to these Terms.
        </p>
      </div>

      <div>
        <h2>16. General</h2>
        <ul>
          <li>You may not assign or transfer an Order without our prior written consent.</li>
          <li>If any provision is found invalid or unenforceable, the remaining provisions remain in effect.</li>
          <li>These Terms, together with the applicable Order, constitute the entire agreement between the parties and supersede prior discussions. In the event of a conflict, the Order takes precedence.</li>
          <li>We act as an independent contractor; no partnership, joint venture or employment relationship is created.</li>
          <li>Notices must be given in writing to the addresses stated in the Order or, for us, to <a href={`mailto:${site.email}`}>{site.email}</a>.</li>
        </ul>
      </div>

      <div>
        <h2>17. Contact</h2>
        <p>
          {site.legalName} (Registration number {site.regNumber}), {site.address.street},{" "}
          {site.address.suburb}, {site.address.city}, {site.address.postalCode}, {site.address.country}.
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
