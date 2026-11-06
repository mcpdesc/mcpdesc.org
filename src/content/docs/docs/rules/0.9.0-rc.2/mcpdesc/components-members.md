---
title: "Shape components and Reference Objects"
description: "The components object holds non-empty named maps in its five namespaces. A Reference Object has exactly one $componentRef. Where a value may be inline or a reference, the inline fo"
slug: docs/rules/0.9.0-rc.2/mcpdesc/components-members
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
  - 17. Reusable Components and Local References: [req-components-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/components#req-components-fields)
  - 17. Reusable Components and Local References: [req-reference-object-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/components#req-reference-object-fields)
  - 14. Specification Extensions: [req-extension-ineligible-locations](https://mcpdesc.org/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-ineligible-locations)
  - 14. Specification Extensions: [req-extension-component-names](https://mcpdesc.org/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-component-names)
  - 17. Reusable Components and Local References: [req-component-maps](https://mcpdesc.org/docs/specification/0.9.0-rc.2/components#req-component-maps)
  - 17. Reusable Components and Local References: [req-components-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.2/components#req-components-closed)




## Examples

### Invalid example

Source: [expected-invalid/component-extension-boundaries.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/component-extension-boundaries.json) · Selected: `/components/toolExamples/x-map-extension`

```json
true
```

### Invalid example

Source: [expected-invalid/components-empty-and-reference-shapes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/components-empty-and-reference-shapes.json) · Selected: `/components/schemas`

```json
{}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
