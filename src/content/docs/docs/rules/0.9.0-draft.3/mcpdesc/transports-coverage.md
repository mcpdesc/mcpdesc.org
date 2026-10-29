---
title: "Cover each declared protocol version with a transport"
description: "When transports are declared, every root protocol version must be covered by at least one transport's effective scope. An omitted transport scope inherits all root versions. Add ap"
slug: docs/rules/0.9.0-draft.3/mcpdesc/transports-coverage
sidebar:
  label: "mcpdesc.transports.coverage"
---

When transports are declared, every root protocol version must be covered by at least one transport's effective scope. An omitted transport scope inherits all root versions. Add appropriate coverage or narrow the documented protocol versions rather than leaving an unreachable view. Descriptions may omit transports entirely.


## Requirement

Every protocol version at the root is covered by at least one transport when transports are declared.

## Details

**Rule ID:** `mcpdesc.transports.coverage`<br>
**Owner:** mcpdesc<br>
**Surface:** Document · **Path:** `transports`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 6.5**
  - [/docs/specification/0.9.0-draft.3/transports#req-transport-coverage](/docs/specification/0.9.0-draft.3/transports#req-transport-coverage)




## Examples

### Invalid example

Source: [expected-invalid/root-version-without-transport.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/root-version-without-transport.json) · Selected: `/protocolVersions`

```json
[
  "2025-11-25",
  "2026-07-28"
]
```

### Invalid example

Source: [expected-invalid/scoped-version-not-in-root.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/scoped-version-not-in-root.json) · Selected: `/protocolVersions`

```json
[
  "2025-11-25"
]
```

## Rule Source Code

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
