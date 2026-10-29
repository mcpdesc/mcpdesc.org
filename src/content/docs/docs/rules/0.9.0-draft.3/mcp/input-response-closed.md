---
title: "Keep newer client input responses closed"
description: "In MCP 2026-07-28, sampling, elicitation, and roots responses are closed input responses rather than open results. Remove undefined fields; _meta is defined only for the sampling r"
slug: docs/rules/0.9.0-draft.3/mcp/input-response-closed
sidebar:
  label: "mcp.input-response.closed"
---

In MCP 2026-07-28, sampling, elicitation, and roots responses are closed input responses rather than open results. Remove undefined fields; _meta is defined only for the sampling response. Earlier versions' open-result behavior does not carry forward to these types.


## Requirement

In MCP 2026-07-28, sampling, elicitation, and roots responses are input responses, not results, and accept only the fields their types define.

## Details

**Rule ID:** `mcp.input-response.closed`<br>
**Owner:** mcp<br>
**Surface:** InputResponse<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | not-applicable | not-applicable | applies |
## Required by

- **MCP Description 0.9.0, Sections 3.6 and 9.4**
  - [/docs/specification/0.9.0-draft.3/document-structure#req-carried-closed-reject](/docs/specification/0.9.0-draft.3/document-structure#req-carried-closed-reject)
  - [/docs/specification/0.9.0-draft.3/tools#req-interaction-revision-valid](/docs/specification/0.9.0-draft.3/tools#req-interaction-revision-valid)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, type InputResponse (CreateMessageResult, ListRootsResult, ElicitResult); none extends Result; only CreateMessageResult defines _meta, through SamplingMessage
  - [validation/mcp-schemas/2026-07-28/schema.ts#L541-L542](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L541-L542)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2190-L2228](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2190-L2228)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L3120-L3149](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L3120-L3149)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2725-L2744](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2725-L2744)



## Examples

### Invalid example

Source: [expected-invalid/closed-step-responses-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/closed-step-responses-2026.json) · Selected: `/tools/0/interactionExamples/approved/steps/0/response`

```json
{
  "roots": [
    {
      "uri": "file:///workspace/example"
    }
  ],
  "_meta": {
    "trace": "r1"
  }
}
```

## Rule Source Code

[result.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/result.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
