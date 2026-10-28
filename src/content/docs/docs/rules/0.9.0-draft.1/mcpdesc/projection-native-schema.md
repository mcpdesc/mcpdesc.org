---
title: "mcpdesc.projection.native-schema"
description: "A native projection keeps exactly the declaration fields that the MCP type defines in the revision, unchanged after reference resolution, and the value validates against the pinned"
slug: docs/rules/0.9.0-draft.1/mcpdesc/projection-native-schema
ruleSurface: "Tool, Resource, ResourceTemplate, Prompt"
sidebar:
  label: "mcpdesc.projection.native-schema"
---

A native projection keeps exactly the declaration fields that the MCP type defines in the revision, unchanged after reference resolution, and the value validates against the pinned MCP schema of the revision.

**Rule ID:** `mcpdesc.projection.native-schema`<br>
**Owner:** mcpdesc<br>
**Surface:** Tool, Resource, ResourceTemplate, Prompt<br>
**Kind:** mcpdesc-semantic<br>
**Requirement:** must<br>
**Status:** delegated · **Enforcement:** external

## Revision applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not specified | not specified | not specified | not specified | not specified |

## Diagnostics

| Code | Severity |
| --- | --- |
| `projection-postcondition-failed` | **error** |

## Required by

- **MCP Description 0.9.0, Section 4.14, steps 4 to 6, no synthesis, and lists**
  - [/docs/specification/0.9.0-draft.1/versioning#req-native-projection-references-resolved](/docs/specification/0.9.0-draft.1/versioning#req-native-projection-references-resolved)
  - [/docs/specification/0.9.0-draft.1/versioning#req-native-projection-fields](/docs/specification/0.9.0-draft.1/versioning#req-native-projection-fields)
  - [/docs/specification/0.9.0-draft.1/versioning#req-native-projection-postcondition](/docs/specification/0.9.0-draft.1/versioning#req-native-projection-postcondition)
  - [/docs/specification/0.9.0-draft.1/versioning#req-native-projection-no-synthesis](/docs/specification/0.9.0-draft.1/versioning#req-native-projection-no-synthesis)
  - [/docs/specification/0.9.0-draft.1/versioning#req-native-projection-lists](/docs/specification/0.9.0-draft.1/versioning#req-native-projection-lists)



## Notes

No fixture expects projection-postcondition-failed: it can only result from a defect in this specification, its validator, or an implementation. Every expected value is checked against the pinned MCP schema of its revision instead.


## Examples

### Native projection fixture

Source: [projection-fixtures/tool-icons-execution-component-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/projection-fixtures/tool-icons-execution-component-2025-11-25.json) · Selected: `/expected`

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

### Native projection fixture

Source: [projection-fixtures/tool-component-input-array-output-2026-07-28.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/projection-fixtures/tool-component-input-array-output-2026-07-28.json) · Selected: `/expected`

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

### Native projection fixture

Source: [projection-fixtures/prompt-arguments-2024-11-05.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/projection-fixtures/prompt-arguments-2024-11-05.json) · Selected: `/expected/arguments`

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

### Native projection fixture

Source: [projection-fixtures/tools-list-2025-11-25.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/projection-fixtures/tools-list-2025-11-25.json) · Selected: `/expected`

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

## Source record

[projection.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rules/projection.yaml) at immutable tag [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft).
