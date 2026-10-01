# Deployment Guide

## 1. Prerequisites

### Required Accounts
- [ ] Vercel (Frontend)
- [ ] Railway (Backend, planned)
- [ ] Neon (Database)
- [ ] Cloudflare (DNS/CDN)
- [ ] Stripe (Payments)
- [ ] PayPal (Payments)
- [ ] GitHub (Source Control)

## 2. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

## 3. Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.awaperfumes.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 4. Frontend Deployment (Vercel)

1. Import GitHub repository
2. Framework: Next.js
3. Build command: `npm run build`
4. Add environment variables
5. Deploy → Production

### Custom Domain
```
1. Settings → Domains
2. Add awaperfumes.com
3. Configure DNS:
   - A: 76.76.21.21
   - CNAME: cname.vercel-dns.com
```

## 5. Backend Deployment (planned, FastAPI)

```bash
# Railway
railway init
railway up    # deploy
railway logs  # view logs
```

## 6. CI/CD Pipeline

### GitHub Actions
```yaml
on:
  push:
    branches: [main]

jobs:
  deploy:
    steps:
      - checkout
      - setup-node
      - npm ci
      - npm test
      - npm run lint
      - npm run build
      - deploy to vercel
```

## 7. Rollback Procedure

### Frontend
```bash
# Vercel dashboard → Deployments → previous → Promote
vercel rollback
```

### Database
```bash
# Backend only
alembic downgrade -1
```

## 8. Post-Deployment Checklist
- [ ] Health endpoints responding
- [ ] SSL valid
- [ ] Payments working (test mode)
- [ ] Monitoring/alerts configured
- [ ] Backups verified
- [ ] Security headers present
