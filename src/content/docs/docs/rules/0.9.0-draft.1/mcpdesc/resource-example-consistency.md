---
title: "Resource example contents agree with their declaration: the requested URI is returned, MIME types match, and raw size matches a declared size."
description: "Resource example contents agree with their declaration: the requested URI is returned, MIME types match, and raw size matches a declared size."
slug: docs/rules/0.9.0-draft.1/mcpdesc/resource-example-consistency
---

**Rule ID:** `mcpdesc.resource.example.consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Resource example · **Path:** `result.contents`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** should<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `resource-example-requested-uri-not-returned` | **warning** |
| `resource-example-mime-type-mismatch` | **warning** |
| `resource-example-size-mismatch` | **warning** |

## Required by

- **MCP Description 0.9.0, Section 10.4.4**
  - [/docs/specification/0.9.0-draft.1/resources#req-resource-example-requested-uri](/docs/specification/0.9.0-draft.1/resources#req-resource-example-requested-uri)
  - [/docs/specification/0.9.0-draft.1/resources#req-resource-example-mime-type](/docs/specification/0.9.0-draft.1/resources#req-resource-example-mime-type)
  - [/docs/specification/0.9.0-draft.1/resources#req-resource-example-size](/docs/specification/0.9.0-draft.1/resources#req-resource-example-size)



## Notes

Collections and indirect reads may legitimately differ, so these are warnings.


## Examples

### Accepted with a warning

Source: [expected-warning/resource-example-consistency.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/resource-example-consistency.json) · Selected: `/resources/0/examples/collection-snapshot/result`

```json
{
  "contents": [
    {
      "uri": "collection:///items/one",
      "mimeType": "application/vnd.example.item+json",
      "text": "{\"id\":1}"
    }
  ]
}
```

## Source record

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
