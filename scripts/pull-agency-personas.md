# Pulling Personas from agency-agents

Curated **copy + adapter** list for the Nozi-Corp Studex FSP practitioner demo. Not a blind dump of the ~230-agent upstream tree.

## Upstream

| Field | Value |
|-------|-------|
| Repo | https://github.com/msitarzewski/agency-agents |
| License | MIT — Copyright (c) 2025 AgentLand Contributors |
| Install app | https://agencyagents.app (optional; we do not use for this content repo) |

## FSP Demo Allowlist

Each row is adapted into `agents/<id>.md` (YAML frontmatter + Identity/Mission/Rules/Workflows) and `agents/<id>.json` (MC overlay).

| Nozi agent ID | Upstream path | Adaptation notes |
|---------------|---------------|------------------|
| `agents-orchestrator` | `specialized/agents-orchestrator.md` | Pipeline lead; status report → `skill_orchestrator_status_report` |
| `chief-financial-officer` | `specialized/chief-financial-officer.md` | Executive summary on needs analysis |
| `financial-analyst` | `finance/finance-financial-analyst.md` | Needs memo templates → `skill_financial_analysis` |
| `fpa-analyst` | `finance/finance-fpa-analyst.md` | Planning tables → `skill_fpa_planning` |
| `legal-compliance-checker` | `support/support-legal-compliance-checker.md` | Compliance gate lead |
| `compliance-auditor` | `security/security-compliance-auditor.md` | Gap/evidence review on gate |
| `data-privacy-officer` | `specialized/data-privacy-officer.md` | POPIA-adjacent privacy section on gate |
| `research-synthesist` | `research/research-synthesist.md` | Evidence synthesis → `skill_research_synthesis` |
| `operations-manager` | `specialized/operations-manager.md` | Ops summary on final report |
| `loan-officer-assistant` | `specialized/loan-officer-assistant.md` | Intake lead for demo profiles |

## Nozi originals (not from agency-agents)

| Agent | Role |
|-------|------|
| `fsp-intake-specialist` | Thin SA wrapper on intake (FAIS placeholders) |
| `fsp-compliance-advisor` | Thin SA wrapper on compliance gate (FSCA/TCF context) |

## Not selected (link upstream)

Examples adjacent but out of FSP demo scope — browse upstream instead of copying:

- `finance/finance-investment-researcher.md` — investment research depth
- `product/product-trend-researcher.md` — replaced by `research-synthesist` for evidence grading
- Full `engineering/`, `marketing/`, `paid-media/` divisions

Division index: https://github.com/msitarzewski/agency-agents/tree/main

## Adding a persona

1. Confirm upstream MIT license and cite path in `.md` header.
2. Create `agents/<id>.md` with YAML frontmatter + four body sections.
3. Create `agents/<id>.json` with MC `instructions` + `skillIds`.
4. Extract workflows/templates to `skills/` if needed; register in `skills.overlay.json`.
5. Append row here and in `NOTICE`; add to `missions/fsp-practitioner/agents.overlay.json` manifest.
6. Run `node scripts/validate-seed.mjs`.

## Attribution

All adapted files include:

```markdown
> **Adapted from agency-agents** — upstream: `path/to/agent.md`
> Licensed MIT (Copyright 2025 AgentLand Contributors).
```
