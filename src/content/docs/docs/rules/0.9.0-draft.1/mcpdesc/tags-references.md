---
title: "mcpdesc.tags.references"
description: "Root tag names are unique, and primitives reference only declared tags."
slug: docs/rules/0.9.0-draft.1/mcpdesc/tags-references
ruleSurface: "Tag"
sidebar:
  label: "mcpdesc.tags.references"
---

Root tag names are unique, and primitives reference only declared tags.

**Rule ID:** `mcpdesc.tags.references`<br>
**Owner:** mcpdesc<br>
**Surface:** Tag<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `duplicate-root-tag` | **error** |
| `unknown-tag-reference` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 13.2 and 13.3**
  - [/docs/specification/0.9.0-draft.1/tags#req-tags-unique](/docs/specification/0.9.0-draft.1/tags#req-tags-unique)
  - [/docs/specification/0.9.0-draft.1/tags#req-tags-references](/docs/specification/0.9.0-draft.1/tags#req-tags-references)




## Examples

### Invalid example

Source: [expected-invalid/duplicate-root-tag.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/duplicate-root-tag.json) · Selected: `/tags/1`

```json
{
  "name": "reporting"
}
```

### Invalid example

Source: [expected-invalid/duplicate-tag-reference.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/duplicate-tag-reference.json) · Selected: `/tools/0/tags`

```json
[
  "unknown"
]
```

## Source record

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
