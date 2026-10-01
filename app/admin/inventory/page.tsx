'use client';

import { useState, useMemo } from 'react';
import { Package, AlertTriangle, XCircle, Search, ArrowUpDown, Pencil, Check, X } from 'lucide-react';
import { products as initialProducts, categories, ProductVariant, Product } from '@/lib/data';

interface InventoryRow {
  productId: string;
  productName: string;
  productSlug: string;
  category: string;
  variant: ProductVariant;
}

function buildInventoryRows(prods: Product[]): InventoryRow[] {
  const rows: InventoryRow[] = [];
  for (const p of prods) {
    if (!p.active) continue;
    const cat = categories.find((c) => c.id === p.category_id);
    for (const v of p.variants) {
      rows.push({
        productId: p.id,
        productName: p.name,
        productSlug: p.slug,
        category: cat?.name ?? 'Unknown',
        variant: { ...v },
      });
    }
  }
  return rows;
}

function stockColor(stock: number): string {
  if (stock === 0) return 'text-red-600 bg-red-50';
  if (stock < 5) return 'text-red-600 bg-red-50';
  if (stock < 10) return 'text-amber-600 bg-amber-50';
  return 'text-green-700 bg-green-50';
}

function stockBadge(stock: number): { label: string; color: string } {
  if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
  if (stock < 5) return { label: 'Critical', color: 'bg-red-100 text-red-700' };
  if (stock < 10) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700' };
  return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function InventoryPage() {
  const [rows, setRows] = useState(() => buildInventoryRows(initialProducts));
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'stock' | 'price' | 'sku'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const filtered = useMemo(() => {
    let result = rows;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.productName.toLowerCase().includes(q) ||
          r.variant.sku.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name':
          cmp = a.productName.localeCompare(b.productName);
          break;
        case 'stock':
          cmp = a.variant.stock - b.variant.stock;
          break;
        case 'price':
          cmp = a.variant.price - b.variant.price;
          break;
        case 'sku':
          cmp = a.variant.sku.localeCompare(b.variant.sku);
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [rows, search, sortKey, sortDir]);

  const totalProducts = new Set(rows.map((r) => r.productId)).size;
  const totalSKUs = rows.length;
  const lowStock = rows.filter((r) => r.variant.stock > 0 && r.variant.stock < 10).length;
  const outOfStock = rows.filter((r) => r.variant.stock === 0).length;

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const startEdit = (variantId: string, currentStock: number) => {
    setEditingId(variantId);
    setEditValue(String(currentStock));
  };

  const saveEdit = (variantId: string) => {
    const newStock = Math.max(0, parseInt(editValue, 10) || 0);
    setRows((prev) =>
      prev.map((r) => {
        if (r.variant.id !== variantId) return r;
        const updated = { ...r.variant, stock: newStock, in_stock: newStock > 0 };
        return { ...r, variant: updated };
      })
    );
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const SortHeader = ({ label, field }: { label: string; field: typeof sortKey }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-purple-700"
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
      {sortKey === field && (
        <span className="text-purple-600">{sortDir === 'asc' ? '↑' : '↓'}</span>
      )}
    </button>
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-purple-950">Inventory Management</h1>
        <p className="mt-1 text-sm text-gray-600">Manage stock levels for all products and variants.</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
            <Package className="h-6 w-6 text-purple-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-950">{totalProducts}</p>
            <p className="text-xs text-gray-500">Total Products</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lilac-100">
            <Package className="h-6 w-6 text-lilac-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-950">{totalSKUs}</p>
            <p className="text-xs text-gray-500">Total SKUs</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-950">{lowStock}</p>
            <p className="text-xs text-gray-500">Low Stock (&lt;10)</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
            <XCircle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-950">{outOfStock}</p>
            <p className="text-xs text-gray-500">Out of Stock</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-gray-100 p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, SKU, or category..."
              className="input pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-4 py-3"><SortHeader label="Product" field="name" /></th>
                <th className="px-4 py-3">Variant</th>
                <th className="px-4 py-3"><SortHeader label="SKU" field="sku" /></th>
                <th className="px-4 py-3"><SortHeader label="Price" field="price" /></th>
                <th className="px-4 py-3"><SortHeader label="Stock" field="stock" /></th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((row) => {
                const badge = stockBadge(row.variant.stock);
                const isEditing = editingId === row.variant.id;
                return (
                  <tr key={row.variant.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-purple-950">{row.productName}</p>
                      <p className="text-xs text-gray-500">{row.category}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.variant.size_ml} ml</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{row.variant.sku}</td>
                    <td className="px-4 py-3 text-gray-700">{formatPrice(row.variant.price)}</td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEdit(row.variant.id);
                              if (e.key === 'Escape') cancelEdit();
                            }}
                            className="h-8 w-20 rounded border border-purple-300 px-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            autoFocus
                          />
                          <button
                            onClick={() => saveEdit(row.variant.id)}
                            className="rounded p-1 text-green-600 hover:bg-green-50"
                            aria-label="Save"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded p-1 text-red-500 hover:bg-red-50"
                            aria-label="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-flex min-w-[2.5rem] items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-semibold ${stockColor(row.variant.stock)}`}>
                          {row.variant.stock}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isEditing && (
                        <button
                          onClick={() => startEdit(row.variant.id, row.variant.stock)}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-50"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">No variants match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
