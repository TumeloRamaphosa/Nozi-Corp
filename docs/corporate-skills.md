# Corporate Skills Integration

How Nozi-Corp uses [w95/awesome-claude-corporate-skills](https://github.com/w95/awesome-claude-corporate-skills) via **curated copy + adapter** — not a full tree of 166 skills.

## Upstream Facts

| Item | Value |
|------|--------|
| Repository | https://github.com/w95/awesome-claude-corporate-skills |
| Curator license | **MIT** — Copyright (c) 2026 Enrike |
| Scale | 166 skills across 14 corporate role categories; we curate **15** for the FSP demo v1 |
| Individual skill sources | Anthropic FSP, Anthropic KWP, Anthropic Skills, Community, Custom — see per-skill headers |

Prefer Anthropic FSP/KWP/Custom upstream sources. Individual upstream skills may carry their own terms; each adapted file cites its source in the header.

## Adapter Pattern

Each corporate skill in `skills/corporate/` follows:

```
skills/corporate/<id>.md   # Adapted SKILL.md playbook + Nozi FSP demo overlay
```

### Required header

```markdown
> **Adapted from** w95/awesome-claude-corporate-skills `<upstream-path>/SKILL.md` (source: …)
```

### Nozi overlay (per category)

- **Legal/compliance** skills: POPIA alongside GDPR/CCPA, FSCA/FAIS public citations, educational-demo disclaimer
- **Finance** skills: assumption labelling, no product picks, practitioner review framing
- **Executive** skills: source attribution, confidence scoring, route decisions to practitioner

Reference subdocs and scripts from upstream (e.g. DCF `scripts/`, `references/`) are **not** vendored. Link upstream for full tooling.

Seed script resolves `contentFile` → `content` at seed time (same as agency-agents skills).

## Tier-1 Allowlist (15 skills)

### 06 — Legal & Compliance (Anthropic KWP)

| Skill ID | Upstream path | MC skill ID |
|----------|---------------|-------------|
| `compliance` | `06-legal-compliance/compliance` | `skill_corp_compliance` |
| `compliance-tracking` | `06-legal-compliance/compliance-tracking` | `skill_corp_compliance_tracking` |
| `legal-risk-assessment` | `06-legal-compliance/legal-risk-assessment` | `skill_corp_legal_risk_assessment` |
| `contract-review` | `06-legal-compliance/contract-review` | `skill_corp_contract_review` |
| `nda-triage` | `06-legal-compliance/nda-triage` | `skill_corp_nda_triage` |

### 02 — Finance & Accounting (Anthropic FSP)

| Skill ID | Upstream path | MC skill ID |
|----------|---------------|-------------|
| `3-statements` | `02-finance-accounting/3-statements` | `skill_corp_3_statements` |
| `dcf-model` | `02-finance-accounting/dcf-model` | `skill_corp_dcf_model` |
| `comps-analysis` | `02-finance-accounting/comps-analysis` | `skill_corp_comps_analysis` |
| `check-model` | `02-finance-accounting/check-model` | `skill_corp_check_model` |
| `unit-economics` | `02-finance-accounting/unit-economics` | `skill_corp_unit_economics` |
| `financial-plan` | `02-finance-accounting/financial-plan` | `skill_corp_financial_plan` |
| `dd-checklist` | `02-finance-accounting/dd-checklist` | `skill_corp_dd_checklist` |
| `client-review` | `02-finance-accounting/client-review` | `skill_corp_client_review` |

### 01 — Executive Leadership (Anthropic KWP)

| Skill ID | Upstream path | MC skill ID |
|----------|---------------|-------------|
| `knowledge-synthesis` | `01-executive-leadership/knowledge-synthesis` | `skill_corp_knowledge_synthesis` |
| `risk-assessment` | `01-executive-leadership/risk-assessment` | `skill_corp_risk_assessment` |

## Agent Mapping

| Nozi agent | Corporate skills |
|------------|------------------|
| `financial-analyst` | `3-statements`, `dcf-model`, `check-model`, `comps-analysis`, `unit-economics` |
| `fsp-compliance-advisor` | `compliance`, `compliance-tracking`, `legal-risk-assessment`, `contract-review`, `nda-triage` |
| `legal-compliance-checker` | `compliance`, `compliance-tracking`, `legal-risk-assessment`, `contract-review`, `nda-triage` |
| `loan-officer-assistant` | `financial-plan`, `client-review`, `dd-checklist` |
| `fsp-intake-specialist` | `financial-plan`, `client-review`, `dd-checklist` |
| `agents-orchestrator` | `knowledge-synthesis`, `risk-assessment` |
| `research-synthesist` | `knowledge-synthesis`, `risk-assessment` |

Agents retain existing agency-agents and Nozi wrapper skills (`skill_nozi_demo_disclaimer`, `skill_fsp_sa_context`, etc.).

## What We Skip (v1)

- Full finance dump (LBO, CIM, sell-side depth, S&P Global plugins)
- Apollo / Common Room / sales prospecting integrations
- Marketing, sales, HR, engineering, and other non-FSP categories
- Upstream `scripts/`, `references/`, and sibling SKILL folders outside the allowlist

Link upstream for everything else: https://github.com/w95/awesome-claude-corporate-skills

## Regeneration

To re-adapt from a local clone of the upstream repo:

```bash
CORPORATE_SKILLS_SRC=/path/to/awesome-claude-corporate-skills node scripts/adapt-corporate-skills.mjs
```

Selection list: this document. Per-skill source notes: `NOTICE`.

## Upstream MIT License (curator)

```
MIT License
Copyright (c) 2026 Enrike
```

Full text: https://github.com/w95/awesome-claude-corporate-skills/blob/main/LICENSE
