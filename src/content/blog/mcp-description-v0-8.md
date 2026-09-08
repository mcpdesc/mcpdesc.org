---
title: 'MCP Description v0.8 adds support MCP 2026-07-28'
listTitle: MCP Description now supports MCP 2026-07-28
description: MCP Description v0.8 adds support for MCP 2026-07-28, multi-protocol descriptions, richer examples, and reusable components on the path toward v1.0.
date: 2026-09-08
author: Stève Sfartz
draft: true
---

It has been a busy summer for the MCP protocol and the __mcpdesc__ specification.

Launching today, version 0.8 of the MCP Description specification adds support for MCP `2026-07-28` and expands the `mcpdesc` format with multi-protocol descriptions and projection, richer examples, and reusable components.

## New features

### MCP 2026-07-28 and multi-protocol descriptions

An `mcpdesc` document can now describe the surface of an MCP server across multiple protocol revisions.

Protocol applicability can be declared at multiple levels: transports, capabilities, tools, resources, resource templates, and prompts. This allows a single document to represent both `2025-11-25` and `2026-07-28` behavior without flattening the differences between them.

The specification also defines **Effective Protocol Views** so tools can project a multi-version document into a document that applies to a particular MCP revision.

Check the [multi-version](https://editor.mcpdesc.org?example=multi-version) example.


### Richer examples and interaction descriptions

An `mcpdesc` document can now include named examples for tools, resources, resource templates, and prompts.

v0.8 also adds completion examples, elicitation declarations, and tool interaction examples for describing durable interactions such as elicitation, sampling, and roots without attempting to reproduce MCP's runtime message flow.

Check the [full-featured](https://editor.mcpdesc.org?example=full-featured) example.

### Extensions and client requirements

v0.8 adds first-class support for MCP extensions and for declaring capabilities that a client must provide to use a server primitive.

Its extension model distinguishes official, experimental, and unknown MCP extension identifiers without treating recognition as validation of extension-specific settings.

### Enriched security definitions

Reusable named security schemes can now be declared once and applied at the server, transport, or primitive level, including scoped requirements, alternatives, and explicit overrides.

### Reusable components

Frequently repeated declarations can be placed in typed components and reused through local `$componentRef` references.

Check the [component-ref](https://editor.mcpdesc.org?example=component-ref) example.

## Tools and migration

### Semantic validation

v0.8 defines conforming JSON and restricted YAML serialization profiles. The validator applies semantic checks that go beyond the structural JSON Schema.

Conformance libraries for TypeScript are maintained in [`mcpdesc/core`](https://github.com/mcpdesc/core) and published as npm packages:

- [`@mcpdesc/validator`](https://www.npmjs.com/package/@mcpdesc/validator) for structural and semantic validation
- [`@mcpdesc/core`](https://www.npmjs.com/package/@mcpdesc/core) for parsing, migration, and Effective Protocol View operations

### MCP Description Editor

The Live Editor supports the features above, including protocol-version projection, examples, and reusable components. It can also migrate a v0.7 document to v0.8 when the document is loaded.

### MCP Toolkit v2

The prerelease `mcpcontract` 2.x CLI supports v0.8. The current `mcpmock` release still vendors the v0.7 schema; a v0.8-compatible release is not yet available.

### Try v0.8

The easiest way to explore `mcpdesc` v0.8 is to open an example in the [Live Editor](https://editor.mcpdesc.org).

You can also generate a description from a live MCP server via the `mcpcontract` CLI:

```bash
# Install the prerelease CLI v2
npm install -g @cisco-open/mcptoolkit-contract@next

# Capture the description of a live server
mcpcontract dump \
  --transport streamable-http \
  --url "https://your-server.example/mcp" \
  --protocol auto \
  --format yaml \
  --output server.mcpdesc.yaml
```

## Help shape the path to v1.0

Before calling the `mcpdesc` format v1.0, we are looking for more practical feedback across these scenarios:

- **Accurate documentation:** generate reliable documentation for tools, resources, prompts, transports, and security.
- **Quality assurance and compliance:** lint, validate, and compare documents for completeness and consistency.
- **CI/CD automation:** store, review, version, and publish documents alongside engineering pipelines.
- **Conformance checking:** compare a server's declared surface with what it implements.
- **Design-first workflows:** design a server from a document, refine it with a mock service, and generate code.
- **Interoperability:** exchange documents among tools that read, write, validate, render, diff, and generate code from the format.

We encourage you to read the [MCP Description specification](/docs/specification/0.8.0-rc.4/), test the existing toolset, and let us know:

- Is there anything your MCP server exposes that `mcpdesc` cannot represent?
- Is any part of the multi-protocol, extension, security, or client-requirement model ambiguous?
- Does your existing MCP tooling encounter friction when consuming or producing `mcpdesc` documents?

Please report issues through the [MCP Description specification issue tracker](https://github.com/mcpdesc/mcpdesc-specification/issues).