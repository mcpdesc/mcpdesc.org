---
title: "Check early Tool schemas without inferring a dialect"
description: "Early MCP protocol versions define a limited Tool-schema shape without a default embedded dialect. Check the known properties and required-name list without rejecting other keyword"
slug: docs/rules/0.9.0-draft.3/mcp/tool-schema-legacy-shape
sidebar:
  label: "mcp.tool.schema.legacy-shape"
---

Early MCP protocol versions define a limited Tool-schema shape without a default embedded dialect. Check the known properties and required-name list without rejecting other keywords using an inferred meta-schema. Incomplete example validation is reported separately.


## Requirement

Before MCP 2025-11-25, Tool schema properties is an object of objects and required is an array of strings; other keywords are preserved.

## Details

**Rule ID:** `mcp.tool.schema.legacy-shape`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `inputSchema, outputSchema`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | not-applicable | not-applicable |
## Required by

- **MCP Description 0.9.0, Section 9.2**
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-schema-legacy-shape](/docs/specification/0.9.0-draft.3/tools#req-tool-schema-legacy-shape)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2025-06-18 schema.ts, interface Tool, inputSchema (and outputSchema from 2025-06-18): properties?: { [key: string]: object }, required?: string[]
  - [validation/mcp-schemas/2024-11-05/schema.ts#L696-L703](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L696-L703)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L797-L804](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L797-L804)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L938-L945](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L938-L945)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L947-L955](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L947-L955)


## Notes

From MCP 2025-11-25 the embedded dialect governs these keywords (json-schema.tool-schema.valid).


## Examples

### Invalid example

Source: [expected-invalid/malformed-pre-dialect-tool-schema-shape.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/malformed-pre-dialect-tool-schema-shape.json) · Selected: `/tools/0/inputSchema`

```json
{
  "type": "object",
  "required": "value"
}
```

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
