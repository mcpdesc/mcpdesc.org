---
title: Overview
description: MCP Description 0.9.0 RC.1 - release candidate status, source, schemas, and section map.
slug: docs/specification/0.9.0-rc.1
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.9.0 RC.1
      href: https://mcpdesc.org/specification/0.9.0-rc.1/mcpdesc.md
---

:::caution[Release candidate]
MCP Description **0.9.0 RC.1** is a release candidate, not a stable release. It may change
before final release. Use [0.8.0](/docs/specification/0.8.0/) for the current stable
specification.
:::

For validators and projection tools, selecting MCP Description `0.9.0` resolves to the
latest release candidate, currently `0.9.0-rc.1`. That default advances as later candidates
are published, then resolves to final `0.9.0` after release. Select an exact RC version when
you need to pin a snapshot.

**Format version**: 0.9.0 | **Snapshot**: rc.1 | **Date**: November 2, 2026

## About this release candidate

These versioned sections, examples, validation rules, and companion guides mirror the
immutable RC.1 snapshot. The earlier [draft.4](/docs/specification/0.9.0-draft.4/),
[draft.3](/docs/specification/0.9.0-draft.3/), [draft.2](/docs/specification/0.9.0-draft.2/),
and [draft.1](/docs/specification/0.9.0-draft.1/) snapshots remain available for historical
reference.

## Source and schemas

- **Canonical source** - [`spec/draft/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/mcp-description.md)
- **Immutable source tag** - [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.1/spec/draft)
- **MCP Description JSON Schema** - [`0.9.0-rc.1.json`](/schema/mcp-description/0.9.0-rc.1.json)
- **Validation rule schema** - [`validation-rule/1.3.0.json`](/schema/validation-rule/1.3.0.json)
- **Validation result schema** - [`validation-result/1.3.0.json`](/schema/validation-result/1.3.0.json)
- **Companion guides** - [RC.1 guides](/docs/specification/0.9.0-rc.1/guides/)
- **MCP protocol versions** - [How MCP protocol versions are managed](/docs/specification/0.9.0-rc.1/guides/understanding-mcp-protocol-versions)
- **Validation Rules** - [Catalog and troubleshooting](/docs/rules/0.9.0-rc.1/)
- **Upstream changelog** - [RC.1 changes](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/CHANGELOG.md)
- **Feedback** - [Discuss the release candidate or report an issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

:::note[Mirrored specification]
These pages mirror the immutable [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.1/spec/draft)
snapshot in `mcpdesc/mcpdesc-specification`. Where these pages differ from upstream,
the tagged upstream source wins.
:::

### For AI assistants and tools

- **Complete specification, single file** - [`/specification/0.9.0-rc.1/mcpdesc.md`](/specification/0.9.0-rc.1/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  stable and candidate channels and their canonical source and schema URLs
- **Validation rule catalog** - [`manifest.json`](/validation/catalogs/0.9.0-rc.1/manifest.json)
  for the 85 rules in [`rules.json`](/validation/catalogs/0.9.0-rc.1/rules.json), with
  hash-pinned rule and result schemas; all catalogs are listed in the
  [catalog index](/validation/catalogs/index.json)

## Sections

1. [Introduction](/docs/specification/0.9.0-rc.1/introduction)
2. [Terminology](/docs/specification/0.9.0-rc.1/terminology)
3. [Document Structure](/docs/specification/0.9.0-rc.1/document-structure)
4. [Versioning](/docs/specification/0.9.0-rc.1/versioning)
5. [Info Object](/docs/specification/0.9.0-rc.1/info-object)
6. [Transports](/docs/specification/0.9.0-rc.1/transports)
7. [Security](/docs/specification/0.9.0-rc.1/security)
8. [Capabilities](/docs/specification/0.9.0-rc.1/capabilities)
9. [Tools](/docs/specification/0.9.0-rc.1/tools)
10. [Resources and Resource Templates](/docs/specification/0.9.0-rc.1/resources)
11. [Prompts](/docs/specification/0.9.0-rc.1/prompts)
12. [Elicitation Declarations](/docs/specification/0.9.0-rc.1/elicitation)
13. [Tags](/docs/specification/0.9.0-rc.1/tags)
14. [Specification Extensions](/docs/specification/0.9.0-rc.1/specification-extensions)
15. [Serialization](/docs/specification/0.9.0-rc.1/serialization)
16. [Conformance](/docs/specification/0.9.0-rc.1/conformance)
17. [Reusable Components and Local References](/docs/specification/0.9.0-rc.1/components)

See also the [appendix](/docs/specification/0.9.0-rc.1/appendices) and
[examples](/docs/specification/0.9.0-rc.1/examples).