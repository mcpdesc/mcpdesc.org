---
title: "mcp.completion.context.revision-availability"
description: "A completion example carries context only from MCP 2025-06-18, where CompleteRequest defines it."
slug: docs/rules/0.9.0-draft.2/mcp/completion-context-revision-availability
ruleSurface: "CompleteRequest"
sidebar:
  label: "mcp.completion.context.revision-availability"
---

A completion example carries context only from MCP 2025-06-18, where CompleteRequest defines it.

**Rule ID:** `mcp.completion.context.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** CompleteRequest · **Path:** `context`<br>
**Kind:** structural<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `completion-example-context-version-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 10.4.6 and 11.4**
  - [/docs/specification/0.9.0-draft.2/resources#req-template-completion-context-revision](/docs/specification/0.9.0-draft.2/resources#req-template-completion-context-revision)
  - [/docs/specification/0.9.0-draft.2/prompts#req-prompt-completion-context-revision](/docs/specification/0.9.0-draft.2/prompts#req-prompt-completion-context-revision)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 schema.ts, interface CompleteRequest (no context); MCP 2025-06-18 to 2026-07-28 schema.ts, CompleteRequest params context
  - [validation/mcp-schemas/2025-03-26/schema.ts#L1092-L1113](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L1092-L1113)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1307-L1340](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1307-L1340)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1995-L2025](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1995-L2025)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2582-L2618](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2582-L2618)


## Notes

MCP Description does not support completion examples for MCP 2024-11-05 (mcp.completion.revision-availability).


## Examples

### Invalid example

Source: [expected-invalid/invalid-completion-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/invalid-completion-example-semantics.json) · Selected: `/prompts/1/completionExamples/context-too-early`

```json
{
  "argument": {
    "name": "name",
    "value": "a"
  },
  "context": {
    "arguments": {
      "department": "engineering"
    }
  },
  "result": {
    "completion": {
      "values": [
        "Ada"
      ]
    },
    "_meta": {
      "captured": true
    }
  }
}
```

## Source record

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
