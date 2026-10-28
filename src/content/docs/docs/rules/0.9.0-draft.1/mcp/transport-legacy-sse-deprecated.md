---
title: "mcp.transport.legacy-sse.deprecated"
description: "Legacy HTTP+SSE associated with MCP 2025-03-26 or later is reported, because Streamable HTTP replaces it."
slug: docs/rules/0.9.0-draft.1/mcp/transport-legacy-sse-deprecated
ruleSurface: "Transport"
sidebar:
  label: "mcp.transport.legacy-sse.deprecated"
---

Legacy HTTP+SSE associated with MCP 2025-03-26 or later is reported, because Streamable HTTP replaces it.

**Rule ID:** `mcp.transport.legacy-sse.deprecated`<br>
**Owner:** mcp<br>
**Surface:** Transport<br>
**Kind:** semantic<br>
**Requirement:** should<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `legacy-sse-for-modern-version` | **warning** |

## Required by

- **MCP Description 0.9.0, Section 6.2**
  - [/docs/specification/0.9.0-draft.1/transports#req-transport-legacy-sse-warning](/docs/specification/0.9.0-draft.1/transports#req-transport-legacy-sse-warning)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 specification, Basic, Transports, Backwards Compatibility (deprecated HTTP+SSE transport)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L250-L277](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L250-L277)



## Examples

### Accepted with a warning

Source: [expected-warning/legacy-sse-modern-revision.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/legacy-sse-modern-revision.json) · Selected: `/transports/0`

```json
{
  "type": "sse",
  "url": "https://example.com/sse"
}
```

## Source record

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
