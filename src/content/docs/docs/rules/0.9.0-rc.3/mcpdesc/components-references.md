---
title: "Resolve component references in the right namespace"
description: "A component reference must identify an existing value in the namespace required by its use site, without a reference cycle. Check both the target name and the namespace. Reuse does"
slug: docs/rules/0.9.0-rc.3/mcpdesc/components-references
sidebar:
  label: "mcpdesc.components.references"
---

A component reference must identify an existing value in the namespace required by its use site, without a reference cycle. Check both the target name and the namespace. Reuse does not exempt the resolved value from validation in its containing declaration.


## Requirement

A Reference Object targets an existing component in the namespace its use site requires, without cycles.

## Details

**Rule ID:** `mcpdesc.components.references`<br>
**Owner:** mcpdesc<br>
**Surface:** Reference Object · **Path:** `$componentRef`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 17.2 to 17.4**
  - 17. Reusable Components and Local References: [req-component-reference-form](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#req-component-reference-form)
  - 17. Reusable Components and Local References: [req-component-reference-resolution](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#req-component-reference-resolution)
  - 9. Tools: [req-tool-schema-references-resolved](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#req-tool-schema-references-resolved)
  - 9. Tools: [req-tool-example-references-resolved](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#req-tool-example-references-resolved)
  - 12. Elicitation Declarations: [req-elicitation-schema-references-resolved](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation#req-elicitation-schema-references-resolved)
  - 10. Resources and Resource Templates: [req-resource-example-references-resolved](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-example-references-resolved)
  - 11. Prompts: [req-prompt-example-references-resolved](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-example-references-resolved)
  - 17. Reusable Components and Local References: [req-component-ref-distinct](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#req-component-ref-distinct)
  - 17. Reusable Components and Local References: [req-component-contextual-validation](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#req-component-contextual-validation)
  - 17. Reusable Components and Local References: [req-component-reference-pointer](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#req-component-reference-pointer)
  - 17. Reusable Components and Local References: [req-component-resolution-errors](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#req-component-resolution-errors)
  - 17. Reusable Components and Local References: [req-component-cycles](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#req-component-cycles)




## Examples

### Invalid example

Source: [expected-invalid/component-reference-resolution.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/component-reference-resolution.json) · Selected: `/components/schemas`

```json
{
  "CycleA": {
    "$componentRef": "#/components/schemas/CycleB"
  },
  "CycleB": {
    "$componentRef": "#/components/schemas/CycleA"
  }
}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft).
