---
title: "Declare Resources and templates with their fields"
description: "A Resource has a uri and a name; a Resource Template has a uriTemplate and a name. Both accept only the properties of their Section 10 tables, each with its defined type."
slug: docs/rules/0.9.0-rc.1/mcpdesc/resource-members
sidebar:
  label: "mcpdesc.resource.members"
---

A Resource has a uri and a name; a Resource Template has a uriTemplate and a name. Both accept only the properties of their Section 10 tables, each with its defined type.


## Requirement

Resource and Resource Template Objects have their required fields, defined property types, and no unknown properties.

## Details

**Rule ID:** `mcpdesc.resource.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Resource, ResourceTemplate<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/resource`, `#/$defs/resourceTemplate`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 10.1.1 and 10.2.1**
  - 10. Resources and Resource Templates: [req-resource-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.1/resources#req-resource-fields)
  - 10. Resources and Resource Templates: [req-resource-template-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.1/resources#req-resource-template-fields)
  - 13. Tags: [req-entity-tags-shape](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tags#req-entity-tags-shape)
  - 13. Tags: [req-entity-tags-unique](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tags#req-entity-tags-unique)




## Examples

### Invalid example

Source: [expected-invalid/malformed-info-transport-tag-resource.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/malformed-info-transport-tag-resource.json) · Selected: `/resources/0`

```json
{
  "name": "readme",
  "mimeType": "text/markdown"
}
```

## Rule Source Code

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
