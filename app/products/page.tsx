'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown, Search, Sparkles } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { products, categories, categories as allCategories, Product } from '@/lib/data';

interface SemanticProduct extends Product {
  _relevance?: number;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] py-24 text-center text-gray-500">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(categorySlug);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState(searchQuery ? 'relevance' : 'featured');
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [semanticResults, setSemanticResults] = useState<SemanticProduct[]>([]);
  const [semanticLoading, setSemanticLoading] = useState(false);
  const [isSemantic, setIsSemantic] = useState(false);

  const brands = useMemo(() => {
    return Array.from(new Set(products.filter((p) => p.active).map((p) => p.brand)));
  }, []);

  // Fetch semantic results when search query changes
  const fetchSemantic = useCallback(async (q: string, cat?: string) => {
    if (!q) { setIsSemantic(false); return; }
    setSemanticLoading(true);
    try {
      const params = new URLSearchParams({ q, limit: '24' });
      if (cat) params.set('category', cat);
      const res = await fetch(`/api/search?${params}`);
      const data = await res.json();
      setSemanticResults(data.results);
      setIsSemantic(true);
    } catch {
      setIsSemantic(false);
      setSemanticResults([]);
    }
    setSemanticLoading(false);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchSemantic(searchQuery, selectedCategory || undefined);
      setSort('relevance');
    } else {
      setIsSemantic(false);
      setSemanticResults([]);
      setSort('featured');
    }
  }, [searchQuery, selectedCategory, fetchSemantic]);

  const filteredProducts = useMemo(() => {
    let result: SemanticProduct[];

    if (isSemantic && semanticResults.length > 0) {
      // When semantic results are available, use them as the base
      result = semanticResults;
    } else {
      // Fallback to client-side filtering
      result = products
        .filter((p) => p.active)
        .map((p) => ({ ...p, _relevance: undefined }));
    }

    // Apply client-side filters on top
    if (selectedCategory) {
      const cat = allCategories.find((c) => c.slug === selectedCategory);
      if (cat) result = result.filter((p) => p.category_id === cat.id);
    }
    if (brand) result = result.filter((p) => p.brand === brand);
    if (inStockOnly) result = result.filter((p) => p.variants.some((v) => v.in_stock));
    result = result.filter((p) => {
      const mp = Math.min(...p.variants.map((v) => v.price));
      return mp >= priceRange[0] && mp <= priceRange[1];
    });

    // Sort
    if (sort === 'relevance' && isSemantic) {
      result.sort((a, b) => (b._relevance ?? 0) - (a._relevance ?? 0));
    } else {
      switch (sort) {
        case 'price-asc':
          result.sort((a, b) => Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price)));
          break;
        case 'price-desc':
          result.sort((a, b) => Math.min(...b.variants.map((v) => v.price)) - Math.min(...a.variants.map((v) => v.price)));
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
          break;
        default:
          result.sort((a, b) => Number(b.featured || b.bestseller) - Number(a.featured || a.bestseller));
      }
    }

    return result;
  }, [semanticResults, isSemantic, selectedCategory, priceRange, brand, sort, inStockOnly]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? '' : slug);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 500]);
    setBrand('');
    setInStockOnly(false);
    setSort(searchQuery ? 'relevance' : 'featured');
  };

  const hasActiveFilters =
    selectedCategory || brand || inStockOnly || priceRange[0] > 0 || priceRange[1] < 500;

  return (
    <div className="container-page animate-fade-in py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-purple-950">
          {selectedCategory
            ? allCategories.find((c) => c.slug === selectedCategory)?.name
            : searchQuery
            ? `Search results for "${searchQuery}"`
            : 'All Fragrances'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 && 's'} available
        </p>
      </div>

      {searchQuery && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-lilac-100 p-4">
          {isSemantic ? (
            <Sparkles className="h-5 w-5 text-purple-800" />
          ) : (
            <Search className="h-5 w-5 text-purple-800" />
          )}
          <p className="text-sm text-purple-900">
            {semanticLoading
              ? 'Running semantic search...'
              : filteredProducts.length > 0
              ? isSemantic
                ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 && 's'} matching "${searchQuery}" (semantic ranking)`
                : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 && 's'} matching "${searchQuery}"`
              : `No products found matching "${searchQuery}"`}
          </p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="card space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold text-purple-950">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h2>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs font-medium text-purple-700 hover:text-purple-900">
                  Clear all
                </button>
              )}
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-1 text-sm font-semibold text-purple-950">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex cursor-pointer items-center gap-2 text-sm text-purple-950/80">
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat.slug}
                      onChange={() => handleCategoryChange(cat.slug)}
                      className="h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-600"
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-1 text-sm font-semibold text-purple-950">
                Price Range
              </h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-purple-700"
                  aria-label="Maximum price"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="input py-2 text-sm"
                    placeholder="Min"
                    aria-label="Minimum price"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="input py-2 text-sm"
                    placeholder="Max"
                    aria-label="Maximum price"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-purple-950">Brand</h3>
              <div className="space-y-2">
                {brands.map((b) => (
                  <label key={b} className="flex cursor-pointer items-center gap-2 text-sm text-purple-950/80">
                    <input
                      type="checkbox"
                      checked={brand === b}
                      onChange={() => setBrand(brand === b ? '' : b)}
                      className="h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-600"
                    />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-purple-950/80">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-600"
                />
                In stock only
              </label>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary btn-sm lg:hidden"
            >
              <SlidersHorizontal className="mr-1 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="relative ml-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input w-48 py-2 text-sm"
                aria-label="Sort products"
              >
                {searchQuery && <option value="relevance">Relevance</option>}
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-800"
                >
                  {allCategories.find((c) => c.slug === selectedCategory)?.name}
                  <X className="h-3 w-3" />
                </button>
              )}
              {brand && (
                <button
                  onClick={() => setBrand('')}
                  className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-800"
                >
                  {brand}
                  <X className="h-3 w-3" />
                </button>
              )}
              {inStockOnly && (
                <button
                  onClick={() => setInStockOnly(false)}
                  className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-800"
                >
                  In stock only
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl font-semibold text-purple-950">
                No products found
              </p>
              <p className="mt-2 text-gray-600">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-primary mt-6">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative">
                  {isSemantic && product._relevance !== undefined && product._relevance > 0 && (
                    <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-purple-700 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      <Sparkles className="h-2.5 w-2.5" />
                      {product._relevance}% match
                    </div>
                  )}
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
