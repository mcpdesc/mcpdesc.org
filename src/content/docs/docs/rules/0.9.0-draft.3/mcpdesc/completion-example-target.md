---
title: "Complete a declared argument or template variable"
description: "A completion example must target a Prompt argument or Resource Template variable that exists. Context entries must name other declared targets, not repeat the argument being comple"
slug: docs/rules/0.9.0-draft.3/mcpdesc/completion-example-target
sidebar:
  label: "mcpdesc.completion-example.target"
---

A completion example must target a Prompt argument or Resource Template variable that exists. Context entries must name other declared targets, not repeat the argument being completed. Correct the example names or the declaration they describe.


## Requirement

A completion example completes a declared Prompt argument or URI template variable, and its context names other declared arguments or variables only.

## Details

**Rule ID:** `mcpdesc.completion-example.target`<br>
**Owner:** mcpdesc<br>
**Surface:** Completion example · **Path:** `argument, context`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Diagnostics

| Code | Severity |
| --- | --- |
| `prompt-completion-example-unknown-argument` | **error** |
| `prompt-completion-example-context-unknown-argument` | **error** |
| `resource-template-completion-example-unknown-variable` | **error** |
| `resource-template-completion-example-context-unknown-variable` | **error** |
| `completion-example-duplicate-target-context` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 10.4.6 and 11.4**
  - [/docs/specification/0.9.0-draft.3/resources#req-template-completion-target](/docs/specification/0.9.0-draft.3/resources#req-template-completion-target)
  - [/docs/specification/0.9.0-draft.3/prompts#req-prompt-completion-target](/docs/specification/0.9.0-draft.3/prompts#req-prompt-completion-target)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 schema.ts, CompleteRequest context.arguments (previously-resolved variables in a URI template or prompt)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1307-L1340](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1307-L1340)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1995-L2025](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1995-L2025)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2582-L2618](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2582-L2618)



## Examples

### Valid example

Source: [expected-valid/named-completion-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/named-completion-examples.json) · Selected: `/prompts/0/completionExamples`

```json
{
  "engineering-a": {
    "argument": {
      "name": "name",
      "value": "a"
    },
    "context": {
      "arguments": {
        "department": "engineering"
      }
    },
    "result": {
      "completion": {
        "values": [
          "Ada",
          "Alan"
        ],
        "total": 2,
        "hasMore": false
      }
    }
  }
}
```

### Invalid example

Source: [expected-invalid/invalid-completion-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-completion-example-semantics.json) · Selected: `/prompts/2/completionExamples/bad-membership/argument`

```json
{
  "name": "nickname",
  "value": "a"
}
```

## Rule Source Code

[example.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/example.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
