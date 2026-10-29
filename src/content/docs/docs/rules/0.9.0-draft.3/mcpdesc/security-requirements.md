---
title: "Reference security schemes and scopes correctly"
description: "Security requirements refer to named schemes, and scopes have meaning only for OAuth 2.0 or OpenID Connect schemes. Correct missing references or repeated scopes. An uncatalogued s"
slug: docs/rules/0.9.0-draft.3/mcpdesc/security-requirements
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
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 7.1 to 7.3**
  - [/docs/specification/0.9.0-draft.3/security#req-security-scheme-references](/docs/specification/0.9.0-draft.3/security#req-security-scheme-references)
  - [/docs/specification/0.9.0-draft.3/security#req-security-scopes-unique](/docs/specification/0.9.0-draft.3/security#req-security-scopes-unique)
  - [/docs/specification/0.9.0-draft.3/security#req-security-scopes-oauth-only](/docs/specification/0.9.0-draft.3/security#req-security-scopes-oauth-only)
  - [/docs/specification/0.9.0-draft.3/security#req-security-uncatalogued-scope](/docs/specification/0.9.0-draft.3/security#req-security-uncatalogued-scope)



## Notes

The document schema rejects duplicate scopes first; the semantic duplicate-scope check applies only to direct callers of the semantic validator.


## Examples

### Accepted with a warning

Source: [expected-warning/uncatalogued-oauth-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/uncatalogued-oauth-scope.json) · Selected: `/tools/0/security/0/oauth`

```json
[
  "issues:admin"
]
```

### Accepted with a warning

Source: [expected-warning/uncatalogued-openid-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/uncatalogued-openid-scope.json) · Selected: `/security/0/oidc`

```json
[
  "profile:read"
]
```

### Invalid example

Source: [expected-invalid/unknown-security-reference.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/unknown-security-reference.json) · Selected: `/security/0`

```json
{
  "missing": []
}
```

### Invalid example

Source: [expected-invalid/non-oauth-scopes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/non-oauth-scopes.json) · Selected: `/security/0`

```json
{
  "bearer": [
    "admin"
  ]
}
```

### Invalid example

Source: [expected-invalid/duplicate-security-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/duplicate-security-scope.json) · Selected: `/security/0`

```json
{
  "oauth": [
    "records:read",
    "records:read"
  ]
}
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
