---
title: "A document applying to MCP 2024-11-05 or 2025-03-26 is reported as receiving structural and selected checks only, not complete MCP semantic conformance."
description: "A document applying to MCP 2024-11-05 or 2025-03-26 is reported as receiving structural and selected checks only, not complete MCP semantic conformance."
slug: docs/rules/0.9.0-draft.1/mcpdesc/legacy-revisions-validation-scope
---

**Rule ID:** `mcpdesc.legacy-revisions.validation-scope`<br>
**Owner:** mcpdesc<br>
**Surface:** Document · **Path:** `protocolVersions`<br>
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
| `legacy-protocol-validation-incomplete` | **warning** |

## Required by

- **MCP Description 0.9.0, Sections 3.5 and 16.2; Proposal 0024, Section 4.1 (revision tiers)**
  - [/docs/specification/0.9.0-draft.1/conformance#req-legacy-validation-scope](/docs/specification/0.9.0-draft.1/conformance#req-legacy-validation-scope)
  - [proposal-snapshots/0024-validation-rule-identity-and-provenance.md](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/proposal-snapshots/0024-validation-rule-identity-and-provenance.md)




## Examples

### Accepted with a warning

Source: [expected-warning/legacy-result-meta.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/legacy-result-meta.json) · Selected: `/protocolVersions`

```json
[
  "2024-11-05",
  "2025-03-26"
]
```

## Source record

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
