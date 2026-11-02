---
title: "Report Tool schemas that MCP Tool types reject"
description: "From MCP 2025-11-25, an embedded Tool schema is judged by its JSON Schema dialect, but the MCP Tool type still restricts some schema syntax: a literal type object at the inputSchem"
slug: docs/rules/0.9.0-rc.1/mcp/tool-schema-native-shape
sidebar:
  label: "mcp.tool.schema.native-shape"
---

From MCP 2025-11-25, an embedded Tool schema is judged by its JSON Schema dialect, but the MCP Tool type still restricts some schema syntax: a literal type object at the inputSchema root, and for MCP 2025-11-25 at the outputSchema root and an object for each top-level properties value. A schema that misses a restriction stays valid and receives a warning naming the protocol versions concerned, because its native projection for them fails. Use {} instead of true, {"not": {}} instead of false, add type object beside $ref or allOf, or narrow the Tool's protocolVersions.


## Requirement

A Tool schema that is valid under its dialect but misses a schema-syntax restriction of the MCP Tool type for an applicable protocol version is accepted with a warning.

## Details

**Rule ID:** `mcp.tool.schema.native-shape`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `inputSchema, outputSchema`<br>
**Kind:** structural<br>
**Requirement level:** should<br>
**Status:** arbitrated · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | not-applicable | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 9.2**
  - [/docs/specification/0.9.0-rc.1/tools#req-tool-schema-native-shape](/docs/specification/0.9.0-rc.1/tools#req-tool-schema-native-shape)
- **Proposal 0032, Dialect-governed Tool schemas**
  - [proposal-snapshots/0032-dialect-governed-tool-schemas.md](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/proposal-snapshots/0032-dialect-governed-tool-schemas.md)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 schema.ts, interface Tool: inputSchema and outputSchema have type: "object" and properties?: { [key: string]: object }
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1257-L1284](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1257-L1284)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, interface Tool: inputSchema has type: "object" and an open index signature; outputSchema has no root type
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1981-L2005](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1981-L2005)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 specification, Basic, JSON Schema usage (schemas are validated under their declared or default dialect)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L140-L186](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L140-L186)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L251-L297](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L251-L297)
- **Tier 5 — Official SDKs and reference implementations:** Official TypeScript SDK, Tool schema: any JSON value under properties, type: z.literal('object') at the inputSchema root
  - [https://github.com/modelcontextprotocol/typescript-sdk/blob/39ae8e6192cf43273aaaf2de4169dfa9f7216e28/packages/core/src/schemas.ts#L1352-L1358](https://github.com/modelcontextprotocol/typescript-sdk/blob/39ae8e6192cf43273aaaf2de4169dfa9f7216e28/packages/core/src/schemas.ts#L1352-L1358)

## Gaps and arbitrations

:::note[Arbitration: `2025-11-25`, `2026-07-28`]
**Conflict:** MCP validates embedded schemas under their declared or default dialect, JSON Schema 2020-12 by default, which allows boolean subschemas and roots in $ref or allOf. The TypeScript Tool type requires a literal type "object" at the inputSchema root, and in MCP 2025-11-25 also at the outputSchema root and an object for each top-level properties value.

**Authority:** MCP specification text on schema dialects

**Behavior:** Accept the schema, report a warning naming the protocol versions concerned, and let native projection fail its postcondition for them.

**Rationale:** The conflict is internal to MCP, so MCP Description reports it instead of deciding it (Proposal 0032). MCP 2026-07-28 removed the properties restriction, the official SDKs accept boolean property subschemas, and authors can always meet the restriction without changing the meaning of the schema.

**Review trigger:** Resolution of MCP issue 3238 or an MCP erratum for 2025-11-25..

Upstream: [https://github.com/modelcontextprotocol/modelcontextprotocol/issues/3238](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/3238).
:::


## Notes

Only a declared root type is examined; composition is not analyzed to prove that a root admits objects. Nested schemas and keywords other than top-level properties are not restricted by any MCP Tool type.


## Examples

### Valid example

Source: [expected-valid/tool-schema-mcp-type-shapes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-valid/tool-schema-mcp-type-shapes.json) · Selected: `/tools/0/inputSchema`

```json
{
  "type": "object",
  "properties": {
    "enabled": {},
    "debug": {
      "not": {}
    }
  }
}
```

### Valid example

Source: [expected-valid/tool-schema-mcp-type-shapes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-valid/tool-schema-mcp-type-shapes.json) · Selected: `/tools/1/inputSchema`

```json
{
  "type": "object",
  "$ref": "#/$defs/Arguments",
  "$defs": {
    "Arguments": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string"
        }
      },
      "required": [
        "query"
      ]
    }
  }
}
```

### Valid example

Source: [expected-valid/tool-schema-mcp-type-shapes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-valid/tool-schema-mcp-type-shapes.json) · Selected: `/tools/2/inputSchema`

```json
{
  "type": "object",
  "properties": {
    "options": {
      "type": "object",
      "properties": {
        "strict": true
      }
    },
    "tags": {
      "type": "array",
      "items": true
    }
  },
  "additionalProperties": false
}
```

### Valid example

Source: [expected-valid/tool-schema-mcp-type-shapes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-valid/tool-schema-mcp-type-shapes.json) · Selected: `/tools/3/inputSchema`

```json
{
  "type": "object",
  "properties": {
    "enabled": true
  }
}
```

### Accepted with a warning

Source: [expected-warning/tool-schema-mcp-type-mismatch.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-warning/tool-schema-mcp-type-mismatch.json) · Selected: `/tools/0/inputSchema/properties/enabled`

```json
true
```

### Accepted with a warning

Source: [expected-warning/tool-schema-mcp-type-mismatch.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-warning/tool-schema-mcp-type-mismatch.json) · Selected: `/tools/0/inputSchema/properties/debug`

```json
false
```

### Accepted with a warning

Source: [expected-warning/tool-schema-mcp-type-mismatch.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-warning/tool-schema-mcp-type-mismatch.json) · Selected: `/tools/1/outputSchema/properties/result`

```json
true
```

### Accepted with a warning

Source: [expected-warning/tool-schema-mcp-type-mismatch.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-warning/tool-schema-mcp-type-mismatch.json) · Selected: `/tools/2/inputSchema`

```json
{
  "$ref": "#/$defs/Arguments",
  "$defs": {
    "Arguments": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string"
        }
      },
      "required": [
        "query"
      ]
    }
  }
}
```

### Accepted with a warning

Source: [expected-warning/tool-schema-mcp-type-mismatch.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-warning/tool-schema-mcp-type-mismatch.json) · Selected: `/tools/3/outputSchema`

```json
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "summary": {
          "type": "string"
        }
      }
    }
  ]
}
```

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
