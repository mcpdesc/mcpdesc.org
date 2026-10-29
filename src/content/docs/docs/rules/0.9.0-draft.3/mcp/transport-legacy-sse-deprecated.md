---
title: "Review deprecated legacy SSE transports"
description: "Legacy HTTP plus SSE remains representable but is deprecated for later MCP protocol versions. The warning does not by itself invalidate the document. Review whether the server stil"
slug: docs/rules/0.9.0-draft.3/mcp/transport-legacy-sse-deprecated
sidebar:
  label: "mcp.transport.legacy-sse.deprecated"
---

Legacy HTTP plus SSE remains representable but is deprecated for later MCP protocol versions. The warning does not by itself invalidate the document. Review whether the server still offers that transport or whether the description should advertise Streamable HTTP instead.


## Requirement

Legacy HTTP+SSE associated with MCP 2025-03-26 or later is reported, because Streamable HTTP replaces it.

## Details

**Rule ID:** `mcp.transport.legacy-sse.deprecated`<br>
**Owner:** mcp<br>
**Surface:** Transport<br>
**Kind:** semantic<br>
**Requirement level:** should<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 6.2**
  - [/docs/specification/0.9.0-draft.3/transports#req-transport-legacy-sse-warning](/docs/specification/0.9.0-draft.3/transports#req-transport-legacy-sse-warning)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 specification, Basic, Transports, Backwards Compatibility (deprecated HTTP+SSE transport)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L250-L277](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-03-26/basic/transports.mdx#L250-L277)



## Examples

### Accepted with a warning

Source: [expected-warning/legacy-sse-modern-revision.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/legacy-sse-modern-revision.json) · Selected: `/transports/0`

```json
{
  "type": "sse",
  "url": "https://example.com/sse"
}
```

## Rule Source Code

[transport.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/transport.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
