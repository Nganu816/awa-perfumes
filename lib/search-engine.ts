import { Product, categories, products } from './data';
import {
  getProductIndex,
  vectorizeQuery,
  cosineSimilarity,
  tokenize,
} from './embeddings';

export interface SearchResult {
  product: Product;
  score: number;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

const MIN_SCORE = 0.03;

function getSlugForProduct(p: Product): string {
  const cat = categories.find((c) => c.id === p.category_id);
  return cat?.slug ?? '';
}

function minPrice(p: Product): number {
  return Math.min(...p.variants.map((v) => v.price));
}

function applyFilters(results: SearchResult[], filters: SearchFilters): SearchResult[] {
  let out = results;
  if (filters.category) {
    out = out.filter((r) => getSlugForProduct(r.product) === filters.category);
  }
  if (filters.minPrice !== undefined) {
    out = out.filter((r) => r.product.variants.some((v) => v.price >= filters.minPrice!));
  }
  if (filters.maxPrice !== undefined) {
    out = out.filter((r) => r.product.variants.some((v) => v.price <= filters.maxPrice!));
  }
  if (filters.inStockOnly) {
    out = out.filter((r) => r.product.variants.some((v) => v.in_stock));
  }
  return out;
}

function sortResults(results: SearchResult[], sort?: string): SearchResult[] {
  const out = [...results];
  switch (sort) {
    case 'price-asc':
      out.sort((a, b) => minPrice(a.product) - minPrice(b.product));
      break;
    case 'price-desc':
      out.sort((a, b) => minPrice(b.product) - minPrice(a.product));
      break;
    case 'rating':
      out.sort((a, b) => b.product.rating - a.product.rating);
      break;
    case 'newest':
      out.sort((a, b) => b.product.id.localeCompare(a.product.id));
      break;
    default:
      break;
  }
  return out;
}

export function semanticSearch(query: string, filters: SearchFilters = {}): SearchResult[] {
  const index = getProductIndex();
  const q = query.trim();

  let scored: SearchResult[];

  if (q.length < 2 || tokenize(q).length === 0) {
    scored = index.map((doc) => ({ product: doc.product, score: 1 }));
  } else {
    const queryVec = vectorizeQuery(q);
    if (queryVec.size === 0) {
      scored = index.map((doc) => ({ product: doc.product, score: 1 }));
    } else {
      scored = index
        .map((doc) => ({
          product: doc.product,
          score: cosineSimilarity(queryVec, doc.vector),
        }))
        .filter((r) => r.score >= MIN_SCORE);
    }
  }

  scored = applyFilters(scored, filters);

  if (filters.sort && filters.sort !== 'relevance') {
    scored = sortResults(scored, filters.sort);
  }

  return scored;
}

export function keywordSearch(query: string, filters: SearchFilters = {}): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = products
    .filter(
      (p: Product) =>
        p.active &&
        (p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.scent_top.some((s) => s.toLowerCase().includes(q)) ||
          p.scent_heart.some((s) => s.toLowerCase().includes(q)) ||
          p.scent_base.some((s) => s.toLowerCase().includes(q)))
    )
    .map((p: Product) => ({ product: p, score: 1 }));

  return sortResults(applyFilters(results, filters), filters.sort);
}
