---
title: "Use the applicable elicitation form vocabulary"
description: "The allowed form-schema vocabulary depends on the MCP protocol version. Check the fields of requestedSchema against that vocabulary rather than assuming a general Tool JSON Schema "
slug: docs/rules/0.9.0-draft.3/mcp/elicitation-form-schema-revision-shape
sidebar:
  label: "mcp.elicitation.form-schema.revision-shape"
---

The allowed form-schema vocabulary depends on the MCP protocol version. Check the fields of requestedSchema against that vocabulary rather than assuming a general Tool JSON Schema can be copied into an elicitation form unchanged.


## Requirement

In MCP 2025-06-18, a form requestedSchema has no $schema, no array or titled enum properties, and default only on boolean properties.

## Details

**Rule ID:** `mcp.elicitation.form-schema.revision-shape`<br>
**Owner:** mcp<br>
**Surface:** ElicitRequest · **Path:** `requestedSchema`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | applies | not-applicable | not-applicable |
## Diagnostics

| Code | Severity |
| --- | --- |
| `elicitation-form-schema-version-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Section 12.3**
  - [/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-vocabulary](/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-vocabulary)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 schema.ts, ElicitRequest requestedSchema and PrimitiveSchemaDefinition (default only on BooleanSchema; EnumSchema with enum and enumNames)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1453-L1477](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1453-L1477)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1479-L1486](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1479-L1486)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1517-L1525](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1517-L1525)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1527-L1536](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1527-L1536)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 schema.ts, requestedSchema $schema, default on all primitive schemas, titled and multi-select enum schemas
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2150-L2178](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2150-L2178)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2228-L2235](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2228-L2235)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2463-L2464](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2463-L2464)



## Examples

### Invalid example

Source: [expected-invalid/elicitation-form-schema-2025-06-18.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/elicitation-form-schema-2025-06-18.json) · Selected: `/prompts/0/elicitations/0/requestedSchema`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "colors": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "red",
          "blue"
        ]
      }
    },
    "label": {
      "type": "string",
      "default": "main"
    }
  }
}
```

## Rule Source Code

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
