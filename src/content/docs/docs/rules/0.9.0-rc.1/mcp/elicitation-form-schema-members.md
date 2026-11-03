---
title: "Use MCP primitive schemas in elicitation forms"
description: "A form-mode requestedSchema is a flat object whose properties are MCP primitive schemas: string, number, integer, boolean, or enumeration, with only the keywords MCP defines for th"
slug: docs/rules/0.9.0-rc.1/mcp/elicitation-form-schema-members
sidebar:
  label: "mcp.elicitation.form-schema.members"
---

A form-mode requestedSchema is a flat object whose properties are MCP primitive schemas: string, number, integer, boolean, or enumeration, with only the keywords MCP defines for them.


## Requirement

requestedSchema is an object schema of MCP primitive property schemas with their defined keywords only.

## Details

**Rule ID:** `mcp.elicitation.form-schema.members`<br>
**Owner:** mcp<br>
**Surface:** ElicitRequest requestedSchema<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/elicitationFormSchema`, `#/$defs/elicitationFormProperty`, `#/$defs/elicitationFormOption`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 12.3**
  - 12. Elicitation Declarations: [req-elicitation-form-shape](https://mcpdesc.org/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-form-shape)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 schema.ts, ElicitRequestFormParams and PrimitiveSchemaDefinition
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2155-L2178](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2155-L2178)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2234-L2235](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2234-L2235)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2788-L2811](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2788-L2811)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2867-L2868](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2867-L2868)



## Examples

### Invalid example

Source: [expected-invalid/component-contextual-schemas.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/component-contextual-schemas.json) · Selected: `/tools/0/elicitations/0/requestedSchema`

```json
{
  "$componentRef": "#/components/schemas/NestedForm"
}
```

## Rule Source Code

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
