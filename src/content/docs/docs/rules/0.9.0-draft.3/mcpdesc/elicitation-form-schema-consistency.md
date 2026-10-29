---
title: "Keep elicitation form constraints consistent"
description: "Form properties, required names, enum labels, defaults, and bounds must agree with one another. Correct references to absent properties and contradictory constraints. Passing JSON "
slug: docs/rules/0.9.0-draft.3/mcpdesc/elicitation-form-schema-consistency
sidebar:
  label: "mcpdesc.elicitation.form-schema.consistency"
---

Form properties, required names, enum labels, defaults, and bounds must agree with one another. Correct references to absent properties and contradictory constraints. Passing JSON Schema's outer shape checks does not prove that the declared form is internally consistent.


## Requirement

A form requestedSchema is internally consistent: required names declared properties, enumNames match enum values, defaults lie within enums, and minimum bounds do not exceed maximum bounds.

## Details

**Rule ID:** `mcpdesc.elicitation.form-schema.consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Elicitation Declaration · **Path:** `requestedSchema`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 12.3**
  - [/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-required](/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-required)
  - [/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-enum-names](/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-enum-names)
  - [/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-defaults](/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-defaults)
  - [/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-ranges](/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-form-ranges)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 schema.ts, PrimitiveSchemaDefinition and EnumSchema (enumNames are display names for enum values)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1479-L1486](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1479-L1486)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2228-L2235](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2228-L2235)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2861-L2868](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2861-L2868)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1527-L1536](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1527-L1536)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2463-L2464](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2463-L2464)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L3117-L3118](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L3117-L3118)



## Examples

### Valid example

Source: [expected-valid/elicitation-declarations.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/elicitation-declarations.json) · Selected: `/tools/0/elicitations`

```json
[
  {
    "name": "choose_assignee",
    "mode": "form",
    "message": "Who should own this issue?",
    "requestedSchema": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "string",
          "title": "Assignee",
          "minLength": 1
        }
      },
      "required": [
        "assignee"
      ]
    }
  },
  {
    "name": "authorize_tracker",
    "mode": "url",
    "message": "Authorize access to the issue tracker.",
    "when": "The current authorization grant is insufficient.",
    "url": "https://auth.example.com/authorize",
    "protocolVersions": [
      "2025-11-25",
      "2026-07-28"
    ]
  },
  {
    "name": "choose_labels",
    "mode": "form",
    "message": "Choose labels for this issue.",
    "requestedSchema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "type": "object",
      "properties": {
        "labels": {
          "type": "array",
          "title": "Labels",
          "items": {
            "type": "string",
            "enum": [
              "bug",
              "feature"
            ]
          },
          "default": [
            "bug"
          ]
        }
      }
    },
    "protocolVersions": [
      "2025-11-25",
      "2026-07-28"
    ]
  }
]
```

### Invalid example

Source: [expected-invalid/elicitation-form-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/elicitation-form-semantics.json) · Selected: `/prompts/0/elicitations/0/requestedSchema/required`

```json
[
  "missing"
]
```

### Invalid example

Source: [expected-invalid/elicitation-form-invalid-range.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/elicitation-form-invalid-range.json) · Selected: `/prompts/0/elicitations/0/requestedSchema/properties/count`

```json
{
  "type": "integer",
  "minimum": 10,
  "maximum": 1
}
```

## Rule Source Code

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
