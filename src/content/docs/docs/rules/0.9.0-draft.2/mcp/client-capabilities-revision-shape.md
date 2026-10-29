---
title: "mcp.client-capabilities.revision-shape"
description: "Each client capability requirement and nested member exists in every applicable revision's ClientCapabilities type, with object values and a boolean listChanged."
slug: docs/rules/0.9.0-draft.2/mcp/client-capabilities-revision-shape
ruleSurface: "ClientCapabilities"
sidebar:
  label: "mcp.client-capabilities.revision-shape"
---

Each client capability requirement and nested member exists in every applicable revision's ClientCapabilities type, with object values and a boolean listChanged.

**Rule ID:** `mcp.client-capabilities.revision-shape`<br>
**Owner:** mcp<br>
**Surface:** ClientCapabilities · **Path:** `clientRequirements`<br>
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
| `client-requirement-version-mismatch` | **error** |
| `invalid-client-requirement-value` | **error** |

## Required by

- **MCP Description 0.9.0, Section 8.5**
  - [/docs/specification/0.9.0-draft.2/capabilities#req-client-requirements-revision-valid](/docs/specification/0.9.0-draft.2/capabilities#req-client-requirements-revision-valid)
  - [/docs/specification/0.9.0-draft.2/capabilities#req-client-requirements-values](/docs/specification/0.9.0-draft.2/capabilities#req-client-requirements-values)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface ClientCapabilities (members and nested members per revision)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L182-L203](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L182-L203)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L202-L223](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L202-L223)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L224-L251](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L224-L251)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L305-L379](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L305-L379)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L711-L786](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L711-L786)



## Examples

### Invalid example

Source: [expected-invalid/revision-incompatible-client-capability-requirements.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/revision-incompatible-client-capability-requirements.json) · Selected: `/tools/0/clientRequirements`

```json
{
  "tasks": {
    "list": {}
  }
}
```

### Invalid example

Source: [expected-invalid/invalid-client-requirement-value.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/invalid-client-requirement-value.json) · Selected: `/tools/0/clientRequirements/roots`

```json
{
  "listChanged": "yes"
}
```

### Valid example

Source: [expected-valid/client-capability-requirements.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-valid/client-capability-requirements.json) · Selected: `/tools/0/clientRequirements`

```json
{
  "tasks": {
    "requests": {
      "sampling": {
        "createMessage": {}
      }
    }
  }
}
```

## Source record

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
