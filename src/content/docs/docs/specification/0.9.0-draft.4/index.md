---
title: Overview
description: MCP Description 0.9.0 draft.4 - status, source, schema, and section map.
slug: docs/specification/0.9.0-draft.4
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.9.0 draft.4
      href: https://mcpdesc.org/specification/0.9.0-draft.4/mcpdesc.md
---

:::caution[Working draft]
MCP Description **0.9.0 draft.4** is the active community working draft, not a stable
release. It may change incompatibly before release. Use
[0.8.0](/docs/specification/0.8.0/) for the current stable specification.
:::

**Format version**: 0.9.0 | **Snapshot**: draft.4 | **Date**: October 31, 2026

## About this draft

These versioned sections, examples, guides, and validation rules mirror Community
Working Draft 4. The earlier [draft.3](/docs/specification/0.9.0-draft.3/),
[draft.2](/docs/specification/0.9.0-draft.2/), and
[draft.1](/docs/specification/0.9.0-draft.1/) snapshots remain available for historical
reference.

## Source and schema

- **Canonical draft** - [`spec/draft/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/mcp-description.md)
- **Immutable source tag** - [`v0.9.0-draft.4`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-draft.4/spec/draft)
- **Draft JSON Schema** - [`0.9.0-draft.4.json`](/schema/mcp-description/0.9.0-draft.4.json)
- **Validation rule schema** - [`validation-rule/1.2.0.json`](/schema/validation-rule/1.2.0.json)
- **Validation result schema** - [`validation-result/1.0.0.json`](/schema/validation-result/1.0.0.json)
- **Companion guides** - [Draft guides](/docs/specification/0.9.0-draft.4/guides/)
- **Migration guidance** - [Migrate from 0.8.0 to 0.9.0](/docs/specification/0.9.0-draft.4/guides/migration-0.8-to-0.9)
- **MCP protocol versions** - [How MCP protocol versions are managed](/docs/specification/0.9.0-draft.4/guides/understanding-mcp-protocol-versions)
- **Validation Rules** - [Catalog and troubleshooting](/docs/rules/0.9.0-draft.4/)
- **Draft changelog** - [Upstream changes](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.4/spec/draft/CHANGELOG.md)
- **Feedback** - [Discuss the draft or report an issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

:::note[Mirrored specification]
These pages mirror the immutable [`v0.9.0-draft.4`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-draft.4/spec/draft)
snapshot in `mcpdesc/mcpdesc-specification`. Where these pages differ from upstream,
the tagged upstream source wins.
:::

### For AI assistants and tools

- **Complete draft, single file** - [`/specification/0.9.0-draft.4/mcpdesc.md`](/specification/0.9.0-draft.4/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  stable and candidate channels and their canonical source and schema URLs
- **Validation rule catalog** - [`manifest.json`](/validation/catalogs/0.9.0-draft.4/manifest.json)
  for the 85 rules in [`rules.json`](/validation/catalogs/0.9.0-draft.4/rules.json), with
  hash-pinned rule and result schemas; all catalogs are listed in the
  [catalog index](/validation/catalogs/index.json)

## Sections

1. [Introduction](/docs/specification/0.9.0-draft.4/introduction)
2. [Terminology](/docs/specification/0.9.0-draft.4/terminology)
3. [Document Structure](/docs/specification/0.9.0-draft.4/document-structure)
4. [Versioning](/docs/specification/0.9.0-draft.4/versioning)
5. [Info Object](/docs/specification/0.9.0-draft.4/info-object)
6. [Transports](/docs/specification/0.9.0-draft.4/transports)
7. [Security](/docs/specification/0.9.0-draft.4/security)
8. [Capabilities](/docs/specification/0.9.0-draft.4/capabilities)
9. [Tools](/docs/specification/0.9.0-draft.4/tools)
10. [Resources and Resource Templates](/docs/specification/0.9.0-draft.4/resources)
11. [Prompts](/docs/specification/0.9.0-draft.4/prompts)
12. [Elicitation Declarations](/docs/specification/0.9.0-draft.4/elicitation)
13. [Tags](/docs/specification/0.9.0-draft.4/tags)
14. [Specification Extensions](/docs/specification/0.9.0-draft.4/specification-extensions)
15. [Serialization](/docs/specification/0.9.0-draft.4/serialization)
16. [Conformance](/docs/specification/0.9.0-draft.4/conformance)
17. [Reusable Components and Local References](/docs/specification/0.9.0-draft.4/components)

See also the [appendix](/docs/specification/0.9.0-draft.4/appendices) and
[examples](/docs/specification/0.9.0-draft.4/examples).
