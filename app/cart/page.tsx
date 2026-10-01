'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { getProductById, getProductsByCategory, formatPrice, calculateSubtotal, calculateShipping, calculateTax, calculateTotal } from '@/lib/data';

export default function CartPage() {
  const { lines, updateQuantity, removeItem } = useCartStore();

  const items = lines
    .map((line) => {
      const product = getProductById(line.productId);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter(Boolean) as { line: (typeof lines)[0]; product: NonNullable<ReturnType<typeof getProductById>>; variant: NonNullable<ReturnType<typeof getProductById>>['variants'][number] }[];

  const subtotal = calculateSubtotal(
    items.map((i) => ({ variant: i.variant, quantity: i.line.quantity })) as never
  );
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lilac-100">
          <ShoppingBag className="h-10 w-10 text-lilac-600" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-purple-950">Your cart is empty</h1>
        <p className="mt-2 max-w-md text-gray-600">
          Discover our collection of luxury fragrances and find your signature scent.
        </p>
        <Link href="/products" className="btn-primary mt-8">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page animate-fade-in py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-purple-950">Shopping Cart</h1>
        <p className="mt-1 text-sm text-gray-600">{items.length} item{items.length !== 1 && 's'} in your cart</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ line, product, variant }) => (
            <div key={line.id} className="card p-4">
              <div className="flex gap-4">
                <Link href={`/products/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-lilac-50">
                  <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/products/${product.slug}`} className="font-display text-base font-semibold text-purple-950 hover:text-purple-700">
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {variant.size_ml}ml · {product.brand}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(line.id)}
                      className="text-gray-400 transition-colors hover:text-red-600"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        className="inline-flex h-9 w-9 items-center justify-center text-purple-900 hover:bg-lilac-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-purple-950">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        className="inline-flex h-9 w-9 items-center justify-center text-purple-900 hover:bg-lilac-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-semibold text-purple-900">
                      {formatPrice(variant.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <Link href="/products" className="btn-ghost text-sm">
              ← Continue Shopping
            </Link>
            <button onClick={() => useCartStore.getState().clearCart()} className="text-sm text-gray-500 hover:text-red-600">
              Clear Cart
            </button>
          </div>
        </div>

        <div className="card h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold text-purple-950">Order Summary</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-purple-950">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-purple-950">
                {shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="font-medium text-purple-950">{formatPrice(tax)}</span>
            </div>
            {shipping > 0 && (
              <p className="rounded-lg bg-lilac-50 p-3 text-xs text-purple-800">
                Add {formatPrice(100 - subtotal)} more to get free shipping!
              </p>
            )}
          </div>

          <div className="mt-4 border-t border-purple-100 pt-4">
            <div className="flex justify-between text-base">
              <span className="font-semibold text-purple-950">Total</span>
              <span className="font-bold text-purple-800">{formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Taxes calculated at checkout</p>
          </div>

          <Link href="/checkout" className="btn-primary mt-6 w-full btn-lg">
            Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <div className="mt-4 space-y-2 text-xs text-gray-500">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Secure SSL payment
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              30-day easy returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
