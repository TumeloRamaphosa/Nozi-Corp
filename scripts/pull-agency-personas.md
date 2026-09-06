# Pulling Personas from agency-agents

This document records **which** upstream personas we curate into Nozi-Corp, **why**, and **how to attribute** them. We do not clone or vendor the full [agency-agents](https://github.com/msitarzewski/agency-agents) tree.

## Upstream Facts

| Item | Value |
|------|-------|
| Repository | https://github.com/msitarzewski/agency-agents |
| License | MIT (Copyright (c) 2025 AgentLand Contributors) |
| Structure | Division folders (`engineering/`, `product/`, `support/`, …) with one `.md` persona per agent |
| Scale | Large public roster (~150k★); browse full list in upstream README |

## Curation Policy

1. **Small set only** — adapt 3–6 personas relevant to the FSP demo; link upstream paths for everything else.
2. **Adapt, don't dump** — rewrite for SA FSP / Mission Control context; add "Adapted from agency-agents" header with upstream path.
3. **Nozi originals** — FSP-specific roles (intake, SA compliance advisor) are Nozi-Corp originals (MIT).
4. **NOTICE** — all adapted personas listed in repo `NOTICE` and in the table below.

## Selected Personas (FSP Demo)

| Nozi-Corp agent | Upstream path | Rationale |
|-----------------|---------------|-----------|
| `market-research-analyst` | `product/product-trend-researcher.md` | Desk research, competitive/trend briefs for FSP landscape |
| `business-strategist` | `specialized/business-strategist.md` | Needs analysis, option framing for practitioner review |
| `ops-coordinator` | `project-management/project-management-studio-operations.md` | Workflow ops, inbox report compilation |
| `compliance-gatekeeper` | `support/support-legal-compliance-checker.md` | Compliance-adjacent gate (adapted — not legal counsel) |

### Nozi-Corp originals (not from agency-agents)

| Agent | Purpose |
|-------|---------|
| `fsp-intake-specialist` | Structured demo client intake / fact-find |
| `fsp-compliance-advisor` | SA FAIS/TCF contextual notes for practitioner education |

## Not Curated (link upstream)

For divisions we do not copy, browse upstream directly:

- Engineering — https://github.com/msitarzewski/agency-agents/tree/main/engineering
- Marketing — https://github.com/msitarzewski/agency-agents/tree/main/marketing
- Finance — https://github.com/msitarzewski/agency-agents/tree/main/finance
- Security — https://github.com/msitarzewski/agency-agents/tree/main/security

Example adjacent persona **not** copied (reference only): `finance/finance-investment-researcher.md` — investment research depth beyond FSP demo scope.

## How to Add a New Persona

1. Pick an upstream `.md` file; read license (MIT) and persona scope.
2. Create `agents/<nozi-id>.md` with attribution header.
3. Add optional `agents/<nozi-id>.json` for Mission Control `agents.json` fields.
4. Append row to this document and `NOTICE`.
5. Update `missions/*/agents.overlay.json` if the persona joins a mission.
6. Run `node scripts/validate-seed.mjs`.

## Upstream MIT License (excerpt)

```
MIT License
Copyright (c) 2025 AgentLand Contributors
```

Full text: https://github.com/msitarzewski/agency-agents/blob/main/LICENSE
