---
title: "Keep task capabilities in their protocol version"
description: "Task capabilities from MCP 2025-11-25 and extension advertisements in MCP 2026-07-28 are not interchangeable fields. Limit each capability declaration to the versions that define i"
slug: docs/rules/0.9.0-rc.2/mcp/capabilities-tasks-protocol-version
sidebar:
  label: "mcp.capabilities.tasks.protocol-version"
---

Task capabilities from MCP 2025-11-25 and extension advertisements in MCP 2026-07-28 are not interchangeable fields. Limit each capability declaration to the versions that define it. The validator does not automatically translate a tasks object into an extension advertisement.


## Requirement

The core tasks server capability exists only in MCP 2025-11-25; MCP 2026-07-28 uses the tasks extension instead.

## Details

**Rule ID:** `mcp.capabilities.tasks.protocol-version`<br>
**Owner:** mcp<br>
**Surface:** ServerCapabilities · **Path:** `tasks`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 8.3**
  - 8. Capabilities: [req-capabilities-tasks-distinct](https://mcpdesc.org/docs/specification/0.9.0-rc.2/capabilities#req-capabilities-tasks-distinct)
  - 4. Versioning: [req-field-protocol-version-availability](https://mcpdesc.org/docs/specification/0.9.0-rc.2/versioning#req-field-protocol-version-availability)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 schema.ts, ServerCapabilities tasks; MCP 2025-06-18 and 2026-07-28 schema.ts, ServerCapabilities (no tasks)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L430-L456](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L430-L456)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L253-L302](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L253-L302)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L788-L883](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L788-L883)



## Examples

### Invalid example

Source: [expected-invalid/tasks-capability-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/tasks-capability-2026.json) · Selected: `/capabilities/0`

```json
{
  "tasks": {
    "list": {}
  }
}
```

## Rule Source Code

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
