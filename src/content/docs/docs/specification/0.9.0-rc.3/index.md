---
title: Overview
description: MCP Description 0.9.0 RC.3 - release candidate status, union-aware diagnostics, schemas, and migration guidance.
slug: docs/specification/0.9.0-rc.3
sidebar:
  label: Overview
  order: 0
head:
  - tag: link
    attrs:
      rel: alternate
      type: text/markdown
      title: Complete MCP Description Specification 0.9.0 RC.3
      href: https://mcpdesc.org/specification/0.9.0-rc.3/mcpdesc.md
---

:::caution[Release candidate]
MCP Description **0.9.0 RC.3** is a release candidate, not a stable release. It may change
before final release. Use [0.8.0](/docs/specification/0.8.0/) for the current stable
specification.
:::

The document's `mcpdesc` value remains `0.9.0`; its exact schema identity is
`0.9.0-rc.3`. For validators and projection tools, the bare `0.9.0` selector advances
with release candidates until final `0.9.0` is released. Select an exact RC supported
by your tool when you need to pin a snapshot. Publishing this specification snapshot
does not itself add RC.3 support to downstream packages.

**Format version**: 0.9.0 | **Snapshot**: rc.3 | **Date**: November 7, 2026

## About this release candidate

These versioned sections, examples, validation rules, and companion guides mirror the
immutable RC.3 snapshot. Earlier draft and RC snapshots remain available from the
[canonical specification repository](https://github.com/mcpdesc/mcpdesc-specification/tags).

RC.3 extends RC.2's discriminator-driven validation with
[union-aware, source-located diagnostics](/docs/specification/0.9.0-rc.3/conformance#165-validation-results).
Disjoint unions with approved selectors use portable guarded conditionals; only the
inclusive `oauthFlows` union retains `anyOf`. Findings identify the applicable failing
rule rather than irrelevant alternatives.

For diagnostic consumers:

- Missing-member paths identify the enclosing object; `detail.member` names the absent member.
- Unexpected-member paths identify the member that exists in the source.
- Findings reached through `$componentRef` identify the reference use site and provide a
  `component-definition` entry in `relatedLocations`.
- Render recognized `detail.kind` values and their factual fields; fall back to `message`
  for unknown kinds or diagnostics without detail.
- Do not depend on raw diagnostic counts or validation-engine schema paths.

Validation result format advances to **1.4.0**. Rule format remains **1.3.0**, with
**85 rules** (46 MCP, 1 JSON Schema, and 38 `mcpdesc`), updated ownership locations and
fixture citations, and an expanded unchecked-requirement inventory.

:::caution[One intentional acceptance change]
Elicitation Interaction Response Objects in Tool Interaction Examples now reject unknown
members that RC.2 allowed. This change does **not** apply to native MCP responses at runtime.
Other union changes are intended to preserve RC.2 document acceptance.
:::

Read the [0.8.0-to-0.9.0 migration guide](/docs/specification/0.9.0-rc.3/guides/migration-0.8-to-0.9),
including [RC.3 diagnostic migration](/docs/specification/0.9.0-rc.3/guides/migration-0.8-to-0.9#union-aware-diagnostics-in-rc3),
for compatibility details. The cumulative candidate also retains protocol-version-scoped
validation, Effective Protocol Views, merge and conversion profiles, and the non-semantic
[document ordering profile](/docs/specification/0.9.0-rc.3/document-ordering).
The proposals implemented by this candidate remain under review.

## Source and schemas

- **Canonical source** - [`spec/draft/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/mcp-description.md)
- **Immutable source tag** - [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.3/spec/draft)
- **MCP Description JSON Schema** - [`0.9.0-rc.3.json`](/schema/mcp-description/0.9.0-rc.3.json)
- **Validation rule schema** - [`validation-rule/1.3.0.json`](/schema/validation-rule/1.3.0.json)
- **Validation result schema** - [`validation-result/1.4.0.json`](/schema/validation-result/1.4.0.json)
- **Companion guides** - [RC.3 guides](/docs/specification/0.9.0-rc.3/guides/)
- **How validation works** - [Protocol-version validation, views, and projection](/docs/specification/0.9.0-rc.3/guides/understanding-mcp-protocol-versions)
- **Validation Rules** - [Catalog and troubleshooting](/docs/rules/0.9.0-rc.3/)
- **Upstream changelog** - [RC.3 changes](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/CHANGELOG.md)
- **Validation result changelog** - [Format 1.4.0](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/result-format-changelog.md)
- **Feedback** - [Discuss the release candidate or report an issue](https://github.com/mcpdesc/mcpdesc-specification/issues)

:::note[Mirrored specification]
These pages mirror the immutable [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.3/spec/draft)
snapshot in `mcpdesc/mcpdesc-specification`. Where these pages differ from upstream,
the tagged upstream source wins. Snapshot guides retain upstream publication and
package-support notes; the links above identify the schemas hosted by this site.
:::

### For AI assistants and tools

- **Complete specification, single file** - [`/specification/0.9.0-rc.3/mcpdesc.md`](/specification/0.9.0-rc.3/mcpdesc.md)
- **Version index** - [`/specification/index.json`](/specification/index.json), including
  stable and candidate channels and their canonical source and schema URLs
- **Validation rule catalog** - [`manifest.json`](/validation/catalogs/0.9.0-rc.3/manifest.json)
  for the 85 rules in [`rules.json`](/validation/catalogs/0.9.0-rc.3/rules.json), with
  hash-pinned rule and result schemas; published catalogs are listed in the
  [catalog index](/validation/catalogs/index.json)

## Sections

1. [Introduction](/docs/specification/0.9.0-rc.3/introduction)
2. [Terminology](/docs/specification/0.9.0-rc.3/terminology)
3. [Document Structure](/docs/specification/0.9.0-rc.3/document-structure)
4. [Versioning](/docs/specification/0.9.0-rc.3/versioning)
5. [Info Object](/docs/specification/0.9.0-rc.3/info-object)
6. [Transports](/docs/specification/0.9.0-rc.3/transports)
7. [Security](/docs/specification/0.9.0-rc.3/security)
8. [Capabilities](/docs/specification/0.9.0-rc.3/capabilities)
9. [Tools](/docs/specification/0.9.0-rc.3/tools)
10. [Resources and Resource Templates](/docs/specification/0.9.0-rc.3/resources)
11. [Prompts](/docs/specification/0.9.0-rc.3/prompts)
12. [Elicitation Declarations](/docs/specification/0.9.0-rc.3/elicitation)
13. [Tags](/docs/specification/0.9.0-rc.3/tags)
14. [Specification Extensions](/docs/specification/0.9.0-rc.3/specification-extensions)
15. [Serialization](/docs/specification/0.9.0-rc.3/serialization)
16. [Conformance](/docs/specification/0.9.0-rc.3/conformance)
17. [Reusable Components and Local References](/docs/specification/0.9.0-rc.3/components)
18. [Document-oriented Serialization Ordering](/docs/specification/0.9.0-rc.3/document-ordering)

See also the [appendix](/docs/specification/0.9.0-rc.3/appendices) and
[examples](/docs/specification/0.9.0-rc.3/examples).
