# Flowchart — AWA Perfumes E-Commerce Platform

## 1. Purpose
This document provides flowcharts for the key business processes of the AWA Perfumes platform: **Checkout & Payment**, **Semantic Search**, **Inventory Update**, and **Add to Cart**.

---

## 2. Checkout & Payment Flow (UC-05)

```
                        START
                          │
                          ▼
              ┌─────────────────────┐
              │  User reviews cart  │  ◄── Cart is non-empty
              └─────────┬───────────┘
                        ▼
                  ┌─────────────┐
                  │   Cart      │
                  │  empty?     │
                  └──┬──────┬───┘
                    YES      NO
                     │       │
                     ▼       ▼
              ┌──────────┐  ┌──────────────────┐
              │ Redirect │  │ Enter shipping   │
              │  to cart │  │ details          │
              └──────────┘  └────────┬─────────┘
                                     │ validate
                                     ▼
                              ┌───────────────┐
                    NO ┌──────│ Valid?        │──────┐
                       │      └───────────────┘      │ YES
                       │          (show errors)      │
                       ▼                              ▼
                ┌───────────────┐           ┌──────────────────┐
                │ Return to     │           │ Select payment   │
                │ shipping step │           │ method           │
                └───────────────┘           └────────┬─────────┘
                                                      ▼
                                               ┌─────────────┐
                                               │ Process     │
                                               │ payment     │
                                               └──────┬──────┘
                                                      │
                                           ┌──────────┴──────────┐
                                           │                     │
                                       FAILED                 SUCCESS
                                           │                     │
                                           ▼                     ▼
                                  ┌─────────────────┐   ┌─────────────────────┐
                                  │ Show error,     │   │ Create order        │
                                  │ allow retry     │   │ (transaction)       │
                                  └─────────────────┘   │ decrement stock     │
                                                         ├─────────────────────┤
                                                         │ Show confirmation   │
                                                         └─────────────────────┘
                                                                      │
                                                                      ▼
                                                                   (END)
```

### Notes
- Payment and order creation must be **atomic** (see `security-design.md`).
- On failure at any step, prior writes roll back / are compensated.

---

## 3. Semantic Search Flow (UC-03)

```
                        START
                          │
                          ▼
              ┌─────────────────────┐
              │  User types query   │
              └─────────┬───────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │  Query length >= 2? │
              └──┬──────────────┬───┘
                NO               YES
                 │               │
                 ▼               ▼
          ┌──────────────┐  ┌──────────────────────────┐
          │ Return all   │  │ Tokenize query           │
          │ products     │  │ (remove stop words)      │
          └──────────────┘  └───────────┬──────────────┘
                                        ▼
                                 ┌──────────────┐
                                 │ Build TF-IDF │
                                 │ query vector │
                                 └──────┬───────┘
                                        ▼
                                 ┌───────────────────┐
                                 │ Cosine similarity  │
                                 │ vs each product    │
                                 └─────────┬─────────┘
                                           ▼
                                 ┌───────────────────┐
                                 │ Filter score >=   │
                                 │ threshold         │
                                 └─────────┬─────────┘
                                           ▼
                                 ┌───────────────────┐
                                 │ Sort by relevance │
                                 └─────────┬─────────┘
                                           ▼
                                 ┌───────────────────┐
                                 │ Apply user filters│
                                 │ (cat/price/stock) │
                                 └─────────┬─────────┘
                                           ▼
                                     Return results
                                           │
                                           ▼
                                         (END)
```

---

## 4. Inventory Update Flow (UC-09)

```
                        START
                          │
                          ▼
              ┌─────────────────────┐
              │  Admin opens        │
              │  Admin > Inventory  │
              └─────────┬───────────┘
                        ▼
              ┌─────────────────────┐
              │  System shows       │
              │  summary + table    │
              └─────────┬───────────┘
                        ▼
              ┌─────────────────────┐
              │  Admin clicks      │
              │  Edit on a variant │
              └─────────┬───────────┘
                        ▼
              ┌─────────────────────┐
              │  Enter new stock    │
              │  quantity           │
              └─────────┬───────────┘
                        ▼
              ┌─────────────────────┐
              │  Validate: qty >= 0 │────────── NO ──► (reject / keep old)
              └─────────┬───────────┘
                        │ YES
                        ▼
              ┌─────────────────────────┐
              │  update stock           │
              │  update in_stock =       │
              │     (stock > 0)          │
              └─────────┬───────────────┘
                        ▼
              ┌─────────────────┐
              │  Color-code     │
              │  status badge   │
              └─────────┬───────┘
                        ▼
                      (END)
```

---

## 5. Add to Cart Flow (UC-04)

```
                    START
                      │
                      ▼
            ┌───────────────────┐
            │ User selects      │
            │ size variant      │
            └─────────┬─────────┘
                      │
                      ▼
            ┌───────────────────┐
            │ Click Add to Cart │
            └─────────┬─────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │ Variant in stock?   │
            └──┬──────────────┬───┘
               NO              YES
               │               │
               ▼               ▼
        ┌─────────────┐  ┌────────────────────────┐
        │ Disable/    │  │ Add line item to cart  │
        │ show OOS    │  │ persist (localStorage) │
        └─────────────┘  └───────────┬────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Update cart      │
                            │ badge count      │
                            └─────────┬────────┘
                                      │
                                      ▼
                                    (END)
```

## 6. Symbols Legend
| Symbol | Meaning |
|--------|---------|
| Rounded rectangle | Start / End |
| Rectangle | Process / action |
| Diamond | Decision / branch |
| Arrow | Control flow |

## 7. References
- `03-design/use-case-diagram.md` (UC-03, UC-04, UC-05, UC-09)
- `03-design/pseudocode.md`
- `02-requirements/system-requirements-specification.md`
