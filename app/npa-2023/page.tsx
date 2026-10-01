import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection, LegalList, LegalParagraph } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'NPA 2023 Policy',
  description: 'AWA Perfumes compliance with Pakistan National Privacy Act 2023.',
};

export default function Npa2023Page() {
  return (
    <LegalPage
      title="NPA 2023 Compliance Policy"
      lastUpdated="September 1, 2026"
      intro="AWA Perfumes is fully committed to compliance with the Pakistan National Privacy Act 2023 (NPA 2023). This policy outlines our approach to collecting, processing, storing, and protecting personal data of individuals in Pakistan, in accordance with the provisions of the NPA 2023 and its implementing regulations."
    >
      <LegalSection title="1. Purpose & Scope">
        <LegalParagraph>
          This policy demonstrates our compliance with the NPA 2023 and applies to all personal data
          processing activities conducted by AWA Perfumes related to data subjects in the Islamic
          Republic of Pakistan.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Our Data Protection Obligations">
        <LegalParagraph>Under the NPA 2023, we are committed to:</LegalParagraph>
        <LegalList
          items={[
            'Processing personal data lawfully, fairly, and transparently.',
            'Collecting only data necessary for specified purposes.',
            'Ensuring data accuracy and keeping records up to date.',
            'Retaining data only as long as necessary.',
            'Implementing appropriate security safeguards.',
            'Honoring all data subject rights granted under the Act.',
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Personal Data We Collect">
        <LegalParagraph>
          We collect the following categories of personal data from users in Pakistan:
        </LegalParagraph>
        <LegalList
          items={[
            'Identity and contact data (name, email, phone, postal address).',
            'Transaction data (order history, shipment details).',
            'Payment data (tokenized only - we never store card numbers).',
            'Technical data (IP address, browser, device).',
            'Marketing preferences and consent records.',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Lawful Bases for Processing (NPA 2023)">
        <LegalParagraph>We process personal data based on the following lawful bases:</LegalParagraph>
        <LegalList
          items={[
            <strong key="1">Consent:</strong>,
            'You have given clear, specific, and informed consent for processing. You may withdraw consent at any time.',
            <strong key="2">Contract:</strong>,
            'Processing is necessary to fulfill our contractual obligations to you (e.g., delivering your order).',
            <strong key="3">Legal Obligation:</strong>,
            'Processing is required to comply with our legal obligations (tax, regulatory reporting).',
            <strong key="4">Legitimate Interest:</strong>,
            'Processing is necessary for our legitimate business interests (e.g., fraud prevention, security), provided these do not override your rights.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Consent Management">
        <LegalParagraph>We maintain a rigorous consent management process in accordance with NPA 2023:</LegalParagraph>
        <LegalList
          items={[
            'Consent is freely given, specific, informed, and unambiguous.',
            'Consent is obtained through a clear affirmative action (opt-in, never pre-ticked boxes).',
            'Separate consents are obtained for separate processing purposes.',
            'Consent can be withdrawn as easily as it was given (via account settings or contact).',
            'All consent records are timestamped and logged for audit purposes.',
            'Marketing communications use double opt-in and include unsubscribe options.',
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Data Subject Rights (NPA 2023)">
        <LegalParagraph>In accordance with the NPA 2023, you have the following rights:</LegalParagraph>
        <LegalList
          items={[
            <strong key="1">Right of Access:</strong>,
            'Request a copy of the personal data we hold about you.',
            <strong key="2">Right to Rectification:</strong>,
            'Correct inaccurate or incomplete personal data in your account or via request.',
            <strong key="3">Right to Erasure:</strong>,
            'Request deletion of your account and associated personal data.',
            <strong key="4">Right to Restrict Processing:</strong>,
            'Request that we limit how we process your data.',
            <strong key="5">Right to Portability:</strong>,
            'Receive your personal data in a structured, machine-readable format (JSON/CSV).',
            <strong key="6">Right to Object:</strong>,
            'Object to processing based on legitimate interest or direct marketing.',
            <strong key="7">Right to Withdraw Consent:</strong>,
            'Withdraw any consent you have given at any time.',
          ]}
        />
        <LegalParagraph>
          To exercise these rights, please use the self-service tools in your account, email{' '}
          <a href="mailto:privacy@awaperfumes.com" className="link">privacy@awaperfumes.com</a>, or
          contact our Data Protection Officer. We will respond to requests within the timelines
          required by the NPA 2023.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Cross-Border Data Transfers">
        <LegalParagraph>
          Where necessary, we may transfer personal data outside of Pakistan. For all cross-border
          transfers, we ensure:
        </LegalParagraph>
        <LegalList
          items={[
            'Adequate safeguards are in place (Standard Contractual Clauses).',
            'The recipient provides an adequate level of data protection.',
            'Data is encrypted during transfer and storage.',
            'We maintain agreements with all international processors.',
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Data Security Measures">
        <LegalParagraph>To protect personal data, we implement the following security measures:</LegalParagraph>
        <LegalList
          items={[
            'Encryption at rest (AES-256) and in transit (TLS 1.3).',
            'Role-based access controls (least privilege).',
            'Multi-factor authentication for administrative accounts.',
            'Regular security audits and penetration testing.',
            'Continuous monitoring and intrusion detection.',
            'Secure development practices (OWASP controls).',
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Data Breach Notification">
        <LegalParagraph>
          In the event of a personal data breach, we will:
        </LegalParagraph>
        <LegalList
          items={[
            'Notify the relevant authority within the required timeframe.',
            'Notify affected individuals where the breach creates a high risk to their rights.',
            'Contain and mitigate the impact of the breach.',
            'Conduct a thorough investigation and implement corrective measures.',
            'Maintain a breach register documenting all incidents.',
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Sensitive Personal Data">
        <LegalParagraph>
          We generally do not collect sensitive personal data (as defined by the NPA 2023). Where
          sensitive data is unavoidably provided (e.g., special delivery instructions), it is processed
          with heightened safeguards and specific consent.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Children's Data">
        <LegalParagraph>
          We do not knowingly collect or process personal data of minors without verifiable parental
          consent in accordance with the NPA 2023. If you believe we have collected a child&apos;s data,
          please contact privacy@awaperfumes.com and we will promptly take action.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Data Protection Officer">
        <LegalParagraph>
          We have designated a Data Protection Officer (DPO) responsible for overseeing our NPA 2023
          compliance. You can contact the DPO at:
        </LegalParagraph>
        <LegalList
          items={[
            'Email: dpo@awaperfumes.com',
            'Scope: data protection compliance, subject requests, and complaints.',
          ]}
        />
      </LegalSection>

      <LegalSection title="13. Data Retention">
        <LegalParagraph>We retain data in accordance with necessity and legal requirements:</LegalParagraph>
        <LegalList
          items={[
            'Account data: retained until account deletion is requested.',
            'Order data: 7 years (tax/legal obligations).',
            'Marketing data: until consent withdrawal.',
            'Consent/audit records: 3-5 years.',
          ]}
        />
      </LegalSection>

      <LegalSection title="14. Policy Updates">
        <LegalParagraph>
          We review this policy annually and update it as needed to reflect changes in law or
          processing activities. Material changes will be communicated through our website and, where
          appropriate, by direct notification.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="15. Contact">
        <LegalParagraph>
          For NPA 2023-related inquiries or requests, please contact privacy@awaperfumes.com or
          dpo@awaperfumes.com. We are committed to addressing concerns promptly and transparently.
        </LegalParagraph>
      </LegalSection>

      <div className="rounded-2xl border border-lilac-200 bg-lilac-50 p-6">
        <p className="text-sm text-purple-900">
          <strong>Networked Automated Processes:</strong> Should we at any point deploy automated
          decision-making or profiling tools, we will always provide meaningful information about the
          logic involved and the significance and consequences of such processing, and implement
          measures to prevent unfair or discriminatory outcomes as required under the NPA 2023.
        </p>
      </div>
    </LegalPage>
  );
}
