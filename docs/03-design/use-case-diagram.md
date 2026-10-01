# Use Case Diagram — AWA Perfumes E-Commerce Platform

## 1. Purpose
This document describes the actors and use cases for the AWA Perfumes e-commerce platform. It captures the functional interactions between users and the system, and maps them to the FR-* requirements in the System Requirements Specification.

## 2. Actors
| Actor | Description | Primary Use Cases |
|-------|-------------|-------------------|
| Guest | Unauthenticated visitor | Browse, Search, Semantically Search, Add to Cart, Checkout |
| Customer | Registered user | All Guest actions + Manage Account, View Orders, Manage Wishlist |
| Admin | Store operator | Manage Inventory, View Admin Panel |
| System | Automated processes | Process Payment, Send Confirmation, Update Stock |

## 3. Use Case Diagram

```
                        ┌─────────────────────────────────────────────┐
                        │              AWA PERFUMES SYSTEM               │
                        │                                              │
   ┌───────────┐        │  ┌───────────────────────────────┐           │
   │           │        │  │  UC-01 Browse Catalog         │           │
   │   Guest   │────────│──│  UC-02 Search Products        │           │
   │ (Visitor) │        │  │  UC-03 Semantic Search        │           │
   └───────────┘        │  │  UC-04 Add to Cart            │           │
                        │  │  UC-05 Checkout & Payment     │           │
   ┌───────────┐        │  └───────────────┬───────────────┘           │
   │           │        │                  │                            │
   │  Customer │++++++++│++        ┌───────▼────────┐                   │
   │ (extends  │  │┐    │          │ UC-06 Manage   │                   │
   │   Guest)  │  ││    │          │ Account         │                  │
   └───────────┘  ││    │          └─────────────────┘                  │
                  ││    │  ┌─────────────────────────────┐             │
                  │└──> │  │ UC-07 View Order History     │             │
                  │     │  │ UC-08 Manage Wishlist        │             │
   ┌───────────┐  │     │  └─────────────────────────────┘             │
   │           │  │     │                                              │
   │   Admin   │──└────>│  ┌─────────────────────────────┐             │
   │           │        │  │ UC-09 Manage Inventory       │            │
   └───────────┘        │  └─────────────────────────────┘             │
                        │                                              │
   ┌───────────┐        │  ┌─────────────────────────────┐             │
   │           │        │  │ UC-10 Process Payment       │             │
   │  System   │────────│──│ UC-11 Send Confirmation     │            │
   │           │        │  │ UC-12 Update Stock           │            │
   └───────────┘        │  └─────────────────────────────┘             │
                        └─────────────────────────────────────────────┘
```

## 4. Use Case Descriptions

### UC-01 Browse Catalog
| Field | Value |
|-------|-------|
| Actor | Guest, Customer |
| Goal | View products by category |
| Preconditions | None |
| Main Flow | 1. User opens store. 2. System shows categories & featured products. 3. User selects a category or product. 4. System displays catalog or product detail. |
| Postconditions | User sees relevant products |
| FR | FR-001 |

### UC-02 Search Products
| Field | Value |
|-------|-------|
| Actor | Guest, Customer |
| Goal | Find a product by keywords |
| Main Flow | 1. User types query. 2. System returns keyword matches. |
| FR | FR-002.1 |

### UC-03 Semantic Search
| Field | Value |
|-------|-------|
| Actor | Guest, Customer |
| Goal | Find products by meaning (natural language) |
| Main Flow | 1. User types natural-language query. 2. System computes TF-IDF cosine similarity. 3. System returns ranked results with relevance scores. |
| Postconditions | Results ordered by relevance |
| FR | FR-002.2, FR-002.3, FR-002.6 |

### UC-04 Add to Cart
| Field | Value |
|-------|-------|
| Actor | Guest, Customer |
| Goal | Place a product variant in the cart |
| Main Flow | 1. User selects size variant. 2. User clicks Add to Cart. 3. System adds line item and persists cart. |
| FR | FR-003.1, FR-003.2 |

### UC-05 Checkout & Payment
| Field | Value |
|-------|-------|
| Actor | Guest, Customer |
| Goal | Purchase items |
| Main Flow | 1. User reviews cart. 2. User enters shipping details. 3. User selects payment method and pays. 4. System validates and confirms order. |
| Alternates | Payment fails → user retries |
| FR | FR-004.1 – FR-004.5 |

### UC-06 Manage Account
| Field | Value |
|-------|-------|
| Actor | Customer |
| Goal | View/edit account settings, addresses |
| Main Flow | 1. Customer opens Account. 2. System shows tabs. 3. Customer updates settings. |
| FR | FR-005.1, FR-005.2 |

### UC-07 View Order History
| Field | Value |
|-------|-------|
| Actor | Customer |
| Goal | View past orders and status |
| Main Flow | 1. Customer opens Orders. 2. System lists orders. |
| FR | FR-005.1 (BR-005) |

### UC-08 Manage Wishlist
| Field | Value |
|-------|-------|
| Actor | Customer |
| Goal | Save products for later |
| Main Flow | 1. Customer saves a product. 2. System adds to wishlist. |
| FR | FR-005.1 (BR-003) |

### UC-09 Manage Inventory
| Field | Value |
|-------|-------|
| Actor | Admin |
| Goal | View and update stock per variant |
| Main Flow | 1. Admin opens Admin Panel → Inventory. 2. System shows summary + table. 3. Admin edits stock quantity inline. 4. System updates in-stock status. |
| FR | FR-006.1 – FR-006.5 |

### UC-10 Process Payment
| Field | Value |
|-------|-------|
| Actor | System |
| Goal | Charge the customer |
| Main Flow | Triggered on checkout; Stripe/PayPal transaction. |
| FR | FR-004.5 |

### UC-11 Send Confirmation
| Field | Value |
|-------|-------|
| Actor | System |
| Goal | Notify customer of order |
| Main Flow | System sends order confirmation email. |
| FR | BR-007 |

### UC-12 Update Stock
| Field | Value |
|-------|-------|
| Actor | System |
| Goal | Decrease stock on purchase |
| Main Flow | On order commit, system decrements variant stock atomically. |
| FR | FR-006.4, FR-004.4 |

## 5. Actor–Use Case Traceability Matrix
| Actor | Use Cases |
|-------|-----------|
| Guest | UC-01, UC-02, UC-03, UC-04, UC-05 |
| Customer | UC-01 … UC-05, UC-06, UC-07, UC-08 |
| Admin | UC-09 |
| System | UC-10, UC-11, UC-12 |

## 6. References
- `02-requirements/system-requirements-specification.md`
- `03-design/class-diagram.md`
