---
title: "mcp.elicitation.revision-availability"
description: "Elicitation is used only from MCP 2025-06-18, and URL mode only from MCP 2025-11-25, in declarations and in Tool interaction steps."
slug: docs/rules/0.9.0-draft.1/mcp/elicitation-revision-availability
ruleSurface: "ElicitRequest"
sidebar:
  label: "mcp.elicitation.revision-availability"
---

Elicitation is used only from MCP 2025-06-18, and URL mode only from MCP 2025-11-25, in declarations and in Tool interaction steps.

**Rule ID:** `mcp.elicitation.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** ElicitRequest · **Path:** `mode`<br>
**Kind:** structural<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `elicitation-mode-not-supported-by-version` | **error** |
| `interaction-example-version-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 9.4 and 12.5**
  - [/docs/specification/0.9.0-draft.1/elicitation#req-elicitation-revisions](/docs/specification/0.9.0-draft.1/elicitation#req-elicitation-revisions)
  - [/docs/specification/0.9.0-draft.1/tools#req-interaction-revision-valid](/docs/specification/0.9.0-draft.1/tools#req-interaction-revision-valid)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 schema.ts (no elicitation/create); MCP 2025-06-18 schema.ts, ElicitRequest (form only); MCP 2025-11-25 and 2026-07-28 schema.ts, ElicitRequestURLParams (mode "url")
  - [validation/mcp-schemas/2025-03-26/schema.ts#L202-L223](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L202-L223)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1453-L1477](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1453-L1477)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2180-L2208](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2180-L2208)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2813-L2838](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2813-L2838)


## Notes

Elicitation Declarations scoped before MCP 2025-06-18 are outside the complete semantic checks (Section 16.2).


## Examples

### Invalid example

Source: [expected-invalid/elicitation-version-mismatch.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/elicitation-version-mismatch.json) · Selected: `/tools/0/elicitations/0`

```json
{
  "name": "authorize",
  "mode": "url",
  "message": "Authorize access.",
  "url": "https://auth.example.com/authorize"
}
```

### Invalid example

Source: [expected-invalid/invalid-tool-interaction-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-tool-interaction-example-semantics.json) · Selected: `/tools/0/interactionExamples/broken/steps/0/request`

```json
{
  "mode": "url",
  "message": "Authorize publication.",
  "url": "https://mcp.example.com/release/connect"
}
```

## Source record

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
