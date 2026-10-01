# AWA Perfumes - SDLC Documentation

This directory contains the complete Software Development Life Cycle (SDLC) documentation for the AWA Perfumes e-commerce platform.

## Documentation Structure

```
docs/
├── 01-planning/
│   ├── project-charter.md
│   ├── business-case.md
│   ├── feasibility-study.md
│   └── risk-management.md
├── 02-requirements/
│   ├── business-requirements.md
│   ├── system-requirements-specification.md
│   ├── non-functional-requirements.md
│   └── compliance-requirements.md
├── 03-design/
│   ├── system-architecture.md
│   ├── database-design.md
│   ├── api-design.md
│   ├── ui-ux-design.md
│   ├── security-design.md
│   ├── use-case-diagram.md
│   ├── class-diagram.md
│   ├── flowchart.md
│   └── pseudocode.md
├── 04-implementation/
│   ├── coding-standards.md
│   └── git-workflow.md
├── 05-testing/
│   ├── test-strategy.md
│   └── test-cases.md
├── 06-deployment/
│   ├── deployment-guide.md
│   └── ci-cd-pipeline.md
└── 07-maintenance/
    └── support-process.md
```

## RUP (Rational Unified Process) Workflow

| Discipline | Document | Lifecycle Phase |
|------------|----------|-----------------|
| Business Modeling | Business Case | Inception |
| Requirements | Business Requirements | Inception |
| Analysis & Design | System Architecture | Elaboration |
| Implementation | API Design, Database Design | Construction |
| Test | Test Strategy | Construction |
| Deployment | Deployment Guide | Transition |
| Support | Support Process | Transition |

## ISO Standards Compliance

This documentation aligns with:
- ISO/IEC/IEEE 12207 - Software Life Cycle Processes
- ISO 9241-210 - Human-Centered Design for Interactive Systems
- ISO/IEC 25010 - Software Quality Models
- ISO/IEC 27001 - Information Security Management
- ISO 10002 - Complaint Handling

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint
npm run lint
```

## Core Documentation

- [Project Charter](01-planning/project-charter.md) - Project goals, scope, budget
- [Requirements](02-requirements/business-requirements.md) - Functional and non-functional requirements
- [Architecture](03-design/system-architecture.md) - System design and architecture
- [Security](03-design/security-design.md) - Security framework and controls
- [Deployment](06-deployment/deployment-guide.md) - How to deploy the platform

## Compliance Documents

- **NPA 2023** - Pakistan National Privacy Act compliance policy (app/npa-2023)
- **GDPR** - General Data Protection Regulation
- **PCI DSS** - Payment Card Industry Data Security Standard
- **WCAG 2.1** - Web Content Accessibility Guidelines
