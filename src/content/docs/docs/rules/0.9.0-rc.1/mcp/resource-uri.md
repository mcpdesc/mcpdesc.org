---
title: "Identify resources with absolute URIs"
description: "A Resource uri is a URI as defined by RFC 3986, with a scheme; a relative reference or free text is invalid. Any scheme is allowed, including custom ones. MCP types the field as a "
slug: docs/rules/0.9.0-rc.1/mcp/resource-uri
sidebar:
  label: "mcp.resource.uri"
---

A Resource uri is a URI as defined by RFC 3986, with a scheme; a relative reference or free text is invalid. Any scheme is allowed, including custom ones. MCP types the field as a URI, so a value that is not one cannot be projected to a native MCP Resource.


## Requirement

Resource uri is an RFC 3986 URI with a scheme.

## Details

**Rule ID:** `mcp.resource.uri`<br>
**Owner:** mcp<br>
**Surface:** Resource · **Path:** `uri`<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/resource/properties/uri`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 10.1.2 and 15**
  - [/docs/specification/0.9.0-rc.1/resources#req-resource-uri-syntax](/docs/specification/0.9.0-rc.1/resources#req-resource-uri-syntax)
  - [/docs/specification/0.9.0-rc.1/serialization#req-serialization-value-formats](/docs/specification/0.9.0-rc.1/serialization#req-serialization-value-formats)

## Based on

- **Tier 1 — MCP schema.ts and normative specification text:** MCP 2024-11-05 to 2026-07-28 schema.ts, interface Resource, uri (@format uri)
  - [validation/mcp-schemas/2024-11-05/schema.ts#L419-L423](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2024-11-05/schema.ts#L419-L423)
  - [validation/mcp-schemas/2025-03-26/schema.ts#L447-L451](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-03-26/schema.ts#L447-L451)
  - [validation/mcp-schemas/2025-06-18/schema.ts#L528-L532](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-06-18/schema.ts#L528-L532)
  - [validation/mcp-schemas/2025-11-25/schema.ts#L804-L808](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2025-11-25/schema.ts#L804-L808)
  - [validation/mcp-schemas/2026-07-28/schema.ts#L1443-L1447](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/dae694f61a31f7a3ec2af3aff709e11f70f61e48/schema/2026-07-28/schema.ts#L1443-L1447)



## Examples

### Invalid example

Source: [expected-invalid/invalid-resource-uri.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/invalid-resource-uri.json) · Selected: `/resources/0/uri`

```json
"status page"
```

### Invalid example

Source: [expected-invalid/invalid-resource-uri.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/invalid-resource-uri.json) · Selected: `/resources/1/uri`

```json
"docs/readme.md"
```

## Rule Source Code

[resource.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/resource.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).
