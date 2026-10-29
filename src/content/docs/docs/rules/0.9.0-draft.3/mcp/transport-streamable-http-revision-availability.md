---
title: "Use Streamable HTTP only where supported"
description: "Streamable HTTP is not defined by the earliest supported MCP protocol version. Scope the transport to versions that define it and keep root protocol coverage consistent. A URL alon"
slug: docs/rules/0.9.0-draft.3/mcp/transport-streamable-http-revision-availability
sidebar:
  label: "mcp.transport.streamable-http.revision-availability"
---

Streamable HTTP is not defined by the earliest supported MCP protocol version. Scope the transport to versions that define it and keep root protocol coverage consistent. A URL alone does not make a transport applicable to every protocol version.


## Requirement

Streamable HTTP is used only from MCP 2025-03-26.

## Details

**Rule ID:** `mcp.transport.streamable-http.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** Transport<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Diagnostics

| Code | Severity |
| --- | --- |
| `transport-not-supported-by-version` | **error** |

## Required by

- **MCP Description 0.9.0, Section 6.2**
  - [/docs/specification/0.9.0-draft.3/transports#req-transport-streamable-http-revisions](/docs/specification/0.9.0-draft.3/transports#req-transport-streamable-http-revisions)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 specification, Basic, Transports, Streamable HTTP (replaces HTTP+SSE from 2024-11-05)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L50-L277](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L50-L277)



## Examples

### Invalid example

Source: [expected-invalid/revision-inapplicable-streamable-http.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/revision-inapplicable-streamable-http.json) · Selected: `/transports/0`

```json
{
  "type": "streamable-http",
  "url": "https://example.com/mcp"
}
```

## Rule Source Code

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
