---
title: "mcpdesc.components.references"
description: "A Reference Object targets an existing component in the namespace its use site requires, without cycles."
slug: docs/rules/0.9.0-draft.1/mcpdesc/components-references
ruleSurface: "Reference Object"
sidebar:
  label: "mcpdesc.components.references"
---

A Reference Object targets an existing component in the namespace its use site requires, without cycles.

**Rule ID:** `mcpdesc.components.references`<br>
**Owner:** mcpdesc<br>
**Surface:** Reference Object · **Path:** `$componentRef`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `missing-component-reference-target` | **error** |
| `wrong-component-reference-namespace` | **error** |
| `component-reference-cycle` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 17.2 to 17.4**
  - [/docs/specification/0.9.0-draft.1/components#req-component-reference-form](/docs/specification/0.9.0-draft.1/components#req-component-reference-form)
  - [/docs/specification/0.9.0-draft.1/components#req-component-reference-resolution](/docs/specification/0.9.0-draft.1/components#req-component-reference-resolution)
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-schema-references-resolved](/docs/specification/0.9.0-draft.1/tools#req-tool-schema-references-resolved)




## Examples

### Invalid example

Source: [expected-invalid/component-reference-resolution.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/component-reference-resolution.json) · Selected: `/components/schemas`

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

## Source record

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
