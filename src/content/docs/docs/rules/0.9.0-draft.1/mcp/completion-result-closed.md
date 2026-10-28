---
title: "mcp.completion.result-closed"
description: "The completion object of a completion result contains only values, total, and hasMore."
slug: docs/rules/0.9.0-draft.1/mcp/completion-result-closed
ruleSurface: "CompleteResult"
sidebar:
  label: "mcp.completion.result-closed"
---

The completion object of a completion result contains only values, total, and hasMore.

**Rule ID:** `mcp.completion.result-closed`<br>
**Owner:** mcp<br>
**Surface:** CompleteResult · **Path:** `completion`<br>
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
| `schema-validation` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 10.4.6 and 11.4**
  - [/docs/specification/0.9.0-draft.1/document-structure#req-carried-nested-closed](/docs/specification/0.9.0-draft.1/document-structure#req-carried-nested-closed)
  - [/docs/specification/0.9.0-draft.1/document-structure#req-carried-closed-reject](/docs/specification/0.9.0-draft.1/document-structure#req-carried-closed-reject)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface CompleteResult, completion (no index signature)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L974-L992](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L974-L992)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L1115-L1133](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L1115-L1133)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1342-L1362](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1342-L1362)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2037-L2057](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2037-L2057)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2633-L2661](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2633-L2661)



## Examples

### Invalid example

Source: [expected-invalid/completion-result-extra-field.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/completion-result-extra-field.json) · Selected: `/resourceTemplates/0/completionExamples/issue-prefix/result/completion`

```json
{
  "values": [
    "120",
    "121"
  ],
  "acmeRank": 1
}
```

### Valid example

Source: [expected-valid/named-completion-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-valid/named-completion-examples.json) · Selected: `/resourceTemplates/0/completionExamples`

```json
{
  "issue-prefix": {
    "argument": {
      "name": "issue",
      "value": "12"
    },
    "result": {
      "completion": {
        "values": [
          "120",
          "121",
          "129"
        ],
        "hasMore": true,
        "total": 14
      }
    }
  }
}
```

## Source record

[result.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/result.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
