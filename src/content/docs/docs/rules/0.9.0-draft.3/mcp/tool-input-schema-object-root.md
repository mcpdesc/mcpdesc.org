---
title: "Give Tool input schemas an object root"
description: "A Tool inputSchema must declare the literal type object after component resolution. An array schema or a schema that only implies an object through composition does not satisfy thi"
slug: docs/rules/0.9.0-draft.3/mcp/tool-input-schema-object-root
sidebar:
  label: "mcp.tool.input-schema.object-root"
---

A Tool inputSchema must declare the literal type object after component resolution. An array schema or a schema that only implies an object through composition does not satisfy this root requirement. Keep object arguments under properties and validate their values separately.


## Requirement

Tool inputSchema is a JSON Schema object whose root declares type "object", because tool arguments are always JSON objects.

## Details

**Rule ID:** `mcp.tool.input-schema.object-root`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `inputSchema`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** arbitrated · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 9.2**
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-input-schema-object-root](/docs/specification/0.9.0-draft.3/tools#req-tool-input-schema-object-root)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface Tool, inputSchema type: "object"
  - [validation/mcp-schemas/2024-11-05/schema.ts#L696-L703](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L696-L703)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L797-L804](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L797-L804)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L938-L945](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L938-L945)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1257-L1265](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1257-L1265)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1981-L1997](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1981-L1997)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 specification, Server Features, Tools, Data Types, Tool (inputSchema MUST be a valid JSON Schema object, not null)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L293-L293](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L293-L293)
- **Tier 4 — Official MCP clarifications and final SEPs:** MCP SEP-2106 (Final), which keeps type "object" deliberately
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/seps/2106-json-schema-2020-12.md](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/seps/2106-json-schema-2020-12.md)

## Gaps and arbitrations

:::note[Arbitration: `2025-11-25`, `2026-07-28`]
**Conflict:** The specification lets embedded schemas declare another dialect with $schema, while schema.ts requires the JSON Schema keyword and value type "object" at the root. A schema rooted in $ref or allOf, or written in a dialect without that keyword, can describe an object but does not match the TypeScript type.

**Authority:** MCP schema.ts, the source of truth for message structures

**Behavior:** Require a literal type "object" at the inputSchema root in every revision.

**Rationale:** The structural source of truth is explicit and SEP-2106 retained the requirement on purpose; clients commonly pass inputSchema to model APIs that expect an object root.

**Review trigger:** Resolution of MCP issue 3238 or a later MCP revision that changes the inputSchema type..

Upstream: [https://github.com/modelcontextprotocol/modelcontextprotocol/issues/3238](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/3238).
:::



## Examples

### Valid example

Source: [expected-valid/custom-tool-schema-keywords.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/custom-tool-schema-keywords.json) · Selected: `/tools/0/inputSchema`

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

### Invalid example

Source: [expected-invalid/non-object-input-schema.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/non-object-input-schema.json) · Selected: `/tools/0/inputSchema`

```json
{
  "type": "string"
}
```

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
