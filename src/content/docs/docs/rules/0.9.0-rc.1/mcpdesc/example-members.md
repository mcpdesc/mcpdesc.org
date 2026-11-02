---
title: "Shape named example maps and example objects"
description: "Named example maps are non-empty, use names matching ^[A-Za-z0-9._-]+$, and hold an example object or a Reference Object. Each example object has its required members, such as inpu"
slug: docs/rules/0.9.0-rc.1/mcpdesc/example-members
sidebar:
  label: "mcpdesc.example.members"
---

Named example maps are non-empty, use names matching ^[A-Za-z0-9._-]+$, and hold an example object or a Reference Object. Each example object has its required members, such as input and result, and only its defined properties.


## Requirement

Example maps and Tool, Resource, Resource Template, Prompt, and completion example objects have valid names, required members, and no unknown properties.

## Details

**Rule ID:** `mcpdesc.example.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool, Resource, Resource Template, Prompt, and completion examples<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/toolExamples`, `#/$defs/toolExample`, `#/$defs/resourceExamples`, `#/$defs/resourceExample`, `#/$defs/resourceTemplateExamples`, `#/$defs/resourceTemplateExample`, `#/$defs/promptExamples`, `#/$defs/promptExample`, `#/$defs/completionExamples`, `#/$defs/completionExample`, `#/$defs/completionArgument`, `#/$defs/completionContext`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 9.3, 10.4, and 11.3**
  - [/docs/specification/0.9.0-rc.1/tools#req-tool-example-fields](/docs/specification/0.9.0-rc.1/tools#req-tool-example-fields)
  - [/docs/specification/0.9.0-rc.1/resources#req-resource-example-fields](/docs/specification/0.9.0-rc.1/resources#req-resource-example-fields)
  - [/docs/specification/0.9.0-rc.1/resources#req-resource-template-example-fields](/docs/specification/0.9.0-rc.1/resources#req-resource-template-example-fields)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-example-fields](/docs/specification/0.9.0-rc.1/prompts#req-prompt-example-fields)
  - [/docs/specification/0.9.0-rc.1/tools#req-tool-examples-map](/docs/specification/0.9.0-rc.1/tools#req-tool-examples-map)
  - [/docs/specification/0.9.0-rc.1/tools#req-tool-example-closed](/docs/specification/0.9.0-rc.1/tools#req-tool-example-closed)
  - [/docs/specification/0.9.0-rc.1/resources#req-resource-examples-map](/docs/specification/0.9.0-rc.1/resources#req-resource-examples-map)
  - [/docs/specification/0.9.0-rc.1/resources#req-resource-example-closed](/docs/specification/0.9.0-rc.1/resources#req-resource-example-closed)
  - [/docs/specification/0.9.0-rc.1/resources#req-template-completion-examples-map](/docs/specification/0.9.0-rc.1/resources#req-template-completion-examples-map)
  - [/docs/specification/0.9.0-rc.1/resources#req-template-completion-example-closed](/docs/specification/0.9.0-rc.1/resources#req-template-completion-example-closed)
  - [/docs/specification/0.9.0-rc.1/resources#req-template-completion-context-shape](/docs/specification/0.9.0-rc.1/resources#req-template-completion-context-shape)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-examples-map](/docs/specification/0.9.0-rc.1/prompts#req-prompt-examples-map)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-example-closed](/docs/specification/0.9.0-rc.1/prompts#req-prompt-example-closed)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-example-arguments-shape](/docs/specification/0.9.0-rc.1/prompts#req-prompt-example-arguments-shape)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-examples-map](/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-examples-map)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-example-closed](/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-example-closed)
  - [/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-context-shape](/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-context-shape)




## Examples

### Invalid example

Source: [expected-invalid/content-annotations-unknown-property.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/content-annotations-unknown-property.json) · Selected: `/tools/0/examples/basic`

```json
{
  "input": {},
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Done",
        "annotations": {
          "audience": [
            "user"
          ],
          "readOnlyHint": true
        }
      }
    ]
  }
}
```

### Invalid example

Source: [expected-invalid/fractional-resource-link-size.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/fractional-resource-link-size.json) · Selected: `/tools/0/examples/listing`

```json
{
  "input": {},
  "result": {
    "content": [
      {
        "type": "resource_link",
        "uri": "file:///reports/q3.pdf",
        "name": "q3_report",
        "size": 2048.5
      }
    ]
  }
}
```

## Rule Source Code

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
