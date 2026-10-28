---
title: "mcpdesc.document.schema"
description: "A document validates against the JSON Schema for its declared mcpdesc version. Used for structural failures not attributed to a more specific rule."
slug: docs/rules/0.9.0-draft.1/mcpdesc/document-schema
ruleSurface: "Document"
sidebar:
  label: "mcpdesc.document.schema"
---

A document validates against the JSON Schema for its declared mcpdesc version. Used for structural failures not attributed to a more specific rule.

**Rule ID:** `mcpdesc.document.schema`<br>
**Owner:** mcpdesc<br>
**Surface:** Document<br>
**Kind:** structural<br>
**Requirement:** Not specified in the rule record<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `schema-validation` | **error** |

## Required by

- **MCP Description 0.9.0, Section 16.1, item 7**
  - [/docs/specification/0.9.0-draft.1/conformance#req-document-schema](/docs/specification/0.9.0-draft.1/conformance#req-document-schema)
  - [/docs/specification/0.9.0-draft.1/document-structure#req-closed-objects](/docs/specification/0.9.0-draft.1/document-structure#req-closed-objects)
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-input-schema-required](/docs/specification/0.9.0-draft.1/tools#req-tool-input-schema-required)




## Examples

### Invalid example

Source: [expected-invalid/missing-tool-input-schema.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/missing-tool-input-schema.json) · Selected: `/tools/0`

```json
{
  "name": "missing_schema"
}
```

### Invalid example

Source: [expected-invalid/object-level-unknown-property.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/object-level-unknown-property.json) · Selected: `/tools/0`

```json
{
  "name": "search",
  "inputSchema": {
    "type": "object"
  },
  "acmeRisk": "high"
}
```

## Source record

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
