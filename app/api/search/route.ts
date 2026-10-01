import { NextRequest, NextResponse } from 'next/server';
import { semanticSearch } from '@/lib/search-engine';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const q = sp.get('q') ?? '';
  const category = sp.get('category') ?? undefined;
  const minPrice = sp.has('minPrice') ? Number(sp.get('minPrice')) : undefined;
  const maxPrice = sp.has('maxPrice') ? Number(sp.get('maxPrice')) : undefined;
  const inStockOnly = sp.get('inStockOnly') === 'true';
  const sort = (sp.get('sort') as 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest') ?? 'relevance';
  const limit = Math.min(Number(sp.get('limit') || '24'), 50);
  const page = Math.max(Number(sp.get('page') || '1'), 1);

  const results = semanticSearch(q, { category, minPrice, maxPrice, inStockOnly, sort });

  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return NextResponse.json({
    query: q,
    results: paginated.map((r) => ({
      ...r.product,
      _relevance: Math.round(r.score * 100),
    })),
    pagination: { page, limit, total, totalPages },
  });
}
