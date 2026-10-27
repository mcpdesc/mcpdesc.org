---
title: "An example result is a completed result payload: it contains no JSON-RPC envelope field and no non-completed workflow field."
description: "An example result is a completed result payload: it contains no JSON-RPC envelope field and no non-completed workflow field."
slug: docs/rules/0.9.0-draft.1/mcpdesc/example-completed-result-form
---

**Rule ID:** `mcpdesc.example.completed-result-form`<br>
**Owner:** mcpdesc<br>
**Surface:** Example result<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `tool-example-json-rpc-envelope` | **error** |
| `prompt-example-json-rpc-envelope` | **error** |
| `resource-example-json-rpc-envelope` | **error** |
| `completion-example-json-rpc-envelope` | **error** |
| `incomplete-tool-example-result` | **error** |
| `incomplete-prompt-example-result` | **error** |
| `incomplete-resource-example-result` | **error** |
| `incomplete-completion-example-result` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 3.6, 9.3, 10.4.4, 10.4.6, 11.3, and 11.4**
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-example-completed-form](/docs/specification/0.9.0-draft.1/tools#req-tool-example-completed-form)
  - [/docs/specification/0.9.0-draft.1/resources#req-resource-example-completed-form](/docs/specification/0.9.0-draft.1/resources#req-resource-example-completed-form)
  - [/docs/specification/0.9.0-draft.1/prompts#req-prompt-example-completed-form](/docs/specification/0.9.0-draft.1/prompts#req-prompt-example-completed-form)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, InputRequiredResult (inputRequests, requestState) and Result.resultType
  - [validation/mcp-schemas/2026-07-28/schema.ts#L571-L595](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L571-L595)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L218-L236](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L218-L236)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 schema.ts, CreateTaskResult (task)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1386-L1393](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1386-L1393)


## Notes

Envelope fields are jsonrpc, id, and error. Non-completed workflow fields are task, inputRequests, and requestState. They are excluded from the field classification of mcp.result.additional-properties.preserve.


## Examples

### Invalid example

Source: [expected-invalid/invalid-tool-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-tool-example-result-semantics.json) · Selected: `/tools/3/examples/task-result/result`

```json
{
  "resultType": "complete",
  "content": [],
  "task": {
    "taskId": "task-example"
  }
}
```

### Invalid example

Source: [expected-invalid/invalid-prompt-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-prompt-example-semantics.json) · Selected: `/prompts/3/examples/task-state/result`

```json
{
  "resultType": "complete",
  "messages": [],
  "task": {
    "taskId": "task-example"
  }
}
```

### Invalid example

Source: [expected-invalid/resource-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/resource-example-result-semantics.json) · Selected: `/resources/0/examples/invalid-result/result`

```json
{
  "resultType": "complete",
  "jsonrpc": "2.0",
  "task": {},
  "contents": [
    {
      "uri": "asset:///invalid.bin",
      "blob": "not base64"
    }
  ]
}
```

### Invalid example

Source: [expected-invalid/invalid-completion-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-completion-example-semantics.json) · Selected: `/prompts/2/completionExamples/bad-membership/result`

```json
{
  "resultType": "complete",
  "completion": {
    "values": [
      "Ada"
    ]
  },
  "jsonrpc": "2.0"
}
```

## Source record

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
