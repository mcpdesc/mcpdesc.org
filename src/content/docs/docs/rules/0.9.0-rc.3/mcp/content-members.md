---
title: "Use MCP content blocks and resource contents"
description: "Content in example results is an MCP content block selected by type: text, image, audio, resource link, or embedded resource. Resource contents have a uri and either text or blob. "
slug: docs/rules/0.9.0-rc.3/mcp/content-members
sidebar:
  label: "mcp.content.members"
---

Content in example results is an MCP content block selected by type: text, image, audio, resource link, or embedded resource. Resource contents have a uri and either text or blob. Each carries only the fields its MCP type defines.


## Requirement

Content blocks and resource contents match exactly one MCP content type, with its required fields and no unknown fields.

## Details

**Rule ID:** `mcp.content.members`<br>
**Owner:** mcp<br>
**Surface:** ContentBlock, ResourceContents<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/toolResultContent`, `#/$defs/resourceContents`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Section 3.6**
  - 3. Document Structure: [req-carried-defined-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#req-carried-defined-fields)
  - 3. Document Structure: [req-carried-closed-reject](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#req-carried-closed-reject)
  - 10. Resources and Resource Templates: [req-resource-annotations-not-in-examples](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-annotations-not-in-examples)
  - 10. Resources and Resource Templates: [req-resource-contents-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-contents-fields)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 schema.ts, ContentBlock and ResourceContents
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1740-L1741](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1740-L1741)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L881-L897](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L881-L897)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L2305-L2306](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L2305-L2306)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1514-L1527](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1514-L1527)



## Examples

### Invalid example

Source: [expected-invalid/discriminated-union-members.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/discriminated-union-members.json) · Selected: `/tools/0/interactionExamples/invalid/result/content/0`

```json
{
  "type": "text",
  "tetx": "Done"
}
```

## Rule Source Code

[content.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/rules/content.yaml) at immutable tag [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft).
