---
title: "Represent Tool execution errors as error results"
description: "Tool execution errors are completed MCP Tool results with isError true, not a separate description-only error catalogue. Check the error result's content and avoid presenting succe"
slug: docs/rules/0.9.0-draft.3/mcpdesc/tool-example-error-result
sidebar:
  label: "mcpdesc.tool.example.error-result"
---

Tool execution errors are completed MCP Tool results with isError true, not a separate description-only error catalogue. Check the error result's content and avoid presenting successful structured output as the error payload.


## Requirement

A Tool execution-error example result sets isError to true and does not contain structuredContent.

## Details

**Rule ID:** `mcpdesc.tool.example.error-result`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool example · **Path:** `result`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 9.3 (an execution-error result MUST NOT contain structuredContent; outputSchema does not validate error content)**
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-example-error-result](/docs/specification/0.9.0-draft.3/tools#req-tool-example-error-result)



## Notes

MCP does not forbid structuredContent on error results; MCP Description requires its absence so that example structuredContent always conforms to outputSchema.


## Examples

### Invalid example

Source: [expected-invalid/invalid-tool-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-tool-example-result-semantics.json) · Selected: `/tools/1/examples/business-error/result`

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

## Rule Source Code

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
