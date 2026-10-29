---
title: Validation Rules
description: Validation rules and troubleshooting for MCP Description 0.9.0-draft.2.
slug: docs/rules/0.9.0-draft.2
sidebar:
  label: Overview
  order: 0
---

Validation rules explain the checks used to determine whether an MCP
Description document is valid and identify issues that need attention.

## What validation rules cover

A document can have problems in three areas:

- **MCP:** the described tools, resources, prompts, capabilities, or carried
  MCP values do not meet the requirements of the applicable MCP protocol
  revision.
- **JSON Schema:** an embedded Tool input or output schema is not valid under
  its applicable JSON Schema dialect.
- **MCP Description:** complementary description fields, protocol scoping,
  references, or examples do not meet MCP Description requirements.

The catalog groups rules by these three owners, recorded in each rule as
`mcp`, `json-schema`, and `mcpdesc`. A single Tool declaration can involve
rules from all three groups: its MCP fields and annotations follow MCP rules,
its `inputSchema` must be valid JSON Schema, and its protocol scope follows MCP
Description rules. Its examples are checked against MCP's result types and
against MCP Description's example rules.

## Why explicit validation rules?

MCP Description provides static descriptions of MCP servers across the MCP
protocol revisions that a specification version supports; for 0.9.0, MCP
2024-11-05 through 2026-07-28. The same field can be required in one revision,
undefined in another, and governed by a JSON Schema dialect rather than by MCP.
A validation failure without that context does not tell an author what to fix.

Each rule records which specification owns the requirement, which protocol
revisions it applies to, and where the requirement comes from. The catalog
helps users and tools identify whether a problem concerns MCP structures,
embedded JSON Schema, or MCP Description semantics.

Each rule has a permanent identifier, such as `mcp.tool-annotations.members`.
Tools can use it to refer to the same rule and trace its provenance. An
identifier does not guarantee that different tools implement the same coverage,
use the same diagnostic wording, or behave identically.

A diagnostic carries both a `rule` and a `code`. The `rule` identifies the
requirement. The `code` names the kind of failure and can be shared by several
rules: every JSON Schema failure of the document, for example, has the code
`schema-validation`, whichever rule it belongs to.

## How to use the catalog

To act on a diagnostic:

1. Find the diagnostic's `rule` identifier in the catalog.
2. Check the diagnostic's severity and the rule's protocol-revision
   applicability.
3. Read the requirement, its source references, and the rule's examples.
4. Correct the document and validate it again.

Errors make a document invalid; warnings do not. Some rule records need not
emit a diagnostic themselves: a preservation rule, such as
`mcp.tool.schema-keywords.preserve`, documents values that validators keep
without interpreting them, and delegated rules, such as the native projection
rules, are checked by other tools rather than by the validator.

### Worked example

The fixture
[`expected-invalid/tool-annotations-unknown-property.json`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-invalid/tool-annotations-unknown-property.json)
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

1. The rule is recorded in [`rules/annotations.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/rules/annotations.yaml):
   a Tool annotations object contains only `title`, `readOnlyHint`,
   `destructiveHint`, `idempotentHint`, and `openWorldHint`.
2. The severity is `error`, so the document is invalid. The rule applies from
   MCP 2025-03-26, the first revision with Tool annotations, so it applies to
   this Tool.
3. The requirement is in [Section 9.6](/docs/specification/0.9.0-draft.2/tools#req-tool-annotations-closed),
   and the source is MCP's `ToolAnnotations` type, which is closed in every
   revision. `audience` belongs to Resource Annotations (Section 10.3); the
   fixture
   [`expected-valid/distinct-tool-and-resource-annotations.json`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/fixtures/expected-valid/distinct-tool-and-resource-annotations.json)
   shows both kinds side by side.
4. Removing `audience` from the Tool annotations makes the document valid;
   validating it again reports no diagnostics.

## Status and scope

The normative requirements are those of the specification sections. The rule
catalog is a pilot registry implementing review-stage
[Proposal 0024](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/proposal-snapshots/0024-validation-rule-identity-and-provenance.md),
which has not been accepted. The registry is non-normative: it documents and
tests the requirements, and is not a separate conformance specification.

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

- [MCP revision guide](/docs/rules/0.9.0-draft.2/revisions)

:::note[Mirrored overview]
This overview mirrors the marked excerpt in [the source README](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft/validation/README.md)
at immutable tag [`v0.9.0-draft.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.2/spec/draft). Upstream wins if this copy differs.
:::
