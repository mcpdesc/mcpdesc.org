---
title: "Match example results to every applicable version"
description: "A completed example result must contain the fields each applicable MCP protocol version requires, with valid values. Check the result's full effective scope, not only the newest ve"
slug: docs/rules/0.9.0-draft.3/mcpdesc/example-result-revision-fidelity
sidebar:
  label: "mcpdesc.example.result.revision-fidelity"
---

A completed example result must contain the fields each applicable MCP protocol version requires, with valid values. Check the result's full effective scope, not only the newest version. Fields permitted but undefined on open result types are handled separately as warnings.


## Requirement

An example result contains every field that each applicable MCP revision requires, and every field a revision defines has a valid value.

## Details

**Rule ID:** `mcpdesc.example.result.revision-fidelity`<br>
**Owner:** mcpdesc<br>
**Surface:** Example result<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** Not specified in the rule record<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Sections 9.3, 10.4.4, 10.4.6, 11.3, and 11.4**
  - [/docs/specification/0.9.0-draft.3/document-structure#req-carried-defined-fields](/docs/specification/0.9.0-draft.3/document-structure#req-carried-defined-fields)
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-example-result-shape](/docs/specification/0.9.0-draft.3/tools#req-tool-example-result-shape)
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-example-result-shape](/docs/specification/0.9.0-draft.3/resources#req-resource-example-result-shape)
  - [/docs/specification/0.9.0-draft.3/prompts#req-prompt-example-result-shape](/docs/specification/0.9.0-draft.3/prompts#req-prompt-example-result-shape)
- **Examples fail fast decision (validation README, 2026-10-25, issue #72)**
  - [validation/README.md#examples-fail-fast](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/README.md#examples-fail-fast)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, interface Result (resultType required) and interface CacheableResult (ttlMs, cacheScope required)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L218-L236](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L218-L236)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1076-L1110](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1076-L1110)


## Notes

Fields a revision does not define are governed by mcp.result.additional-properties.preserve (accepted with a warning). When present, resultType must be "complete", ttlMs non-negative, and cacheScope "public" or "private" in every revision (document schema).


## Examples

### Valid example

Source: [expected-valid/named-tool-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/named-tool-examples.json) · Selected: `/tools/0/examples`

```json
{
  "paris.complete": {
    "input": {
      "city": "Paris"
    },
    "result": {
      "resultType": "complete",
      "content": [
        {
          "type": "text",
          "text": "Paris: 21.5 C"
        },
        {
          "type": "image",
          "data": "aW1hZ2U=",
          "mimeType": "image/png"
        },
        {
          "type": "audio",
          "data": "YXVkaW8=",
          "mimeType": "audio/wav"
        },
        {
          "type": "resource",
          "resource": {
            "uri": "weather://paris/report",
            "mimeType": "text/plain",
            "text": "Clear"
          }
        },
        {
          "type": "resource_link",
          "uri": "weather://paris/map",
          "name": "Paris map",
          "mimeType": "image/png"
        }
      ],
      "structuredContent": {
        "temperature": 21.5
      },
      "isError": false
    }
  }
}
```

### Valid example

Source: [expected-valid/named-resource-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/named-resource-examples.json) · Selected: `/resources/0/examples`

```json
{
  "two-files": {
    "result": {
      "contents": [
        {
          "uri": "file:///project/src/",
          "mimeType": "inode/directory",
          "text": "main.rs\nlib.rs\n"
        },
        {
          "uri": "file:///project/src/main.rs",
          "mimeType": "text/x-rust",
          "text": "fn main() {}\n",
          "_meta": {
            "captured": true
          }
        },
        {
          "uri": "file:///project/src/lib.rs",
          "mimeType": "text/x-rust",
          "text": "pub fn answer() -> u8 { 42 }\n"
        }
      ],
      "_meta": {
        "snapshot": "example"
      }
    }
  }
}
```

### Valid example

Source: [expected-warning/legacy-result-meta.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/legacy-result-meta.json) · Selected: `/resources/0/examples/with-result-meta/result`

```json
{
  "contents": [
    {
      "uri": "test://legacy",
      "text": "legacy"
    }
  ],
  "_meta": {
    "trace": "r1"
  }
}
```

### Valid example

Source: [expected-warning/open-results-shared-across-revisions.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/open-results-shared-across-revisions.json) · Selected: `/tools/0/examples/paris/result`

```json
{
  "resultType": "complete",
  "content": [
    {
      "type": "text",
      "text": "Paris: 18 C"
    }
  ]
}
```

### Invalid example

Source: [expected-invalid/invalid-prompt-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-prompt-example-semantics.json) · Selected: `/prompts/0/examples/unknown-and-missing/result`

```json
{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "Summarize Paris."
      }
    }
  ]
}
```

### Invalid example

Source: [expected-invalid/invalid-completion-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-completion-example-semantics.json) · Selected: `/prompts/3/completionExamples/missing-result-type/result`

```json
{
  "completion": {
    "values": [
      "Ada"
    ],
    "hasMore": false
  }
}
```

## Rule Source Code

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
