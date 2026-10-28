---
title: "mcpdesc.tool.interaction.elicitation-consistency"
description: "An elicitation step matches the Tool's named Elicitation Declaration, and its response content is present exactly when an accepted form response requires it and validates against t"
slug: docs/rules/0.9.0-draft.1/mcpdesc/tool-interaction-elicitation-consistency
ruleSurface: "Tool interaction example"
sidebar:
  label: "mcpdesc.tool.interaction.elicitation-consistency"
---

An elicitation step matches the Tool's named Elicitation Declaration, and its response content is present exactly when an accepted form response requires it and validates against the requested schema.

**Rule ID:** `mcpdesc.tool.interaction.elicitation-consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool interaction example · **Path:** `steps`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `unknown-elicitation-declaration` | **error** |
| `interaction-example-elicitation-declaration-mismatch` | **error** |
| `interaction-example-elicitation-response-mismatch` | **error** |
| `interaction-example-elicitation-content-schema-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Section 9.4**
  - [/docs/specification/0.9.0-draft.1/tools#req-interaction-elicitation-declaration](/docs/specification/0.9.0-draft.1/tools#req-interaction-elicitation-declaration)
  - [/docs/specification/0.9.0-draft.1/tools#req-interaction-elicitation-response](/docs/specification/0.9.0-draft.1/tools#req-interaction-elicitation-response)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 schema.ts, interface ElicitResult, content (present for accepted form responses)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1538-L1557](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1538-L1557)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2466-L2486](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2466-L2486)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L3120-L3149](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L3120-L3149)



## Examples

### Invalid example

Source: [expected-invalid/invalid-tool-interaction-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-tool-interaction-example-semantics.json) · Selected: `/tools/0/interactionExamples/broken/steps/0`

```json
{
  "type": "elicitation",
  "declaration": "missing",
  "request": {
    "mode": "url",
    "message": "Authorize publication.",
    "url": "https://mcp.example.com/release/connect"
  },
  "response": {
    "action": "accept",
    "content": {
      "approved": true
    }
  }
}
```

### Valid example

Source: [expected-valid/named-tool-interaction-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-valid/named-tool-interaction-examples.json) · Selected: `/tools/0/interactionExamples`

```json
{
  "approved-release": {
    "input": {
      "version": "2.0.0"
    },
    "steps": [
      {
        "type": "roots",
        "request": {},
        "response": {
          "roots": [
            {
              "uri": "file:///workspace/example",
              "name": "Example workspace"
            }
          ]
        }
      },
      {
        "type": "sampling",
        "request": {
          "messages": [
            {
              "role": "user",
              "content": {
                "type": "text",
                "text": "Summarize the release plan."
              }
            }
          ],
          "tools": [
            {
              "name": "diff_summary",
              "description": "Summarize pending release changes.",
              "inputSchema": {
                "type": "object",
                "properties": {
                  "branch": {
                    "type": "string"
                  }
                },
                "required": [
                  "branch"
                ]
              }
            }
          ],
          "toolChoice": {
            "mode": "auto"
          },
          "maxTokens": 180
        },
        "response": {
          "role": "assistant",
          "content": {
            "type": "text",
            "text": "Run smoke tests and confirm the changelog before publishing version 2.0.0."
          },
          "model": "claude-3-sonnet-20240229",
          "stopReason": "endTurn"
        }
      },
      {
        "type": "elicitation",
        "declaration": "confirm",
        "request": {
          "mode": "form",
          "message": "Approve this release?",
          "requestedSchema": {
            "type": "object",
            "properties": {
              "approved": {
                "type": "boolean"
              }
            },
            "required": [
              "approved"
            ]
          }
        },
        "response": {
          "action": "accept",
          "content": {
            "approved": true
          }
        }
      }
    ],
    "result": {
      "content": [
        {
          "type": "text",
          "text": "Release preparation completed."
        }
      ],
      "structuredContent": {
        "status": "prepared"
      }
    }
  }
}
```

## Source record

[interaction.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/interaction.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
