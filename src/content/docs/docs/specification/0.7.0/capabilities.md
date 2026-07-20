---
title: "8. Capabilities"
description: "MCP Description specification v0.7.0 — 8. Capabilities."
slug: docs/specification/0.7.0/capabilities
sidebar:
  order: 8
---

:::note[Mirrored specification]
This page mirrors **8. Capabilities** of the MCP Description specification **v0.7.0**. The canonical source of truth is [`cisco-open/mcptoolkit-contract`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/sections/08-capabilities.md). Where this page differs from upstream, upstream wins.
:::

## 8. Capabilities

The `capabilities` object declares the server's supported features as reported during MCP initialization. It is OPTIONAL.

### 8.1 Overview

Capabilities provide hints about the server's feature set beyond the tools, resources, and prompts it exposes. These correspond to the capabilities returned in the MCP `InitializeResult`.

### 8.2 Properties

| Property | Type | Description |
|----------|------|-------------|
| `tools` | object | Tool-related capabilities |
| `tools.listChanged` | boolean | Whether the server sends `notifications/tools/list_changed` |
| `resources` | object | Resource-related capabilities |
| `resources.subscribe` | boolean | Whether the server supports resource subscriptions |
| `resources.listChanged` | boolean | Whether the server sends `notifications/resources/list_changed` |
| `prompts` | object | Prompt-related capabilities |
| `prompts.listChanged` | boolean | Whether the server sends `notifications/prompts/list_changed` |
| `completions` | object | Present if the server supports argument autocompletion (MCP 2025-03-26+) |
| `logging` | object | Present if the server supports sending log messages to the client |
| `tasks` | object | Present if the server supports task-augmented requests (MCP 2025-11-25+) |
| `experimental` | object | Experimental, non-standard capabilities |

### 8.3 Tasks Capability

The `tasks` object, when present, indicates the server supports long-running task management:

| Property | Type | Description |
|----------|------|-------------|
| `tasks.list` | object | Server supports listing active tasks |
| `tasks.cancel` | object | Server supports cancelling tasks |
| `tasks.requests.tools.call` | object | Tool calls can be task-augmented |

### 8.4 Extensibility

The `capabilities` object allows additional properties beyond those defined here. Implementations SHOULD preserve unknown capability properties when processing documents.

### 8.5 Example

```json
{
  "capabilities": {
    "tools": { "listChanged": true },
    "resources": { "subscribe": true, "listChanged": true },
    "prompts": { "listChanged": false },
    "completions": {},
    "logging": {}
  }
}
```
