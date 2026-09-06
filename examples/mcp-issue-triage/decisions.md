# Design Decisions — MCP Issue Triage

Design-only. These decisions are made before any implementation and are the reason the
description looks the way it does.

## Decision 1 — Interface: MCP, not "a skill over the tracker API"

**Context (brownfield).** The issue tracker already exposes an HTTP API. The tempting shortcut
is to write an agent *skill* that documents that API and lets the assistant call it directly.

**Verdict: MCP server** (the production system may later expose *both* MCP and the existing
HTTP API over the same domain logic).

**Rationale.** A skill-over-an-API cannot do what MCP does here:

| Capability | Skill + direct API | MCP server |
|---|---|---|
| The open queue as attachable **context** | ✗ an imperative call each time | ✓ `triage://issues/open` resource |
| A server-shipped **prompt** (`triage_next`) to any host | ✗ re-authored per host | ✓ native |
| **Machine-actionable safety** (`close_issue` is `destructiveHint`) | ✗ prose only | ✓ hosts gate on metadata |
| An **agent-shaped interface**, not the raw REST surface | ✗ model sees auth/pagination/endpoints | ✓ three intent-level tools |
| **Write once, any host** (Copilot, Claude, Cursor…) | ✗ per-host skill | ✓ one server |

**Costs accepted.** Building and hosting an MCP server is more work than a skill; for a
*stateless, single-call* service that cost would not be worth it. This service is not that: it
has read context, consent-sensitive mutations, and a reusable workflow — so the MCP-specific
rows all light up, and MCP earns its keep.

## Decision 2 — Identifiers are tracker-owned, not server-minted

Issues are addressed by the tracker's identifier (e.g. `ISSUE-101`). Unlike a greenfield
service, this design does **not** mint its own IDs; it adopts the domain's. Tool outputs echo
`issueId` and include an `issueUri` so the host can read the issue back after acting.

## Decision 3 — Mutations, annotations, and confirmation

- `set_priority` and `assign_issue` are **idempotent** (`idempotentHint: true`): re-applying the
  same value returns the same result.
- `close_issue` is **state-losing** (`destructiveHint: true`) and also idempotent: closing an
  already-closed issue returns the same result instead of erroring.
- Every tool description states that the assistant must act **only on explicit maintainer
  confirmation**, one action at a time, and must never assign or close on its own initiative.
  Guidance is not a control — the annotations are what let a host gate these actions.

## Decision 4 — Error behaviour

- Unknown issue → recoverable `Issue not found` (JSON-RPC error `-32004`, `data.issueId`).
- Closing as `duplicate` requires a `duplicateOf` the maintainer confirmed.
- `outputSchema` describes **successful** structured output only; expected domain errors are
  documented here and surfaced by the design-time mock via the error channel.

## Decision 5 — Mock plan (design-time only)

The mock is a design instrument, not a server test. Two modes are provided:

- **Static** (`--data mock-data/`): one canonical success per tool — quickest "it runs".
- **Replay** (`--replay replay/triage.jsonl`): argument-dependent responses **plus a real
  error path**, so the triage conversation feels real (set priority on `ISSUE-101`, assign it,
  close `ISSUE-102` as a duplicate, hit `Issue not found` on `ISSUE-999`).

**Mock behaviour (`mcpmock` 1.2.0):**

- Tool results include both the text block and **`structuredContent`** (from `outputSchema`);
  the replay dataset records both.
- **`--replay` discriminates `resources/read` by URI**, so each issue detail and a resource-level
  `Issue not found` are served distinctly. (Under `--data`, resource reads still return generated
  placeholders — resource content is served via `--replay`.)
- **Elicitation is not supported.** A production version could use elicitation to confirm an
  assignee interactively; the design does not depend on it, and the mock does not exercise it.
