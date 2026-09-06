# Architecture

Nozi-Corp is a **content-only** repository. Runtime orchestration lives in sibling tools; agent personas are curated from upstream libraries.

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Orgo Cloud Desktop                              │
│  (documented runtime — persistent Linux desktop for agents)             │
│  https://www.orgo.ai/                                                   │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ hosts
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              Mission Control (sibling repo, AGPL-3.0)                     │
│  https://github.com/MeisnerDan/mission-control                          │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────────┐     │
│  │ Web UI      │  │ Daemon       │  │ data/ (JSON source of truth)│     │
│  │ /crew /tasks│  │ autopilot    │  │ agents, tasks, skills, inbox│     │
│  └─────────────┘  └──────────────┘  └──────────────▲──────────────┘     │
└────────────────────────────────────────────────────┼────────────────────┘
                                                     │ seed merge
┌────────────────────────────────────────────────────┴────────────────────┐
│                    Nozi-Corp (this repo, MIT content)                   │
│  agents/  skills/  missions/fsp-practitioner/  scripts/  docs/         │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ adapts personas (attribution)
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              agency-agents (upstream reference, MIT)                    │
│  https://github.com/msitarzewski/agency-agents                          │
│  ~230 agents upstream; 10 adapted for FSP demo + 2 Nozi wrappers           │
└─────────────────────────────────────────────────────────────────────────┘
```

## Components

### This repo (Nozi-Corp)

| Path | Role |
|------|------|
| `agents/` | Curated super-agent personas (`.md` + optional `.json` MC overlay) |
| `skills/` | Reusable knowledge modules seeded into MC `skills-library.json` |
| `missions/fsp-practitioner/` | Studex demo project, task chain, agent/skill overlays |
| `scripts/` | `seed-into-mission-control.mjs`, `validate-seed.mjs` |
| `docs/` | Architecture, licensing, agency-agents curation notes |

### Mission Control (sibling)

- **Not included** in this repo — clone and run unmodified.
- App path: `mission-control/mission-control/` (inner folder with `package.json`).
- Data path: `mission-control/mission-control/data/`.
- Schema reference: upstream `CLAUDE.md` at repo root.

### agency-agents (upstream reference)

- Persona **source library** for adaptation.
- See [agency-agents.md](./agency-agents.md) and [../scripts/pull-agency-personas.md](../scripts/pull-agency-personas.md).

### Orgo (documented runtime)

- Cloud Linux desktop for always-on agent demos.
- Orgo provides the **computer**; Mission Control + Claude Code provide the **ops layer**.
- See [Orgo docs](https://docs.orgo.ai/introduction).

## FSP Practitioner Demo Flow

Task chain (seeded by `missions/fsp-practitioner/tasks.json`):

```
research → intake → needs analysis → compliance gate → inbox report
```

| Step | Task ID | Lead agent | Collaborators |
|------|---------|------------|---------------|
| 1 | `task_fsp_research` | `research-synthesist` | — |
| 2 | `task_fsp_intake` | `loan-officer-assistant` | `fsp-intake-specialist` |
| 3 | `task_fsp_needs_analysis` | `financial-analyst` | `fpa-analyst`, `chief-financial-officer` |
| 4 | `task_fsp_compliance_gate` | `legal-compliance-checker` | `compliance-auditor`, `data-privacy-officer`, `fsp-compliance-advisor` |
| 5 | `task_fsp_inbox_report` | `agents-orchestrator` | `operations-manager` |

`blockedBy` enforces sequential execution. Final artefact is an inbox report for the practitioner (`me` agent).

## Schema Notes (guessed / verify on MC upgrade)

| Overlay field | Source | Notes |
|---------------|--------|-------|
| `missions.json` mission `taskIds` | MC README | Continuous mission wiring — verify against MC version |
| `mission.projectId` | Inferred | Links mission to `proj_fsp_practitioner_demo` |
| Agent `skillIds` | MC `agents.json` | Matches `skills-library.json` ids |
| Skill `contentFile` | **Nozi seed convention** | Resolved to `content` at seed time; not native MC field |

## Data Flow: Seed

```
missions/fsp-practitioner/*.json  +  skills/*.md
            │
            ▼
  scripts/seed-into-mission-control.mjs
            │
            ▼
../mission-control/mission-control/data/
  projects.json | tasks.json | agents.json | skills-library.json | missions.json
            │
            ▼
  pnpm gen:context  →  ai-context.md
```

## Educational Disclaimer

The Studex FSP practitioner scenario is **educational/demo only**. Agent outputs are not legal, tax, or financial advice.
