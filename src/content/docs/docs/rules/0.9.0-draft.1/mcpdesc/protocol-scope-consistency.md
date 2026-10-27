---
title: "Nested protocol scopes stay within their parent scope, and same-named primitives and capability objects do not overlap in protocol scope."
description: "Nested protocol scopes stay within their parent scope, and same-named primitives and capability objects do not overlap in protocol scope."
slug: docs/rules/0.9.0-draft.1/mcpdesc/protocol-scope-consistency
---

**Rule ID:** `mcpdesc.protocol-scope.consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Document · **Path:** `protocolVersions`<br>
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
| `protocol-scope-outside-parent` | **error** |
| `primitive-scope-overlap` | **error** |
| `capability-scope-overlap` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 4.10 and 8.6**
  - [/docs/specification/0.9.0-draft.1/versioning#req-scope-subset](/docs/specification/0.9.0-draft.1/versioning#req-scope-subset)
  - [/docs/specification/0.9.0-draft.1/capabilities#req-capability-scopes-disjoint](/docs/specification/0.9.0-draft.1/capabilities#req-capability-scopes-disjoint)
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-names-disjoint](/docs/specification/0.9.0-draft.1/tools#req-tool-names-disjoint)
  - [/docs/specification/0.9.0-draft.1/elicitation#req-elicitation-scope](/docs/specification/0.9.0-draft.1/elicitation#req-elicitation-scope)




## Examples

### Invalid example

Source: [expected-invalid/elicitation-scope-outside-parent.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/elicitation-scope-outside-parent.json) · Selected: `/resourceTemplates/0/elicitations/0`

```json
{
  "name": "authorize",
  "mode": "url",
  "message": "Authorize item access.",
  "protocolVersions": [
    "2026-07-28"
  ]
}
```

### Invalid example

Source: [expected-invalid/scoped-version-not-in-root.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/scoped-version-not-in-root.json) · Selected: `/transports/0`

```json
{
  "type": "stdio",
  "command": "bad-scope",
  "protocolVersions": [
    "2026-07-28"
  ]
}
```

### Invalid example

Source: [expected-invalid/overlapping-tool-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/overlapping-tool-scope.json) · Selected: `/tools/1`

```json
{
  "name": "run_job",
  "protocolVersions": [
    "2026-07-28"
  ],
  "inputSchema": {
    "type": "object",
    "additionalProperties": false
  }
}
```

### Invalid example

Source: [expected-invalid/overlapping-capabilities.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/overlapping-capabilities.json) · Selected: `/capabilities/0`

```json
{
  "protocolVersions": [
    "2025-11-25"
  ],
  "tools": {
    "listChanged": true
  }
}
```

## Source record

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
