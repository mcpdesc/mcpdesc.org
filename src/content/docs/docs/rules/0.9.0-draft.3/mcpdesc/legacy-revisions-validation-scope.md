---
title: "Limited validation for early MCP protocol versions"
description: "MCP 2024-11-05 and 2025-03-26 receive structural and selected checks, not a claim of complete MCP semantic conformance. The warning describes a validation limitation rather than an"
slug: docs/rules/0.9.0-draft.3/mcpdesc/legacy-revisions-validation-scope
sidebar:
  label: "mcpdesc.legacy-revisions.validation-scope"
---

MCP 2024-11-05 and 2025-03-26 receive structural and selected checks, not a claim of complete MCP semantic conformance. The warning describes a validation limitation rather than an invalid document. Adding a later protocol version does not make checks for the earlier versions complete.


## Requirement

A document applying to MCP 2024-11-05 or 2025-03-26 is reported as receiving structural and selected checks only, not complete MCP semantic conformance.

## Details

**Rule ID:** `mcpdesc.legacy-revisions.validation-scope`<br>
**Owner:** mcpdesc<br>
**Surface:** Document · **Path:** `protocolVersions`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | not-applicable | not-applicable | not-applicable |
## Diagnostics

| Code | Severity |
| --- | --- |
| `legacy-protocol-validation-incomplete` | **warning** |

## Required by

- **MCP Description 0.9.0, Sections 3.5 and 16.2; Proposal 0024, Section 4.1 (revision tiers)**
  - [/docs/specification/0.9.0-draft.3/conformance#req-legacy-validation-scope](/docs/specification/0.9.0-draft.3/conformance#req-legacy-validation-scope)
  - [proposal-snapshots/0024-validation-rule-identity-and-provenance.md](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/proposal-snapshots/0024-validation-rule-identity-and-provenance.md)




## Examples

### Accepted with a warning

Source: [expected-warning/legacy-result-meta.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/legacy-result-meta.json) · Selected: `/protocolVersions`

```json
[
  "2024-11-05",
  "2025-03-26"
]
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
