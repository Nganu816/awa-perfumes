'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, User, X, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { categories } from '@/lib/data';
import SearchSuggestions from '@/components/search/SearchSuggestions';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCount());
  const lines = useCartStore((state) => state.lines);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="bg-purple-900 py-2 text-center text-xs font-medium text-lilac-200">
        <span>Free shipping on orders over $100 | 30-day return policy | Secure checkout</span>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-18">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-purple-900 hover:bg-lilac-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="flex items-center gap-2" aria-label="AWA Perfumes Home">
            <span className="font-display text-xl font-bold tracking-tight text-purple-800 sm:text-2xl">
              AWA
            </span>
            <span className="font-display text-lg italic text-lilac-500 sm:text-xl">Perfumes</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            <Link href="/products" className="text-sm font-medium text-purple-950 hover:text-purple-700">
              All Fragrances
            </Link>
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="text-sm font-medium text-purple-950 hover:text-purple-700"
              >
                {cat.name.split(' ')[0]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-purple-900 hover:bg-lilac-100"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-purple-900 hover:bg-lilac-100"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-purple-900 hover:bg-lilac-100"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-700 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-t border-purple-100 bg-white py-3">
            <div className="container-page">
              <SearchSuggestions onSelect={() => setIsSearchOpen(false)} />
            </div>
          </div>
        )}
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-gradient-to-b from-purple-900 to-purple-950 p-6 shadow-2xl animate-slide-right">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-xl font-bold text-white">AWA Perfumes</span>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-lilac-200 hover:bg-purple-800"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-1" aria-label="Mobile navigation">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-purple-800"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-purple-800"
              >
                All Fragrances
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-base text-lilac-200 hover:bg-purple-800 hover:text-white"
                >
                  {cat.name}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t border-purple-800 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-lilac-300">
                Support & Info
              </p>
              <nav className="space-y-1">
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2 text-sm text-lilac-200 hover:bg-purple-800 hover:text-white"
                >
                  My Account
                </Link>
                <Link
                  href="/return-policy"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2 text-sm text-lilac-200 hover:bg-purple-800 hover:text-white"
                >
                  Return Policy
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2 text-sm text-lilac-200 hover:bg-purple-800 hover:text-white"
                >
                  Contact Us
                </Link>
                <Link
                  href="/admin/inventory"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2 text-sm text-lilac-200 hover:bg-purple-800 hover:text-white"
                >
                  Admin Panel
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
