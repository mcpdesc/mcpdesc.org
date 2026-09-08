---
title: 'MCP Description v0.8: support for modern MCP servers'
listTitle: MCP Description v0.8
description: MCP Description v0.8 adds support for MCP 2026-07-28, multi-protocol descriptions, extensions, reusable components, and a path toward v1.0.
date: 2026-09-08
author: Stève Sfartz
draft: true
---

It has been a busy summer for MCP and `mcpdesc`.

The MCP Description specification `v0.8.0` significantly expands the format for describing modern MCP servers, and includes support for the latest MCP version `2026-07-28`.

## What's new

### MCP 2026-07-28 and multi-protocol descriptions

An `mcpdesc` document can now describe the surface of an MCP server across multiple protocol revisions. Check the [multi-version](https://editor.mcpdesc.org?example=multi-version) example.

Protocol applicability can be declared for transports, capabilities, tools, resources, resource templates, and prompts. This allows a single document to represent both `2025-11-25` and `2026-07-28` behavior without flattening the differences between them.

The specification also defines Effective Protocol Views so tools can project a multi-version document into the description that applies to one particular MCP protocol revision.

### Richer examples and interaction descriptions

Descriptions can include named examples for tools, resources, resource templates, and prompts.

v0.8 also adds completion examples, elicitation declarations, and tool interaction examples for describing durable interactions such as elicitation, sampling, and roots without attempting to reproduce MCP's runtime message flow.

Check the [full-featured](https://editor.mcpdesc.org?example=full-featured) example.

### Extensions and client requirements

v0.8 adds first-class support for MCP extensions and for declaring capabilities that a client must provide to use a server feature or primitive.

It also improves recognition of official MCP extensions, including MCP Apps, Tasks, and authorization-related extensions.

### A stronger security model

Reusable named security schemes can now be declared once and applied at the server, transport, or primitive level, including scoped requirements, alternatives, and explicit overrides.

### Reusable components

Frequently repeated declarations can be placed in typed components and reused through local `$componentRef` references.

Check the [component-ref](https://editor.mcpdesc.org?example=component-ref) example.

### Conformance libraries

v0.8 defines conforming JSON and restricted YAML serializations. This allows semantic validation on top of the structural JSON Schema.

Conformance libraries for TypeScript are developed in [`mcpdesc/core`](https://github.com/mcpdesc/core) and published as two npm packages:
- [`@mcpdesc/core`](https://www.npmjs.com/package/@mcpdesc/core) for parsing, migration, and Effective Protocol View operations
- [`@mcpdesc/validator`](https://www.npmjs.com/package/@mcpdesc/validator) for structural and semantic validation

The Live Editor automatically migrates v0.7 documents when they are imported.

## Try v0.8

The easiest way to explore mcpdesc v0.8 is to open an example in the [Live Editor](https://editor.mcpdesc.org).

You can also generate a description from a live MCP server via the `mcpcontract` CLI:

```bash
# Install the CLI
npm install -g @cisco-open/mcptoolkit-contract

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

Read and evaluate the [MCP Description specification](/docs/specification/), and tell us:

- Is there anything your MCP server exposes that `mcpdesc` cannot represent?
- Is any part of the multi-protocol, extension, security, or client-requirement model ambiguous?
- Does your existing MCP tooling encounter friction when consuming or producing `mcpdesc` documents?

Please report issues through the [MCP Description specification issue tracker](https://github.com/mcpdesc/mcpdesc-specification/issues).