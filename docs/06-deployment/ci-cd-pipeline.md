# CI/CD Pipeline

## 1. Pipeline Overview

```
Push to GitHub
      │
      ▼
GitHub Actions
      │
      ├── Lint (ESLint)
      ├── Type check (tsc)
      ├── Unit tests
      ├── Build
      │
      ▼
Deploy to Vercel (Production)
```

## 2. GitHub Actions Workflow

### Frontend Pipeline (`.github/workflows/deploy.yml`)
```yaml
name: Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 3. Quality Gates (Block Merge If)
- ESLint: no errors
- TypeScript: no type errors
- Unit tests: 80% coverage
- Build: succeeds
- Security scan: no critical vulnerabilities

## 4. Branch Protection
- `main`: require PR, 2 approvals, CI pass
- `develop`: require PR, 1 approval, CI pass

## 5. Environments
| Environment | Branch | Deploy Target |
|-------------|--------|---------------|
| Preview | PR | awapr-{id}.vercel.app |
| Staging | develop | staging.awaperfumes.com |
| Production | main | awaperfumes.com |

## 6. Rollback
- Redeploy previous successful deployment
- Database migrations: reversible (Alembic downgrade)
- Feature flags for gradual rollout
