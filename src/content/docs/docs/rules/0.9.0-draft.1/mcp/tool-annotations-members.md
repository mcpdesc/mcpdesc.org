---
title: "A Tool annotations object contains only title, readOnlyHint, destructiveHint, idempotentHint, and openWorldHint."
description: "A Tool annotations object contains only title, readOnlyHint, destructiveHint, idempotentHint, and openWorldHint."
slug: docs/rules/0.9.0-draft.1/mcp/tool-annotations-members
---

**Rule ID:** `mcp.tool-annotations.members`<br>
**Owner:** mcp<br>
**Surface:** ToolAnnotations<br>
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
| `schema-validation` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.6**
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-annotations-closed](/docs/specification/0.9.0-draft.1/tools#req-tool-annotations-closed)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 to 2026-07-28 schema.ts, interface ToolAnnotations (no index signature)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L727-L779](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L727-L779)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L869-L923](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L869-L923)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1168-L1222](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1168-L1222)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1900-L1954](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1900-L1954)


## Notes

Tool annotations are not available in MCP 2024-11-05; that boundary is checked separately.


## Examples

### Invalid example

Source: [expected-invalid/tool-annotations-unknown-property.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/tool-annotations-unknown-property.json) · Selected: `/tools/0/annotations`

```json
{
  "readOnlyHint": true,
  "audience": [
    "user"
  ]
}
```

### Valid example

Source: [expected-valid/distinct-tool-and-resource-annotations.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-valid/distinct-tool-and-resource-annotations.json) · Selected: `/tools/0/annotations`

```json
{
  "title": "Inspect",
  "readOnlyHint": true,
  "destructiveHint": false,
  "idempotentHint": true,
  "openWorldHint": false
}
```

## Source record

[annotations.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/annotations.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
