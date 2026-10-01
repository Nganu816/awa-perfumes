# UI/UX Design Document

## 1. Design System

### 1.1 Brand Identity
| Element | Specification |
|---------|---------------|
| Brand Name | AWA Perfumes |
| Tagline | "Luxury Fragrance Experience" |
| Tone | Elegant, sophisticated, approachable |

### 1.2 Color Palette (Lilac & Purple Theme)

#### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Royal Purple | #6B21A8 | 107, 33, 168 | Primary CTA, Headers |
| Lilac | #C8A2C8 | 200, 162, 200 | Accents, Highlights |
| Deep Purple | #4C1D95 | 76, 29, 149 | Footer, Dark backgrounds |

#### Neutral Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| White | #FFFFFF | 255, 255, 255 | Main background |
| Light Lilac | #F0E6F6 | 240, 230, 246 | Card backgrounds |
| Light Gray | #F9FAFB | 249, 250, 251 | Secondary BG |
| Gray | #6B7280 | 107, 114, 128 | Secondary text |
| Dark | #1F2937 | 31, 41, 55 | Primary text |

### 1.3 Typography
| Type | Font | Fallback |
|------|------|----------|
| Headings | Playfair Display | Georgia, serif |
| Body | Inter | system-ui, sans-serif |

### 1.4 Spacing & Radius
```
Spacing: 4px (xs), 8px (sm), 16px (md), 24px (lg), 32px (xl), 48px (2xl), 64px (3xl)
Radius: 8px (buttons), 12px (cards), 16px (modals), full (pills)
```

## 2. Component Library

### 2.1 Buttons
- **Primary**: Royal Purple bg, white text, hover deep purple
- **Secondary**: White bg, purple border, purple text
- **Ghost**: Transparent, purple text
- **Danger**: Red bg, white text

### 2.2 Cards
- White background, subtle border
- Shadow on hover
- 12px border radius

### 2.3 Forms
- 48px height inputs
- Purple focus states
- Clear error states

## 3. Page Layouts

### Homepage
1. Header (sticky)
2. Hero section (full-width, gradient purple)
3. Featured categories (3-column)
4. Featured products (4-column grid)
5. Value proposition (purple section)
6. Testimonials (3-column)
7. Newsletter signup
8. Footer

### Product Listing
1. Breadcrumb
2. Filters sidebar (desktop) / collapsible (mobile)
3. Sort dropdown
4. Product grid (responsive)
5. Pagination

### Product Detail
1. Breadcrumb
2. Image gallery + product info sidebar
3. Tabs (Description, Reviews)
4. Related products

### Checkout
1. Multi-step form (Shipping → Payment → Review)
2. Order summary sidebar (sticky)
3. Security indicators

## 4. Responsive Breakpoints

| Breakpoint | Width | Columns |
|------------|-------|---------|
| Mobile | 320-639px | 1 |
| Tablet | 640-1023px | 2 |
| Laptop | 1024-1279px | 3 |
| Desktop | 1280px+ | 4 |

## 5. Accessibility (WCAG 2.1 AA)

- Color contrast: 4.5:1 minimum
- Focus visible on all interactive elements
- Skip navigation link
- Alt text for all images
- ARIA labels for icons
- Keyboard navigation support

## 6. ISO 9241-210 Compliance

The design process follows ISO 9241-210 (Human-Centered Design):
1. Understand context of use
2. Specify user requirements
3. Produce design solutions
4. Evaluate designs
5. Iterate
