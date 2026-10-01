# System Architecture Document

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Browser   │  │   Mobile    │  │   Tablet    │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         └────────────────┼────────────────┘                │
│                          │                                  │
│                    ┌─────▼─────┐                           │
│                    │   CDN     │                           │
│                    │(Cloudflare)│                           │
│                    └─────┬─────┘                           │
└──────────────────────────┼──────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                   APPLICATION LAYER                         │
├──────────────────────────┼──────────────────────────────────┤
│                    ┌─────▼─────┐                           │
│                    │  Vercel   │                           │
│                    │ (Next.js) │                           │
│                    └─────┬─────┘                           │
│                          │                                  │
│              ┌───────────┴───────────┐                     │
│              │                       │                     │
│        ┌─────▼─────┐          ┌─────▼─────┐               │
│        │  Frontend │          │  BFF API  │               │
│        │   (SSR)   │          │(Next.js)  │               │
│        └───────────┘          └─────┬─────┘               │
│                                     │                      │
│                              ┌──────▼──────┐              │
│                              │  FastAPI    │              │
│                              │  Backend    │              │
│                              └──────┬──────┘              │
└─────────────────────────────────────┼──────────────────────┘
                                      │
┌─────────────────────────────────────┼──────────────────────┐
│                      DATA LAYER     │                      │
├─────────────────────────────────────┼──────────────────────┤
│         ┌───────────────────────────┴───────────┐         │
│         │                                       │         │
│    ┌────▼────┐    ┌─────────┐    ┌─────────┐   │         │
│    │ Postgres│    │  Redis  │    │  S3     │   │         │
│    │   DB    │    │ (Cache) │    │(Images) │   │         │
│    └─────────┘    └─────────┘    └─────────┘   │         │
│                                                  │         │
└──────────────────────────────────────────────────┘
```

## 2. Technology Stack

### 2.1 Frontend
| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Next.js 14 (App Router) | React framework, SSR |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| State | Zustand | Client state (cart) |
| Fonts | Inter, Playfair Display | Typography |

### 2.2 Backend (Planned)
| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | FastAPI | Python API framework |
| ORM | SQLAlchemy 2.0 | Database access |
| Validation | Pydantic | Data schema validation |
| Migrations | Alembic | Database migrations |
| Cache | Redis | Session/Caching |

### 2.3 Data
| Database | Purpose | Hosting |
|----------|---------|---------|
| PostgreSQL 15 | Primary data store | Neon |
| Redis | Caching, sessions | Upstash |
| AWS S3 | Product images | AWS |

## 3. Authentication Flow

```
Login Request
      │
      ▼
┌─────────────┐
│  Validate   │
│  Credentials│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Generate  │
│  JWT Token  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Set HttpOnly│
│   Cookie    │
└──────┬──────┘
       │
       ▼
   Response
```

## 4. Checkout Flow (Atomicity)

### Transaction: Order Creation
The order creation process must be atomic. Steps:
1. Begin transaction
2. Create order record
3. Reserve stock for each item
4. Create payment record
5. If payment succeeds → Commit
6. If payment fails → Rollback (release stock)

### Saga Pattern for Distributed Operations
If using microservices, orchestrate with saga pattern:
1. Order Service: Create pending order
2. Inventory Service: Reserve stock → OK
3. Payment Service: Charge card → OK
4. Notification Service: Send confirmation
5. On failure at any step → compensate prior steps

## 5. Security Architecture

### Defense in Depth
```
Layer 1: Cloudflare (DDoS, WAF)
    │
    ▼
Layer 2: Vercel (Edge, SSL)
    │
    ▼
Layer 3: Next.js (CSP, CORS)
    │
    ▼
Layer 4: FastAPI (Auth, Rate Limiting)
    │
    ▼
Layer 5: Database (Encryption, Access Control)
```

## 6. Deployment Architecture

### Environments
| Environment | Purpose | URL |
|-------------|---------|-----|
| Development | Local development | localhost:3000 |
| Preview | PR previews | awa-pr-{id}.vercel.app |
| Staging | Pre-production | staging.awaperfumes.com |
| Production | Live | awaperfumes.com |

## 7. Monitoring & Observability

### Monitoring Stack
| Layer | Tool |
|-------|------|
| Frontend | Vercel Analytics, Sentry |
| Performance | Core Web Vitals |
| Errors | Sentry |
| Uptime | BetterStack |
