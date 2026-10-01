# Database Design Document

## 1. Entity Relationship Diagram (Core Tables)

```
users 1───* addresses
users 1───* orders
orders 1───* order_items  *───1 products
products 1───* product_variants
products 1───* product_images
products *───1 categories
orders 1───* payments
users 1───* consent_logs
users 1───* audit_logs
users 1───* cart_items
users 1───* wishlists
users 1───* reviews  *───1 products
```

## 2. Key Schemas

### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    password_hash VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### products
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    brand VARCHAR(255),
    scent_top VARCHAR(500),
    scent_heart VARCHAR(500),
    scent_base VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### orders
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    guest_email VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) DEFAULT 0,
    shipping DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    shipping_address_id UUID REFERENCES addresses(id),
    billing_address_id UUID REFERENCES addresses(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| users | idx_users_email | email | Login lookup |
| products | idx_products_slug | slug | URL routing |
| products | idx_products_category | category_id | Category filter |
| orders | idx_orders_user | user_id | Order history |
| orders | idx_orders_status | status | Status filter |
| order_items | idx_order_items_order | order_id | Order details |
| reviews | idx_reviews_product | product_id | Product reviews |

## 4. Data Retention

| Data Type | Retention Period | Deletion Method |
|-----------|------------------|-----------------|
| User accounts | Until deletion request | Soft delete |
| Order data | 7 years (tax) | Archive then delete |
| Cart/Wishlist | Until account deletion | Cascade delete |
| Consent logs | 3 years | Automatic purge |
| Audit logs | 5 years | Automatic purge |

## 5. Backup Strategy

| Type | Frequency | Retention |
|------|-----------|-----------|
| Full backup | Daily | 30 days |
| WAL archives | Continuous | 7 days |
| Logical backup | Weekly | 12 weeks |

## 6. ACID Compliance

PostgreSQL provides full ACID compliance:
- **Atomicity**: Transactions are all-or-nothing
- **Consistency**: Constraints maintain data integrity
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data survives failures

### Transaction Example (Order Creation)
```sql
BEGIN;
INSERT INTO orders (...) VALUES (...);
UPDATE product_variants SET stock = stock - 1 WHERE id = ...;
INSERT INTO order_items (...) VALUES (...);
INSERT INTO payments (...) VALUES (...);
COMMIT;  -- All-or-nothing
-- ROLLBACK on any failure
```
