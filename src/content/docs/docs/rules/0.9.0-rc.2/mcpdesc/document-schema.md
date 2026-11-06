---
title: "Match the MCP Description document schema"
description: "The document root has the required mcpdesc, info, and protocolVersions members, only the members of Section 3.2, and non-empty ordinary collections. Failures inside a root member b"
slug: docs/rules/0.9.0-rc.2/mcpdesc/document-schema
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
  - 16. Conformance: [req-document-schema](https://mcpdesc.org/docs/specification/0.9.0-rc.2/conformance#req-document-schema)
  - 3. Document Structure: [req-root-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/document-structure#req-root-fields)
  - 3. Document Structure: [req-closed-objects](https://mcpdesc.org/docs/specification/0.9.0-rc.2/document-structure#req-closed-objects)
  - 9. Tools: [req-tool-input-schema-required](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-tool-input-schema-required)
  - 3. Document Structure: [req-ordinary-collections-non-empty](https://mcpdesc.org/docs/specification/0.9.0-rc.2/document-structure#req-ordinary-collections-non-empty)
  - 3. Document Structure: [req-ordinary-collections-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.2/document-structure#req-ordinary-collections-omitted)
  - 4. Versioning: [req-mcpdesc-required](https://mcpdesc.org/docs/specification/0.9.0-rc.2/versioning#req-mcpdesc-required)
  - 4. Versioning: [req-mcpdesc-version](https://mcpdesc.org/docs/specification/0.9.0-rc.2/versioning#req-mcpdesc-version)
  - 4. Versioning: [req-version-check](https://mcpdesc.org/docs/specification/0.9.0-rc.2/versioning#req-version-check)
  - 5. Info Object: [req-info-required](https://mcpdesc.org/docs/specification/0.9.0-rc.2/info-object#req-info-required)
  - 6. Transports: [req-transports-non-empty](https://mcpdesc.org/docs/specification/0.9.0-rc.2/transports#req-transports-non-empty)
  - 8. Capabilities: [req-capabilities-non-empty](https://mcpdesc.org/docs/specification/0.9.0-rc.2/capabilities#req-capabilities-non-empty)
  - 13. Tags: [req-tags-non-empty](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tags#req-tags-non-empty)
  - 13. Tags: [req-tags-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tags#req-tags-omitted)
  - 16. Conformance: [req-conforming-document](https://mcpdesc.org/docs/specification/0.9.0-rc.2/conformance#req-conforming-document)
  - 14. Specification Extensions: [req-extension-names](https://mcpdesc.org/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-names)
  - 14. Specification Extensions: [req-extension-unknown-accepted](https://mcpdesc.org/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-unknown-accepted)
  - 15. Serialization: [req-serialization-empty-collections](https://mcpdesc.org/docs/specification/0.9.0-rc.2/serialization#req-serialization-empty-collections)



## Notes

The optional root $schema does not select the schema used for validation: optional-schema-omitted.json omits it and validates against the schema for its mcpdesc version.


## Examples

### Valid example

Source: [expected-valid/optional-schema-omitted.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-valid/optional-schema-omitted.json) · Selected: whole document

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

Source: [expected-invalid/empty-ordinary-root-collections.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/empty-ordinary-root-collections.json) · Selected: `/capabilities`

```json
[]
```

### Invalid example

Source: [expected-invalid/empty-tag-catalog-reference.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/empty-tag-catalog-reference.json) · Selected: `/tags`

```json
[]
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
