---
title: "Give each elicitation declaration a unique name"
description: "Elicitation declaration names identify interactions within their primitive. Duplicate names make a Tool interaction's declaration reference ambiguous. Rename one declaration and up"
slug: docs/rules/0.9.0-draft.3/mcpdesc/elicitation-name-unique
sidebar:
  label: "mcpdesc.elicitation.name-unique"
---

Elicitation declaration names identify interactions within their primitive. Duplicate names make a Tool interaction's declaration reference ambiguous. Rename one declaration and update the references that are intended to select it.


## Requirement

Elicitation Declaration names are unique within their primitive.

## Details

**Rule ID:** `mcpdesc.elicitation.name-unique`<br>
**Owner:** mcpdesc<br>
**Surface:** Elicitation Declaration · **Path:** `name`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Diagnostics

| Code | Severity |
| --- | --- |
| `duplicate-elicitation-name` | **error** |

## Required by

- **MCP Description 0.9.0, Section 12.2**
  - [/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-name-unique](/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-name-unique)




## Examples

### Invalid example

Source: [expected-invalid/elicitation-form-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/elicitation-form-semantics.json) · Selected: `/prompts/0/elicitations/1`

```json
{
  "name": "release_channel",
  "mode": "form",
  "message": "Choose it again.",
  "requestedSchema": {
    "type": "object",
    "properties": {}
  }
}
```

## Rule Source Code

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
