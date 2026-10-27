---
title: Overview
description: MCP Description 0.9.0 draft.1 - status, source, schema, and section map.
slug: docs/specification/0.9.0-draft.1
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.9.0 draft.1
      href: https://mcpdesc.org/specification/0.9.0-draft.1/mcpdesc.md
---

:::caution[Working draft]
MCP Description **0.9.0 draft.1** is an active community working draft, not a stable release.
Its content may change. Use [0.8.0](/docs/specification/0.8.0/) when you need the current
stable specification.
:::

**Format version**: 0.9.0 · **Status**: draft candidate · **Draft**: 1

## About this draft

This draft develops MCP Description's native representation of MCP structures, including
protocol-scoped declarations and projection to MCP-native views. The canonical source and
the linked migration guide describe the current draft behavior and its changes from 0.8.0.

## Source and schema

- **Canonical draft** - [`spec/draft/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/mcp-description.md)
- **Immutable source tag** - [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-draft.1/spec/draft)
- **Draft JSON Schema** - [`0.9.0-draft.1.json`](/schema/mcp-description/0.9.0-draft.1.json)
- **Examples** - [Draft examples](/docs/specification/0.9.0-draft.1/examples)
- **Migration guidance** - [Migrate from 0.8.0 to 0.9.0](/docs/specification/0.9.0-draft.1/guides/migration-0.8-to-0.9)
- **Feedback** - [Discuss the draft or report an issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

:::note[Mirrored specification]
These pages mirror the 0.9.0 working draft from
[`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-draft.1/spec/draft)
in `mcpdesc/mcpdesc-specification`. Where these pages differ from upstream, the immutable
upstream source wins.
:::

### For AI assistants and tools

- **Complete draft, single file** - [`/specification/0.9.0-draft.1/mcpdesc.md`](/specification/0.9.0-draft.1/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  stable and candidate channels and their canonical source and schema URLs

## Sections

1. [Introduction](/docs/specification/0.9.0-draft.1/introduction)
2. [Terminology](/docs/specification/0.9.0-draft.1/terminology)
3. [Document Structure](/docs/specification/0.9.0-draft.1/document-structure)
4. [Versioning](/docs/specification/0.9.0-draft.1/versioning)
5. [Info Object](/docs/specification/0.9.0-draft.1/info-object)
6. [Transports](/docs/specification/0.9.0-draft.1/transports)
7. [Security](/docs/specification/0.9.0-draft.1/security)
8. [Capabilities](/docs/specification/0.9.0-draft.1/capabilities)
9. [Tools](/docs/specification/0.9.0-draft.1/tools)
10. [Resources and Resource Templates](/docs/specification/0.9.0-draft.1/resources)
11. [Prompts](/docs/specification/0.9.0-draft.1/prompts)
12. [Elicitation Declarations](/docs/specification/0.9.0-draft.1/elicitation)
13. [Tags](/docs/specification/0.9.0-draft.1/tags)
14. [Specification Extensions](/docs/specification/0.9.0-draft.1/specification-extensions)
15. [Serialization](/docs/specification/0.9.0-draft.1/serialization)
16. [Conformance](/docs/specification/0.9.0-draft.1/conformance)
17. [Reusable Components and Local References](/docs/specification/0.9.0-draft.1/components)

See also the [appendix](/docs/specification/0.9.0-draft.1/appendices),
[companion guides](/docs/specification/0.9.0-draft.1/guides/),
[examples](/docs/specification/0.9.0-draft.1/examples), and the upstream
[draft changelog](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/CHANGELOG.md).