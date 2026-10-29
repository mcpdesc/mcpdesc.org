---
title: "Resolve component references in the right namespace"
description: "A component reference must identify an existing value in the namespace required by its use site, without a reference cycle. Check both the target name and the namespace. Reuse does"
slug: docs/rules/0.9.0-draft.3/mcpdesc/components-references
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
  - [/docs/specification/0.9.0-draft.3/components#req-component-reference-form](/docs/specification/0.9.0-draft.3/components#req-component-reference-form)
  - [/docs/specification/0.9.0-draft.3/components#req-component-reference-resolution](/docs/specification/0.9.0-draft.3/components#req-component-reference-resolution)
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-schema-references-resolved](/docs/specification/0.9.0-draft.3/tools#req-tool-schema-references-resolved)




## Examples

### Invalid example

Source: [expected-invalid/component-reference-resolution.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/component-reference-resolution.json) · Selected: `/components/schemas`

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

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
