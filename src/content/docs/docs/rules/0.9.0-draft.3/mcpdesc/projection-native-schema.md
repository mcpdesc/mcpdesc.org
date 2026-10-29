---
title: "Preserve MCP values when projecting declarations"
description: "Native projection resolves Tool schema components, removes description-only fields, and checks the value against the selected MCP schema. It does not repair values or invent defaul"
slug: docs/rules/0.9.0-draft.3/mcpdesc/projection-native-schema
sidebar:
  label: "mcpdesc.projection.native-schema"
---

Native projection resolves Tool schema components, removes description-only fields, and checks the value against the selected MCP schema. It does not repair values or invent defaults. A postcondition failure is an implementation or specification defect and returns no projected value.


## Requirement

A native projection keeps exactly the declaration fields that the MCP type defines in the revision, unchanged after reference resolution, and the value validates against the pinned MCP schema of the revision.

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
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-references-resolved](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-references-resolved)
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-fields](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-fields)
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-postcondition](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-postcondition)
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-no-synthesis](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-no-synthesis)
  - [/docs/specification/0.9.0-draft.3/versioning#req-native-projection-lists](/docs/specification/0.9.0-draft.3/versioning#req-native-projection-lists)


## Gaps and arbitrations

:::note[Known gap: `2025-11-25`]
A valid document can give a Tool schema property a boolean subschema, which JSON Schema 2020-12 allows, while the pinned MCP 2025-11-25 schema.json requires an object there. Projecting that Tool for MCP 2025-11-25 fails the postcondition; MCP 2026-07-28 accepts it.

Resolution: **planned** (https://github.com/mcpdesc/mcpdesc-specification/issues/95).
:::


## Notes

The postcondition cases come from the recorded gap, not from an injected fault: the source is valid, yet the native value fails the pinned MCP 2025-11-25 schema. A list fails as a whole. scripts/test-projection-fixtures.mjs checks that each failure case's value really fails that schema and that every expected value passes it.


## Examples

### Projection succeeds

Source: [projection-fixtures/tool-icons-execution-component-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tool-icons-execution-component-2025-11-25.json) · Selected: `/expected`

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

Source: [projection-fixtures/tool-component-input-array-output-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tool-component-input-array-output-2026-07-28.json) · Selected: `/expected`

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

Source: [projection-fixtures/prompt-arguments-2024-11-05.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/prompt-arguments-2024-11-05.json) · Selected: `/expected/arguments`

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

Source: [projection-fixtures/tools-list-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tools-list-2025-11-25.json) · Selected: `/expected`

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

Source: [projection-fixtures/tool-boolean-property-schema-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tool-boolean-property-schema-2026-07-28.json) · Selected: `/expected/inputSchema/properties`

```json
{
  "enabled": true
}
```

### Projection fails

Source: [projection-fixtures/tool-postcondition-failed-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tool-postcondition-failed-2025-11-25.json) · Selected: `/expectedError`

```json
"projection-postcondition-failed"
```

### Projection fails

Source: [projection-fixtures/tools-list-postcondition-failed-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/projection-fixtures/tools-list-postcondition-failed-2025-11-25.json) · Selected: `/expectedError`

```json
"projection-postcondition-failed"
```

## Rule Source Code

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
