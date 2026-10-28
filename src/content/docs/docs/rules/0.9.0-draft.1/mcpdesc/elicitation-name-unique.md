---
title: "mcpdesc.elicitation.name-unique"
description: "Elicitation Declaration names are unique within their primitive."
slug: docs/rules/0.9.0-draft.1/mcpdesc/elicitation-name-unique
ruleSurface: "Elicitation Declaration"
sidebar:
  label: "mcpdesc.elicitation.name-unique"
---

Elicitation Declaration names are unique within their primitive.

**Rule ID:** `mcpdesc.elicitation.name-unique`<br>
**Owner:** mcpdesc<br>
**Surface:** Elicitation Declaration · **Path:** `name`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `duplicate-elicitation-name` | **error** |

## Required by

- **MCP Description 0.9.0, Section 12.2**
  - [/docs/specification/0.9.0-draft.1/elicitation#req-elicitation-name-unique](/docs/specification/0.9.0-draft.1/elicitation#req-elicitation-name-unique)




## Examples

### Invalid example

Source: [expected-invalid/elicitation-form-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/elicitation-form-semantics.json) · Selected: `/prompts/0/elicitations/1`

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

## Source record

[elicitation.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/elicitation.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
