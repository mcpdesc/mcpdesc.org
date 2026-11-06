---
title: "Use MCP Icon objects for icons"
description: "An icons array is non-empty, and each Icon has a src and only the MCP Icon properties mimeType, sizes, and theme, with theme light or dark."
slug: docs/rules/0.9.0-rc.2/mcp/icon-members
sidebar:
  label: "mcp.icon.members"
---

An icons array is non-empty, and each Icon has a src and only the MCP Icon properties mimeType, sizes, and theme, with theme light or dark.


## Requirement

icons is a non-empty array of MCP Icon objects with a src and only the properties MCP defines.

## Details

**Rule ID:** `mcp.icon.members`<br>
**Owner:** mcp<br>
**Surface:** Icon<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/icons`, `#/$defs/icon`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Appendix A**
  - Appendix A: Icon Object: [req-icon-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.2/appendices#req-icon-fields)
  - 15. Serialization: [req-serialization-value-formats](https://mcpdesc.org/docs/specification/0.9.0-rc.2/serialization#req-serialization-value-formats)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 schema.ts, interface Icon
  - [validation/mcp-schemas/2025-11-25/schema.ts#L464-L501](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L464-L501)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L890-L927](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L890-L927)



## Examples

### Invalid example

Source: [expected-invalid/empty-ordinary-nested-collections.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/fixtures/expected-invalid/empty-ordinary-nested-collections.json) · Selected: `/info/icons`

```json
[]
```

## Rule Source Code

[annotations.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/rules/annotations.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
