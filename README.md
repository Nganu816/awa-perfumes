# AWA Perfumes - E-Commerce Platform
Student	Hauwa Gabriel
Registration No.	MSC/CSC/25/0016
Email	hauwagabriel@mau.edu.ng
Course Code	CSC 720
Course Title	E-Commerce
Department	Computer Science
Live demo	npm run dev → localhost:3000
A state-of-the-art e-commerce web application for luxury fragrances, built with a modern, ISO-compliant design system in elegant lilac and purple.

## Features

- **Product Catalog** - Perfumes, gift sets, and accessories with categories, filters, and search
- **Shopping Cart** - Persistent cart with local storage persistence
- **Secure Checkout** - Multi-step checkout with order review and security indicators
- **User Accounts** - Profile, order history, wishlist, addresses, and settings
- **Legal & Compliance** - Return policy, Terms & Conditions, Privacy (GDPR), NPA 2023, Security
- **Luxury UI** - Lilac and purple theme, Playfair Display / Inter typography, WCAG 2.1 AA compliant

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| Fonts | Playfair Display, Inter |

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

### Quality

```bash
npm run lint     # ESLint
npm run typecheck  # TypeScript type checking
```

## Project Structure

```
app/
├── account/        # User account pages
├── api/            # API routes
├── cart/           # Shopping cart
├── checkout/       # Checkout flow
├── contact/        # Contact & FAQ
├── npa-2023/       # NPA 2023 Policy
├── privacy/        # Privacy Policy
├── products/       # Product listing & detail
├── return-policy/  # Return & Refund Policy
├── security/       # Security page
├── terms/          # Terms & Conditions
└── page.tsx        # Homepage

components/
├── layout/         # Header, Footer
├── legal/          # Legal page components
└── product/        # ProductCard, etc.

lib/                # Utilities and mock data
store/              # Zustand stores
docs/               # SDLC documentation
```

## Documentation

See the [SDLC documentation](docs/README.md) for full project documentation including:
- Project charter & business case
- Requirements (functional, non-functional, compliance)
- Design (architecture, database, API, UI/UX, security)
- Testing strategy
- Deployment guide
- Support process

## Compliance

- **NPA 2023** (Pakistan National Privacy Act)
- **GDPR** (General Data Protection Regulation)
- **PCI DSS** (Payment Card Industry Data Security Standard)
- **WCAG 2.1** AA accessibility

## License

Proprietary - &copy; 2026 AWA Perfumes. All rights reserved.
