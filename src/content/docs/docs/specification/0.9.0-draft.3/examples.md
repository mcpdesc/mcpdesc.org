---
title: Examples
description: "Example MCP Description documents for specification v0.9.0-draft.3."
slug: docs/specification/0.9.0-draft.3/examples
sidebar:
  order: 91
---

These examples come from [the canonical specification repository](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples) at [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-draft.3).

## Minimal example

```yaml
$schema: https://mcpdesc.org/schema/mcp-description/0.9.0-draft.3.json
mcpdesc: 0.9.0
info:
  name: chess-rating-server
  title: Chess Rating MCP Server
  version: 1.0.0
protocolVersions:
  - "2025-11-25"
transports:
  - args:
      - serve
    command: chess-rating
    type: stdio
tools:
  - description: Get the current Elo rating for a chess player
    inputSchema:
      properties:
        player_id:
          description: Player identifier
          type: string
      required:
        - player_id
      type: object
    name: get_player_rating
```

## Complete example set

- [`client-requirements.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/client-requirements.yaml)
- [`full-featured.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/full-featured.yaml)
- [`http-server.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/http-server.yaml)
- [`minimal.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/minimal.yaml)
- [`multi-transport.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/multi-transport.yaml)
- [`multi-version.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/multi-version.yaml)
- [`reusable-components.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/reusable-components.yaml)
- [`stdio-server.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/examples/stdio-server.yaml)
