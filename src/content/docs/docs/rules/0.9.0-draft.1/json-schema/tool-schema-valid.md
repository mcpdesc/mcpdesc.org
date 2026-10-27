---
title: "An embedded Tool inputSchema or outputSchema is valid under its declared or default JSON Schema dialect, and a declared dialect is JSON Schema 2020-12 or draft-07."
description: "An embedded Tool inputSchema or outputSchema is valid under its declared or default JSON Schema dialect, and a declared dialect is JSON Schema 2020-12 or draft-07."
slug: docs/rules/0.9.0-draft.1/json-schema/tool-schema-valid
---

**Rule ID:** `json-schema.tool-schema.valid`<br>
**Owner:** json-schema<br>
**Surface:** Tool · **Path:** `inputSchema, outputSchema`<br>
**Kind:** embedded-standard<br>
**Requirement:** must<br>
**Status:** internal · **Enforcement:** internal

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | not-applicable | applies | applies |

## Diagnostics

| Code | Severity |
| --- | --- |
| `invalid-tool-schema` | **error** |
| `unsupported-tool-schema-dialect` | **error** |
| `unresolved-external-tool-schema-reference` | **warning** |

## Required by

- **MCP Description 0.9.0, Section 9.2 (declared dialects limited to 2020-12 and draft-07; never fetch external $ref targets; warn when validation is incomplete)**
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-output-schema-valid](/docs/specification/0.9.0-draft.1/tools#req-tool-output-schema-valid)
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-schema-dialect-valid](/docs/specification/0.9.0-draft.1/tools#req-tool-schema-dialect-valid)
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-schema-dialect-set](/docs/specification/0.9.0-draft.1/tools#req-tool-schema-dialect-set)
  - [/docs/specification/0.9.0-draft.1/tools#req-tool-schema-external-ref](/docs/specification/0.9.0-draft.1/tools#req-tool-schema-external-ref)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 specification, Basic, JSON Schema usage, Schema Dialect (implementations must support 2020-12 and must return an error for unsupported dialects)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L140-L186](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L140-L186)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L251-L297](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L251-L297)
- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-11-25 and 2026-07-28 schema.ts, interface Tool, inputSchema and outputSchema doc comments (default JSON Schema 2020-12 when $schema is absent)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1257-L1265](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1257-L1265)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1981-L1997](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1981-L1997)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L1272-L1284](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L1272-L1284)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1999-L2005](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1999-L2005)
- **Tier 2 — Normative referenced standards:** JSON Schema 2020-12 Core and Validation, and draft-07, for the declared dialect
  - [https://json-schema.org/draft/2020-12/json-schema-core](https://json-schema.org/draft/2020-12/json-schema-core)
  - [https://json-schema.org/draft/2020-12/json-schema-validation](https://json-schema.org/draft/2020-12/json-schema-validation)
  - [https://json-schema.org/draft-07/json-schema-core](https://json-schema.org/draft-07/json-schema-core)
  - [https://json-schema.org/draft-07/json-schema-validation](https://json-schema.org/draft-07/json-schema-validation)


## Notes

The declared dialect set is fixed by the specification, not by the validator: an unsupported dialect is an error, not a warning, because MCP guarantees only 2020-12 support and peers return an error for other dialects, and because Tool examples cannot be checked against a schema in an unknown dialect (maintainer decision on issue #72, 2026-10-26). Unresolved external references differ: offline validation forbids retrieving them, so they only warn. Earlier revisions define no embedded dialect; mcp.tool.schema.legacy-shape applies there instead.


## Examples

### Invalid example

Source: [expected-invalid/malformed-tool-schema.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/malformed-tool-schema.json) · Selected: `/tools/0`

```json
{
  "name": "malformed_schema",
  "inputSchema": {
    "type": "object",
    "required": "query"
  }
}
```

### Invalid example

Source: [expected-invalid/unresolved-local-tool-ref.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/unresolved-local-tool-ref.json) · Selected: `/tools/0`

```json
{
  "name": "missing_local_definition",
  "inputSchema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "identifier": {
        "$ref": "#/$defs/identifier"
      }
    }
  }
}
```

### Invalid example

Source: [expected-invalid/unsupported-tool-schema-dialect.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-invalid/unsupported-tool-schema-dialect.json) · Selected: `/tools/0/inputSchema`

```json
{
  "$schema": "https://example.com/schemas/custom-dialect",
  "type": "object"
}
```

### Accepted with a warning

Source: [expected-warning/unresolved-external-tool-ref.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/unresolved-external-tool-ref.json) · Selected: `/tools/0`

```json
{
  "name": "lookup",
  "inputSchema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "identifier": {
        "$ref": "https://schemas.example.com/common.json#/$defs/identifier"
      }
    },
    "required": [
      "identifier"
    ],
    "additionalProperties": false
  }
}
```

### Accepted with a warning

Source: [expected-warning/unresolved-external-tool-example-ref.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/fixtures/expected-warning/unresolved-external-tool-example-ref.json) · Selected: `/tools/0`

```json
{
  "name": "lookup",
  "inputSchema": {
    "type": "object",
    "properties": {
      "identifier": {
        "$ref": "https://schemas.example.invalid/identifier.json"
      }
    },
    "required": [
      "identifier"
    ]
  },
  "examples": {
    "external-identifier": {
      "input": {
        "identifier": "example-123"
      },
      "result": {
        "resultType": "complete",
        "content": [
          {
            "type": "text",
            "text": "Found example-123."
          }
        ]
      }
    }
  }
}
```

## Source record

[tool.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/tool.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
