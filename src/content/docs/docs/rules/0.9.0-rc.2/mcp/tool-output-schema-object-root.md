---
title: "Use object output schemas before MCP 2026"
description: "MCP 2025-06-18 and 2025-11-25 require structured output to be an object. For MCP 2025-06-18 the outputSchema root declares type object. For MCP 2025-11-25 a declared root type must"
slug: docs/rules/0.9.0-rc.2/mcp/tool-output-schema-object-root
sidebar:
  label: "mcp.tool.output-schema.object-root"
---

MCP 2025-06-18 and 2025-11-25 require structured output to be an object. For MCP 2025-06-18 the outputSchema root declares type object. For MCP 2025-11-25 a declared root type must include object; a root without a literal type object stays valid and mcp.tool.schema.native-shape warns. MCP 2026-07-28 permits other roots, so an array schema needs a scope that excludes the object-only versions; projection must not wrap it in an object as a repair.


## Requirement

Before MCP 2026-07-28, a Tool outputSchema describes an object: a literal type "object" for MCP 2025-06-18, and a declared root type that includes "object" for MCP 2025-11-25.

## Details

**Rule ID:** `mcp.tool.output-schema.object-root`<br>
**Owner:** mcp<br>
**Surface:** Tool · **Path:** `outputSchema`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** arbitrated · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | applies | applies | not-applicable |
## Required by

- **MCP Description 0.9.0, Section 9.2**
  - 9. Tools: [req-tool-output-schema-object-root](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-tool-output-schema-object-root)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 and 2025-11-25 schema.ts, interface Tool, outputSchema (type "object")
  - [validation/mcp-schemas/2025-06-18/schema.ts#L947-L955](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L947-L955)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1272-L1284](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1272-L1284)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, interface Tool, outputSchema (no root type)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1999-L2005](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1999-L2005)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 specification, Basic, JSON Schema usage (schemas are validated under their declared or default dialect)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L140-L186](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L140-L186)

## Gaps and arbitrations

:::note[Known gap: `2024-11-05`, `2025-03-26`]
The object-root check also runs where outputSchema is not defined, so a non-object outputSchema reports this error in addition to the protocol-version applicability error.

Resolution: **not-fixed**.
:::

:::note[Arbitration: `2025-11-25`]
**Conflict:** The specification validates the outputSchema under its declared or default dialect, while schema.ts requires the JSON Schema keyword and value type "object" at the root. A root in allOf or $ref can describe an object without matching the TypeScript type.

**Authority:** MCP specification text on schema dialects, with the object requirement on structured output

**Behavior:** Reject a declared root type that excludes "object"; accept other roots that are valid under the dialect, which mcp.tool.schema.native-shape reports as warnings.

**Rationale:** One position for every conflict between MCP's dialect text and the schema syntax of its TypeScript types (Proposal 0032): MCP Description enforces what MCP requires of the data and reports, but does not decide, the narrower TypeScript syntax.

**Review trigger:** Resolution of MCP issue 3238 or an MCP erratum for 2025-11-25..

Upstream: [https://github.com/modelcontextprotocol/modelcontextprotocol/issues/3238](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/3238).
:::



## Examples

### Valid example

Source: [expected-warning/tool-schema-mcp-type-mismatch.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-warning/tool-schema-mcp-type-mismatch.json) · Selected: `/tools/3/outputSchema`

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

### Invalid example

Source: [expected-invalid/non-object-output-schema-before-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/non-object-output-schema-before-2026.json) · Selected: `/tools/0/outputSchema`

```json
{
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

### Rule not applicable

The rule does not run on this fragment for any MCP protocol version it applies to.

Source: [expected-valid/protocol-coverage-and-tool-schemas.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-valid/protocol-coverage-and-tool-schemas.json) · Selected: `/tools/3/outputSchema`

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

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
