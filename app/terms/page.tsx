import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection, LegalList, LegalParagraph } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'AWA Perfumes terms and conditions of use and purchase.',
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated="September 1, 2026"
      intro="Welcome to AWA Perfumes. By accessing or using our website, you agree to be bound by these Terms & Conditions. Please read them carefully before making a purchase. These terms apply to all visitors, users, and customers of our platform, regardless of location."
    >
      <LegalSection title="1. Acceptance of Terms">
        <LegalParagraph>
          By accessing, browsing, or purchasing from awaperfumes.com, you acknowledge that you have read,
          understood, and agree to be bound by these Terms & Conditions and our{' '}
          <Link href="/privacy" className="link">Privacy Policy</Link>. If you do not agree with any part
          of these terms, you must not use our website.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Eligibility">
        <LegalList
          items={[
            'You must be at least 18 years old, or the age of majority in your jurisdiction, to make a purchase.',
            'You must provide accurate, current, and complete information during registration and purchase.',
            'You are responsible for maintaining the confidentiality of your account credentials.',
            'We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.',
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Account Registration">
        <LegalParagraph>
          To access certain features, you may need to create an account. You agree to:
        </LegalParagraph>
        <LegalList
          items={[
            'Provide accurate and truthful information.',
            'Keep your password secure and confidential.',
            'Notify us immediately of any unauthorized use of your account.',
            'Take full responsibility for all activities that occur under your account.',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Orders & Pricing">
        <LegalParagraph>
          All prices are listed in USD and include applicable taxes unless otherwise stated. We reserve
          the right to modify prices at any time without prior notice.
        </LegalParagraph>
        <LegalList
          items={[
            'All orders are subject to acceptance and availability.',
            'We may refuse or cancel orders for reasons including but not limited to: price errors, stock availability, fraudulent activity, or suspected resale.',
            'We do our best to display accurate product information but cannot guarantee that product descriptions, images, or specifications are error-free.',
            'In the event of a pricing error, we will contact you with the correct price and provide the option to confirm or cancel your order.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Payment">
        <LegalParagraph>
          We accept various payment methods including major credit cards, PayPal, and Apple Pay. By
          providing payment information, you represent and warrant that:
        </LegalParagraph>
        <LegalList
          items={[
            'You are authorized to use the payment method provided.',
            'You authorize us to charge the total order amount to your chosen payment method.',
            'All payment information provided is accurate and valid.',
            'Your payment processor&apos;s terms also apply.',
          ]}
        />
        <LegalParagraph>
          All payment transactions are processed securely through PCI DSS compliant payment
          processors. We never store your card details on our servers.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Shipping & Delivery">
        <LegalParagraph>
          We ship worldwide. Shipping times and costs vary based on destination and selected shipping
          method. We are not responsible for delays caused by customs, weather, or carrier issues.
        </LegalParagraph>
        <LegalList
          items={[
            'Delivery estimates are not guaranteed.',
            'Risk of loss passes to you upon delivery.',
            'International orders may be subject to customs duties and import taxes (see our Shipping Info).',
            'It is your responsibility to provide a correct shipping address.',
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Returns & Refunds">
        <LegalParagraph>
          Our return and refund policy is described in detail on our{' '}
          <Link href="/return-policy" className="link">Return & Refund Policy</Link> page and is
          incorporated into these terms by reference.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Intellectual Property">
        <LegalParagraph>
          All content on this website, including but not limited to text, graphics, logos, product
          images, packaging designs, and software, is the property of AWA Perfumes or its licensors
          and is protected by intellectual property laws.
        </LegalParagraph>
        <LegalList
          items={[
            'You may not reproduce, distribute, modify, or create derivative works from our content without prior written consent.',
            'The AWA Perfumes name, logo, and associated branding are trademarks of AWA Perfumes.',
            'Fragrance names and formulations are proprietary to AWA Perfumes.',
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Prohibited Uses">
        <LegalParagraph>You agree not to use our website or services for any unlawful purpose, including but not limited to:</LegalParagraph>
        <LegalList
          items={[
            'Reselling products without prior written authorization.',
            'Attempting to interfere with or disrupt our services.',
            'Bypassing security measures or attempting unauthorized access.',
            'Misrepresenting your identity or affiliation.',
            'Uploading malicious code or conducting attacks on our infrastructure.',
            'Using automated bots to scrape or harvest data.',
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <LegalParagraph>
          To the maximum extent permitted by law, AWA Perfumes shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, including but not limited to loss of
          profits, data, use, goodwill, or other intangible losses resulting from:
        </LegalParagraph>
        <LegalList
          items={[
            'Your use or inability to use our services.',
            'Any conduct or content of any third party.',
            'Unauthorized access to or alteration of your transmissions or data.',
            'Products purchased or obtained through our services.',
          ]}
        />
      </LegalSection>

      <LegalSection title="11. Disclaimers">
        <LegalParagraph>
          Fragrance reactions can vary by individual. We provide product information for informational
          purposes and do not warrant that any fragrance will be suitable for every individual. If you
          have sensitive skin or allergies, we recommend testing products before full use.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Privacy & Data Protection">
        <LegalParagraph>
          Your use of our services is subject to our{' '}
          <Link href="/privacy" className="link">Privacy Policy</Link> and{' '}
          <Link href="/npa-2023" className="link">NPA 2023 Policy</Link>, which describe how we
          collect, use, and protect your personal data.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. Dispute Resolution">
        <LegalParagraph>
          These terms and your use of our services shall be governed by and construed in accordance
          with applicable laws. Any disputes shall first be attempted to be resolved through good-faith
          negotiation.
        </LegalParagraph>
        <LegalList
          items={[
            'If negotiation fails, disputes shall be resolved through binding arbitration.',
            'For customers in the EU/EEA, you may also submit disputes through the EU Online Dispute Resolution platform.',
            'For customers in Pakistan, disputes shall be subject to the jurisdiction of Pakistani courts.',
          ]}
        />
      </LegalSection>

      <LegalSection title="14. Changes to Terms">
        <LegalParagraph>
          We reserve the right to update or modify these Terms & Conditions at any time. Any changes
          will be effective immediately upon posting to this page. Your continued use of the website
          after changes constitutes acceptance of the revised terms. We encourage you to review these
          terms periodically.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="15. Contact">
        <LegalParagraph>
          For questions about these Terms & Conditions, please contact{' '}
          <a href="mailto:legal@awaperfumes.com" className="link">legal@awaperfumes.com</a>.
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  );
}
