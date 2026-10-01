# Test Cases

## 1. Authentication

### TC-AUTH-001: User Registration
- **Preconditions**: Fresh user email
- **Steps**: Navigate to /register, fill form, submit
- **Expected**: Account created, verification email sent

### TC-AUTH-002: Login Success
- **Preconditions**: Valid registered account
- **Steps**: Navigate to /login, enter credentials, submit
- **Expected**: Redirected to account, JWT cookie set

### TC-AUTH-003: Login Failure
- **Preconditions**: Invalid credentials
- **Steps**: Attempt login with wrong password
- **Expected**: Error message, no session created, rate limit applied

### TC-AUTH-004: Password Reset
- **Preconditions**: Registered email
- **Steps**: Request reset, open email link, set new password
- **Expected**: Password updated, old sessions invalidated

## 2. Product Catalog

### TC-PROD-001: Browse Products
- **Preconditions**: Products exist
- **Steps**: Navigate to /products
- **Expected**: Products displayed with images, prices, ratings

### TC-PROD-002: Filter by Category
- **Preconditions**: Categories exist
- **Steps**: Select category filter
- **Expected**: Only products in category shown

### TC-PROD-003: Product Search
- **Preconditions**: Products exist
- **Steps**: Enter search query in header
- **Expected**: Matching products shown with search highlights

### TC-PROD-004: Product Detail
- **Preconditions**: Product exists
- **Steps**: Click on product
- **Expected**: Full details, variants, images, reviews shown

## 3. Shopping Cart

### TC-CART-001: Add to Cart
- **Preconditions**: Product in stock
- **Steps**: Add product to cart
- **Expected**: Cart badge updates, item in cart

### TC-CART-002: Update Quantity
- **Preconditions**: Item in cart
- **Steps**: Increase/decrease quantity
- **Expected**: Total updates, max 10 enforced

### TC-CART-003: Remove from Cart
- **Preconditions**: Item in cart
- **Steps**: Remove item
- **Expected**: Item removed, cart empty state shown

### TC-CART-004: Cart Persistence
- **Preconditions**: Account with items in cart
- **Steps**: Logout, login again
- **Expected**: Cart items persist

## 4. Checkout

### TC-CKO-001: Guest Checkout
- **Preconditions**: Items in cart, not logged in
- **Steps**: Complete shipping, payment as guest
- **Expected**: Order created, confirmation shown

### TC-CKO-002: Card Payment
- **Preconditions**: Valid test card
- **Steps**: Enter card details, submit
- **Expected**: Payment successful, order confirmed

### TC-CKO-003: Payment Failure
- **Preconditions**: Invalid test card
- **Steps**: Enter invalid card, submit
- **Expected**: Error shown, order not created, can retry

### TC-CKO-004: Order Atomicity
- **Preconditions**: Concurrent orders for low stock
- **Steps**: Place two orders for last item
- **Expected**: Only one succeeds, stock reserved correctly

## 5. Returns

### TC-RET-001: Initiate Return
- **Preconditions**: Delivered order within 30 days
- **Steps**: Request return on order item
- **Expected**: RMA number generated, instructions shown

### TC-RET-002: Refund Processing
- **Preconditions**: Return received
- **Steps**: Process refund
- **Expected**: Refund issued, status updated

## 6. Legal & Compliance

### TC-COMP-001: Consent Capture
- **Steps**: Browse site with cookies disabled
- **Expected**: Consent banner shown, no tracking until consent

### TC-COMP-002: Data Export
- **Preconditions**: Account with data
- **Steps**: Request data export in account
- **Expected**: JSON/CSV file generated within 30 days

### TC-COMP-003: Account Deletion
- **Preconditions**: Registered account
- **Steps**: Request account deletion
- **Expected**: Account scheduled for deletion, confirmation sent

## 7. Accessibility

### TC-ACC-001: Keyboard Navigation
- **Steps**: Navigate site using only keyboard (Tab, Enter, Esc)
- **Expected**: All functions accessible, focus visible

### TC-ACC-002: Screen Reader
- **Steps**: Use screen reader across key pages
- **Expected**: Content read correctly, ARIA labels present

### TC-ACC-003: Color Contrast
- **Steps**: Audit text on all colored backgrounds
- **Expected**: All text meets 4.5:1 contrast ratio

## 8. Load & Performance

### TC-PERF-001: Page Load
- **Steps**: Measure load time on home, product, checkout
- **Expected**: < 2 seconds P95 desktop, < 3 seconds mobile

### TC-PERF-002: Concurrent Users
- **Steps**: Load test with 100 concurrent users
- **Expected**: No errors, response times within budget

### TC-PERF-003: Checkout Under Load
- **Steps**: Load test checkout flow
- **Expected**: All orders processed, no data loss
