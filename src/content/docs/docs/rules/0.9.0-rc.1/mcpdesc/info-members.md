---
title: "Describe the server in a valid Info Object"
description: "The required info object names and versions the server. Its contact and license objects are closed and follow the property tables of Section 5."
slug: docs/rules/0.9.0-rc.1/mcpdesc/info-members
sidebar:
  label: "mcpdesc.info.members"
---

The required info object names and versions the server. Its contact and license objects are closed and follow the property tables of Section 5.


## Requirement

Info has a non-empty name and version, and Info, Contact, and License contain only their defined properties with the defined types.

## Details

**Rule ID:** `mcpdesc.info.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Info, Contact, License<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/info`, `#/$defs/contact`, `#/$defs/license`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 5**
  - [/docs/specification/0.9.0-rc.1/info-object#req-info-fields](/docs/specification/0.9.0-rc.1/info-object#req-info-fields)
  - [/docs/specification/0.9.0-rc.1/info-object#req-contact-fields](/docs/specification/0.9.0-rc.1/info-object#req-contact-fields)
  - [/docs/specification/0.9.0-rc.1/info-object#req-license-fields](/docs/specification/0.9.0-rc.1/info-object#req-license-fields)
  - [/docs/specification/0.9.0-rc.1/versioning#req-info-unscoped](/docs/specification/0.9.0-rc.1/versioning#req-info-unscoped)
  - [/docs/specification/0.9.0-rc.1/info-object#req-info-protocol-version-independent](/docs/specification/0.9.0-rc.1/info-object#req-info-protocol-version-independent)
  - [/docs/specification/0.9.0-rc.1/info-object#req-info-name-non-empty](/docs/specification/0.9.0-rc.1/info-object#req-info-name-non-empty)
  - [/docs/specification/0.9.0-rc.1/info-object#req-info-version-non-empty](/docs/specification/0.9.0-rc.1/info-object#req-info-version-non-empty)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-value-formats](/docs/specification/0.9.0-rc.1/serialization#req-serialization-value-formats)




## Examples

### Invalid example

Source: [expected-invalid/malformed-info-transport-tag-resource.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/malformed-info-transport-tag-resource.json) · Selected: `/info/owner`

```json
"Example Team"
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
