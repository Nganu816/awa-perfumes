# Security Design Document

## 1. Security Overview

### 1.1 Security Principles
1. Defense in Depth
2. Least Privilege
3. Security by Design
4. Zero Trust

### 1.2 Threat Model (STRIDE)
| Threat | Mitigation |
|--------|------------|
| Spoofing | MFA, JWT validation |
| Tampering | Input validation, HMAC |
| Repudiation | Audit logging |
| Information Disclosure | Encryption, access control |
| Denial of Service | Rate limiting, WAF |
| Elevation of Privilege | RBAC, authorization checks |

## 2. Authentication Security

### 2.1 Password Policy
- Minimum 8 characters
- Require uppercase, lowercase, number
- Bcrypt hashing (12 rounds)

### 2.2 JWT Implementation
| Token Type | Lifetime | Storage |
|------------|----------|---------|
| Access Token | 15 minutes | HttpOnly cookie |
| Refresh Token | 7 days | HttpOnly cookie |
| Reset Token | 1 hour | Database (hashed) |

### 2.3 Session Security
- HttpOnly cookies (no XSS access)
- Secure flag (HTTPS only)
- SameSite=Strict (CSRF protection)

## 3. Data Protection

| Data State | Method | Standard |
|------------|--------|----------|
| At Rest | Database encryption | AES-256 |
| In Transit | TLS | 1.3 |
| Backups | Encrypted | AES-256 |
| PII Fields | Application-level | AES-256-GCM |

## 4. API Security

### 4.1 Rate Limiting
| Endpoint | Limit | Window |
|----------|-------|--------|
| Auth (login) | 5 requests | 15 min |
| Auth (register) | 3 requests | 1 hour |
| API General | 100 requests | 1 min |
| Checkout | 10 requests | 1 hour |

### 4.2 Security Headers
```
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

## 5. Payment Security

### 5.1 PCI DSS Compliance
- SAQ-A (Card-not-present)
- Never store card numbers
- Stripe/PayPal tokenization
- 3D Secure 2.0

### 5.2 Fraud Prevention
- Stripe Radar rules
- Address verification (AVS)
- CVV verification

## 6. Infrastructure Security

- Cloudflare WAF + DDoS protection
- Managed hosting with patching
- Encrypted database connections
- Limited production access

## 7. Compliance

### GDPR
- Consent management
- Data export (portability)
- Account deletion (erasure)
- 72-hour breach notification

### NPA 2023
- Explicit, granular consent
- Data minimization
- Cross-border transfer safeguards

## 8. Incident Response

### Response Process
1. **Detection** → Monitoring alerts
2. **Triage** → Assess severity
3. **Containment** → Limit damage
4. **Eradication** → Remove threat
5. **Recovery** → Restore services
6. **Lessons Learned** → Post-mortem

### Severity Levels
| Level | Description | Response |
|-------|-------------|----------|
| Critical | Data breach, system down | 1 hour |
| High | Security vulnerability | 4 hours |
| Medium | Suspicious activity | 24 hours |
| Low | Minor issue | 72 hours |

## 9. Security Testing

| Test | Frequency | Tool |
|------|-----------|------|
| SAST | Every commit | SonarQube |
| DAST | Weekly | OWASP ZAP |
| Dependency scan | Daily | Snyk |
| Penetration test | Quarterly | Third-party |
