---
title: "Content blocks in example results use only content types and fields the applicable revision defines: audio from MCP 2025-03-26, resource links and block _meta from 2025-06-18, and resource-link icons from 2025-11-25."
description: "Content blocks in example results use only content types and fields the applicable revision defines: audio from MCP 2025-03-26, resource links and block _meta from 2025-06-18, and "
slug: docs/rules/0.9.0-draft.1/mcp/content-block-revision-availability
---

**Rule ID:** `mcp.content-block.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** ContentBlock<br>
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
| `tool-example-content-version-mismatch` | **error** |
| `prompt-example-content-version-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 9.3 and 11.3**
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-example-content-revision](/docs/specification/0.9.0-draft.1/tools#req-tool-example-content-revision)
  - [/docs/specification/0.9.0-draft.1/prompts#req-prompt-example-content-revision](/docs/specification/0.9.0-draft.1/prompts#req-prompt-example-content-revision)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 schema.ts, TextContent, ImageContent, and EmbeddedResource (no AudioContent, no ResourceLink, no content _meta)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L842-L851](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L842-L851)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L853-L868](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L853-L868)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L610-L619](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L610-L619)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-03-26 schema.ts, AudioContent
  - [validation/mcp-schemas/2025-03-26/schema.ts#L987-L1009](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L987-L1009)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 schema.ts, ResourceLink and ContentBlock, _meta on content types
  - [validation/mcp-schemas/2025-06-18/schema.ts#L753-L762](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L753-L762)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1130-L1134](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1130-L1134)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 schema.ts, Resource extends Icons (inherited by ResourceLink)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L797-L838](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L797-L838)


## Notes

The same diagnostic codes also report embedded resource _meta (mcp.resource-contents.meta.revision-availability) and annotations.lastModified (mcp.annotations.last-modified.revision-availability); the rule property identifies which.


## Examples

### Invalid example

Source: [expected-invalid/revision-incompatible-tool-example.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/revision-incompatible-tool-example.json) · Selected: `/tools/0/examples/future-result/result/content/0`

```json
{
  "type": "resource_link",
  "uri": "resource://example/item",
  "name": "Future resource link"
}
```

### Invalid example

Source: [expected-invalid/invalid-prompt-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-prompt-example-semantics.json) · Selected: `/prompts/4/examples/resource-link-too-new/result/messages/0/content`

```json
{
  "type": "resource_link",
  "uri": "briefing://example",
  "name": "Example"
}
```

## Source record

[content.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/content.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
