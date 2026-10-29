---
title: "mcp.cacheable-result.ttl-ms"
description: "ttlMs in a Resource example result is a non-negative integer when present."
slug: docs/rules/0.9.0-draft.2/mcp/cacheable-result-ttl-ms
ruleSurface: "CacheableResult"
sidebar:
  label: "mcp.cacheable-result.ttl-ms"
---

ttlMs in a Resource example result is a non-negative integer when present.

**Rule ID:** `mcp.cacheable-result.ttl-ms`<br>
**Owner:** mcp<br>
**Surface:** CacheableResult · **Path:** `ttlMs`<br>
**Kind:** structural<br>
**Requirement:** must<br>
**Status:** arbitrated · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `schema-validation` | **error** |

## Required by

- **MCP Description 0.9.0, Sections 3.6 and 10.4.4**
  - [/docs/specification/0.9.0-draft.2/document-structure#req-mcp-integer-numbers](/docs/specification/0.9.0-draft.2/document-structure#req-mcp-integer-numbers)
  - [/docs/specification/0.9.0-draft.2/resources#req-resource-example-result-shape](/docs/specification/0.9.0-draft.2/resources#req-resource-example-result-shape)
- **Proposal 0029, Integer MCP Numbers**
  - [proposal-snapshots/0029-integer-mcp-numbers.md](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/proposal-snapshots/0029-integer-mcp-numbers.md)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 schema.ts, interface CacheableResult, ttlMs (unannotated number, @minimum 0)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1081-L1094](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1081-L1094)
- **Tier 3 — Generated MCP schema.json:** MCP 2026-07-28 generated schema.json, ReadResourceResult.ttlMs typed integer
  - [validation/mcp-schemas/2026-07-28/schema.json#L2625-L2629](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.json#L2625-L2629)
- **Tier 3 — Generated MCP schema.json:** MCP scripts/generate-schemas.ts: typescript-json-schema --defaultNumberType integer
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/scripts/generate-schemas.ts#L95](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/scripts/generate-schemas.ts#L95)

## Gaps and arbitrations

:::note[Arbitration: `2026-07-28`]
**Conflict:** schema.ts declares ttlMs as number, which TypeScript cannot restrict to integers; the generated schema.json types it as integer.

**Authority:** MCP's schema generation configuration (--defaultNumberType integer), under which an unannotated number denotes an integer.

**Behavior:** Reject a non-integer or negative ttlMs with schema-validation.

**Rationale:** A millisecond duration is an integer in MCP's generated schema; accepting fractions would let examples disagree with MCP's types.

**Review trigger:** MCP changes its generator configuration or annotates ttlMs with @TJS-type number..
:::


## Notes

MCP defines ttlMs from 2026-07-28 only. In earlier revisions it is a field not defined by the revision (mcp.result.additional-properties.preserve), and Section 3.6 keeps the same value constraint so that one example can serve several revisions.


## Examples

### Invalid example

Source: [expected-invalid/fractional-ttl-ms.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/fractional-ttl-ms.json) · Selected: `/resources/0/examples/cached/result/ttlMs`

```json
60000.5
```

### Invalid example

Source: [expected-invalid/resource-example-cache-fields.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/resource-example-cache-fields.json) · Selected: `/resources/1/examples/invalid/result/ttlMs`

```json
-1
```

### Valid example

Source: [expected-valid/named-resource-examples.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-valid/named-resource-examples.json) · Selected: `/resources/0`

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

## Source record

[result.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/result.yaml) at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft).
