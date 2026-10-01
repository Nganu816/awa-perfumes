export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  size_ml: number;
  price: number;
  sku: string;
  in_stock: boolean;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  brand: string;
  scent_top: string[];
  scent_heart: string[];
  scent_base: string[];
  featured: boolean;
  bestseller: boolean;
  active: boolean;
  image: string;
  gallery: string[];
  variants: ProductVariant[];
  rating: number;
  review_count: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export const categories: Category[] = [
  {
    id: 'cat-women',
    name: "Women's Collection",
    slug: 'women',
    description: 'Elegant floral and oriental fragrances for the modern woman',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=750&fit=crop',
  },
  {
    id: 'cat-men',
    name: "Men's Collection",
    slug: 'men',
    description: 'Bold and sophisticated scents for the confident man',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=750&fit=crop',
  },
  {
    id: 'cat-unisex',
    name: 'Unisex Collection',
    slug: 'unisex',
    description: 'Balanced fragrances that transcend gender boundaries',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=750&fit=crop',
  },
  {
    id: 'cat-gift',
    name: 'Gift Sets',
    slug: 'gift-sets',
    description: 'Curated collections perfect for any occasion',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&h=750&fit=crop',
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your fragrance experience with luxury accessories',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=750&fit=crop',
  },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'AWA Signature Eau de Parfum',
    slug: 'awa-signature',
    description:
      'Our signature fragrance capturing the essence of modern luxury. A harmonious blend of Bulgarian rose, Italian bergamot, and precious sandalwood that evolves beautifully throughout the day.',
    category_id: 'cat-women',
    brand: 'AWA Perfumes',
    scent_top: ['Italian Bergamot', 'Pink Pepper', 'Mandarin'],
    scent_heart: ['Bulgarian Rose', 'Jasmine Sambac', 'Magnolia'],
    scent_base: ['Sandalwood', 'White Musk', 'Vanilla'],
    featured: true,
    bestseller: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-001', size_ml: 30, price: 79.99, sku: 'AWA-SIG-30', in_stock: true, stock: 45 },
      { id: 'var-002', size_ml: 50, price: 119.99, sku: 'AWA-SIG-50', in_stock: true, stock: 120 },
      { id: 'var-003', size_ml: 100, price: 189.99, sku: 'AWA-SIG-100', in_stock: false, stock: 0 },
    ],
    rating: 4.8,
    review_count: 342,
  },
  {
    id: 'prod-002',
    name: 'Lilac Bloom Eau de Toilette',
    slug: 'lilac-bloom',
    description:
      'Delicate and ethereal, Lilac Bloom celebrates the ephemeral beauty of spring. Fresh lilac petals mingle with soft musk for an airy, romantic composition.',
    category_id: 'cat-women',
    brand: 'AWA Perfumes',
    scent_top: ['Lilac', 'Green Leaves', 'Freesia'],
    scent_heart: ['Lily of the Valley', 'Peony', 'Iris'],
    scent_base: ['White Musk', 'Powdery Amber', 'Clean Woods'],
    featured: true,
    bestseller: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-004', size_ml: 30, price: 64.99, sku: 'AWA-LB-30', in_stock: true, stock: 67 },
      { id: 'var-005', size_ml: 50, price: 94.99, sku: 'AWA-LB-50', in_stock: true, stock: 89 },
    ],
    rating: 4.6,
    review_count: 218,
  },
  {
    id: 'prod-003',
    name: 'Noir d\'Homme',
    slug: 'noir-dhomme',
    description:
      'A magnetic and intense fragrance for the modern gentleman. Smoked vetiver, black leather, and amber create an unforgettable evening scent.',
    category_id: 'cat-men',
    brand: 'AWA Perfumes',
    scent_top: ['Black Cardamom', 'Bergamot', 'Bitter Orange'],
    scent_heart: ['Smoked Vetiver', 'Leather', 'Cypress'],
    scent_base: ['Amberwood', 'Tonka Bean', 'Oakmoss'],
    featured: true,
    bestseller: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-006', size_ml: 50, price: 109.99, sku: 'AWA-ND-50', in_stock: true, stock: 156 },
      { id: 'var-007', size_ml: 100, price: 169.99, sku: 'AWA-ND-100', in_stock: true, stock: 78 },
    ],
    rating: 4.9,
    review_count: 476,
  },
  {
    id: 'prod-004',
    name: 'Pure Essence Oud',
    slug: 'pure-essence-oud',
    description:
      'The king of ingredients, pure Oud, presented in its most refined form. Rich, smoky, and profoundly elegant - a statement of true luxury.',
    category_id: 'cat-unisex',
    brand: 'AWA Perfumes',
    scent_top: ['Saffron', 'Rose Water', 'Nutmeg'],
    scent_heart: ['Agarwood', 'Nepalese Jasmine', 'Patchouli'],
    scent_base: ['Premium Oud', 'Sandalwood', 'Raspberry Accord'],
    featured: true,
    bestseller: false,
    active: true,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-008', size_ml: 30, price: 199.99, sku: 'AWA-PEO-30', in_stock: true, stock: 12 },
      { id: 'var-009', size_ml: 50, price: 289.99, sku: 'AWA-PEO-50', in_stock: true, stock: 8 },
      { id: 'var-010', size_ml: 100, price: 489.99, sku: 'AWA-PEO-100', in_stock: false, stock: 0 },
    ],
    rating: 5.0,
    review_count: 164,
  },
  {
    id: 'prod-005',
    name: 'Velvet Rose & Amber',
    slug: 'velvet-rose-amber',
    description:
      'A sumptuous blend of velvet-soft rose petals resting on a warm amber base. The gift of timeless romance in a bottle.',
    category_id: 'cat-gift',
    brand: 'AWA Perfumes',
    scent_top: ['Damask Rose', 'Cassis', 'Lychee'],
    scent_heart: ['Turkish Rose', 'Geranium', 'Lotus'],
    scent_base: ['Amber', 'Cedarwood', 'Labdanum'],
    featured: false,
    bestseller: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-011', size_ml: 50, price: 99.99, sku: 'AWA-VRA-50', in_stock: true, stock: 34 },
      { id: 'var-012', size_ml: 100, price: 159.99, sku: 'AWA-VRA-100', in_stock: true, stock: 56 },
    ],
    rating: 4.7,
    review_count: 289,
  },
  {
    id: 'prod-006',
    name: 'Aurora Eau Fraiche',
    slug: 'aurora-eau-fraiche',
    description:
      'A luminous, airy fragrance inspired by the Northern Lights. Crisp aquatic notes dancing over a base of virgin snow accord.',
    category_id: 'cat-women',
    brand: 'AWA Perfumes',
    scent_top: ['Sea Salt', 'Iced Lemon', 'Cucumber'],
    scent_heart: ['Water Lily', 'Honeysuckle', 'Coconut Water'],
    scent_base: ['Snow Accord', 'White Cedar', 'Musk'],
    featured: true,
    bestseller: false,
    active: true,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-013', size_ml: 30, price: 59.99, sku: 'AWA-AUR-30', in_stock: true, stock: 23 },
      { id: 'var-014', size_ml: 50, price: 89.99, sku: 'AWA-AUR-50', in_stock: true, stock: 45 },
    ],
    rating: 4.4,
    review_count: 156,
  },
  {
    id: 'prod-007',
    name: 'Ember Leather',
    slug: 'ember-leather',
    description:
      'A bold, contemporary scent for those who dare. Smoldering embers, rich leather, and a hint of sweet tobacco craft a statement of confidence.',
    category_id: 'cat-men',
    brand: 'AWA Perfumes',
    scent_top: ['Cinnamon', 'Bergamot', 'Black Pepper'],
    scent_heart: ['Leather', 'Birch Tar', 'Saffron'],
    scent_base: ['Smoked Woods', 'Benzoin', 'Vanilla Pod'],
    featured: false,
    bestseller: false,
    active: true,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-015', size_ml: 50, price: 129.99, sku: 'AWA-EL-50', in_stock: true, stock: 18 },
      { id: 'var-016', size_ml: 100, price: 199.99, sku: 'AWA-EL-100', in_stock: false, stock: 0 },
    ],
    rating: 4.5,
    review_count: 98,
  },
  {
    id: 'prod-008',
    name: 'Solstice Collection Gift Set',
    slug: 'solstice-collection',
    description:
      'Four timeless fragrances in travel-sized formats, perfect for discovery or the perfect gift. Includes Solstice, Nocturne, Dawn, and Dusk.',
    category_id: 'cat-gift',
    brand: 'AWA Perfumes',
    scent_top: ['Varied by fragrance', 'Citrus', 'Green'],
    scent_heart: ['Varied by fragrance', 'Floral', 'Spice'],
    scent_base: ['Varied by fragrance', 'Woods', 'Musk'],
    featured: true,
    bestseller: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-017', size_ml: 10, price: 149.99, sku: 'AWA-SOL-10', in_stock: true, stock: 89 },
      { id: 'var-018', size_ml: 50, price: 349.99, sku: 'AWA-SOL-50', in_stock: true, stock: 34 },
    ],
    rating: 4.9,
    review_count: 412,
  },
  {
    id: 'prod-009',
    name: 'Nocturne Eau de Parfum',
    slug: 'nocturne',
    description:
      'Mysterious and entrancing, Nocturne captures the allure of midnight gardenias and smoked plum under starlight.',
    category_id: 'cat-women',
    brand: 'AWA Perfumes',
    scent_top: ['Black Plum', 'Mandarin', 'Lavender'],
    scent_heart: ['Gardenia', 'Night Jasmine', 'Orris'],
    scent_base: ['Dark Patchouli', 'Tonka', 'Black Musk'],
    featured: false,
    bestseller: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-019', size_ml: 30, price: 74.99, sku: 'AWA-NOC-30', in_stock: true, stock: 56 },
      { id: 'var-020', size_ml: 50, price: 109.99, sku: 'AWA-NOC-50', in_stock: true, stock: 78 },
      { id: 'var-021', size_ml: 100, price: 169.99, sku: 'AWA-NOC-100', in_stock: true, stock: 23 },
    ],
    rating: 4.7,
    review_count: 328,
  },
  {
    id: 'prod-010',
    name: 'Luxury Atomizer Travel Set',
    slug: 'luxury-atomizer',
    description:
      'Hand-polished crystal atomizers in a velvet-lined case. The sophisticated way to carry your favorite scents.',
    category_id: 'cat-accessories',
    brand: 'AWA Perfumes',
    scent_top: [],
    scent_heart: [],
    scent_base: [],
    featured: false,
    bestseller: false,
    active: true,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=1000&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=1000&fit=crop',
    ],
    variants: [
      { id: 'var-022', size_ml: 10, price: 49.99, sku: 'AWA-ATM-10', in_stock: true, stock: 12 },
      { id: 'var-023', size_ml: 30, price: 89.99, sku: 'AWA-ATM-30', in_stock: true, stock: 8 },
    ],
    rating: 4.5,
    review_count: 87,
  },
];

export const testimonials = [
  {
    id: 'test-001',
    name: 'Sarah Ahmed',
    location: 'Karachi, Pakistan',
    rating: 5,
    text: 'AWA Signature is my everyday signature now. The quality rivals much more expensive houses. Delivery was fast and packaging was simply beautiful.',
    product: 'AWA Signature Eau de Parfum',
  },
  {
    id: 'test-002',
    name: 'James Chen',
    location: 'London, UK',
    rating: 5,
    text: 'Noir d\'Homme is the most sophisticated mens fragrance I own. The performance is outstanding - 12+ hours easily. AWA has a customer for life.',
    product: "Noir d'Homme",
  },
  {
    id: 'test-003',
    name: 'Amira Hassan',
    location: 'Dubai, UAE',
    rating: 4,
    text: 'Pure Essence Oud transported me back to my grandmothers majlis. Authentic, rich, and perfectly balanced. Worth every penny.',
    product: 'Pure Essence Oud',
  },
  {
    id: 'test-004',
    name: 'Marcus Rivera',
    location: 'New York, USA',
    rating: 5,
    text: 'The Solstice Collection was the perfect gift for my wife. The presentation is world-class and each scent is unique and beautiful. Highly recommend!',
    product: 'Solstice Collection Gift Set',
  },
];

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (slug: string): Product[] => {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return [];
  return products.filter((p) => p.category_id === category.id && p.active);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured && p.active);
};

export const getBestsellers = (): Product[] => {
  return products.filter((p) => p.bestseller && p.active);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter((p) => p.id !== product.id && p.category_id === product.category_id && p.active)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.active &&
      (p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q))
  );
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
};

export const calculateShipping = (subtotal: number): number => {
  if (subtotal >= 100) return 0;
  return 9.99;
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.08;
};

export const calculateTotal = (items: CartItem[]): number => {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  return subtotal + shipping + tax;
};
