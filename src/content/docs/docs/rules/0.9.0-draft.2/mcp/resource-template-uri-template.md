---
title: "mcp.resource-template.uri-template"
description: "A Resource Template uriTemplate is a valid RFC 6570 URI template."
slug: docs/rules/0.9.0-draft.2/mcp/resource-template-uri-template
ruleSurface: "ResourceTemplate"
sidebar:
  label: "mcp.resource-template.uri-template"
---

A Resource Template uriTemplate is a valid RFC 6570 URI template.

**Rule ID:** `mcp.resource-template.uri-template`<br>
**Owner:** mcp<br>
**Surface:** ResourceTemplate · **Path:** `uriTemplate`<br>
**Kind:** embedded-standard<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `invalid-resource-template-uri-template` | **error** |

## Required by

- **MCP Description 0.9.0, Section 10.2.1**
  - [/docs/specification/0.9.0-draft.2/resources#req-resource-template-uri-template](/docs/specification/0.9.0-draft.2/resources#req-resource-template-uri-template)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface ResourceTemplate, uriTemplate ("A URI template (according to RFC 6570)")
  - [validation/mcp-schemas/2024-11-05/schema.ts#L456-L461](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L456-L461)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L489-L494](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L489-L494)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L570-L575](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L570-L575)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L846-L851](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L846-L851)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1482-L1487](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1482-L1487)
- **Tier 2 — Normative referenced standards:** RFC 6570, URI Template
  - [https://www.rfc-editor.org/rfc/rfc6570#section-3](https://www.rfc-editor.org/rfc/rfc6570#section-3)


## Notes

Reported once per Resource Template, whether or not it has examples; example checks that need the parsed template are skipped.


## Examples

### Invalid example

Source: [expected-invalid/malformed-uri-template-without-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/malformed-uri-template-without-examples.json) · Selected: `/resourceTemplates/0`

```json
{
  "uriTemplate": "file:///{path",
  "name": "file_by_path"
}
```

### Invalid example

Source: [expected-invalid/malformed-resource-template-example.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/malformed-resource-template-example.json) · Selected: `/resourceTemplates/0`

```json
{
  "uriTemplate": "test://items/{id",
  "name": "malformed_template",
  "examples": {
    "concrete": {
      "uri": "test://items/123",
      "result": {
        "resultType": "complete",
        "contents": [
          {
            "uri": "test://items/123",
            "text": "item"
          }
        ]
      }
    }
  }
}
```

### Invalid example

Source: [expected-invalid/invalid-completion-example-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/invalid-completion-example-semantics.json) · Selected: `/resourceTemplates/0`

```json
{
  "protocolVersions": [
    "2026-07-28"
  ],
  "uriTemplate": "repo://{owner/{repository}/issues/{issue}",
  "name": "broken_template",
  "completionExamples": {
    "bad-template": {
      "argument": {
        "name": "issue",
        "value": "12"
      },
      "result": {
        "resultType": "complete",
        "completion": {
          "values": [
            "120"
          ]
        }
      }
    }
  }
}
```

## Source record

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
