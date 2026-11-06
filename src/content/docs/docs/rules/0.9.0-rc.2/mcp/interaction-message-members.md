---
title: "Use MCP shapes in interaction requests and responses"
description: "Interaction steps carry MCP values: elicitation requests and results, sampling requests, messages, and results, and roots lists. Each has the members its MCP type requires and defi"
slug: docs/rules/0.9.0-rc.2/mcp/interaction-message-members
sidebar:
  label: "mcp.interaction-message.members"
---

Interaction steps carry MCP values: elicitation requests and results, sampling requests, messages, and results, and roots lists. Each has the members its MCP type requires and defines.


## Requirement

Elicitation, sampling, and roots requests and responses in interaction steps have the members and member types of their MCP types.

## Details

**Rule ID:** `mcp.interaction-message.members`<br>
**Owner:** mcp<br>
**Surface:** ElicitRequest, ElicitResult, CreateMessageRequest, CreateMessageResult, ListRootsResult, Root<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/elicitationInteractionRequest`, `#/$defs/elicitationInteractionFormRequest`, `#/$defs/elicitationInteractionUrlRequest`, `#/$defs/elicitationInteractionResponse`, `#/$defs/elicitationInteractionAcceptedResponse`, `#/$defs/elicitationInteractionDeclinedResponse`, `#/$defs/samplingCreateMessageRequest`, `#/$defs/samplingCreateMessageResult`, `#/$defs/samplingMessage`, `#/$defs/samplingMessageContent`, `#/$defs/samplingContentBlock`, `#/$defs/samplingModelHint`, `#/$defs/samplingModelPreferences`, `#/$defs/samplingRequestTool`, `#/$defs/samplingToolChoice`, `#/$defs/samplingToolResultContent`, `#/$defs/samplingToolUseContent`, `#/$defs/rootsListRequest`, `#/$defs/rootsListResult`, `#/$defs/rootDeclaration`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 3.6 and 9.4**
  - 3. Document Structure: [req-carried-defined-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/document-structure#req-carried-defined-fields)
  - 9. Tools: [req-interaction-protocol-version-valid](https://mcpdesc.org/docs/specification/0.9.0-rc.2/tools#req-interaction-protocol-version-valid)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 schema.ts, CreateMessageRequestParams, SamplingMessage, CreateMessageResult, ElicitRequestFormParams, ElicitResult, ListRootsResult, and Root
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1578-L1622](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1578-L1622)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1681-L1688](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1681-L1688)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1656-L1674](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1656-L1674)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2155-L2178](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2155-L2178)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2471-L2486](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2471-L2486)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2107-L2109](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2107-L2109)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2116-L2136](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2116-L2136)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2104-L2152](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2104-L2152)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2245-L2249](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2245-L2249)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2210-L2228](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2210-L2228)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2788-L2811](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2788-L2811)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L3134-L3149](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L3134-L3149)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2742-L2744](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2742-L2744)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2758-L2775](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2758-L2775)



## Examples

### Invalid example

Source: [expected-invalid/malformed-sampling-step.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/malformed-sampling-step.json) · Selected: `/tools/0/interactionExamples/summary/steps/0/request`

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
  ]
}
```

### Invalid example

Source: [expected-invalid/discriminated-resource-link-size.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/discriminated-resource-link-size.json) · Selected: `/tools/0/interactionExamples/nested/steps/0/response/content`

```json
{
  "type": "resource_link",
  "name": "readme",
  "uri": "file:///readme",
  "size": 1.5
}
```

### Invalid example

Source: [expected-invalid/discriminated-union-members.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/discriminated-union-members.json) · Selected: `/tools/0/interactionExamples/invalid/steps/0`

```json
{
  "type": "elicitation",
  "request": {
    "mode": "url",
    "message": "Authorize",
    "ur": "https://example.test/auth"
  },
  "response": {
    "action": "accepted"
  }
}
```

## Rule Source Code

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
