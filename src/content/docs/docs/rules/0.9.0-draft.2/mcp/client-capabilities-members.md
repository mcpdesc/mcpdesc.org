---
title: "mcp.client-capabilities.members"
description: "A Client Capability Requirements Object names only client capabilities the applicable MCP revision defines; custom requirements go in experimental and, from MCP 2026-07-28, in exte"
slug: docs/rules/0.9.0-draft.2/mcp/client-capabilities-members
ruleSurface: "ClientCapabilities"
sidebar:
  label: "mcp.client-capabilities.members"
---

A Client Capability Requirements Object names only client capabilities the applicable MCP revision defines; custom requirements go in experimental and, from MCP 2026-07-28, in extensions.

**Rule ID:** `mcp.client-capabilities.members`<br>
**Owner:** mcp<br>
**Surface:** ClientCapabilities · **Path:** `clientRequirements`<br>
**Kind:** structural<br>
**Requirement:** must<br>
**Status:** arbitrated · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `schema-validation` | **error** |

## Required by

- **MCP Description 0.9.0, Section 8.5**
  - [/docs/specification/0.9.0-draft.2/capabilities#req-client-requirements-closed](/docs/specification/0.9.0-draft.2/capabilities#req-client-requirements-closed)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface ClientCapabilities (no index signature)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L182-L203](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L182-L203)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L202-L223](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L202-L223)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L224-L251](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L224-L251)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L305-L379](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L305-L379)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L711-L786](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L711-L786)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, ClientCapabilities doc comment ("this is not a closed set: any client can define its own, additional capabilities")
  - [validation/mcp-schemas/2024-11-05/schema.ts#L182-L184](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L182-L184)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L202-L204](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L202-L204)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L224-L228](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L224-L228)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L305-L309](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L305-L309)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L711-L715](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L711-L715)

## Gaps and arbitrations

:::note[Arbitration: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`]
**Conflict:** The TypeScript type declares a fixed set of members and no index signature, while its doc comment says the set is not closed and any client can define additional capabilities.

**Authority:** MCP schema.ts type, the source of truth for message structures

**Behavior:** Reject unknown top-level requirements, as for server capabilities. Custom requirements belong in experimental and, from MCP 2026-07-28, in extensions.

**Rationale:** Same reading as mcp.server-capabilities.members, so one document does not treat the two capability types differently. Closing is the reversible choice.

**Review trigger:** Resolution of MCP issue 1898, an upstream clarification of the doc comment, or a later MCP revision adding an index signature..

Upstream: [https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1898](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1898).
:::



## Examples

### Invalid example

Source: [expected-invalid/unknown-client-capability-requirement.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/unknown-client-capability-requirement.json) · Selected: `/tools/0/clientRequirements`

```json
{
  "acmeReplay": {}
}
```

### Valid example

Source: [expected-valid/client-capability-requirements.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-valid/client-capability-requirements.json) · Selected: `/prompts/0/clientRequirements`

```json
{
  "sampling": {
    "tools": {}
  },
  "experimental": {
    "com.example/review": {}
  }
}
```

## Source record

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
