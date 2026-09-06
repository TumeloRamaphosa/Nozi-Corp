# Pull Corporate Skills (Tier-1 Allowlist)

Curated selection from [w95/awesome-claude-corporate-skills](https://github.com/w95/awesome-claude-corporate-skills) for the Nozi-Corp FSP demo.

**Do not** clone the full 166-skill tree into this repo. Use `scripts/adapt-corporate-skills.mjs` after cloning upstream locally.

## Tier-1 (15 skills)

| ID | Upstream path | Source | Primary agents |
|----|---------------|--------|----------------|
| compliance | `06-legal-compliance/compliance` | Anthropic KWP | fsp-compliance-advisor, legal-compliance-checker |
| compliance-tracking | `06-legal-compliance/compliance-tracking` | Anthropic KWP | fsp-compliance-advisor, legal-compliance-checker |
| legal-risk-assessment | `06-legal-compliance/legal-risk-assessment` | Anthropic KWP | fsp-compliance-advisor, legal-compliance-checker |
| contract-review | `06-legal-compliance/contract-review` | Anthropic KWP | legal-compliance-checker |
| nda-triage | `06-legal-compliance/nda-triage` | Anthropic KWP | legal-compliance-checker |
| 3-statements | `02-finance-accounting/3-statements` | Anthropic FSP | financial-analyst |
| dcf-model | `02-finance-accounting/dcf-model` | Anthropic FSP | financial-analyst |
| comps-analysis | `02-finance-accounting/comps-analysis` | Anthropic FSP | financial-analyst |
| check-model | `02-finance-accounting/check-model` | Anthropic FSP | financial-analyst |
| unit-economics | `02-finance-accounting/unit-economics` | Anthropic FSP | financial-analyst |
| financial-plan | `02-finance-accounting/financial-plan` | Anthropic FSP | loan-officer-assistant, fsp-intake-specialist |
| dd-checklist | `02-finance-accounting/dd-checklist` | Anthropic FSP | loan-officer-assistant, fsp-intake-specialist |
| client-review | `02-finance-accounting/client-review` | Anthropic FSP | loan-officer-assistant, fsp-intake-specialist |
| knowledge-synthesis | `01-executive-leadership/knowledge-synthesis` | Anthropic KWP | agents-orchestrator, research-synthesist |
| risk-assessment | `01-executive-leadership/risk-assessment` | Anthropic KWP | agents-orchestrator, research-synthesist |

## Regenerate

```bash
git clone --depth 1 https://github.com/w95/awesome-claude-corporate-skills.git /tmp/awesome-claude-corporate-skills
CORPORATE_SKILLS_SRC=/tmp/awesome-claude-corporate-skills node scripts/adapt-corporate-skills.mjs
node scripts/validate-seed.mjs
```

See [docs/corporate-skills.md](../docs/corporate-skills.md) for architecture and agent mapping.
