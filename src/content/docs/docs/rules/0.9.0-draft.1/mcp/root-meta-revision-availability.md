---
title: "mcp.root.meta.revision-availability"
description: "A root in a roots response may carry _meta from MCP 2025-06-18."
slug: docs/rules/0.9.0-draft.1/mcp/root-meta-revision-availability
ruleSurface: "Root"
sidebar:
  label: "mcp.root.meta.revision-availability"
---

A root in a roots response may carry _meta from MCP 2025-06-18.

**Rule ID:** `mcp.root.meta.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** Root · **Path:** `_meta`<br>
**Kind:** structural<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `interaction-example-version-mismatch` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 3.5, 3.6, and 9.4**
  - [/docs/specification/0.9.0-draft.1/document-structure#req-meta-revision-availability](/docs/specification/0.9.0-draft.1/document-structure#req-meta-revision-availability)
  - [/docs/specification/0.9.0-draft.1/tools#req-interaction-revision-valid](/docs/specification/0.9.0-draft.1/tools#req-interaction-revision-valid)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 and 2025-03-26 schema.ts, interface Root (uri, name); MCP 2025-06-18 to 2026-07-28 schema.ts, interface Root (adds _meta)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L1041-L1059](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L1041-L1059)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L1182-L1200](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L1182-L1200)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1415-L1440](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1415-L1440)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L2111-L2136](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L2111-L2136)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2746-L2775](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2746-L2775)



## Examples

### Invalid example

Source: [expected-invalid/root-meta-before-2025-06-18.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/root-meta-before-2025-06-18.json) · Selected: `/tools/0/interactionExamples/with-root-meta/steps/0/response/roots/0`

```json
{
  "uri": "file:///workspace/example",
  "_meta": {
    "trace": "root1"
  }
}
```

### Accepted with a warning

Source: [expected-warning/open-step-responses-before-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/open-step-responses-before-2026.json) · Selected: `/tools/0/interactionExamples/approved/steps/0/response/roots/0`

```json
{
  "uri": "file:///workspace/example",
  "_meta": {
    "trace": "root1"
  }
}
```

## Source record

[result.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/result.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
