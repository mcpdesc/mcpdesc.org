---
title: "Use object output schemas before MCP 2026"
description: "MCP 2025-06-18 and 2025-11-25 require an object-rooted outputSchema. MCP 2026-07-28 permits other roots. An array schema therefore needs a scope that excludes the object-only versi"
slug: docs/rules/0.9.0-draft.3/mcp/tool-output-schema-object-root
sidebar:
  label: "mcp.tool.output-schema.object-root"
---

MCP 2025-06-18 and 2025-11-25 require an object-rooted outputSchema. MCP 2026-07-28 permits other roots. An array schema therefore needs a scope that excludes the object-only versions; projection must not wrap it in an object as a repair.


## Requirement

A Tool outputSchema has an object-typed root.

## Details

**Rule ID:** `mcp.tool.output-schema.object-root`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `outputSchema`<br>
**Kind:** structural<br>
**Requirement level:** Not specified in the rule record<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | applies | applies | not-applicable |
## Required by

- **MCP Description 0.9.0, Section 9.2**
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-output-schema-object-root](/docs/specification/0.9.0-draft.3/tools#req-tool-output-schema-object-root)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 and 2025-11-25 schema.ts, interface Tool, outputSchema (type "object")
  - [validation/mcp-schemas/2025-06-18/schema.ts#L947-L955](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L947-L955)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1272-L1284](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1272-L1284)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, interface Tool, outputSchema (no root type)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1999-L2005](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1999-L2005)

## Gaps and arbitrations

:::note[Known gap: `2024-11-05`, `2025-03-26`]
The object-root check also runs where outputSchema is not defined, so a non-object outputSchema reports this error in addition to the revision-availability error.

Resolution: **not-fixed**.
:::



## Examples

### Valid example

Source: [expected-valid/protocol-coverage-and-tool-schemas.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/protocol-coverage-and-tool-schemas.json) · Selected: `/tools/3/outputSchema`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "result": {
          "type": "string"
        }
      },
      "required": [
        "result"
      ],
      "additionalProperties": false
    },
    {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  ]
}
```

### Invalid example

Source: [expected-invalid/non-object-output-schema-before-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/non-object-output-schema-before-2026.json) · Selected: `/tools/0/outputSchema`

```json
{
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
