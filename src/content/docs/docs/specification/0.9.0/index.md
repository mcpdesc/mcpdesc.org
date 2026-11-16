---
title: Overview
description: MCP Description specification v0.9.0 - stable release, source, schema, and section map.
slug: docs/specification/0.9.0
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.9.0
      href: https://mcpdesc.org/specification/0.9.0/mcpdesc.md
---

:::note[Stable release]
This is the current stable release of MCP Description. The previous stable release,
[v0.8.0](/docs/specification/0.8.0/), remains available.
:::

**Format version**: 0.9.0 · **Status**: stable · **Date**: November 16, 2026

## About this release

MCP Description 0.9.0 is the stable release of the 0.9 series. It incorporates accepted
and implemented Proposals 0024–0036, including protocol-version-scoped validation,
version conversion, native MCP projection, reusable validation-rule catalogs, and
rule-level results. It also adds guarded discriminator unions, source-aware diagnostics,
and a normalized YAML presentation profile.

The release tightens several conformance requirements, including YAML alias handling,
MCP-aligned object closure, integer-valued MCP fields, Tool schema dialect behavior, and
Resource URI requirements. Some documents accepted by 0.8.0 require migration; see the
[0.8.0-to-0.9.0 migration guide](/docs/specification/0.9.0/guides/migration-0.8-to-0.9).

## Source and schema

- **Canonical specification** - [`spec/0.9.0/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/mcp-description.md)
- **Immutable release tag** - [`v0.9.0`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0/spec/0.9.0)
- **Release notes** - [MCP Description 0.9.0](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/CHANGELOG.md)
- **Immutable JSON Schema** - [`0.9.0.json`](/schema/mcp-description/0.9.0.json)
- **Companion guides** - [Getting started and background](/docs/specification/0.9.0/guides/)
- **Validation rules** - [Stable 0.9.0 validation overview](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0/spec/0.9.0/validation/README.md)
- **Feedback** - [Report an interoperability issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

:::note[Mirrored specification]
These pages mirror the immutable [`v0.9.0`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0/spec/0.9.0)
release in `mcpdesc/mcpdesc-specification`. Where these pages differ from upstream,
the tagged upstream source wins.
:::

### For AI assistants and tools

- **Complete specification, single file** - [`/specification/0.9.0/mcpdesc.md`](/specification/0.9.0/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  the stable version and the compatible `latest` alias

## Sections

1. [Introduction](/docs/specification/0.9.0/introduction)
2. [Terminology](/docs/specification/0.9.0/terminology)
3. [Document Structure](/docs/specification/0.9.0/document-structure)
4. [Versioning](/docs/specification/0.9.0/versioning)
5. [Info Object](/docs/specification/0.9.0/info-object)
6. [Transports](/docs/specification/0.9.0/transports)
7. [Security](/docs/specification/0.9.0/security)
8. [Capabilities](/docs/specification/0.9.0/capabilities)
9. [Tools](/docs/specification/0.9.0/tools)
10. [Resources and Resource Templates](/docs/specification/0.9.0/resources)
11. [Prompts](/docs/specification/0.9.0/prompts)
12. [Elicitation Declarations](/docs/specification/0.9.0/elicitation)
13. [Tags](/docs/specification/0.9.0/tags)
14. [Specification Extensions](/docs/specification/0.9.0/specification-extensions)
15. [Serialization](/docs/specification/0.9.0/serialization)
16. [Conformance](/docs/specification/0.9.0/conformance)
17. [Reusable Components and Local References](/docs/specification/0.9.0/components)
18. [Document-oriented Serialization Ordering](/docs/specification/0.9.0/document-ordering)

See also the [appendix](/docs/specification/0.9.0/appendices),
[companion guides](/docs/specification/0.9.0/guides/),
[examples](/docs/specification/0.9.0/examples), and cross-version
[changelog](/docs/specification/changelog).