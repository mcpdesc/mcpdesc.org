---
title: 'MCP Description 0.9: Building a stronger foundation for MCP interoperability'
listTitle: 'MCP Description 0.9 builds a stronger foundation for MCP interoperability'
description: 'MCP Description 0.9 brings version-aware validation and native MCP projection to a portable format for describing servers.'
date: 2026-11-16
author: Stève Sfartz
draft: false
---

MCP servers can support more than one generation of the protocol. A Tool's fields and constraints may differ from one MCP revision to another, and a description that ignores those differences can be ambiguous or invalid.

MCP Description 0.9 addresses that challenge. It strengthens the relationship between an independently versioned description format and the MCP-native structures it describes, and makes that relationship visible in validation and developer tooling.

The result is a more dependable foundation for describing MCP servers across protocol revisions, checking descriptions against applicable requirements, and producing native MCP values for existing tools.

## Feedback that shaped the direction

The work grew from both ecosystem feedback and a concrete conformance defect. In a community discussion, [@ivangsa](https://github.com/ivangsa) asked why MCP Description defined its own Tool, Resource, and Prompt structures rather than building more directly on MCP's published definitions. The discussion led to [Issue #72](https://github.com/mcpdesc/mcpdesc-specification/issues/72), which also tracked a mismatch involving the meaning of `x-mcp-header` across protocol revisions.

The architectural principle that emerged is straightforward: MCP Description defines its own document and description semantics, while the applicable MCP revision remains the structural baseline for MCP-native values. Embedded input and output schemas are governed by their JSON Schema dialect and by MCP semantics that apply to that revision.

Thank you to @ivangsa for the thoughtful challenge and detailed feedback. It helped turn a useful question into a clearer direction for the format and its tooling.

## One description, multiple MCP generations

MCP Description 0.9 supports five MCP protocol revisions, from `2024-11-05` through `2026-07-28`. A single document can describe shared server metadata alongside declarations scoped to the revisions where they apply.

That distinction matters in practice. For MCP `2025-11-25`, a Tool's `outputSchema` must have an object root. MCP `2026-07-28` permits any JSON Schema root. A server that returns different shapes across those revisions can describe separate, version-scoped variants instead of forcing one declaration to mean two things.

![Five MCP protocol revisions supported by one MCP Description 0.9 document, with declarations checked in their effective version scope.](/img/mcpdesc-09-multiversion.svg)

*The supported revisions introduce different structures and requirements. A declaration's effective scope determines which rules apply.*

The MCP Description format version, the MCP protocol revision, and the requirements that apply to each are distinct. A validator has to consider all three. The [protocol-version guide](/docs/specification/0.9.0/guides/understanding-mcp-protocol-versions/) compares the supported revisions and explains scope inheritance.

## Validation with traceable requirements

Version-aware validation is more than checking a document against one JSON Schema. A document can be structurally valid but still describe a declaration that violates the requirements of one MCP revision it claims to support.

The 0.9.0 [Validation Rules Catalog](/docs/rules/0.9.0/) organizes 85 rules by requirement owner: 46 MCP rules, 38 MCP Description rules, and one JSON Schema rule. Each rule records its provenance, applicability, and conformance fixtures. This makes it possible to connect a finding to the requirement it represents, rather than relying only on an implementation-specific message.

![MCP, MCP Description, and JSON Schema requirements feed the 85-rule catalog used for version-aware validation.](/img/mcpdesc-09-validation-architecture.svg)

*The catalog separates requirement sources and provides the context for rule-level results.*

The validator can report diagnostics with rule identifiers, locations, severity, and applicable protocol versions. It also distinguishes passed, failed, warning, not-applicable, and not-evaluated results. A check that was not applicable or not evaluated is not a passed check.

These distinctions make results easier to understand, but they do not imply exhaustive semantic conformance for every historical MCP revision. MCP `2024-11-05` and `2025-03-26` have documented validation limits: they receive structural and selected checks, not a claim of complete MCP semantic conformance. The catalog and the [validation guide](/docs/specification/0.9.0/guides/understanding-mcp-protocol-versions/#what-validation-checks) make that scope explicit.

## From a description to native MCP

An **Effective Protocol View** and a **native MCP projection** solve different problems. An Effective Protocol View selects one MCP revision and returns an MCP Description document, preserving its description metadata. Native projection takes an applicable declaration and produces the corresponding MCP-native Tool, Resource, Resource Template, or Prompt value.

For native projection, the operation selects the declaration for a protocol revision, resolves component references, removes description-only fields, and checks the result against the pinned MCP schema for that revision. The output is the native value itself, not a JSON-RPC envelope or a live server response.

For example, `@mcpdesc/core` can project a Tool from a parsed 0.9.0 document:

```js
import { projectMcpNativeValue } from '@mcpdesc/core';
import { parseMcpDescriptionSource } from '@mcpdesc/core/documents';

const parsed = parseMcpDescriptionSource(yamlText);
if (!parsed.ok) {
  throw new Error(parsed.diagnostics[0]?.message ?? 'Could not parse the document');
}

const projected = projectMcpNativeValue(parsed.value, {
  selector: '0.9.0',
  protocolVersion: '2026-07-28',
  kind: 'tool',
  identifier: 'lookup',
});

if (!projected.ok) {
  throw new Error(projected.diagnostics[0]?.message ?? 'Could not project the Tool');
}

console.log(projected.value);
```

This boundary lets other MCP tooling consume native declarations without treating MCP Description as a replacement for MCP itself. See [Relationship to MCP Primitive Schemas](/docs/specification/0.9.0/guides/relationship-to-mcp-schemas/) for the specification details.

## The tools are ready, too

The release is available through the project's developer tools:

- [`@mcpdesc/core`](https://www.npmjs.com/package/@mcpdesc/core) provides parsing, conversion from 0.8.0 to 0.9.0, Effective Protocol Views, and native MCP projection.
- [`@mcpdesc/validator`](https://www.npmjs.com/package/@mcpdesc/validator) validates structure and semantics against the selected rules and applicable protocol revisions.
- The [MCP Description Editor v3](https://github.com/cisco-open/mcptoolkit-editor) supports 0.9.0, including validation, native MCP export, and help migrating 0.8.0 documents. The hosted [Live Editor](https://editor.mcpdesc.org/) has also been migrated to support 0.9.0.
- [`mcpcontract` CLI 2.2.1](https://www.npmjs.com/package/@cisco-open/mcptoolkit-contract/v/2.2.1) is available for teams using the command-line workflow.

Core's 0.8.0-to-0.9.0 conversion is explicit. It reports incompatibilities that need an author's decision instead of guessing how to rewrite ambiguous values. The [migration guide](/docs/specification/0.9.0/guides/migration-0.8-to-0.9/) describes the process.

Try the [Live Editor](https://editor.mcpdesc.org/) or explore the [MCP Description 0.9.0 specification](/docs/specification/0.9.0/).

## Areas to explore next

Version 0.9 establishes a foundation; it does not make every possible MCP workflow available today. Topics for further exploration include describing authorization at the primitive level, documenting emerging capabilities such as [MCP Apps](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/seps/1865-mcp-apps-interactive-user-interfaces-for-mcp.md) and [Skills over MCP](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/seps/2640-skills-extension.md), and improving CI/CD examples for detecting meaningful description changes. These are exploratory directions, not release commitments.

We are also encouraged by independent ecosystem work. [ArgWitness](https://github.com/GenRamzi/argwitness) by @GenRamzi is an independent tool that supports MCP Description alongside native MCP, OpenAI, and Anthropic tool schemas for offline contract-regression analysis. It is not part of MCP Description 0.9 or an official project component; it is a useful example of ecosystem experimentation.

## Help shape what comes next

The `{mcpdesc}` project is an independent open source initiative promoting a portable, machine-readable description format for MCP servers. MCP Description 0.9 reflects how community questions and implementation experience can sharpen that work.

If you build MCP servers or tools, try describing a real server with multiple protocol revisions. Tell us what was clear, what was difficult to express, and where a static description could help in your workflow.

- [Read the 0.9.0 specification](/docs/specification/0.9.0/)
- [Try the Live Editor](https://editor.mcpdesc.org/)
- [Browse the Validation Rules Catalog](/docs/rules/0.9.0/)
- [Join the community discussions](https://github.com/orgs/mcpdesc/discussions)