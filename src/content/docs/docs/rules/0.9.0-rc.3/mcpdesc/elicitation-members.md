---
title: "Declare elicitations with their mode fields"
description: "An elicitation declaration has a name, a mode, and a message. Form mode requires requestedSchema and forbids url; URL mode requires url and forbids requestedSchema. Unknown propert"
slug: docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members
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
  - 12. Elicitation Declarations: [req-elicitation-declaration-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-declaration-fields)
  - 12. Elicitation Declarations: [req-elicitation-name-format](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-name-format)
  - 12. Elicitation Declarations: [req-elicitation-message](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-message)
  - 12. Elicitation Declarations: [req-elicitation-documentation-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-documentation-fields)
  - 12. Elicitation Declarations: [req-elicitation-form-schema-required](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-form-schema-required)
  - 12. Elicitation Declarations: [req-elicitation-form-no-url](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-form-no-url)
  - 12. Elicitation Declarations: [req-elicitation-url-no-schema](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-url-no-schema)
  - 12. Elicitation Declarations: [req-elicitation-url-syntax](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-url-syntax)




## Examples

### Invalid example

Source: [expected-invalid/elicitation-branch-mixing.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/elicitation-branch-mixing.json) · Selected: `/resources/0/elicitations/0`

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

### Invalid example

Source: [expected-invalid/discriminated-union-members.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/discriminated-union-members.json) · Selected: `/tools/0/elicitations/0`

```json
{
  "name": "approve",
  "mode": "form",
  "message": "Approve?"
}
```

## Rule Source Code

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft).
