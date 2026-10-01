'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Shield, CheckCircle2, ChevronLeft, Truck, RotateCcw, CreditCard, Wallet } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { getProductById, formatPrice, calculateSubtotal, calculateShipping, calculateTax } from '@/lib/data';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const items = lines
    .map((line) => {
      const product = getProductById(line.productId);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter(Boolean) as { line: (typeof lines)[0]; product: NonNullable<ReturnType<typeof getProductById>>; variant: NonNullable<ReturnType<typeof getProductById>>['variants'][number] }[];

  const subtotal = calculateSubtotal(items.map((i) => ({ variant: i.variant, quantity: i.line.quantity })) as never);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setOrderNumber(`AWA-2026-${Math.floor(Math.random() * 9000 + 1000)}`);
      setCompleted(true);
      clearCart();
      setProcessing(false);
    }, 2000);
  };

  if (completed) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-24 text-center">
        <CheckCircle2 className="h-20 w-20 text-green-500" />
        <h1 className="mt-6 font-display text-3xl font-bold text-purple-950">Order Confirmed!</h1>
        <p className="mt-3 max-w-md text-gray-600">
          Thank you for your purchase. A confirmation email has been sent with your order details.
        </p>
        <div className="mt-6 rounded-2xl bg-lilac-50 p-6">
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="mt-1 font-mono text-2xl font-bold text-purple-900">{orderNumber}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/account/orders" className="btn-primary">View Order Status</Link>
          <Link href="/products" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-purple-950">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Add some fragrances before checking out.</p>
        <Link href="/products" className="btn-primary mt-6">Shop Fragrances</Link>
      </div>
    );
  }

  return (
    <div className="container-page animate-fade-in py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-purple-950">Secure Checkout</h1>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className={`font-medium ${step === 'shipping' ? 'text-purple-800' : 'text-gray-500'}`}>1. Shipping</span>
          <span className="text-gray-300">→</span>
          <span className={`font-medium ${step === 'payment' ? 'text-purple-800' : 'text-gray-500'}`}>2. Payment</span>
          <span className="text-gray-300">→</span>
          <span className={`font-medium ${step === 'review' ? 'text-purple-800' : 'text-gray-500'}`}>3. Review</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {step === 'shipping' && <ShippingForm onNext={() => setStep('payment')} />}
          {step === 'payment' && (
            <PaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onBack={() => setStep('shipping')}
              onNext={() => setStep('review')}
            />
          )}
          {step === 'review' && (
            <OrderReview
              items={items.map((i) => ({ name: i.product.name, image: i.product.image, size: i.variant.size_ml, price: i.variant.price, quantity: i.line.quantity }))}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onBack={() => setStep('payment')}
              onPlaceOrder={handlePlaceOrder}
              processing={processing}
              paymentMethod={paymentMethod}
            />
          )}
        </div>

        <div className="card h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold text-purple-950">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map(({ line, product, variant }) => (
              <div key={line.id} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-lilac-50">
                  <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-800 text-[10px] font-bold text-white">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-950">{product.name}</p>
                  <p className="text-xs text-gray-500">{variant.size_ml}ml</p>
                </div>
                <p className="text-sm font-medium text-purple-900">{formatPrice(variant.price * line.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-purple-100 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-purple-100 pt-3 text-base">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-purple-800">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-gray-500">
            <p className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-green-600" />
              PCI DSS compliant secure payment
            </p>
            <p className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-green-600" />
              Encrypted connection (SSL)
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-green-600" />
              Free shipping over $100
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw className="h-3.5 w-3.5 text-green-600" />
              30-day return guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingForm({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    shippingMethod: 'standard',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="card space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5 text-purple-700" />
        <h2 className="font-display text-xl font-semibold text-purple-950">Shipping Address</h2>
      </div>

      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input" required placeholder="you@example.com" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label">First Name</label>
          <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label htmlFor="lastName" className="label">Last Name</label>
          <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} className="input" required />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="label">Address</label>
        <input id="address" name="address" value={form.address} onChange={handleChange} className="input" required placeholder="123 Fragrance Avenue" />
      </div>

      <div>
        <label htmlFor="apt" className="label">Apartment, Suite, etc. (optional)</label>
        <input id="apt" name="apt" value={form.apt} onChange={handleChange} className="input" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="city" className="label">City</label>
          <input id="city" name="city" value={form.city} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label htmlFor="state" className="label">State / Province</label>
          <input id="state" name="state" value={form.state} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label htmlFor="zip" className="label">ZIP / Postal</label>
          <input id="zip" name="zip" value={form.zip} onChange={handleChange} className="input" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="label">Country</label>
          <select id="country" name="country" value={form.country} onChange={handleChange} className="input" required>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Pakistan</option>
            <option>United Arab Emirates</option>
            <option>Saudi Arabia</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone" className="label">Phone</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="input" required />
        </div>
      </div>

      <div>
        <p className="label">Shipping Method</p>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-purple-200 p-4">
            <div className="flex items-center gap-3">
              <input type="radio" name="shippingMethod" value="standard" checked={form.shippingMethod === 'standard'} onChange={handleChange} className="h-4 w-4 text-purple-700" />
              <div>
                <p className="font-semibold text-purple-950">Standard (5-7 days)</p>
                <p className="text-xs text-gray-500">Ships from our warehouse</p>
              </div>
            </div>
            <span className="font-medium text-purple-900">$9.99</span>
          </label>
          <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-gray-200 p-4 hover:border-purple-200">
            <div className="flex items-center gap-3">
              <input type="radio" name="shippingMethod" value="express" checked={form.shippingMethod === 'express'} onChange={handleChange} className="h-4 w-4 text-purple-700" />
              <div>
                <p className="font-semibold text-purple-950">Express (2-3 days)</p>
                <p className="text-xs text-gray-500">Priority processing</p>
              </div>
            </div>
            <span className="font-medium text-purple-900">$19.99</span>
          </label>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full btn-lg">Continue to Payment</button>
    </form>
  );
}

function PaymentForm({ paymentMethod, setPaymentMethod, onBack, onNext }: {
  paymentMethod: 'card' | 'paypal' | 'applepay';
  setPaymentMethod: (m: 'card' | 'paypal' | 'applepay') => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  return (
    <form className="card space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-purple-700" />
        <h2 className="font-display text-xl font-semibold text-purple-950">Payment Method</h2>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
            paymentMethod === 'card' ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
          }`}
        >
          <CreditCard className="h-5 w-5 text-purple-700" />
          <div className="flex-1">
            <p className="font-semibold text-purple-950">Credit / Debit Card</p>
            <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
          </div>
          <input type="radio" checked={paymentMethod === 'card'} readOnly className="h-4 w-4 text-purple-700" />
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('paypal')}
          className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
            paymentMethod === 'paypal' ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
          }`}
        >
          <Wallet className="h-5 w-5 text-purple-700" />
          <div className="flex-1">
            <p className="font-semibold text-purple-950">PayPal</p>
            <p className="text-xs text-gray-500">Pay with your PayPal account</p>
          </div>
          <input type="radio" checked={paymentMethod === 'paypal'} readOnly className="h-4 w-4 text-purple-700" />
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('applepay')}
          className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
            paymentMethod === 'applepay' ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center">
            <span className="text-sm font-bold text-purple-700">🍎</span>
          </span>
          <div className="flex-1">
            <p className="font-semibold text-purple-950">Apple Pay</p>
            <p className="text-xs text-gray-500">Fastest way to pay</p>
          </div>
          <input type="radio" checked={paymentMethod === 'applepay'} readOnly className="h-4 w-4 text-purple-700" />
        </button>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
          <div>
            <label htmlFor="cardName" className="label">Name on Card</label>
            <input id="cardName" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className="input" required placeholder="John Smith" autoComplete="cc-name" />
          </div>
          <div>
            <label htmlFor="cardNumber" className="label">Card Number</label>
            <input id="cardNumber" inputMode="numeric" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} className="input font-mono" required placeholder="4242 4242 4242 4242" maxLength={19} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="label">Expiry</label>
              <input id="expiry" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} className="input" required placeholder="MM/YY" maxLength={5} />
            </div>
            <div>
              <label htmlFor="cvc" className="label">CVC</label>
              <input id="cvc" inputMode="numeric" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} className="input" required placeholder="123" maxLength={4} autoComplete="cc-csc" />
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="h-3.5 w-3.5 text-green-600" />
            Your card details are securely encrypted. We never store card numbers.
          </p>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="rounded-2xl border border-gray-200 bg-lilac-50 p-6 text-center">
          <Wallet className="mx-auto h-10 w-10 text-purple-700" />
          <p className="mt-2 text-sm text-gray-600">You&apos;ll be redirected to PayPal to complete your purchase securely.</p>
        </div>
      )}

      {paymentMethod === 'applepay' && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
          <span className="text-2xl font-bold text-purple-950">🍎</span>
          <p className="mt-2 text-sm text-gray-600">Use your Apple Pay to complete the transaction quickly and securely.</p>
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </button>
        <button type="submit" className="btn-primary flex-1">Review Order</button>
      </div>
    </form>
  );
}

function OrderReview({ items, subtotal, shipping, tax, total, onBack, onPlaceOrder, processing, paymentMethod }: {
  items: { name: string; image: string; size: number; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onBack: () => void;
  onPlaceOrder: () => void;
  processing: boolean;
  paymentMethod: string;
}) {
  return (
    <div className="card space-y-6">
      <h2 className="font-display text-xl font-semibold text-purple-950">Review Your Order</h2>

      <div className="space-y-3 rounded-xl bg-lilac-50 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({items.length})</span>
          <span className="font-medium text-purple-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-purple-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-purple-900">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between border-t border-purple-200 pt-3">
          <span className="font-semibold text-purple-950">Total</span>
          <span className="font-bold text-purple-800">{formatPrice(total)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-purple-800">
          <Lock className="h-3.5 w-3.5" />
          Paying with {paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-lilac-50">
              <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-950">{item.name}</p>
              <p className="text-xs text-gray-500">{item.size}ml × {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-purple-200 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-purple-900">
          <Shield className="h-4 w-4" /> Your purchase is protected
        </p>
        <p className="mt-2 text-xs text-gray-600">
          By placing this order, you agree to our Terms & Conditions and acknowledge our Return &
          Refund Policy. Your data is protected under our Privacy Policy and the NPA 2023.
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </button>
        <button onClick={onPlaceOrder} disabled={processing} className="btn-primary flex-1 btn-lg">
          {processing ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" /> Place Order · {formatPrice(total)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
