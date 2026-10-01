import { categories, products } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight, Sparkles, Star, Truck, ShieldCheck, RotateCcw, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured && p.active).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller && p.active).slice(0, 4);
  const featuredCategories = categories.slice(0, 3);

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      location: 'Karachi, Pakistan',
      rating: 5,
      text: 'AWA Signature has become my everyday go-to. The quality rivals high-end houses at a fraction of the price.',
      initials: 'SA',
    },
    {
      name: 'James Chen',
      location: 'London, UK',
      rating: 5,
      text: 'Noir d\'Homme is the most sophisticated mens fragrance I own. Outstanding longevity and compliments daily.',
      initials: 'JC',
    },
    {
      name: 'Amira Hassan',
      location: 'Dubai, UAE',
      rating: 5,
      text: 'The Solstice Collection was the perfect gift. Beautiful packaging and each scent is unique and memorable.',
      initials: 'AH',
    },
  ];

  return (
    <div className="animate-fade-in">
      <HeroSection />

      <section className="container-page py-16">
        <div className="mb-8 text-center">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Explore our curated fragrance collections</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl"
              aria-label={`Browse ${cat.name}`}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-2xl font-bold text-white">{cat.name}</p>
                  <p className="mt-1 text-sm text-lilac-200">{cat.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
                    Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-lilac-50 to-white py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="section-title">Featured Fragrances</h2>
              <p className="section-subtitle">Our signature scents, loved by thousands</p>
            </div>
            <Link href="/products" className="btn-secondary btn-sm hidden sm:inline-flex">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/products" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-purple-900 py-16 text-white">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-lilac-300">
                <Sparkles className="h-4 w-4" /> The AWA Difference
              </span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Luxury Fragrance, Responsibly Sourced
              </h2>
              <p className="mt-4 text-lg text-lilac-200">
                Every AWA fragrance is crafted with premium ingredients, ethical sourcing, and a
                commitment to sustainability. Experience perfumery at its finest.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Truck className="mt-1 h-6 w-6 shrink-0 text-lilac-400" />
                  <div>
                    <p className="font-semibold">Global Delivery</p>
                    <p className="text-sm text-lilac-200">Free shipping over $100</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-lilac-400" />
                  <div>
                    <p className="font-semibold">Authenticity Guaranteed</p>
                    <p className="text-sm text-lilac-200">100% genuine products</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="mt-1 h-6 w-6 shrink-0 text-lilac-400" />
                  <div>
                    <p className="font-semibold">30-Day Returns</p>
                    <p className="text-sm text-lilac-200">Hassle-free policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-1 h-6 w-6 shrink-0 text-lilac-400" />
                  <div>
                    <p className="font-semibold">Secure Payment</p>
                    <p className="text-sm text-lilac-200">PCI DSS compliant</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop"
                  alt="Luxury perfume bottles"
                  fill
                  sizes="(min-width: 1024px) 50vw, 0vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl">
                <ShieldCheck className="h-8 w-8 text-purple-800" />
                <p className="mt-1 text-sm font-semibold text-purple-950">ISO 27001 Aligned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div>
          <h2 className="section-title">Customer Reviews</h2>
          <p className="section-subtitle">What our customers are saying</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card h-full flex flex-col">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 fill-amber-400 text-amber-400 ${i < t.rating ? '' : 'hidden'}`} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-purple-950/80">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3 border-t border-purple-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-lilac-400 text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-950">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-lilac-100 via-lilac-50 to-white py-20">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl font-bold text-purple-950 sm:text-4xl">
            Never Miss a New Arrival
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-purple-900/70">
            Subscribe to our newsletter and get 10% off your first order, plus early access to
            limited editions and exclusive events.
          </p>
          <form className="mx-auto mt-6 flex max-w-md gap-2">
            <input type="email" placeholder="Enter your email" className="input" aria-label="Email address" />
            <button type="submit" className="btn-primary shrink-0">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-gradient-to-br from-purple-950 via-purple-800 to-purple-600 lg:min-h-[600px]">
      <div className="container-page relative z-10 grid items-center gap-8 py-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-lilac-200 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            New Collection 2026
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Discover Your
            <span className="block bg-gradient-to-r from-lilac-300 to-purple-200 bg-clip-text text-transparent">
              Signature Scent
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-lilac-100/90 lg:mx-0">
            Curated luxury fragrances from around the world. Hand-selected, responsibly sourced,
            and crafted for every personality.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="/products" className="btn bg-lilac-400 text-purple-950 hover:bg-lilac-300 btn-lg">
              Shop Collections
            </a>
            <a href="/products?category=women" className="btn bg-transparent border-2 border-lilac-300 text-white hover:bg-white/10 btn-lg">
              Discover Women&apos;s
            </a>
          </div>
          <div className="mt-12 flex justify-center gap-8 lg:justify-start">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-white">10k+</p>
              <p className="text-sm text-lilac-200">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-white">250+</p>
              <p className="text-sm text-lilac-200">Fragrances</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-white">4.9</p>
              <p className="text-sm text-lilac-200">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" aria-hidden="true" />
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop"
              alt="AWA Signature Perfume"
              fill
              sizes="(min-width: 1024px) 30rem, 0vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-8 top-10 rounded-2xl bg-white p-4 shadow-xl">
            <p className="text-xs font-medium text-gray-500">AWA Signature</p>
            <p className="font-display text-lg font-bold text-purple-900">$119.99</p>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div className="absolute -right-4 bottom-16 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 p-4 text-white shadow-xl">
            <p className="text-xs font-medium text-lilac-200">Free Shipping</p>
            <p className="font-semibold">On orders $100+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
