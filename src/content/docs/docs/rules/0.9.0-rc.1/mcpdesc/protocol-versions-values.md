---
title: "List supported MCP protocol versions in protocol scopes"
description: "Root and declaration protocolVersions arrays are non-empty, contain no duplicates, and name only MCP protocol versions this specification supports."
slug: docs/rules/0.9.0-rc.1/mcpdesc/protocol-versions-values
sidebar:
  label: "mcpdesc.protocol-versions.values"
---

Root and declaration protocolVersions arrays are non-empty, contain no duplicates, and name only MCP protocol versions this specification supports.


## Requirement

A protocolVersions array is non-empty, has unique values, and contains only supported MCP protocol-version identifiers.

## Details

**Rule ID:** `mcpdesc.protocol-versions.values`<br>
**Owner:** mcpdesc<br>
**Surface:** Document, scoped declarations<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/protocolVersionScope`, `#/$defs/supportedProtocolVersion`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 4**
  - 4. Versioning: [req-protocol-versions-values](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-protocol-versions-values)




## Examples

### Invalid example

Source: [expected-invalid/closed-protocol-enum.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/closed-protocol-enum.json) · Selected: `/protocolVersions/0`

```json
"2027-01-01"
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
