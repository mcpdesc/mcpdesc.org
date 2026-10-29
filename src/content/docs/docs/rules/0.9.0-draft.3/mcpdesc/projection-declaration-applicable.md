---
title: "Select an applicable declaration for projection"
description: "Native projection selects a Tool, Resource, Resource Template, or Prompt by its identifier in one protocol view. A declaration outside that view cannot be projected for that versio"
slug: docs/rules/0.9.0-draft.3/mcpdesc/projection-declaration-applicable
sidebar:
  label: "mcpdesc.projection.declaration-applicable"
---

Native projection selects a Tool, Resource, Resource Template, or Prompt by its identifier in one protocol view. A declaration outside that view cannot be projected for that version. Check the identifier and the declaration's inherited or explicit scope.


## Requirement

Native projection selects one declaration of the requested kind and identifier in the Effective Protocol View of the revision.

## Details

**Rule ID:** `mcpdesc.projection.declaration-applicable`<br>
**Owner:** mcpdesc<br>
**Surface:** Native projection<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Status:** delegated · **Enforcement:** external

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Diagnostics

| Code | Severity |
| --- | --- |
| `projection-declaration-not-applicable` | **error** |

## Required by

- **MCP Description 0.9.0, Section 4.14, step 3**
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-declaration-applicable](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-declaration-applicable)



## Notes

Implemented by @mcpdesc/core; this repository checks the fixtures with scripts/test-projection-fixtures.mjs.


## Examples

### Native projection fixture

Source: [projection-fixtures/tool-not-applicable-2024-11-05.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tool-not-applicable-2024-11-05.json) · Selected: `/expectedError`

```json
"projection-declaration-not-applicable"
```

### Native projection fixture

Source: [projection-fixtures/resource-template-not-applicable-2025-03-26.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/resource-template-not-applicable-2025-03-26.json) · Selected: `/expectedError`

```json
"projection-declaration-not-applicable"
```

## Rule Source Code

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
