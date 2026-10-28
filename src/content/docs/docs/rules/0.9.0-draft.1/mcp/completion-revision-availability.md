---
title: "mcp.completion.revision-availability"
description: "Completion examples are available in every revision that defines completion/complete and CompleteResult."
slug: docs/rules/0.9.0-draft.1/mcp/completion-revision-availability
ruleSurface: "CompleteResult"
sidebar:
  label: "mcp.completion.revision-availability"
---

Completion examples are available in every revision that defines completion/complete and CompleteResult.

**Rule ID:** `mcp.completion.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** CompleteResult<br>
**Kind:** structural<br>
**Requirement:** Not specified in the rule record<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `completion-example-version-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 10.4.6 and 11.4 (no completion examples for MCP 2024-11-05)**
  - [/docs/specification/0.9.0-draft.1/resources#req-template-completion-revisions](/docs/specification/0.9.0-draft.1/resources#req-template-completion-revisions)
  - [/docs/specification/0.9.0-draft.1/prompts#req-prompt-completion-revisions](/docs/specification/0.9.0-draft.1/prompts#req-prompt-completion-revisions)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 schema.ts, interfaces CompleteRequest (method completion/complete) and CompleteResult; the ServerCapabilities.completions capability is added in MCP 2025-03-26
  - [validation/mcp-schemas/2024-11-05/schema.ts#L951-L972](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L951-L972)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L974-L992](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L974-L992)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L237-L240](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L237-L240)

## Gaps and arbitrations

:::note[Known gap: `2024-11-05`]
Completion examples are rejected with completion-example-version-mismatch, although MCP 2024-11-05 defines completion/complete. MCP Description does not support completion examples for this revision: it is old and the use case is narrow.

Resolution: **not-fixed** (Maintainer decision on issue #72, 2026-10-25).
:::



## Examples

### Invalid example

Source: [expected-invalid/invalid-completion-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/invalid-completion-example-semantics.json) · Selected: `/prompts/0/completionExamples`

```json
{
  "unsupported-version": {
    "argument": {
      "name": "topic",
      "value": "ch"
    },
    "result": {
      "completion": {
        "values": [
          "chess"
        ]
      }
    }
  }
}
```

### Accepted with a warning

Source: [expected-warning/legacy-completion-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/legacy-completion-examples.json) · Selected: `/resourceTemplates/0/completionExamples/issue-prefix`

```json
{
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
    },
    "_meta": {
      "trace": "c1"
    }
  }
}
```

## Source record

[result.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/result.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
