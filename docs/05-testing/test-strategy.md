# Test Strategy Document

## 1. Testing Pyramid

```
      ┌─────────┐
      │   E2E   │  10%
      ├─────────┤
      │Integration│  20%
      ├─────────┤
      │  Unit   │  70%
      └─────────┘
```

## 2. Coverage Targets
| Type | Target |
|------|--------|
| Unit Tests | 80% |
| Integration | 70% |
| E2E | Critical paths |
| Overall | 75% |

## 3. Unit Testing

### Frontend (Vitest + Testing Library)
- Component rendering
- Event handlers
- State management
- Utility functions

### Backend (Pytest)
- Services/business logic
- Model validation (Pydantic)
- Database operations (with test fixtures)

## 4. Integration Testing
- API endpoint integration
- Database integration (test DB)
- Auth flow integration
- External services mocked

## 5. E2E Testing (Playwright)

### Critical User Journeys
1. Browse products → Add to cart → Checkout
2. Register → Login → Purchase
3. View order history → Track order
4. Initiate return → Track refund

## 6. Accessibility Testing
- Automatic: axe-core
- Manual: keyboard nav, screen reader
- WCAG 2.1 AA compliance

## 7. Performance Testing
- Lighthouse CI (performance ≥ 90)
- Load testing (k6): 100 concurrent users
- Core Web Vitals targets

## 8. Security Testing
- SAST: every commit
- DAST: weekly (OWASP ZAP)
- Dependency scan: daily (Snyk)
- Penetration test: quarterly

## 9. Test Environments
| Environment | Purpose |
|-------------|---------|
| Local | Development |
| CI | Automated tests |
| Staging | Pre-production |
| Production | Live |

## 10. Quality Gates
| Gate | Criteria |
|------|----------|
| Code coverage | ≥ 80% |
| E2E pass | 100% |
| Lighthouse | ≥ 90 |
| Security | 0 critical |
| Accessibility | 0 violations |
