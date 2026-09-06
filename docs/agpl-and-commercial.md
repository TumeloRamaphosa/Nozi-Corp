# AGPL and Commercial Use

## Two Licenses, Two Repositories

| Repository | License | What it covers |
|------------|---------|----------------|
| **Nozi-Corp** (this repo) | MIT | Original content: agents, skills, missions, scripts, docs |
| **Mission Control** (sibling) | AGPL-3.0 | Ops UI, daemon, and application source |

This content repo does **not** include Mission Control source code and does **not** re-license Mission Control under MIT.

## Running Mission Control

When you clone and run [Mission Control](https://github.com/MeisnerDan/mission-control) you operate that software under **AGPL-3.0**. Typical obligations include:

- Providing source to users who interact with the AGPL-covered program over a network (if you modify and deploy it).
- Preserving copyright and license notices.

Read the full AGPL-3.0 text in the Mission Control repository:  
https://github.com/MeisnerDan/mission-control/blob/main/LICENSE

## Commercial / SaaS / White-Label

Mission Control's upstream README states that commercial, SaaS, or white-label use **without AGPL obligations** requires a separate license from the author:

- Contact: **dan@meisner.dev**
- Repository: https://github.com/MeisnerDan/mission-control

Nozi-Corp content (MIT) can be used in commercial products subject to the MIT license, but **running modified Mission Control as a networked service** may still trigger AGPL requirements unless you have a commercial license from Mission Control's author.

## agency-agents (MIT)

Adapted personas retain upstream MIT attribution. See [agency-agents.md](./agency-agents.md) and `NOTICE`.

## Orgo

Orgo is a separate commercial service (https://www.orgo.ai/). Terms are governed by Orgo's pricing and documentation — not this repository.

## Summary for Operators

| Question | Answer |
|----------|--------|
| Can I use Nozi-Corp content in a commercial demo? | Yes, under MIT (with attribution for adapted agency-agents personas). |
| Can I ship Mission Control inside this repo? | No — keep it as an unmodified sibling; AGPL applies to MC itself. |
| Can I offer MC as a hosted SaaS? | AGPL likely applies unless you obtain a commercial license from dan@meisner.dev. |
| Is agent output "advice"? | No — educational demo only; practitioner must review. |
