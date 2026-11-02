---
title: "Shape Tool interaction examples and steps"
description: "A Tool interaction example has input, ordered steps, and a result. Each step is an elicitation, sampling, or roots step with its request and response, and accepts only its defined "
slug: docs/rules/0.9.0-draft.4/mcpdesc/tool-interaction-members
sidebar:
  label: "mcpdesc.tool.interaction.members"
---

A Tool interaction example has input, ordered steps, and a result. Each step is an elicitation, sampling, or roots step with its request and response, and accepts only its defined properties.


## Requirement

Interaction examples and steps have their required members, a known step type, and no unknown properties.

## Details

**Rule ID:** `mcpdesc.tool.interaction.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool interaction example<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/toolInteractionExamples`, `#/$defs/toolInteractionExample`, `#/$defs/toolInteractionStep`, `#/$defs/toolInteractionElicitationStep`, `#/$defs/toolInteractionSamplingStep`, `#/$defs/toolInteractionRootsStep`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 9.4**
  - [/docs/specification/0.9.0-draft.4/tools#req-interaction-example-fields](/docs/specification/0.9.0-draft.4/tools#req-interaction-example-fields)
  - [/docs/specification/0.9.0-draft.4/tools#req-interaction-step-fields](/docs/specification/0.9.0-draft.4/tools#req-interaction-step-fields)
  - [/docs/specification/0.9.0-draft.4/tools#req-interaction-examples-map](/docs/specification/0.9.0-draft.4/tools#req-interaction-examples-map)
  - [/docs/specification/0.9.0-draft.4/tools#req-interaction-step-closed](/docs/specification/0.9.0-draft.4/tools#req-interaction-step-closed)




## Examples

### Invalid example

Source: [expected-invalid/malformed-sampling-step.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-invalid/malformed-sampling-step.json) · Selected: `/tools/0/interactionExamples/summary/steps/0/request`

```json
{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "Summarize the release plan."
      }
    }
  ]
}
```

### Invalid example

Source: [expected-invalid/malformed-tool-interaction-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-invalid/malformed-tool-interaction-examples.json) · Selected: `/tools/0/interactionExamples/broken/description`

```json
"not allowed"
```

## Rule Source Code

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-draft.4`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft).
