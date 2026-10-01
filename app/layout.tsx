import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'AWA Perfumes - Luxury Fragrance Experience',
    template: '%s | AWA Perfumes',
  },
  description:
    'Discover luxury perfumes at AWA Perfumes. Premium fragrances for men, women, and unisex, featuring exquisite scent collections, gift sets, and more.',
  keywords: ['perfume', 'fragrance', 'luxury', 'cologne', 'eau de parfum', 'gift sets'],
  authors: [{ name: 'AWA Perfumes' }],
  openGraph: {
    title: 'AWA Perfumes - Luxury Fragrance Experience',
    description: 'Discover premium fragrances for every occasion at AWA Perfumes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-body bg-white text-purple-950 antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
