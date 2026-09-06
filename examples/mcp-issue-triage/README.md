# MCP Issue Triage — Design Example

A worked, **design-only** example that applies the {mcpdesc} design-first method to a
**brownfield** service: an issue tracker that already has an HTTP API, for which we design an
MCP interface instead of a per-host skill.

> This package is a reviewed **design** — a capability map, decisions, an MCP Description
> document, and design-time mock fixtures. There is **no server implementation**. The real
> tracker API, authentication, persistence, and hosting are a separate, deferred workstream.

It is the companion to the 15-minute
[skill-driven tutorial](https://mcpdesc.org/docs/design-first/skill-tutorial): run the
`design-mcp-server` skill on this brief and you converge on the design captured here.

## Why MCP over "a skill + the tracker API"?

For a stateless, single-call service a skill over an API is genuinely fine — MCP earns its keep
only when read-context, consent-sensitive mutations, or a reusable prompt come into play. This
example crosses that threshold on purpose. See [decisions.md](decisions.md), Decision 1.

## Contents

| File | What it is |
|---|---|
| [capability-map.md](capability-map.md) | Intentions → primitives, with rejected alternatives. |
| [decisions.md](decisions.md) | Interface (MCP vs skill+API), identifiers, mutations, errors, mock plan. |
| [mcp-issue-triage.mcpdesc.yaml](mcp-issue-triage.mcpdesc.yaml) | Canonical MCP Description document (validates against 0.7.0, strict). |
| [mock-data/](mock-data/) | Static `--data` fixtures: one canonical success per tool. |
| [replay/triage.jsonl](replay/triage.jsonl) | `--replay` dataset: argument-dependent responses plus a real error path. |

## Capability surface (summary)

- **Tools:** `set_priority`, `assign_issue`, `close_issue`
- **Resources:** `triage://issues/open`, `triage://reference/labels`
- **Resource template:** `triage://issues/{issue_id}`
- **Prompt:** `triage_next`

## Design-time tools (verified versions)

- Validate: `mcpcontract validate mcp-issue-triage.mcpdesc.yaml --schema mcpdesc --strict`
  (`@cisco_open/mcptoolkit-contract`, verified with 2.0.0-rc.1). Validates clean: 0 errors,
  0 warnings.
- Mock, static: `mcpmock run mcp-issue-triage.mcpdesc.yaml --data mock-data/`
- Mock, replay: `mcpmock run mcp-issue-triage.mcpdesc.yaml --replay replay/triage.jsonl --similarity-threshold 100`
  (`@cisco_open/mcptoolkit-mock`, verified with **1.2.2** — per-URI resource replay and
  `structuredContent`)
- Visual review: the [Live Editor](https://mcpdesc.org/live-editor)

Schema: **MCP Description 0.7.0**. Reverify tool versions before relying on them.

## Scope

Design only. No authentication, no persistence, no real tracker, no implementation, and no
implementation testing. On `mcpmock` 1.2.0 the mock returns `structuredContent` and serves
per-URI resources via `--replay`; it does not exercise elicitation. See
[decisions.md](decisions.md), Decision 5.
