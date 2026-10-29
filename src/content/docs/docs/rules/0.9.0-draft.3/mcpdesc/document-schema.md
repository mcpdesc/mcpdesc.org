---
title: "Match the MCP Description document schema"
description: "The structural schema checks required fields, types, allowed members, and collection shapes. Use the diagnostic path to locate the invalid value. Passing this check is necessary bu"
slug: docs/rules/0.9.0-draft.3/mcpdesc/document-schema
sidebar:
  label: "mcpdesc.document.schema"
---

The structural schema checks required fields, types, allowed members, and collection shapes. Use the diagnostic path to locate the invalid value. Passing this check is necessary but does not replace semantic checks such as reference resolution or protocol scoping.


## Requirement

A document validates against the JSON Schema for its declared mcpdesc version. Used for structural failures not attributed to a more specific rule.

## Details

**Rule ID:** `mcpdesc.document.schema`<br>
**Owner:** mcpdesc<br>
**Surface:** Document<br>
**Kind:** structural<br>
**Requirement level:** Not specified in the rule record<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 16.1, item 7**
  - [/docs/specification/0.9.0-draft.3/conformance#req-document-schema](/docs/specification/0.9.0-draft.3/conformance#req-document-schema)
  - [/docs/specification/0.9.0-draft.3/document-structure#req-closed-objects](/docs/specification/0.9.0-draft.3/document-structure#req-closed-objects)
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-input-schema-required](/docs/specification/0.9.0-draft.3/tools#req-tool-input-schema-required)




## Examples

### Invalid example

Source: [expected-invalid/missing-tool-input-schema.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/missing-tool-input-schema.json) · Selected: `/tools/0`

```json
{
  "name": "missing_schema"
}
```

### Invalid example

Source: [expected-invalid/object-level-unknown-property.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/object-level-unknown-property.json) · Selected: `/tools/0`

```json
{
  "name": "search",
  "inputSchema": {
    "type": "object"
  },
  "acmeRisk": "high"
}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
