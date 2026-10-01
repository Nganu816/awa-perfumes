import Link from 'next/link';
import { Package, BarChart3, Settings, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
          <Package className="h-6 w-6 text-purple-700" />
          <span className="font-display text-lg font-bold text-purple-950">Admin Panel</span>
        </div>

        <nav className="mt-4 space-y-1 px-3" aria-label="Admin navigation">
          <Link
            href="/admin/inventory"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-purple-900 bg-purple-50"
          >
            <Package className="h-4 w-4" />
            Inventory
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-purple-900"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-purple-900"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </div>
      </aside>

      <main className="ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
