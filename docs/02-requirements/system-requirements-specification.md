# System Requirements Specification (SRS) — AWA Perfumes E-Commerce Platform

## Document Control
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Author | Systems / Requirements Analyst |
| Status | Approved |
| Last Updated | September 2026 |
| References | Business Requirements, Feasibility Study |

---

## 1. Introduction

### 1.1 Purpose
This System Requirements Specification (SRS) defines the functional and non-functional requirements of the AWA Perfumes e-commerce platform, including the hardware and software environment required to run it. It describes what the system must do, the constraints it must satisfy, and how it should perform.

### 1.2 Scope
The system is a web-based e-commerce storefront for premium perfume products. It includes a customer-facing store (catalog, search, cart, checkout, account, legal pages) and an administrative inventory management panel. It operates globally with compliance to NPA 2023, GDPR, CCPA, and PCI DSS.

### 1.3 Intended Audience
Developers, testers, project managers, stakeholders, and the operations/admin team.

### 1.4 Product Perspective
The system is a new web application. Phase 1 provides the frontend with mock data; Phase 2 connects a Python (FastAPI) backend with a PostgreSQL database.

---

## 2. Overall Description

### 2.1 Product Functions
- Browse and search the product catalog (keyword + semantic search).
- Manage a persistent shopping cart.
- Complete a multi-step checkout with simulated payments (Stripe/PayPal to be integrated).
- Manage customer accounts and order history.
- Administer inventory (stock levels per variant).
- Present legal/compliance content (returns, terms, privacy, NPA 2023, security).

### 2.2 User Characteristics
| Role | Description |
|------|-------------|
| Guest | Browse and purchase without account |
| Customer | Registered user with account, orders, wishlist |
| Admin | Manages inventory and store operations |

### 2.3 Operating Environment
- **Server:** Node.js 20+ (runtime), Next.js 14 App Router, Python 3.12 FastAPI (backend, planned), PostgreSQL 15+ (data).
- **Client:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge) on desktop and mobile.
- **Deployment:** Node server or Vercel; frontend bundles are statically generated where possible.

### 2.4 Design & Implementation Constraints
- TypeScript for type safety.
- Tailwind CSS with lilac/purple theme and defined design system.
- Semantic search must work offline without external API keys (TF-IDF).
- Compliance-first copy for all legal pages.

---

## 3. System Features & Functional Requirements

### FR-001 Product Catalog
| ID | Requirement |
|----|-------------|
| FR-001.1 | System SHALL display products grouped by category (Women's, Men's, Unisex, Gift Sets, Accessories). |
| FR-001.2 | Each product SHALL show name, description, brand, images, scent notes, rating, price, and available sizes. |
| FR-001.3 | System SHALL provide product detail pages with SEO-friendly slugs. |
| FR-001.4 | System SHALL support multiple variants (size in ml) per product, each with its own SKU, price, and stock. |

### FR-002 Search & Discovery
| ID | Requirement |
|----|-------------|
| FR-002.1 | System SHALL support keyword search by name, brand, and description. |
| FR-002.2 | System SHALL provide semantic search using TF-IDF cosine similarity so natural-language queries (e.g. "floral for summer") return relevant products. |
| FR-002.3 | Search results SHALL display a relevance score. |
| FR-002.4 | System SHALL support filtering by category, brand, price range, and in-stock status. |
| FR-002.5 | System SHALL support sorting by relevance, price, rating, and newness. |
| FR-002.6 | Header SHALL offer live search suggestions with thumbnails and relevance badges. |

### FR-003 Shopping Cart
| ID | Requirement |
|----|-------------|
| FR-003.1 | System SHALL let users add products (by variant) to a cart. |
| FR-003.2 | Cart SHALL persist across sessions (localStorage). |
| FR-003.3 | Users SHALL update quantity and remove items. |
| FR-003.4 | Quantity SHALL be limited to a maximum per line item. |
| FR-003.5 | Cart SHALL display subtotal, shipping, tax, and total. |

### FR-004 Checkout & Payment
| ID | Requirement |
|----|-------------|
| FR-004.1 | Checkout SHALL follow a multi-step flow (Shipping → Payment → Review). |
| FR-004.2 | System SHALL validate shipping and payment form inputs. |
| FR-004.3 | Payment methods SHALL include card, PayPal, and Apple Pay (simulated in Phase 1). |
| FR-004.4 | Checkout SHALL provide an order confirmation. |
| FR-004.5 | (Phase 2) System SHALL integrate Stripe and PayPal for real payments. |

### FR-005 Account Management
| ID | Requirement |
|----|-------------|
| FR-005.1 | Account page SHALL provide tabs: Overview, Orders, Addresses, Wishlist, Settings, Privacy. |
| FR-005.2 | (Phase 2) System SHALL support registration, login, password reset, and email verification. |

### FR-006 Inventory Management (Admin)
| ID | Requirement |
|----|-------------|
| FR-006.1 | Admin SHALL view all products and variants in a single inventory table. |
| FR-006.2 | Admin SHALL see summary stats: total products, total SKUs, low stock (<10), out of stock. |
| FR-006.3 | Admin SHALL edit stock quantity per variant inline. |
| FR-006.4 | System SHALL derive in-stock status from stock quantity. |
| FR-006.5 | Inventory table SHALL support search, sort, and color-coded stock indicators. |

### FR-007 Legal & Compliance Content
| ID | Requirement |
|----|-------------|
| FR-007.1 | System SHALL provide Return & Refund Policy page. |
| FR-007.2 | System SHALL provide Terms & Conditions page. |
| FR-007.3 | System SHALL provide Privacy Policy page. |
| FR-007.4 | System SHALL provide NPA 2023 Policy page. |
| FR-007.5 | System SHALL provide Security page. |

### FR-008 Content / Misc Pages
| ID | Requirement |
|----|-------------|
| FR-008.1 | System SHALL provide a Home page with hero, featured products, and testimonials. |
| FR-008.2 | System SHALL provide a Contact page with form and FAQ. |
| FR-008.3 | System SHALL provide a health check API endpoint. |

---

## 4. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-001 | Performance | Pages SHALL load within 3 seconds on a standard broadband connection. |
| NFR-002 | Performance | Semantic search SHALL return results in under 200 ms for the catalog. |
| NFR-003 | Usability | System SHALL meet WCAG 2.1 AA accessibility. |
| NFR-004 | Usability | Layout SHALL be responsive across desktop, tablet, and mobile. |
| NFR-005 | Reliability | System SHALL have 99.9% uptime in production. |
| NFR-006 | Security | All traffic SHALL be HTTPS; payment data handled per PCI DSS. |
| NFR-007 | Security | Passwords and sensitive data SHALL be stored securely (hashed/salted) in Phase 2. |
| NFR-008 | Privacy | System SHALL comply with NPA 2023, GDPR, and CCPA. |
| NFR-009 | Maintainability | Code SHALL be TypeScript-typed, lint-clean, and modular. |
| NFR-010 | Scalability | Architecture SHALL support growth to 10,000+ products and concurrent users. |

---

## 5. External Interface Requirements

### UI
- Consistent lilac (#C8A2C8) / purple (#6B21A8) branding across all screens.
- Typography: Playfair Display (headings), Inter (body).

### Software Interfaces
- API endpoints: `GET /api/health`, `GET /api/products`, `GET /api/search`.
- Planned: FastAPI backend REST API, PostgreSQL.

### Communication Interfaces
- HTTPS over the web.
- (Planned) Email notifications via SMTP/transactional provider.

---

## 6. Hardware & Software Requirements

### 6.1 Development Environment
| Item | Requirement |
|------|-------------|
| OS | Windows / macOS / Linux |
| Node.js | v20 LTS+ |
| Package Manager | npm 10+ |
| Editor | Any (VS Code recommended) |

### 6.2 Production Server
| Item | Minimum | Recommended |
|------|---------|-------------|
| CPU | 1 vCPU | 2 vCPU |
| RAM | 1 GB | 2 GB |
| Storage | 10 GB SSD | 30 GB SSD |
| Network | 100 Mbps | 1 Gbps |
| Runtime | Node.js 20+ | Node.js 20+ |

### 6.3 Database (Phase 2)
| Item | Requirement |
|------|-------------|
| DBMS | PostgreSQL 15+ |
| Hosting | Managed cloud (e.g., RDS/Supabase) or self-hosted |

### 6.4 Client Requirements
| Item | Requirement |
|------|-------------|
| Browsers | Latest Chrome, Firefox, Safari, Edge |
| Screen | Responsive, 320px and larger |
| JavaScript | Enabled |

---

## 7. Assumptions & Dependencies
- Semantic search operates on the current in-memory catalog; production will index the database.
- Payments are simulated until Stripe/PayPal keys are provisioned (Phase 2).
- Inventory is session-local until PostgreSQL is connected (Phase 2).
- Global operations assume the ability to maintain GDPR/CCPA/NPA compliance.

## 8. Traceability
Requirements map to the SDLC workflow in `docs/README.md` (RUP phases: Inception → Elaboration → Construction → Transition) and to test cases in `05-testing/test-cases.md`.

## 9. References
- `02-requirements/business-requirements.md`
- `02-requirements/compliance-requirements.md`
- `02-requirements/non-functional-requirements.md`
- `01-planning/feasibility-study.md`
