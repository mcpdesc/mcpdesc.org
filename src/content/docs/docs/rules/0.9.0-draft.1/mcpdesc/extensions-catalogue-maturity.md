---
title: "An extension identifier under an MCP-reserved prefix that the pinned extension catalogue lists as experimental, or does not list, is preserved with a warning."
description: "An extension identifier under an MCP-reserved prefix that the pinned extension catalogue lists as experimental, or does not list, is preserved with a warning."
slug: docs/rules/0.9.0-draft.1/mcpdesc/extensions-catalogue-maturity
---

**Rule ID:** `mcpdesc.extensions.catalogue-maturity`<br>
**Owner:** mcpdesc<br>
**Surface:** Extension identifier · **Path:** `capabilities.extensions, clientRequirements.extensions`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** should<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `unknown-reserved-extension-identifier` | **warning** |
| `experimental-reserved-extension-identifier` | **warning** |

## Required by

- **MCP Description 0.9.0, Sections 8.4 and 8.5; validator extension catalogue (effective 2026-09-04)**
  - [/docs/specification/0.9.0-draft.1/capabilities#req-extensions-reserved-identifiers](/docs/specification/0.9.0-draft.1/capabilities#req-extensions-reserved-identifiers)
  - [/docs/specification/0.9.0-draft.1/capabilities#req-extensions-catalogue-maturity](/docs/specification/0.9.0-draft.1/capabilities#req-extensions-catalogue-maturity)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 specification, Basic, General fields, _meta key name format (second label modelcontextprotocol or mcp is reserved)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L337-L339](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L337-L339)


## Notes

The pinned catalogue lists no experimental identifiers, so no document currently produces experimental-reserved-extension-identifier.


## Examples

### Accepted with a warning

Source: [expected-warning/unknown-reserved-extension-identifier.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/unknown-reserved-extension-identifier.json) · Selected: `/capabilities/0/extensions`

```json
{
  "io.modelcontextprotocol/future-capability": {
    "enabled": true
  }
}
```

### Accepted with a warning

Source: [expected-warning/deprecated-client-capability-requirements.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/deprecated-client-capability-requirements.json) · Selected: `/prompts/0/clientRequirements/extensions`

```json
{
  "io.modelcontextprotocol/future-capability": {}
}
```

## Source record

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
