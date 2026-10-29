---
title: "Keep task capabilities in their protocol version"
description: "Task capabilities from MCP 2025-11-25 and extension advertisements in MCP 2026-07-28 are not interchangeable fields. Limit each capability declaration to the versions that define i"
slug: docs/rules/0.9.0-draft.3/mcp/capabilities-tasks-revision-availability
sidebar:
  label: "mcp.capabilities.tasks.revision-availability"
---

Task capabilities from MCP 2025-11-25 and extension advertisements in MCP 2026-07-28 are not interchangeable fields. Limit each capability declaration to the versions that define it. The validator does not automatically translate a tasks object into an extension advertisement.


## Requirement

The core tasks server capability exists only in MCP 2025-11-25; MCP 2026-07-28 uses the tasks extension instead.

## Details

**Rule ID:** `mcp.capabilities.tasks.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** ServerCapabilities · **Path:** `tasks`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Diagnostics

| Code | Severity |
| --- | --- |
| `field-not-supported-by-version` | **error** |
| `tasks-core-not-valid-in-2026` | **error** |

## Required by

- **MCP Description 0.9.0, Section 8.3**
  - [/docs/specification/0.9.0-draft.3/capabilities#req-capabilities-tasks-distinct](/docs/specification/0.9.0-draft.3/capabilities#req-capabilities-tasks-distinct)
  - [/docs/specification/0.9.0-draft.3/versioning#req-field-revision-availability](/docs/specification/0.9.0-draft.3/versioning#req-field-revision-availability)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 schema.ts, ServerCapabilities tasks; MCP 2025-06-18 and 2026-07-28 schema.ts, ServerCapabilities (no tasks)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L430-L456](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L430-L456)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L253-L302](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L253-L302)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L788-L883](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L788-L883)



## Examples

### Invalid example

Source: [expected-invalid/tasks-capability-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/tasks-capability-2026.json) · Selected: `/capabilities/0`

```json
{
  "tasks": {
    "list": {}
  }
}
```

## Rule Source Code

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
