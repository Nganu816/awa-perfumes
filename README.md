# AWA Perfumes - E-Commerce Platform

**A state-of-the-art web application for a luxury fragrance retailer, built on a modern, ISO-aligned design system in an elegant lilac and purple theme.**

| | |
|---|---|
| **Student** | Hauwa Gabriel |
| **Registration No.** | MSC/CSC/25/0016 |
| **Email** | hauwagabriel@mau.edu.ng |
| **Course Code** | CSC 720 |
| **Course Title** | E-Commerce |
| **Assignment** | E-Commerce Course Project |
| **Department** | Computer Science |
| **Live demo** | `npm run dev` -> [http://localhost:3000](http://localhost:3000) |

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [SDLC Documentation](#sdlc-documentation)
- [Compliance](#compliance)
- [License](#license)

---

## Overview

AWA Perfumes is a full-featured storefront for perfumes, gift sets, and accessories. The application demonstrates the complete software development life cycle - from feasibility analysis and requirements specification through UML design, implementation, and quality verification - delivered as a working, accessible web application.

The interface is fully responsive, keyboard accessible, and designed around a luxury brand identity.

---

## Features

### Storefront
- **Product Catalog** - perfumes, gift sets and accessories with category browsing, filtering and sorting
- **Semantic Product Search** - relevance-ranked search built on a TF-IDF vector index with cosine similarity, running entirely offline (no external API keys)
- **Product Detail Pages** - variant selection (size/concentration), pricing, stock status, quantity picker
- **Shopping Cart** - persistent cart via Zustand + `localStorage`, survives page reloads
- **Checkout** - multi-step flow with order review and simulated payment confirmation
- **Account Area** - profile, order history, wishlist, addresses and settings
- **Legal & Compliance Pages** - Terms, Privacy (GDPR), Return & Refund Policy, NPA 2023, Security

### Administration
- **Inventory Dashboard** - summary cards for total SKUs, stock levels, low-stock and out-of-stock counts
- **Stock Management** - searchable, sortable inventory table with inline stock editing and automatic status badges

### Experience
- **Luxury UI** - lilac/purple design system, Playfair Display + Inter typography, WCAG 2.1 AA oriented
- **Responsive** - mobile, tablet and desktop layouts
- **Accessible** - semantic HTML, ARIA labelling, visible focus states

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| State Management | Zustand (with persistence) |
| Search | Custom TF-IDF + cosine similarity engine |
| Typography | Playfair Display, Inter |
| API | Next.js Route Handlers (`app/api/*`) |

---

## Quick Start

### Prerequisites
- Node.js 18 or newer
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Nganu816/awa-perfumes.git
cd awa-perfumes

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Quality checks

```bash
npm run typecheck   # TypeScript type checking
npm run lint        # ESLint
```

Both commands pass with zero errors and zero warnings.

### One-click launcher (Windows)

Double-click `Start AWA Perfumes.bat` to install dependencies and start the server automatically.

---

## Project Structure

```
awa-perfumes/
 app/
    account/          # Profile, orders, wishlist, addresses, settings
    admin/            # Admin dashboard + inventory management
    api/              # API route handlers (search, health)
    cart/             # Shopping cart
    checkout/         # Multi-step checkout
    contact/          # Contact & FAQ
    npa-2023/         # NPA 2023 policy
    privacy/          # Privacy policy (GDPR)
    products/         # Catalog listing & product detail
    return-policy/    # Returns & refunds
    security/         # Security overview
    terms/            # Terms & conditions
    page.tsx          # Homepage

 components/
    layout/           # Header, Footer
    legal/            # Legal page components
    product/          # ProductCard, filters, sorters
    search/           # Semantic search suggestions
    ui/               # Reusable UI primitives

 lib/
    data.ts           # Catalogue data and inventory
    embeddings.ts     # TF-IDF tokenizer & vector index
    search-engine.ts  # Ranking, filtering & sorting

 store/                # Zustand stores (cart)
 docs/                 # Full SDLC documentation
 public/               # Static assets
```

---

## SDLC Documentation

The complete software development life cycle documentation lives in [`docs/`](docs/README.md).

### Planning
| Document | Description |
|----------|-------------|
| [Project Charter](docs/01-planning/project-charter.md) | Vision, objectives, scope and stakeholders |
| [Business Case](docs/01-planning/business-case.md) | Costbenefit analysis and justification |
| [Feasibility Study](docs/01-planning/feasibility-study.md) | Technical, economic, operational, legal and schedule feasibility |
| [Risk Management](docs/01-planning/risk-management.md) | Risk register and mitigation strategies |

### Requirements
| Document | Description |
|----------|-------------|
| [Business Requirements](docs/02-requirements/business-requirements.md) | Stakeholder needs and business rules |
| [Non-Functional Requirements](docs/02-requirements/non-functional-requirements.md) | Performance, security, usability and reliability targets |
| [Compliance Requirements](docs/02-requirements/compliance-requirements.md) | Regulatory and standards obligations |
| [System Requirements Specification](docs/02-requirements/system-requirements-specification.md) | Hardware, software, performance and interface requirements |

### Design
| Document | Description |
|----------|-------------|
| [System Architecture](docs/03-design/system-architecture.md) | Layered architecture and component overview |
| [Use Case Diagram](docs/03-design/use-case-diagram.md) | UML actor/use-case diagram (UC-01  UC-12) |
| [Class Diagram](docs/03-design/class-diagram.md) | Domain model and class relationships |
| [Flowchart](docs/03-design/flowchart.md) | Checkout, search, cart and inventory flows |
| [Pseudocode](docs/03-design/pseudocode.md) | Algorithms for core system behaviour |
| [Database Design](docs/03-design/database-design.md) | Entityrelationship model and schema |
| [API Design](docs/03-design/api-design.md) | Endpoint contracts and request/response formats |
| [UI/UX Design](docs/03-design/ui-ux-design.md) | User flows, accessibility and design system |
| [Security Design](docs/03-design/security-design.md) | Threat model and controls |

### Implementation, Testing, Deployment & Support
| Document | Description |
|----------|-------------|
| [Coding Standards](docs/04-implementation/coding-standards.md) | Conventions and code quality rules |
| [Git Workflow](docs/04-implementation/git-workflow.md) | Branching and versioning strategy |
| [Test Strategy](docs/05-testing/test-strategy.md) | Test levels and approach |
| [Test Cases](docs/05-testing/test-cases.md) | Functional and non-functional test cases |
| [CI/CD Pipeline](docs/06-deployment/ci-cd-pipeline.md) | Automated build and deployment workflow |
| [Deployment Guide](docs/06-deployment/deployment-guide.md) | Build, hosting and rollback procedure |
| [Support Process](docs/07-maintenance/support-process.md) | Maintenance and user support procedures |

---

## Compliance

This project was developed against the following standards and regulations:

| Standard | Area |
|----------|------|
| **ISO/IEC/IEEE 12207** | Software life cycle processes |
| **ISO 9241-210** | Human-centred design for interactive systems |
| **ISO/IEC 25010** | Product quality model |
| **WCAG 2.1 AA** | Web accessibility |
| **GDPR** | European data protection |
| **NDPA 2023** | Nigerian Data Protection Act |
| **PCI DSS** | Payment card data security |

---

## License

Proprietary - (c) 2026 AWA Perfumes. All rights reserved.

*This project was submitted in partial fulfilment of the requirements for the **CSC 720 - E-Commerce** assignment.*
