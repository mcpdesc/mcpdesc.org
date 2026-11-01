---
title: "Declare tags with a name"
description: "Each entry of the root tags catalogue is a Tag Object with a name and only the properties of Section 13.1."
slug: docs/rules/0.9.0-draft.4/mcpdesc/tag-members
sidebar:
  label: "mcpdesc.tag.members"
---

Each entry of the root tags catalogue is a Tag Object with a name and only the properties of Section 13.1.


## Requirement

A Tag Object has a non-empty name and only its defined properties.

## Details

**Rule ID:** `mcpdesc.tag.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Tag<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/tag`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 13.1**
  - [/docs/specification/0.9.0-draft.4/tags#req-tag-fields](/docs/specification/0.9.0-draft.4/tags#req-tag-fields)




## Examples

### Invalid example

Source: [expected-invalid/malformed-info-transport-tag-resource.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/fixtures/expected-invalid/malformed-info-transport-tag-resource.json) · Selected: `/tags/0`

```json
{
  "description": "A tag without a name"
}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.4`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft).
