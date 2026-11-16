---
title: Examples
description: "Example MCP Description documents for specification v0.9.0."
slug: docs/specification/0.9.0/examples
sidebar:
  order: 91
---

These examples come from [the canonical specification repository](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples) at [`v0.9.0`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0).

## Minimal example

```yaml
mcpdesc: 0.9.0
info:
  name: chess-rating-server
  title: Chess Rating MCP Server
  version: 1.0.0
protocolVersions:
  - "2026-07-28"
transports:
  - type: stdio
    command: chess-rating
    args:
      - serve
tools:
  - name: get_player_rating
    description: Get the current FIDE standard rating for a chess player
    inputSchema:
      type: object
      properties:
        player_id:
          description: FIDE player identifier
          type: string
      required:
        - player_id
    outputSchema:
      type: integer
      description: Current FIDE standard rating
    examples:
      fide-rating:
        input:
          player_id: planchaman
        result:
          resultType: complete
          content:
            - type: text
              text: The player's FIDE rating is 1701
          structuredContent: 1701
```

## Complete example set

- [`client-requirements.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/client-requirements.yaml)
- [`elicitation-MRTR.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/elicitation-MRTR.yaml)
- [`full-featured.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/full-featured.yaml)
- [`http-server.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/http-server.yaml)
- [`minimal.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/minimal.yaml)
- [`multi-transport.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/multi-transport.yaml)
- [`multi-version-MRTR.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/multi-version-MRTR.yaml)
- [`multi-version-tasks.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/multi-version-tasks.yaml)
- [`output-schema.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/output-schema.yaml)
- [`reusable-components.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/reusable-components.yaml)
- [`stdio-server.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/examples/stdio-server.yaml)
