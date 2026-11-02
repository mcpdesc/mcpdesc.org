---
title: "Use completion context only where supported"
description: "Completion context was added in MCP 2025-06-18. A completion example spanning an earlier supported version cannot carry that context unchanged. Split the declaration's scopes when "
slug: docs/rules/0.9.0-rc.1/mcp/completion-context-protocol-version
sidebar:
  label: "mcp.completion.context.protocol-version"
---

Completion context was added in MCP 2025-06-18. A completion example spanning an earlier supported version cannot carry that context unchanged. Split the declaration's scopes when context is needed for only the newer versions.


## Requirement

A completion example carries context only from MCP 2025-06-18, where CompleteRequest defines it.

## Details

**Rule ID:** `mcp.completion.context.protocol-version`<br>
**Owner:** mcp<br>
**Surface:** CompleteRequest · **Path:** `context`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Sections 10.4.6 and 11.4**
  - [/docs/specification/0.9.0-rc.1/resources#req-template-completion-context-protocol-version](/docs/specification/0.9.0-rc.1/resources#req-template-completion-context-protocol-version)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-context-protocol-version](/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-context-protocol-version)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 schema.ts, interface CompleteRequest (no context); MCP 2025-06-18 to 2026-07-28 schema.ts, CompleteRequest params context
  - [validation/mcp-schemas/2025-03-26/schema.ts#L1092-L1113](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L1092-L1113)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1307-L1340](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1307-L1340)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1995-L2025](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1995-L2025)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2582-L2618](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2582-L2618)


## Notes

MCP Description does not support completion examples for MCP 2024-11-05 (mcp.completion.protocol-version).


## Examples

### Invalid example

Source: [expected-invalid/invalid-completion-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/invalid-completion-example-semantics.json) · Selected: `/prompts/1/completionExamples/context-too-early`

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

## Rule Source Code

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
