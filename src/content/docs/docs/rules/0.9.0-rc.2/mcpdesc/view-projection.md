---
title: "Project a document to one MCP protocol version"
description: "A single-version projection validates the source, keeps the declarations whose effective scope includes the protocol version, removes their scopes, and keeps everything else unchan"
slug: docs/rules/0.9.0-rc.2/mcpdesc/view-projection
sidebar:
  label: "mcpdesc.view.projection"
---

A single-version projection validates the source, keeps the declarations whose effective scope includes the protocol version, removes their scopes, and keeps everything else unchanged: security forms, examples, client requirements, tags, extensions, and the components still referenced.


## Requirement

An Effective Protocol View is a valid document for one protocol version that keeps the applicable declarations and preserves their content, security semantics, and referenced components.

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
  - 4. Versioning: [req-view-projection](https://mcpdesc.org/docs/specification/0.9.0-rc.2/versioning#req-view-projection)
  - 4. Versioning: [req-view-projection-transports](https://mcpdesc.org/docs/specification/0.9.0-rc.2/versioning#req-view-projection-transports)
  - 3. Document Structure: [req-security-empties-preserved](https://mcpdesc.org/docs/specification/0.9.0-rc.2/document-structure#req-security-empties-preserved)
  - 7. Security: [req-security-empty-distinction](https://mcpdesc.org/docs/specification/0.9.0-rc.2/security#req-security-empty-distinction)
  - 7. Security: [req-security-projection](https://mcpdesc.org/docs/specification/0.9.0-rc.2/security#req-security-projection)
  - 15. Serialization: [req-serialization-empty-values-preserved](https://mcpdesc.org/docs/specification/0.9.0-rc.2/serialization#req-serialization-empty-values-preserved)
  - 9. Tools: [req-tool-example-views-preserved](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-tool-example-views-preserved)
  - 9. Tools: [req-interaction-views-preserved](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-interaction-views-preserved)
  - 8. Capabilities: [req-client-requirements-views](https://mcpdesc.org/docs/specification/0.9.0-rc.2/capabilities#req-client-requirements-views)
  - 10. Resources and Resource Templates: [req-resource-example-views](https://mcpdesc.org/docs/specification/0.9.0-rc.2/resources#req-resource-example-views)
  - 10. Resources and Resource Templates: [req-template-completion-views](https://mcpdesc.org/docs/specification/0.9.0-rc.2/resources#req-template-completion-views)
  - 11. Prompts: [req-prompt-example-views](https://mcpdesc.org/docs/specification/0.9.0-rc.2/prompts#req-prompt-example-views)
  - 11. Prompts: [req-prompt-completion-views](https://mcpdesc.org/docs/specification/0.9.0-rc.2/prompts#req-prompt-completion-views)
  - 13. Tags: [req-tags-views](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tags#req-tags-views)
  - 14. Specification Extensions: [req-extension-views](https://mcpdesc.org/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-views)
  - 17. Reusable Components and Local References: [req-component-pruning](https://mcpdesc.org/docs/specification/0.9.0-rc.2/components#req-component-pruning)



## Notes

Checked by the cases in view-fixtures/, which scripts/test-view-fixtures.mjs recomputes with the reference operations of scripts/mcpdesc-views.mjs. Implementations such as @mcpdesc/core must pass them.


## Examples

### View succeeds

Source: [view-fixtures/view-client-requirements-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-client-requirements-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-client-requirements-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-completion-examples-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-completion-examples-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-completion-examples-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-component-pruning-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-component-pruning-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-component-pruning-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-prompt-examples-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-prompt-examples-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-prompt-examples-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-protocol-scoped-primitives-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-protocol-scoped-primitives-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-protocol-scoped-primitives-2025-11-25.json"
```

### View succeeds

Source: [view-fixtures/view-protocol-scoped-primitives-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-protocol-scoped-primitives-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-protocol-scoped-primitives-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-resource-examples-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-resource-examples-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-resource-examples-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-security-forms-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-security-forms-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-security-forms-2025-11-25.json"
```

### View succeeds

Source: [view-fixtures/view-security-forms-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-security-forms-2026-07-28.json) · Selected: `/expected`

```json
"expected/view-security-forms-2026-07-28.json"
```

### View succeeds

Source: [view-fixtures/view-specification-extensions-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-specification-extensions-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-specification-extensions-2025-11-25.json"
```

### View succeeds

Source: [view-fixtures/view-tool-interaction-examples-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-tool-interaction-examples-2025-11-25.json) · Selected: `/expected`

```json
"expected/view-tool-interaction-examples-2025-11-25.json"
```

### View fails

Source: [view-fixtures/view-protocol-version-not-declared.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-protocol-version-not-declared.json) · Selected: `/expectedFailure`

```json
"req-view-projection"
```

### View fails

Source: [view-fixtures/view-source-invalid.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/view-fixtures/view-source-invalid.json) · Selected: `/expectedFailure`

```json
"req-view-projection"
```

## Rule Source Code

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
