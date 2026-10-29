---
title: "Keep Resource examples consistent with declarations"
description: "Resource example contents are compared with the declaration's requested URI, MIME type, and declared raw size. A mutable resource can differ between observations, so size differenc"
slug: docs/rules/0.9.0-draft.3/mcpdesc/resource-example-consistency
sidebar:
  label: "mcpdesc.resource.example.consistency"
---

Resource example contents are compared with the declaration's requested URI, MIME type, and declared raw size. A mutable resource can differ between observations, so size differences are warnings. Review the example and declaration together rather than inferring live content.


## Requirement

Resource example contents agree with their declaration: the requested URI is returned, MIME types match, and raw size matches a declared size.

## Details

**Rule ID:** `mcpdesc.resource.example.consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Resource example · **Path:** `result.contents`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** should<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Diagnostics

| Code | Severity |
| --- | --- |
| `resource-example-requested-uri-not-returned` | **warning** |
| `resource-example-mime-type-mismatch` | **warning** |
| `resource-example-size-mismatch` | **warning** |

## Required by

- **MCP Description 0.9.0, Section 10.4.4**
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-example-requested-uri](/docs/specification/0.9.0-draft.3/resources#req-resource-example-requested-uri)
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-example-mime-type](/docs/specification/0.9.0-draft.3/resources#req-resource-example-mime-type)
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-example-size](/docs/specification/0.9.0-draft.3/resources#req-resource-example-size)



## Notes

Collections and indirect reads may legitimately differ, so these are warnings.


## Examples

### Accepted with a warning

Source: [expected-warning/resource-example-consistency.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/resource-example-consistency.json) · Selected: `/resources/0/examples/collection-snapshot/result`

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

## Rule Source Code

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
