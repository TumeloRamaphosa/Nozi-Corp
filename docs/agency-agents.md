# agency-agents Integration

How Nozi-Corp uses [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) without forking or vendoring the full tree.

## What agency-agents Is

- Open-source **AI agency persona library** (MIT license).
- Organised by division: `engineering/`, `product/`, `marketing/`, `support/`, `finance/`, etc.
- Each file is a self-contained agent definition (identity, workflows, deliverables).
- Large roster — browse the upstream README for the full table.

## What We Do

| Do | Don't |
|----|-------|
| Adapt a **small** set of personas into `agents/` | Copy the entire agency-agents repository |
| Cite upstream path in each adapted `.md` header | Blind-sync or script-dump 100+ agents |
| Link to upstream for personas we don't need | Claim authorship of upstream personas |
| Record selections in `scripts/pull-agency-personas.md` | Remove MIT attribution |

## Adapted Personas (current)

See [pull-agency-personas.md](../scripts/pull-agency-personas.md) for the canonical selection table.

| Nozi ID | Upstream |
|---------|----------|
| `market-research-analyst` | `product/product-trend-researcher.md` |
| `business-strategist` | `specialized/business-strategist.md` |
| `ops-coordinator` | `project-management/project-management-studio-operations.md` |
| `compliance-gatekeeper` | `support/support-legal-compliance-checker.md` |

## Nozi Originals

These FSP roles are **not** from agency-agents:

- `fsp-intake-specialist`
- `fsp-compliance-advisor`

## Mission Control Mapping

Each curated agent has:

1. `agents/<id>.md` — human-readable persona (source of truth for tone/workflow).
2. `agents/<id>.json` — optional MC `agents.json` field subset.
3. Entry in `missions/fsp-practitioner/agents.overlay.json` — seed merge target.

Skills in `skills/` map to MC `skills-library.json` via `skills.overlay.json`.

## Upstream License

```
MIT License
Copyright (c) 2025 AgentLand Contributors
```

Full license: https://github.com/msitarzewski/agency-agents/blob/main/LICENSE

Adapted files in this repo are also MIT-licensed (see root `LICENSE`) with attribution to upstream contributors in `NOTICE` and per-file headers.

## Installing More Personas (optional)

Upstream install tooling (not used by this repo):

```bash
# In a separate agency-agents clone — for reference only
./scripts/install.sh --tool claude-code --division product,support
```

For Nozi-Corp, follow the curation workflow in `scripts/pull-agency-personas.md` instead.
