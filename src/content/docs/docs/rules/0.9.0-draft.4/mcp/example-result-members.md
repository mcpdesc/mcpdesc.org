---
title: "Give example results their MCP result shape"
description: "Example results carry MCP result values: a Tool result has content, a resource read result has contents, a prompt result has messages, and a completion result has completion. Their"
slug: docs/rules/0.9.0-draft.4/mcp/example-result-members
sidebar:
  label: "mcp.example-result.members"
---

Example results carry MCP result values: a Tool result has content, a resource read result has contents, a prompt result has messages, and a completion result has completion. Their members follow the MCP types.


## Requirement

Completed example results have the required members and member types of the MCP result type they carry.

## Details

**Rule ID:** `mcp.example-result.members`<br>
**Owner:** mcp<br>
**Surface:** CallToolResult, ReadResourceResult, GetPromptResult, CompleteResult<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/completedToolResultExample`, `#/$defs/completedReadResourceResultExample`, `#/$defs/completedPromptResultExample`, `#/$defs/promptMessageExample`, `#/$defs/completedCompletionResultExample`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 3.6, 9.3, 10.4.4, and 11.3**
  - [/docs/specification/0.9.0-draft.4/document-structure#req-carried-defined-fields](/docs/specification/0.9.0-draft.4/document-structure#req-carried-defined-fields)
  - [/docs/specification/0.9.0-draft.4/tools#req-tool-example-result-shape](/docs/specification/0.9.0-draft.4/tools#req-tool-example-result-shape)
  - [/docs/specification/0.9.0-draft.4/resources#req-resource-example-result-shape](/docs/specification/0.9.0-draft.4/resources#req-resource-example-result-shape)
  - [/docs/specification/0.9.0-draft.4/prompts#req-prompt-example-result-shape](/docs/specification/0.9.0-draft.4/prompts#req-prompt-example-result-shape)
  - [/docs/specification/0.9.0-draft.4/document-structure#req-completed-result-fields](/docs/specification/0.9.0-draft.4/document-structure#req-completed-result-fields)
  - [/docs/specification/0.9.0-draft.4/resources#req-resource-example-contents](/docs/specification/0.9.0-draft.4/resources#req-resource-example-contents)
  - [/docs/specification/0.9.0-draft.4/resources#req-template-completion-result](/docs/specification/0.9.0-draft.4/resources#req-template-completion-result)
  - [/docs/specification/0.9.0-draft.4/prompts#req-prompt-completion-result](/docs/specification/0.9.0-draft.4/prompts#req-prompt-completion-result)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 schema.ts, CallToolResult, ReadResourceResult, GetPromptResult, PromptMessage, and CompleteResult
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1104-L1130](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1104-L1130)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L723-L725](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L723-L725)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L971-L977](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L971-L977)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1032-L1035](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1032-L1035)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2042-L2057](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2042-L2057)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1809-L1838](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1809-L1838)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1229-L1231](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1229-L1231)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1634-L1640](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1634-L1640)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1704-L1707](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1704-L1707)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2644-L2661](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2644-L2661)



## Examples

### Invalid example

Source: [expected-invalid/malformed-resource-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-invalid/malformed-resource-examples.json) · Selected: `/resourceTemplates/0/examples/missing-uri/result/contents`

```json
[]
```

### Invalid example

Source: [expected-invalid/resource-example-cache-fields.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-invalid/resource-example-cache-fields.json) · Selected: `/resources/1/examples/invalid/result/cacheScope`

```json
"shared"
```

## Rule Source Code

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-draft.4`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft).
