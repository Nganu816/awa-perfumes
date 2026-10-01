# Compliance Requirements Matrix

## 1. NPA 2023 (Pakistan National Privacy Act)

### Requirements
| ID | Requirement | Implementation |
|----|-------------|----------------|
| NPA-001 | Lawful basis for processing | Consent, contract, legitimate interest |
| NPA-002 | Consent mechanisms | Explicit, informed, granular, withdrawable |
| NPA-003 | Data minimization | Collect only necessary data |
| NPA-004 | Purpose limitation | Use data only for stated purposes |
| NPA-005 | Data quality | Ensure data accuracy, keep updated |
| NPA-006 | Storage limitation | Retain only as long as necessary |
| NPA-007 | Security measures | Technical & organizational measures |
| NPA-008 | Cross-border transfer | Adequate protection or safeguards |
| NPA-009 | Data breach notification | Within required timeframe |
| NPA-010 | Data subject rights | Access, rectification, erasure, portability |
| NPA-011 | DPO designation | Designated contact for data subjects |
| NPA-012 | Children's data | Parental consent for minors |

### Implementation Controls
1. **Consent Management Platform**
   - Cookie consent banner
   - Marketing consent (double opt-in)
   - Consent audit trail
2. **Data Subject Rights Portal**
   - Self-service data export
   - Account deletion request
   - Preference center
3. **Privacy Documentation**
   - Privacy policy (NPA-compliant)
   - Data processing agreements
   - Record of processing activities

## 2. GDPR (General Data Protection Regulation)

### Requirements
| ID | Requirement | Implementation |
|----|-------------|----------------|
| GDPR-001 | Lawful basis | Art. 6 processing |
| GDPR-002 | Consent (Art. 7) | Freely given, specific, informed |
| GDPR-003 | DPO (Art. 37) | Designated DPO contact |
| GDPR-004 | DPIA (Art. 35) | Impact assessment for high-risk processing |
| GDPR-005 | Data minimization (Art. 5) | Collect only necessary |
| GDPR-006 | Storage limitation | Automated deletion schedules |
| GDPR-007 | Right of access (Art. 15) | Data subject access requests |
| GDPR-008 | Right to rectification (Art. 16) | Account self-service |
| GDPR-009 | Right to erasure (Art. 17) | Account deletion flow |
| GDPR-010 | Data portability (Art. 20) | JSON/CSV export |
| GDPR-011 | Breach notification (Art. 33) | 72-hour notification |
| GDPR-012 | Privacy by design (Art. 25) | Default privacy settings |
| GDPR-013 | Records of processing (Art. 30) | Processing register |
| GDPR-014 | DPO (Art. 37-39) | DPO appointment |

## 3. PCI DSS (Payment Card Industry Data Security Standard)

### Requirements
| ID | Requirement | Implementation |
|----|-------------|----------------|
| PCI-001 | Network security | Firewalls, segmentation |
| PCI-002 | Secure configuration | Default credentials changed |
| PCI-003 | Protect stored data | Encryption, tokenization |
| PCI-004 | Encrypt transmission | TLS 1.3 |
| PCI-005 | Antivirus | Endpoint protection |
| PCI-006 | Secure systems | Regular patching |
| PCI-007 | Access control | Need-to-know basis |
| PCI-008 | Unique IDs | Individual authentication |
| PCI-009 | Physical access | Data center controls |
| PCI-010 | Logging | Audit trails |
| PCI-011 | Testing | Vulnerability scans, pen tests |
| PCI-012 | Policy | Security policies documented |

### PCI Compliance Strategy
- Use Stripe/PayPal (PCI-compliant processors)
- Never touch raw card data (SAQ-A)
- Tokenization for all card storage
- Quarterly ASV scans
- Annual Self-Assessment Questionnaire

## 4. WCAG 2.1 (Web Content Accessibility Guidelines)

### Requirements
| ID | Requirement | Level | Implementation |
|----|-------------|-------|----------------|
| WCAG-001 | Text alternatives | A | Alt text for images |
| WCAG-002 | Captions | A | Video captions |
| WCAG-003 | Distinguishable | A | Color not sole indicator |
| WCAG-004 | Keyboard accessible | A | Full keyboard nav |
| WCAG-005 | Time adjustable | A | No time limits |
| WCAG-006 | Seizure safe | A | No flashing content |
| WCAG-007 | Navigable | A | Skip links, titles |
| WCAG-008 | Input modalities | A | Touch targets 44x44px |
| WCAG-009 | Contrast (minimum) | AA | 4.5:1 ratio |
| WCAG-010 | Resize text | AA | Up to 200% |
| WCAG-011 | Images of text | AA | No text in images |
| WCAG-012 | Reflow | AA | No horizontal scroll |

## 5. ISO 27001 (Information Security Management)

### Alignment Controls
| Control | Implementation |
|---------|----------------|
| A.5 | Information security policies |
| A.6 | Organization of information security |
| A.7 | Human resource security |
| A.8 | Asset management |
| A.9 | Access control |
| A.10 | Cryptography |
| A.11 | Physical security |
| A.12 | Operations security |
| A.13 | Communications security |
| A.14 | System acquisition |
| A.15 | Supplier relationships |
| A.16 | Incident management |
| A.17 | Business continuity |
| A.18 | Compliance |

## 6. Compliance Timeline

| Milestone | Date | Status |
|-----------|------|--------|
| Privacy policy draft | Week 1 | Done |
| NPA compliance review | Week 2 | Done |
| GDPR compliance review | Week 2 | Done |
| PCI DSS SAQ completion | Week 3 | Pending |
| WCAG audit | Week 5 | Pending |
| Legal review | Week 6 | Pending |
| Compliance certification | Week 7 | Pending |
