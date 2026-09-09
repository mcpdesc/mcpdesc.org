---
title: Overview
description: MCP Description specification v0.8.0 - status, source, schema, and section map.
slug: docs/specification/0.8.0
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.8.0
      href: https://mcpdesc.org/specification/0.8.0/mcpdesc.md
---

:::note[Stable release]
This is the current stable release of MCP Description. The previous stable release,
[v0.7.0](/docs/specification/0.7.0/), remains available.
:::

**Format version**: 0.8.0 · **Status**: stable · **Date**: September 9, 2026

## About this release

MCP Description v0.8 adds support for MCP `2026-07-28`, multi-protocol descriptions,
extensions and client requirements, reusable security schemes, richer examples and
interactions, reusable components, and stronger serialization and semantic conformance.

## Source and schema

- **Canonical specification** - [`spec/0.8.0/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.8.0/spec/0.8.0/mcp-description.md)
- **Release source** - [`v0.8.0`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.8.0)
- **Release notes** - [`v0.8.0`](https://github.com/mcpdesc/mcpdesc-specification/releases/tag/v0.8.0)
- **Immutable JSON Schema** - [`0.8.0.json`](https://mcpdesc.org/schema/mcp-description/0.8.0.json)
- **Migration guide** - [Migrate from 0.7 to 0.8](/docs/specification/0.8.0/migration-0.7-to-0.8)
- **Feedback** - [Report an interoperability issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

:::note[Mirrored specification]
These pages mirror MCP Description **v0.8.0** from
[`v0.8.0`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.8.0/spec/0.8.0/mcp-description.md)
in `mcpdesc/mcpdesc-specification`.
Where these pages differ from upstream, upstream wins.
:::

### For AI assistants and tools

- **Complete specification, single file** - [`/specification/0.8.0/mcpdesc.md`](/specification/0.8.0/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  explicit `stable` and `candidate` fields and the compatible `latest` and `next` aliases

## Sections

1. [Introduction](/docs/specification/0.8.0/introduction)
2. [Terminology](/docs/specification/0.8.0/terminology)
3. [Document Structure](/docs/specification/0.8.0/document-structure)
4. [Versioning](/docs/specification/0.8.0/versioning)
5. [Info Object](/docs/specification/0.8.0/info-object)
6. [Transports](/docs/specification/0.8.0/transports)
7. [Security](/docs/specification/0.8.0/security)
8. [Capabilities](/docs/specification/0.8.0/capabilities)
9. [Tools](/docs/specification/0.8.0/tools)
10. [Resources and Resource Templates](/docs/specification/0.8.0/resources)
11. [Prompts](/docs/specification/0.8.0/prompts)
12. [Elicitation Declarations](/docs/specification/0.8.0/elicitation)
13. [Tags](/docs/specification/0.8.0/tags)
14. [Specification Extensions](/docs/specification/0.8.0/specification-extensions)
15. [Serialization](/docs/specification/0.8.0/serialization)
16. [Conformance](/docs/specification/0.8.0/conformance)
17. [Reusable Components and Local References](/docs/specification/0.8.0/components)

See also the [appendices](/docs/specification/0.8.0/appendices),
[examples](/docs/specification/0.8.0/examples), and cross-version
[changelog](/docs/specification/changelog).