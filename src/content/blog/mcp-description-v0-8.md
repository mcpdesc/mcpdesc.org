---
title: 'MCP Description v0.8 adds support for MCP 2026-07-28'
listTitle: MCP Description now supports MCP 2026-07-28
description: MCP Description v0.8 adds support for MCP 2026-07-28, multi-protocol descriptions, richer examples, and reusable components on the path toward v1.0.
date: 2026-09-09
author: Stève Sfartz
draft: false
---

It has been a busy summer for the MCP protocol and the mcpdesc specification.

Launching today, version 0.8 of the MCP Description specification adds support for MCP 2026-07-28 and expands the mcpdesc format with multi-protocol descriptions and projection, richer examples, and reusable components.

> The easiest way to explore the mcpdesc v0.8 format is to open some examples in the [Live Editor](https://editor.mcpdesc.org?example=full-featured).

## New features

### Protocol version scoped declarations

An mcpdesc document can now describe the surface of an MCP server across multiple protocol versions.

Protocol applicability can be declared at multiple levels: transports, capabilities, tools, resources, resource templates, and prompts. This allows a single document to represent both 2025-11-25 and 2026-07-28 behavior without flattening the differences between them.

The specification also defines Effective Protocol Views so tools can project a multi-version document into a document that applies to a particular MCP revision.

Check the [multi-protocol-versions](https://editor.mcpdesc.org?example=multi-version) example.

### Richer examples and interaction descriptions

An mcpdesc document can now include named examples for tools, resources, resource templates, and prompts.

v0.8 also adds completion examples, elicitation declarations, and tool interaction examples for describing durable interactions such as elicitation, sampling, and roots without attempting to reproduce MCP's runtime message flow.

Check the [full-featured](https://editor.mcpdesc.org?example=full-featured) example.

### Extensions and client requirements

v0.8 adds first-class support for MCP extensions and for declaring capabilities that a client must provide to use a server primitive.

Its extension model distinguishes official, experimental, and unknown MCP extension identifiers without treating recognition as validation of extension-specific settings.

### Enriched security definitions

Reusable named security schemes can now be declared once and applied at the server, transport, or primitive level, including scoped requirements, alternatives, and explicit overrides.

### Reusable components

Frequently repeated declarations can be placed in typed components and reused through local $componentRef references.

Check the [component-ref](https://editor.mcpdesc.org?example=component-ref) example.

## Tools and migration

### Semantic validation

v0.8 defines conforming JSON and restricted YAML serialization profiles. Semantic checks are also defined beyond structural JSON Schema validation.

Conformance libraries for TypeScript are maintained in [mcpdesc/core](https://github.com/mcpdesc/core) and published as npm packages:

- [@mcpdesc/validator](https://www.npmjs.com/package/@mcpdesc/validator) for structural and semantic validation
- [@mcpdesc/core](https://www.npmjs.com/package/@mcpdesc/core) for parsing, migration, and Effective Protocol View operations

### MCP Description Editor

The [mcpdesc Editor](https://github.com/cisco-open/mcptoolkit-editor) supports all the features above, including protocol-version projection, examples, and reusable components.

It also automatically migrates mcpdesc v0.7 documents to v0.8 at import.

### mcpcontract CLI v2

The mcpcontract CLI v2 supports mcpdesc v0.8 as the default format. It also allows converting an existing v0.7 document.

```bash
# Install the last mcpcontract CLI v2
npm install -g @cisco-open/mcptoolkit-contract

# Capture the description of a live server
mcpcontract dump \
  --transport streamable-http \
  --url "https://your-server.example/mcp" \
  --protocol auto \
  --format yaml \
  --output server.mcpdesc.yaml
```

## Help shape the path to mcpdesc v1.0

With version 0.8, the specification now has a dedicated
home in [`mcpdesc/mcpdesc-specification`](https://github.com/mcpdesc/mcpdesc-specification). Moving it from its original location gives the specification an independent, community-first place for issues, proposals, and contributions.

The path to v1.0 will be developed in the open, led by
the project maintainers and shaped by feedback from contributors, users, and tool builders.

Before calling the mcpdesc format v1.0, we are looking for more practical feedback from MCP tool builders and users across these scenarios:

- **Accurate documentation:** generate reliable documentation for tools, resources, prompts, transports, and security.
- **Quality assurance and compliance:** lint, validate, and compare documents for completeness and consistency.
- **CI/CD automation:** store, review, version, and publish documents alongside engineering pipelines.
- **Conformance checking:** compare a server's declared surface with what it implements.
- **Design-first workflows:** design a server from a document, refine it with a mock service, and generate code.
- **Interoperability:** exchange documents among tools that read, write, validate, render, diff, and generate code from the format.

We encourage you to read the [MCP Description specification](/docs/specification/0.8.0/), test the existing toolset, and let us know:

- Is there anything your MCP server exposes that the mcpdesc format cannot describe?
- Is any part of the multi-protocol, extension, security, or client-requirement model ambiguous?
- Does your existing MCP tooling encounter friction when consuming or producing mcpdesc documents?

Please report issues through the [MCP Description specification issue tracker](https://github.com/mcpdesc/mcpdesc-specification/issues).