---
title: Overview
description: MCP Description specification v0.7.0 — abstract, status, source, and section map.
slug: docs/specification/0.7.0
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.7.0
      href: https://mcpdesc.org/specification/0.7.0/mcpdesc.md
---

**Version**: 0.7.0 · **Status**: Draft · **Date**: March 23, 2026

## Abstract

This specification defines the **MCP Description** format — a portable, machine-readable
document that describes the capabilities of a
[Model Context Protocol (MCP)](https://modelcontextprotocol.io) server.

An MCP Description declares the tools, resources, prompts, transports, security requirements,
and metadata of an MCP server in a static JSON document, enabling offline discovery,
documentation generation, contract validation, and interoperable tooling across the MCP
ecosystem.

## Status of this document

This document is a **Draft** specification. It is intended for review and feedback. The
specification may change before reaching a stable release.

## Source & schema

- **Canonical specification** — [`spec/mcp-description.md`](https://github.com/cisco-open/mcptoolkit-contract/blob/mcpdesc-v0.7.0/spec/mcp-description.md) ([raw](https://raw.githubusercontent.com/cisco-open/mcptoolkit-contract/mcpdesc-v0.7.0/spec/mcp-description.md))
- **JSON Schema (0.7.0)** — [`mcpdesc.org/schema/mcp-description/0.7.0.json`](https://mcpdesc.org/schema/mcp-description/0.7.0.json)
- **Reference tooling** — [`mcpcontract`](https://github.com/cisco-open/mcptoolkit-contract)

:::note[Mirrored specification]
These pages mirror the MCP Description specification **v0.7.0** from
[`cisco-open/mcptoolkit-contract`](https://github.com/cisco-open/mcptoolkit-contract/blob/mcpdesc-v0.7.0/spec/mcp-description.md).
Where these pages differ from upstream, upstream wins.
:::

### For AI assistants and tools

- **Complete spec, single file** — [`/specification/0.7.0/mcpdesc.md`](/specification/0.7.0/mcpdesc.md): every section concatenated into one Markdown document for one-request retrieval. The latest version is always at [`/specification/latest/mcpdesc.md`](/specification/latest/mcpdesc.md).
- **Version index (JSON)** — [`/specification/index.json`](/specification/index.json): machine-readable list of all versions, the current latest, any work-in-progress draft, and each version's full-file, canonical-source, and schema URLs.

## Sections

1. [Introduction](/docs/specification/0.7.0/introduction)
2. [Terminology](/docs/specification/0.7.0/terminology)
3. [Document Structure](/docs/specification/0.7.0/document-structure)
4. [Versioning](/docs/specification/0.7.0/versioning)
5. [Info Object](/docs/specification/0.7.0/info-object)
6. [Transports](/docs/specification/0.7.0/transports)
7. [Security](/docs/specification/0.7.0/security)
8. [Capabilities](/docs/specification/0.7.0/capabilities)
9. [Tools](/docs/specification/0.7.0/tools)
10. [Resources and Resource Templates](/docs/specification/0.7.0/resources)
11. [Prompts](/docs/specification/0.7.0/prompts)
12. [Tags](/docs/specification/0.7.0/tags)
13. [Specification Extensions](/docs/specification/0.7.0/specification-extensions)
14. [Serialization](/docs/specification/0.7.0/serialization)
15. [Conformance](/docs/specification/0.7.0/conformance)

See also the [examples](/docs/specification/0.7.0/examples) and the cross-version
[changelog](/docs/specification/changelog).
