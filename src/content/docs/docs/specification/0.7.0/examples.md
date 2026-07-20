---
title: Examples
description: Example MCP Description documents for specification v0.7.0.
slug: docs/specification/0.7.0/examples
sidebar:
  order: 16
---

:::note[Mirrored specification]
Curated examples for **v0.7.0**. The full example set (minimal, stdio-server, http-server,
multi-transport, and full-featured — in both JSON and YAML) lives in the canonical source:
[`spec/examples/`](https://github.com/cisco-open/mcptoolkit-contract/tree/main/spec/examples).
:::

## Minimal example

The smallest valid MCP Description: one `stdio` transport and one tool.

```yaml
mcpdesc: 0.7.0
info:
  name: chess-rating-server
  title: Chess Rating MCP Server
  version: 1.0.0
transports:
- type: stdio
  command: chess-rating
  args:
  - serve
tools:
- name: get_player_rating
  description: Get the current Elo rating for a chess player
  inputSchema:
    type: object
    properties:
      player_id:
        type: string
        description: Player identifier
    required:
    - player_id
```

## More examples

The canonical repository provides additional examples covering more transports and features:

- [`minimal.yaml`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/examples/minimal.yaml)
- [`stdio-server.yaml`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/examples/stdio-server.yaml)
- [`http-server.yaml`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/examples/http-server.yaml)
- [`multi-transport.yaml`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/examples/multi-transport.yaml)
- [`full-featured.yaml`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/examples/full-featured.yaml)

You can open any of these in the [Live Editor](/live-editor) to explore and validate them.
