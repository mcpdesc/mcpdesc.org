---
title: "A Tool execution-error example result sets isError to true and does not contain structuredContent."
description: "A Tool execution-error example result sets isError to true and does not contain structuredContent."
slug: docs/rules/0.9.0-draft.1/mcpdesc/tool-example-error-result
---

**Rule ID:** `mcpdesc.tool.example.error-result`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool example · **Path:** `result`<br>
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
| `structured-tool-error-example` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.3 (an execution-error result MUST NOT contain structuredContent; outputSchema does not validate error content)**
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-example-error-result](/docs/specification/0.9.0-draft.1/tools#req-tool-example-error-result)



## Notes

MCP does not forbid structuredContent on error results; MCP Description requires its absence so that example structuredContent always conforms to outputSchema.


## Examples

### Invalid example

Source: [expected-invalid/invalid-tool-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-tool-example-result-semantics.json) · Selected: `/tools/1/examples/business-error/result`

```json
{
  "resultType": "complete",
  "content": [
    {
      "type": "text",
      "text": "Rejected"
    }
  ],
  "structuredContent": {
    "code": "rejected"
  },
  "isError": true
}
```

## Source record

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
