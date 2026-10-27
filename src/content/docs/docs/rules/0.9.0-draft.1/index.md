---
title: Validation Rules 0.9.0-draft.1
description: Validation rule registry and protocol revision guidance for MCP Description 0.9.0-draft.1.
slug: docs/rules/0.9.0-draft.1
sidebar:
  label: Overview
  order: 0
---

These versioned pages document the validation rule registry published with [`v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft). Select the rules attached to a specification version; this set describes the 0.9.0 working draft, not stable 0.8.0.

:::caution[Working draft registry]
This is a pilot registry implementing review-stage Proposal 0024. Its contents are non-normative until the proposal is accepted. Rule records explain ownership, applicability, evidence, and fixtures; they are not a separate conformance specification.
:::

## Implementation status

The prerelease [`@mcpdesc/validator` 0.14.0-rc.1](https://www.npmjs.com/package/@mcpdesc/validator/v/0.14.0-rc.1) supports the rule registry. Native MCP projections are supported by the prerelease [`@mcpdesc/core` 0.13.0-rc.1](https://www.npmjs.com/package/@mcpdesc/core/v/0.13.0-rc.1). Both are npm `next` releases, not stable releases.

## Rule ownership

A rule has one owner: MCP protocol requirements, MCP Description requirements, or an embedded standard such as JSON Schema. The owner determines the authority for the behavior; external sources provide evidence and are ranked by source tier.

- [MCP Rules](/docs/rules/0.9.0-draft.1/mcp/) — 37 rules.
- [MCP Description Rules](/docs/rules/0.9.0-draft.1/mcpdesc/) — 23 rules.
- [JSON Schema Rules](/docs/rules/0.9.0-draft.1/json-schema/) — 1 rules.

## Rule identity and diagnostics

Each rule has a permanent identifier. Diagnostics use `code` for the detected condition and `rule` for the requirement that the rule checks. A code can be shared by multiple rules.

```json
{
  "code": "schema-validation",
  "severity": "error",
  "message": "inputSchema must have an object root",
  "path": ["tools", 0, "inputSchema"],
  "rule": "mcp.tool.input-schema.object-root"
}
```

## Requirements and severity

The optional `requirement` field records the source requirement level (`must`, `should`, or `may`); it is distinct from diagnostic severity. Diagnostics declare `error` or `warning` severity. The source protocol revision determines how requirement levels are interpreted.

## Protocol revision applicability

MCP structures can differ by protocol revision. Each rule records its applicability across the five revisions listed in the [revision guide](/docs/rules/0.9.0-draft.1/revisions); an absent value is not inferred.

## Arbitrations, gaps, and fixtures

Arbitrations document conflicts in authority and the selected behavior; proposed arbitrations are unresolved. Gaps identify known differences from validator behavior. Fixture examples link to the immutable source tag and show the fragment selected by each JSON Pointer. Warning fixtures are labeled as accepted with a warning.

## Source

Canonical source: [`mcpdesc/mcpdesc-specification` at `v0.9.0-draft.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft). The pinned MCP schema source manifest is [available here](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/mcp-schemas/manifest.json).

## MCP revision guide

Read the [versioned revision guide](/docs/rules/0.9.0-draft.1/revisions) or [view its source at the tag](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/mcp-revisions.md).

## Rule records

The [rule JSON Schema](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-draft.1/spec/draft/validation/rule.schema.json) defines the registry fields. 61 rules are grouped into three owner-specific rulesets.
