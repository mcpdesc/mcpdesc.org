---
title: "Merge protocol views without guessing"
description: "A merge validates every input, requires equivalent views for a shared protocol version and equal unscoped metadata, collapses equivalent declarations, keeps differing ones as disjo"
slug: docs/rules/0.9.0-rc.1/mcpdesc/view-merge
sidebar:
  label: "mcpdesc.view.merge"
---

A merge validates every input, requires equivalent views for a shared protocol version and equal unscoped metadata, collapses equivalent declarations, keeps differing ones as disjoint variants, renames colliding components, and fails rather than guess when inputs conflict.


## Requirement

A merge result is valid, preserves every input protocol-version view, and fails on any conflict it cannot represent faithfully.

## Details

**Rule ID:** `mcpdesc.view.merge`<br>
**Owner:** mcpdesc<br>
**Surface:** Effective Protocol View<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** delegated · **Enforcement:** external


## Required by

- **MCP Description 0.9.0, Section 4.13, and the merge requirements of Sections 13, 14, and 17**
  - 4. Versioning: [req-merge-inputs](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-merge-inputs)
  - 4. Versioning: [req-merge-algorithm](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-merge-algorithm)
  - 4. Versioning: [req-merge-equivalence](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-merge-equivalence)
  - 4. Versioning: [req-merge-security](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-merge-security)
  - 4. Versioning: [req-merge-collections](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-merge-collections)
  - 13. Tags: [req-tags-merge](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tags#req-tags-merge)
  - 14. Specification Extensions: [req-extension-merge](https://mcpdesc.org/docs/specification/0.9.0-rc.1/specification-extensions#req-extension-merge)
  - 17. Reusable Components and Local References: [req-component-merge](https://mcpdesc.org/docs/specification/0.9.0-rc.1/components#req-component-merge)
  - 17. Reusable Components and Local References: [req-component-merge-extensions](https://mcpdesc.org/docs/specification/0.9.0-rc.1/components#req-component-merge-extensions)



## Notes

Checked by the cases in view-fixtures/; scripts/test-view-fixtures.mjs also checks the round-trip invariant of Section 4.13 for every merge result.


## Examples

### Merge succeeds

Source: [view-fixtures/merge-component-name-collision.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-component-name-collision.json) · Selected: `/expected`

```json
"expected/merge-component-name-collision.json"
```

### Merge succeeds

Source: [view-fixtures/merge-object-extensions-variants.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-object-extensions-variants.json) · Selected: `/expected`

```json
"expected/merge-object-extensions-variants.json"
```

### Merge succeeds

Source: [view-fixtures/merge-protocol-scoped-primitives.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-protocol-scoped-primitives.json) · Selected: `/expected`

```json
"expected/merge-protocol-scoped-primitives.json"
```

### Merge succeeds

Source: [view-fixtures/merge-security-forms.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-security-forms.json) · Selected: `/expected`

```json
"expected/merge-security-forms.json"
```

### Merge fails

Source: [view-fixtures/merge-component-extension-conflict.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-component-extension-conflict.json) · Selected: `/expectedFailure`

```json
"req-component-merge-extensions"
```

### Merge fails

Source: [view-fixtures/merge-invalid-input.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-invalid-input.json) · Selected: `/expectedFailure`

```json
"req-merge-inputs"
```

### Merge fails

Source: [view-fixtures/merge-object-extension-conflict.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-object-extension-conflict.json) · Selected: `/expectedFailure`

```json
"req-extension-merge"
```

### Merge fails

Source: [view-fixtures/merge-same-protocol-version-conflict.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-same-protocol-version-conflict.json) · Selected: `/expectedFailure`

```json
"req-merge-equivalence"
```

### Merge fails

Source: [view-fixtures/merge-tag-catalogue-conflict.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-tag-catalogue-conflict.json) · Selected: `/expectedFailure`

```json
"req-tags-merge"
```

### Merge fails

Source: [view-fixtures/merge-unscoped-conflict.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/view-fixtures/merge-unscoped-conflict.json) · Selected: `/expectedFailure`

```json
"req-merge-equivalence"
```

## Rule Source Code

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
