# Design Decisions — <server name>

> One entry per non-obvious decision. Record options, the outcome, and what would justify
> revisiting it.

## Decision <n> — <title>

- Status: proposed | accepted | rejected | superseded

**Context.** <what decision is required and why it affects the external interface>

**Options.**
- Option A — benefits / costs
- Option B — benefits / costs

**Decision.** <the choice made>

**Rationale.** <why it best serves the intended consumer>

**Consequences.** <interface, mock, documentation, deferred implementation assumptions>

**Review trigger.** <new evidence that would justify revisiting>

---

## Error model

If the resolved format has no native tool-error location, keep `outputSchema` to success and
document expected errors here using a stable shape:

```yaml
error:
  code: string
  message: string
  recoverable: boolean
  suggestedAction: string
  details: object
```

| Code | Raised by | Recoverable |
|---|---|---|
| | | |

## Unresolved and deferred

- <design questions to revisit after the mock review>
- Implementation-only concerns (SDK, persistence, auth, tests) are out of scope.
