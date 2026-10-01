# Feasibility Study: AWA Perfumes E-Commerce Platform

## Document Control
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Author | Project / Business Analyst |
| Status | Approved |
| Last Updated | September 2026 |
| References | Business Case, Project Charter |

---

## 1. Introduction

### 1.1 Purpose
This feasibility study assesses the viability of developing and launching the AWA Perfumes e-commerce platform. It evaluates five core dimensions — economic, technical, operational, schedule, and legal — to determine whether the project should proceed, and under what conditions.

### 1.2 Scope
The study covers the feasibility of a full-featured e-commerce site (product catalog, cart, checkout, payments, returns, legal compliance, admin inventory) using a modern web stack. It does **not** cover third-party logistics contracts or physical retail operations.

### 1.3 Method
Assess each feasibility area against stated goals, constraints, and risks from the Business Case and Project Charter. Each area is rated **Feasible / Feasible with Conditions / Not Feasible**.

---

## 2. Economic (Financial) Feasibility

### 2.1 Cost–Benefit Summary
| Item | Year 1 | Year 2 |
|------|--------|--------|
| Revenue (product, gift cards, subscriptions) | $3,300,000 | $5,700,000 |
| Total Costs | $1,850,000 | $3,025,000 |
| Net Profit | $1,450,000 | $2,675,000 |
| Gross Margin | 64% | 65% |

### 2.2 One-Time Development Investment
| Item | Cost |
|------|------|
| Development | $40,000 |
| Design & Branding | $10,000 |
| Security Audit | $5,000 |
| Legal Setup | $5,000 |
| **Total** | **$60,000** |

### 2.3 Annual Operating Costs
| Item | Cost |
|------|------|
| Infrastructure & Hosting | $1,200 |
| Software Licenses | $2,400 |
| Support Tools | $1,200 |
| Payment Processing Fees | Variable (2.9% + $0.30/transaction) |
| **Total (excl. payment fees)** | **$4,800** |

### 2.4 NPV / Payback Estimate
- Initial investment recouped within the first quarter given projected monthly revenue.
- Break-even point (fixed + investment costs vs. gross margin) is reached in approximately **Month 1–2** of operation.
- **Verdict:** Feasible — strong ROI, low fixed infrastructure cost.

---

## 3. Technical Feasibility

### 3.1 Technology Stack
| Layer | Technology | Maturity | Available Skills |
|-------|-----------|----------|------------------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript | High | Yes |
| Styling | Tailwind CSS | High | Yes |
| State (cart) | Zustand | High | Yes |
| Backend (planned) | Python FastAPI | High | Yes |
| Database (planned) | PostgreSQL | High | Yes |
| Payments | Stripe + PayPal | High | Yes |
| Hosting | Vercel / Node server | High | Yes |

### 3.2 Feasibility of Key Features
| Feature | Feasibility | Notes |
|---------|-------------|-------|
| Product catalog & variants | Feasible | Implemented (mock data) |
| Semantic search (TF-IDF) | Feasible | Implemented, offline, no API keys |
| Cart & checkout | Feasible | Implemented (simulated payments) |
| Real payments (Stripe/PayPal) | Feasible with conditions | Requires API keys + PCI-compliant integration not yet wired |
| Returns processing | Feasible | Policy pages implemented; workflow needs backend |
| Admin inventory | Feasible | Implemented (in-memory, session-local) |
| Auth & accounts | Feasible with conditions | UI scaffolded; backend auth required |

### 3.3 Integration Points
- Payment gateways (Stripe, PayPal)
- Email / notification service (SMTP or transactional provider)
- Shipping / logistics provider (planned)

### 3.4 Verdict
**Feasible.** All core components are proven, well-documented technologies. The current build runs successfully (lint, typecheck, and production build all pass). The main conditions are backend integration (database + auth + real payments).

---

## 4. Operational Feasibility

### 4.1 Organization Readiness
- **Staffing:** A small team can operate the platform (admin, customer support, developer for maintenance).
- **Process fit:** The system supports the return/refund, NPA 2023, terms, and privacy workflows required by business operations.
- **Admin capability:** Inventory panel enables non-technical staff to manage stock.

### 4.2 Support & Maintenance
- Follows ITIL-aligned support process (see `07-maintenance/support-process.md`).
- Dependency on Node.js runtime and npm packages; requires periodic security updates.

### 4.3 Operational Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Fraud / chargebacks | High | Payment processor fraud tools, AVS/CVV checks |
| Returns volume | Medium | Clear policy, RMA workflow, quality control |
| Order fulfilment errors | Medium | Inventory dashboard, stock alerts |

### 4.4 Verdict
**Feasible.** Operations align with existing business processes and a reasonable staffing model.

---

## 5. Schedule Feasibility

### 5.1 Proposed Timeline
| Phase | Duration |
|-------|----------|
| Planning & Requirements | 2 weeks |
| Design (architecture, UI/UX) | 3 weeks |
| Implementation (frontend) | 4–6 weeks |
| Backend & Database | 4–6 weeks |
| Testing | 2 weeks |
| Deployment & Launch | 1 week |
| **Total** | **~16–20 weeks** |

### 5.2 Critical Path Dependencies
- Frontend can proceed independently (current state).
- Backend (FastAPI + PostgreSQL) is on the critical path for launch.
- Payment integration requires gateway approval/tests.

### 5.3 Verdict
**Feasible.** A 4–5 month timeline is achievable with a committed team. Frontend work is largely complete; backend is the remaining driver.

---

## 6. Legal & Compliance Feasibility

### 6.1 Regulatory Requirements
| Requirement | Status |
|-------------|--------|
| NPA 2023 (privacy) | Policy documented, compliant approach |
| GDPR (EU customers) | Policy documented, DPO designated |
| CCPA (US customers) | Privacy policy covers rights |
| PCI DSS (payments) | Requires compliant payment flow (Stripe handles) |
| WCAG 2.1 AA (accessibility) | Design follows human-centered standards |

### 6.2 Verdict
**Feasible with conditions.** Policies are documented in-app and in docs. Real compliance (consent management, data subject request workflows, PCI scope) requires backend implementation.

---

## 7. Overall Feasibility Assessment

| Area | Rating |
|------|--------|
| Economic | Feasible |
| Technical | Feasible |
| Operational | Feasible |
| Schedule | Feasible |
| Legal | Feasible with conditions |

### Overall Recommendation
**PROCEED** with development. The project is economically sound, technically achievable, and operationally aligned. Phase 1 (current) delivers the frontend foundation; Phase 2 must implement the FastAPI backend, PostgreSQL database, real payment integration, and authentication before production launch.

---

## 8. Key Assumptions & Constraints

- Mock product data will be replaced with real backend data.
- Payments are currently simulated; production requires Stripe/PayPal keys.
- Inventory edits are session-local until a database is introduced.
- Operating globally requires GDPR/CCPA/NPA compliance maintained over time.

## 9. References
- `01-planning/business-case.md`
- `01-planning/project-charter.md`
- `01-planning/risk-management.md`
- `02-requirements/business-requirements.md`
- `02-requirements/system-requirements-specification.md`
