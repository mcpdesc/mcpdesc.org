---
title: "Project a document to one protocol revision"
description: "A single-version projection validates the source, keeps the declarations whose effective scope includes the revision, removes their scopes, and keeps everything else unchanged: sec"
slug: docs/rules/0.9.0-draft.4/mcpdesc/view-projection
sidebar:
  label: "mcpdesc.view.projection"
---

A single-version projection validates the source, keeps the declarations whose effective scope includes the revision, removes their scopes, and keeps everything else unchanged: security forms, examples, client requirements, tags, extensions, and the components still referenced.


## Requirement

An Effective Protocol View is a valid document for one revision that keeps the applicable declarations and preserves their content, security semantics, and referenced components.

## Details

**Rule ID:** `mcpdesc.view.projection`<br>
**Owner:** mcpdesc<br>
**Surface:** Effective Protocol View<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** delegated · **Enforcement:** external


## Required by

- **MCP Description 0.9.0, Section 4.12, and the view requirements of Sections 3 to 17**
  - [/docs/specification/0.9.0-draft.4/versioning#req-view-projection](/docs/specification/0.9.0-draft.4/versioning#req-view-projection)
  - [/docs/specification/0.9.0-draft.4/versioning#req-view-projection-transports](/docs/specification/0.9.0-draft.4/versioning#req-view-projection-transports)
  - [/docs/specification/0.9.0-draft.4/document-structure#req-security-empties-preserved](/docs/specification/0.9.0-draft.4/document-structure#req-security-empties-preserved)
  - [/docs/specification/0.9.0-draft.4/security#req-security-empty-distinction](/docs/specification/0.9.0-draft.4/security#req-security-empty-distinction)
  - [/docs/specification/0.9.0-draft.4/security#req-security-projection](/docs/specification/0.9.0-draft.4/security#req-security-projection)
  - [/docs/specification/0.9.0-draft.4/serialization#req-serialization-empty-values-preserved](/docs/specification/0.9.0-draft.4/serialization#req-serialization-empty-values-preserved)
  - [/docs/specification/0.9.0-draft.4/tools#req-tool-example-views-preserved](/docs/specification/0.9.0-draft.4/tools#req-tool-example-views-preserved)
  - [/docs/specification/0.9.0-draft.4/tools#req-interaction-views-preserved](/docs/specification/0.9.0-draft.4/tools#req-interaction-views-preserved)
  - [/docs/specification/0.9.0-draft.4/capabilities#req-client-requirements-views](/docs/specification/0.9.0-draft.4/capabilities#req-client-requirements-views)
  - [/docs/specification/0.9.0-draft.4/resources#req-resource-example-views](/docs/specification/0.9.0-draft.4/resources#req-resource-example-views)
  - [/docs/specification/0.9.0-draft.4/resources#req-template-completion-views](/docs/specification/0.9.0-draft.4/resources#req-template-completion-views)
  - [/docs/specification/0.9.0-draft.4/prompts#req-prompt-example-views](/docs/specification/0.9.0-draft.4/prompts#req-prompt-example-views)
  - [/docs/specification/0.9.0-draft.4/prompts#req-prompt-completion-views](/docs/specification/0.9.0-draft.4/prompts#req-prompt-completion-views)
  - [/docs/specification/0.9.0-draft.4/tags#req-tags-views](/docs/specification/0.9.0-draft.4/tags#req-tags-views)
  - [/docs/specification/0.9.0-draft.4/specification-extensions#req-extension-views](/docs/specification/0.9.0-draft.4/specification-extensions#req-extension-views)
  - [/docs/specification/0.9.0-draft.4/components#req-component-pruning](/docs/specification/0.9.0-draft.4/components#req-component-pruning)



## Notes

Checked by the cases in view-fixtures/, which scripts/test-view-fixtures.mjs recomputes with the reference operations of scripts/mcpdesc-views.mjs. Implementations such as @mcpdesc/core must pass them.


## Examples

### View succeeds

Source: [view-fixtures/view-client-requirements-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-client-requirements-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-client-requirements-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-completion-examples-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-completion-examples-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-completion-examples-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-component-pruning-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-component-pruning-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-component-pruning-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-prompt-examples-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-prompt-examples-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-prompt-examples-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-protocol-scoped-primitives-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-protocol-scoped-primitives-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-protocol-scoped-primitives-2025-11-25.json"
```

### View succeeds

Source: [view-fixtures/view-protocol-scoped-primitives-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-protocol-scoped-primitives-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-protocol-scoped-primitives-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-resource-examples-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-resource-examples-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-resource-examples-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-security-forms-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-security-forms-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-security-forms-2025-11-25.json"
```

### View succeeds

Source: [view-fixtures/view-security-forms-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-security-forms-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-security-forms-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-specification-extensions-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-specification-extensions-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-specification-extensions-2025-11-25.json"
```

### View succeeds

Source: [view-fixtures/view-tool-interaction-examples-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-tool-interaction-examples-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-tool-interaction-examples-2025-11-25.json"
```

### View fails

Source: [view-fixtures/view-revision-not-declared.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-revision-not-declared.json) · Selected: `/expectedFailure`

```json
"req-view-projection"
```

### View fails

Source: [view-fixtures/view-source-invalid.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/view-fixtures/view-source-invalid.json) · Selected: `/expectedFailure`

```json
"req-view-projection"
```

## Rule Source Code

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-draft.4`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft).
