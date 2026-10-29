---
title: "Resource annotations contain only MCP hints"
description: "Resource annotations describe audience, priority, and modification time, not Tool behavior. Unknown properties are invalid even when their names start with x-. Remove those propert"
slug: docs/rules/0.9.0-draft.3/mcp/annotations-members
sidebar:
  label: "mcp.annotations.members"
---

Resource annotations describe audience, priority, and modification time, not Tool behavior. Unknown properties are invalid even when their names start with x-. Remove those properties and keep Tool-specific hints on Tool annotations instead.


## Requirement

Resource Annotations on resources, resource templates, and content blocks contain only audience, priority, and lastModified.

## Details

**Rule ID:** `mcp.annotations.members`<br>
**Owner:** mcp<br>
**Surface:** Annotations<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 10.3**
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-annotations-closed](/docs/specification/0.9.0-draft.3/resources#req-resource-annotations-closed)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 schema.ts, inline annotations on Resource, ResourceTemplate, and content types; MCP 2025-03-26 to 2026-07-28 schema.ts, interface Annotations (no index signature)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L815-L840](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L815-L840)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L921-L944](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L921-L944)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L1093-L1128](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L1093-L1128)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1700-L1735](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1700-L1735)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2265-L2300](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2265-L2300)


## Notes

lastModified is defined from MCP 2025-06-18; that boundary is checked separately.


## Examples

### Valid example

Source: [expected-valid/distinct-tool-and-resource-annotations.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/distinct-tool-and-resource-annotations.json) · Selected: `/resources/0/annotations`

```json
{
  "audience": [
    "user",
    "assistant"
  ],
  "priority": 0.8,
  "lastModified": "2026-08-24T10:00:00Z"
}
```

### Invalid example

Source: [expected-invalid/resource-annotations-unknown-property.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/resource-annotations-unknown-property.json) · Selected: `/resources/0/annotations`

```json
{
  "priority": 0.5,
  "x-acme-tier": "gold"
}
```

### Invalid example

Source: [expected-invalid/content-annotations-unknown-property.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/content-annotations-unknown-property.json) · Selected: `/tools/0/examples/basic/result/content/0/annotations`

```json
{
  "audience": [
    "user"
  ],
  "readOnlyHint": true
}
```

## Rule Source Code

[annotations.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/annotations.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
