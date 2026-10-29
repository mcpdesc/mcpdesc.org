---
title: "Declare output schemas only where MCP defines them"
description: "Tool outputSchema is available from MCP 2025-06-18. A Tool whose effective scope includes an earlier protocol version cannot carry it unchanged. Omit it for the earlier version or "
slug: docs/rules/0.9.0-draft.3/mcp/tool-output-schema-revision-availability
sidebar:
  label: "mcp.tool.output-schema.revision-availability"
---

Tool outputSchema is available from MCP 2025-06-18. A Tool whose effective scope includes an earlier protocol version cannot carry it unchanged. Omit it for the earlier version or provide disjoint variants.


## Requirement

A Tool declares outputSchema only for MCP revisions whose Tool type defines it.

## Details

**Rule ID:** `mcp.tool.output-schema.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `outputSchema`<br>
**Kind:** structural<br>
**Requirement level:** Not specified in the rule record<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | not-applicable | not-applicable | not-applicable |
## Diagnostics

| Code | Severity |
| --- | --- |
| `field-not-supported-by-version` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.1 (Tool Object field table)**
  - [/docs/specification/0.9.0-draft.3/versioning#req-field-revision-availability](/docs/specification/0.9.0-draft.3/versioning#req-field-revision-availability)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 schema.ts, interface Tool (closed; no outputSchema)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L781-L810](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L781-L810)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 schema.ts, interface Tool, outputSchema
  - [validation/mcp-schemas/2025-06-18/schema.ts#L947-L955](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L947-L955)



## Examples

### Invalid example

Source: [expected-invalid/output-schema-before-2025-06-18.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/output-schema-before-2025-06-18.json) · Selected: `/tools/0`

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

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
