---
title: "Encode binary Resource Contents as base64"
description: "A Resource example's blob must be valid base64. Check the encoding rather than placing raw binary or a URL in the field. Encoded content remains untrusted, and a valid encoding doe"
slug: docs/rules/0.9.0-draft.3/mcp/resource-contents-blob-base64
sidebar:
  label: "mcp.resource-contents.blob.base64"
---

A Resource example's blob must be valid base64. Check the encoding rather than placing raw binary or a URL in the field. Encoded content remains untrusted, and a valid encoding does not establish that the resource exists or is safe to open.


## Requirement

A blob in Resource Contents is canonical base64.

## Details

**Rule ID:** `mcp.resource-contents.blob.base64`<br>
**Owner:** mcp<br>
**Surface:** BlobResourceContents · **Path:** `blob`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 10.4.4**
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-example-blob-base64](/docs/specification/0.9.0-draft.3/resources#req-resource-example-blob-base64)

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

Source: [expected-invalid/resource-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/resource-example-result-semantics.json) · Selected: `/resources/0/examples/invalid-result/result/contents/0`

```json
{
  "uri": "asset:///invalid.bin",
  "blob": "not base64"
}
```

## Rule Source Code

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
