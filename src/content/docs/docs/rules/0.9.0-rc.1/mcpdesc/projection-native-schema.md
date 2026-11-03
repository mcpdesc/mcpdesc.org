---
title: "Preserve MCP values when projecting declarations"
description: "Native projection resolves Tool schema components, removes description-only fields, and checks the value against the selected MCP schema. It does not repair values or invent defaul"
slug: docs/rules/0.9.0-rc.1/mcpdesc/projection-native-schema
sidebar:
  label: "mcpdesc.projection.native-schema"
---

Native projection resolves Tool schema components, removes description-only fields, and checks the value against the selected MCP schema. It does not repair values or invent defaults. A postcondition failure returns no projected value. It is an implementation or specification defect, unless validation warned about the Tool schema under mcp.tool.schema.native-shape for that protocol version.


## Requirement

A native projection keeps exactly the declaration fields that the MCP type defines in the protocol version, unchanged after reference resolution, and the value validates against the pinned MCP schema for that protocol version.

## Details

**Rule ID:** `mcpdesc.projection.native-schema`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool, Resource, ResourceTemplate, Prompt<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Status:** delegated · **Enforcement:** external

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| applies | applies | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 4.14, steps 4 to 6, no synthesis, and lists**
  - 4. Versioning: [req-native-projection-references-resolved](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-native-projection-references-resolved)
  - 4. Versioning: [req-native-projection-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-native-projection-fields)
  - 4. Versioning: [req-native-projection-postcondition](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-native-projection-postcondition)
  - 4. Versioning: [req-native-projection-no-synthesis](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-native-projection-no-synthesis)
  - 4. Versioning: [req-native-projection-lists](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-native-projection-lists)
  - 9. Tools: [req-tool-example-projection-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tools#req-tool-example-projection-omitted)
  - 9. Tools: [req-interaction-projection-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tools#req-interaction-projection-omitted)
  - 4. Versioning: [req-native-projection-steps](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-native-projection-steps)
  - 4. Versioning: [req-native-projection-no-repair](https://mcpdesc.org/docs/specification/0.9.0-rc.1/versioning#req-native-projection-no-repair)
  - 10. Resources and Resource Templates: [req-resource-example-projection-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.1/resources#req-resource-example-projection-omitted)
  - 10. Resources and Resource Templates: [req-template-completion-projection-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.1/resources#req-template-completion-projection-omitted)
  - 11. Prompts: [req-prompt-example-projection-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.1/prompts#req-prompt-example-projection-omitted)
  - 11. Prompts: [req-prompt-completion-projection-omitted](https://mcpdesc.org/docs/specification/0.9.0-rc.1/prompts#req-prompt-completion-projection-omitted)



## Notes

The postcondition cases come from Tool schemas that are valid under their JSON Schema dialect but miss a schema-syntax restriction of the MCP Tool type (Proposal 0032), not from an injected fault: the source is valid with a warning, yet the native value fails the pinned MCP schema. A list fails as a whole. scripts/test-projection-fixtures.mjs checks that each failure case's value really fails that schema and that every expected value passes it.


## Examples

### Projection succeeds

Source: [projection-fixtures/tool-icons-execution-component-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tool-icons-execution-component-2025-11-25.json) · Selected: `/expected`

```json
{
  "name": "report",
  "inputSchema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "period": {
        "type": "string",
        "x-ui-order": 1
      }
    }
  },
  "title": "Usage report",
  "outputSchema": {
    "type": "object",
    "properties": {
      "total": {
        "type": "number"
      }
    },
    "required": [
      "total"
    ]
  },
  "icons": [
    {
      "src": "https://example.com/report.png",
      "mimeType": "image/png"
    }
  ],
  "execution": {
    "taskSupport": "optional"
  }
}
```

### Projection succeeds

Source: [projection-fixtures/tool-component-input-array-output-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tool-component-input-array-output-2026-07-28.json) · Selected: `/expected`

```json
{
  "name": "report",
  "inputSchema": {
    "type": "object",
    "properties": {
      "region": {
        "type": "string",
        "x-mcp-header": "Region"
      }
    }
  },
  "title": "Usage report",
  "outputSchema": {
    "type": "array",
    "items": {
      "type": "number"
    }
  },
  "_meta": {
    "example.com/team": "reports"
  },
  "icons": [
    {
      "src": "https://example.com/report.png",
      "mimeType": "image/png",
      "theme": "light"
    }
  ]
}
```

### Projection succeeds

Source: [projection-fixtures/prompt-arguments-2024-11-05.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/prompt-arguments-2024-11-05.json) · Selected: `/expected/arguments`

```json
[
  {
    "name": "text",
    "description": "Text to summarize.",
    "required": true
  },
  {
    "name": "style"
  }
]
```

### Projection succeeds

Source: [projection-fixtures/tools-list-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tools-list-2025-11-25.json) · Selected: `/expected`

```json
[
  {
    "name": "search",
    "description": "Search the catalog.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string"
        }
      },
      "required": [
        "query"
      ]
    }
  },
  {
    "name": "report",
    "inputSchema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "period": {
          "type": "string",
          "x-ui-order": 1
        }
      }
    },
    "title": "Usage report",
    "outputSchema": {
      "type": "object",
      "properties": {
        "total": {
          "type": "number"
        }
      },
      "required": [
        "total"
      ]
    },
    "icons": [
      {
        "src": "https://example.com/report.png",
        "mimeType": "image/png"
      }
    ],
    "execution": {
      "taskSupport": "optional"
    }
  }
]
```

### Projection succeeds

Source: [projection-fixtures/tool-boolean-property-schema-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tool-boolean-property-schema-2026-07-28.json) · Selected: `/expected/inputSchema/properties`

```json
{
  "enabled": true
}
```

### Projection fails

Source: [projection-fixtures/tool-postcondition-failed-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tool-postcondition-failed-2025-11-25.json) · Selected: `/expectedError`

```json
"projection-postcondition-failed"
```

### Projection fails

Source: [projection-fixtures/tools-list-postcondition-failed-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tools-list-postcondition-failed-2025-11-25.json) · Selected: `/expectedError`

```json
"projection-postcondition-failed"
```

### Projection fails

Source: [projection-fixtures/tool-ref-root-postcondition-failed-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tool-ref-root-postcondition-failed-2025-11-25.json) · Selected: `/expectedError`

```json
"projection-postcondition-failed"
```

### Projection fails

Source: [projection-fixtures/tool-ref-root-postcondition-failed-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/projection-fixtures/tool-ref-root-postcondition-failed-2026-07-28.json) · Selected: `/expectedError`

```json
"projection-postcondition-failed"
```

## Rule Source Code

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
