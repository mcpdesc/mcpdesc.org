---
title: "Every protocol version at the root is covered by at least one transport when transports are declared."
description: "Every protocol version at the root is covered by at least one transport when transports are declared."
slug: docs/rules/0.9.0-draft.1/mcpdesc/transports-coverage
---

**Rule ID:** `mcpdesc.transports.coverage`<br>
**Owner:** mcpdesc<br>
**Surface:** Document · **Path:** `transports`<br>
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
| `transport-coverage-gap` | **error** |

## Required by

- **MCP Description 0.9.0, Section 6.5**
  - [/docs/specification/0.9.0-draft.1/transports#req-transport-coverage](/docs/specification/0.9.0-draft.1/transports#req-transport-coverage)




## Examples

### Invalid example

Source: [expected-invalid/root-version-without-transport.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/root-version-without-transport.json) · Selected: `/protocolVersions`

```json
[
  "2025-11-25",
  "2026-07-28"
]
```

### Invalid example

Source: [expected-invalid/scoped-version-not-in-root.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/scoped-version-not-in-root.json) · Selected: `/protocolVersions`

```json
[
  "2025-11-25"
]
```

## Source record

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
