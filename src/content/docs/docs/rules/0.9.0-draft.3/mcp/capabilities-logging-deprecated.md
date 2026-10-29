---
title: "Review the deprecated logging capability"
description: "MCP 2026-07-28 uses per-request log-level selection rather than logging/setLevel. MCP Description warns about the logging server capability for that version. Review the advertiseme"
slug: docs/rules/0.9.0-draft.3/mcp/capabilities-logging-deprecated
sidebar:
  label: "mcp.capabilities.logging.deprecated"
---

MCP 2026-07-28 uses per-request log-level selection rather than logging/setLevel. MCP Description warns about the logging server capability for that version. Review the advertisement; the warning alone does not make the description invalid.


## Requirement

The logging server capability is reported as deprecated in MCP 2026-07-28.

## Details

**Rule ID:** `mcp.capabilities.logging.deprecated`<br>
**Owner:** mcp<br>
**Surface:** ServerCapabilities · **Path:** `logging`<br>
**Kind:** semantic<br>
**Requirement level:** should<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | not-applicable | not-applicable | applies |
## Required by

- **MCP Description 0.9.0, Section 8.2**
  - [/docs/specification/0.9.0-draft.3/capabilities#req-capabilities-logging-deprecated](/docs/specification/0.9.0-draft.3/capabilities#req-capabilities-logging-deprecated)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, ServerCapabilities logging (@deprecated, SEP-2577); specification, Server Features, Utilities, Logging (deprecated)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L798-L808](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L798-L808)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/utilities/logging.mdx#L8-L18](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/server/utilities/logging.mdx#L8-L18)



## Examples

### Accepted with a warning

Source: [expected-warning/logging-deprecated-2026.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/logging-deprecated-2026.json) · Selected: `/capabilities/0`

```json
{
  "logging": {}
}
```

## Rule Source Code

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
