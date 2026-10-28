---
title: "mcpdesc.tool.interaction.client-requirements-consistency"
description: "Interaction steps do not contradict the Tool's explicit client capability requirements."
slug: docs/rules/0.9.0-draft.1/mcpdesc/tool-interaction-client-requirements-consistency
ruleSurface: "Tool interaction example"
sidebar:
  label: "mcpdesc.tool.interaction.client-requirements-consistency"
---

Interaction steps do not contradict the Tool's explicit client capability requirements.

**Rule ID:** `mcpdesc.tool.interaction.client-requirements-consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool interaction example · **Path:** `steps`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** should<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `interaction-example-client-requirements-contradiction` | **warning** |

## Required by

- **MCP Description 0.9.0, Sections 8.5 and 9.4**
  - [/docs/specification/0.9.0-draft.1/tools#req-interaction-client-requirements-warning](/docs/specification/0.9.0-draft.1/tools#req-interaction-client-requirements-warning)



## Notes

Steps never create requirements; the warning reports a contradiction only.


## Examples

### Accepted with a warning

Source: [expected-warning/tool-interaction-client-requirements-contradictions.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/tool-interaction-client-requirements-contradictions.json) · Selected: `/tools/0/interactionExamples/contradictory/steps/0`

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

## Source record

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
