'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User, Package, MapPin, Heart, Settings as SettingsIcon, LogOut, CreditCard, Lock, Mail,
  ChevronRight, ShoppingBag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, products } from '@/lib/data';

type Tab = 'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings' | 'privacy';

const navItems = [
  { id: 'overview' as Tab, label: 'Overview', icon: User },
  { id: 'orders' as Tab, label: 'Orders', icon: Package },
  { id: 'addresses' as Tab, label: 'Addresses', icon: MapPin },
  { id: 'wishlist' as Tab, label: 'Wishlist', icon: Heart },
  { id: 'settings' as Tab, label: 'Settings', icon: SettingsIcon },
  { id: 'privacy' as Tab, label: 'Privacy & Data', icon: Lock },
];

const mockOrders = [
  {
    id: 'AWA-2026-8341',
    date: '2026-08-28',
    status: 'Delivered',
    total: 189.98,
    items: 2,
    itemsList: [
      { name: 'AWA Signature Eau de Parfum', size: '50ml', price: 119.99 },
      { name: 'Luxury Atomizer Travel Set', size: '10ml', price: 49.99 },
    ],
  },
  {
    id: 'AWA-2026-7120',
    date: '2026-07-15',
    status: 'Delivered',
    total: 94.99,
    items: 1,
    itemsList: [{ name: 'Lilac Bloom Eau de Toilette', size: '50ml', price: 94.99 }],
  },
  {
    id: 'AWA-2026-6893',
    date: '2026-06-02',
    status: 'Refunded',
    total: 109.99,
    items: 1,
    itemsList: [{ name: "Noir d'Homme", size: '50ml', price: 109.99 }],
  },
];

const mockAddresses = [
  {
    id: 'addr-1',
    type: 'Home',
    name: 'Jane Doe',
    address: '456 Lavender Lane',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    country: 'United States',
    isDefault: true,
  },
];

const mockWishlist = products.filter((p) => p.id === 'prod-003' || p.id === 'prod-005');

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="container-page animate-fade-in py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-lilac-400 text-xl font-bold text-white">
            JD
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-purple-950">Jane Doe</h1>
            <p className="text-sm text-gray-500">jane.doe@example.com · Customer</p>
          </div>
        </div>
        <button className="btn-secondary btn-sm">
          <LogOut className="mr-1 h-4 w-4" /> Sign Out
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:block">
          <nav className="space-y-1 lg:sticky lg:top-24" aria-label="Account navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === item.id
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-950 hover:bg-lilac-100'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <Link href="/return-policy" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-purple-950 hover:bg-lilac-100">
                <CreditCard className="h-4 w-4 shrink-0" /> Returns
              </Link>
            </div>
          </nav>
        </aside>

        <div>
          {activeTab === 'overview' && <Overview onNavigate={setActiveTab} />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'addresses' && <Addresses />}
          {activeTab === 'wishlist' && <Wishlist />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'privacy' && <Privacy />}
        </div>
      </div>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const stats = [
    { id: 'orders', label: 'Total Orders', value: '12', icon: Package },
    { id: 'wishlist', label: 'Wishlist Items', value: '4', icon: Heart },
    { id: 'addresses', label: 'Saved Addresses', value: '2', icon: MapPin },
    { id: 'rewards', label: 'Loyalty Points', value: '1,240', icon: ShoppingBag },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.id}
            onClick={() => onNavigate(stat.id as Tab)}
            className="card card-hover text-left"
          >
            <stat.icon className="h-6 w-6 text-purple-700" />
            <p className="mt-2 font-display text-2xl font-bold text-purple-950">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-purple-950">Recent Orders</h2>
          <button onClick={() => onNavigate('orders')} className="text-sm text-purple-700 hover:text-purple-900">
            View all →
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {mockOrders.slice(0, 2).map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-purple-100 p-4">
              <div>
                <p className="font-mono text-sm font-semibold text-purple-900">{order.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.date).toLocaleDateString()} · {order.items} item{order.items !== 1 && 's'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="tag tag-success">{order.status}</span>
                <span className="font-semibold text-purple-900">{formatPrice(order.total)}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl p-6 text-white">
        <h3 className="font-display text-xl font-bold">Join our loyalty program</h3>
        <p className="mt-1 text-sm text-lilac-200">
          Earn points on every purchase and unlock exclusive rewards.
        </p>
        <button className="btn mt-4 bg-lilac-400 text-purple-950 hover:bg-lilac-300">
          Learn More
        </button>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-bold text-purple-950">Order History</h2>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-3">
              <div>
                <p className="font-mono text-sm font-semibold text-purple-900">{order.id}</p>
                <p className="text-xs text-gray-500">Placed {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'tag',
                    order.status === 'Delivered' && 'tag-success',
                    order.status === 'Refunded' && 'tag-warning'
                  )}
                >
                  {order.status}
                </span>
                <span className="font-semibold text-purple-900">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {order.itemsList.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-purple-950">
                    {item.name} <span className="text-gray-500">({item.size})</span>
                  </span>
                  <span className="text-gray-600">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-purple-100 pt-3">
              <button className="btn-secondary btn-sm">Track Order</button>
              <button className="btn-ghost btn-sm">Download Invoice</button>
              {order.status === 'Delivered' && (
                <button className="btn-ghost btn-sm text-red-600 hover:bg-red-50">Request Return</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Addresses() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-purple-950">Saved Addresses</h2>
        <button className="btn-primary btn-sm">Add Address</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {mockAddresses.map((addr) => (
          <div key={addr.id} className="card relative">
            {addr.isDefault && (
              <span className="absolute right-4 top-4 tag tag-info">Default</span>
            )}
            <p className="text-xs font-semibold uppercase tracking-wide text-lilac-600">{addr.type}</p>
            <p className="mt-2 font-semibold text-purple-950">{addr.name}</p>
            <p className="text-sm text-gray-600">
              {addr.address}
              <br />
              {addr.city}, {addr.state} {addr.zip}
              <br />
              {addr.country}
            </p>
            <div className="mt-4 flex gap-2">
              <button className="btn-secondary btn-sm">Edit</button>
              <button className="btn-danger btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Wishlist() {
  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-bold text-purple-950">My Wishlist</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockWishlist.map((product) => (
          <div key={product.id} className="card p-0 overflow-hidden">
            <Link href={`/products/${product.slug}`} className="relative block aspect-square bg-lilac-50">
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </Link>
            <div className="p-4">
              <p className="text-xs text-lilac-600">{product.brand}</p>
              <Link href={`/products/${product.slug}`} className="mt-1 block font-display font-semibold text-purple-950 hover:text-purple-700">
                {product.name}
              </Link>
              <p className="mt-2 font-semibold text-purple-800">
                {formatPrice(product.variants[0].price)}
              </p>
              <button className="btn-primary btn-sm mt-3 w-full">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [form, setForm] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    marketingEmail: true,
    smsNotifications: false,
  });

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="font-display text-xl font-bold text-purple-950">Account Settings</h2>

      <form className="card space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="label">Full Name</label>
          <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="email" className="label flex items-center gap-1">
            <Mail className="h-4 w-4" /> Email
          </label>
          <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="phone" className="label">Phone</label>
          <input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
        </div>
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>

      <div className="card space-y-4">
        <h3 className="font-display font-semibold text-purple-950">Notification Preferences</h3>
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-purple-950">Marketing emails</p>
            <p className="text-xs text-gray-500">Product updates, offers, and news</p>
          </div>
          <input
            type="checkbox"
            checked={form.marketingEmail}
            onChange={(e) => setForm({ ...form, marketingEmail: e.target.checked })}
            className="h-5 w-5 rounded text-purple-700 focus:ring-purple-600"
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-purple-950">SMS notifications</p>
            <p className="text-xs text-gray-500">Order status and delivery updates</p>
          </div>
          <input
            type="checkbox"
            checked={form.smsNotifications}
            onChange={(e) => setForm({ ...form, smsNotifications: e.target.checked })}
            className="h-5 w-5 rounded text-purple-700 focus:ring-purple-600"
          />
        </label>
        <button className="btn-secondary btn-sm">Save Preferences</button>
      </div>

      <div className="card space-y-3 border-red-100">
        <h3 className="font-display font-semibold text-red-700">Danger Zone</h3>
        <p className="text-sm text-gray-600">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="btn-danger btn-sm">Delete Account</button>
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="font-display text-xl font-bold text-purple-950">Privacy & Data</h2>

      <div className="card space-y-4">
        <h3 className="font-display font-semibold text-purple-950">Your Privacy Rights</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          In accordance with the NPA 2023 and GDPR, you have the right to access, rectify, export, and
          delete your personal data. Manage your data using the tools below.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="btn-secondary btn-sm"><Lock className="mr-1 h-4 w-4" /> Request Data Export</button>
          <button className="btn-secondary btn-sm"><User className="mr-1 h-4 w-4" /> Request Account Deletion</button>
        </div>
      </div>

      <div className="card space-y-4">
        <h3 className="font-display font-semibold text-purple-950">Consent Preferences</h3>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-purple-950">Analytics cookies</p>
              <p className="text-xs text-gray-500">Help us understand how you use our site</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded text-purple-700" />
          </label>
          <label className="flex cursor-pointer items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-purple-950">Marketing cookies</p>
              <p className="text-xs text-gray-500">Personalized ads and offers</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded text-purple-700" />
          </label>
        </div>
        <button className="btn-secondary btn-sm">Save Preferences</button>
      </div>

      <div>
        <h3 className="font-display font-semibold text-purple-950">Policies</h3>
        <div className="mt-3 space-y-2 text-sm">
          <Link href="/privacy" className="link block">Privacy Policy</Link>
          <Link href="/npa-2023" className="link block">NPA 2023 Policy</Link>
          <Link href="/terms" className="link block">Terms & Conditions</Link>
          <Link href="/security" className="link block">Security</Link>
        </div>
      </div>
    </div>
  );
}
