---
title: "Use lastModified only where MCP defines it"
description: "Resource annotations exist in early MCP protocol versions, but lastModified was added in 2025-06-18. If a declaration covers an earlier version, omit lastModified or describe separ"
slug: docs/rules/0.9.0-draft.3/mcp/annotations-last-modified-revision-availability
sidebar:
  label: "mcp.annotations.last-modified.revision-availability"
---

Resource annotations exist in early MCP protocol versions, but lastModified was added in 2025-06-18. If a declaration covers an earlier version, omit lastModified or describe separate variants with disjoint scopes.


## Requirement

Resource Annotations carry lastModified only from MCP 2025-06-18, on declarations and on content blocks.

## Details

**Rule ID:** `mcp.annotations.last-modified.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** Annotations · **Path:** `lastModified`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 10.3**
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-annotations-last-modified](/docs/specification/0.9.0-draft.3/resources#req-resource-annotations-last-modified)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 and 2025-03-26 schema.ts, annotations (audience, priority); MCP 2025-06-18 to 2026-07-28 schema.ts, interface Annotations (adds lastModified)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L815-L840](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L815-L840)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L921-L944](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L921-L944)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1093-L1128](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1093-L1128)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1700-L1735](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1700-L1735)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2265-L2300](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2265-L2300)



## Examples

### Invalid example

Source: [expected-invalid/annotations-last-modified-before-2025-06-18.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/annotations-last-modified-before-2025-06-18.json) · Selected: `/resources/0/annotations`

```json
{
  "priority": 0.5,
  "lastModified": "2025-05-03T14:30:00Z"
}
```

## Rule Source Code

[annotations.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/annotations.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
