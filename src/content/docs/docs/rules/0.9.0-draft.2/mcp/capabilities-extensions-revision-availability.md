---
title: "mcp.capabilities.extensions.revision-availability"
description: "Server capabilities.extensions is defined from MCP 2026-07-28; for earlier revisions a pre-standard extensions map is preserved with a warning."
slug: docs/rules/0.9.0-draft.2/mcp/capabilities-extensions-revision-availability
ruleSurface: "ServerCapabilities"
sidebar:
  label: "mcp.capabilities.extensions.revision-availability"
---

Server capabilities.extensions is defined from MCP 2026-07-28; for earlier revisions a pre-standard extensions map is preserved with a warning.

**Rule ID:** `mcp.capabilities.extensions.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** ServerCapabilities · **Path:** `extensions`<br>
**Kind:** structural<br>
**Requirement:** Not specified in the rule record<br>
**Status:** arbitrated · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `extensions-not-supported-by-version` | **warning** |

## Required by

- **MCP Description 0.9.0, Section 8.4; Proposal 0021 (pre-standard extension capabilities)**
  - [/docs/specification/0.9.0-draft.2/capabilities#req-capabilities-extensions-pre-standard](/docs/specification/0.9.0-draft.2/capabilities#req-capabilities-extensions-pre-standard)
  - [../../proposals/0021-pre-standard-extension-capabilities.md](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/proposals/0021-pre-standard-extension-capabilities.md)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2025-11-25 schema.ts, interface ServerCapabilities (no extensions); MCP 2026-07-28 schema.ts, ServerCapabilities extensions
  - [validation/mcp-schemas/2024-11-05/schema.ts#L205-L248](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L205-L248)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L225-L272](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L225-L272)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L253-L302](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L253-L302)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L381-L457](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L381-L457)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L871-L882](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L871-L882)

## Gaps and arbitrations

:::note[Arbitration: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`]
**Conflict:** ServerCapabilities is closed and has no extensions member before MCP 2026-07-28, so mcp.server-capabilities.members would reject it, but deployed servers advertise extensions with a pre-standard convention.

**Authority:** MCP Description decision (Proposal 0021)

**Behavior:** Accept and preserve a server extensions map for earlier revisions with a warning; client requirements stay revision-strict.

**Rationale:** Rejecting it would make descriptions of deployed servers inaccurate. The warning keeps the departure from the type visible.

**Review trigger:** Retirement of the pre-standard convention, or a decision to drop support for it..
:::



## Examples

### Accepted with a warning

Source: [expected-warning/pre-standard-extension-capabilities.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-warning/pre-standard-extension-capabilities.json) · Selected: `/capabilities/0`

```json
{
  "extensions": {
    "io.modelcontextprotocol/ui": {}
  }
}
```

## Source record

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
