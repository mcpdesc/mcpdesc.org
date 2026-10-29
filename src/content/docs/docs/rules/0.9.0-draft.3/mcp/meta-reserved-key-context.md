---
title: "Place reserved metadata in its defined context"
description: "A recognized reserved metadata key has a specific context and value shape. A key valid on one message or object may be invalid on another. Check the containing object and protocol "
slug: docs/rules/0.9.0-draft.3/mcp/meta-reserved-key-context
sidebar:
  label: "mcp.meta.reserved-key-context"
---

A recognized reserved metadata key has a specific context and value shape. A key valid on one message or object may be invalid on another. Check the containing object and protocol version rather than moving the same key unchanged into every _meta object.


## Requirement

A reserved _meta key appears only in the message context, and with the value, that the revision defines for it.

## Details

**Rule ID:** `mcp.meta.reserved-key-context`<br>
**Owner:** mcp<br>
**Surface:** _meta<br>
**Kind:** semantic<br>
**Requirement level:** must<br>
**Status:** internal · **Enforcement:** internal

## Protocol version applicability

| `2024-11-05` | `2025-03-26` | `2025-06-18` | `2025-11-25` | `2026-07-28` |
| --- | --- | --- | --- | --- |
| not-applicable | not-applicable | applies | applies | applies |
## Required by

- **MCP Description 0.9.0, Section 3.5**
  - [/docs/specification/0.9.0-draft.3/document-structure#req-meta-keys](/docs/specification/0.9.0-draft.3/document-structure#req-meta-keys)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2025-06-18 to 2026-07-28 specification, Basic, General fields, _meta (reserved keys and where they apply)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/basic/index.mdx#L123-L147](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-06-18/basic/index.mdx#L123-L147)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L190-L215](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2025-11-25/basic/index.mdx#L190-L215)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L322-L446](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L322-L446)


## Notes

Checked on declarations and on every carried value: example results, their content, interaction step responses, and roots. MCP 2024-11-05 and 2025-03-26 do not define reserved keys; Section 16.2 limits validation for those revisions.


## Examples

### Invalid example

Source: [expected-invalid/meta-reserved-key-misuse.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/meta-reserved-key-misuse.json) · Selected: `/tools/0/_meta`

```json
{
  "progressToken": "request-only"
}
```

### Invalid example

Source: [expected-invalid/meta-reserved-keys-in-carried-values.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/meta-reserved-keys-in-carried-values.json) · Selected: `/prompts/0/completionExamples/request-key-in-result/result/_meta`

```json
{
  "progressToken": "c1"
}
```

## Rule Source Code

[result.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/result.yaml) at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft).
