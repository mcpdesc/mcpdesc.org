---
title: "mcp.root.uri.file-scheme"
description: "A root URI in a roots response starts with file://."
slug: docs/rules/0.9.0-draft.2/mcp/root-uri-file-scheme
ruleSurface: "Root"
sidebar:
  label: "mcp.root.uri.file-scheme"
---

A root URI in a roots response starts with file://.

**Rule ID:** `mcp.root.uri.file-scheme`<br>
**Owner:** mcp<br>
**Surface:** Root · **Path:** `uri`<br>
**Kind:** semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `interaction-example-roots-uri` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.4**
  - [/docs/specification/0.9.0-draft.2/tools#req-interaction-revision-valid](/docs/specification/0.9.0-draft.2/tools#req-interaction-revision-valid)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface Root, uri ("This *must* start with file:// for now")
  - [validation/mcp-schemas/2024-11-05/schema.ts#L1045-L1052](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L1045-L1052)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L1186-L1193](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L1186-L1193)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1421-L1428](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1421-L1428)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2117-L2124](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2117-L2124)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2759-L2766](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2759-L2766)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 specification, Client Features, Roots, Data Types (uri MUST be a file:// URI)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/client/roots.mdx#L100-L102](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/client/roots.mdx#L100-L102)



## Examples

### Invalid example

Source: [expected-invalid/invalid-tool-interaction-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/invalid-tool-interaction-example-semantics.json) · Selected: `/tools/0/interactionExamples/broken/steps/3/response/roots/0`

```json
{
  "uri": "https://example.com/not-a-file-root"
}
```

## Source record

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
