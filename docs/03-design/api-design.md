# API Design Document

## 1. API Overview

| Property | Value |
|----------|-------|
| Style | RESTful |
| Format | JSON |
| Authentication | JWT Bearer |
| Versioning | URL path (/api/v1/) |
| Documentation | OpenAPI 3.0 |

## 2. Authentication

### POST /api/v1/auth/register
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

### POST /api/v1/auth/login
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
Response: `{ "access_token": "...", "refresh_token": "..." }`

## 3. Products

### GET /api/v1/products
Query params: `category`, `min_price`, `max_price`, `brand`, `sort`, `page`, `limit`

### GET /api/v1/products/:slug
Returns full product detail with variants, images, reviews.

## 4. Cart

### GET /api/v1/cart
Returns cart with items, subtotal, shipping, total.

### POST /api/v1/cart/items
```json
{ "variant_id": "uuid", "quantity": 1 }
```

## 5. Checkout

### POST /api/v1/checkout
```json
{
  "shipping_address": { "...": "..." },
  "payment_method": "stripe",
  "payment_token": "tok_...",
  "email": "user@example.com"
}
```
Response: `{ "order": {...}, "payment": {...} }`

## 6. Orders

### GET /api/v1/orders
Returns list of user orders.

### GET /api/v1/orders/:id
Returns full order detail with items, shipping, tracking.

### POST /api/v1/orders/:id/cancel
Cancels order (pending/processing only) and processes refund.

## 7. Returns

### POST /api/v1/returns
```json
{
  "order_id": "uuid",
  "items": [{ "order_item_id": "uuid", "reason": "..." }]
}
```
Response: Returns RMA number and instructions.

## 8. Users

### GET /api/v1/users/me
Returns current user profile with addresses and preferences.

### PUT /api/v1/users/me
Updates user profile.

## 9. Compliance

### POST /api/v1/consent
```json
{ "type": "marketing_email", "granted": true }
```

### POST /api/v1/data/export
Returns 202 with initiation message. Provides JSON/CSV download.

### DELETE /api/v1/account
Schedules account deletion (30 days per GDPR).

## 10. Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [{ "field": "email", "message": "Invalid format" }]
  }
}
```

### Error Codes
| Code | HTTP | Description |
|------|------|-------------|
| VALIDATION_ERROR | 400 | Invalid input |
| UNAUTHORIZED | 401 | Auth required |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Already exists |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |
