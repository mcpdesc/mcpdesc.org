---
title: "mcp.transport.streamable-http.revision-availability"
description: "Streamable HTTP is used only from MCP 2025-03-26."
slug: docs/rules/0.9.0-draft.1/mcp/transport-streamable-http-revision-availability
ruleSurface: "Transport"
sidebar:
  label: "mcp.transport.streamable-http.revision-availability"
---

Streamable HTTP is used only from MCP 2025-03-26.

**Rule ID:** `mcp.transport.streamable-http.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** Transport<br>
**Kind:** structural<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `transport-not-supported-by-version` | **error** |

## Required by

- **MCP Description 0.9.0, Section 6.2**
  - [/docs/specification/0.9.0-draft.1/transports#req-transport-streamable-http-revisions](/docs/specification/0.9.0-draft.1/transports#req-transport-streamable-http-revisions)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 specification, Basic, Transports, Streamable HTTP (replaces HTTP+SSE from 2024-11-05)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L50-L277](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L50-L277)



## Examples

### Invalid example

Source: [expected-invalid/revision-inapplicable-streamable-http.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/revision-inapplicable-streamable-http.json) · Selected: `/transports/0`

```json
{
  "type": "streamable-http",
  "url": "https://example.com/mcp"
}
```

## Source record

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
