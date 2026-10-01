# Git Workflow

## 1. Branching Strategy

```
main (production)
  │
  ├── develop (integration)
  │     │
  │     ├── feature/user-auth
  │     ├── feature/product-catalog
  │     └── feature/checkout
  │
  └── hotfix/security-patch
```

## 2. Branch Types
| Branch | Purpose | Merges Into |
|--------|---------|-------------|
| main | Production | - |
| develop | Integration | main |
| feature | New features | develop |
| bugfix | Bug fixes | develop |
| hotfix | Urgent fixes | main + develop |
| release | Release prep | main + develop |

## 3. Workflow

### Feature Development
```bash
git checkout develop
git checkout -b feature/user-auth
# ... develop ...
git add .
git commit -m "feat(auth): add login form"
git push origin feature/user-auth
# Create PR → code review → CI passes → merge
```

## 4. Commit Convention
Format: `type(scope): description`

| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| style | Formatting |
| refactor | Refactoring |
| test | Tests |
| chore | Build/config |

## 5. Pull Request Process
- PR template with description, type, checklist
- Minimum 1 approval required
- CI must pass
- No merge conflicts

## 6. Protected Branches
- **main**: require PR, 2 approvals, CI pass
- **develop**: require PR, 1 approval, CI pass

## 7. Releases
Semantic versioning:
```
MAJOR.MINOR.PATCH
v2.0.0 = Breaking
v1.1.0 = New feature
v1.1.1 = Bug fix
```
