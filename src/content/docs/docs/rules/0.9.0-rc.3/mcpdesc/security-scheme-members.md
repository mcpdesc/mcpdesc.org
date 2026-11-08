---
title: "Define security schemes with their required fields"
description: "Named security schemes are non-empty and each scheme has a type and the fields that type requires, such as OAuth flows with their URLs and scopes. Unknown properties are rejected."
slug: docs/rules/0.9.0-rc.3/mcpdesc/security-scheme-members
sidebar:
  label: "mcpdesc.security-scheme.members"
---

Named security schemes are non-empty and each scheme has a type and the fields that type requires, such as OAuth flows with their URLs and scopes. Unknown properties are rejected.


## Requirement

securitySchemes is a non-empty map of Security Scheme Objects that contain their type-specific required fields and only defined properties.

## Details

**Rule ID:** `mcpdesc.security-scheme.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Security Scheme<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/securitySchemeMap`, `#/$defs/securityScheme`, `#/$defs/oauthFlows`, `#/$defs/oauthFlow`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 7.1 and 7.2**
  - 7. Security: [req-security-scheme-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#req-security-scheme-fields)
  - 7. Security: [req-security-schemes-map](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#req-security-schemes-map)
  - 7. Security: [req-oauth-flows-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#req-oauth-flows-fields)
  - 15. Serialization: [req-serialization-value-formats](https://mcpdesc.org/docs/specification/0.9.0-rc.3/serialization#req-serialization-value-formats)




## Examples

### Invalid example

Source: [expected-invalid/empty-ordinary-root-collections.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/empty-ordinary-root-collections.json) · Selected: `/securitySchemes`

```json
{}
```

### Invalid example

Source: [expected-invalid/invalid-security-scheme-name.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/invalid-security-scheme-name.json) · Selected: `/securitySchemes`

```json
{
  "invalid name": {
    "type": "http",
    "scheme": "bearer"
  }
}
```

### Invalid example

Source: [expected-invalid/discriminated-union-members.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/discriminated-union-members.json) · Selected: `/securitySchemes/token`

```json
{
  "type": "http",
  "shceme": "bearer"
}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft).
