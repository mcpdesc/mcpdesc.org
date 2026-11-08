---
title: "Reference security schemes and scopes correctly"
description: "Security requirements refer to named schemes, and scopes have meaning only for OAuth 2.0 or OpenID Connect schemes. Correct missing references or repeated scopes. An uncatalogued s"
slug: docs/rules/0.9.0-rc.3/mcpdesc/security-requirements
sidebar:
  label: "mcpdesc.security.requirements"
---

Security requirements refer to named schemes, and scopes have meaning only for OAuth 2.0 or OpenID Connect schemes. Correct missing references or repeated scopes. An uncatalogued scope can produce a warning where the scheme declares a static scope catalogue.


## Requirement

Security requirements name declared schemes, list scopes only for OAuth 2.0 and OpenID Connect schemes, do not repeat scopes, and use catalogued scopes when the scheme declares a static catalogue.

## Details

**Rule ID:** `mcpdesc.security.requirements`<br>
**Owner:** mcpdesc<br>
**Surface:** Security Requirement<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/securityRequirementArray`, `#/$defs/securityRequirement`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 7.1 to 7.3**
  - 7. Security: [req-security-scheme-references](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#req-security-scheme-references)
  - 7. Security: [req-security-scopes-unique](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#req-security-scopes-unique)
  - 7. Security: [req-security-scopes-oauth-only](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#req-security-scopes-oauth-only)
  - 7. Security: [req-security-uncatalogued-scope](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#req-security-uncatalogued-scope)
  - 6. Transports: [req-transport-security-example](https://mcpdesc.org/docs/specification/0.9.0-rc.3/transports#req-transport-security-example)
  - 14. Specification Extensions: [req-extension-ineligible-locations](https://mcpdesc.org/docs/specification/0.9.0-rc.3/specification-extensions#req-extension-ineligible-locations)



## Notes

The document schema rejects duplicate scopes first; the semantic duplicate-scope check applies only to direct callers of the semantic validator.


## Examples

### Accepted with a warning

Source: [expected-warning/uncatalogued-oauth-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-warning/uncatalogued-oauth-scope.json) · Selected: `/tools/0/security/0/oauth`

```json
[
  "issues:admin"
]
```

### Accepted with a warning

Source: [expected-warning/uncatalogued-openid-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-warning/uncatalogued-openid-scope.json) · Selected: `/security/0/oidc`

```json
[
  "profile:read"
]
```

### Invalid example

Source: [expected-invalid/unknown-security-reference.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/unknown-security-reference.json) · Selected: `/security/0`

```json
{
  "missing": []
}
```

### Invalid example

Source: [expected-invalid/non-oauth-scopes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/non-oauth-scopes.json) · Selected: `/security/0`

```json
{
  "bearer": [
    "admin"
  ]
}
```

### Invalid example

Source: [expected-invalid/duplicate-security-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/duplicate-security-scope.json) · Selected: `/security/0`

```json
{
  "oauth": [
    "records:read",
    "records:read"
  ]
}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft).
