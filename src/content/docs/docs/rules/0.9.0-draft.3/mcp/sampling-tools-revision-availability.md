---
title: "Use sampling tools only where supported"
description: "Sampling tools and toolChoice are available from MCP 2025-11-25. Earlier-version interaction examples cannot use those fields. Remove them or narrow the containing Tool's protocol "
slug: docs/rules/0.9.0-draft.3/mcp/sampling-tools-revision-availability
sidebar:
  label: "mcp.sampling.tools.revision-availability"
---

Sampling tools and toolChoice are available from MCP 2025-11-25. Earlier-version interaction examples cannot use those fields. Remove them or narrow the containing Tool's protocol scope to versions that support them.


## Requirement

A sampling request uses tools and toolChoice only from MCP 2025-11-25.

## Details

**Rule ID:** `mcp.sampling.tools.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** CreateMessageRequest · **Path:** `tools, toolChoice`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Diagnostics

| Code | Severity |
| --- | --- |
| `interaction-example-version-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.4**
  - [/docs/specification/0.9.0-draft.3/tools#req-interaction-sampling-revision](/docs/specification/0.9.0-draft.3/tools#req-interaction-sampling-revision)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 schema.ts, CreateMessageRequest (no tools); MCP 2025-11-25 and 2026-07-28 schema.ts, CreateMessageRequestParams tools and toolChoice
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1028-L1065](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1028-L1065)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1573-L1622](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1573-L1622)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2086-L2152](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2086-L2152)



## Examples

### Invalid example

Source: [expected-invalid/invalid-tool-interaction-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-tool-interaction-example-semantics.json) · Selected: `/tools/0/interactionExamples/broken/steps/2/request`

```json
{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "Summarize the release plan."
      }
    }
  ],
  "tools": [
    {
      "name": "diff_summary",
      "inputSchema": {
        "type": "object"
      }
    }
  ],
  "maxTokens": 120
}
```

## Rule Source Code

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
