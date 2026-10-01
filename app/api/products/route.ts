import { NextRequest, NextResponse } from 'next/server';
import { products, categories } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const limit = Number(searchParams.get('limit') || '24');
  const page = Number(searchParams.get('page') || '1');

  let result = products.filter((p) => p.active);

  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) {
      result = result.filter((p) => p.category_id === cat.id);
    }
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginated = result.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    products: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}
