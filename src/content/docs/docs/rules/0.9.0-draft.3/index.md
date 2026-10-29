---
title: Validation Rules
description: Validation rules and troubleshooting for MCP Description 0.9.0-draft.3.
slug: docs/rules/0.9.0-draft.3
sidebar:
  label: Overview
  order: 0
---

Validation rules explain the checks used to determine whether an MCP
Description document is valid and identify issues that need attention.

## What validation rules cover

A document is checked in three areas:

- **MCP:** the described tools, resources, prompts, capabilities, or carried
  MCP values meet the requirements of the applicable protocol
  version.
- **JSON Schema:** an embedded Tool input or output schema is valid under
  its applicable JSON Schema dialect.
- **MCP Description:** complementary description fields, protocol scoping,
  references, and examples meet MCP Description's requirements.

The catalog groups rules by these three owners, recorded as
`mcp`, `json-schema`, and `mcpdesc`.

A single Tool declaration may involve rules from all three groups:

- Its MCP fields and annotations follow MCP rules.
- Its `inputSchema` and `outputSchema` must be valid JSON Schemas.
- Its scopes and examples follow MCP Description rules; its example results
  also follow MCP's result types for every applicable protocol version.

## Why explicit validation rules?

MCP Description provides static descriptions of MCP servers across the MCP
protocol versions a specification version supports. MCP Description 0.9.0
supports MCP protocol versions 2024-11-05 through 2026-07-28.

The same field can be required in one protocol version,
undefined in another, and governed by a JSON Schema dialect rather than by MCP.

A validation failure without that context does not tell an author what to fix.

For structural checks, semantic checks, and protocol scopes, read
[How validation works](/docs/specification/0.9.0-draft.3/guides/understanding-mcp-protocol-versions).
This overview explains how to use the catalog to understand and act on the
resulting diagnostics.

## How to use the catalog

Each rule records which specification owns the requirement, which protocol
versions it applies to, and where the requirement comes from.

The catalog
helps users and tools identify whether a problem concerns MCP structures,
embedded JSON Schema, or MCP Description semantics.

Each rule has a permanent identifier, such as `mcp.tool.output-schema.object-root`.
Utility tools can use this identifier to refer to a particular rule and trace provenance in a diagnostic.

Each record also has a short `title`, a precise requirement `summary`, and a
reader-oriented `description`. Titles help you scan the catalog; descriptions
explain what a check means and how to address it. They do not replace the
specification requirements.

A validator reports each issue with a severity, a location, and the `rule` it
breaks. It may also report its own diagnostic codes and messages; those belong
to the validator, can differ between tools, and are not part of the catalog.

Each rule cites fixtures: complete example documents in the specification,
with a pointer to the relevant fragment and its outcome. The outcome is
`passes` when the rule reports nothing there, or `error` or `warning` for what
the rule reports. The specification's tests check every outcome, so the
fixtures show how a rule behaves.

To act on a diagnostic:

1. Find the diagnostic's `rule` identifier in the catalog.
2. Check the diagnostic's severity and the rule's protocol-version
   applicability.
3. Read the requirement, its source references, and the rule's fixtures,
   comparing a fragment that passes with one that fails.
4. Correct the document and validate it again.

Errors make a document invalid; warnings do not:

- **Error:** a Tool has an array-rooted `outputSchema` but applies to MCP
  2025-11-25, which requires an object root. See the
  [worked example](#worked-example) below.
- **Warning:** an example result contains `resultType: "complete"` for MCP
  2025-11-25. The open result type permits the field without defining its
  meaning. The document remains valid, and the field is preserved. The
  [guide explains the contrast with MCP 2026-07-28](/docs/specification/0.9.0-draft.3/guides/understanding-mcp-protocol-versions#what-validation-checks),
  where the field is required. See rule
  `mcp.result.additional-properties.preserve` in
  [`rules/result.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/result.yaml).

### Worked example

The [guide's complete server description](/docs/specification/0.9.0-draft.3/guides/understanding-mcp-protocol-versions#use-protocolversions-scopes-to-describe-variations)
declares two `lookup` variants with different output schemas. To isolate one
error, consider a document with the same root protocol versions,
`["2025-11-25", "2026-07-28"]`, but only this Tool:

```json
{
  "name": "lookup",
  "inputSchema": { "type": "object" },
  "outputSchema": { "type": "array", "items": { "type": "string" } }
}
```

This is a Tool fragment, not a complete document. Without its own
`protocolVersions`, it inherits both root versions. The candidate validator
reports this error (its own diagnostic `code` is omitted here):

```json
{
  "severity": "error",
  "message": "tools[0].outputSchema must have type \"object\" when it applies to MCP 2025-11-25",
  "path": ["tools", 0, "outputSchema", "type"],
  "rule": "mcp.tool.output-schema.object-root"
}
```

1. Find `mcp.tool.output-schema.object-root` in
   [`rules/tool.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml). Its title is "Use object output schemas
   before MCP 2026"; its description explains the version boundary.
2. The severity is `error`, so the document is invalid. The rule applies to
   MCP 2025-06-18 and 2025-11-25, but not 2026-07-28. This Tool inherits
   2025-11-25, so the check applies.
3. Read the requirement in
   [Section 9.2](/docs/specification/0.9.0-draft.3/tools#req-tool-output-schema-object-root)
   and the rule's pinned MCP sources. The rule cites two fixtures: an
   [invalid fixture](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/non-object-output-schema-before-2026.json)
   whose `/tools/0/outputSchema` has outcome `error` for MCP 2025-11-25, and a
   [valid fixture](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/protocol-coverage-and-tool-schemas.json)
   whose `/tools/3/outputSchema` passes because that Tool is scoped to MCP
   2026-07-28 only.
4. Correct the description to match the server. If only MCP 2026-07-28 returns
   an array, scope that variant to `["2026-07-28"]` and retain the object-output
   variant for 2025-11-25, as in the guide. If both versions return an object,
   describe that actual object shape instead. Do not change declared protocol
   support merely to silence an error. Validate again; the guide's complete
   two-variant document produces no diagnostics.

## Status and scope

The normative requirements are those of the specification sections. The rule
catalog is a pilot registry implementing review-stage
[Proposal 0024](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/proposal-snapshots/0024-validation-rule-identity-and-provenance.md),
extended by review-stage
[Proposal 0030](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/proposal-snapshots/0030-readable-and-complete-rule-records.md).
Neither proposal is accepted. The pilot registry documents and tests the
requirements; its reader fields are informative and it is not a separate
document-conformance specification.

Catalogs belong to exact MCP Description snapshots, not validator package
versions. Once deployed, the [catalog discovery index](https://mcpdesc.org/validation/catalogs/index.json)
lists the published manifests, with separate stable and draft pointers. The
Draft 3 catalog and rule-format `1.1.0` endpoints are publication targets until
deployment is verified; this working tree does not imply they are live. See
[catalog publication and discovery](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/README.md#catalog-publication-and-discovery).

Every diagnostic of this repository's candidate validator identifies a
registered rule. Published prereleases implement the registry and native MCP
projection for Community Working Drafts 1 and 2 (`0.9.0-draft.1` and
`0.9.0-draft.2`), when a selector is passed explicitly:

- [`@mcpdesc/validator@0.14.0-rc.2`](https://www.npmjs.com/package/@mcpdesc/validator/v/0.14.0-rc.2)
  reports the `rule` of each diagnostic.
- [`@mcpdesc/core@0.13.0-rc.2`](https://www.npmjs.com/package/@mcpdesc/core/v/0.13.0-rc.2)
  implements native MCP projection, tested against those drafts' projection
  fixtures, and 0.8.0 to 0.9.0 conversion. It does not yet check the
  projection postcondition of Section 4.14, which Draft 3's postcondition
  cases expect.

Both are prereleases, not stable releases. Install them by exact version: the
npm `next` dist-tag moves to later prereleases. Support for Draft 3 follows in
later releases.

## Browse by owner

- **MCP** — 39 rules.
- **JSON Schema** — 1 rule.
- **mcpdesc** — 23 rules.

## Revision and version guidance

- [How MCP protocol versions are managed](/docs/specification/0.9.0-draft.3/guides/understanding-mcp-protocol-versions)

:::note[Mirrored overview]
This overview mirrors the marked excerpt in [the source README](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/README.md)
at immutable tag [`v0.9.0-draft.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft). Upstream wins if this copy differs.
:::
