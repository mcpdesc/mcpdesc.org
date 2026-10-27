---
title: "A blob in Resource Contents is canonical base64."
description: "A blob in Resource Contents is canonical base64."
slug: docs/rules/0.9.0-draft.1/mcp/resource-contents-blob-base64
---

**Rule ID:** `mcp.resource-contents.blob.base64`<br>
**Owner:** mcp<br>
**Surface:** BlobResourceContents · **Path:** `blob`<br>
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
| `invalid-resource-example-base64` | **error** |

## Required by

- **MCP Description 0.9.0, Section 10.4.4**
  - [/docs/specification/0.9.0-draft.1/resources#req-resource-example-blob-base64](/docs/specification/0.9.0-draft.1/resources#req-resource-example-blob-base64)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface BlobResourceContents, blob (@format byte)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L507-L512](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L507-L512)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L545-L550](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L545-L550)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L637-L642](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L637-L642)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L913-L918](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L913-L918)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1549-L1554](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1549-L1554)
- **Tier 2 — Normative referenced standards:** RFC 4648, Section 4
  - [https://www.rfc-editor.org/rfc/rfc4648#section-4](https://www.rfc-editor.org/rfc/rfc4648#section-4)



## Examples

### Invalid example

Source: [expected-invalid/resource-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/resource-example-result-semantics.json) · Selected: `/resources/0/examples/invalid-result/result/contents/0`

```json
{
  "uri": "asset:///invalid.bin",
  "blob": "not base64"
}
```

## Source record

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
