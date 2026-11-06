---
title: Overview
description: MCP Description 0.9.0 RC.2 - release candidate status, source, schemas, and section map.
slug: docs/specification/0.9.0-rc.2
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.9.0 RC.2
      href: https://mcpdesc.org/specification/0.9.0-rc.2/mcpdesc.md
---

:::caution[Release candidate]
MCP Description **0.9.0 RC.2** is a release candidate, not a stable release. It may change
before final release. Use [0.8.0](/docs/specification/0.8.0/) for the current stable
specification.
:::

For validators and projection tools, selecting MCP Description `0.9.0` resolves to the
latest release candidate, currently `0.9.0-rc.2`. That default advances as later candidates
are published, then resolves to final `0.9.0` after release. Select an exact RC version when
you need to pin a snapshot.

**Format version**: 0.9.0 | **Snapshot**: rc.2 | **Date**: November 6, 2026

## About this release candidate

These versioned sections, examples, validation rules, and companion guides mirror the
immutable RC.2 snapshot. Earlier draft and RC snapshots remain available from the
[canonical specification repository](https://github.com/mcpdesc/mcpdesc-specification/tags).

Compared with RC.1, RC.2 adds a recommended
[document-oriented serialization order](/docs/specification/0.9.0-rc.2/document-ordering)
without making property order semantic or changing validation. Eight discriminated object
unions now use guarded `if`/`then` branches rather than `oneOf`, preserving document
acceptance while enabling more specific diagnostics. See the
[migration guidance](/docs/specification/0.9.0-rc.2/guides/migration-0.8-to-0.9#discriminator-driven-diagnostics-after-rc1).
Validation rule and result formats remain **1.3.0**.

## Source and schemas

- **Canonical source** - [`spec/draft/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/mcp-description.md)
- **Immutable source tag** - [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.2/spec/draft)
- **MCP Description JSON Schema** - [`0.9.0-rc.2.json`](/schema/mcp-description/0.9.0-rc.2.json)
- **Validation rule schema** - [`validation-rule/1.3.0.json`](/schema/validation-rule/1.3.0.json)
- **Validation result schema** - [`validation-result/1.3.0.json`](/schema/validation-result/1.3.0.json)
- **Companion guides** - [RC.2 guides](/docs/specification/0.9.0-rc.2/guides/)
- **MCP protocol versions** - [How MCP protocol versions are managed](/docs/specification/0.9.0-rc.2/guides/understanding-mcp-protocol-versions)
- **Validation Rules** - [Catalog and troubleshooting](/docs/rules/0.9.0-rc.2/)
- **Upstream changelog** - [RC.2 changes](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/CHANGELOG.md)
- **Feedback** - [Discuss the release candidate or report an issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

:::note[Mirrored specification]
These pages mirror the immutable [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.2/spec/draft)
snapshot in `mcpdesc/mcpdesc-specification`. Where these pages differ from upstream,
the tagged upstream source wins.
:::

### For AI assistants and tools

- **Complete specification, single file** - [`/specification/0.9.0-rc.2/mcpdesc.md`](/specification/0.9.0-rc.2/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  stable and candidate channels and their canonical source and schema URLs
- **Validation rule catalog** - [`manifest.json`](/validation/catalogs/0.9.0-rc.2/manifest.json)
  for the 85 rules in [`rules.json`](/validation/catalogs/0.9.0-rc.2/rules.json), with
  hash-pinned rule and result schemas; published catalogs are listed in the
  [catalog index](/validation/catalogs/index.json)

## Sections

1. [Introduction](/docs/specification/0.9.0-rc.2/introduction)
2. [Terminology](/docs/specification/0.9.0-rc.2/terminology)
3. [Document Structure](/docs/specification/0.9.0-rc.2/document-structure)
4. [Versioning](/docs/specification/0.9.0-rc.2/versioning)
5. [Info Object](/docs/specification/0.9.0-rc.2/info-object)
6. [Transports](/docs/specification/0.9.0-rc.2/transports)
7. [Security](/docs/specification/0.9.0-rc.2/security)
8. [Capabilities](/docs/specification/0.9.0-rc.2/capabilities)
9. [Tools](/docs/specification/0.9.0-rc.2/tools)
10. [Resources and Resource Templates](/docs/specification/0.9.0-rc.2/resources)
11. [Prompts](/docs/specification/0.9.0-rc.2/prompts)
12. [Elicitation Declarations](/docs/specification/0.9.0-rc.2/elicitation)
13. [Tags](/docs/specification/0.9.0-rc.2/tags)
14. [Specification Extensions](/docs/specification/0.9.0-rc.2/specification-extensions)
15. [Serialization](/docs/specification/0.9.0-rc.2/serialization)
16. [Conformance](/docs/specification/0.9.0-rc.2/conformance)
17. [Reusable Components and Local References](/docs/specification/0.9.0-rc.2/components)
18. [Document-oriented Serialization Ordering](/docs/specification/0.9.0-rc.2/document-ordering)

See also the [appendix](/docs/specification/0.9.0-rc.2/appendices) and
[examples](/docs/specification/0.9.0-rc.2/examples).
