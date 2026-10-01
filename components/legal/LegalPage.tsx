import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  children: ReactNode;
}

export default function LegalPage({ title, lastUpdated, intro, children }: LegalPageProps) {
  return (
    <div className="container-page animate-fade-in py-12">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1" aria-label="Legal pages">
            <Link href="/return-policy" className={cn('block rounded-lg px-4 py-2 text-sm font-medium transition-colors', 'hover:bg-lilac-50')}>
              Returns & Refunds
            </Link>
            <Link href="/terms" className={cn('block rounded-lg px-4 py-2 text-sm font-medium transition-colors', 'hover:bg-lilac-50')}>
              Terms & Conditions
            </Link>
            <Link href="/privacy" className={cn('block rounded-lg px-4 py-2 text-sm font-medium transition-colors', 'hover:bg-lilac-50')}>
              Privacy Policy
            </Link>
            <Link href="/npa-2023" className={cn('block rounded-lg px-4 py-2 text-sm font-medium transition-colors', 'hover:bg-lilac-50')}>
              NPA 2023 Policy
            </Link>
            <Link href="/security" className={cn('block rounded-lg px-4 py-2 text-sm font-medium transition-colors', 'hover:bg-lilac-50')}>
              Security
            </Link>
          </nav>
        </aside>

        <article className="max-w-3xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-purple-950 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-gray-500">
              Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
            </p>
            {intro && <p className="mt-6 leading-relaxed text-gray-700">{intro}</p>}
          </div>

          {children}
        </article>
      </div>
    </div>
  );
}

export function LegalSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-10">
      <h2 className="mb-4 font-display text-xl font-bold text-purple-900">{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-gray-700">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-gray-700">{children}</p>;
}
