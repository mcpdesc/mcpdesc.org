---
title: "Express resource sizes as integers"
description: "Resource declarations and resource-link content express raw size as an integer, following MCP's numeric schema convention. Replace a fractional value with the intended integer; the"
slug: docs/rules/0.9.0-draft.3/mcp/resource-size
sidebar:
  label: "mcp.resource.size"
---

Resource declarations and resource-link content express raw size as an integer, following MCP's numeric schema convention. Replace a fractional value with the intended integer; the validator must not round it. No minimum is added beyond MCP's definition.


## Requirement

Resource size, in a declaration and in resource link content, is an integer when present.

## Details

**Rule ID:** `mcp.resource.size`<br>
**Owner:** mcp<br>
**Surface:** Resource · **Path:** `size`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** arbitrated · **Enforcement:** internal


## Diagnostics

| Code | Severity |
| --- | --- |
| `schema-validation` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 3.6 and 10.1.1**
  - [/docs/specification/0.9.0-draft.3/resources#req-resource-size-integer](/docs/specification/0.9.0-draft.3/resources#req-resource-size-integer)
  - [/docs/specification/0.9.0-draft.3/document-structure#req-mcp-integer-numbers](/docs/specification/0.9.0-draft.3/document-structure#req-mcp-integer-numbers)
- **Proposal 0029, Integer MCP Numbers**
  - [proposal-snapshots/0029-integer-mcp-numbers.md](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/proposal-snapshots/0029-integer-mcp-numbers.md)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface Resource, size (unannotated number); ResourceLink extends Resource from 2025-06-18
  - [validation/mcp-schemas/2024-11-05/schema.ts#L449](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L449)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L482](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L482)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L556](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L556)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L832](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L832)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1471](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1471)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1719-L1721](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1719-L1721)
- **Tier 3 — Generated MCP schema.json:** MCP generated schema.json, Resource and ResourceLink size typed integer
  - [validation/mcp-schemas/2024-11-05/schema.json#L1508-L1511](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.json#L1508-L1511)
  - [validation/mcp-schemas/2026-07-28/schema.json#L2760-L2763](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.json#L2760-L2763)
  - [validation/mcp-schemas/2026-07-28/schema.json#L2830-L2833](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.json#L2830-L2833)
- **Tier 3 — Generated MCP schema.json:** MCP scripts/generate-schemas.ts: typescript-json-schema --defaultNumberType integer
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/scripts/generate-schemas.ts#L95](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/scripts/generate-schemas.ts#L95)

## Gaps and arbitrations

:::note[Arbitration: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`]
**Conflict:** schema.ts declares size as number, which TypeScript cannot restrict to integers; the generated schema.json types it as integer.

**Authority:** MCP's schema generation configuration (--defaultNumberType integer), under which an unannotated number denotes an integer and fields that accept fractions carry @TJS-type number, such as Annotations.priority.

**Behavior:** Reject a non-integer size with schema-validation. No minimum is applied, as MCP defines none.

**Rationale:** The integer output is MCP's deliberate convention, not a generator defect. Following it keeps native projection valid against the generated schema and matches what MCP tooling validates.

**Review trigger:** MCP changes its generator configuration or annotates size with @TJS-type number..
:::



## Examples

### Valid example

Source: [expected-valid/named-resource-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/named-resource-examples.json) · Selected: `/resources/0`

```json
{
  "protocolVersions": [
    "2025-11-25"
  ],
  "uri": "file:///project/src/",
  "name": "source_directory",
  "mimeType": "inode/directory",
  "examples": {
    "two-files": {
      "result": {
        "contents": [
          {
            "uri": "file:///project/src/",
            "mimeType": "inode/directory",
            "text": "main.rs\nlib.rs\n"
          },
          {
            "uri": "file:///project/src/main.rs",
            "mimeType": "text/x-rust",
            "text": "fn main() {}\n",
            "_meta": {
              "captured": true
            }
          },
          {
            "uri": "file:///project/src/lib.rs",
            "mimeType": "text/x-rust",
            "text": "pub fn answer() -> u8 { 42 }\n"
          }
        ],
        "_meta": {
          "snapshot": "example"
        }
      }
    }
  }
}
```

### Invalid example

Source: [expected-invalid/fractional-resource-size.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/fractional-resource-size.json) · Selected: `/resources/0/size`

```json
1048576.5
```

### Invalid example

Source: [expected-invalid/fractional-resource-link-size.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/fractional-resource-link-size.json) · Selected: `/tools/0/examples/listing/result/content/0/size`

```json
2048.5
```

## Rule Source Code

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
