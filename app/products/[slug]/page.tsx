'use client';

import { use, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingBag, Heart, Share2, Truck, ShieldCheck, RotateCcw, Star, Minus, Plus, Check } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, formatPrice, getProductsByCategory } from '@/lib/data';
import { useCartStore } from '@/store/cart-store';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const productDetail = useMemo(() => product, [product]);

  if (!productDetail) {
    notFound();
  }

  const selectedVariant =
    productDetail.variants.find((v) => v.id === selectedVariantId) ||
    productDetail.variants.find((v) => v.in_stock) ||
    productDetail.variants[0];

  const related = getRelatedProducts(productDetail);

  if (!selectedVariant) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(productDetail.id, selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const reviews = [
    {
      id: 'rev-1',
      name: 'Verified Customer',
      rating: 5,
      date: '2026-08-15',
      title: 'Absolutely stunning',
      text: 'This fragrance exceeded all my expectations. The longevity is incredible and the scent evolves beautifully throughout the day. The packaging is also gorgeous.',
      verified: true,
    },
    {
      id: 'rev-2',
      name: 'Verified Customer',
      rating: 4,
      date: '2026-07-28',
      title: 'Elegant and sophisticated',
      text: 'A lovely, refined scent that gets compliments wherever I go. Subtle enough for daytime but has great projection. Only wish the bottle were a bit larger.',
      verified: true,
    },
  ];

  return (
    <div className="container-page animate-fade-in py-8">
      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-purple-700">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-purple-700">Products</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-purple-900">{productDetail.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-lilac-100">
            <Image
              src={productDetail.gallery[activeImage] || productDetail.image}
              alt={productDetail.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {productDetail.bestseller && (
              <span className="absolute left-4 top-4 tag bg-purple-800 text-white">Best Seller</span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {productDetail.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                  activeImage === i ? 'border-purple-700' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt={`${productDetail.name} image ${i + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-lilac-600">
            {productDetail.brand}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-purple-950 sm:text-4xl">
            {productDetail.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(productDetail.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{productDetail.rating}</span>
            <span className="text-sm text-gray-500">({productDetail.review_count} reviews)</span>
          </div>

          <p className="mt-4 text-3xl font-bold text-purple-800">
            {formatPrice(selectedVariant.price)}
          </p>
          <p className="mt-1 text-sm text-gray-500">Tax included, free shipping over $100</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-purple-950">Size</p>
            <div className="flex gap-2">
              {productDetail.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  disabled={!variant.in_stock}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                    selectedVariant.id === variant.id
                      ? 'border-purple-700 bg-purple-50 text-purple-900'
                      : 'border-gray-200 text-gray-600 hover:border-purple-300'
                  } ${!variant.in_stock ? 'cursor-not-allowed opacity-40' : ''}`}
                  aria-label={`${variant.size_ml}ml`}
                >
                  {variant.size_ml}ml
                  {!variant.in_stock && <span className="block text-xs">Out of stock</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-gray-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="inline-flex h-11 w-11 items-center justify-center text-purple-900 hover:bg-lilac-50"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-lg font-semibold text-purple-950">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="inline-flex h-11 w-11 items-center justify-center text-purple-900 hover:bg-lilac-50"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant.in_stock}
              className={`btn flex-1 btn-lg ${added ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-purple-800 text-white hover:bg-purple-700'}`}
            >
              <span className="flex items-center justify-center gap-2">
                {added ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                {added ? 'Added to Cart!' : selectedVariant.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </span>
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`btn btn-lg w-full sm:w-auto ${wishlisted ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'border-2 border-purple-300 text-purple-800 hover:bg-lilac-50'}`}
              aria-label="Add to wishlist"
            >
              <Heart className={`h-5 w-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="btn btn-lg w-full border-2 border-purple-300 text-purple-800 hover:bg-lilac-50 sm:w-auto" aria-label="Share product">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-2 rounded-xl bg-lilac-50 p-3">
              <Truck className="h-5 w-5 shrink-0 text-purple-700" />
              <div>
                <p className="text-xs font-semibold text-purple-900">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders $100+</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-lilac-50 p-3">
              <RotateCcw className="h-5 w-5 shrink-0 text-purple-700" />
              <div>
                <p className="text-xs font-semibold text-purple-900">30-Day Returns</p>
                <p className="text-xs text-gray-500">Hassle-free policy</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-lilac-50 p-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-purple-700" />
              <div>
                <p className="text-xs font-semibold text-purple-900">Authentic</p>
                <p className="text-xs text-gray-500">Guaranteed genuine</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex border-b border-purple-100">
          <button
            onClick={() => setShowReview(false)}
            className={`border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${
              !showReview ? 'border-purple-700 text-purple-900' : 'border-transparent text-gray-500 hover:text-purple-700'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setShowReview(true)}
            className={`border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${
              showReview ? 'border-purple-700 text-purple-900' : 'border-transparent text-gray-500 hover:text-purple-700'
            }`}
          >
            Reviews ({productDetail.review_count})
          </button>
        </div>

        {!showReview ? (
          <div className="py-8">
            <h2 className="font-display text-2xl font-bold text-purple-950">About this fragrance</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-gray-700">{productDetail.description}</p>

            {productDetail.scent_top.length > 0 && (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="card">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-lilac-600">Top Notes</h3>
                  <ul className="mt-2 space-y-1 text-sm text-purple-950/80">
                    {productDetail.scent_top.map((note) => (
                      <li key={note}>• {note}</li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-lilac-600">Heart Notes</h3>
                  <ul className="mt-2 space-y-1 text-sm text-purple-950/80">
                    {productDetail.scent_heart.map((note) => (
                      <li key={note}>• {note}</li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-lilac-600">Base Notes</h3>
                  <ul className="mt-2 space-y-1 text-sm text-purple-950/80">
                    {productDetail.scent_base.map((note) => (
                      <li key={note}>• {note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-50">
                <span className="font-display text-3xl font-bold text-purple-800">{productDetail.rating}</span>
              </div>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(productDetail.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-600">Based on {productDetail.review_count} reviews</p>
              </div>
            </div>

            <button onClick={() => {}} className="btn-primary mb-8">
              Write a Review
            </button>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-lilac-400 font-bold text-white">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-purple-950">{review.name}</p>
                        <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="tag bg-green-100 text-green-800">Verified Purchase</span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                  <h3 className="mt-2 font-semibold text-purple-950">{review.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="section-title">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
