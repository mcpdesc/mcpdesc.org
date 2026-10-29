---
title: "Use Resource Contents metadata where supported"
description: "Resource Contents entries acquire _meta from MCP 2025-06-18. This is separate from result-level _meta, which is available in every supported version. Move or remove a misplaced val"
slug: docs/rules/0.9.0-draft.3/mcp/resource-contents-meta-revision-availability
sidebar:
  label: "mcp.resource-contents.meta.revision-availability"
---

Resource Contents entries acquire _meta from MCP 2025-06-18. This is separate from result-level _meta, which is available in every supported version. Move or remove a misplaced value only after deciding which object it describes.


## Requirement

Resource contents carry _meta only from MCP 2025-06-18, in Resource examples and in embedded resources.

## Details

**Rule ID:** `mcp.resource-contents.meta.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** ResourceContents · **Path:** `_meta`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 10.4.4**
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-contents-meta](/docs/specification/0.9.0-draft.3/resources#req-resource-contents-meta)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 and 2025-03-26 schema.ts, interface ResourceContents (uri, mimeType); MCP 2025-06-18 to 2026-07-28 schema.ts, interface ResourceContents (adds _meta)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L483-L497](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L483-L497)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L521-L535](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L521-L535)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L600-L621](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L600-L621)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L876-L897](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L876-L897)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1509-L1527](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1509-L1527)



## Examples

### Invalid example

Source: [expected-invalid/resource-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/resource-example-result-semantics.json) · Selected: `/resources/1/examples/unsupported-metadata/result/contents/0`

```json
{
  "uri": "test://legacy",
  "text": "legacy",
  "_meta": {
    "unsupported": true
  }
}
```

## Rule Source Code

[content.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/content.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
