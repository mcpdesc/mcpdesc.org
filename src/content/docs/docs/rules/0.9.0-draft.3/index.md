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

A document is checked as valid in three areas:

- **MCP:** the described tools, resources, prompts, capabilities, or carried
  MCP values do meet the requirements of the applicable protocol
  version.
- **JSON Schema:** an embedded Tool input or output schema is valid under
  its applicable JSON Schema structure.
- **MCP Description:** complementary description fields, protocol scoping,
  references, or examples do meet the requirements of the the MCP Description specifications.

The catalog groups rules by these three owners, recorded as
`mcp`, `json-schema`, and `mcpdesc`.

A single Tool declaration may involve
rules from all three groups:
- its MCP fields and annotations follow MCP rules,
- its `inputSchema` must be valid JSON Schema,
- and its documentation follows the MCP
Description rules for each protocol version scope.
- also, its examples are checked against MCP's result types and
against MCP Description's example rules.

## Why explicit validation rules?

MCP Description provides static descriptions of MCP servers across the MCP protocol revisions that a specification version supports: for mcpdesc 0.9.0, MCP protocol versions
2024-11-05 through 2026-07-28 are supported.

The same field can be required in one protocol version,
undefined in another, and governed by a JSON Schema dialect rather than by MCP.

A validation failure without that context does not tell an author what to fix.

For more information on MCP protocol versions, variations across versions and how MCP Description has organized with this complexity, we recommend to check the guide: [How MCP protocol versions are managed](/docs/specification/0.9.0-draft.3/guides/understanding-mcp-protocol-versions).

## How to use the catalog

Each rule records which specification owns the requirement, which protocol
revisions it applies to, and where the requirement comes from.

The catalog
helps users and tools identify whether a problem concerns MCP structures,
embedded JSON Schema, or MCP Description semantics.

Each rule has a permanent identifier, such as `mcp.tool-annotations.members`.
Utility tools can use this identifier to refer to a particular rule and trace provenance in a diagnostic.

Each record also has a short `title`, a precise requirement `summary`, and a
reader-oriented `description`. Titles help you scan the catalog; descriptions
explain what a check means and how to address it. They do not replace the
specification requirements.

A diagnostic carries both a `rule` and a `code`. The `rule` identifies the
requirement. The `code` names the kind of failure and can be shared by several
rules: every JSON Schema failure of the document, for example, has the code
`schema-validation`, whichever rule it belongs to.

To act on a diagnostic:

1. Find the diagnostic's `rule` identifier in the catalog.
2. Check the diagnostic's severity and the rule's protocol-revision
   applicability.
3. Read the requirement, its source references, and the rule's examples.
4. Correct the document and validate it again.

Errors make a document invalid; warnings do not:

- **Error:** a Tool annotation contains `audience`, which Tool Annotations do
  not define. See the [worked example](#worked-example) below.
- **Warning:** an example result contains `vendorTrace`, which its MCP
  revision does not define but the open result type permits. The document
  remains valid, and the field is preserved without assigning it protocol
  meaning. See the complete
  [warning fixture](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-warning/open-result-unknown-properties.json)
  and rule `mcp.result.additional-properties.preserve` in
  [`rules/result.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/result.yaml).

### Guarantees that tools must uphold

Not every rule reports a problem with your document. Some describe guarantees
that tools must uphold, such as retaining custom keywords in embedded schemas.
These are checked by conformance tests rather than reported as document errors
or warnings.

For example, `mcp.tool.schema-keywords.preserve` in
[`rules/tool.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/tool.yaml) requires tools to retain custom keywords
such as `x-example-field-id` in an embedded Tool schema:

```json
{
  "type": "object",
  "properties": {
    "account": { "type": "string", "x-example-field-id": 123 }
  }
}
```

This is a schema fragment, not a complete MCP Description document. The custom
keyword does not itself cause an error or warning. If a tool silently discards
it, that is an implementation defect, not a mistake by the document author.
Recognized JSON Schema keywords such as `type` still have their normal meaning.
The complete
[custom-keywords fixture](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/custom-tool-schema-keywords.json)
illustrates this guarantee.

### Checks performed by other operations

Some rules are checked outside document validation. For example, native MCP
projection checks that the projected value validates against the MCP schema for
the requested revision. A failure is reported by the projection operation,
not by the document validator. The catalog calls these checks *delegated*;
see [`rules/projection.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/projection.yaml).

### Worked example

The fixture
[`expected-invalid/tool-annotations-unknown-property.json`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-invalid/tool-annotations-unknown-property.json)
is a complete document declaring a Tool for MCP 2025-11-25. Its Tool
annotations are:

```json
{ "readOnlyHint": true, "audience": ["user"] }
```

The candidate validator reports:

```json
{
  "code": "schema-validation",
  "severity": "error",
  "message": "does not validate against 0.9.0: /tools/0/annotations must NOT have additional properties",
  "path": ["tools", 0, "annotations", "audience"],
  "rule": "mcp.tool-annotations.members"
}
```

1. The rule is recorded in [`rules/annotations.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/rules/annotations.yaml):
   a Tool annotations object contains only `title`, `readOnlyHint`,
   `destructiveHint`, `idempotentHint`, and `openWorldHint`.
2. The severity is `error`, so the document is invalid. The rule applies from
   MCP 2025-03-26, the first revision with Tool annotations, so it applies to
   this Tool.
3. The requirement is in [Section 9.6](/docs/specification/0.9.0-draft.3/tools#req-tool-annotations-closed),
   and the source is MCP's `ToolAnnotations` type, which is closed in every
   revision. `audience` belongs to Resource Annotations (Section 10.3); the
   fixture
   [`expected-valid/distinct-tool-and-resource-annotations.json`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/fixtures/expected-valid/distinct-tool-and-resource-annotations.json)
   shows both kinds side by side.
4. Removing `audience` from the Tool annotations makes the document valid;
   validating it again reports no diagnostics.

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
Draft 3 catalog and rule-format `1.0.0` endpoints are publication targets until
deployment is verified; this working tree does not imply they are live. See
[catalog publication and discovery](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.3/spec/draft/validation/README.md#catalog-publication-and-discovery).

Every diagnostic of this repository's candidate validator identifies a
registered rule. Published prereleases implement the registry and native MCP
projection for Community Working Draft 1 (`0.9.0-draft.1`), when that selector
is passed explicitly:

- [`@mcpdesc/validator@0.14.0-rc.1`](https://www.npmjs.com/package/@mcpdesc/validator/v/0.14.0-rc.1)
  reports the `rule` of each diagnostic.
- [`@mcpdesc/core@0.13.0-rc.1`](https://www.npmjs.com/package/@mcpdesc/core/v/0.13.0-rc.1)
  implements native MCP projection, tested against the specification's
  projection fixtures.

Both are prereleases, not stable releases. Install them by exact version: the
npm `next` dist-tag moves to later prereleases. Support for later drafts
follows in later releases.

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
