---
title: "Declare Tools with their defined fields"
description: "A Tool has a non-empty name and an inputSchema, and accepts only the properties of the Section 9.1 table, each with its defined type. The execution object accepts only taskSupport."
slug: docs/rules/0.9.0-rc.1/mcpdesc/tool-members
sidebar:
  label: "mcpdesc.tool.members"
---

A Tool has a non-empty name and an inputSchema, and accepts only the properties of the Section 9.1 table, each with its defined type. The execution object accepts only taskSupport.


## Requirement

A Tool Object has its required fields, defined property types, and no unknown properties; so does its Execution Object.

## Details

**Rule ID:** `mcpdesc.tool.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool, Execution<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/tool`, `#/$defs/execution`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 9.1 and 9.7**
  - 9. Tools: [req-tool-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tools#req-tool-fields)
  - 9. Tools: [req-tool-input-schema-required](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tools#req-tool-input-schema-required)
  - 9. Tools: [req-execution-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tools#req-execution-fields)
  - 12. Elicitation Declarations: [req-elicitations-non-empty](https://mcpdesc.org/docs/specification/0.9.0-rc.1/elicitation#req-elicitations-non-empty)
  - 13. Tags: [req-entity-tags-shape](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tags#req-entity-tags-shape)
  - 13. Tags: [req-entity-tags-unique](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tags#req-entity-tags-unique)




## Examples

### Invalid example

Source: [expected-invalid/empty-ordinary-nested-collections.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/empty-ordinary-nested-collections.json) · Selected: `/tools/0/elicitations`

```json
[]
```

### Invalid example

Source: [expected-invalid/missing-tool-input-schema.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/missing-tool-input-schema.json) · Selected: `/tools/0`

```json
{
  "name": "missing_schema"
}
```

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
