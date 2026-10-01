'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { Product, formatPrice } from '@/lib/data';
import { useCartStore } from '@/store/cart-store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const defaultVariant = product.variants.find((v) => v.in_stock) || product.variants[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants.length === 1) {
      addItem(product.id, defaultVariant.id, 1);
    } else {
      window.location.href = `/products/${product.slug}`;
      return;
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group card card-hover overflow-hidden p-0"
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-lilac-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.bestseller && (
          <span className="absolute left-3 top-3 tag bg-purple-800 text-white">
            Best Seller
          </span>
        )}
        {!defaultVariant?.in_stock && (
          <span className="absolute left-3 top-3 tag bg-red-100 text-red-800">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-lilac-600">
            {product.brand}
          </p>
          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="text-xs font-medium text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>

        <h3 className="font-display text-base font-semibold text-purple-950 line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-semibold text-purple-800">
            {formatPrice(lowestPrice)}
          </span>
          <span className="text-xs text-gray-500">
            {product.variants.length > 1
              ? `${product.variants[0].size_ml}ml - ${product.variants[product.variants.length - 1].size_ml}ml`
              : `${product.variants[0].size_ml}ml`}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.variants.length > 1 || !defaultVariant?.in_stock}
          className={`btn mt-3 w-full text-center ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-purple-800 text-white hover:bg-purple-700'
          }`}
        >
          {added ? 'Added to Cart ✓' : <span className="flex items-center justify-center gap-2">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {product.variants.length > 1 ? 'Choose Size' : 'Add to Cart'}
          </span>}
        </button>
      </div>
    </Link>
  );
}
