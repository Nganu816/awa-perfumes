# Coding Standards

## 1. General Principles
1. Clean, readable code
2. DRY (Don't Repeat Yourself)
3. KISS (Keep It Simple)
4. YAGNI (You Aren't Gonna Need It)
5. Single Responsibility Principle

## 2. TypeScript/JavaScript

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userName` |
| Functions | camelCase | `getUser` |
| Components | PascalCase | `ProductCard` |
| Constants | UPPER_SNAKE_CASE | `API_URL` |
| Files | kebab-case | `product-card.tsx` |

### TypeScript Rules
- Use explicit types (no `any`)
- Prefer interfaces over types
- Use enums for constants
- Use `unknown` instead of `any` when needed

## 3. Python (FastAPI)

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Variables | snake_case | `user_name` |
| Functions | snake_case | `get_user` |
| Classes | PascalCase | `UserModel` |
| Constants | UPPER_SNAKE_CASE | `API_PREFIX` |

### Style
- Use type hints
- Docstrings for public functions
- Max function: 50 lines
- Max file: 500 lines

## 4. CSS/Tailwind
- Utility-first approach
- Only custom classes for repeated patterns
- Consistent class ordering

## 5. Git Standards

### Commit Messages
```
type(scope): description
feat(auth): add login
fix(cart): fix quantity bug
docs(readme): update
```

### Branch Names
```
feature/user-auth
bugfix/cart-issue
hotfix/security-patch
```

## 6. File Organization

```
components/
├── ui/           # Base components
├── layout/       # Header, Footer
├── product/      # Product-specific
└── legal/        # Legal page components

lib/              # Utilities, data
store/            # Zustand stores
app/              # Next.js App Router pages
```

## 7. Testing Standards
- Test naming: descriptive, behavior-focused
- AAA structure (Arrange, Act, Assert)
- Coverage target: 80%

## 8. Documentation
- Comments explain WHY, not WHAT
- JSDoc for public functions
- Keep README updated
