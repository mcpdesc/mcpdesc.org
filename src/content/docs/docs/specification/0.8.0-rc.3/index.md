---
title: Overview
description: MCP Description specification v0.8.0 RC.3 - status, source, schema, and section map.
slug: docs/specification/0.8.0-rc.3
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.8.0 RC.3
      href: https://mcpdesc.org/specification/0.8.0-rc.3/mcpdesc.md
---

:::caution[Release candidate]
This is MCP Description **v0.8.0 Release Candidate 3**, an immutable prerelease snapshot
published for interoperability testing. The current stable release remains
[v0.7.0](/docs/specification/0.7.0/).
:::

**Format version**: 0.8.0 · **Snapshot**: v0.8.0-rc.3 · **Date**: September 7, 2026

## About this candidate

MCP Description v0.8 adds support for MCP `2026-07-28`, multi-protocol descriptions,
extensions and client requirements, reusable security schemes, richer examples and
interactions, reusable components, and stronger serialization and semantic conformance.

RC.3 is behavior-equivalent to RC.2 for MCP Description documents. It updates the release
identity and schema references while moving repository publication and artifact-maintenance
policy into the specification repository's governance document.

## Source and schema

- **Canonical specification** - [`spec/draft/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.8.0-rc.3/spec/draft/mcp-description.md)
- **Release notes** - [`v0.8.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/releases/tag/v0.8.0-rc.3)
- **Immutable JSON Schema** - [`0.8.0-rc.3.json`](https://mcpdesc.org/schema/mcp-description/0.8.0-rc.3.json)
- **Migration guide** - [Migrate from 0.7 to 0.8](/docs/specification/0.8.0-rc.3/migration-0.7-to-0.8)
- **Feedback** - [Report an interoperability issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

### For AI assistants and tools

- **Complete candidate, single file** - [`/specification/0.8.0-rc.3/mcpdesc.md`](/specification/0.8.0-rc.3/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  explicit `stable` and `candidate` fields and the compatible `latest` and `next` aliases

## Sections

1. [Introduction](/docs/specification/0.8.0-rc.3/introduction)
2. [Terminology](/docs/specification/0.8.0-rc.3/terminology)
3. [Document Structure](/docs/specification/0.8.0-rc.3/document-structure)
4. [Versioning](/docs/specification/0.8.0-rc.3/versioning)
5. [Info Object](/docs/specification/0.8.0-rc.3/info-object)
6. [Transports](/docs/specification/0.8.0-rc.3/transports)
7. [Security](/docs/specification/0.8.0-rc.3/security)
8. [Capabilities](/docs/specification/0.8.0-rc.3/capabilities)
9. [Tools](/docs/specification/0.8.0-rc.3/tools)
10. [Resources and Resource Templates](/docs/specification/0.8.0-rc.3/resources)
11. [Prompts](/docs/specification/0.8.0-rc.3/prompts)
12. [Elicitation Declarations](/docs/specification/0.8.0-rc.3/elicitation)
13. [Tags](/docs/specification/0.8.0-rc.3/tags)
14. [Specification Extensions](/docs/specification/0.8.0-rc.3/specification-extensions)
15. [Serialization](/docs/specification/0.8.0-rc.3/serialization)
16. [Conformance](/docs/specification/0.8.0-rc.3/conformance)
17. [Reusable Components and Local References](/docs/specification/0.8.0-rc.3/components)

See also the [appendices](/docs/specification/0.8.0-rc.3/appendices),
[examples](/docs/specification/0.8.0-rc.3/examples), and cross-version
[changelog](/docs/specification/changelog).