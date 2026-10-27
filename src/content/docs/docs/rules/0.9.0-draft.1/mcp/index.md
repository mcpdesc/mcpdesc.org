---
title: "MCP Rules"
description: "Rules whose authority is the applicable MCP protocol revision."
slug: docs/rules/0.9.0-draft.1/mcp
sidebar:
  label: MCP Rules (37)
---

Rules whose authority is the applicable MCP protocol revision.

Rules in this set are attached to MCP Description 0.9.0-draft.1. See the [rules overview](/docs/rules/0.9.0-draft.1/) and [MCP revision guide](/docs/rules/0.9.0-draft.1/revisions).

## _meta

- [`mcp.meta.key-format`](meta-key-format) — A _meta key has an optional prefix of dot-separated labels followed by a slash, and a name that begins and ends with an alphanumeric character.<br>Severity: `schema-validation` (error), `meta-key-invalid` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.meta.reserved-key-context`](meta-reserved-key-context) — A reserved _meta key appears only in the message context, and with the value, that the revision defines for it.<br>Severity: `meta-reserved-key-context` (error), `meta-reserved-key-value` (error) · Applies: `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.meta.reserved-prefix`](meta-reserved-prefix) — A _meta key under an MCP-reserved prefix that the revision does not define is preserved with a warning.<br>Severity: `meta-unknown-reserved-key` (warning) · Applies: `2025-06-18`, `2025-11-25`, `2026-07-28`

## Annotations

- [`mcp.annotations.last-modified.revision-availability`](annotations-last-modified-revision-availability) — Resource Annotations carry lastModified only from MCP 2025-06-18, on declarations and on content blocks.<br>Severity: `resource-annotation-not-supported-by-version` (error), `tool-example-content-version-mismatch` (error), `prompt-example-content-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.annotations.members`](annotations-members) — Resource Annotations on resources, resource templates, and content blocks contain only audience, priority, and lastModified.<br>Severity: `schema-validation` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## BlobResourceContents

- [`mcp.resource-contents.blob.base64`](resource-contents-blob-base64) — A blob in Resource Contents is canonical base64.<br>Severity: `invalid-resource-example-base64` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## CallToolResult

- [`mcp.tool.structured-content.output-schema`](tool-structured-content-output-schema) — When a Tool declares outputSchema, a successful result contains structuredContent.<br>Severity: `missing-tool-example-structured-content` (error) · Applies: `2025-06-18`, `2025-11-25`, `2026-07-28`

## ClientCapabilities

- [`mcp.client-capabilities.deprecated`](client-capabilities-deprecated) — A client capability requirement that the applicable revision deprecates is reported.<br>Severity: `deprecated-client-requirement` (warning) · Applies: `2025-11-25`, `2026-07-28`
- [`mcp.client-capabilities.members`](client-capabilities-members) — A Client Capability Requirements Object names only client capabilities the applicable MCP revision defines; custom requirements go in experimental and, from MCP 2026-07-28, in extensions.<br>Severity: `schema-validation` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.client-capabilities.revision-shape`](client-capabilities-revision-shape) — Each client capability requirement and nested member exists in every applicable revision's ClientCapabilities type, with object values and a boolean listChanged.<br>Severity: `client-requirement-version-mismatch` (error), `invalid-client-requirement-value` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## CompleteRequest

- [`mcp.completion.context.revision-availability`](completion-context-revision-availability) — A completion example carries context only from MCP 2025-06-18, where CompleteRequest defines it.<br>Severity: `completion-example-context-version-mismatch` (error) · Applies: `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## CompleteResult

- [`mcp.completion.result-closed`](completion-result-closed) — The completion object of a completion result contains only values, total, and hasMore.<br>Severity: `schema-validation` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.completion.revision-availability`](completion-revision-availability) — Completion examples are available in every revision that defines completion/complete and CompleteResult.<br>Severity: `completion-example-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## ContentBlock

- [`mcp.content-block.revision-availability`](content-block-revision-availability) — Content blocks in example results use only content types and fields the applicable revision defines: audio from MCP 2025-03-26, resource links and block _meta from 2025-06-18, and resource-link icons from 2025-11-25.<br>Severity: `tool-example-content-version-mismatch` (error), `prompt-example-content-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## CreateMessageRequest

- [`mcp.sampling.tools.revision-availability`](sampling-tools-revision-availability) — A sampling request uses tools and toolChoice only from MCP 2025-11-25.<br>Severity: `interaction-example-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## ElicitRequest

- [`mcp.elicitation.form-schema.revision-shape`](elicitation-form-schema-revision-shape) — In MCP 2025-06-18, a form requestedSchema has no $schema, no array or titled enum properties, and default only on boolean properties.<br>Severity: `elicitation-form-schema-version-mismatch` (error) · Applies: `2025-06-18`
- [`mcp.elicitation.revision-availability`](elicitation-revision-availability) — Elicitation is used only from MCP 2025-06-18, and URL mode only from MCP 2025-11-25, in declarations and in Tool interaction steps.<br>Severity: `elicitation-mode-not-supported-by-version` (error), `interaction-example-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## InputResponse

- [`mcp.input-response.closed`](input-response-closed) — In MCP 2026-07-28, sampling, elicitation, and roots responses are input responses, not results, and accept only the fields their types define.<br>Severity: `interaction-example-version-mismatch` (error) · Applies: `2026-07-28`

## ResourceContents

- [`mcp.resource-contents.meta.revision-availability`](resource-contents-meta-revision-availability) — Resource contents carry _meta only from MCP 2025-06-18, in Resource examples and in embedded resources.<br>Severity: `resource-example-content-version-mismatch` (error), `tool-example-content-version-mismatch` (error), `prompt-example-content-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## ResourceTemplate

- [`mcp.resource-template.uri-template`](resource-template-uri-template) — A Resource Template uriTemplate is a valid RFC 6570 URI template.<br>Severity: `invalid-resource-template-uri-template` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## Result

- [`mcp.result.additional-properties.preserve`](result-additional-properties-preserve) — A field that an open MCP result type allows but the revision does not define is accepted and preserved without meaning, with a warning attributed to that revision.<br>Severity: `result-field-not-defined-by-version` (warning) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## Root

- [`mcp.root.meta.revision-availability`](root-meta-revision-availability) — A root in a roots response may carry _meta from MCP 2025-06-18.<br>Severity: `interaction-example-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.root.uri.file-scheme`](root-uri-file-scheme) — A root URI in a roots response starts with file://.<br>Severity: `interaction-example-roots-uri` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## ServerCapabilities

- [`mcp.capabilities.extensions.revision-availability`](capabilities-extensions-revision-availability) — Server capabilities.extensions is defined from MCP 2026-07-28; for earlier revisions a pre-standard extensions map is preserved with a warning.<br>Severity: `extensions-not-supported-by-version` (warning) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.capabilities.logging.deprecated`](capabilities-logging-deprecated) — The logging server capability is reported as deprecated in MCP 2026-07-28.<br>Severity: `logging-deprecated-in-2026` (warning) · Applies: `2026-07-28`
- [`mcp.capabilities.tasks.revision-availability`](capabilities-tasks-revision-availability) — The core tasks server capability exists only in MCP 2025-11-25; MCP 2026-07-28 uses the tasks extension instead.<br>Severity: `field-not-supported-by-version` (error), `tasks-core-not-valid-in-2026` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.server-capabilities.members`](server-capabilities-members) — A server Capabilities Object contains only the capabilities the applicable MCP revision defines; custom capabilities go in experimental and, from MCP 2026-07-28, in extensions.<br>Severity: `schema-validation` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## Tool

- [`mcp.tool.input-schema.object-root`](tool-input-schema-object-root) — Tool inputSchema is a JSON Schema object whose root declares type "object", because tool arguments are always JSON objects.<br>Severity: `schema-validation` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.tool.input-schema.x-mcp-header`](tool-input-schema-x-mcp-header) — An x-mcp-header annotation is a non-empty HTTP field-name token on a boolean, integer, or string property reachable from the input schema root through properties only, and is unique case-insensitively within the Tool.<br>Severity: `invalid-x-mcp-header` (error), `duplicate-x-mcp-header` (error) · Applies: `2026-07-28`
- [`mcp.tool.output-schema.object-root`](tool-output-schema-object-root) — A Tool outputSchema has an object-typed root.<br>Severity: `field-not-supported-by-version` (error) · Applies: `2025-06-18`, `2025-11-25`
- [`mcp.tool.output-schema.revision-availability`](tool-output-schema-revision-availability) — A Tool declares outputSchema only for MCP revisions whose Tool type defines it.<br>Severity: `field-not-supported-by-version` (error) · Applies: `2024-11-05`, `2025-03-26`
- [`mcp.tool.schema-keywords.preserve`](tool-schema-keywords-preserve) — Tool inputSchema and outputSchema are JSON Schema objects; keywords beyond those MCP lists are permitted and preserved, and acquire MCP semantics only where a revision defines them.<br>Severity: no diagnostic code · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.tool.schema.legacy-shape`](tool-schema-legacy-shape) — Before MCP 2025-11-25, Tool schema properties is an object of objects and required is an array of strings; other keywords are preserved.<br>Severity: `invalid-legacy-tool-schema-shape` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`

## Tool, Resource, ResourceTemplate, Prompt, PromptArgument, ServerCapabilities

- [`mcp.declaration.field.revision-availability`](declaration-field-revision-availability) — A declaration field is used only in revisions whose MCP type defines it: title and _meta from 2025-06-18, Tool annotations from 2025-03-26, icons and Tool schema $schema from 2025-11-25, Tool execution only in 2025-11-25, and the completions capability from 2025-03-26.<br>Severity: `field-not-supported-by-version` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## ToolAnnotations

- [`mcp.tool-annotations.members`](tool-annotations-members) — A Tool annotations object contains only title, readOnlyHint, destructiveHint, idempotentHint, and openWorldHint.<br>Severity: `schema-validation` (error) · Applies: `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## Transport

- [`mcp.transport.legacy-sse.deprecated`](transport-legacy-sse-deprecated) — Legacy HTTP+SSE associated with MCP 2025-03-26 or later is reported, because Streamable HTTP replaces it.<br>Severity: `legacy-sse-for-modern-version` (warning) · Applies: `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcp.transport.streamable-http.revision-availability`](transport-streamable-http-revision-availability) — Streamable HTTP is used only from MCP 2025-03-26.<br>Severity: `transport-not-supported-by-version` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
