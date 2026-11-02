---
title: "Shape components and Reference Objects"
description: "The components object holds non-empty named maps in its five namespaces. A Reference Object has exactly one $componentRef. Where a value may be inline or a reference, the inline fo"
slug: docs/rules/0.9.0-rc.1/mcpdesc/components-members
sidebar:
  label: "mcpdesc.components.members"
---

The components object holds non-empty named maps in its five namespaces. A Reference Object has exactly one $componentRef. Where a value may be inline or a reference, the inline form is a JSON object without $componentRef.


## Requirement

Components contain non-empty, well-named maps; a Reference Object has only $componentRef; an inline schema or example is an object.

## Details

**Rule ID:** `mcpdesc.components.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Components, Reference Object<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/components`, `#/$defs/componentMap`, `#/$defs/referenceObject`, `#/$defs/schemaComponentValue`, `#/$defs/jsonSchemaObject`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 17.1 and 17.2**
  - [/docs/specification/0.9.0-rc.1/components#req-components-fields](/docs/specification/0.9.0-rc.1/components#req-components-fields)
  - [/docs/specification/0.9.0-rc.1/components#req-reference-object-fields](/docs/specification/0.9.0-rc.1/components#req-reference-object-fields)
  - [/docs/specification/0.9.0-rc.1/specification-extensions#req-extension-ineligible-locations](/docs/specification/0.9.0-rc.1/specification-extensions#req-extension-ineligible-locations)
  - [/docs/specification/0.9.0-rc.1/specification-extensions#req-extension-component-names](/docs/specification/0.9.0-rc.1/specification-extensions#req-extension-component-names)
  - [/docs/specification/0.9.0-rc.1/components#req-component-maps](/docs/specification/0.9.0-rc.1/components#req-component-maps)
  - [/docs/specification/0.9.0-rc.1/components#req-components-closed](/docs/specification/0.9.0-rc.1/components#req-components-closed)




## Examples

### Invalid example

Source: [expected-invalid/component-extension-boundaries.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/component-extension-boundaries.json) · Selected: `/components/toolExamples/x-map-extension`

```json
true
```

### Invalid example

Source: [expected-invalid/components-empty-and-reference-shapes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/components-empty-and-reference-shapes.json) · Selected: `/components/schemas`

```json
{}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
