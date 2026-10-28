---
title: "mcp.meta.key-format"
description: "A _meta key has an optional prefix of dot-separated labels followed by a slash, and a name that begins and ends with an alphanumeric character."
slug: docs/rules/0.9.0-draft.1/mcp/meta-key-format
ruleSurface: "_meta"
sidebar:
  label: "mcp.meta.key-format"
---

A _meta key has an optional prefix of dot-separated labels followed by a slash, and a name that begins and ends with an alphanumeric character.

**Rule ID:** `mcp.meta.key-format`<br>
**Owner:** mcp<br>
**Surface:** _meta<br>
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
| `schema-validation` | **error** |
| `meta-key-invalid` | **error** |

## Required by

- **MCP Description 0.9.0, Section 3.5 (the same grammar applies in every revision)**
  - [/docs/specification/0.9.0-draft.1/document-structure#req-meta-keys](/docs/specification/0.9.0-draft.1/document-structure#req-meta-keys)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 specification, Basic, General fields, _meta key name format
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/basic/index.mdx#L134-L147](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/basic/index.mdx#L134-L147)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L201-L215](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L201-L215)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L330-L446](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L330-L446)


## Notes

The document schema rejects malformed keys first; meta-key-invalid applies to callers of the semantic validator alone.


## Examples

### Invalid example

Source: [expected-invalid/meta-key-invalid.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/meta-key-invalid.json) · Selected: `/tools/0`

```json
{
  "name": "inspect",
  "inputSchema": {
    "type": "object"
  },
  "_meta": {
    "com.example/bad key": true
  }
}
```

## Source record

[meta.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/meta.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
