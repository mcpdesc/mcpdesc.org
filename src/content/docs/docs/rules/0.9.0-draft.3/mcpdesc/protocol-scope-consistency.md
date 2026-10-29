---
title: "Keep protocol scopes consistent and disjoint"
description: "An omitted scope inherits its parent's full scope; an explicit child scope must stay within it. Declarations with the same identity cannot overlap where the specification requires "
slug: docs/rules/0.9.0-draft.3/mcpdesc/protocol-scope-consistency
sidebar:
  label: "mcpdesc.protocol-scope.consistency"
---

An omitted scope inherits its parent's full scope; an explicit child scope must stay within it. Declarations with the same identity cannot overlap where the specification requires uniqueness. Narrow the scopes rather than expecting the validator to choose one variant.


## Requirement

Nested protocol scopes stay within their parent scope, and same-named primitives and capability objects do not overlap in protocol scope.

## Details

**Rule ID:** `mcpdesc.protocol-scope.consistency`<br>
**Owner:** mcpdesc<br>
**Surface:** Document · **Path:** `protocolVersions`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Diagnostics

| Code | Severity |
| --- | --- |
| `protocol-scope-outside-parent` | **error** |
| `primitive-scope-overlap` | **error** |
| `capability-scope-overlap` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 4.10 and 8.6**
  - [/docs/specification/0.9.0-draft.3/versioning#req-scope-subset](/docs/specification/0.9.0-draft.3/versioning#req-scope-subset)
  - [/docs/specification/0.9.0-draft.3/capabilities#req-capability-scopes-disjoint](/docs/specification/0.9.0-draft.3/capabilities#req-capability-scopes-disjoint)
  - [/docs/specification/0.9.0-draft.3/tools#req-tool-names-disjoint](/docs/specification/0.9.0-draft.3/tools#req-tool-names-disjoint)
  - [/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-scope](/docs/specification/0.9.0-draft.3/elicitation#req-elicitation-scope)




## Examples

### Invalid example

Source: [expected-invalid/elicitation-scope-outside-parent.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/elicitation-scope-outside-parent.json) · Selected: `/resourceTemplates/0/elicitations/0`

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

Source: [expected-invalid/scoped-version-not-in-root.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/scoped-version-not-in-root.json) · Selected: `/transports/0`

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

Source: [expected-invalid/overlapping-tool-scope.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/overlapping-tool-scope.json) · Selected: `/tools/1`

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

Source: [expected-invalid/overlapping-capabilities.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/overlapping-capabilities.json) · Selected: `/capabilities/0`

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

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
