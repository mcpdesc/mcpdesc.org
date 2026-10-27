---
title: "A field that an open MCP result type allows but the revision does not define is accepted and preserved without meaning, with a warning attributed to that revision."
description: "A field that an open MCP result type allows but the revision does not define is accepted and preserved without meaning, with a warning attributed to that revision."
slug: docs/rules/0.9.0-draft.1/mcp/result-additional-properties-preserve
---

**Rule ID:** `mcp.result.additional-properties.preserve`<br>
**Owner:** mcp<br>
**Surface:** Result<br>
**Kind:** preservation<br>
**Requirement:** may<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `result-field-not-defined-by-version` | **warning** |

## Required by

- **MCP Description 0.9.0, Section 3.6 (Carried MCP Values)**
  - [/docs/specification/0.9.0-draft.1/document-structure#req-carried-open-preserve](/docs/specification/0.9.0-draft.1/document-structure#req-carried-open-preserve)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface Result (index signature [key: string]: unknown, inherited by every result type)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L42-L48](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L42-L48)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L61-L67](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L61-L67)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L60-L69](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L60-L69)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L88-L97](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L88-L97)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L218-L236](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L218-L236)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2025-11-25 schema.ts, CreateMessageResult, ElicitResult, and ListRootsResult extend Result
  - [validation/mcp-schemas/2024-11-05/schema.ts#L793-L805](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L793-L805)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L899-L911](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L899-L911)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1067-L1081](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1067-L1081)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1649-L1674](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1649-L1674)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1538-L1557](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1538-L1557)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2466-L2486](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2466-L2486)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L1032-L1039](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L1032-L1039)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L1173-L1180](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L1173-L1180)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1404-L1413](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1404-L1413)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2100-L2109](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2100-L2109)


## Notes

The warnings of this rule for a document equal the union of its warnings for each per-revision Effective Protocol View (scripts/test-views.mjs).


## Examples

### Accepted with a warning

Source: [expected-warning/open-result-unknown-properties.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/open-result-unknown-properties.json) · Selected: `/tools/0/examples/traced/result`

```json
{
  "content": [
    {
      "type": "text",
      "text": "found"
    }
  ],
  "vendorTrace": {
    "id": "a1"
  }
}
```

### Accepted with a warning

Source: [expected-warning/open-results-shared-across-revisions.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/open-results-shared-across-revisions.json) · Selected: `/prompts/0/examples/default/result`

```json
{
  "resultType": "complete",
  "messages": [
    {
      "role": "assistant",
      "content": {
        "type": "text",
        "text": "Hello."
      }
    }
  ]
}
```

### Accepted with a warning

Source: [expected-warning/open-step-responses-before-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/open-step-responses-before-2026.json) · Selected: `/tools/0/interactionExamples/approved/steps/0/response`

```json
{
  "roots": [
    {
      "uri": "file:///workspace/example",
      "_meta": {
        "trace": "root1"
      }
    }
  ],
  "_meta": {
    "trace": "r1"
  },
  "acmeTrace": {
    "id": "a1"
  }
}
```

### Accepted with a warning

Source: [expected-warning/component-protocol-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/component-protocol-scope.json) · Selected: `/components/resourceExamples/current/result`

```json
{
  "resultType": "complete",
  "ttlMs": 60,
  "cacheScope": "private",
  "contents": [
    {
      "uri": "data://status",
      "text": "ready"
    }
  ]
}
```

## Source record

[result.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/result.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
