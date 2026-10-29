---
title: "Keep interactions consistent with client requirements"
description: "A Tool interaction example can contradict its explicit minimum client requirements. Review the warning against the scenario and the declared requirements. The example does not auto"
slug: docs/rules/0.9.0-draft.3/mcpdesc/tool-interaction-client-requirements-consistency
sidebar:
  label: "mcpdesc.tool.interaction.client-requirements-consistency"
---

A Tool interaction example can contradict its explicit minimum client requirements. Review the warning against the scenario and the declared requirements. The example does not automatically create or strengthen a client requirement.


## Requirement

Interaction steps do not contradict the Tool's explicit client capability requirements.

## Details

**Rule ID:** `mcpdesc.tool.interaction.client-requirements-consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool interaction example · **Path:** `steps`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** should<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Sections 8.5 and 9.4**
  - [/docs/specification/0.9.0-draft.3/tools#req-interaction-client-requirements-warning](/docs/specification/0.9.0-draft.3/tools#req-interaction-client-requirements-warning)



## Notes

Steps never create requirements; the warning reports a contradiction only.


## Examples

### Accepted with a warning

Source: [expected-warning/tool-interaction-client-requirements-contradictions.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/tool-interaction-client-requirements-contradictions.json) · Selected: `/tools/0/interactionExamples/contradictory/steps/0`

```json
{
  "type": "roots",
  "request": {},
  "response": {
    "roots": [
      {
        "uri": "file:///workspace/example"
      }
    ]
  }
}
```

## Rule Source Code

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
