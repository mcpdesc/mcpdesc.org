---
title: "mcpdesc.transports.coverage"
description: "Every protocol version at the root is covered by at least one transport when transports are declared."
slug: docs/rules/0.9.0-draft.2/mcpdesc/transports-coverage
ruleSurface: "Document"
sidebar:
  label: "mcpdesc.transports.coverage"
---

Every protocol version at the root is covered by at least one transport when transports are declared.

**Rule ID:** `mcpdesc.transports.coverage`<br>
**Owner:** mcpdesc<br>
**Surface:** Document · **Path:** `transports`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal



## Diagnostics

| Code | Severity |
| --- | --- |
| `transport-coverage-gap` | **error** |

## Required by

- **MCP Description 0.9.0, Section 6.5**
  - [/docs/specification/0.9.0-draft.2/transports#req-transport-coverage](/docs/specification/0.9.0-draft.2/transports#req-transport-coverage)




## Examples

### Invalid example

Source: [expected-invalid/root-version-without-transport.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/root-version-without-transport.json) · Selected: `/protocolVersions`

```json
[
  "2025-11-25",
  "2026-07-28"
]
```

### Invalid example

Source: [expected-invalid/scoped-version-not-in-root.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/scoped-version-not-in-root.json) · Selected: `/protocolVersions`

```json
[
  "2025-11-25"
]
```

## Source record

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
