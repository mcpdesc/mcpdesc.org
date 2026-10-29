---
title: "mcpdesc.tool.example.schema-conformance"
description: "A Tool example input validates against inputSchema, and its structuredContent against outputSchema, for every applicable revision; incomplete validation is reported."
slug: docs/rules/0.9.0-draft.2/mcpdesc/tool-example-schema-conformance
ruleSurface: "Tool example"
sidebar:
  label: "mcpdesc.tool.example.schema-conformance"
---

A Tool example input validates against inputSchema, and its structuredContent against outputSchema, for every applicable revision; incomplete validation is reported.

**Rule ID:** `mcpdesc.tool.example.schema-conformance`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool example · **Path:** `examples, interactionExamples`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal



## Diagnostics

| Code | Severity |
| --- | --- |
| `tool-example-schema-mismatch` | **error** |
| `incomplete-tool-example-validation` | **warning** |

## Required by

- **MCP Description 0.9.0, Sections 9.2, 9.3, and 9.4**
  - [/docs/specification/0.9.0-draft.2/tools#req-tool-example-input-valid](/docs/specification/0.9.0-draft.2/tools#req-tool-example-input-valid)
  - [/docs/specification/0.9.0-draft.2/tools#req-tool-example-incomplete-validation](/docs/specification/0.9.0-draft.2/tools#req-tool-example-incomplete-validation)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 specification, Server Features, Tools, Output Schema (structured results conform to outputSchema)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/server/tools.mdx#L309-L382](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/server/tools.mdx#L309-L382)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/server/tools.mdx#L335-L408](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/server/tools.mdx#L335-L408)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L509-L631](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/tools.mdx#L509-L631)


## Notes

Before MCP 2025-11-25 no embedded dialect is defined, so only the legacy shape is checked and the warning reports the gap.


## Examples

### Invalid example

Source: [expected-invalid/tool-example-schema-mismatches.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/tool-example-schema-mismatches.json) · Selected: `/tools/0/examples/wrong-types`

```json
{
  "input": {
    "count": "one"
  },
  "result": {
    "resultType": "complete",
    "content": [
      {
        "type": "text",
        "text": "one"
      }
    ],
    "structuredContent": {
      "total": "one"
    }
  }
}
```

### Invalid example

Source: [expected-invalid/component-contextual-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/component-contextual-examples.json) · Selected: `/components/toolExamples/bad-input`

```json
{
  "input": {
    "query": 42
  },
  "result": {
    "resultType": "complete",
    "content": [],
    "structuredContent": {
      "count": "one"
    }
  }
}
```

### Accepted with a warning

Source: [expected-warning/pre-dialect-tool-example.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-warning/pre-dialect-tool-example.json) · Selected: `/tools/0/examples/friendly`

```json
{
  "input": {
    "name": "Example User"
  },
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Hello, Example User."
      }
    ]
  }
}
```

### Accepted with a warning

Source: [expected-warning/unresolved-external-tool-example-ref.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-warning/unresolved-external-tool-example-ref.json) · Selected: `/tools/0/examples/external-identifier`

```json
{
  "input": {
    "identifier": "example-123"
  },
  "result": {
    "resultType": "complete",
    "content": [
      {
        "type": "text",
        "text": "Found example-123."
      }
    ]
  }
}
```

## Source record

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
