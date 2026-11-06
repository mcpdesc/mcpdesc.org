---
title: "Shape Tool interaction examples and steps"
description: "A Tool interaction example has input, ordered steps, and a result. Each step is an elicitation, sampling, or roots step with its request and response, and accepts only its defined "
slug: docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-members
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
  - 9. Tools: [req-interaction-example-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-interaction-example-fields)
  - 9. Tools: [req-interaction-step-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-interaction-step-fields)
  - 9. Tools: [req-interaction-examples-map](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-interaction-examples-map)
  - 9. Tools: [req-interaction-step-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-interaction-step-closed)




## Examples

### Invalid example

Source: [expected-invalid/discriminated-union-members.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/discriminated-union-members.json) · Selected: `/tools/0/interactionExamples/invalid/steps/1`

```json
{
  "type": "roots",
  "request": {},
  "respose": {
    "roots": []
  }
}
```

### Invalid example

Source: [expected-invalid/malformed-tool-interaction-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/malformed-tool-interaction-examples.json) · Selected: `/tools/0/interactionExamples/broken/description`

```json
"not allowed"
```

## Rule Source Code

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
