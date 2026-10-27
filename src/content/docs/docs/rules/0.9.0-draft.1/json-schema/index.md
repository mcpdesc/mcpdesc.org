---
title: "JSON Schema Rules"
description: "Rules delegated to embedded JSON Schema dialects and validation."
slug: docs/rules/0.9.0-draft.1/json-schema
sidebar:
  label: JSON Schema Rules (1)
---

Rules delegated to embedded JSON Schema dialects and validation.

Rules in this set are attached to MCP Description 0.9.0-draft.1. See the [rules overview](/docs/rules/0.9.0-draft.1/) and [MCP revision guide](/docs/rules/0.9.0-draft.1/revisions).

## Tool

- [`json-schema.tool-schema.valid`](tool-schema-valid) — An embedded Tool inputSchema or outputSchema is valid under its declared or default JSON Schema dialect, and a declared dialect is JSON Schema 2020-12 or draft-07.<br>Severity: `invalid-tool-schema` (error), `unsupported-tool-schema-dialect` (error), `unresolved-external-tool-schema-reference` (warning) · Applies: `2025-11-25`, `2026-07-28`
