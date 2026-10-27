---
title: "Security requirements name declared schemes, list scopes only for OAuth 2.0 and OpenID Connect schemes, do not repeat scopes, and use catalogued scopes when the scheme declares a static catalogue."
description: "Security requirements name declared schemes, list scopes only for OAuth 2.0 and OpenID Connect schemes, do not repeat scopes, and use catalogued scopes when the scheme declares a s"
slug: docs/rules/0.9.0-draft.1/mcpdesc/security-requirements
---

**Rule ID:** `mcpdesc.security.requirements`<br>
**Owner:** mcpdesc<br>
**Surface:** Security Requirement<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `unknown-security-scheme` | **error** |
| `non-oauth-scope-misuse` | **error** |
| `duplicate-security-scope` | **error** |
| `schema-validation` | **error** |
| `uncatalogued-oauth-scope` | **warning** |

## Required by

- **MCP Description 0.9.0, Sections 7.1 to 7.3**
  - [/docs/specification/0.9.0-draft.1/security#req-security-scheme-references](/docs/specification/0.9.0-draft.1/security#req-security-scheme-references)
  - [/docs/specification/0.9.0-draft.1/security#req-security-scopes-unique](/docs/specification/0.9.0-draft.1/security#req-security-scopes-unique)
  - [/docs/specification/0.9.0-draft.1/security#req-security-scopes-oauth-only](/docs/specification/0.9.0-draft.1/security#req-security-scopes-oauth-only)
  - [/docs/specification/0.9.0-draft.1/security#req-security-uncatalogued-scope](/docs/specification/0.9.0-draft.1/security#req-security-uncatalogued-scope)



## Notes

The document schema rejects duplicate scopes first (schema-validation); duplicate-security-scope applies to callers of the semantic validator alone.


## Examples

### Invalid example

Source: [expected-invalid/unknown-security-reference.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/unknown-security-reference.json) · Selected: `/security/0`

```json
{
  "missing": []
}
```

### Invalid example

Source: [expected-invalid/non-oauth-scopes.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/non-oauth-scopes.json) · Selected: `/security/0`

```json
{
  "bearer": [
    "admin"
  ]
}
```

### Invalid example

Source: [expected-invalid/duplicate-security-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/duplicate-security-scope.json) · Selected: `/security/0`

```json
{
  "oauth": [
    "records:read",
    "records:read"
  ]
}
```

### Accepted with a warning

Source: [expected-warning/uncatalogued-oauth-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/uncatalogued-oauth-scope.json) · Selected: `/tools/0/security/0/oauth`

```json
[
  "issues:admin"
]
```

### Accepted with a warning

Source: [expected-warning/uncatalogued-openid-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/uncatalogued-openid-scope.json) · Selected: `/security/0/oidc`

```json
[
  "profile:read"
]
```

## Source record

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
