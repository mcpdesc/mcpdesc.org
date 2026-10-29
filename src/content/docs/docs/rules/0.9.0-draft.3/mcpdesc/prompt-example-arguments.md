---
title: "Supply the Prompt arguments the example requires"
description: "A Prompt example supplies every required argument and no undeclared argument. Check names against the containing Prompt, including when the example comes from a reusable component."
slug: docs/rules/0.9.0-draft.3/mcpdesc/prompt-example-arguments
sidebar:
  label: "mcpdesc.prompt.example.arguments"
---

A Prompt example supplies every required argument and no undeclared argument. Check names against the containing Prompt, including when the example comes from a reusable component. Omitted optional arguments do not need placeholder values.


## Requirement

A Prompt example supplies every required Prompt argument and no undeclared argument.

## Details

**Rule ID:** `mcpdesc.prompt.example.arguments`<br>
**Owner:** mcpdesc<br>
**Surface:** Prompt example · **Path:** `arguments`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Diagnostics

| Code | Severity |
| --- | --- |
| `prompt-example-missing-required-argument` | **error** |
| `prompt-example-unknown-argument` | **error** |

## Required by

- **MCP Description 0.9.0, Section 11.3**
  - [/docs/specification/0.9.0-draft.3/prompts#req-prompt-example-arguments](/docs/specification/0.9.0-draft.3/prompts#req-prompt-example-arguments)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface PromptArgument, required ("Whether this argument must be provided")
  - [validation/mcp-schemas/2024-11-05/schema.ts#L588-L591](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L588-L591)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L626-L629](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L626-L629)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L727-L730](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L727-L730)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1011-L1014](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1011-L1014)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1683-L1686](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1683-L1686)



## Examples

### Valid example

Source: [expected-valid/named-prompt-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/named-prompt-examples.json) · Selected: `/prompts/2`

```json
{
  "name": "city_briefing",
  "protocolVersions": [
    "2026-07-28"
  ],
  "arguments": [
    {
      "name": "city",
      "required": true
    },
    {
      "name": "audience"
    }
  ],
  "examples": {
    "paris-engineering": {
      "arguments": {
        "city": "Paris",
        "audience": "engineering"
      },
      "result": {
        "resultType": "complete",
        "description": "Engineering briefing for Paris",
        "messages": [
          {
            "role": "user",
            "content": {
              "type": "text",
              "text": "Summarize current engineering considerations for Paris."
            }
          },
          {
            "role": "assistant",
            "content": {
              "type": "resource_link",
              "uri": "briefing://paris/engineering",
              "name": "Paris engineering briefing",
              "mimeType": "text/markdown"
            }
          }
        ]
      }
    }
  }
}
```

### Invalid example

Source: [expected-invalid/invalid-prompt-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/invalid-prompt-example-semantics.json) · Selected: `/prompts/0/examples/unknown-and-missing/arguments`

```json
{
  "audience": "engineering",
  "rogue": "oops"
}
```

### Invalid example

Source: [expected-invalid/component-contextual-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/component-contextual-examples.json) · Selected: `/components/promptExamples/bad-arguments`

```json
{
  "arguments": {
    "rogue": "oops"
  },
  "result": {
    "resultType": "complete",
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "Hello."
        }
      }
    ]
  }
}
```

## Rule Source Code

[prompt.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/prompt.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
