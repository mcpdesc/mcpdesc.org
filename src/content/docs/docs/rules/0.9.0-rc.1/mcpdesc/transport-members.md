---
title: "Declare transports with their type-specific fields"
description: "A transport is Streamable HTTP, stdio, or legacy SSE, selected by type. Each type requires its own fields, such as url or command, and accepts only the properties in its Section 6."
slug: docs/rules/0.9.0-rc.1/mcpdesc/transport-members
sidebar:
  label: "mcpdesc.transport.members"
---

A transport is Streamable HTTP, stdio, or legacy SSE, selected by type. Each type requires its own fields, such as url or command, and accepts only the properties in its Section 6.2 table.


## Requirement

A Transport Object matches exactly one transport type and contains its required fields and only its defined properties.

## Details

**Rule ID:** `mcpdesc.transport.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Transport<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/transport`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 6.2**
  - [/docs/specification/0.9.0-rc.1/transports#req-transport-streamable-http-fields](/docs/specification/0.9.0-rc.1/transports#req-transport-streamable-http-fields)
  - [/docs/specification/0.9.0-rc.1/transports#req-transport-stdio-fields](/docs/specification/0.9.0-rc.1/transports#req-transport-stdio-fields)
  - [/docs/specification/0.9.0-rc.1/transports#req-transport-sse-fields](/docs/specification/0.9.0-rc.1/transports#req-transport-sse-fields)
  - [/docs/specification/0.9.0-rc.1/transports#req-transport-type](/docs/specification/0.9.0-rc.1/transports#req-transport-type)
  - [/docs/specification/0.9.0-rc.1/transports#req-transport-closed](/docs/specification/0.9.0-rc.1/transports#req-transport-closed)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-value-formats](/docs/specification/0.9.0-rc.1/serialization#req-serialization-value-formats)




## Examples

### Invalid example

Source: [expected-invalid/malformed-info-transport-tag-resource.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/malformed-info-transport-tag-resource.json) · Selected: `/transports/0`

```json
{
  "type": "stdio",
  "args": [
    "--verbose"
  ]
}
```

## Rule Source Code

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
