# Compliance Gate Checklist

> Workflows/templates adapted from agency-agents `support/support-legal-compliance-checker.md`, `security/security-compliance-auditor.md`, and `specialized/data-privacy-officer.md`.

## Gate Memo Template

```markdown
# Compliance Gate: [Case ID]
**Result**: PASS | CONDITIONAL | FAIL

## Checks
| Check | Status | Notes |
| Demo disclaimer present | | |
| No personalised product advice | | |
| Intake / record-keeping complete | | |
| Advice-like language review | | |
| Privacy / POPIA-adjacent (demo) | | |
| Controls / evidence trail (demo) | | |

## Flags for Practitioner
## Escalations (decisions.json)
```

## Gap Finding Format

Each gap: control theme, current state, target state, remediation effort, priority.

## Rules

- Not legal counsel — flag uncertainty for practitioner (`me`).
- FAIL blocks downstream chain tasks.
