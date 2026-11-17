---
title: "Review reserved extension identifiers"
description: "Extension identifiers in an MCP-reserved namespace are checked against the pinned catalog. Unknown or experimental identifiers are preserved with a warning. Verify the identifier a"
slug: docs/rules/0.9.0/mcpdesc/extensions-catalog-maturity
sidebar:
  label: "mcpdesc.extensions.catalog-maturity"
---

Extension identifiers in an MCP-reserved namespace are checked against the pinned catalog. Unknown or experimental identifiers are preserved with a warning. Verify the identifier and its maturity; an unrecognized identifier is not silently assigned known extension semantics.


## Requirement

An extension identifier under an MCP-reserved prefix that the pinned extension catalog lists as experimental, or does not list, is preserved with a warning.

## Details

**Rule ID:** `mcpdesc.extensions.catalog-maturity`<br>
**Owner:** mcpdesc<br>
**Surface:** Extension identifier · **Path:** `capabilities.extensions, clientRequirements.extensions`<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** should<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 8.4 and 8.5; validator extension catalog (effective 2026-09-04)**
  - 8. Capabilities: [req-extensions-reserved-identifiers](https://mcpdesc.org/docs/specification/0.9.0/capabilities#req-extensions-reserved-identifiers)
  - 8. Capabilities: [req-extensions-catalog-maturity](https://mcpdesc.org/docs/specification/0.9.0/capabilities#req-extensions-catalog-maturity)
  - 8. Capabilities: [req-extensions-official-no-warning](https://mcpdesc.org/docs/specification/0.9.0/capabilities#req-extensions-official-no-warning)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2026-07-28 specification, Basic, General fields, _meta key name format (second label modelcontextprotocol or mcp is reserved)
  - [https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L337-L339](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/docs/specification/2026-07-28/basic/index.mdx#L337-L339)


## Notes

The pinned catalog lists no experimental identifiers, so no document currently produces the experimental-identifier warning.


## Examples

### Accepted with a warning

Source: [expected-warning/unknown-reserved-extension-identifier.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/fixtures/expected-warning/unknown-reserved-extension-identifier.json) · Selected: `/capabilities/0/extensions`

```json
{
  "io.modelcontextprotocol/future-capability": {
    "enabled": true
  }
}
```

### Accepted with a warning

Source: [expected-warning/deprecated-client-capability-requirements.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/fixtures/expected-warning/deprecated-client-capability-requirements.json) · Selected: `/prompts/0/clientRequirements/extensions`

```json
{
  "io.modelcontextprotocol/future-capability": {}
}
```

## Rule Source Code

[capabilities.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/validation/rules/capabilities.yaml) at immutable tag [`v0.9.0`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0).
