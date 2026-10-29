---
title: "mcpdesc.projection.source-valid"
description: "Native projection starts from a document without validation errors and from a revision in its root protocolVersions."
slug: docs/rules/0.9.0-draft.2/mcpdesc/projection-source-valid
ruleSurface: "Native projection"
sidebar:
  label: "mcpdesc.projection.source-valid"
---

Native projection starts from a document without validation errors and from a revision in its root protocolVersions.

**Rule ID:** `mcpdesc.projection.source-valid`<br>
**Owner:** mcpdesc<br>
**Surface:** Native projection<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** delegated · **Enforcement:** external



## Diagnostics

| Code | Severity |
| --- | --- |
| `projection-source-invalid` | **error** |
| `projection-revision-not-declared` | **error** |

## Required by

- **MCP Description 0.9.0, Section 4.14, steps 1 and 2**
  - [/docs/specification/0.9.0-draft.2/versioning#req-native-projection-source-valid](/docs/specification/0.9.0-draft.2/versioning#req-native-projection-source-valid)
  - [/docs/specification/0.9.0-draft.2/versioning#req-native-projection-revision-declared](/docs/specification/0.9.0-draft.2/versioning#req-native-projection-revision-declared)



## Notes

Implemented by @mcpdesc/core; this repository checks the fixtures with scripts/test-projection-fixtures.mjs.


## Examples

### Native projection fixture

Source: [projection-fixtures/tool-source-invalid.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/projection-fixtures/tool-source-invalid.json) · Selected: `/expectedError`

```json
"projection-source-invalid"
```

### Native projection fixture

Source: [projection-fixtures/tool-revision-not-declared.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/projection-fixtures/tool-revision-not-declared.json) · Selected: `/expectedError`

```json
"projection-revision-not-declared"
```

### Native projection fixture

Source: [projection-fixtures/prompt-revision-not-declared.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/projection-fixtures/prompt-revision-not-declared.json) · Selected: `/expectedError`

```json
"projection-revision-not-declared"
```

## Source record

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
