# Mission Control Task Management

All data lives in `mission-control/data/` as JSON files (Mission Control schema).

## Quick Reference

| File | Purpose |
|------|---------|
| `ai-context.md` | Read FIRST — regenerated snapshot |
| `tasks.json` | Task queue (Eisenhower + kanban) |
| `projects.json` | Projects |
| `goals.json` | Goals and milestones |
| `agents.json` | Agent registry |
| `skills-library.json` | Skills injected into agent prompts |
| `inbox.json` | Agent ↔ practitioner messages |
| `decisions.json` | Pending practitioner decisions |
| `activity-log.json` | Audit trail |

## Creating a Task

Required fields: `id`, `title`, `description`, `importance`, `urgency`, `kanban`, `assignedTo`

- IDs: `task_${Date.now()}`
- `importance`: `"important"` | `"not-important"`
- `urgency`: `"urgent"` | `"not-urgent"`
- `kanban`: `"not-started"` | `"in-progress"` | `"done"`
- `blockedBy`: array of task IDs for chain ordering

## After JSON Mutations

Run from Mission Control app directory:

```bash
cd mission-control && pnpm gen:context
```

## Writes

Prefer Mission Control API routes when the daemon/UI is running (validation + mutex). Direct file writes are acceptable for demo seeding when API is offline.

## Inbox Report Protocol

On task completion, post to `inbox.json`:

```json
{
  "type": "report",
  "from": "<your-agent-id>",
  "to": "me",
  "subject": "Completed: <task-title>",
  "body": "<summary with demo disclaimer>",
  "status": "unread"
}
```
