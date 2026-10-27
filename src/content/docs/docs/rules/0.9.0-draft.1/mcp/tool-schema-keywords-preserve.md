---
title: "Tool inputSchema and outputSchema are JSON Schema objects; keywords beyond those MCP lists are permitted and preserved, and acquire MCP semantics only where a revision defines them."
description: "Tool inputSchema and outputSchema are JSON Schema objects; keywords beyond those MCP lists are permitted and preserved, and acquire MCP semantics only where a revision defines them"
slug: docs/rules/0.9.0-draft.1/mcp/tool-schema-keywords-preserve
---

**Rule ID:** `mcp.tool.schema-keywords.preserve`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `inputSchema, outputSchema`<br>
**Kind:** preservation<br>
**Requirement:** Not specified in the rule record<br>
**Status:** arbitrated · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

This rule record declares no diagnostic codes.

## Required by

- **MCP Description 0.9.0, Section 9.2**
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-schema-vocabulary](/docs/specification/0.9.0-draft.1/tools#req-tool-schema-vocabulary)
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-schema-keywords-preserved](/docs/specification/0.9.0-draft.1/tools#req-tool-schema-keywords-preserved)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2025-11-25 schema.ts, interface Tool, inputSchema and outputSchema doc comments ("A JSON Schema object")
  - [validation/mcp-schemas/2024-11-05/schema.ts#L696-L703](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L696-L703)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L797-L804](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L797-L804)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L938-L945](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L938-L945)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1257-L1265](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1257-L1265)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L947-L955](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L947-L955)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1272-L1284](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1272-L1284)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, interface Tool, inputSchema and outputSchema (index signature [key: string]: unknown)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1981-L1997](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1981-L1997)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1999-L2005](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1999-L2005)

## Gaps and arbitrations

:::note[Arbitration: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`]
**Conflict:** The TypeScript type of inputSchema (and outputSchema from 2025-06-18) lists only type, properties, required, and from 2025-11-25 $schema, with no index signature, while its doc comment defines the value as a JSON Schema object.

**Authority:** MCP schema.ts doc comment, consistent with MCP 2026-07-28

**Behavior:** Accept and preserve any JSON Schema keyword in these revisions.

**Rationale:** A JSON Schema object admits any keyword. MCP 2026-07-28 makes this explicit with an index signature, and rejecting keywords such as $defs or $ref would reject Tools that MCP clients accept.

**Review trigger:** An upstream clarification or erratum for the earlier revisions..
:::



## Examples

### Valid example

Source: [expected-valid/custom-tool-schema-keywords.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-valid/custom-tool-schema-keywords.json) · Selected: `/tools/0/inputSchema`

```json
{
  "type": "object",
  "properties": {
    "account": {
      "type": "string",
      "x-acme-account-id": true,
      "database-field-id": 123
    },
    "region": {
      "type": "string",
      "x-mcp-header": "Region"
    }
  }
}
```

### Valid example

Source: [expected-valid/revision-inapplicable-mcp-header.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-valid/revision-inapplicable-mcp-header.json) · Selected: `/tools/0/inputSchema`

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

## Source record

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
