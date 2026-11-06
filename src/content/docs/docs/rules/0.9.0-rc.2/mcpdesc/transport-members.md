---
title: "Declare transports with their type-specific fields"
description: "A transport is Streamable HTTP, stdio, or legacy SSE, selected by type. Each type requires its own fields, such as url or command, and accepts only the properties in its Section 6."
slug: docs/rules/0.9.0-rc.2/mcpdesc/transport-members
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
  - 6. Transports: [req-transport-streamable-http-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/transports#req-transport-streamable-http-fields)
  - 6. Transports: [req-transport-stdio-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/transports#req-transport-stdio-fields)
  - 6. Transports: [req-transport-sse-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/transports#req-transport-sse-fields)
  - 6. Transports: [req-transport-type](https://mcpdesc.org/docs/specification/0.9.0-rc.2/transports#req-transport-type)
  - 6. Transports: [req-transport-closed](https://mcpdesc.org/docs/specification/0.9.0-rc.2/transports#req-transport-closed)
  - 15. Serialization: [req-serialization-value-formats](https://mcpdesc.org/docs/specification/0.9.0-rc.2/serialization#req-serialization-value-formats)




## Examples

### Valid example

Source: [expected-valid/discriminated-unions.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-valid/discriminated-unions.json) · Selected: `/transports`

```json
[
  {
    "type": "stdio",
    "command": "chess-rating",
    "args": [
      "serve"
    ],
    "env": {
      "MODE": "test"
    },
    "x-vendor": {
      "nested": [
        1,
        null
      ]
    }
  },
  {
    "type": "streamable-http",
    "url": "https://example.test/mcp"
  }
]
```

### Invalid example

Source: [expected-invalid/malformed-info-transport-tag-resource.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/malformed-info-transport-tag-resource.json) · Selected: `/transports/0`

```json
{
  "type": "stdio",
  "args": [
    "--verbose"
  ]
}
```

### Invalid example

Source: [expected-invalid/transport-arg-typo.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/transport-arg-typo.json) · Selected: `/transports/0`

```json
{
  "type": "stdio",
  "command": "chess-rating",
  "arg": [
    "serve"
  ]
}
```

### Invalid example

Source: [expected-invalid/transport-independent-defects.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/transport-independent-defects.json) · Selected: `/transports`

```json
[
  {
    "type": "stdio",
    "command": 5,
    "arg": [
      "serve"
    ]
  },
  {
    "type": "stdio",
    "command": "chess-rating",
    "env": {
      "MODE": 1
    }
  }
]
```

### Invalid example

Source: [expected-invalid/transport-discriminator-errors.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/transport-discriminator-errors.json) · Selected: `/transports`

```json
[
  {
    "command": "run"
  },
  {
    "type": "unknown"
  },
  {
    "type": null
  },
  {
    "type": 5
  },
  null,
  "stdio",
  5,
  [],
  true,
  {
    "type": "stdio"
  },
  {
    "type": "stdio",
    "command": "run",
    "url": "https://example.test/mcp"
  },
  {
    "type": "stdio",
    "command": "run",
    "X-vendor": true
  }
]
```

## Rule Source Code

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
