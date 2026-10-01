import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection, LegalList, LegalParagraph } from '@/components/legal/LegalPage';
import { Shield, Lock, Fingerprint, Server, Eye, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security',
  description: 'AWA Perfumes security measures and practices - encryption, PCI DSS compliance, and data protection.',
};

const securityPillars = [
  {
    icon: Lock,
    title: 'Encryption',
    description: 'AES-256 at rest, TLS 1.3 in transit',
  },
  {
    icon: Fingerprint,
    title: 'Authentication',
    description: 'MFA, strong password policies',
  },
  {
    icon: Server,
    title: 'Infrastructure',
    description: 'ISO 27001 aligned security controls',
  },
  {
    icon: Eye,
    title: 'Monitoring',
    description: '24/7 monitoring and alerting',
  },
  {
    icon: Shield,
    title: 'PCI DSS',
    description: 'Level 1 compliant payments',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description: 'Rapid response procedures',
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      lastUpdated="September 1, 2026"
      intro="At AWA Perfumes, we take the security of your data seriously. This page describes the security measures we implement to protect your personal information, payment details, and account. Our security framework aligns with ISO/IEC 27001 standards and industry best practices."
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {securityPillars.map((pillar) => (
          <div key={pillar.title} className="card">
            <pillar.icon className="h-8 w-8 text-purple-700" />
            <h3 className="mt-3 font-display text-lg font-semibold text-purple-950">{pillar.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{pillar.description}</p>
          </div>
        ))}
      </div>

      <LegalSection title="1. Data Encryption">
        <LegalParagraph>
          We protect data with strong encryption standards at every stage:
        </LegalParagraph>
        <LegalList
          items={[
            <strong key="1">In Transit (TLS 1.3):</strong>,
            'All data transmitted between your browser and our servers is encrypted using TLS 1.3, the latest industry-standard encryption protocol.',
            <strong key="2">At Rest (AES-256):</strong>,
            'All stored data, including database records and backups, is encrypted using AES-256 encryption.',
            <strong key="3">Payment Data:</strong>,
            'Card details are never stored on our servers. Payments are processed through PCI DSS compliant providers (Stripe, PayPal) using tokenization.',
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Payment Security (PCI DSS)">
        <LegalParagraph>
          Our payment processing is <strong>PCI DSS Level 1 compliant</strong>. Key measures include:
        </LegalParagraph>
        <LegalList
          items={[
            'Card data handled entirely by PCI-compliant processors (Stripe, PayPal).',
            'Tokenization prevents access to raw card numbers.',
            '3D Secure 2.0 for cardholder authentication.',
            'Fraud detection and prevention (AVS, CVV checks).',
            'Quarterly security scans and annual penetration testing.',
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Authentication & Access Control">
        <LegalList
          items={[
            'Passwords stored with strong hashing (bcrypt, 12+ rounds).',
            'Multi-factor authentication (MFA) support for accounts.',
            'Session management with expiry and secure HttpOnly cookies.',
            'Account lockout after repeated failed login attempts.',
            'Rate limiting on authentication endpoints to prevent brute force.',
            'Role-based access control (RBAC) for administrative systems.',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Application Security">
        <LegalParagraph>Our development follows secure coding practices aligned with OWASP Top 10:</LegalParagraph>
        <LegalList
          items={[
            'Input validation and sanitization on all user inputs.',
            'Parameterized queries to prevent SQL injection.',
            'Content Security Policy (CSP) headers to prevent XSS.',
            'Cross-Site Request Forgery (CSRF) protection.',
            'Security headers: HSTS, X-Content-Type-Options, X-Frame-Options.',
            'Regular dependency scanning and updates.',
            'Code reviews and security testing in CI/CD pipeline.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Infrastructure Security">
        <LegalList
          items={[
            'Web Application Firewall (WAF) protection.',
            'DDoS mitigation at the CDN edge.',
            'Network segmentation between services.',
            'Managed hosting with automatic patching.',
            'Encrypted database connections.',
            'Limited access to production systems (least privilege).',
            'Secure key management (no secrets in code).',
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Monitoring & Logging">
        <LegalParagraph>We continuously monitor our systems for security threats:</LegalParagraph>
        <LegalList
          items={[
            '24/7 uptime and health monitoring.',
            'Real-time error tracking (Sentry).',
            'Log aggregation and analysis.',
            'Intrusion detection and anomaly alerts.',
            'Automated alerts on suspicious activity.',
            'Audit logging of administrative actions.',
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Incident Response">
        <LegalParagraph>In the event of a security incident, our response plan includes:</LegalParagraph>
        <ol className="mb-4 ml-5 list-decimal space-y-2 text-gray-700">
          <li><strong>Detection</strong> - Automated monitoring alerts.</li>
          <li><strong>Containment</strong> - Isolate affected systems immediately.</li>
          <li><strong>Eradication</strong> - Remove the threat and patch vulnerabilities.</li>
          <li><strong>Recovery</strong> - Restore services from secure backups.</li>
          <li><strong>Notification</strong> - Inform relevant authorities and affected users (within 72 hours for GDPR/NPA).</li>
          <li><strong>Lessons Learned</strong> - Conduct a post-incident review and improve controls.</li>
        </ol>
      </LegalSection>

      <LegalSection title="8. Compliance & Certifications">
        <LegalList
          items={[
            'Alignment with ISO/IEC 27001 Information Security Management.',
            'GDPR compliance for EU/EEA users.',
            'NPA 2023 compliance for Pakistani users.',
            'PCI DSS Level 1 for payment processing.',
            'Regular independent security assessments.',
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Vulnerability Disclosure">
        <LegalParagraph>
          If you discover a security vulnerability in our platform, we encourage you to report it
          responsibly. Please email security@awaperfumes.com with details. We will acknowledge reports
          promptly, investigate, and work to resolve issues. We do not authorize testing that
          compromises other users&apos; data or disrupts service.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. Your Role in Security">
        <LegalParagraph>
          You also play a role in protecting your account:
        </LegalParagraph>
        <LegalList
          items={[
            'Use a strong, unique password.',
            'Enable two-factor authentication where possible.',
            'Do not share your login credentials.',
            'Keep your email account secure.',
            'Report any suspicious activity to security@awaperfumes.com.',
          ]}
        />
      </LegalSection>

      <LegalSection title="11. Contact">
        <LegalParagraph>
          For security-related inquiries, please contact <a href="mailto:security@awaperfumes.com" className="link">security@awaperfumes.com</a>.
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  );
}
