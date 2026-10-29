---
title: "Project a valid source and declared protocol version"
description: "Native projection first validates the source and checks that the requested MCP protocol version appears at the root. Fix source errors or select a declared version. These failures "
slug: docs/rules/0.9.0-draft.3/mcpdesc/projection-source-valid
sidebar:
  label: "mcpdesc.projection.source-valid"
---

Native projection first validates the source and checks that the requested MCP protocol version appears at the root. Fix source errors or select a declared version. These failures come from the projection operation, not a new document-validation phase.


## Requirement

Native projection starts from a document without validation errors and from a revision in its root protocolVersions.

## Details

**Rule ID:** `mcpdesc.projection.source-valid`<br>
**Owner:** mcpdesc<br>
**Surface:** Native projection<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Status:** delegated · **Enforcement:** external

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 4.14, steps 1 and 2**
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-source-valid](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-source-valid)
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-revision-declared](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-revision-declared)



## Notes

Implemented by @mcpdesc/core; this repository checks the fixtures with scripts/test-projection-fixtures.mjs.


## Examples

### Projection fails

Source: [projection-fixtures/tool-source-invalid.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tool-source-invalid.json) · Selected: `/expectedError`

```json
"projection-source-invalid"
```

### Projection fails

Source: [projection-fixtures/tool-revision-not-declared.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tool-revision-not-declared.json) · Selected: `/expectedError`

```json
"projection-revision-not-declared"
```

### Projection fails

Source: [projection-fixtures/prompt-revision-not-declared.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/prompt-revision-not-declared.json) · Selected: `/expectedError`

```json
"projection-revision-not-declared"
```

## Rule Source Code

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
