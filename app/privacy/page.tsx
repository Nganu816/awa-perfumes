import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection, LegalList, LegalParagraph } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'AWA Perfumes privacy policy - how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="September 1, 2026"
      intro="Your privacy is important to us. This Privacy Policy explains how AWA Perfumes collects, uses, discloses, and safeguards your personal information when you use our website and services. We are committed to protecting your data in accordance with the General Data Protection Regulation (GDPR), Pakistan's National Privacy Act (NPA) 2023, and other applicable privacy laws."
    >
      <LegalSection title="1. Data Controller">
        <LegalParagraph>
          AWA Perfumes is the data controller responsible for the processing of personal data collected
          through our website. For any privacy-related inquiries, you can contact:
        </LegalParagraph>
        <LegalList
          items={[
            'Email: privacy@awaperfumes.com',
            'Data Protection Officer: dpo@awaperfumes.com',
            'Address: Federal Housing Estate Bajabure, Yola, Adamawa State, Nigeria',
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <LegalParagraph>We collect the following categories of personal information:</LegalParagraph>
        <LegalList
          items={[
            <strong key="1">Identity Data:</strong>,
            'Name, email address, phone number, and account credentials.',
            <strong key="2">Transaction Data:</strong>,
            'Order history, payment information (tokenized), and delivery details.',
            <strong key="3">Technical Data:</strong>,
            'IP address, browser type, device information, and cookies.',
            <strong key="4">Usage Data:</strong>,
            'Pages visited, products viewed, and interactions with our site.',
            <strong key="5">Marketing Data:</strong>,
            'Preferences and consent for marketing communications.',
          ]}
        />
      </LegalSection>

      <LegalSection title="3. How We Collect Information">
        <LegalParagraph>We collect personal data through:</LegalParagraph>
        <LegalList
          items={[
            'Direct interactions: when you create an account, place an order, or contact support.',
            'Automated technologies: cookies, log files, and analytics tools when you browse our website.',
            'Third parties: payment processors, shipping providers, and marketing partners.',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Legal Bases for Processing (GDPR Article 6)">
        <LegalParagraph>We process your personal data based on the following legal grounds:</LegalParagraph>
        <LegalList
          items={[
            <strong key="1">Contract (Art. 6(1)(b)):</strong>,
            'Order fulfillment, account management, and customer service.',
            <strong key="2">Consent (Art. 6(1)(a)):</strong>,
            'Marketing communications, cookies, and optional data sharing.',
            <strong key="3">Legal Obligation (Art. 6(1)(c)):</strong>,
            'Compliance with tax laws, anti-fraud regulations, and legal requests.',
            <strong key="4">Legitimate Interest (Art. 6(1)(f)):</strong>,
            'Website security, fraud prevention, and service improvement.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Use of Personal Data">
        <LegalParagraph>We use your personal information for the following purposes:</LegalParagraph>
        <LegalList
          items={[
            'To process and deliver your orders.',
            'To manage your account and provide customer support.',
            'To personalize your shopping experience.',
            'To send transactional communications (order confirmations, shipping updates).',
            'To send marketing communications (with your consent).',
            'To improve our website, products, and services.',
            'To detect and prevent fraud and security incidents.',
            'To comply with legal and regulatory obligations.',
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Cookies & Tracking">
        <LegalParagraph>
          Our website uses cookies and similar tracking technologies. You can manage your cookie
          preferences through our cookie consent banner or your browser settings.
        </LegalParagraph>
        <LegalList
          items={[
            <strong key="1">Strictly Necessary:</strong>,
            'Required for core functionality (login, cart, checkout).',
            <strong key="2">Analytics:</strong>,
            'Help us understand how visitors use our site (with consent).',
            <strong key="3">Marketing:</strong>,
            'Track interactions with our advertising (with consent).',
            <strong key="4">Preference:</strong>,
            'Remember your choices and settings.',
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Data Sharing & Disclosures">
        <LegalParagraph>We do not sell your personal data. We may share limited data with the following categories of service providers:</LegalParagraph>
        <LegalList
          items={[
            'Payment processors (Stripe, PayPal) - only tokenized payment data.',
            'Shipping and logistics providers - delivery address and contact information.',
            'IT and hosting providers - technical data for operations.',
            'Marketing service providers - only for consented marketing.',
            'Legal and regulatory authorities - when required by law.',
          ]}
        />
        <LegalParagraph>
          All service providers are bound by data processing agreements and appropriate safeguards for
          international data transfers.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. International Data Transfers">
        <LegalParagraph>
          Your personal data may be transferred to and processed in countries outside your country of
          residence. When transferring data internationally, we ensure:
        </LegalParagraph>
        <LegalList
          items={[
            'Standard Contractual Clauses (SCCs) are in place with all processors.',
            'Data is encrypted in transit and at rest.',
            'The receiving entity provides adequate data protection.',
            'For NPA 2023 compliance, we offer appropriate safeguards for cross-border transfers.',
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Data Retention">
        <LegalParagraph>We retain personal data only for as long as necessary for the purposes for which it was collected:</LegalParagraph>
        <LegalList
          items={[
            'Account data: until you request deletion.',
            'Order data: 7 years (for tax and legal obligations).',
            'Marketing data: until you withdraw consent.',
            'Consent records: 3 years after the last interaction.',
            'Analytics data: up to 12 months.',
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Your Privacy Rights">
        <LegalParagraph>Depending on your jurisdiction, you have the following rights:</LegalParagraph>
        <LegalList
          items={[
            <strong key="1">Right of Access:</strong>,
            'Request a copy of the personal data we hold about you.',
            <strong key="2">Right to Rectification:</strong>,
            'Correct inaccurate or incomplete data.',
            <strong key="3">Right to Erasure:</strong>,
            'Request deletion of your personal data.',
            <strong key="4">Right to Restrict Processing:</strong>,
            'Limit how we use your data.',
            <strong key="5">Right to Data Portability:</strong>,
            'Receive your data in a structured, machine-readable format.',
            <strong key="6">Right to Object:</strong>,
            'Object to processing based on legitimate interests or direct marketing.',
            <strong key="7">Right to Withdraw Consent:</strong>,
            'Withdraw consent at any time without affecting prior processing.',
          ]}
        />
        <LegalParagraph>
          To exercise any of these rights, please use the self-service options in your account or
          contact privacy@awaperfumes.com. We will respond within 30 days (GDPR) as required.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Data Security">
        <LegalParagraph>
          We implement appropriate technical and organizational measures to protect your personal data,
          including:
        </LegalParagraph>
        <LegalList
          items={[
            'Encryption of data in transit (TLS 1.3) and at rest (AES-256).',
            'Access controls and least-privilege principles.',
            'Regular security assessments and penetration testing.',
            'Incident response procedures.',
            'Employee privacy and security training.',
          ]}
        />
        <LegalParagraph>
          While we take reasonable precautions, no method of electronic transmission or storage is 100%
          secure. We cannot guarantee absolute security.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Data Breach Notification">
        <LegalParagraph>
          In the event of a data breach that risks your rights and freedoms, we will notify the relevant
          supervisory authority within <strong>72 hours</strong> of becoming aware, as required by GDPR,
          and will notify affected individuals when the breach poses a high risk.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. Children's Privacy">
        <LegalParagraph>
          Our services are not directed to children under the age of 16 (or the applicable minimum age).
          We do not knowingly collect personal data from children. If you believe we have collected data
          from a child, please contact us so we can promptly delete it.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="14. Changes to This Policy">
        <LegalParagraph>
          We may update this Privacy Policy from time to time. We will notify you of material changes
          by posting the updated policy on this page and, where appropriate, by email. Please review
          this policy periodically.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="15. Contact & Complaints">
        <LegalParagraph>
          If you have any concerns about how we handle your personal data, please contact us using the
          details above. You also have the right to lodge a complaint with your local data protection
          authority.
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  );
}
