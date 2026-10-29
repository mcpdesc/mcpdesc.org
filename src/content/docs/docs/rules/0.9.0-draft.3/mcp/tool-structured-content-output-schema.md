---
title: "Supply structured content when an output schema needs it"
description: "A successful Tool example for a Tool with outputSchema must carry the required structuredContent. The schema describes that structured value, not the unstructured content array. Ch"
slug: docs/rules/0.9.0-draft.3/mcp/tool-structured-content-output-schema
sidebar:
  label: "mcp.tool.structured-content.output-schema"
---

A successful Tool example for a Tool with outputSchema must carry the required structuredContent. The schema describes that structured value, not the unstructured content array. Check success and error examples separately before deciding which payload is missing.


## Requirement

When a Tool declares outputSchema, a successful result contains structuredContent.

## Details

**Rule ID:** `mcp.tool.structured-content.output-schema`<br>
**Owner:** mcp<br>
**Surface:** CallToolResult · **Path:** `structuredContent`<br>
**Kind:** semantic<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | applies | applies | applies |
## Diagnostics

| Code | Severity |
| --- | --- |
| `missing-tool-example-structured-content` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.3**
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-example-structured-content](/docs/specification/0.9.0-draft.3/tools#req-tool-example-structured-content)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 specification, Server Features, Tools, Output Schema ("Servers MUST provide structured results that conform to this schema")
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/server/tools.mdx#L309-L382](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/server/tools.mdx#L309-L382)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/server/tools.mdx#L335-L408](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/server/tools.mdx#L335-L408)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L509-L631](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L509-L631)


## Notes

Conformance of structuredContent to outputSchema is checked by mcpdesc.tool.example.schema-conformance. Error results are governed by mcpdesc.tool.example.error-result.


## Examples

### Invalid example

Source: [expected-invalid/invalid-tool-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-tool-example-result-semantics.json) · Selected: `/tools/0/examples/missing/result`

```json
{
  "resultType": "complete",
  "content": [
    {
      "type": "text",
      "text": "Missing structured value"
    }
  ]
}
```

### Invalid example

Source: [expected-invalid/invalid-tool-interaction-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-tool-interaction-example-semantics.json) · Selected: `/tools/0/interactionExamples/broken/result`

```json
{
  "content": [
    {
      "type": "text",
      "text": "Release preparation completed."
    }
  ]
}
```

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
