# agency-agents Integration

How Nozi-Corp uses [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) via **curated copy + adapter** — not a full tree, not a submodule of ~230 agents.

## Upstream Facts

| Item | Value |
|------|--------|
| Repository | https://github.com/msitarzewski/agency-agents |
| License | **MIT** — Copyright (c) 2025 AgentLand Contributors |
| Scale | Large public roster (~150k★, ~230 agents); we curate **10** for the FSP demo |
| Full catalog | Browse upstream README — do not dump into this repo |

## Adapter Pattern

Each agent in `agents/` follows:

```
agents/<id>.md     # Source persona: YAML frontmatter + Identity / Mission / Rules / Workflows
agents/<id>.json   # Mission Control overlay → merges into agents.json
```

### YAML frontmatter (required)

```yaml
---
name: Agent Name
description: One-line role summary
color: cyan
emoji: 🎛️
vibe: Short personality hook
---
```

Body sections: **Identity**, **Mission**, **Rules**, **Workflows** — plus `Adapted from agency-agents` header with upstream path.

### Mission Control mapping

| agency-agents source | Nozi-Corp target | Notes |
|---------------------|------------------|-------|
| Persona body (Identity, Mission, Rules) | `agents.json` → `instructions` | Condensed in `.json`; full tone in `.md` |
| Workflows, templates, deliverables | `skills-library.json` via `skillIds` | Extracted to `skills/*.md`, referenced in `skills.overlay.json` |
| Frontmatter `name`, `description` | `agents.json` `name`, `description` | |
| Emoji / vibe | Documented in `.md`; MC `icon` chosen per Lucide mapping | |

Seed script (`scripts/seed-into-mission-control.mjs`) globs `agents/*.json` and resolves skill `contentFile` → `content` at seed time.

## FSP Demo Allowlist (10 adapted + 2 Nozi wrappers)

### Adapted from agency-agents (MIT)

| Nozi ID | Upstream path | Chain role |
|---------|---------------|------------|
| `agents-orchestrator` | `specialized/agents-orchestrator.md` | Lead — final inbox report |
| `research-synthesist` | `research/research-synthesist.md` | Research |
| `loan-officer-assistant` | `specialized/loan-officer-assistant.md` | Intake lead |
| `financial-analyst` | `finance/finance-financial-analyst.md` | Needs analysis lead |
| `fpa-analyst` | `finance/finance-fpa-analyst.md` | Needs analysis collaborator |
| `chief-financial-officer` | `specialized/chief-financial-officer.md` | Needs analysis collaborator |
| `legal-compliance-checker` | `support/support-legal-compliance-checker.md` | Compliance gate lead |
| `compliance-auditor` | `security/security-compliance-auditor.md` | Compliance collaborator |
| `data-privacy-officer` | `specialized/data-privacy-officer.md` | Compliance collaborator |
| `operations-manager` | `specialized/operations-manager.md` | Inbox report collaborator |

### Nozi-Corp originals (thin SA wrappers)

| Nozi ID | Purpose |
|---------|---------|
| `fsp-intake-specialist` | SA FAIS/FSCA intake placeholders on demo profiles |
| `fsp-compliance-advisor` | SA regulatory context on compliance gate |

Canonical selection table: [scripts/pull-agency-personas.md](../scripts/pull-agency-personas.md)

## Skills (workflows → skillIds)

| Skill ID | Source persona | Content file |
|----------|----------------|--------------|
| `skill_research_synthesis` | Research Synthesist | `research-synthesis-methodology.md` |
| `skill_financial_analysis` | Financial Analyst | `financial-analysis-templates.md` |
| `skill_fpa_planning` | FP&A Analyst | `fpa-planning-templates.md` |
| `skill_compliance_gate` | Legal Compliance + Auditor + DPO | `compliance-gate-checklist.md` |
| `skill_orchestrator_status_report` | Agents Orchestrator | `orchestrator-status-report.md` |

Plus Nozi originals: `skill_nozi_demo_disclaimer`, `skill_fsp_sa_context`, `skill_mc_task_management`.

## What We Do Not Do

- Clone or vendor the full agency-agents tree
- Submodule the upstream repo
- Copy agents outside the FSP allowlist

Link upstream for everything else: https://github.com/msitarzewski/agency-agents

## Upstream MIT License

```
MIT License
Copyright (c) 2025 AgentLand Contributors
```

Full text: https://github.com/msitarzewski/agency-agents/blob/main/LICENSE
