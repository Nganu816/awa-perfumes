'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/data';

interface Suggestion {
  id: string;
  name: string;
  slug: string;
  brand: string;
  image: string;
  minPrice: number;
  relevance: number;
}

interface Props {
  onSelect?: () => void;
}

export default function SearchSuggestions({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`);
      const data = await res.json();
      setResults(
        data.results.map((r: Record<string, unknown>) => ({
          id: r.id as string,
          name: r.name as string,
          slug: r.slug as string,
          brand: r.brand as string,
          image: r.image as string,
          minPrice: Math.min(...((r.variants as { price: number }[])?.map((v) => v.price) ?? [0])),
          relevance: (r._relevance as number) ?? 0,
        }))
      );
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(query.trim())}`;
      onSelect?.();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder="Search fragrances, brands, scent notes..."
            className="input pl-10 pr-10"
            autoFocus
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-300 border-t-purple-600" />
            </div>
          )}
        </div>
        <button type="submit" className="btn-primary" aria-label="Submit search">
          Search
        </button>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1 rounded-xl border border-purple-100 bg-white shadow-lg">
          <div className="p-2">
            <div className="mb-1 flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-purple-600">
              <Sparkles className="h-3 w-3" />
              Semantic results
            </div>
            {results.map((r) => (
              <Link
                key={r.id}
                href={`/products/${r.slug}`}
                onClick={() => onSelect?.()}
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-purple-50"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-purple-950">{r.name}</p>
                  <p className="truncate text-xs text-gray-500">{r.brand}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs font-semibold text-purple-700">
                    {formatPrice(r.minPrice)}
                  </span>
                  <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-600">
                    {r.relevance}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`/products?q=${encodeURIComponent(query.trim())}`}
            onClick={() => onSelect?.()}
            className="flex items-center justify-center gap-1 border-t border-purple-50 px-4 py-2.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-b-xl"
          >
            View all results
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {isOpen && query.length >= 2 && !loading && results.length === 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1 rounded-xl border border-purple-100 bg-white p-4 shadow-lg">
          <p className="text-sm text-gray-500">No results found. Try different keywords.</p>
        </div>
      )}
    </div>
  );
}
