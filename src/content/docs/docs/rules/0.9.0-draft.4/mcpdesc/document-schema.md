---
title: "Match the MCP Description document schema"
description: "The document root has the required mcpdesc, info, and protocolVersions members, only the members of Section 3.2, and non-empty ordinary collections. Failures inside a root member b"
slug: docs/rules/0.9.0-draft.4/mcpdesc/document-schema
sidebar:
  label: "mcpdesc.document.schema"
---

The document root has the required mcpdesc, info, and protocolVersions members, only the members of Section 3.2, and non-empty ordinary collections. Failures inside a root member belong to the rule that owns that member's schema location; this rule reports root-level failures.


## Requirement

A document validates against the JSON Schema for its declared mcpdesc version. This rule owns the document root and generic JSON values; every other schema location belongs to a more specific rule.

## Details

**Rule ID:** `mcpdesc.document.schema`<br>
**Owner:** mcpdesc<br>
**Surface:** Document<br>
**Kind:** structural<br>
**Requirement level:** Not specified in the rule record<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#`, `#/$defs/jsonValue`, `#/$defs/specificationExtensionValue`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 16.1, item 7**
  - [/docs/specification/0.9.0-draft.4/conformance#req-document-schema](/docs/specification/0.9.0-draft.4/conformance#req-document-schema)
  - [/docs/specification/0.9.0-draft.4/document-structure#req-root-fields](/docs/specification/0.9.0-draft.4/document-structure#req-root-fields)
  - [/docs/specification/0.9.0-draft.4/document-structure#req-closed-objects](/docs/specification/0.9.0-draft.4/document-structure#req-closed-objects)
  - [/docs/specification/0.9.0-draft.4/tools#req-tool-input-schema-required](/docs/specification/0.9.0-draft.4/tools#req-tool-input-schema-required)
  - [/docs/specification/0.9.0-draft.4/document-structure#req-ordinary-collections-non-empty](/docs/specification/0.9.0-draft.4/document-structure#req-ordinary-collections-non-empty)
  - [/docs/specification/0.9.0-draft.4/document-structure#req-ordinary-collections-omitted](/docs/specification/0.9.0-draft.4/document-structure#req-ordinary-collections-omitted)
  - [/docs/specification/0.9.0-draft.4/versioning#req-mcpdesc-required](/docs/specification/0.9.0-draft.4/versioning#req-mcpdesc-required)
  - [/docs/specification/0.9.0-draft.4/versioning#req-mcpdesc-version](/docs/specification/0.9.0-draft.4/versioning#req-mcpdesc-version)
  - [/docs/specification/0.9.0-draft.4/versioning#req-version-check](/docs/specification/0.9.0-draft.4/versioning#req-version-check)
  - [/docs/specification/0.9.0-draft.4/info-object#req-info-required](/docs/specification/0.9.0-draft.4/info-object#req-info-required)
  - [/docs/specification/0.9.0-draft.4/transports#req-transports-non-empty](/docs/specification/0.9.0-draft.4/transports#req-transports-non-empty)
  - [/docs/specification/0.9.0-draft.4/capabilities#req-capabilities-non-empty](/docs/specification/0.9.0-draft.4/capabilities#req-capabilities-non-empty)
  - [/docs/specification/0.9.0-draft.4/tags#req-tags-non-empty](/docs/specification/0.9.0-draft.4/tags#req-tags-non-empty)
  - [/docs/specification/0.9.0-draft.4/tags#req-tags-omitted](/docs/specification/0.9.0-draft.4/tags#req-tags-omitted)
  - [/docs/specification/0.9.0-draft.4/conformance#req-conforming-document](/docs/specification/0.9.0-draft.4/conformance#req-conforming-document)
  - [/docs/specification/0.9.0-draft.4/specification-extensions#req-extension-names](/docs/specification/0.9.0-draft.4/specification-extensions#req-extension-names)
  - [/docs/specification/0.9.0-draft.4/specification-extensions#req-extension-unknown-accepted](/docs/specification/0.9.0-draft.4/specification-extensions#req-extension-unknown-accepted)
  - [/docs/specification/0.9.0-draft.4/serialization#req-serialization-empty-collections](/docs/specification/0.9.0-draft.4/serialization#req-serialization-empty-collections)



## Notes

The optional root $schema does not select the schema used for validation: optional-schema-omitted.json omits it and validates against the schema for its mcpdesc version.


## Examples

### Valid example

Source: [expected-valid/optional-schema-omitted.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-valid/optional-schema-omitted.json) · Selected: whole document

<details>
<summary>Show whole fixture</summary>

```json
{
  "mcpdesc": "0.9.0",
  "info": {
    "name": "schema-omitted",
    "version": "1.0.0"
  },
  "protocolVersions": [
    "2026-07-28"
  ]
}
```

</details>

### Invalid example

Source: [expected-invalid/empty-ordinary-root-collections.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-invalid/empty-ordinary-root-collections.json) · Selected: `/capabilities`

```json
[]
```

### Invalid example

Source: [expected-invalid/empty-tag-catalog-reference.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-invalid/empty-tag-catalog-reference.json) · Selected: `/tags`

```json
[]
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.4`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft).
