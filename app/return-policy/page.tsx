import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection, LegalList, LegalParagraph } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Return & Refund Policy',
  description: 'AWA Perfumes return and refund policy. 30-day returns, exchange options, and refund processing details.',
};

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      title="Return & Refund Policy"
      lastUpdated="September 1, 2026"
      intro="At AWA Perfumes, your satisfaction is our priority. We want you to love every fragrance you purchase. If for any reason you are not completely satisfied, we offer a hassle-free return and refund process designed to give you complete peace of mind."
    >
      <LegalSection title="1. Return Eligibility">
        <LegalParagraph>
          We accept returns within <strong>30 calendar days</strong> from the date of delivery for most items. To be eligible for a return, the following conditions must be met:
        </LegalParagraph>
        <LegalList
          items={[
            'The product is unused, unopened, and in its original packaging with all seals intact.',
            'Fragrance bottles have not been removed from their original sealed boxes.',
            'The return is initiated within 30 days of the delivery confirmation date.',
            'Original receipt, order number, or invoice is provided.',
            'Gift sets and bundles must be returned in their entirety.',
            'The product must be free from any damage caused by the customer.',
          ]}
        />
        <LegalParagraph>
          For hygiene and safety reasons, <strong>opened or used fragrance products cannot be returned</strong> unless they are defective or damaged upon arrival.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Non-Returnable Items">
        <LegalList
          items={[
            'Opened or used fragrance products (including tester bottles).',
            'Items that have been personalized or customized.',
            'Products returned after the 30-day window.',
            'Gift cards and vouchers.',
            'Items that are damaged due to misuse by the customer.',
            'Clearance or final-sale items marked as non-returnable.',
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Return Process">
        <LegalParagraph>To initiate a return, please follow these steps:</LegalParagraph>
        <ol className="mb-4 ml-5 list-decimal space-y-3 text-gray-700">
          <li>
            Log in to your{' '}
            <Link href="/account" className="link">account</Link> or contact our support team at{' '}
            <a href="mailto:returns@awaperfumes.com" className="link">returns@awaperfumes.com</a>.
          </li>
          <li>
            Locate the order in your order history and select the items you wish to return.
          </li>
          <li>
            Select a return reason and provide any additional details.
          </li>
          <li>
            You will receive a <strong>Return Merchandise Authorization (RMA) number</strong> and a prepaid return shipping label (if applicable).
          </li>
          <li>
            Package the items securely in their original packaging, include the RMA number, and ship within 10 business days of receiving the RMA.
          </li>
        </ol>
        <LegalParagraph>
          <strong>Return shipping address:</strong>
          <br />
          AWA Perfumes Returns
          <br />
          Federal Housing Estate Bajabure
          <br />
          Returns Department
          <br />
          Yola, Adamawa State, Nigeria
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="4. Refund Processing">
        <LegalParagraph>Once your return is received and inspected (typically within 2-3 business days), we will process your refund according to the following schedule:</LegalParagraph>
        <LegalList
          items={[
            <strong key="1">Full refund to original payment method:</strong>,
            '5-10 business days for credit/debit card refunds.',
            '3-5 business days for PayPal refunds.',
            'Immediate credit for store credit refunds.',
          ]}
        />
        <LegalParagraph>
          Shipping costs are not refundable unless the return is due to our error (wrong item shipped, defective product, or damaged item).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. Exchanges">
        <LegalParagraph>
          We offer free exchanges for defective, damaged, or incorrectly shipped items. To exchange an item:
        </LegalParagraph>
        <LegalList
          items={[
            'Contact our support team within 7 days of delivery.',
            'Provide photographs of the defect or damage.',
            'We will ship a replacement at no additional cost.',
            'For size exchanges (e.g., 50ml to 100ml), a price adjustment will be applied.',
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Damaged or Defective Items">
        <LegalParagraph>
          If you receive a damaged or defective product, please contact us within <strong>48 hours</strong> of delivery with photographs of the damage. We will arrange a replacement or full refund, including shipping costs, at no charge to you.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Order Cancellations">
        <LegalParagraph>
          You can cancel your order free of charge as long as it has not yet been shipped. To cancel:
        </LegalParagraph>
        <LegalList
          items={[
            'Contact support or cancel through your account.',
            'If the order has already shipped, follow the standard return process upon delivery.',
            'Cancellation refunds are processed within 3-5 business days.',
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Policy Exceptions">
        <LegalParagraph>
          In rare circumstances, we may offer exceptions to this policy at our discretion. All exceptions must be approved by our customer experience team and are evaluated on a case-by-case basis.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Contact Information">
        <LegalParagraph>
          For any questions about returns or refunds, please contact:
        </LegalParagraph>
        <LegalList
          items={[
            'Email: returns@awaperfumes.com',
            'Phone: +1 (234) 567-8900 (Mon-Fri, 9am-6pm ET)',
            'Live chat: Monday to Friday, 9am-6pm ET',
          ]}
        />
      </LegalSection>

      <div className="rounded-2xl border border-lilac-200 bg-lilac-50 p-6">
        <p className="text-sm text-purple-900">
          <strong>ISO 10002 Compliance:</strong> Our complaint handling process aligns with ISO 10002
          (complaint handling guidelines). All returns and complaints are acknowledged within 24 hours
          and resolved within 10 business days unless circumstances require additional time.
        </p>
      </div>
    </LegalPage>
  );
}
