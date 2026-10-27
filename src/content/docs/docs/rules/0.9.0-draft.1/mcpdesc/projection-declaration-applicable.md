---
title: "Native projection selects one declaration of the requested kind and identifier in the Effective Protocol View of the revision."
description: "Native projection selects one declaration of the requested kind and identifier in the Effective Protocol View of the revision."
slug: docs/rules/0.9.0-draft.1/mcpdesc/projection-declaration-applicable
---

**Rule ID:** `mcpdesc.projection.declaration-applicable`<br>
**Owner:** mcpdesc<br>
**Surface:** Native projection<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** delegated · **Enforcement:** external

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `projection-declaration-not-applicable` | **error** |

## Required by

- **MCP Description 0.9.0, Section 4.14, step 3**
  - [/docs/specification/0.9.0-draft.1/versioning#req-native-projection-declaration-applicable](/docs/specification/0.9.0-draft.1/versioning#req-native-projection-declaration-applicable)



## Notes

Implemented by @mcpdesc/core; this repository checks the fixtures with scripts/test-projection-fixtures.mjs.


## Examples

### Native projection fixture

Source: [projection-fixtures/tool-not-applicable-2024-11-05.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/projection-fixtures/tool-not-applicable-2024-11-05.json) · Selected: `/expectedError`

```json
"projection-declaration-not-applicable"
```

### Native projection fixture

Source: [projection-fixtures/resource-template-not-applicable-2025-03-26.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/projection-fixtures/resource-template-not-applicable-2025-03-26.json) · Selected: `/expectedError`

```json
"projection-declaration-not-applicable"
```

## Source record

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
