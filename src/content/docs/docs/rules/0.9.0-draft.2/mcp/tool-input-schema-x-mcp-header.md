---
title: "mcp.tool.input-schema.x-mcp-header"
description: "An x-mcp-header annotation is a non-empty HTTP field-name token on a boolean, integer, or string property reachable from the input schema root through properties only, and is uniqu"
slug: docs/rules/0.9.0-draft.2/mcp/tool-input-schema-x-mcp-header
ruleSurface: "Tool"
sidebar:
  label: "mcp.tool.input-schema.x-mcp-header"
---

An x-mcp-header annotation is a non-empty HTTP field-name token on a boolean, integer, or string property reachable from the input schema root through properties only, and is unique case-insensitively within the Tool.

**Rule ID:** `mcp.tool.input-schema.x-mcp-header`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `inputSchema properties x-mcp-header`<br>
**Kind:** semantic<br>
**Requirement:** Not specified in the rule record<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| opaque | opaque | opaque | opaque | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `invalid-x-mcp-header` | **error** |
| `duplicate-x-mcp-header` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.2**
  - [/docs/specification/0.9.0-draft.2/tools#req-tool-x-mcp-header](/docs/specification/0.9.0-draft.2/tools#req-tool-x-mcp-header)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 specification, Streamable HTTP transport, x-mcp-header validity and extraction rules
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L334-L402](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L334-L402)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, interface Tool, inputSchema doc comment
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1981-L1997](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1981-L1997)



## Examples

### Valid example

Source: [expected-valid/revision-inapplicable-mcp-header.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-valid/revision-inapplicable-mcp-header.json) · Selected: `/tools/0/inputSchema`

```json
{
  "type": "object",
  "properties": {
    "region": {
      "type": "object",
      "x-mcp-header": 7
    },
    "primary": {
      "type": "string",
      "x-mcp-header": "X-Region"
    },
    "fallback": {
      "type": "string",
      "x-mcp-header": "x-region"
    }
  },
  "allOf": [
    {
      "properties": {
        "composed": {
          "type": "array",
          "x-mcp-header": "Invalid Header"
        }
      }
    }
  ]
}
```

### Valid example

Source: [expected-valid/custom-tool-schema-keywords.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-valid/custom-tool-schema-keywords.json) · Selected: `/tools/0/inputSchema/properties/region`

```json
{
  "type": "string",
  "x-mcp-header": "Region"
}
```

### Invalid example

Source: [expected-invalid/invalid-mcp-header-value.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/invalid-mcp-header-value.json) · Selected: `/tools/0/inputSchema/properties/region`

```json
{
  "type": "number",
  "x-mcp-header": "Invalid Header"
}
```

### Invalid example

Source: [expected-invalid/invalid-mcp-header-placement.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/invalid-mcp-header-placement.json) · Selected: `/tools/0/inputSchema/allOf/0/properties/region`

```json
{
  "type": "string",
  "x-mcp-header": "Region"
}
```

### Invalid example

Source: [expected-invalid/duplicate-mcp-header.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/duplicate-mcp-header.json) · Selected: `/tools/0/inputSchema/properties/fallbackRegion`

```json
{
  "type": "string",
  "x-mcp-header": "x-region"
}
```

## Source record

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
