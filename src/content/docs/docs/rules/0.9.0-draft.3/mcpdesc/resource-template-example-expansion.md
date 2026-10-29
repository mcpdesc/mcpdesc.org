---
title: "Use a concrete URI that expands the template"
description: "A Resource Template example records the concrete requested URI, which must be an RFC 6570 expansion of the containing template. Check the template and URI together, including examp"
slug: docs/rules/0.9.0-draft.3/mcpdesc/resource-template-example-expansion
sidebar:
  label: "mcpdesc.resource-template.example.expansion"
---

A Resource Template example records the concrete requested URI, which must be an RFC 6570 expansion of the containing template. Check the template and URI together, including examples reached through components. Matching a URI does not require network retrieval.


## Requirement

A Resource Template example uri is a valid RFC 6570 expansion of the template.

## Details

**Rule ID:** `mcpdesc.resource-template.example.expansion`<br>
**Owner:** mcpdesc<br>
**Surface:** Resource Template example · **Path:** `uri`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Diagnostics

| Code | Severity |
| --- | --- |
| `resource-template-example-invalid-expansion` | **error** |

## Required by

- **MCP Description 0.9.0, Section 10.4.3**
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-template-example-expansion](/docs/specification/0.9.0-draft.3/resources#req-resource-template-example-expansion)

## Based on

- **Tier 2 — Normative referenced standards:** RFC 6570, URI Template
  - [https://www.rfc-editor.org/rfc/rfc6570#section-3](https://www.rfc-editor.org/rfc/rfc6570#section-3)



## Examples

### Valid example

Source: [expected-valid/named-resource-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/named-resource-examples.json) · Selected: `/resourceTemplates/0`

```json
{
  "protocolVersions": [
    "2026-07-28"
  ],
  "uriTemplate": "chess://games/{game_id}",
  "name": "game_detail",
  "mimeType": "application/json",
  "examples": {
    "sample-game": {
      "uri": "chess://games/example-1234",
      "result": {
        "resultType": "complete",
        "ttlMs": 300000,
        "cacheScope": "public",
        "contents": [
          {
            "uri": "chess://games/example-1234",
            "mimeType": "application/json",
            "text": "{\"id\":\"example-1234\",\"result\":\"1-0\"}"
          }
        ]
      }
    }
  }
}
```

### Invalid example

Source: [expected-invalid/resource-example-result-semantics.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/resource-example-result-semantics.json) · Selected: `/resourceTemplates/0/examples/not-an-expansion`

```json
{
  "uri": "chess://players/example-1234",
  "result": {
    "contents": [
      {
        "uri": "chess://players/example-1234",
        "text": "wrong route"
      }
    ]
  }
}
```

### Invalid example

Source: [expected-invalid/component-contextual-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/component-contextual-examples.json) · Selected: `/components/resourceTemplateExamples/bad-uri`

```json
{
  "uri": "data://other/1",
  "result": {
    "resultType": "complete",
    "ttlMs": 1,
    "cacheScope": "private",
    "contents": [
      {
        "uri": "data://other/1",
        "text": "wrong"
      }
    ]
  }
}
```

## Rule Source Code

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
