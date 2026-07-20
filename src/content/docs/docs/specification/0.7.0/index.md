---
title: Overview
description: MCP Description specification v0.7.0 — abstract, status, source, and section map.
slug: docs/specification/0.7.0
sidebar:
  label: Overview
  order: 0
---

:::note[Mirrored specification]
This is the landing page for the MCP Description specification **v0.7.0** (Status: **Draft**,
2026-03-23). The canonical source of truth is
[`cisco-open/mcptoolkit-contract`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/mcp-description.md).
Where these pages differ from upstream, upstream wins.
:::

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

- **Canonical specification** — [`spec/mcp-description.md`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/mcp-description.md)
- **JSON Schema (0.7.0)** — [`schemas/mcp-description/0.7.0.json`](https://github.com/cisco-open/mcptoolkit-contract/blob/main/schemas/mcp-description/0.7.0.json)
- **Reference tooling** — [`mcpcontract`](https://github.com/cisco-open/mcptoolkit-contract)

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
