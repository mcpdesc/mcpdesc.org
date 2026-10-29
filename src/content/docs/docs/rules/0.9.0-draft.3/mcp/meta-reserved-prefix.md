---
title: "Preserve unknown reserved metadata with a warning"
description: "An unrecognized key in an MCP-reserved namespace may belong to a newer protocol definition. It is retained with a warning rather than assigned invented semantics. Verify the key an"
slug: docs/rules/0.9.0-draft.3/mcp/meta-reserved-prefix
sidebar:
  label: "mcp.meta.reserved-prefix"
---

An unrecognized key in an MCP-reserved namespace may belong to a newer protocol definition. It is retained with a warning rather than assigned invented semantics. Verify the key and protocol version before treating it as a recognized MCP feature.


## Requirement

A _meta key under an MCP-reserved prefix that the revision does not define is preserved with a warning.

## Details

**Rule ID:** `mcp.meta.reserved-prefix`<br>
**Owner:** mcp<br>
**Surface:** _meta<br>
**Kind:** semantic<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 3.5**
  - [/docs/specification/0.9.0-draft.3/document-structure#req-meta-reserved-prefix](/docs/specification/0.9.0-draft.3/document-structure#req-meta-reserved-prefix)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 specification, Basic, General fields, _meta (a prefix whose second label is modelcontextprotocol or mcp is reserved for MCP use)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/basic/index.mdx#L140-L142](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/basic/index.mdx#L140-L142)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L208-L210](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L208-L210)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L337-L339](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L337-L339)


## Notes

A later MCP revision may define the key, so it is preserved rather than rejected.


## Examples

### Accepted with a warning

Source: [expected-warning/unknown-reserved-meta-key.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/unknown-reserved-meta-key.json) · Selected: `/prompts/0/_meta`

```json
{
  "io.modelcontextprotocol/future-key": {
    "preserved": true
  }
}
```

## Rule Source Code

[meta.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/meta.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
