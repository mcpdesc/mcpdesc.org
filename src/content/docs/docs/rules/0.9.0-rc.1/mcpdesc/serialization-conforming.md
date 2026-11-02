---
title: "Serialize documents as JSON or restricted YAML"
description: "A document is UTF-8 JSON or a single restricted YAML document that decodes to the JSON data model: string keys only, no duplicate keys, tags, or aliases, no merge semantics, and on"
slug: docs/rules/0.9.0-rc.1/mcpdesc/serialization-conforming
sidebar:
  label: "mcpdesc.serialization.conforming"
---

A document is UTF-8 JSON or a single restricted YAML document that decodes to the JSON data model: string keys only, no duplicate keys, tags, or aliases, no merge semantics, and only finite numbers. Rejected YAML is not validated further.


## Requirement

A document uses a conforming serialization: RFC 8259 JSON in UTF-8, or exactly one YAML document within the restricted YAML profile.

## Details

**Rule ID:** `mcpdesc.serialization.conforming`<br>
**Owner:** mcpdesc<br>
**Surface:** Document serialization<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** delegated · **Enforcement:** external


## Required by

- **MCP Description 0.9.0, Section 15**
  - [/docs/specification/0.9.0-rc.1/document-structure#req-conforming-serialization](/docs/specification/0.9.0-rc.1/document-structure#req-conforming-serialization)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-json](/docs/specification/0.9.0-rc.1/serialization#req-serialization-json)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-claims](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-claims)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-single-document](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-single-document)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-string-keys](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-string-keys)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-duplicate-keys](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-duplicate-keys)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-scalars](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-scalars)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-tags](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-tags)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-aliases](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-aliases)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-merge-keys](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-merge-keys)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-validation](/docs/specification/0.9.0-rc.1/serialization#req-serialization-yaml-validation)



## Notes

Checked when a serialization is decoded, before document validation, so a validator that receives decoded data reports this rule as delegated. Checked by decoding the serialization fixtures; scripts/test-serializations.mjs also checks that the equivalent JSON and YAML documents decode and validate identically.


## Examples

### Decoding accepts

Source: [serialization-fixtures/equivalent/document.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/equivalent/document.json) · Selected: whole document

```json
{
  "mcpdesc": "0.9.0",
  "info": { "name": "example", "version": "1.0.0" },
  "protocolVersions": ["2026-07-28"],
  "x-values": [true, false, null, 12, -1.5, 6.02e23, "2026-08-25"]
}
```

### Decoding accepts

Source: [serialization-fixtures/equivalent/document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/equivalent/document.yaml) · Selected: whole document

```yaml
mcpdesc: 0.9.0
info:
  name: example
  version: 1.0.0
protocolVersions: ["2026-07-28"]
x-values: [true, false, null, 12, -1.5, 6.02e23, 2026-08-25]
```

### Decoding accepts

Source: [serialization-fixtures/expected-valid/scalars-and-ordinary-merge-key.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-valid/scalars-and-ordinary-merge-key.yaml) · Selected: whole document

```yaml
value:
  <<:
    a: 1
scalars:
  - true
  - false
  - null
  - 0
  - -12
  - 1.5
  - 6.02e23
  - 2026-08-25
  - ".nan"
```

### Decoding rejects

Source: [serialization-fixtures/expected-invalid/multiple-documents.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-invalid/multiple-documents.yaml) · Selected: whole document

```yaml
---
a: 1
---
b: 2
```

### Decoding rejects

Source: [serialization-fixtures/expected-invalid/non-string-key.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-invalid/non-string-key.yaml) · Selected: whole document

```yaml
1: value
```

### Decoding rejects

Source: [serialization-fixtures/expected-invalid/duplicate-key.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-invalid/duplicate-key.yaml) · Selected: whole document

```yaml
a: 1
"a": 2
```

### Decoding rejects

Source: [serialization-fixtures/expected-invalid/positive-infinity.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-invalid/positive-infinity.yaml) · Selected: whole document

```yaml
value: .inf
```

### Decoding rejects

Source: [serialization-fixtures/expected-invalid/custom-tag.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-invalid/custom-tag.yaml) · Selected: whole document

```yaml
a: !example value
```

### Decoding rejects

Source: [serialization-fixtures/expected-invalid/alias.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-invalid/alias.yaml) · Selected: whole document

```yaml
a: &shared value
b: *shared
```

### Decoding rejects

Source: [serialization-fixtures/expected-invalid/merge-alias.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/serialization-fixtures/expected-invalid/merge-alias.yaml) · Selected: whole document

```yaml
base: &base
  a: 1
value:
  <<: *base
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
