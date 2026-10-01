# Class Diagram — AWA Perfumes E-Commerce Platform

## 1. Purpose
This document describes the core domain classes and their relationships. It maps to the entity model in `database-design.md` and the current frontend types in `lib/data.ts`.

## 2. Domain Model (Simplified UML)

```
┌──────────────────┐        ┌──────────────────┐
│     Category      │        │     Product       │
├──────────────────┤        ├──────────────────┤
│ - id: string     │1      *│ - id: string     │
│ - name: string   │────────│ - name: string    │
│ - slug: string   │<──────>│ - slug: string    │
│ - description    │        │ - description     │
│ - image: string  │        │ - category_id     │
│                  │        │ - brand: string   │
└──────────────────┘        │ - rating: number  │
                            │ - review_count    │
                            │ - featured: bool  │
                            │ - bestseller: bool│
                            │ - active: bool    │
                            └────────┬──────────┘
                                     │ 1
                                     │ has
                                     ▼ *  █
┌───────────────────────────────────────────────┐
│               ProductVariant                   │
├───────────────────────────────────────────────┤
│ - id: string                                  │
│ - size_ml: number                             │
│ - price: number                               │
│ - sku: string                                 │
│ - stock: number                               │
│ - in_stock: bool                              │
│ + isInStock(): bool                           │
│ + updateStock(qty: number): void              │
└───────────────────────────────────────────────┘

┌──────────────────┐
│    CartItem       │
├──────────────────┤
│ - id: string     │
│ - quantity: int  │
│ - variant: ...   │
│ - product: ...   │
│ + lineTotal():   │
│   number          │
└──────────────────┘

┌──────────────────┐        ┌──────────────────┐
│      Cart         │        │      Order        │
├──────────────────┤        ├──────────────────┤
│ - items: CartItem[] │      │ - id: string     │
│ + add(variant,qty) │      │ - customer_id    │
│ + remove(id)       │      │ - status: string │
│ + updateQty(id,n)  │      │ - subtotal       │
│ + clear()          │      │ - shipping       │
│ + getCount(): int  │      │ - tax: number    │
│ + subtotal(): nr   │      │ - total: number  │
└──────────────────┘        └──────────────────┘
```

## 3. Class Specifications

### 3.1 Category
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier |
| name | string | Display name |
| slug | string | URL slug |
| description | string | Category description |
| image | string | Category image URL |

### 3.2 Product
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier |
| name | string | Product name |
| slug | string | SEO URL slug |
| description | string | Product description |
| category_id | string | FK to Category |
| brand | string | Brand name |
| scent_top / heart / base | string[] | Scent note pyramid |
| rating | number | Average rating (0–5) |
| review_count | number | Number of reviews |
| featured / bestseller / active | boolean | Marketing flags |

**Relationships**
- Product **1 — N** Variant
- Product **N — 1** Category

### 3.3 ProductVariant
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier |
| size_ml | number | Bottle size |
| price | number | Unit price |
| sku | string | Stock keeping unit |
| stock | number | On-hand quantity |
| in_stock | boolean | Derived: stock > 0 |

**Methods**
- `isInStock(): boolean` — returns `stock > 0`
- `updateStock(qty: number): void` — sets stock and re-derives `in_stock`

### 3.4 Cart & CartItem
| Class | Attributes | Methods |
|-------|------------|---------|
| Cart | items: CartItem[] | add(), remove(), updateQty(), clear(), getCount(), subtotal() |
| CartItem | id, quantity, product, variant | lineTotal() |

Persistence: Zustand store with `persist` (localStorage).

### 3.5 Order
| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier |
| customer_id | string | FK to Customer |
| status | string | pending/paid/shipped/delivered/returned |
| subtotal / shipping / tax / total | number | Financial totals |

**Atomicity:** Order creation runs in a transaction; on payment failure, all writes roll back (see flowchart & security design).

## 4. Search Classes (Semantic Search Subsystem)
```
┌──────────────────────────┐   ┌──────────────────────────────┐
│     Tokenizer             │   │   Vectorizer / TF-IDF        │
│ - STOP_WORDS: Set<string> │   │ - idf: Map<string, number>   │
│ + tokenize(text): string[]│   │ + vectorize(doc): SparseVector│
└──────────────────────────┘   └──────────────────────────────┘
                                         │ uses
                                         ▼
┌──────────────────────────────────────────────────────────┐
│                 SearchEngine                               │
├──────────────────────────────────────────────────────────┤
│ - index: ProductDocument[]                                │
│ + semanticSearch(query, filters): SearchResult[]          │
│ + keywordSearch(query, filters): SearchResult[]           │
│ - cosineSimilarity(a, b): number                          │
└──────────────────────────────────────────────────────────┘
```

**SearchResult**
| Attribute | Type | Description |
|-----------|------|-------------|
| product | Product | Matched product |
| score | number | Cosine similarity (0–1) |

## 5. Mapping to Source Code
| UML Class | Source |
|-----------|--------|
| Category, Product, ProductVariant | `lib/data.ts` (interfaces) |
| Cart, CartItem | `store/cart-store.ts` (Zustand) |
| Tokenizer, Vectorizer, SearchEngine | `lib/embeddings.ts`, `lib/search-engine.ts` |
| Order | `app/checkout/page.tsx` (form state) |

## 6. References
- `02-requirements/system-requirements-specification.md` (FR-001…FR-008)
- `03-design/database-design.md`
- `03-design/use-case-diagram.md`
- `03-design/pseudocode.md`
