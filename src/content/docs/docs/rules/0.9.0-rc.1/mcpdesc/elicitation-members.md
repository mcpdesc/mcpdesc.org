---
title: "Declare elicitations with their mode fields"
description: "An elicitation declaration has a name, a mode, and a message. Form mode requires requestedSchema and forbids url; URL mode requires url and forbids requestedSchema. Unknown propert"
slug: docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members
sidebar:
  label: "mcpdesc.elicitation.members"
---

An elicitation declaration has a name, a mode, and a message. Form mode requires requestedSchema and forbids url; URL mode requires url and forbids requestedSchema. Unknown properties are rejected.


## Requirement

An Elicitation Declaration has its required fields, the fields of its mode only, and no unknown properties.

## Details

**Rule ID:** `mcpdesc.elicitation.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Elicitation Declaration<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/elicitationDeclaration`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 12.2**
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-declaration-fields](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-declaration-fields)
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-name-format](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-name-format)
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-message](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-message)
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-documentation-fields](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-documentation-fields)
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-form-schema-required](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-form-schema-required)
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-form-no-url](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-form-no-url)
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-url-no-schema](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-url-no-schema)
  - [/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-url-syntax](/docs/specification/0.9.0-rc.1/elicitation#req-elicitation-url-syntax)




## Examples

### Invalid example

Source: [expected-invalid/component-contextual-schemas.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/component-contextual-schemas.json) · Selected: `/tools/0/elicitations/0/requestedSchema/$componentRef`

```json
"#/components/schemas/NestedForm"
```

### Invalid example

Source: [expected-invalid/elicitation-branch-mixing.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/elicitation-branch-mixing.json) · Selected: `/resources/0/elicitations/0`

```json
{
  "name": "mixed",
  "mode": "form",
  "message": "Supply account details.",
  "url": "not a valid URI",
  "requestedSchema": {
    "type": "object",
    "properties": {}
  }
}
```

## Rule Source Code

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
