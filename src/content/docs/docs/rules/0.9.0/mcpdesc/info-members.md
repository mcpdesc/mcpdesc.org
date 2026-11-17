---
title: "Describe the server in a valid Info Object"
description: "The required info object names and versions the server. Its contact and license objects are closed and follow the property tables of Section 5."
slug: docs/rules/0.9.0/mcpdesc/info-members
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
  - 5. Info Object: [req-info-fields](https://mcpdesc.org/docs/specification/0.9.0/info-object#req-info-fields)
  - 5. Info Object: [req-contact-fields](https://mcpdesc.org/docs/specification/0.9.0/info-object#req-contact-fields)
  - 5. Info Object: [req-license-fields](https://mcpdesc.org/docs/specification/0.9.0/info-object#req-license-fields)
  - 4. Versioning: [req-info-unscoped](https://mcpdesc.org/docs/specification/0.9.0/versioning#req-info-unscoped)
  - 5. Info Object: [req-info-protocol-version-independent](https://mcpdesc.org/docs/specification/0.9.0/info-object#req-info-protocol-version-independent)
  - 5. Info Object: [req-info-name-non-empty](https://mcpdesc.org/docs/specification/0.9.0/info-object#req-info-name-non-empty)
  - 5. Info Object: [req-info-version-non-empty](https://mcpdesc.org/docs/specification/0.9.0/info-object#req-info-version-non-empty)
  - 15. Serialization: [req-serialization-value-formats](https://mcpdesc.org/docs/specification/0.9.0/serialization#req-serialization-value-formats)




## Examples

### Valid example

Source: [expected-valid/protocol-independent-info-metadata.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/fixtures/expected-valid/protocol-independent-info-metadata.json) · Selected: `/info`

```json
{
  "name": "chess-coach",
  "title": "Chess Coach Cloud",
  "version": "2.1.0",
  "description": "Cloud-hosted chess analysis, ratings, and game history service",
  "icons": [
    {
      "src": "https://chess-coach.example.com/icon.png",
      "mimeType": "image/png",
      "sizes": [
        "48x48"
      ]
    }
  ],
  "websiteUrl": "https://chess-coach.example.com"
}
```

### Invalid example

Source: [expected-invalid/malformed-info-transport-tag-resource.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/fixtures/expected-invalid/malformed-info-transport-tag-resource.json) · Selected: `/info/owner`

```json
"Example Team"
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/validation/rules/document.yaml) at immutable tag [`v0.9.0`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0).
