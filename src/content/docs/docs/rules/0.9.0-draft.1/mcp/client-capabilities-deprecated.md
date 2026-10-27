---
title: "A client capability requirement that the applicable revision deprecates is reported."
description: "A client capability requirement that the applicable revision deprecates is reported."
slug: docs/rules/0.9.0-draft.1/mcp/client-capabilities-deprecated
---

**Rule ID:** `mcp.client-capabilities.deprecated`<br>
**Owner:** mcp<br>
**Surface:** ClientCapabilities · **Path:** `clientRequirements`<br>
**Kind:** semantic<br>
**Requirement:** should<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | not-applicable | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `deprecated-client-requirement` | **warning** |

## Required by

- **MCP Description 0.9.0, Section 8.5**
  - [/docs/specification/0.9.0-draft.1/capabilities#req-client-requirements-deprecated](/docs/specification/0.9.0-draft.1/capabilities#req-client-requirements-deprecated)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 schema.ts, CreateMessageRequest includeContext ("thisServer" and "allServers" are soft-deprecated; tied to ClientCapabilities.sampling.context)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1588-L1595](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1588-L1595)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, ClientCapabilities roots and sampling (@deprecated, SEP-2577)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L732-L732](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L732-L732)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L733-L759](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L733-L759)



## Examples

### Accepted with a warning

Source: [expected-warning/deprecated-client-capability-requirements.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/deprecated-client-capability-requirements.json) · Selected: `/prompts/0/clientRequirements`

```json
{
  "sampling": {
    "context": {}
  },
  "extensions": {
    "io.modelcontextprotocol/future-capability": {}
  }
}
```

## Source record

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
