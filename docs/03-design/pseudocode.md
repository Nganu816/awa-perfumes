# Pseudocode — AWA Perfumes E-Commerce Platform

## 1. Purpose
This document provides algorithm-level pseudocode for the core business logic, mirroring the frontend implementation (`lib/`, `store/`) and planned backend. It complements the flowcharts in `flowchart.md`.

---

## 2. Semantic Search (UC-03)

```
FUNCTION semanticSearch(query, filters):
    index = getProductIndex()              // precomputed TF-IDF vectors
    q = trim(query)

    IF length(q) < 2 OR tokenize(q) is empty:
        scored = map index → {product, score: 1.0}
    ELSE:
        queryVec = vectorizeQuery(q)
        IF queryVec is empty:
            scored = map index → {product, score: 1.0}
        ELSE:
            scored = []
            FOR doc IN index:
                score = cosineSimilarity(queryVec, doc.vector)
                IF score >= MIN_SCORE:        // MIN_SCORE = 0.03
                    scored.append({product: doc.product, score: score})

    // Apply filters
    IF filters.category != null:
        scored = scored WHERE slug(product.category) == filters.category
    IF filters.minPrice != null:
        scored = scored WHERE exists variant.price >= filters.minPrice
    IF filters.maxPrice != null:
        scored = scored WHERE exists variant.price <= filters.maxPrice
    IF filters.inStockOnly:
        scored = scored WHERE exists variant.in_stock

    // Sort
    IF filters.sort == "price-asc":   sort scored BY minPrice(asc)
    IF filters.sort == "price-desc":  sort scored BY minPrice(desc)
    IF filters.sort == "rating":      sort scored BY rating(desc)
    ELSE:                             scored already sorted BY score(desc)

    RETURN scored
```

```
FUNCTION vectorizeQuery(query):
    tokens = tokenize(query)               // lower-case, strip punctuation, drop stop words
    idf = getCorpusIdf()                   // shared IDF from product corpus
    tf = frequency map over tokens
    maxTf = max(tf.values)
    vec = empty sparse map
    FOR (term, count) IN tf:
        idfVal = idf[term]
        IF idfVal exists AND idfVal > 0:
            vec[term] = (count / maxTf) * idfVal
    RETURN vec
```

```
FUNCTION cosineSimilarity(a, b):
    IF a is empty OR b is empty: RETURN 0
    dot = 0, normA = sum a[term]^2, normB = sum b[term]^2
    denom = sqrt(normA) * sqrt(normB)
    IF denom == 0: RETURN 0
    smaller = (a.size <= b.size) ? a : b
    larger  = (a.size <= b.size) ? b : a
    FOR (term, val) IN smaller:
        IF term IN larger: dot += val * larger[term]
    RETURN dot / denom
```

---

## 3. Checkout & Payment (UC-05)

```
PROCEDURE checkout():
    IF cart is empty: redirect to /cart; RETURN

    // Step 1: Shipping
    LOOP:
        shipping = user input (name, address, city, zip, country)
        IF validateShipping(shipping): BREAK
        ELSE: show errors

    // Step 2: Payment
    LOOP:
        method = user selection (card | paypal | applepay)
        paymentData = method-specific input
        IF NOT validatePayment(method, paymentData): show errors; CONTINUE
        result = processPayment(method, paymentData)
        IF result.failed: show error; prompt retry; CONTINUE
        BREAK

    // Step 3: Commit (atomic)
    BEGIN TRANSACTION
        order = insertOrder(shipping, method, totals)
        FOR lineItem IN cart:
            variant = lineItem.variant
            IF variant.stock < lineItem.quantity:
                ROLLBACK TRANSACTION     // insufficient stock
                show error "Insufficient stock"
                RETURN
            UPDATE variant.stock -= lineItem.quantity
        insertPaymentRecord(order, result)
    COMMIT TRANSACTION

    clearCart()
    showConfirmation(order)
```

---

## 4. Cart Operations (UC-04)

```
PROCEDURE addToCart(product, variant, quantity):
    IF variant.in_stock == false: RETURN "Out of stock"
    IF quantity > MAX_PER_LINE (10): quantity = MAX_PER_LINE
    IF variant already in cart (same variant id):
        cart[line].quantity += quantity
        clamp to MAX_PER_LINE
    ELSE:
        cart.append({product, variant, quantity})
    persist(cart)
    updateCartBadge(cart.getCount())
```

```
PROCEDURE updateQuantity(lineId, newQty):
    IF newQty <= 0: cart.remove(lineId)
    ELSE: cart[lineId].quantity = min(newQty, MAX_PER_LINE)
    persist(cart)
```

```
FUNCTION cartTotals(cart):
    subtotal = sum(variant.price * quantity for each line)
    shipping = (subtotal >= 100) ? 0 : 9.99
    tax      = subtotal * 0.08
    total    = subtotal + shipping + tax
    RETURN {subtotal, shipping, tax, total}
```

---

## 5. Inventory Management (UC-09)

```
PROCEDURE updateStock(variantId, newStock):
    newStock = max(0, parseInt(newStock))     // no negatives
    variant.stock = newStock
    variant.in_stock = (newStock > 0)
    refreshBadge(variant)     // green >=10, amber 1-9, red 0
```

```
FUNCTION stockStatus(stock):
    IF stock == 0:  RETURN "Out of Stock"
    IF stock < 5:   RETURN "Critical"
    IF stock < 10:  RETURN "Low Stock"
    RETURN "In Stock"
```

---

## 6. Product Filtering & Sorting (Products Page)

```
FUNCTION applyFilters(products, opts):
    result = products
    IF opts.category: result = result WHERE slug(category) == opts.category
    IF opts.brand:    result = result WHERE brand == opts.brand
    IF opts.inStock:  result = result WHERE any variant in_stock
    result = result WHERE minPrice BETWEEN opts.priceRange[0] AND opts.priceRange[1]

    SWITCH opts.sort:
        "price-asc":  result.sort ASC by minPrice
        "price-desc": result.sort DESC by minPrice
        "rating":     result.sort DESC by rating
        "newest":     result.sort DESC by numeric id
        "relevance":  result.sort DESC by _relevance (semantic)
        default:      sort by featured/bestseller

    RETURN result
```

---

## 7. References
- `03-design/flowchart.md`
- `03-design/class-diagram.md`
- `03-design/use-case-diagram.md`
- `02-requirements/system-requirements-specification.md`
