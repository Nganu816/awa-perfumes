import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Shield, Lock, CreditCard, Truck, RotateCcw } from 'lucide-react';

const shopLinks = [
  { href: '/products', label: 'All Fragrances' },
  { href: '/products?category=women', label: "Women's Perfumes" },
  { href: '/products?category=men', label: "Men's Perfumes" },
  { href: '/products?category=unisex', label: 'Unisex Perfumes' },
  { href: '/products?category=gift-sets', label: 'Gift Sets' },
  { href: '/products?category=accessories', label: 'Accessories' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/account', label: 'My Account' },
  { href: '/account/orders', label: 'Order Status' },
  { href: '/products?q=best', label: 'Best Sellers' },
];

const supportLinks = [
  { href: '/return-policy', label: 'Return & Refund Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/npa-2023', label: 'NPA 2023 Policy' },
  { href: '/security', label: 'Security' },
  { href: '/faq', label: 'FAQ' },
  { href: '/admin/inventory', label: 'Admin Panel' },
];

const trustBadges = [
  {
    icon: Truck,
    title: 'Fast Shipping',
    subtitle: 'Free over $100',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    subtitle: 'Easy returns',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    subtitle: '256-bit SSL',
  },
  {
    icon: Lock,
    title: 'PCI Compliant',
    subtitle: 'Safe checkout',
  },
];

export default function Footer() {
  return (
    <footer className="bg-purple-950 text-lilac-200">
      <div className="border-b border-purple-800/50">
        <div className="container-page grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <badge.icon className="h-8 w-8 shrink-0 text-lilac-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">{badge.title}</p>
                <p className="text-xs opacity-70">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-display text-xl font-bold text-white">AWA</span>
            <span className="font-display text-lg italic text-lilac-400">Perfumes</span>
          </div>
          <p className="mb-6 text-sm leading-relaxed opacity-80">
            Luxury fragrance experience. Hand-selected scents for every personality, crafted with
            the finest ingredients from around the world.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-800 text-white transition-colors hover:bg-purple-700"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-800 text-white transition-colors hover:bg-purple-700"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-800 text-white transition-colors hover:bg-purple-700"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-800 text-white transition-colors hover:bg-purple-700"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lilac-400" aria-hidden="true" />
              <a href="mailto:support@awaperfumes.com" className="hover:text-white">
                support@awaperfumes.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lilac-400" aria-hidden="true" />
              <a href="tel:+12345678900" className="hover:text-white">
                +1 (234) 567-8900
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lilac-400" aria-hidden="true" />
              <span className="opacity-80">
                AWA Perfumes HQ
                <br />
                Federal Housing Estate Bajabure
                <br />
                Yola_Nigeria
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-purple-800/50 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs opacity-70">
            &copy; {new Date().getFullYear()} AWA Perfumes. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <CreditCard className="h-5 w-5 opacity-50" aria-label="Stripe accepted" />
            <span className="text-xs font-semibold tracking-wide text-white opacity-80">
              Visa · Mastercard · Amex · PayPal
            </span>
          </div>
          <div className="flex gap-4 text-xs opacity-70">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/npa-2023" className="hover:text-white">NPA 2023</Link>
            <Link href="/security" className="hover:text-white">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
