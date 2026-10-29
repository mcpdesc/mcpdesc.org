---
title: "mcp.tool.output-schema.revision-availability"
description: "A Tool declares outputSchema only for MCP revisions whose Tool type defines it."
slug: docs/rules/0.9.0-draft.2/mcp/tool-output-schema-revision-availability
ruleSurface: "Tool"
sidebar:
  label: "mcp.tool.output-schema.revision-availability"
---

A Tool declares outputSchema only for MCP revisions whose Tool type defines it.

**Rule ID:** `mcp.tool.output-schema.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `outputSchema`<br>
**Kind:** structural<br>
**Requirement:** Not specified in the rule record<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | not-applicable | not-applicable | not-applicable |

## Diagnostics

| Code | Severity |
| --- | --- |
| `field-not-supported-by-version` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.1 (Tool Object field table)**
  - [/docs/specification/0.9.0-draft.2/versioning#req-field-revision-availability](/docs/specification/0.9.0-draft.2/versioning#req-field-revision-availability)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 schema.ts, interface Tool (closed; no outputSchema)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L781-L810](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L781-L810)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 schema.ts, interface Tool, outputSchema
  - [validation/mcp-schemas/2025-06-18/schema.ts#L947-L955](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L947-L955)



## Examples

### Invalid example

Source: [expected-invalid/output-schema-before-2025-06-18.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/output-schema-before-2025-06-18.json) · Selected: `/tools/0`

```json
{
  "name": "early_output",
  "inputSchema": {
    "type": "object"
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "total": {
        "type": "integer"
      }
    }
  }
}
```

## Source record

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
