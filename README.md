# Nozi-Corp

**Studex** domain content for an *artificial expertise* demo: super agents supporting a **South African financial services practitioner**. Educational and demonstration use only — **not legal, tax, or financial advice**.

This repository holds **content only** (agents, skills, missions, seed scripts). Runtime tooling runs as unmodified siblings or documented external services.

## Architecture

```
agency-agents (MIT, upstream personas)  ──adapt──►  Nozi-Corp (MIT, this repo)
                                                        │
                                                        │ seed
                                                        ▼
Mission Control (AGPL-3.0, sibling)  ◄── orchestrates tasks, agents, inbox
        │
        │ hosted on
        ▼
Orgo cloud desktop (documented runtime)
```

| Component | Role | In this repo? |
|-----------|------|---------------|
| [Mission Control](https://github.com/MeisnerDan/mission-control) | Ops UI + autonomous agent daemon | No — clone sibling |
| [agency-agents](https://github.com/msitarzewski/agency-agents) | Persona library (~230 upstream) | No — **10 adapted** + 2 Nozi wrappers (MIT, attributed) |
| [Orgo](https://www.orgo.ai/) | Cloud Linux desktop for always-on demos | Documented only |
| **Nozi-Corp** | Curated agents, skills, FSP mission, seed scripts | **Yes** |

See [docs/architecture.md](docs/architecture.md) for the full diagram and data flow.

## Quick Start

### 1. Clone siblings

```bash
# This repo (content)
git clone <this-repo-url> nozi-corp
cd nozi-corp

# Mission Control (runtime — AGPL-3.0, unmodified)
git clone https://github.com/MeisnerDan/mission-control.git ../mission-control
cd ../mission-control/mission-control
pnpm install
```

Expected layout:

```
parent/
├── nozi-corp/                 # this repo
└── mission-control/
    └── mission-control/       # MC app (package.json here)
        └── data/              # seed target
```

### 2. Validate and seed content

```bash
cd nozi-corp

node scripts/validate-seed.mjs
node scripts/seed-into-mission-control.mjs --dry-run
node scripts/seed-into-mission-control.mjs
```

Regenerate Mission Control context:

```bash
cd ../mission-control/mission-control && pnpm gen:context
```

### 3. Run Mission Control

```bash
cd ../mission-control/mission-control
pnpm dev
# UI: http://localhost:3000
```

Open the **Studex FSP Practitioner Demo** project and run the task chain:

`research → intake → needs analysis → compliance gate → inbox report`

### 4. Run on Orgo (optional)

Orgo provides a persistent cloud Linux desktop for agent runtimes. Mission Control and Claude Code run **inside** the Orgo VM — Orgo is the host, not the agent.

1. Create a computer: [Orgo quickstart](https://docs.orgo.ai/quickstart)
2. SSH or VNC into the desktop
3. Clone `nozi-corp` and `mission-control` as siblings
4. Seed and start MC as above
5. Use the daemon (`/daemon`) for autonomous task execution

See [Orgo introduction](https://docs.orgo.ai/introduction).

## Repository Layout

```
agents/           Curated personas (.md + optional .json MC overlay)
skills/           Knowledge modules for MC skills-library
missions/
  fsp-practitioner/   Demo project, task chain, agent/skill overlays
scripts/
  seed-into-mission-control.mjs
  validate-seed.mjs
  pull-agency-personas.md   Selection list + attribution
docs/
  architecture.md
  agpl-and-commercial.md
  agency-agents.md
```

## Curated Agents

**10 adapted** from agency-agents (MIT) + **2 Nozi SA wrappers**. Pattern: YAML frontmatter `.md` + MC `.json` overlay. See [docs/agency-agents.md](docs/agency-agents.md).

| Agent | Source | Demo role |
|-------|--------|-----------|
| `agents-orchestrator` | agency-agents | Pipeline lead / final report |
| `research-synthesist` | agency-agents | Research |
| `loan-officer-assistant` | agency-agents | Intake lead |
| `fsp-intake-specialist` | Nozi original | SA intake wrapper |
| `financial-analyst` | agency-agents | Needs analysis lead |
| `fpa-analyst` | agency-agents | Planning collaborator |
| `chief-financial-officer` | agency-agents | Strategic framing |
| `legal-compliance-checker` | agency-agents | Compliance gate lead |
| `compliance-auditor` | agency-agents | Controls review |
| `data-privacy-officer` | agency-agents | Privacy review |
| `fsp-compliance-advisor` | Nozi original | SA compliance wrapper |
| `operations-manager` | agency-agents | Ops summary |

## Licenses

| Artifact | License |
|----------|---------|
| This repo (original content) | [MIT](LICENSE) |
| Mission Control (sibling) | [AGPL-3.0](https://github.com/MeisnerDan/mission-control/blob/main/LICENSE) — commercial use: dan@meisner.dev |
| agency-agents (adapted personas) | MIT — see [NOTICE](NOTICE) |

See [docs/agpl-and-commercial.md](docs/agpl-and-commercial.md).

## Disclaimer

All Studex FSP practitioner scenarios are for **training and workflow demonstration**. A licensed South African financial services practitioner must review and approve any material before client use.
