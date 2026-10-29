---
title: "mcp.declaration.field.revision-availability"
description: "A declaration field is used only in revisions whose MCP type defines it: title and _meta from 2025-06-18, Tool annotations from 2025-03-26, icons and Tool schema $schema from 2025-"
slug: docs/rules/0.9.0-draft.2/mcp/declaration-field-revision-availability
ruleSurface: "Tool, Resource, ResourceTemplate, Prompt, PromptArgument, ServerCapabilities"
sidebar:
  label: "mcp.declaration.field.revision-availability"
---

A declaration field is used only in revisions whose MCP type defines it: title and _meta from 2025-06-18, Tool annotations from 2025-03-26, icons and Tool schema $schema from 2025-11-25, Tool execution only in 2025-11-25, and the completions capability from 2025-03-26.

**Rule ID:** `mcp.declaration.field.revision-availability`<br>
**Owner:** mcp<br>
**Surface:** Tool, Resource, ResourceTemplate, Prompt, PromptArgument, ServerCapabilities<br>
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
| `field-not-supported-by-version` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 8.2, 9.1, 9.2, 10.1, 10.2, and 11.1**
  - [/docs/specification/0.9.0-draft.2/versioning#req-field-revision-availability](/docs/specification/0.9.0-draft.2/versioning#req-field-revision-availability)
  - [/docs/specification/0.9.0-draft.2/tools#req-tool-schema-dialect-keyword](/docs/specification/0.9.0-draft.2/tools#req-tool-schema-dialect-keyword)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interfaces BaseMetadata, Icons, Tool, Resource, ResourceTemplate, Prompt, PromptArgument, and ServerCapabilities
  - [validation/mcp-schemas/2024-11-05/schema.ts#L684-L704](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L684-L704)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L781-L810](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L781-L810)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L925-L968](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L925-L968)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1244-L1297](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1244-L1297)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1956-L2015](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1956-L2015)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L304-L324](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L304-L324)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L523-L543](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L523-L543)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L949-L969](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L949-L969)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L503-L521](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L503-L521)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L929-L947](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L929-L947)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L414-L450](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L414-L450)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L442-L483](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L442-L483)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L521-L562](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L521-L562)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L797-L838](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L797-L838)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1433-L1474](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1433-L1474)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L452-L481](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L452-L481)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L485-L519](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L485-L519)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L564-L598](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L564-L598)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L840-L874](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L840-L874)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1476-L1507](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1476-L1507)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L558-L574](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L558-L574)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L596-L612](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L596-L612)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L696-L715](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L696-L715)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L979-L999](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L979-L999)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1654-L1671](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1654-L1671)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L576-L592](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L576-L592)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L614-L630](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L614-L630)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L717-L731](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L717-L731)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1001-L1015](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1001-L1015)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1673-L1687](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1673-L1687)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L205-L248](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L205-L248)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L225-L272](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L225-L272)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L253-L302](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L253-L302)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L381-L457](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L381-L457)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L788-L883](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L788-L883)


## Notes

outputSchema, the outputSchema root, and the tasks capability have their own rules; the rule property identifies which applies.


## Examples

### Invalid example

Source: [expected-invalid/revision-inapplicable-execution.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/revision-inapplicable-execution.json) · Selected: `/tools/0`

```json
{
  "name": "run_job",
  "inputSchema": {
    "type": "object",
    "additionalProperties": false
  },
  "execution": {
    "taskSupport": "optional"
  }
}
```

### Invalid example

Source: [expected-invalid/revision-inapplicable-tool-schema-dialect.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/revision-inapplicable-tool-schema-dialect.json) · Selected: `/tools/0/inputSchema`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "additionalProperties": false
}
```

## Source record

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
