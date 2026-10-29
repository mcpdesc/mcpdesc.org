---
title: "mcp.server-capabilities.members"
description: "A server Capabilities Object contains only the capabilities the applicable MCP revision defines; custom capabilities go in experimental and, from MCP 2026-07-28, in extensions."
slug: docs/rules/0.9.0-draft.2/mcp/server-capabilities-members
ruleSurface: "ServerCapabilities"
sidebar:
  label: "mcp.server-capabilities.members"
---

A server Capabilities Object contains only the capabilities the applicable MCP revision defines; custom capabilities go in experimental and, from MCP 2026-07-28, in extensions.

**Rule ID:** `mcp.server-capabilities.members`<br>
**Owner:** mcp<br>
**Surface:** ServerCapabilities<br>
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

- **MCP Description 0.9.0, Sections 8.2 and 8.4**
  - [/docs/specification/0.9.0-draft.2/capabilities#req-capabilities-closed](/docs/specification/0.9.0-draft.2/capabilities#req-capabilities-closed)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface ServerCapabilities (no index signature)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L205-L248](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L205-L248)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L225-L272](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L225-L272)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L253-L302](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L253-L302)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L381-L457](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L381-L457)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L788-L883](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L788-L883)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, ServerCapabilities doc comment ("this is not a closed set: any server can define its own, additional capabilities")
  - [validation/mcp-schemas/2024-11-05/schema.ts#L205-L207](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L205-L207)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L225-L227](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L225-L227)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L253-L257](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L253-L257)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L381-L385](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L381-L385)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L788-L792](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L788-L792)

## Gaps and arbitrations

:::note[Arbitration: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`]
**Conflict:** The TypeScript type declares a fixed set of members and no index signature, while its doc comment says the set is not closed and any server can define additional capabilities. The comment does not say where such capabilities go; experimental is the defined container.

**Authority:** MCP schema.ts type, the source of truth for message structures

**Behavior:** Reject unknown top-level members. Custom capabilities belong in experimental and, from MCP 2026-07-28, in extensions.

**Rationale:** Capabilities are sent on the wire during initialization, so the structural source of truth governs. Closing is also the reversible choice: opening the object later invalidates no document, while closing it later would.

**Review trigger:** Resolution of MCP issue 1898, an upstream clarification of the doc comment, or a later MCP revision adding an index signature..

Upstream: [https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1898](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1898).
:::


## Notes

x-* properties are MCP Description specification extensions, not capabilities; native projection removes them.


## Examples

### Invalid example

Source: [expected-invalid/unknown-server-capability.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/unknown-server-capability.json) · Selected: `/capabilities/0`

```json
{
  "tools": {},
  "acmeReplay": {}
}
```

### Valid example

Source: [expected-valid/client-capability-requirements.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-valid/client-capability-requirements.json) · Selected: `/capabilities/0`

```json
{
  "protocolVersions": [
    "2026-07-28"
  ],
  "extensions": {
    "io.modelcontextprotocol/ui": {}
  }
}
```

## Source record

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
