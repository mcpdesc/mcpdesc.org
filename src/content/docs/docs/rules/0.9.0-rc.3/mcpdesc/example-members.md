---
title: "Shape named example maps and example objects"
description: "Named example maps are non-empty, use names matching ^[A-Za-z0-9._-]+$, and hold an example object or a Reference Object. Each example object has its required members, such as inpu"
slug: docs/rules/0.9.0-rc.3/mcpdesc/example-members
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
  - 9. Tools: [req-tool-example-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#req-tool-example-fields)
  - 10. Resources and Resource Templates: [req-resource-example-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-example-fields)
  - 10. Resources and Resource Templates: [req-resource-template-example-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-template-example-fields)
  - 11. Prompts: [req-prompt-example-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-example-fields)
  - 9. Tools: [req-tool-examples-map](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#req-tool-examples-map)
  - 9. Tools: [req-tool-example-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#req-tool-example-closed)
  - 10. Resources and Resource Templates: [req-resource-examples-map](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-examples-map)
  - 10. Resources and Resource Templates: [req-resource-example-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-example-closed)
  - 10. Resources and Resource Templates: [req-template-completion-examples-map](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-template-completion-examples-map)
  - 10. Resources and Resource Templates: [req-template-completion-example-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-template-completion-example-closed)
  - 10. Resources and Resource Templates: [req-template-completion-context-shape](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-template-completion-context-shape)
  - 11. Prompts: [req-prompt-examples-map](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-examples-map)
  - 11. Prompts: [req-prompt-example-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-example-closed)
  - 11. Prompts: [req-prompt-example-arguments-shape](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-example-arguments-shape)
  - 11. Prompts: [req-prompt-completion-examples-map](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-completion-examples-map)
  - 11. Prompts: [req-prompt-completion-example-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-completion-example-closed)
  - 11. Prompts: [req-prompt-completion-context-shape](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-completion-context-shape)




## Examples

### Invalid example

Source: [expected-invalid/component-extension-boundaries.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/component-extension-boundaries.json) · Selected: `/components/toolExamples/x-map-extension`

```json
true
```

## Rule Source Code

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft).
