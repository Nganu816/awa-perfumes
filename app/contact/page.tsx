'use client';

import { Mail, Phone, MessageCircle, Clock, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 5-7 business days within the US and 7-14 business days internationally. Express shipping takes 2-3 business days.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day return window for unopened items. Please see our Return & Refund Policy for full details.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship worldwide! Shipping times and costs vary by destination. Free shipping is available on orders over $100.',
  },
  {
    q: 'Are your perfumes authentic?',
    a: 'Absolutely. All products are 100% genuine and sourced directly from manufacturers or authorized distributors.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Visa, Mastercard, Amex, PayPal, and Apple Pay. All payments are processed securely.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you will receive a tracking number via email. You can also track your order from your account.',
  },
];

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 py-16 text-white">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-bold">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-xl text-lilac-200">
            We&apos;re here to help. Reach out with any questions about your order, products, or
            anything else.
          </p>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-purple-950">Send us a message</h2>
            <form className="card space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label">Your Name</label>
                  <input id="name" className="input" placeholder="Jane Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="label">Your Email</label>
                  <input id="email" type="email" className="input" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="label">Subject</label>
                <select id="subject" className="input">
                  <option>Order Inquiry</option>
                  <option>Return & Refund</option>
                  <option>Product Question</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" rows={5} className="input" placeholder="How can we help you?" required />
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-purple-950">Get in touch</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card">
                <Mail className="h-6 w-6 text-purple-700" />
                <p className="mt-2 font-semibold text-purple-950">Email Us</p>
                <p className="text-sm text-gray-600">support@awaperfumes.com</p>
                <p className="text-sm text-gray-600">Response within 24h</p>
              </div>
              <div className="card">
                <Phone className="h-6 w-6 text-purple-700" />
                <p className="mt-2 font-semibold text-purple-950">Call Us</p>
                <p className="text-sm text-gray-600">+1 (234) 567-8900</p>
                <p className="text-sm text-gray-600">Mon-Fri, 9am-6pm ET</p>
              </div>
              <div className="card">
                <MessageCircle className="h-6 w-6 text-purple-700" />
                <p className="mt-2 font-semibold text-purple-950">Live Chat</p>
                <p className="text-sm text-gray-600">Available Mon-Fri</p>
                <p className="text-sm text-gray-600">9am-6pm ET</p>
              </div>
              <div className="card">
                <Clock className="h-6 w-6 text-purple-700" />
                <p className="mt-2 font-semibold text-purple-950">Response Time</p>
                <p className="text-sm text-gray-600">Emails: within 24 hours</p>
                <p className="text-sm text-gray-600">Chat: within 5 minutes</p>
              </div>
            </div>

            <div className="rounded-2xl bg-lilac-100 p-6">
              <h3 className="font-display font-semibold text-purple-950">Returns & Refunds</h3>
              <p className="mt-1 text-sm text-gray-600">
                For return and refund inquiries, please email{' '}
                <a href="mailto:returns@awaperfumes.com" className="link">returns@awaperfumes.com</a>{' '}
                or review our <Link href="/return-policy" className="link">return policy</Link>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-purple-950">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <details key={faq.q} className="card group">
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-purple-950">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180 text-purple-700" />
                </summary>
                <p className="mt-3 text-sm text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
