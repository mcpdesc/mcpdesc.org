<!-- mcpdesc-spec version=0.9.0-rc.3 maturity=release-candidate channel=candidate date=2026-11-07 -->

# MCP Description Specification — v0.9.0-rc.3

**Version:** 0.9.0-rc.3 · **Maturity:** release-candidate · **Date:** 2026-11-07

> Complete MCP Description specification (all sections) as a single Markdown file,
> for one-request retrieval by AI assistants and build tools.
>
> Versioned source: https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/mcp-description.md
> Raw Markdown: https://raw.githubusercontent.com/mcpdesc/mcpdesc-specification/v0.9.0-rc.3/spec/draft/mcp-description.md
> JSON Schema: https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json
> Version index (machine-readable): https://mcpdesc.org/specification/index.json
>
> This first-party copy mirrors the versioned section pages at
> https://mcpdesc.org/docs/specification/0.9.0-rc.3/. Where it differs from the versioned
> source above, the versioned source wins.

---

> **Release candidate**
>
> MCP Description **0.9.0 RC.3** is a release candidate, not a stable release. It may change
> before final release. Use [0.8.0](https://mcpdesc.org/docs/specification/0.8.0/) for the current stable
> specification.

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
[union-aware, source-located diagnostics](https://mcpdesc.org/docs/specification/0.9.0-rc.3/conformance#165-validation-results).
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

> **One intentional acceptance change**
>
> Elicitation Interaction Response Objects in Tool Interaction Examples now reject unknown
> members that RC.2 allowed. This change does **not** apply to native MCP responses at runtime.
> Other union changes are intended to preserve RC.2 document acceptance.

Read the [0.8.0-to-0.9.0 migration guide](https://mcpdesc.org/docs/specification/0.9.0-rc.3/guides/migration-0.8-to-0.9),
including [RC.3 diagnostic migration](https://mcpdesc.org/docs/specification/0.9.0-rc.3/guides/migration-0.8-to-0.9#union-aware-diagnostics-in-rc3),
for compatibility details. The cumulative candidate also retains protocol-version-scoped
validation, Effective Protocol Views, merge and conversion profiles, and the non-semantic
[document ordering profile](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-ordering).
The proposals implemented by this candidate remain under review.

## Source and schemas

- **Canonical source** - [`spec/draft/mcp-description.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/mcp-description.md)
- **Immutable source tag** - [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.3/spec/draft)
- **MCP Description JSON Schema** - [`0.9.0-rc.3.json`](https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json)
- **Validation rule schema** - [`validation-rule/1.3.0.json`](https://mcpdesc.org/schema/validation-rule/1.3.0.json)
- **Validation result schema** - [`validation-result/1.4.0.json`](https://mcpdesc.org/schema/validation-result/1.4.0.json)
- **Companion guides** - [RC.3 guides](https://mcpdesc.org/docs/specification/0.9.0-rc.3/guides/)
- **How validation works** - [Protocol-version validation, views, and projection](https://mcpdesc.org/docs/specification/0.9.0-rc.3/guides/understanding-mcp-protocol-versions)
- **Validation Rules** - [Catalog and troubleshooting](https://mcpdesc.org/docs/rules/0.9.0-rc.3/)
- **Upstream changelog** - [RC.3 changes](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/CHANGELOG.md)
- **Validation result changelog** - [Format 1.4.0](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/result-format-changelog.md)
- **Feedback** - [Discuss the release candidate or report an issue](https://github.com/mcpdesc/mcpdesc-specification/issues)


### For AI assistants and tools

- **Complete specification, single file** - [`/specification/0.9.0-rc.3/mcpdesc.md`](https://mcpdesc.org/specification/0.9.0-rc.3/mcpdesc.md)
- **Version index** - [`/specification/index.json`](https://mcpdesc.org/specification/index.json), including
  stable and candidate channels and their canonical source and schema URLs
- **Validation rule catalog** - [`manifest.json`](https://mcpdesc.org/validation/catalogs/0.9.0-rc.3/manifest.json)
  for the 85 rules in [`rules.json`](https://mcpdesc.org/validation/catalogs/0.9.0-rc.3/rules.json), with
  hash-pinned rule and result schemas; published catalogs are listed in the
  [catalog index](https://mcpdesc.org/validation/catalogs/index.json)

---

## 1. Introduction

### 1.1 Purpose

The MCP Description Specification defines a standard format for describing the capabilities of a Model Context Protocol (MCP) server as a static, curated document.

The MCP ecosystem supports runtime discovery and capability inspection. While effective for dynamic interactions, runtime discovery alone limits offline tooling, cross-platform interoperability, design review, and governance workflows.

This specification addresses these limitations by providing a portable description format for MCP servers, analogous to the descriptive role OpenAPI plays for HTTP APIs.

### 1.2 Goals

An MCP Description document enables:

- **Standardized server descriptions** — a consistent structure for declaring server metadata, transports, tools, resources, prompts, and capabilities.
- **Offline discoverability** — platforms can index and display server capabilities without establishing a runtime connection.
- **Tooling interoperability** — documentation generators, testing frameworks, agent discovery tools, IDE integrations, and governance platforms can operate on a common format.
- **Description-driven development** — teams can define, review, and validate MCP server surfaces before deployment.

### 1.3 Audience

This specification is intended for:

- MCP server developers who publish capability descriptions
- MCP client and agent developers who consume server descriptions
- Platform developers building registries, documentation portals, and governance tools
- Tool authors creating validators, generators, and IDE integrations

### 1.4 Relationship to the MCP Protocol

The MCP Description Specification does **not** replace the MCP protocol. It complements the protocol by providing a static description format for server capabilities.

| MCP Protocol | MCP Description |
|---|---|
| Runtime communication | Static declaration |
| Discovery and runtime metadata | Server metadata and declared protocol coverage |
| Tool invocation | Tool definitions |
| Resource fetching | Resource definitions |

The MCP protocol defines runtime communication and behavior. An MCP Description statically represents durable, externally relevant server semantics without reproducing MCP wire choreography.

### 1.5 Scope

This specification defines:

- The structure and semantics of an MCP Description document
- JSON Schema validation rules for MCP Description documents
- The specification extension mechanism for vendor-specific metadata

This specification does NOT define:

- The MCP protocol itself
- Runtime behavior of MCP servers or clients
- The content or structure of vendor extensions (these are defined independently by extension authors)

---

## 2. Terminology

### 2.1 Key Words

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

### 2.2 Definitions

**MCP Description Document**
A document conforming to this specification that describes an MCP server surface as the JSON-compatible data model defined in Section 3.1, serialized as conforming JSON or YAML.

**Server Surface**
The durable, externally relevant characteristics and behavior of an MCP server that MCP Description can represent, including transports, instructions, security requirements, capabilities, primitives, schemas, and applicable extensions.

**Described Server Surface**
The server surface represented by an MCP Description Document. It is not necessarily exhaustive of everything implemented or available in every runtime context.

**Effective Protocol View**
The projection of an MCP Description Document containing the declarations applicable to one MCP protocol version.

**MCP Server**
A server implementing the Model Context Protocol, exposing tools, resources, and/or prompts to MCP clients.

**MCP Client**
An application that connects to an MCP server using the MCP protocol.

**Tool**
A server-side function that an MCP client can invoke with structured input parameters and receive structured output.

**Resource**
A server-side data source identified by a URI that an MCP client can read.

**Resource Template**
A parameterized resource definition using a URI template (RFC 6570) that can produce resource URIs when template variables are provided.

**Prompt**
A server-side prompt template that an MCP client can invoke with arguments to generate messages.

**Transport**
The communication mechanism used to connect to an MCP server (e.g., stdio, streamable-http, SSE).

**Specification Extension**
A property in an MCP Description document whose name begins with `x-` that provides vendor-specific metadata outside the core specification.

**Capability**
A feature or behavior supported by an MCP server, declared in a Capabilities Object.

**Protocol Applicability**
The MCP protocol versions to which a declaration applies, determined from its effective protocol scope.

**Security Requirement**
A declaration of one or more named security schemes and, where applicable, authorization scopes that must be satisfied to access a transport or primitive.

### 2.3 Normative and Informative Content

The requirements in this document and the versioned JSON Schema are normative. They jointly define conformance; an inconsistency between them is a specification defect.

Examples, code excerpts, guides, and other companion documents are informative unless explicitly identified as normative. A complete example presented as valid is expected to conform, but it does not create requirements or override normative text or schema constraints.

Repository fixtures are test artifacts rather than independent sources of requirements. Their directory identifies whether the repository validator expects them to be valid, invalid, or valid with warnings. If a fixture conflicts with the specification, the fixture or implementation must be corrected.

The section sources contain invisible anchors of the form `req-<topic>` before requirement sentences. Validation rules cite them to identify the requirement they check (see [`validation/README.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/README.md#rule-records)). Anchors are informative markup: they do not create, change, or rank requirements.

---

## 3. Document Structure

### 3.1 Format

An MCP Description document is a JSON-compatible data model composed only of objects whose property names are strings, arrays, strings, finite JSON numbers, booleans, and null. Its semantic meaning is defined by this data model independently of whether it is serialized as JSON or YAML.

<a id="req-conforming-serialization"></a> <span class="mcpdesc-rule-links" data-anchor="req-conforming-serialization" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-conforming-serialization&gt;</code></a></small></span> An MCP Description document MUST use one of the conforming serializations defined in Section 15. JSON and restricted YAML are equally conforming serializations; neither has greater semantic or conformance status.

Property ordering is not significant unless an individual field explicitly defines array ordering semantics. <a id="req-serialization-order"></a>Mapping serialization order MUST NOT affect conformance.

Section 18 defines a recommended presentation order for producers; it does not change this rule.

### 3.2 Root Object

<a id="req-root-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-root-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-root-fields&gt;</code></a></small></span> The root of an MCP Description document is an object with the following structure:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `$schema` | string | No | JSON Schema reference for IDE validation |
| `mcpdesc` | string | **Yes** | Specification version (`"0.9.0"`) |
| `info` | [Info Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/info-object) | **Yes** | Server metadata |
| `protocolVersions` | array\<string\> | **Yes** | MCP protocol versions described by the document |
| `instructions` | string | No | Durable natural-language guidance for using the server |
| `transports` | non-empty array\<[Transport Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/transports)\> | No | Declared transports |
| `securitySchemes` | non-empty map\<string, [Security Scheme Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#72-security-scheme-object)\> | No | Reusable named security schemes |
| `security` | [Security Requirement Array](https://mcpdesc.org/docs/specification/0.9.0-rc.3/security#73-security-requirement-array) | No | Default security requirements |
| `components` | [Components Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components#171-components-object) | No | Reusable schemas and named primitive examples |
| `capabilities` | non-empty array\<[Capabilities Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/capabilities)\> | No | Protocol-scoped server capability declarations |
| `tools` | non-empty array\<[Tool Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools)\> | No | Tools declared by the document |
| `resources` | non-empty array\<[Resource Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#1011-resource-object)\> | No | Resources declared by the document |
| `resourceTemplates` | non-empty array\<[Resource Template Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#1021-resource-template-object)\> | No | Resource templates declared by the document |
| `prompts` | non-empty array\<[Prompt Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts)\> | No | Prompts declared by the document |
| `tags` | non-empty array\<[Tag Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags)\> | No | Document-wide flat tag catalogue for primitive categorization |

The optional `$schema` property selects a JSON Schema resource for structural validation and editor tooling. It does not replace the required `mcpdesc` format discriminator or the document's declared MCP protocol coverage.

### 3.3 Optional Sections and Ordinary Collections

Only `mcpdesc`, `info`, and non-empty `protocolVersions` are required at the document root. Omission of any optional section means that the document makes no declaration for that section.

<a id="req-omission-not-absence"></a>Unless a property's definition explicitly states otherwise, omission MUST NOT be interpreted as proof that the server does not support, expose, or use the corresponding runtime behavior.

<a id="req-ordinary-collections-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-ordinary-collections-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-ordinary-collections-non-empty&gt;</code></a></small></span> An optional ordinary declaration collection MUST contain at least one entry when present.

<a id="req-ordinary-collections-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-ordinary-collections-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-ordinary-collections-omitted&gt;</code></a></small></span> A producer MUST omit such a property when it has no entries, and a consumer MUST reject a present empty collection.

This rule applies to root `transports`, `securitySchemes`, `capabilities`, `tools`, `resources`, `resourceTemplates`, `prompts`, and `tags`; the outer `components` object and each present component namespace map; icon, primitive tag-reference, Elicitation Declaration, Prompt Argument, and extension-capability collections; named Tool, Resource, Resource Template, and Prompt example maps; and Prompt and Resource Template `completionExamples` maps.

It does not constrain embedded JSON Schemas, specification-extension values, arbitrary literal example values, transport invocation values, or protocol-native content and annotation collections, which follow their own rules.

An empty collection remains valid when its property definition assigns distinct semantics to emptiness. <a id="req-security-empties-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-empties-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-security-empties-preserved&gt;</code></a></small></span> In particular, implementations MUST preserve `security: []`, `security: [{}]`, and empty scope arrays in Security Requirement Objects.

### 3.4 Zero-Primitive Descriptions

A document MAY omit all of `tools`, `resources`, `resourceTemplates`, and `prompts`. Such a document can describe a server under development, a legitimately empty server, or an authorization-scoped observation.

<a id="req-primitive-absence"></a>Absence of a primitive collection MUST NOT be interpreted as proof that no other runtime context exposes primitives of that kind.

### 3.5 MCP `_meta`

The `_meta` property allows additional metadata to be attached to a Tool, Resource, Resource Template, or Prompt declaration, and to supported result, content, Tool Interaction step response, and root objects in named examples. <a id="req-meta-protocol-version-availability"></a> <span class="mcpdesc-rule-links" data-anchor="req-meta-protocol-version-availability" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/root-meta-protocol-version#required-by" title="This requirement is part of rule: mcp.root.meta.protocol-version"><code>&lt;req-meta-protocol-version-availability&gt;</code></a></small></span> It MAY appear only when every protocol version in the object's Effective Protocol View defines `_meta` for the corresponding MCP object.

Metadata in a named example describes only that example. It does not define a reusable metadata schema or require a server to send the same metadata.

<a id="req-meta-keys"></a> <span class="mcpdesc-rule-links" data-anchor="req-meta-keys" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/meta-key-format#required-by" title="This requirement is part of rule: mcp.meta.key-format"><code>&lt;req-meta-keys&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/meta-reserved-key-context#required-by" title="This requirement is part of rule: mcp.meta.reserved-key-context"><code>&lt;req-meta-keys&gt;</code></a></small></span> Each key name, its use, and the value of any reserved key MUST follow the rules of every applicable MCP protocol version. A recognized violation is a document-conformance error. <a id="req-meta-reserved-prefix"></a> <span class="mcpdesc-rule-links" data-anchor="req-meta-reserved-prefix" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/meta-reserved-prefix#required-by" title="This requirement is part of rule: mcp.meta.reserved-prefix"><code>&lt;req-meta-reserved-prefix&gt;</code></a></small></span> A valid but unrecognized key under an MCP-reserved prefix MUST be preserved and SHOULD produce a warning. Other valid keys MUST be accepted and preserved. A protocol-version projection MUST preserve `_meta` and MUST NOT combine metadata from variants that cover different protocol versions.


### 3.6 Carried MCP Values

Named examples carry MCP values: Tool Example and Tool Interaction Example `result`, Tool Interaction step `response` values for sampling, elicitation, and roots, Resource and Resource Template Example `result`, Prompt Example `result`, and completion example `result`, including values reached through component references. A carried value is validated for every MCP protocol version in the containing declaration's effective protocol scope, using the type that protocol version defines for it. A type accepts fields it does not list only if its definition in the protocol version's TypeScript schema declares or inherits an index signature; such a type is open, and every other type is closed. <a id="req-mcp-integer-numbers"></a> <span class="mcpdesc-rule-links" data-anchor="req-mcp-integer-numbers" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/cacheable-result-ttl-ms#required-by" title="This requirement is part of rule: mcp.cacheable-result.ttl-ms"><code>&lt;req-mcp-integer-numbers&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/resource-size#required-by" title="This requirement is part of rule: mcp.resource.size"><code>&lt;req-mcp-integer-numbers&gt;</code></a></small></span> A field that the protocol version's TypeScript schema declares as `number` is an integer unless the schema annotates it `@TJS-type number`, as in the JSON Schema that MCP generates from it.

For each applicable protocol version and each field of a carried value:

1. <a id="req-carried-defined-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-carried-defined-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/content-members#required-by" title="This requirement is part of rule: mcp.content.members"><code>&lt;req-carried-defined-fields&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-carried-defined-fields&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/interaction-message-members#required-by" title="This requirement is part of rule: mcp.interaction-message.members"><code>&lt;req-carried-defined-fields&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-result-protocol-fidelity#required-by" title="This requirement is part of rule: mcpdesc.example.result.protocol-fidelity"><code>&lt;req-carried-defined-fields&gt;</code></a></small></span> A field that the protocol version defines MUST satisfy its type, and a field that the protocol version requires MUST be present.
2. <a id="req-carried-open-preserve"></a> <span class="mcpdesc-rule-links" data-anchor="req-carried-open-preserve" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/result-additional-properties-preserve#required-by" title="This requirement is part of rule: mcp.result.additional-properties.preserve"><code>&lt;req-carried-open-preserve&gt;</code></a></small></span> A field that the protocol version does not define, on a type that is open in that protocol version, MUST be accepted and preserved. Implementations MUST NOT apply the meaning that another protocol version gives the same name. Validators MUST report the warning `result-field-not-defined-by-version`, identifying the field and the protocol version.
3. <a id="req-carried-closed-reject"></a> <span class="mcpdesc-rule-links" data-anchor="req-carried-closed-reject" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/completion-result-closed#required-by" title="This requirement is part of rule: mcp.completion.result-closed"><code>&lt;req-carried-closed-reject&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/content-members#required-by" title="This requirement is part of rule: mcp.content.members"><code>&lt;req-carried-closed-reject&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/input-response-closed#required-by" title="This requirement is part of rule: mcp.input-response.closed"><code>&lt;req-carried-closed-reject&gt;</code></a></small></span> A field that the protocol version does not define, on a type that is closed in that protocol version, MUST be rejected.

JSON-RPC envelope fields and non-completed workflow fields are governed by the example rules of Sections 9.3, 9.4, 10.4, and 11 instead.

Every result type carried by examples extends the open MCP `Result` in every supported protocol version. Sampling, elicitation, and roots responses extend `Result` through MCP 2025-11-25; in MCP 2026-07-28 they are closed input responses, and only the sampling response defines `_meta`. <a id="req-carried-nested-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-carried-nested-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/completion-result-closed#required-by" title="This requirement is part of rule: mcp.completion.result-closed"><code>&lt;req-carried-nested-closed&gt;</code></a></small></span> Nested objects such as content blocks, resource contents, roots, and the `completion` object of a completion result are closed.

Example `result` values are completed results. <a id="req-completed-result-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-completed-result-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-completed-result-fields&gt;</code></a></small></span> When present, in every protocol version, `resultType` MUST be `"complete"`, `ttlMs` MUST be a non-negative integer, and `cacheScope` MUST be `"public"` or `"private"`.

A declaration covering several protocol versions MAY use one example map even when a field is defined by only some of them; authors MAY instead split the declaration into protocol-scoped variants to avoid the warnings. Because each warning is attributed to one protocol version, the warnings defined here for a document equal the union of those for its per-protocol-version Effective Protocol Views.

### 3.7 Property Ordering

Property ordering within objects is not significant. <a id="req-property-order"></a>Implementations MUST NOT depend on property or mapping serialization order.

### 3.8 Specification Extensions

Any property whose name matches the pattern `^x-` on the root or another eligible MCP Description-defined semantic object is a specification extension. See [Section 14: Specification Extensions](https://mcpdesc.org/docs/specification/0.9.0-rc.3/specification-extensions) for eligibility and exclusion rules.

### 3.9 Additional Properties

<a id="req-closed-objects"></a> <span class="mcpdesc-rule-links" data-anchor="req-closed-objects" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-closed-objects&gt;</code></a></small></span> Properties not defined in this specification and not matching the `x-` extension pattern MUST NOT appear on the root or another closed eligible semantic object. Implementations MUST reject such unknown properties. An `x-*` property does not make an otherwise ineligible object extensible.

### 3.10 Example

A minimal valid MCP Description document:

```json
{
  "$schema": "https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json",
  "mcpdesc": "0.9.0",
  "info": {
    "name": "chess-rating-server",
    "version": "1.0.0"
  },
  "protocolVersions": ["2026-07-28"]
}
```

This document makes no transport or primitive declaration. Those omissions do not assert runtime non-support.

---

## 4. Versioning

### 4.1 The `mcpdesc` Field

<a id="req-mcpdesc-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-mcpdesc-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-mcpdesc-required&gt;</code></a></small></span> Every MCP Description document MUST include a `mcpdesc` property at the root level. This property declares which version of this specification the document conforms to.

```json
{
  "mcpdesc": "0.9.0"
}
```

### 4.2 Version Format

<a id="req-mcpdesc-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-mcpdesc-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-mcpdesc-version&gt;</code></a></small></span> The `mcpdesc` value MUST identify the specification version against which conformance is assessed. This community working draft uses `"0.9.0"` and is not a stable release.

The specification uses [Semantic Versioning](https://semver.org/) for its own version numbers. Before 1.0.0, a minor release MAY contain breaking changes; after 1.0.0, ordinary Semantic Versioning compatibility rules apply.

- **Major** version changes indicate breaking changes to the document structure
- **Minor** version changes add features and, before 1.0.0, MAY include breaking changes
- **Patch** version changes address errata or clarifications without structural changes

### 4.3 Identifier Roles

The root `$schema` property, when present, identifies the JSON Schema resource against which the document's normalized JSON-compatible data model can be structurally validated. It does not replace the instance format discriminator.

```yaml
$schema: https://mcpdesc.org/schema/mcp-description/0.9.0.json
mcpdesc: 0.9.0
```

The root `$schema` property remains optional. <a id="req-schema-identifier-exact"></a>When present, it SHOULD identify the exact stable version or public draft snapshot used to produce or validate the document. Omitting `$schema` does not make an otherwise conforming document invalid; a validator MAY select an applicable bundled schema through its API, surrounding metadata, or explicit user configuration.

The schema document's root `$id` identifies that schema resource and establishes its base URI for JSON Schema reference resolution.

The `$schema` value does not change the MCP Description conformance version: community working draft documents remain `mcpdesc: 0.9.0`.

```yaml
$schema: https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json
mcpdesc: 0.9.0
```

The schema document's own `$schema` property identifies the JSON Schema dialect used to interpret the schema. MCP Description 0.9.0 schemas use `https://json-schema.org/draft/2020-12/schema`.

### 4.4 Canonical Schema URI Families

The project controls canonical schema URIs under:

```text
https://mcpdesc.org/schema/<format-family>/<version-or-snapshot>.json
```

This specification assigns `mcp-description` as the MCP Description format family. A stable release uses its semantic version, for example `https://mcpdesc.org/schema/mcp-description/0.8.0.json`. A public prerelease uses the target version followed by its prerelease identifier, for example `https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json`.

Assigning a new format family requires an accepted specification decision. Similar repository paths, redirects, or aliases do not create canonical format authority.

### 4.5 Unique and Immutable Schema Resources

<a id="req-schema-uri-immutable"></a>Every canonical schema URI MUST identify exactly one immutable sequence of schema bytes. A schema published at a canonical URI MUST declare that exact URI as its root `$id`.

<a id="req-schema-bytes-immutable"></a>Once publicly published, a canonical schema resource MUST NOT be replaced with different bytes, even to correct an error or non-normative description. Every byte change requires a new stable version, draft snapshot, or separately versioned errata resource according to the governing format's compatibility policy.

<a id="req-schema-prerelease-identity"></a>Every public prerelease of this version MUST use a prerelease-specific root `$id`. The stable 0.9.0 schema MUST use `https://mcpdesc.org/schema/mcp-description/0.9.0.json` and MUST NOT reuse a prerelease URI.

### 4.6 Live Publication and Aliases

<a id="req-schema-publication-http"></a>A canonical mcpdesc.org schema URI MUST use HTTPS, return HTTP 200 for `GET`, serve the exact immutable schema bytes directly without redirect, and return a syntactically valid JSON Schema document rather than an HTML fallback. The response MUST declare the request URI as the root `$id` and MUST be retrievable cross-origin for browser-hosted editors and tools.

<a id="req-schema-publication-headers"></a>Canonical responses MUST return a JSON-compatible media type and SHOULD use `application/schema+json`. They MUST return `Cache-Control` including `public`, `max-age=31536000`, and `immutable`, and SHOULD include a strong `ETag`.

The project MAY also publish mutable convenience aliases such as `https://mcpdesc.org/schema/mcp-description/latest.json` for the latest stable release and `https://mcpdesc.org/schema/mcp-description/draft.json` for the active community draft. <a id="req-schema-aliases"></a>An alias SHOULD redirect to its selected immutable canonical resource. An alias MUST NOT be declared as a schema `$id`, and normative examples SHOULD use immutable canonical URIs instead.

The repository file `schemas/latest.json` and, when an active draft exists, `schemas/draft.json` are version-status manifests rather than MCP Description JSON Schemas. <a id="req-schema-status-manifests"></a>They identify released or active-draft status for repository workflows and MUST NOT be treated as public schema identities.

### 4.7 Retrieval and Security Boundary

<a id="req-no-network-conformance"></a>MCP Description conformance MUST NOT require network retrieval. A validator MAY bundle known schema resources and resolve their canonical URIs locally.

<a id="req-schema-retrieval-policy"></a>Consumers MUST NOT automatically retrieve an arbitrary `$schema` URI from an untrusted document without an explicit network policy. Implementations that permit retrieval SHOULD restrict schemes and destinations, bound redirects and response sizes, validate media type and schema structure, and mitigate SSRF and cache-poisoning risks.

The `$schema` property assists structural schema selection and editor integration. It does not make a structurally valid document semantically conforming and does not supersede protocol-version or cross-object validation.

### 4.8 Version Compatibility

Implementations MAY support multiple MCP Description versions. <a id="req-version-support"></a>An implementation claiming support for a version MUST process its `mcpdesc` discriminator according to that version's requirements.

<a id="req-version-check"></a> <span class="mcpdesc-rule-links" data-anchor="req-version-check" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-version-check&gt;</code></a></small></span> When processing a document, implementations MUST check the `mcpdesc` value and:

- Accept documents with a recognized `mcpdesc` version
- Reject documents with an unrecognized `mcpdesc` version or provide a clear warning

### 4.9 MCP Protocol Coverage

The root `protocolVersions` array identifies the MCP protocol versions described by the document. <a id="req-protocol-versions-values"></a> <span class="mcpdesc-rule-links" data-anchor="req-protocol-versions-values" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-versions-values#required-by" title="This requirement is part of rule: mcpdesc.protocol-versions.values"><code>&lt;req-protocol-versions-values&gt;</code></a></small></span> It MUST be non-empty, MUST contain unique values, and every value MUST be one of:

- `2024-11-05`
- `2025-03-26`
- `2025-06-18`
- `2025-11-25`
- `2026-07-28`

An unknown or later MCP protocol version is invalid under mcpdesc 0.9.0 because this specification cannot validate its semantics. Supporting a later protocol version requires a later mcpdesc specification version.

Root coverage states which protocol versions the document describes. It does not prove that the server supports no other protocol versions.

### 4.10 Protocol Scopes and Inheritance

Transports, Capabilities Objects, Tools, Resources, Resource Templates, and Prompts MAY declare `protocolVersions`.

The root Info Object is unscoped, document-wide MCP Description metadata. <a id="req-info-unscoped"></a> <span class="mcpdesc-rule-links" data-anchor="req-info-unscoped" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-info-unscoped&gt;</code></a></small></span> Its properties are valid independently of root `protocolVersions` and MUST NOT be treated as protocol-scoped declarations.

For root version set `R`, a top-level declaration's effective scope is its explicit `protocolVersions` when present and `R` otherwise. <a id="req-scope-root-subset"></a> <span class="mcpdesc-rule-links" data-anchor="req-scope-root-subset" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-scope-root-subset&gt;</code></a></small></span> An explicit scope MUST be a non-empty subset of `R`.

For a nested scoped declaration, the effective scope is its explicit `protocolVersions` when present and its parent's effective scope otherwise. <a id="req-scope-subset"></a> <span class="mcpdesc-rule-links" data-anchor="req-scope-subset" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-scope-subset&gt;</code></a></small></span> An explicit child scope MUST be a non-empty subset of its parent's effective scope.

Omission therefore means the complete effective parent scope; it does not mean unknown applicability.

<a id="req-field-protocol-version-availability"></a> <span class="mcpdesc-rule-links" data-anchor="req-field-protocol-version-availability" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/capabilities-tasks-protocol-version#required-by" title="This requirement is part of rule: mcp.capabilities.tasks.protocol-version"><code>&lt;req-field-protocol-version-availability&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/declaration-field-protocol-version#required-by" title="This requirement is part of rule: mcp.declaration.field.protocol-version"><code>&lt;req-field-protocol-version-availability&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/tool-output-schema-protocol-version#required-by" title="This requirement is part of rule: mcp.tool.output-schema.protocol-version"><code>&lt;req-field-protocol-version-availability&gt;</code></a></small></span> As a consequence, a field that this specification marks as available since an MCP protocol version, or for one MCP protocol version only, MUST NOT appear in a declaration whose effective scope includes a protocol version outside that range.

### 4.11 Relationship Between Version Fields

The `mcpdesc` version identifies this description format. Root and declaration-level `protocolVersions` identify MCP protocol applicability. The optional root `$schema` identifies a structural validation schema resource. These version dimensions are independent.

### 4.12 Effective Protocol Views and Projection

For protocol version `V`, the Effective Protocol View `P_V(D)` of document `D` contains each scoped declaration whose effective scope includes `V` and excludes every other scoped declaration. It preserves the complete Info Object unchanged.

<a id="req-view-projection"></a> <span class="mcpdesc-rule-links" data-anchor="req-view-projection" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-view-projection&gt;</code></a></small></span> A conforming single-version projection tool MUST:

1. validate the source document;
2. require `V` to occur in root `protocolVersions`;
3. set root `protocolVersions` to `[V]`;
4. retain applicable transports, capabilities, primitives, and nested declarations;
5. remove `protocolVersions` from retained declarations because applicability is unambiguous;
6. preserve semantically significant empty values and inheritance, including security declarations;
7. omit every ordinary declaration collection from which projection removes the last entry; and
8. validate the projected document structurally and semantically for `V`.

Projection produces an ordinary conforming MCP Description document, not a second format. <a id="req-view-projection-transports"></a> <span class="mcpdesc-rule-links" data-anchor="req-view-projection-transports" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-view-projection-transports&gt;</code></a></small></span> It MUST NOT materialize transport-dependent inherited values onto a primitive unless the operation also selects a transport and defines that resolution.

### 4.13 Merge

A merge tool MAY construct an aggregate from single-version or multi-version descriptions. <a id="req-merge-inputs"></a> <span class="mcpdesc-rule-links" data-anchor="req-merge-inputs" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-merge-inputs&gt;</code></a></small></span> It MUST validate every input and MUST report a conflict rather than guess when inputs cannot be represented faithfully.

<a id="req-merge-algorithm"></a> <span class="mcpdesc-rule-links" data-anchor="req-merge-algorithm" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-merge-algorithm&gt;</code></a></small></span> A conforming merge algorithm SHOULD project inputs into individual protocol views, require compatible logical server identity and unscoped metadata, union root protocol sets, collapse equivalent declarations by unioning their scopes, retain differing declarations as disjoint scoped variants, and validate the aggregate result.

<a id="req-merge-equivalence"></a> <span class="mcpdesc-rule-links" data-anchor="req-merge-equivalence" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-merge-equivalence&gt;</code></a></small></span> When inputs cover the same protocol version, their Effective Protocol Views MUST be semantically equivalent or merge MUST fail. Conflicting `info`, `instructions`, root extension values, security declarations, or other unscoped values also cause failure.

For every merged source view `D_V`, this round-trip invariant applies:

```text
P_V(merge(D_1, ..., D_n)) is semantically equivalent to D_V
```

Semantic equivalence need not preserve property order, redundant scopes, array order where semantically insignificant, or the original choice between an omitted scope and an explicit full-parent scope. <a id="req-merge-security"></a> <span class="mcpdesc-rule-links" data-anchor="req-merge-security" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-merge-security&gt;</code></a></small></span> Merge tools MUST preserve the distinction among omitted `security`, `security: []`, and `security: [{}]`.

Omission contributes no entries to an ordinary declaration collection during merge. <a id="req-merge-collections"></a> <span class="mcpdesc-rule-links" data-anchor="req-merge-collections" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-merge-collections&gt;</code></a></small></span> A merge result MUST omit an ordinary declaration collection when it has no entries. Merge output MUST satisfy transport protocol coverage whenever it contains `transports`.

### 4.14 Native MCP Projection

Native projection produces the MCP values that a server returns from `tools/list`, `resources/list`, `resources/templates/list`, and `prompts/list` for one MCP protocol version. Unlike the Effective Protocol View (Section 4.12), its result is not an MCP Description document.

Native projection `N_V(D, k, i)` takes a document `D`, an MCP protocol version `V`, a primitive kind `k` (Tool, Resource, Resource Template, or Prompt), and an identifier `i`: the Tool `name`, Resource `uri`, Resource Template `uriTemplate`, or Prompt `name`, which is unique within `P_V(D)` (Sections 9.5, 10.5, and 11.5). <a id="req-native-projection-steps"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-steps" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-native-projection-steps&gt;</code></a></small></span> A conforming native projection implementation MUST:

1. <a id="req-native-projection-source-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-source-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-source-valid#required-by" title="This requirement is part of rule: mcpdesc.projection.source-valid"><code>&lt;req-native-projection-source-valid&gt;</code></a></small></span> validate `D` and fail with `projection-source-invalid` when validation reports an error;
2. <a id="req-native-projection-protocol-version-declared"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-protocol-version-declared" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-source-valid#required-by" title="This requirement is part of rule: mcpdesc.projection.source-valid"><code>&lt;req-native-projection-protocol-version-declared&gt;</code></a></small></span> require `V` to occur in root `protocolVersions`, otherwise fail with `projection-protocol-version-not-declared`;
3. <a id="req-native-projection-declaration-applicable"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-declaration-applicable" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-declaration-applicable#required-by" title="This requirement is part of rule: mcpdesc.projection.declaration-applicable"><code>&lt;req-native-projection-declaration-applicable&gt;</code></a></small></span> select the declaration of kind `k` with identifier `i` in `P_V(D)`, otherwise fail with `projection-declaration-not-applicable`;
4. <a id="req-native-projection-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-native-projection-references-resolved&gt;</code></a></small></span> resolve every Reference Object in Tool `inputSchema` and `outputSchema` (Section 17);
5. <a id="req-native-projection-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-native-projection-fields&gt;</code></a></small></span> build the value from the declaration fields that the MCP type of `k` defines in `V`, copying each value unchanged, where Prompt `arguments` entries and `icons` entries keep only the fields that MCP `PromptArgument` and `Icon` define in `V`; and
6. <a id="req-native-projection-postcondition"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-postcondition" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-native-projection-postcondition&gt;</code></a></small></span> validate the value against the definition of that MCP type in the pinned MCP `schema.json` of `V`, and fail with `projection-postcondition-failed`, without returning the value, when it does not validate.

Because validation already rejects fields that `V` does not define, step 5 removes only MCP Description metadata: `protocolVersions`, `examples`, `interactionExamples`, `completionExamples`, `tags`, `elicitations`, `deprecated`, `security`, `clientRequirements`, and the `x-*` specification extensions of the declaration, its Prompt arguments, and its icons. Embedded JSON Schema keywords in `inputSchema` and `outputSchema`, including `x-*` keywords and `x-mcp-header`, and `_meta` entries are copied unchanged.

<a id="req-native-projection-no-synthesis"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-no-synthesis" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-native-projection-no-synthesis&gt;</code></a></small></span> Native projection MUST NOT add a field that the declaration does not contain, materialize a protocol default, copy a value into another field, or rewrite a value. An absent annotation hint stays absent, `execution.taskSupport` is not set to `"forbidden"`, no `$schema` is inserted into an embedded schema, and a Prompt argument without `required` stays without it. `deprecated` has no MCP counterpart and is omitted rather than moved into `_meta` or `description`.

<a id="req-native-projection-lists"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-lists" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-native-projection-lists&gt;</code></a></small></span> The list projection of kind `k` for `V` is the sequence of `N_V(D, k, i)` for every declaration of kind `k` in `P_V(D)`, in document order. A failure for any declaration fails the whole list.

<a id="req-native-projection-no-repair"></a> <span class="mcpdesc-rule-links" data-anchor="req-native-projection-no-repair" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-native-projection-no-repair&gt;</code></a></small></span> A `projection-postcondition-failed` failure indicates a defect in this specification, its validator, or the implementation, except for a Tool and protocol version for which validation reports the warning of [Section 9.2](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#req-tool-schema-native-shape): there it reflects a restriction of the MCP `Tool` type that this specification reports but does not enforce. In both cases implementations MUST NOT repair the value.

The `projection-fixtures/` folder of this specification gives, for each kind and supported protocol version, the exact expected MCP value or failure, in the case format of `projection-fixtures/schema/projection-case.schema.json`. Values are compared as canonical JSON.

---

## 5. Info Object

The `info` object provides metadata about the MCP server. <a id="req-info-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-info-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-info-required&gt;</code></a></small></span> It is REQUIRED.

The `info` object combines OpenAPI-style metadata (`contact`, `license`) with fields from the MCP `Implementation` type used for server identity. The MCP-sourced fields — `name`, `title`, `description`, `version`, `icons`, and `websiteUrl` — allow an MCP Description document to represent server identity metadata that may also be advertised at runtime.

Info is unscoped, document-wide MCP Description metadata. Every property defined by this specification MAY appear regardless of the protocol versions listed in root `protocolVersions`. A mapping to MCP `Implementation` indicates that a producer MAY obtain or compare the value through runtime initialization when the negotiated protocol version defines that field. <a id="req-info-protocol-version-independent"></a> <span class="mcpdesc-rule-links" data-anchor="req-info-protocol-version-independent" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-info-protocol-version-independent&gt;</code></a></small></span> It MUST NOT be interpreted as requiring a runtime origin or restricting the property's presence to those protocol versions. Validators MUST NOT emit a protocol version-applicability diagnostic solely because an Info property is unavailable on `Implementation` in an applicable MCP protocol version.

A producer MAY obtain Info metadata from author input, configuration, package metadata, a registry, runtime discovery, or another source. <a id="req-info-trust"></a>This specification does not assign trust or precedence among those sources, and consumers MUST NOT infer that an Info value was asserted by a live server.

### 5.1 Properties

<a id="req-info-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-info-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-info-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Programmatic server name (identifier). <a id="req-info-name-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-info-name-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-info-name-non-empty&gt;</code></a></small></span> MUST be non-empty. Maps to `Implementation.name` (MCP `BaseMetadata`). |
| `version` | string | **Yes** | Server version. <a id="req-info-version-semver"></a>Semver RECOMMENDED. <a id="req-info-version-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-info-version-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-info-version-non-empty&gt;</code></a></small></span> MUST be non-empty. Maps to `Implementation.version`. |
| `title` | string | No | Human-readable display name for UI contexts. Falls back to `name` if not provided. Runtime mapping: `Implementation.title` (MCP `BaseMetadata`, available since 2025-06-18). |
| `description` | string | No | Brief description of what the server does. Runtime mapping: `Implementation.description` (available since MCP 2025-11-25). |
| `id` | string | No | Unique server identifier (URI, DID, or URN). |
| `icons` | non-empty array\<[Icon](https://mcpdesc.org/docs/specification/0.9.0-rc.3/appendices)\> | No | Icons for UI display. Runtime mapping: `Implementation.icons` (available since MCP 2025-11-25). |
| `websiteUrl` | string (URI) | No | URL of the server's website. Runtime mapping: `Implementation.websiteUrl` (available since MCP 2025-11-25). |
| `contact` | [Contact Object](#52-contact-object) | No | Contact information (OpenAPI-style, not part of MCP `Implementation`). |
| `license` | [License Object](#53-license-object) | No | License information (OpenAPI-style, not part of MCP `Implementation`). |

### 5.2 Contact Object

<a id="req-contact-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-contact-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-contact-fields&gt;</code></a></small><br></span>

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Organization or maintainer name |
| `url` | string (URI) | Contact URL |
| `email` | string (email) | Contact email address |

### 5.3 License Object

<a id="req-license-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-license-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-license-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | License name (e.g., `"Apache-2.0"`, `"MIT"`) |
| `url` | string (URI) | No | URL to the license text |

### 5.4 Example

```json
{
  "info": {
    "name": "chess-coach",
    "title": "Chess Coach MCP Server",
    "version": "2.1.0",
    "description": "Analyze chess games, track player ratings, and review game history",
    "id": "urn:mcp:chess-coach",
    "icons": [
      {
        "src": "https://chess-coach.example.com/icons/icon-48.png",
        "mimeType": "image/png",
        "sizes": ["48x48"]
      },
      {
        "src": "https://chess-coach.example.com/icons/icon.svg",
        "mimeType": "image/svg+xml",
        "sizes": ["any"],
        "theme": "light"
      }
    ],
    "websiteUrl": "https://chess-coach.example.com",
    "contact": {
      "name": "Chess Coach Team",
      "url": "https://example.com/chess-coach",
      "email": "chess@example.com"
    },
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  }
}
```

---

## 6. Transports

The optional `transports` property declares one or more communication mechanisms for the MCP server. <a id="req-transports-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-transports-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-transports-non-empty&gt;</code></a></small></span> When present, it MUST contain at least one Transport Object. <a id="req-transports-omission"></a>Omission means that the document declares no connection mechanism; it MUST NOT be interpreted as proof that the server has no transport.

### 6.1 Overview

MCP servers can be accessed through different transport mechanisms. The `transports` array allows a single MCP Description document to declare all supported transports, enabling clients to select the most appropriate one.

### 6.2 Transport Types

<a id="req-transport-type"></a> <span class="mcpdesc-rule-links" data-anchor="req-transport-type" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/transport-members#required-by" title="This requirement is part of rule: mcpdesc.transport.members"><code>&lt;req-transport-type&gt;</code></a></small></span> Each transport object MUST include a `type` property. The following transport types are defined:

Every Transport Object MAY contain `protocolVersions` and `security`. `protocolVersions` follows Section 4.5. A transport's `security` value is a Security Requirement Array and follows Sections 6.4 and 7.

#### 6.2.1 Streamable HTTP Transport

<a id="req-transport-streamable-http-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-transport-streamable-http-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/transport-members#required-by" title="This requirement is part of rule: mcpdesc.transport.members"><code>&lt;req-transport-streamable-http-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `"streamable-http"` | **Yes** | Transport type identifier |
| `url` | string (URI) | **Yes** | MCP endpoint URL |

The streamable HTTP transport connects to an MCP server over HTTP with streaming response support. <a id="req-transport-streamable-http-protocol-versions"></a> <span class="mcpdesc-rule-links" data-anchor="req-transport-streamable-http-protocol-versions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/transport-streamable-http-protocol-version#required-by" title="This requirement is part of rule: mcp.transport.streamable-http.protocol-version"><code>&lt;req-transport-streamable-http-protocol-versions&gt;</code></a></small></span> It is defined for MCP 2025-03-26 and later and is the RECOMMENDED transport for remote MCP servers in those protocol versions.

```json
{
  "type": "streamable-http",
  "url": "https://chess-coach.example.com/mcp"
}
```

#### 6.2.2 stdio Transport

<a id="req-transport-stdio-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-transport-stdio-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/transport-members#required-by" title="This requirement is part of rule: mcpdesc.transport.members"><code>&lt;req-transport-stdio-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `"stdio"` | **Yes** | Transport type identifier |
| `command` | string | **Yes** | Command to launch the server |
| `args` | array\<string\> | No | Command arguments |
| `env` | object | No | Environment variables (string values) |

The stdio transport launches the MCP server as a subprocess and communicates over standard input/output.

```json
{
  "type": "stdio",
  "command": "chess-coach",
  "args": ["mcp", "--level", "advanced"],
  "env": {
    "CHESS_DB_PATH": "/data/games.db"
  }
}
```

#### 6.2.3 SSE Transport (Legacy)

<a id="req-transport-sse-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-transport-sse-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/transport-members#required-by" title="This requirement is part of rule: mcpdesc.transport.members"><code>&lt;req-transport-sse-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `"sse"` | **Yes** | Transport type identifier |
| `url` | string (URI) | **Yes** | SSE endpoint URL |

The Server-Sent Events transport is a legacy transport type retained for backward compatibility. It is the remote transport defined by MCP 2024-11-05. <a id="req-transport-legacy-sse-warning"></a> <span class="mcpdesc-rule-links" data-anchor="req-transport-legacy-sse-warning" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/transport-legacy-sse-deprecated#required-by" title="This requirement is part of rule: mcp.transport.legacy-sse.deprecated"><code>&lt;req-transport-legacy-sse-warning&gt;</code></a></small></span> Validators SHOULD warn when it is associated with MCP 2025-03-26 or later, where Streamable HTTP is the standard remote transport. New implementations SHOULD use `streamable-http` instead.

```json
{
  "type": "sse",
  "url": "https://chess-coach.example.com/sse"
}
```

### 6.3 Multiple Transports

A server MAY support multiple transports. <a id="req-transport-selection"></a>Clients SHOULD select the most appropriate transport based on their environment and capabilities.

```json
{
  "transports": [
    { "type": "streamable-http", "url": "https://chess-coach.example.com/mcp" },
    { "type": "stdio", "command": "chess-coach", "args": ["mcp"] }
  ]
}
```

### 6.4 Transport-Scoped Security

Each transport object MAY include a `security` property containing a Security Requirement Array (see Section 7). When present, transport security replaces root security for that transport.

| Scenario | Effective security |
|----------|-------------------|
| Root `security` defined, transport `security` omitted | Inherits root security |
| Root `security` defined, transport `security` is `[]` (empty) | Explicitly no authentication |
| Root `security` defined, transport `security` defined | Transport's own security |
| Root `security` omitted, transport `security` omitted | No authentication |

This mechanism allows a single MCP Description document to declare different security requirements for different transports. For example, an HTTP transport typically requires bearer authentication while a stdio transport relies on OS-level process isolation:

```json
{
  "transports": [
    {
      "type": "streamable-http",
      "url": "https://chess-coach.example.com/mcp",
      "security": [
        { "bearer": [] }
      ]
    },
    {
      "type": "stdio",
      "command": "chess-coach",
      "args": ["mcp"],
      "security": []
    }
  ]
}
```

<a id="req-transport-security-example"></a> <span class="mcpdesc-rule-links" data-anchor="req-transport-security-example" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-requirements#required-by" title="This requirement is part of rule: mcpdesc.security.requirements"><code>&lt;req-transport-security-example&gt;</code></a></small></span> The `bearer` name in this example MUST identify a root `securitySchemes` entry.

### 6.5 Protocol Coverage

<a id="req-transport-coverage"></a> <span class="mcpdesc-rule-links" data-anchor="req-transport-coverage" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/transports-coverage#required-by" title="This requirement is part of rule: mcpdesc.transports.coverage"><code>&lt;req-transport-coverage&gt;</code></a></small></span> When `transports` is present, the union of all effective transport protocol scopes MUST equal root `protocolVersions`. Transport scopes MAY overlap because a server can expose multiple transports for one protocol version.

A document with `transports` is invalid when any root protocol version has no applicable transport or when a transport scope contains a protocol version outside root coverage. <a id="req-transport-coverage-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-transport-coverage-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/transports-coverage#required-by" title="This requirement is part of rule: mcpdesc.transports.coverage"><code>&lt;req-transport-coverage-omitted&gt;</code></a></small></span> When `transports` is omitted, transport coverage validation does not apply: validators MUST NOT infer a transport or report uncovered root protocol versions.

### 6.6 Extensibility

Transport Objects MAY carry `x-*` specification extensions. <a id="req-transport-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-transport-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/transport-members#required-by" title="This requirement is part of rule: mcpdesc.transport.members"><code>&lt;req-transport-closed&gt;</code></a></small></span> They MUST NOT contain other additional properties beyond those defined for their type plus the common optional `protocolVersions` and `security` properties.

---

## 7. Security

MCP Description represents statically known authentication and authorization through reusable named Security Scheme Objects and Security Requirement Arrays. Both `securitySchemes` and `security` are OPTIONAL.

These declarations describe access requirements. They do not define token acquisition, authorization-server discovery, runtime access-control policy, or authorization-filtered discovery behavior.

### 7.1 Named Security Schemes

Root `securitySchemes` is a map from a local name to a Security Scheme Object. <a id="req-security-schemes-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-schemes-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-scheme-members#required-by" title="This requirement is part of rule: mcpdesc.security-scheme.members"><code>&lt;req-security-schemes-map&gt;</code></a></small></span> When present, it MUST contain at least one entry. Every local name MUST match `^[A-Za-z0-9._-]+$`. <a id="req-security-schemes-omission"></a>Omission makes no security-scheme declaration and MUST NOT be interpreted as proof that the runtime uses no authentication or authorization mechanism.

```json
{
  "securitySchemes": {
    "oauth": {
      "type": "oauth2",
      "flows": {
        "authorizationCode": {
          "authorizationUrl": "https://auth.example.com/authorize",
          "tokenUrl": "https://auth.example.com/token",
          "scopes": { "games:read": "Read games" }
        }
      }
    },
    "api-key": {
      "type": "apiKey",
      "in": "header",
      "name": "X-API-Key"
    }
  }
}
```

### 7.2 Security Scheme Object

<a id="req-security-scheme-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-scheme-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-scheme-members#required-by" title="This requirement is part of rule: mcpdesc.security-scheme.members"><code>&lt;req-security-scheme-fields&gt;</code></a></small></span> Each Security Scheme Object MUST include `type`.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | **Yes** | `"http"`, `"apiKey"`, `"oauth2"`, or `"openIdConnect"` |
| `scheme` | string | For `http` | HTTP authentication scheme |
| `bearerFormat` | string | No | Bearer-token format hint |
| `name` | string | For `apiKey` | API-key parameter name |
| `in` | string | For `apiKey` | `"header"`, `"query"`, or `"cookie"` |
| `flows` | OAuth Flows Object | For `oauth2` | One or more OAuth2 flows |
| `openIdConnectUrl` | string (URI) | For `openIdConnect` | OpenID Connect discovery URL |
| `description` | string | No | Human-readable description |

An OAuth Flows Object MAY contain `implicit`, `password`, `clientCredentials`, and `authorizationCode`. <a id="req-oauth-flows-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-oauth-flows-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-scheme-members#required-by" title="This requirement is part of rule: mcpdesc.security-scheme.members"><code>&lt;req-oauth-flows-fields&gt;</code></a></small></span> At least one flow MUST be present. Every flow MUST contain a `scopes` map and MAY contain `refreshUrl`. An implicit flow MUST contain `authorizationUrl`; password and client-credentials flows MUST contain `tokenUrl`; an authorization-code flow MUST contain both `authorizationUrl` and `tokenUrl`.

### 7.3 Security Requirement Array

A `security` value is an array of Security Requirement Objects. Each object maps local security-scheme names to arrays of scope strings.

```json
{
  "security": [
    { "oauth": ["games:read"] },
    { "api-key": [] }
  ]
}
```

Entries in the outer array are alternatives (**OR**). Multiple scheme names in one object are jointly required (**AND**). Every listed OAuth2 or OpenID Connect scope is required.

<a id="req-security-scheme-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-scheme-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-requirements#required-by" title="This requirement is part of rule: mcpdesc.security.requirements"><code>&lt;req-security-scheme-references&gt;</code></a></small></span> Every referenced name MUST exist in root `securitySchemes`. <a id="req-security-scopes-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-scopes-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-requirements#required-by" title="This requirement is part of rule: mcpdesc.security.requirements"><code>&lt;req-security-scopes-unique&gt;</code></a></small></span> Scope arrays MUST contain unique strings. <a id="req-security-scopes-oauth-only"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-scopes-oauth-only" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-requirements#required-by" title="This requirement is part of rule: mcpdesc.security.requirements"><code>&lt;req-security-scopes-oauth-only&gt;</code></a></small></span> HTTP and API-key schemes MUST use an empty scope array. <a id="req-security-uncatalogued-scope"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-uncatalogued-scope" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-requirements#required-by" title="This requirement is part of rule: mcpdesc.security.requirements"><code>&lt;req-security-uncatalogued-scope&gt;</code></a></small></span> An OAuth2 or OpenID Connect requirement MAY use a scope absent from a static scope catalogue; validators MAY warn but MUST NOT reject solely for that reason.

Array order, scheme-key order, and scope order are not semantically significant.

### 7.4 Omission, Clearing, and Anonymous Access

The following forms are distinct:

- omitted `security`: inherit at a nested level, or make no declaration at root;
- `security: []`: explicitly clear any inherited mcpdesc security requirement;
- `security: [{}]`: explicitly allow anonymous access as an alternative;
- `security: [{}, {"oauth": ["games:read"]}]`: allow anonymous access or the named OAuth requirement.

<a id="req-security-empty-distinction"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-empty-distinction" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-security-empty-distinction&gt;</code></a></small></span> Implementations MUST preserve the distinction between `[]` and `[{}]` and MUST NOT normalize one into the other.

### 7.5 Placement and Precedence

`security` MAY appear at the document root, a Transport Object, or any Tool, Resource, Resource Template, or Prompt Object.

For a primitive used through a selected transport, the effective requirement is the first present value in this order:

1. primitive `security`;
2. selected transport `security`;
3. root `security`;
4. no mcpdesc-declared requirement.

This is replacement, not merging. <a id="req-security-projection"></a> <span class="mcpdesc-rule-links" data-anchor="req-security-projection" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-security-projection&gt;</code></a></small></span> Protocol projection MUST preserve security declarations and MUST NOT copy one transport's inherited security onto a primitive unless a separate operation also selects that transport.

### 7.6 Interpretation Limits

Primitive requirements describe access conditions, not identities, roles, ownership, or exact discovery visibility. A requirement neither guarantees that a primitive is hidden before authorization nor guarantees that it is visible.

A primitive-level override applies regardless of selected transport. <a id="req-security-transport-variants"></a>If transport inheritance cannot faithfully represent materially different per-transport primitive requirements, authors SHOULD publish separate descriptions or use a specification extension. <a id="req-security-no-combined-requirement"></a>Tools MUST NOT invent a combined requirement.

---

## 8. Capabilities

The optional `capabilities` array declares protocol-scoped, durable server features. <a id="req-capabilities-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-capabilities-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-capabilities-non-empty&gt;</code></a></small></span> When present, it MUST contain at least one Capabilities Object.

### 8.1 Overview

Capabilities represent externally relevant server behavior beyond primitive inventories. They describe semantics, not the RPC or notification mechanism used to expose them.

Completion examples on Prompt and Resource Template declarations are descriptive metadata about observed `completion/complete` behavior. They do not themselves assert that the server advertises the `completions` capability in every deployment or Effective Protocol View.

### 8.2 Properties

| Property | Type | Description |
|----------|------|-------------|
| `protocolVersions` | array\<string\> | MCP protocol versions to which this object applies; inherits root coverage when omitted |
| `tools` | object | Tool-related capabilities |
| `tools.listChanged` | boolean | Whether the server sends `notifications/tools/list_changed` |
| `resources` | object | Resource-related capabilities |
| `resources.subscribe` | boolean | Whether the server supports resource subscriptions |
| `resources.listChanged` | boolean | Whether the server sends `notifications/resources/list_changed` |
| `prompts` | object | Prompt-related capabilities |
| `prompts.listChanged` | boolean | Whether the server sends `notifications/prompts/list_changed` |
| `completions` | object | Present if the server supports argument autocompletion (MCP 2025-03-26+) |
| `logging` | object | Present if the server supports sending log messages to the client |
| `tasks` | object | Present if the server supports core task-augmented requests (MCP 2025-11-25 only) |
| `extensions` | non-empty map\<string, object\> | Formal MCP extension capabilities (MCP 2026-07-28); pre-standard server advertisements are preserved with a warning for earlier protocol versions |
| `experimental` | object | Experimental, non-standard capabilities |

### 8.3 Tasks Capability

The `tasks` object, when present, indicates the server supports long-running task management:

| Property | Type | Description |
|----------|------|-------------|
| `tasks.list` | object | Server supports listing active tasks |
| `tasks.cancel` | object | Server supports cancelling tasks |
| `tasks.requests.tools.call` | object | Tool calls can be task-augmented |

### 8.4 Extensibility

Formal `extensions` capability negotiation begins with MCP 2026-07-28. <a id="req-capabilities-extensions-pre-standard"></a> <span class="mcpdesc-rule-links" data-anchor="req-capabilities-extensions-pre-standard" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/capabilities-extensions-protocol-version#required-by" title="This requirement is part of rule: mcp.capabilities.extensions.protocol-version"><code>&lt;req-capabilities-extensions-pre-standard&gt;</code></a></small></span> When a server Capabilities Object containing `extensions` applies to an earlier protocol version, the map MUST satisfy the same structural requirements, MUST be accepted and preserved, and MUST NOT imply that the earlier MCP core protocol version defines the field or that the server supports MCP 2026-07-28. Validators SHOULD warn for each applicable earlier protocol version that its core schema does not define the field and that the description is preserving a deployed pre-standard extension negotiation convention. Implementations MAY escalate this warning under an explicit local policy.

<a id="req-extensions-identifier-form"></a> <span class="mcpdesc-rule-links" data-anchor="req-extensions-identifier-form" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/server-capabilities-members#required-by" title="This requirement is part of rule: mcp.server-capabilities.members"><code>&lt;req-extensions-identifier-form&gt;</code></a></small></span> `extensions` keys MUST use the MCP mandatory-prefix metadata form `prefix/name`. A prefix whose second label is `modelcontextprotocol` or `mcp` is reserved for MCP use. Unknown syntactically valid extension identifiers are accepted and MUST be preserved. <a id="req-extensions-reserved-identifiers"></a> <span class="mcpdesc-rule-links" data-anchor="req-extensions-reserved-identifiers" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/extensions-catalogue-maturity#required-by" title="This requirement is part of rule: mcpdesc.extensions.catalogue-maturity"><code>&lt;req-extensions-reserved-identifiers&gt;</code></a></small></span> A validator SHOULD warn about an unrecognized identifier under a reserved prefix and MUST NOT treat absence from its local catalogue alone as proof of namespace misuse. Use known to be unauthorized is a semantic error.

Protocol-version, identifier-authority, and identifier-maturity diagnostics are independent. <a id="req-extensions-not-reinterpreted"></a>Tooling MUST NOT move, copy, or reinterpret a pre-standard server extension map as `experimental`, `_meta`, an MCP Description `x-*` property, or a declaration for another protocol version.

For this purpose, an official MCP extension is recognized when the validator's extension catalogue identifies it from an authoritative MCP extension source. <a id="req-extensions-official-no-warning"></a> <span class="mcpdesc-rule-links" data-anchor="req-extensions-official-no-warning" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/extensions-catalogue-maturity#required-by" title="This requirement is part of rule: mcpdesc.extensions.catalogue-maturity"><code>&lt;req-extensions-official-no-warning&gt;</code></a></small></span> A validator SHOULD NOT emit an unknown-reserved-identifier warning for a catalogued official extension. <a id="req-extensions-catalogue-maturity"></a> <span class="mcpdesc-rule-links" data-anchor="req-extensions-catalogue-maturity" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/extensions-catalogue-maturity#required-by" title="This requirement is part of rule: mcpdesc.extensions.catalogue-maturity"><code>&lt;req-extensions-catalogue-maturity&gt;</code></a></small></span> It SHOULD identify a catalogued experimental extension as experimental rather than unknown and SHOULD warn that its maturity must be reviewed. Recognition establishes identifier authority and maturity only; it does not establish that an extension value satisfies extension-specific settings or semantics.

An extension catalogue is validator metadata rather than part of the MCP Description document or its core conformance result. <a id="req-extensions-catalogue-disclosure"></a>A validator that uses one MUST disclose its authoritative source, effective date, and identifier maturity assignments. A frozen validator snapshot MUST pin that metadata. Catalogue updates MAY change authority or maturity diagnostics without changing whether an otherwise conforming document satisfies this specification.

A validator MAY apply deeper extension-specific validation only through an explicitly selected profile or other configured trusted mechanism. <a id="req-extensions-profiles"></a>Such validation SHOULD identify an immutable or otherwise pinned extension specification version and MUST distinguish profile diagnostics from core MCP Description conformance. Failure to retrieve mutable extension material MUST NOT invalidate an otherwise conforming document.

<a id="req-capabilities-tasks-distinct"></a> <span class="mcpdesc-rule-links" data-anchor="req-capabilities-tasks-distinct" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/capabilities-tasks-protocol-version#required-by" title="This requirement is part of rule: mcp.capabilities.tasks.protocol-version"><code>&lt;req-capabilities-tasks-distinct&gt;</code></a></small></span> Core `tasks` in MCP 2025-11-25 and a Tasks extension in MCP 2026-07-28 are distinct declarations and MUST NOT be automatically reinterpreted as one another. <a id="req-capabilities-logging-deprecated"></a> <span class="mcpdesc-rule-links" data-anchor="req-capabilities-logging-deprecated" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/capabilities-logging-deprecated#required-by" title="This requirement is part of rule: mcp.capabilities.logging.deprecated"><code>&lt;req-capabilities-logging-deprecated&gt;</code></a></small></span> `logging` remains representable for protocol versions that define it; validators SHOULD warn when it applies to MCP 2026-07-28, where it is deprecated.

<a id="req-capabilities-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-capabilities-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/server-capabilities-members#required-by" title="This requirement is part of rule: mcp.server-capabilities.members"><code>&lt;req-capabilities-closed&gt;</code></a></small></span> The Capabilities Object and the MCP Description-defined `tools`, `resources`, and `prompts` capability declaration objects MAY carry `x-*` specification extensions. Other unknown properties on those objects are invalid. MCP-native capability payloads retain their own forward-compatibility rules. The `capabilities.extensions` map is a formal MCP protocol-extension namespace, not an MCP Description specification-extension location; tooling MUST NOT reinterpret or move values between these mechanisms.

### 8.5 Primitive Client Capability Requirements

Tool, Resource, Resource Template, and Prompt Objects MAY contain a `clientRequirements` Client Capability Requirements Object. It describes an unconditional static precondition on the minimum MCP client capabilities required to use that primitive through `tools/call`, `resources/read`, or `prompts/get`. A Resource Template requirement applies to reading a concrete URI produced from the template. Requirements do not apply to listing or discovery, and this specification neither requires nor prohibits runtime filtering based on them.

The object uses the `ClientCapabilities` structure of every MCP protocol version in the containing primitive's effective protocol scope. <a id="req-client-requirements-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-client-requirements-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/client-capabilities-members#required-by" title="This requirement is part of rule: mcp.client-capabilities.members"><code>&lt;req-client-requirements-shape&gt;</code></a></small></span> It MUST be non-empty, MUST NOT contain `protocolVersions`, and inherits no value from the root, a Transport Object, server `capabilities`, an Elicitation Declaration, or another primitive. <a id="req-client-requirements-protocol-version-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-client-requirements-protocol-version-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/client-capabilities-protocol-shape#required-by" title="This requirement is part of rule: mcp.client-capabilities.protocol-shape"><code>&lt;req-client-requirements-protocol-version-valid&gt;</code></a></small></span> Every declared capability and nested capability member MUST be valid for every effective protocol version. The pre-standard server-advertisement preservation rule in Section 8.4 does not relax this requirement. When requirements differ materially between protocol versions, the primitive MUST be split into pairwise-disjoint protocol-scoped variants.

All requirements are conjunctive. Satisfying them does not guarantee success or authorization. <a id="req-client-requirements-unconditional"></a>Authors MUST NOT declare a capability that is optional, opportunistic, input-dependent, or used only on some runtime paths as an unconditional requirement.

The recognized core structure is protocol-version-specific:

| Protocol version | Core client capability shape |
|----------|------------------------------|
| MCP 2024-11-05 and MCP 2025-03-26 | `roots.listChanged`, `sampling`, and `experimental` |
| MCP 2025-06-18 | The earlier shape plus `elicitation` |
| MCP 2025-11-25 | `roots.listChanged`; `sampling.context` and `sampling.tools`; `elicitation.form` and `elicitation.url`; core `tasks.list`, `tasks.cancel`, `tasks.requests.sampling.createMessage`, and `tasks.requests.elicitation.create`; and `experimental` |
| MCP 2026-07-28 | `elicitation.form` and `elicitation.url`; formal `extensions`; and `experimental`; Deprecated empty `roots`; deprecated `sampling.context` and `sampling.tools` |

<a id="req-client-requirements-values"></a> <span class="mcpdesc-rule-links" data-anchor="req-client-requirements-values" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/client-capabilities-protocol-shape#required-by" title="This requirement is part of rule: mcp.client-capabilities.protocol-shape"><code>&lt;req-client-requirements-values&gt;</code></a></small></span> Capability marker and settings values MUST be objects. MCP 2026-07-28 `roots` MUST be empty. <a id="req-client-requirements-deprecated"></a> <span class="mcpdesc-rule-links" data-anchor="req-client-requirements-deprecated" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/client-capabilities-deprecated#required-by" title="This requirement is part of rule: mcp.client-capabilities.deprecated"><code>&lt;req-client-requirements-deprecated&gt;</code></a></small></span> Validators SHOULD warn when a requirement uses a capability or nested member deprecated in its applicable protocol version. MCP 2024-11-05 and MCP 2025-03-26 retain the legacy incomplete-validation treatment in Section 3.5: validators apply structural and selected sound checks and MUST NOT report complete MCP semantic conformance.

<a id="req-client-requirements-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-client-requirements-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/client-capabilities-members#required-by" title="This requirement is part of rule: mcp.client-capabilities.members"><code>&lt;req-client-requirements-closed&gt;</code></a></small></span> The object contains only the client capabilities that the applicable MCP protocol versions define. MCP's `ClientCapabilities` type declares no index signature in any supported protocol version, so other top-level members MUST NOT appear; custom requirements belong in `experimental` and, for MCP 2026-07-28, in `extensions`. Entries of `experimental` are accepted and MUST be preserved. Validators MUST NOT invent matching semantics for them. This Client Capability Requirements Object is an MCP Description-defined semantic object and MAY carry `x-*` specification extensions; those properties are MCP Description metadata, not client capabilities.

<a id="req-client-requirements-extensions"></a> <span class="mcpdesc-rule-links" data-anchor="req-client-requirements-extensions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/client-capabilities-protocol-shape#required-by" title="This requirement is part of rule: mcp.client-capabilities.protocol-shape"><code>&lt;req-client-requirements-extensions&gt;</code></a></small></span> For MCP 2026-07-28, `extensions` MUST be a non-empty map whose keys satisfy the same mandatory-prefix identifier grammar and reserved-prefix rules as `capabilities.extensions`, and whose values are objects. Unknown syntactically valid identifiers MUST be preserved. Validators SHOULD warn about an unrecognized identifier under an MCP-reserved prefix. <a id="req-client-requirements-extension-compatibility"></a>A generic compatibility checker MAY treat an empty extension requirement value as satisfied by presence of that identifier in the client's extension map. It MUST NOT claim a non-empty extension requirement is satisfied without understanding the extension-specific settings semantics.

<a id="req-client-requirements-compatibility"></a>A compatibility tool comparing `clientRequirements` with a client capability profile for one protocol version SHOULD report `satisfied` when every requirement is known to be satisfied, `unsatisfied` when any requirement is known not to be satisfied, and `indeterminate` when none is known to fail but at least one cannot be evaluated. An omitted property means that the description makes no primitive-level hard-requirement claim; it does not prove that no runtime path can optionally use a capability.

Server `capabilities`, primitive `clientRequirements`, Elicitation Declarations, Tool `interactionExamples`, and `security` are independent. <a id="req-capability-independence"></a>Tooling MUST NOT infer or copy one from another. In particular, a conditional elicitation or an illustrative interaction scenario does not imply an unconditional client-capability requirement, and capability compatibility is not an authorization decision.

<a id="req-client-requirements-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-client-requirements-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-client-requirements-views&gt;</code></a></small></span> A single-version projection MUST preserve `clientRequirements` on every retained primitive and MUST NOT synthesize requirements. Merge tooling MAY collapse otherwise equivalent declarations with equivalent requirements. It MUST NOT select or union materially different requirements over overlapping protocol scope; it MUST preserve distinct non-overlapping variants where representable or report a conflict.

### 8.6 Scope Uniqueness

<a id="req-capability-scopes-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-capability-scopes-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-capability-scopes-disjoint&gt;</code></a></small></span> Effective Capabilities Object scopes MUST be pairwise disjoint. At most one Capabilities Object may apply to a protocol version.

### 8.7 Example

```json
{
  "capabilities": [
    {
      "protocolVersions": ["2025-11-25"],
      "tools": { "listChanged": true },
      "resources": { "subscribe": true, "listChanged": true },
      "prompts": { "listChanged": false },
      "completions": {},
      "logging": {},
      "tasks": { "requests": { "tools": { "call": {} } } }
    },
    {
      "protocolVersions": ["2026-07-28"],
      "tools": { "listChanged": true },
      "extensions": { "io.example/tasks": {} }
    }
  ]
}
```

---

## 9. Tools

The `tools` array declares the tools exposed by the MCP server. Each tool represents a server-side function that clients can invoke.

### 9.1 Tool Object

<a id="req-tool-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-tool-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-tool-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `protocolVersions` | array\<string\> | No | MCP protocol versions to which this declaration applies. |
| `name` | string | **Yes** | Programmatic tool name (identifier). |
| `title` | string | No | Human-readable display name for UI contexts. Since MCP 2025-06-18. |
| `description` | string | No | Human-readable tool description. |
| `inputSchema` | object or Reference Object | **Yes** | Inline or reusable JSON Schema whose root describes an object containing tool input parameters. |
| `outputSchema` | object or Reference Object | No | Inline or reusable JSON Schema for structured tool output. Since MCP 2025-06-18. |
| `annotations` | [Tool Annotations Object](#96-tool-annotations) | No | Behavioral hints. Since MCP 2025-03-26. |
| `execution` | [Execution Object](#97-execution-object) | No | Execution properties. MCP 2025-11-25 only. |
| `examples` | map&lt;string, Tool Example Object&gt; | No | Named complete Tool invocation/result pairs. |
| `interactionExamples` | map&lt;string, Tool Interaction Example Object&gt; | No | Named ordered semantic client-input scenarios attached to one Tool invocation. |
| `icons` | non-empty array\<Icon\> | No | Icons for UI display. Since MCP 2025-11-25. |
| `tags` | non-empty array\<string\> | No | Categorization tags. <a id="req-tool-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tool-tags-references&gt;</code></a></small></span> When a root-level `tags` array is present, values MUST reference declared tag names (see [Section 13.3](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#133-tag-references)). |
| `elicitations` | non-empty array\<Elicitation Declaration Object\> | No | Additional user interactions that MAY be required while fulfilling the Tool (see [Section 12](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation)). |
| `deprecated` | boolean | No | Whether the tool is deprecated. |
| `_meta` | object | No | Literal MCP metadata on the Tool declaration, subject to [Section 3.5](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#35-mcp-_meta). Since MCP 2025-06-18. |
| `security` | Security Requirement Array | No | Primitive security override. |
| `clientRequirements` | [Client Capability Requirements Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/capabilities#85-primitive-client-capability-requirements) | No | Unconditional minimum client capabilities required for `tools/call`; does not apply to `tools/list`. |

### 9.2 Input and Output Schemas

<a id="req-tool-input-schema-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-input-schema-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-tool-input-schema-required&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-tool-input-schema-required&gt;</code></a></small></span> Every Tool MUST contain `inputSchema`. Absence MUST NOT be interpreted as evidence that the Tool accepts no arguments. <a id="req-tool-input-schema-object-root"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-input-schema-object-root" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-input-schema-object-root#required-by" title="This requirement is part of rule: mcp.tool.input-schema.object-root"><code>&lt;req-tool-input-schema-object-root&gt;</code></a></small></span> The schema root MUST describe an object, because Tool arguments are always a JSON object. A root that declares `type` MUST give `"object"` or an array that contains `"object"`. Before MCP 2025-11-25, the root MUST declare `"type": "object"`.

`inputSchema` and `outputSchema` MAY be Reference Objects targeting the `schemas` component namespace. <a id="req-tool-schema-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-tool-schema-references-resolved&gt;</code></a></small></span> Resolution MUST occur before applying every inline schema rule in this section, including root shape, dialect, protocol applicability, `x-mcp-header`, and example compatibility. See [Section 17](https://mcpdesc.org/docs/specification/0.9.0-rc.3/components).

<a id="req-tool-schema-closed-recommended"></a>A closed no-parameter Tool SHOULD use `{ "type": "object", "additionalProperties": false }`. An open unspecified-parameter Tool may use `{ "type": "object" }`, but this is NOT RECOMMENDED because it gives little validation or guidance. A declared-parameter schema uses `properties` and, when undeclared properties must be rejected, `additionalProperties: false`.

<a id="req-tool-output-schema-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-output-schema-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-output-schema-valid&gt;</code></a></small></span> The `outputSchema` property, when present, MUST be a valid JSON Schema object describing the tool's structured output. For MCP 2025-11-25 and MCP 2026-07-28, it defaults to JSON Schema 2020-12 when no explicit `$schema` is provided.

For MCP 2025-11-25 and MCP 2026-07-28, both schemas MAY include an explicit `$schema` property to declare the JSON Schema dialect. <a id="req-tool-schema-dialect-keyword"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-dialect-keyword" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/declaration-field-protocol-version#required-by" title="This requirement is part of rule: mcp.declaration.field.protocol-version"><code>&lt;req-tool-schema-dialect-keyword&gt;</code></a></small></span> Earlier protocol versions do not define that property on Tool schemas. <a id="req-tool-schema-vocabulary"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-vocabulary" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-schema-keywords-preserve#required-by" title="This requirement is part of rule: mcp.tool.schema-keywords.preserve"><code>&lt;req-tool-schema-vocabulary&gt;</code></a></small></span> For MCP 2026-07-28, validators MUST accept the applicable JSON Schema 2020-12 vocabulary, including references, composition, and conditionals, plus MCP-defined annotations where valid. Earlier views MUST be checked according to their applicable MCP schema rules.

<a id="req-tool-schema-dialect-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-dialect-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-schema-dialect-valid&gt;</code></a></small></span> For MCP 2025-11-25 and MCP 2026-07-28, every embedded Tool schema MUST be valid under its declared or default dialect. Both protocol versions default to JSON Schema 2020-12. <a id="req-tool-schema-dialect-set"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-dialect-set" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-schema-dialect-set&gt;</code></a></small></span> A declared dialect MUST be JSON Schema 2020-12 (`https://json-schema.org/draft/2020-12/schema`) or JSON Schema draft-07 (`http://json-schema.org/draft-07/schema#`), with either `http` or `https` and with or without the empty fragment; a schema that declares any other dialect makes the MCP Description invalid. This set is fixed by this specification so that conformance does not depend on the validator. MCP requires implementations to support only JSON Schema 2020-12, so authors SHOULD prefer it.

For MCP 2025-11-25 and MCP 2026-07-28, the dialect, not the TypeScript type of the MCP `Tool`, decides whether an embedded schema is valid. The MCP `Tool` type of these protocol versions also restricts schema syntax that the dialect allows: it requires `"type": "object"` at the `inputSchema` root in both protocol versions and, for MCP 2025-11-25, at the `outputSchema` root and an object as the value of every top-level `properties` entry of either schema. <a id="req-tool-schema-native-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-native-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-schema-native-shape#required-by" title="This requirement is part of rule: mcp.tool.schema.native-shape"><code>&lt;req-tool-schema-native-shape&gt;</code></a></small></span> A Tool schema that is valid under its dialect but does not meet such a restriction for an applicable protocol version MUST NOT make the MCP Description invalid. Validators MUST report a warning for each such location, naming the protocol versions concerned, because native projection fails for them (Section 4.14). Authors SHOULD meet the restrictions, for example by writing `{}` instead of `true`, `{ "not": {} }` instead of `false`, or `"type": "object"` beside `$ref` or `allOf`, or SHOULD narrow the Tool's `protocolVersions`.

The supported protocol versions before MCP 2025-11-25 define an object-rooted Tool schema shape but do not state an embedded-schema dialect default. <a id="req-tool-schema-legacy-no-dialect"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-legacy-no-dialect" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-schema-legacy-shape#required-by" title="This requirement is part of rule: mcp.tool.schema.legacy-shape"><code>&lt;req-tool-schema-legacy-no-dialect&gt;</code></a></small></span> For those protocol versions, validators MUST enforce the applicable shape without inferring a dialect solely from the enclosing generated MCP schema. <a id="req-tool-schema-legacy-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-legacy-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-schema-legacy-shape#required-by" title="This requirement is part of rule: mcp.tool.schema.legacy-shape"><code>&lt;req-tool-schema-legacy-shape&gt;</code></a></small></span> `properties`, when present, MUST be an object whose values are objects, and `required`, when present, MUST be an array of strings. <a id="req-tool-schema-keywords-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-keywords-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-schema-keywords-preserve#required-by" title="This requirement is part of rule: mcp.tool.schema-keywords.preserve"><code>&lt;req-tool-schema-keywords-preserved&gt;</code></a></small></span> Other keywords MUST be preserved and MUST NOT be rejected solely by applying an inferred meta-schema.

<a id="req-tool-schema-no-fetch"></a>An mcpdesc validator MUST NOT automatically retrieve an external `$ref` target from a network. It MAY resolve external references from an explicitly supplied trusted local catalogue or an explicitly enabled resolver that follows the applicable MCP security guidance. <a id="req-tool-schema-external-ref"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-external-ref" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-schema-external-ref&gt;</code></a></small></span> If a target remains unavailable, the `$ref` MUST be preserved and its presence alone MUST NOT make the containing MCP Description invalid. The validator SHOULD warn that complete embedded-schema validation was not possible and MUST NOT report a weakened or partial validation as complete. <a id="req-tool-schema-consumer-certainty"></a>Consumers that require executable schema certainty SHOULD require resolution or treat this warning as an error. <a id="req-tool-schema-self-contained"></a>Authors SHOULD prefer self-contained Tool schemas using local `$defs`.

<a id="req-tool-output-schema-object-root"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-output-schema-object-root" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-output-schema-object-root#required-by" title="This requirement is part of rule: mcp.tool.output-schema.object-root"><code>&lt;req-tool-output-schema-object-root&gt;</code></a></small></span> Before MCP 2026-07-28, `outputSchema` MUST describe an object, because structured output is an object in those protocol versions. For MCP 2025-06-18 it MUST declare `"type": "object"`; for MCP 2025-11-25 a root that declares `type` MUST give `"object"` or an array that contains `"object"`. MCP 2026-07-28 permits any valid JSON Schema root for `outputSchema`.

MCP 2026-07-28 `inputSchema` properties MAY use `x-mcp-header` to map an input to an HTTP header. <a id="req-tool-x-mcp-header"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-x-mcp-header" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-input-schema-x-mcp-header#required-by" title="This requirement is part of rule: mcp.tool.input-schema.x-mcp-header"><code>&lt;req-tool-x-mcp-header&gt;</code></a></small></span> The annotation value MUST be a non-empty HTTP field-name token and MUST be unique case-insensitively within that `inputSchema`. It is valid only on a `string`, `integer`, or `boolean` property that is statically reachable from the schema root through `properties` chains. It MUST NOT be used on a property reached through arrays, composition, conditionals, or `$ref`.

### 9.3 Named Tool Examples

A Tool Object MAY contain `examples`, a map from a local example name to an inline Tool Example Object or a Reference Object targeting `#/components/toolExamples/<name>`. <a id="req-tool-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-tool-examples-map&gt;</code></a></small></span> When present, the map MUST contain at least one entry. Each name MUST match `^[A-Za-z0-9._-]+$`; names are case-sensitive, scoped to the containing Tool declaration, and serve as both human-meaningful labels and stable local selection names. Entry order is not semantically significant. <a id="req-tool-example-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-tool-example-references-resolved&gt;</code></a></small></span> A referenced example MUST be resolved before applying every contextual requirement of the containing Tool and effective protocol scope.

<a id="req-tool-example-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-tool-example-fields&gt;</code></a></small></span> A Tool Example Object contains these core properties and MAY carry `x-*` specification extensions:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `input` | object | **Yes** | Complete `params.arguments` value from a `tools/call` request. |
| `result` | object | **Yes** | Complete applicable completed Tool Result payload, excluding the JSON-RPC envelope. |

<a id="req-tool-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-tool-example-closed&gt;</code></a></small></span> The Tool Example Object MUST NOT contain other additional properties. In particular, 0.9.0 does not define `summary`, `description`, or `externalValue`.

<a id="req-tool-example-input-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-input-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-example-schema-conformance#required-by" title="This requirement is part of rule: mcpdesc.tool.example.schema-conformance"><code>&lt;req-tool-example-input-valid&gt;</code></a></small></span> `input` MUST be an object and MUST validate against the containing Tool's `inputSchema` under every applicable protocol version's schema rules. A no-argument invocation MUST use `input: {}`. Schema-invalid values belong in negative test material, not conforming Tool Examples.

<a id="req-tool-example-result-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-result-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-tool-example-result-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-result-protocol-fidelity#required-by" title="This requirement is part of rule: mcpdesc.example.result.protocol-fidelity"><code>&lt;req-tool-example-result-shape&gt;</code></a></small></span> `result` MUST contain `content` and MUST have the completed Tool Result shape defined by every applicable protocol version. For MCP 2026-07-28 it MUST contain `resultType: "complete"`. Fields that an applicable protocol version does not define follow [Section 3.6](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#36-carried-mcp-values). <a id="req-tool-example-completed-form"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-completed-form" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-completed-result-form#required-by" title="This requirement is part of rule: mcpdesc.example.completed-result-form"><code>&lt;req-tool-example-completed-form&gt;</code></a></small></span> Task, input-required, streaming, progress, JSON-RPC envelope, and JSON-RPC protocol-error forms are not Tool Examples. <a id="req-tool-example-content-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-content-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/content-block-protocol-version#required-by" title="This requirement is part of rule: mcp.content-block.protocol-version"><code>&lt;req-tool-example-content-protocol-version&gt;</code></a></small></span> Content blocks MAY use any text, image, audio, embedded-resource, or resource-link form supported by every applicable protocol version.

Protocol version-supported `_meta` on the completed result, content blocks, and embedded Resource Contents is literal illustrative metadata governed by [Section 3.5](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#35-mcp-_meta). It is not a schema or a request-metadata declaration. In MCP 2026-07-28, a result example MAY use `io.modelcontextprotocol/serverInfo` with an MCP Implementation value; request-only and notification-only reserved keys are invalid in these represented contexts.

<a id="req-tool-example-success"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-success" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-example-error-result#required-by" title="This requirement is part of rule: mcpdesc.tool.example.error-result"><code>&lt;req-tool-example-success&gt;</code></a></small></span> A successful result MUST omit `isError` or set it to `false`. It MAY contain `structuredContent` only in protocol versions that support that field. <a id="req-tool-example-structured-content"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-structured-content" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-structured-content-output-schema#required-by" title="This requirement is part of rule: mcp.tool.structured-content.output-schema"><code>&lt;req-tool-example-structured-content&gt;</code></a></small></span> If the Tool declares `outputSchema`, a successful result MUST contain `structuredContent`, which MUST validate against that schema under the applicable schema rules. Unstructured `content` remains required when `structuredContent` is present. If the Tool has no `outputSchema`, a successful result MAY contain protocol version-supported `structuredContent`, but mcpdesc makes no schema-compatibility claim for that value.

<a id="req-tool-example-error-result"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-error-result" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-example-error-result#required-by" title="This requirement is part of rule: mcpdesc.tool.example.error-result"><code>&lt;req-tool-example-error-result&gt;</code></a></small></span> A Tool execution-error result MUST set `isError` to `true`, MUST contain unstructured `content`, and MUST NOT contain `structuredContent`. `outputSchema` does not validate error content. JSON-RPC protocol errors and transport or intermediary failures that prevent a Tool Result are outside this model.

Example compatibility is a semantic conformance requirement. <a id="req-tool-example-incomplete-validation"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-incomplete-validation" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-example-schema-conformance#required-by" title="This requirement is part of rule: mcpdesc.tool.example.schema-conformance"><code>&lt;req-tool-example-incomplete-validation&gt;</code></a></small></span> For protocol versions before MCP 2025-11-25, validators MUST enforce constraints they can interpret without inventing an embedded-schema dialect, SHOULD warn when complete compatibility validation is impossible, and MUST NOT report incomplete validation as complete. An unresolved external `$ref` follows the policy in Section 9.2: validators preserve the schema and example, do not retrieve the target automatically, and warn that compatibility validation is incomplete. A schema-incompatible example is an error whenever complete evaluation is possible.

Tool `examples` and JSON Schema `examples` annotations are independent. Schema annotations remain suitable for anonymous values at an instance location; Tool Examples pair named complete invocations with completed results. <a id="req-tool-example-not-inferred"></a>Producers MUST NOT infer an author-supplied Tool Example by combining unrelated schema annotations.

Tool Examples are illustrative and non-exhaustive. They do not alter schemas, annotations, security requirements, side effects, or runtime behavior, and they do not guarantee that a live server returns a shown result. <a id="req-tool-example-tooling"></a>Documentation tooling SHOULD preserve names and input/result pairing. Mock or contract-test tooling MAY permit explicit selection by name but MUST NOT execute a live Tool or reproduce declared side effects merely because an example exists. Selection without an explicit name MUST use a deterministic documented policy and MUST NOT be presented as a prediction of live behavior.

Examples are untrusted descriptive content. <a id="req-tool-example-no-secrets"></a>Authors MUST NOT include secrets and SHOULD use conspicuously fictitious values. <a id="req-tool-example-untrusted"></a>Consumers MUST validate values, render content as data, and apply appropriate size and evaluation limits. They MUST NOT treat examples as authorization, proof of behavior, or safe executable instructions.

Tool Examples are MCP Description metadata, not fields of the MCP Tool type. <a id="req-tool-example-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-tool-example-projection-omitted&gt;</code></a></small></span> Projection to an MCP `tools/list` Tool value MUST omit `examples` unless an independently specified MCP extension defines a destination. <a id="req-tool-example-views-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-views-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-tool-example-views-preserved&gt;</code></a></small></span> MCP Description round-tripping and protocol-version projection MUST preserve each selected Tool declaration's example map and MUST NOT merge maps from disjoint variants with the same Tool name.

### 9.4 Tool Interaction Examples

A Tool Object MAY contain `interactionExamples`, a non-empty map from a local scenario name to a Tool Interaction Example Object. <a id="req-interaction-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-examples-map&gt;</code></a></small></span> Each name MUST match `^[A-Za-z0-9._-]+$`, is case-sensitive, and is scoped to the containing Tool declaration. The map is declaration-local: 0.9.0 defines no `components` namespace for interaction scenarios.

Tool `interactionExamples` are separate from completed Tool `examples`. <a id="req-tool-example-not-interaction"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-not-interaction" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-completed-result-form#required-by" title="This requirement is part of rule: mcpdesc.example.completed-result-form"><code>&lt;req-tool-example-not-interaction&gt;</code></a></small></span> A producer MUST NOT place an incomplete workflow, semantic interaction step, or non-terminal Tool result in the completed `examples` map.

<a id="req-interaction-example-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-example-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-example-fields&gt;</code></a></small></span> A Tool Interaction Example Object contains these core properties and MAY carry `x-*` specification extensions:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `input` | object | **Yes** | Complete initial `tools/call.params.arguments` object. |
| `steps` | non-empty array\<Tool Interaction Step Object\> | **Yes** | Ordered semantic client-input exchanges for this illustrated invocation. |
| `result` | object | **Yes** | Terminal completed Tool Result payload, excluding the JSON-RPC envelope. |

`input` follows the same schema-compatibility rules as Tool Example `input`. `result` follows the same completed success and execution-error rules as Tool Example `result`. The scenario is illustrative and non-exhaustive: it asserts only that the shown steps occur in the displayed order in this example. It does not define branching, retries, correlation IDs, task state, transport framing, timing, or behavior for responses not shown.

<a id="req-interaction-step-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-step-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-step-fields&gt;</code></a></small></span> Every Tool Interaction Step Object MUST contain `type`, `request`, and `response`. MCP Description 0.9.0 defines three step kinds:

| `type` | Request payload | Response payload |
|--------|-----------------|------------------|
| `elicitation` | Canonical elicitation request fields | Canonical elicitation response action and optional form content |
| `sampling` | Native `sampling/createMessage` parameters | Native completed sampling result |
| `roots` | Empty object | Native ordered `roots` result object |

<a id="req-interaction-step-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-step-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-step-closed&gt;</code></a></small></span> Steps MAY carry `x-*` specification extensions and MUST NOT contain other additional fields except those defined for their step kind. Step `response` values are carried MCP values governed by [Section 3.6](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#36-carried-mcp-values). A step is semantic MCP Description metadata, not a native MCP wire object. <a id="req-interaction-step-not-wire"></a>An implementation MUST NOT serialize a Tool Interaction Step directly onto an MCP connection.

An `elicitation` step MAY contain `declaration`, naming an Elicitation Declaration on the same Tool. <a id="req-interaction-elicitation-declaration"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-elicitation-declaration" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-interaction-elicitation-consistency#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.elicitation-consistency"><code>&lt;req-interaction-elicitation-declaration&gt;</code></a></small></span> When present, the request mode and the request schema or known URL MUST be compatible with that declaration after local reference resolution. <a id="req-interaction-elicitation-response"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-elicitation-response" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-interaction-elicitation-consistency#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.elicitation-consistency"><code>&lt;req-interaction-elicitation-response&gt;</code></a></small></span> For `mode: "form"`, an accepted response MUST contain `content` conforming to the request schema; declined and cancelled responses MUST NOT contain `content`. For `mode: "url"`, the response MUST omit `content`.

<a id="req-interaction-response-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-response-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/root-uri-file-scheme#required-by" title="This requirement is part of rule: mcp.root.uri.file-scheme"><code>&lt;req-interaction-response-closed&gt;</code></a></small></span> The Elicitation Interaction Response Object is closed. It MUST NOT contain
members other than `action`, `content`, and `_meta`; the applicable action
rules above determine when `content` is permitted. This closure applies to the
response value in a Tool Interaction Example, not to the native MCP response
received at runtime.

<a id="req-interaction-sampling-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-sampling-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/sampling-tools-protocol-version#required-by" title="This requirement is part of rule: mcp.sampling.tools.protocol-version"><code>&lt;req-interaction-sampling-protocol-version&gt;</code></a></small></span> A `sampling` step request uses the native `sampling/createMessage` parameter field names and constraints of every MCP protocol version in the containing Tool's effective protocol scope, excluding JSON-RPC, transport, task, and MRTR framing. This includes required `messages` and `maxTokens`, and MAY include protocol version-supported model preferences, system prompt, context inclusion, stop sequences, temperature, metadata, and Tool-related fields. Its response uses the native completed sampling result field names and constraints of every applicable protocol version, excluding JSON-RPC and task framing.

A `roots` step request is an empty object. Its response contains the ordered native `roots` declarations returned by the client for this illustration. Roots are descriptive input only; they do not authorize filesystem access.

The containing Tool's effective protocol scope controls validation. <a id="req-interaction-protocol-version-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-protocol-version-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/elicitation-protocol-version#required-by" title="This requirement is part of rule: mcp.elicitation.protocol-version"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/input-response-closed#required-by" title="This requirement is part of rule: mcp.input-response.closed"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/interaction-message-members#required-by" title="This requirement is part of rule: mcp.interaction-message.members"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/root-meta-protocol-version#required-by" title="This requirement is part of rule: mcp.root.meta.protocol-version"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/root-uri-file-scheme#required-by" title="This requirement is part of rule: mcp.root.uri.file-scheme"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a></small></span> Every represented semantic field MUST be valid in every applicable protocol version. A Tool spanning materially incompatible interaction shapes MUST be split into disjoint protocol-scoped variants. `interactionExamples` themselves do not carry `protocolVersions`.

Tool `interactionExamples` do not add server capabilities, `clientRequirements`, or Elicitation Declarations. <a id="req-interaction-client-requirements-warning"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-client-requirements-warning" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-interaction-client-requirements-consistency#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.client-requirements-consistency"><code>&lt;req-interaction-client-requirements-warning&gt;</code></a></small></span> Validators SHOULD warn when a scenario contradicts an explicit primitive `clientRequirements` declaration, but MUST NOT infer a requirement when the Tool declares none.

Tool Interaction Examples are MCP Description metadata, not fields of the MCP Tool type. <a id="req-interaction-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-interaction-projection-omitted&gt;</code></a></small></span> Projection to an MCP `tools/list` Tool value MUST omit `interactionExamples` unless an independently specified MCP extension defines a destination. <a id="req-interaction-views-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-views-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-interaction-views-preserved&gt;</code></a></small></span> Effective Protocol View projection MUST preserve the selected Tool declaration's scenario map without combining disjoint variants. Merge tooling MUST NOT concatenate step arrays or guess how to combine unequal same-name scenarios.

Interaction scenarios are untrusted descriptive content. <a id="req-interaction-no-secrets"></a>Authors MUST use fictitious or sanitized values and MUST NOT include secrets, credentials, opaque runtime request state, task handles, or live session identifiers. <a id="req-interaction-untrusted"></a>Consumers MUST treat URLs, prompts, roots, and generated content as data and MUST NOT navigate, execute, or trust them merely because a scenario exists.

### 9.5 Protocol Variants and Security

<a id="req-tool-names-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-names-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-tool-names-disjoint&gt;</code></a></small></span> Tools with the same `name` MUST have pairwise-disjoint effective protocol scopes. Projection therefore yields at most one declaration for that name. An omitted scope covers all root protocol versions and overlaps every scoped Tool with the same name.

Tool `security` describes statically known authorization required to call the Tool and replaces inherited transport or root security in full.

Tool `clientRequirements` applies only to invocation through `tools/call`. It does not state that a client needs those capabilities to discover the Tool through `tools/list`.

### 9.6 Tool Annotations

Tool Annotations provide hints about Tool behavior. They are distinct from the Resource Annotations used by Resources, Resource Templates, and content blocks (see [Section 10.3](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#103-resource-annotations)). <a id="req-tool-annotations-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-annotations-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-annotations-members#required-by" title="This requirement is part of rule: mcp.tool-annotations.members"><code>&lt;req-tool-annotations-fields&gt;</code></a></small></span> A Tool `annotations` object MUST use the fields and semantics in this section; Resource Annotation fields such as `audience`, `priority`, and `lastModified` do not acquire those semantics when placed on a Tool.

All Tool Annotation properties are advisory. They are not guaranteed to describe Tool behavior faithfully, including `title`. <a id="req-tool-annotations-untrusted"></a>Clients MUST treat Tool Annotations from untrusted servers as untrusted and MUST NOT make Tool-use decisions based on them.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | — | Human-readable title for the tool |
| `readOnlyHint` | boolean | `false` | Tool does not modify its environment |
| `destructiveHint` | boolean | `true` | Tool may perform destructive updates |
| `idempotentHint` | boolean | `false` | Repeated calls with same arguments have no additional effect |
| `openWorldHint` | boolean | `true` | Tool may interact with external entities |

<a id="req-tool-annotations-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-annotations-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/tool-annotations-members#required-by" title="This requirement is part of rule: mcp.tool-annotations.members"><code>&lt;req-tool-annotations-closed&gt;</code></a></small></span> The Tool Annotations object contains only the properties above. MCP defines `ToolAnnotations` as a closed type in every supported protocol version, so other properties, including `x-*` keys, MUST NOT appear. Resource Annotation fields MUST NOT be used here.

### 9.7 Execution Object

<a id="req-execution-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-execution-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-execution-fields&gt;</code></a></small><br></span>

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `taskSupport` | string | `"forbidden"` | Whether the tool supports task-augmented execution: `"forbidden"`, `"optional"`, or `"required"` |

### 9.8 Example

```json
{
  "tools": [
    {
      "name": "analyze_game",
      "title": "Analyze Chess Game",
      "description": "Analyze a chess game from PGN notation and return evaluation scores",
      "inputSchema": {
        "type": "object",
        "properties": {
          "pgn": {
            "type": "string",
            "description": "Game in Portable Game Notation (PGN) format"
          },
          "depth": {
            "type": "integer",
            "description": "Analysis depth in half-moves",
            "minimum": 1,
            "maximum": 40
          }
        },
        "required": ["pgn"]
      },
      "outputSchema": {
        "type": "object",
        "properties": {
          "evaluation": { "type": "number", "description": "Centipawn evaluation" },
          "best_move": { "type": "string", "description": "Best move in algebraic notation" },
          "blunders": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "move_number": { "type": "integer" },
                "move": { "type": "string" },
                "evaluation_loss": { "type": "number" }
              }
            }
          }
        }
      },
      "annotations": {
        "readOnlyHint": true,
        "destructiveHint": false,
        "idempotentHint": true
      },
      "tags": ["analysis", "chess"]
    },
    {
      "name": "get_player_rating",
      "title": "Get Player Rating",
      "description": "Get the current Elo rating and rating history for a chess player",
      "inputSchema": {
        "type": "object",
        "properties": {
          "player_id": {
            "type": "string",
            "description": "Unique player identifier"
          },
          "rating_type": {
            "type": "string",
            "enum": ["classical", "rapid", "blitz", "bullet"],
            "description": "Type of rating to retrieve"
          }
        },
        "required": ["player_id"]
      },
      "annotations": {
        "readOnlyHint": true,
        "destructiveHint": false
      },
      "tags": ["rating", "player"]
    },
    {
      "name": "record_game_result",
      "title": "Record Game Result",
      "description": "Record the result of a chess game and update player ratings",
      "inputSchema": {
        "type": "object",
        "properties": {
          "white_player_id": { "type": "string", "description": "White player identifier" },
          "black_player_id": { "type": "string", "description": "Black player identifier" },
          "result": {
            "type": "string",
            "enum": ["1-0", "0-1", "1/2-1/2"],
            "description": "Game result in standard notation"
          },
          "pgn": { "type": "string", "description": "Full game PGN (optional)" },
          "time_control": { "type": "string", "description": "Time control (e.g., '10+0', '3+2')" }
        },
        "required": ["white_player_id", "black_player_id", "result"]
      },
      "annotations": {
        "readOnlyHint": false,
        "destructiveHint": false,
        "idempotentHint": false
      },
      "tags": ["rating", "game"]
    }
  ]
}
```

---

## 10. Resources and Resource Templates

### 10.1 Resources

The `resources` array declares the static resources exposed by the MCP server. Each resource represents a data source identified by a URI.

#### 10.1.1 Resource Object

<a id="req-resource-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-resource-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-members#required-by" title="This requirement is part of rule: mcpdesc.resource.members"><code>&lt;req-resource-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `protocolVersions` | array\<string\> | No | MCP protocol versions to which this declaration applies. |
| `uri` | string (URI) | **Yes** | Resource URI. |
| `name` | string | **Yes** | Programmatic resource name (identifier). |
| `title` | string | No | Human-readable display name for UI contexts. Since MCP 2025-06-18. |
| `description` | string | No | Human-readable resource description. |
| `mimeType` | string | No | MIME type of the resource content. |
| `size` | integer | No | Size of the raw resource content in bytes. |
| `annotations` | [Resource Annotations Object](#103-resource-annotations) | No | Audience, priority, and modification-time hints. |
| `examples` | map\<string, [Resource Example Object](#1042-static-resource-example-object)\> | No | Named completed Resource read examples. |
| `icons` | non-empty array\<Icon\> | No | Icons for UI display. Since MCP 2025-11-25. |
| `tags` | non-empty array\<string\> | No | Categorization tags. <a id="req-resource-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-resource-tags-references&gt;</code></a></small></span> When a root-level `tags` array is present, values MUST reference declared tag names (see [Section 13.3](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#133-tag-references)). |
| `elicitations` | non-empty array\<Elicitation Declaration Object\> | No | Additional user interactions that MAY be required while reading the Resource (see [Section 12](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation)). |
| `deprecated` | boolean | No | Whether the resource is deprecated. |
| `_meta` | object | No | Literal MCP metadata on the Resource declaration, subject to [Section 3.5](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#35-mcp-_meta). Since MCP 2025-06-18. |
| `security` | Security Requirement Array | No | Primitive security override. |
| `clientRequirements` | [Client Capability Requirements Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/capabilities#85-primitive-client-capability-requirements) | No | Unconditional minimum client capabilities required for `resources/read`; does not apply to resource listing. |

<a id="req-resource-size-integer"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-size-integer" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/resource-size#required-by" title="This requirement is part of rule: mcp.resource.size"><code>&lt;req-resource-size-integer&gt;</code></a></small></span> `size`, when present, MUST be an integer, in a Resource declaration and in resource link content blocks alike: MCP declares it as an unannotated `number`, which denotes an integer (see [Section 3.6](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#36-carried-mcp-values)). MCP defines no minimum.

#### 10.1.2 Resource URI

The `uri` property identifies the resource. <a id="req-resource-uri-syntax"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-uri-syntax" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/resource-uri#required-by" title="This requirement is part of rule: mcp.resource.uri"><code>&lt;req-resource-uri-syntax&gt;</code></a></small></span> It MUST be a URI as defined by [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986), with a scheme, not a relative reference. The URI scheme is not constrained — servers MAY use custom URI schemes appropriate to their domain.

### 10.2 Resource Templates

The `resourceTemplates` array declares parameterized resource definitions using URI templates ([RFC 6570](https://www.rfc-editor.org/rfc/rfc6570)).

#### 10.2.1 Resource Template Object

<a id="req-resource-template-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-resource-template-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-members#required-by" title="This requirement is part of rule: mcpdesc.resource.members"><code>&lt;req-resource-template-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `protocolVersions` | array\<string\> | No | MCP protocol versions to which this declaration applies. |
| `uriTemplate` | string | **Yes** | URI template (RFC 6570). |
| `name` | string | **Yes** | Programmatic template name (identifier). |
| `title` | string | No | Human-readable display name for UI contexts. Since MCP 2025-06-18. |
| `description` | string | No | Human-readable template description. |
| `mimeType` | string | No | MIME type of the resource content. |
| `annotations` | [Resource Annotations Object](#103-resource-annotations) | No | Audience, priority, and modification-time hints. |
| `examples` | map\<string, [Resource Template Example Object](#1043-resource-template-example-object)\> | No | Named concrete URI and completed read-result examples. |
| `completionExamples` | map\<string, [Completion Example Object](#1046-resource-template-completion-examples)\> | No | Named `completion/complete` request-result observations for template variables. |
| `icons` | non-empty array\<Icon\> | No | Icons for UI display. Since MCP 2025-11-25. |
| `tags` | non-empty array\<string\> | No | Categorization tags. <a id="req-resource-template-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-template-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-resource-template-tags-references&gt;</code></a></small></span> When a root-level `tags` array is present, values MUST reference declared tag names (see [Section 13.3](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#133-tag-references)). |
| `elicitations` | non-empty array\<Elicitation Declaration Object\> | No | Additional user interactions that MAY be required while reading an expanded Resource (see [Section 12](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation)). |
| `deprecated` | boolean | No | Whether the template is deprecated. |
| `_meta` | object | No | Literal MCP metadata on the Resource Template declaration, subject to [Section 3.5](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#35-mcp-_meta). Since MCP 2025-06-18. |
| `security` | Security Requirement Array | No | Primitive security override. |
| `clientRequirements` | [Client Capability Requirements Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/capabilities#85-primitive-client-capability-requirements) | No | Unconditional minimum client capabilities required to read a concrete URI produced from the template; does not apply to template listing. |

<a id="req-resource-template-uri-template"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-template-uri-template" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/resource-template-uri-template#required-by" title="This requirement is part of rule: mcp.resource-template.uri-template"><code>&lt;req-resource-template-uri-template&gt;</code></a></small></span> `uriTemplate` MUST be a valid RFC 6570 URI template, whether or not the Resource Template has examples.

### 10.3 Resource Annotations

Resource Annotations provide optional client hints about how a Resource, Resource Template, or content block may be used or displayed. They are distinct from the behavioral [Tool Annotations](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#96-tool-annotations) on a Tool Object.

| Property | Type | Description |
|----------|------|-------------|
| `audience` | array\<string\> | Intended audiences. Each value is `"user"` or `"assistant"`. |
| `priority` | number | Relative importance from `0` (least important) through `1` (most important). |
| `lastModified` | string | Resource modification time in ISO 8601 form. Since MCP 2025-06-18. |

Resource Annotations have been available throughout the MCP protocol versions supported by this specification. <a id="req-resource-annotations-last-modified"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-annotations-last-modified" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/annotations-last-modified-protocol-version#required-by" title="This requirement is part of rule: mcp.annotations.last-modified.protocol-version"><code>&lt;req-resource-annotations-last-modified&gt;</code></a></small></span> MCP 2024-11-05 and MCP 2025-03-26 define `audience` and `priority`; `lastModified` MUST NOT be used in an Effective Protocol View before MCP 2025-06-18.

Resource Annotations are hints rather than access controls or integrity claims. <a id="req-resource-annotations-hints"></a>Consumers MUST NOT treat `audience` as authorization, `priority` as a mandatory processing order, or `lastModified` as proof of freshness. <a id="req-resource-annotations-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-annotations-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/annotations-members#required-by" title="This requirement is part of rule: mcp.annotations.members"><code>&lt;req-resource-annotations-closed&gt;</code></a></small></span> The object contains only the properties above. MCP defines `Annotations` as a closed type in every supported protocol version, so other properties, including `x-*` keys and Tool Annotation fields, MUST NOT appear.

Annotations on a Resource describe the concrete Resource declaration returned by resource discovery. Annotations on a Resource Template describe the template declaration as a whole; they are not observations about one particular URI expansion. Named Resource examples instead represent completed `resources/read` results. <a id="req-resource-annotations-not-in-examples"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-annotations-not-in-examples" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/content-members#required-by" title="This requirement is part of rule: mcp.content.members"><code>&lt;req-resource-annotations-not-in-examples&gt;</code></a></small></span> Their Resource Contents entries follow the applicable MCP Resource Contents type, which does not define `annotations`, so declaration annotations MUST NOT be moved into an example result. MCP Description 0.9.0 does not define per-example Resource Annotations.

In MCP protocol values, the same Resource Annotations type also applies to supported content blocks, including text, image, audio, embedded-resource, and resource-link content where those block types are available in the applicable protocol version. <a id="req-content-annotations-distinct"></a> <span class="mcpdesc-rule-links" data-anchor="req-content-annotations-distinct" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/annotations-members#required-by" title="This requirement is part of rule: mcp.annotations.members"><code>&lt;req-content-annotations-distinct&gt;</code></a></small></span> MCP Description fields that embed such protocol content MUST retain the distinction between Resource Annotations and Tool Annotations.

### 10.4 Named Resource Examples

#### 10.4.1 Shared Named-Map Rules

A Resource or Resource Template Object MAY contain an `examples` map. Each value MAY be the applicable inline example object or a Reference Object targeting `resourceExamples` for a Resource or `resourceTemplateExamples` for a Resource Template. <a id="req-resource-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-resource-examples-map&gt;</code></a></small></span> When present, the map MUST contain at least one entry. Each case-sensitive local example name MUST match `^[A-Za-z0-9._-]+$` and is scoped to its containing declaration. Entry order is not semantically significant. The map key is both a human-meaningful label and a stable local selection name; 0.9.0 does not define separate example prose fields. <a id="req-resource-example-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-resource-example-references-resolved&gt;</code></a></small></span> A referenced example MUST be resolved before applying URI, result-shape, content, and protocol-scope requirements at its use site.

Declarations for the same `uri` or `uriTemplate` in disjoint effective protocol scopes have independent example maps.

#### 10.4.2 Static Resource Example Object

<a id="req-resource-example-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-resource-example-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-resource-example-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `result` | [Completed Resource Read Result](#1044-completed-resource-read-result) | **Yes** | Completed `resources/read` result payload for the containing Resource's `uri`, excluding the JSON-RPC envelope. |

The object MAY carry `x-*` specification extensions; no other additional properties are allowed. <a id="req-resource-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-resource-example-closed&gt;</code></a></small></span> The requested URI is implicit in the containing Resource and MUST NOT be duplicated at the example level.

#### 10.4.3 Resource Template Example Object

<a id="req-resource-template-example-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-resource-template-example-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-resource-template-example-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `uri` | string | **Yes** | Concrete Resource URI used as `resources/read.params.uri`. |
| `result` | [Completed Resource Read Result](#1044-completed-resource-read-result) | **Yes** | Completed `resources/read` result payload for `uri`, excluding the JSON-RPC envelope. |

The object MAY carry `x-*` specification extensions; no other additional properties are allowed. <a id="req-resource-template-example-expansion"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-template-example-expansion" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-template-example-expansion#required-by" title="This requirement is part of rule: mcpdesc.resource-template.example.expansion"><code>&lt;req-resource-template-example-expansion&gt;</code></a></small></span> `uri` MUST be a valid RFC 6570 expansion of the containing `uriTemplate`. It records the exact request value rather than reverse-inferred template variables.

#### 10.4.4 Completed Resource Read Result

The `result` value represents the value inside a successful JSON-RPC response's `result` member. <a id="req-resource-example-contents"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-contents" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-resource-example-contents&gt;</code></a></small></span> It MUST contain a non-empty `contents` array. <a id="req-resource-example-result-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-result-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/cacheable-result-ttl-ms#required-by" title="This requirement is part of rule: mcp.cacheable-result.ttl-ms"><code>&lt;req-resource-example-result-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-resource-example-result-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-result-protocol-fidelity#required-by" title="This requirement is part of rule: mcpdesc.example.result.protocol-fidelity"><code>&lt;req-resource-example-result-shape&gt;</code></a></small></span> For MCP 2026-07-28 it MUST contain `resultType: "complete"`, non-negative integer `ttlMs`, and `cacheScope` equal to `"public"` or `"private"`; these are required fields of the MCP `CacheableResult` extended by `ReadResourceResult`. Earlier supported protocol versions do not define these fields; when present for those protocol versions they follow [Section 3.6](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#36-carried-mcp-values), so a declaration whose examples span MCP 2026-07-28 and an earlier protocol version MAY share one example map. <a id="req-resource-contents-meta"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-contents-meta" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/resource-contents-meta-protocol-version#required-by" title="This requirement is part of rule: mcp.resource-contents.meta.protocol-version"><code>&lt;req-resource-contents-meta&gt;</code></a></small></span> Result `_meta` is available in every supported protocol version, and Resource Contents `_meta` is available from MCP 2025-06-18; both are literal illustrative values governed by [Section 3.5](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#35-mcp-_meta), not reusable metadata contracts. In MCP 2026-07-28, result `_meta` MAY use `io.modelcontextprotocol/serverInfo` with an MCP Implementation value; request-only and notification-only reserved keys are invalid here. <a id="req-resource-example-completed-form"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-completed-form" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-completed-result-form#required-by" title="This requirement is part of rule: mcpdesc.example.completed-result-form"><code>&lt;req-resource-example-completed-form&gt;</code></a></small></span> JSON-RPC envelope fields, errors, task state, input-required state, and other non-completed workflows MUST NOT appear.

<a id="req-resource-contents-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-contents-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/content-members#required-by" title="This requirement is part of rule: mcp.content.members"><code>&lt;req-resource-contents-fields&gt;</code></a></small></span> Every `contents` entry MUST contain `uri` and exactly one of `text` or `blob`. <a id="req-resource-example-blob-base64"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-blob-base64" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/resource-contents-blob-base64#required-by" title="This requirement is part of rule: mcp.resource-contents.blob.base64"><code>&lt;req-resource-example-blob-base64&gt;</code></a></small></span> A `blob` value MUST be valid base64. <a id="req-resource-example-order"></a>An example MAY contain multiple entries; consumers MUST preserve their order and MUST NOT assume every returned URI equals the requested URI.

<a id="req-resource-example-requested-uri"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-requested-uri" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-example-consistency#required-by" title="This requirement is part of rule: mcpdesc.resource.example.consistency"><code>&lt;req-resource-example-requested-uri&gt;</code></a></small></span> For both static and template examples, at least one returned entry SHOULD identify the requested URI unless documented collection or indirection semantics explain otherwise. Every returned URI MUST be valid. <a id="req-resource-example-mime-type"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-mime-type" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-example-consistency#required-by" title="This requirement is part of rule: mcpdesc.resource.example.consistency"><code>&lt;req-resource-example-mime-type&gt;</code></a></small></span> When the declaration has `mimeType`, the corresponding returned entry SHOULD use the same type; a validator SHOULD warn rather than fail when they differ because an individual representation may legitimately be more specific. The entry's own `mimeType` is authoritative for rendering it.

For a static Resource with `size`, tooling MAY compare the declared raw byte count with matching example text encoded as UTF-8 or decoded binary. <a id="req-resource-example-size"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-size" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-example-consistency#required-by" title="This requirement is part of rule: mcpdesc.resource.example.consistency"><code>&lt;req-resource-example-size&gt;</code></a></small></span> A mismatch SHOULD be reported as a warning because examples and mutable Resources can represent different observations.

Resource read errors are JSON-RPC errors and are not Resource Examples in 0.9.0.

#### 10.4.5 Use, Projection, and Security

Resource examples are illustrative, non-exhaustive snapshots. They do not assert live equality, freshness, immutability, cache validity, or complete coverage. Protocol version-supported metadata is part of the example and is not a guarantee about a live server. In particular, `ttlMs` and `cacheScope` reproduce the illustrated MCP 2026-07-28 result; they do not govern caching of the MCP Description document or authorize sharing captured or live content across authorization contexts.

<a id="req-resource-example-tooling"></a>Documentation tooling SHOULD preserve names, concrete template URIs, result fields, and content order. Mock and contract-test tooling MAY select an exact named example. It MUST NOT dereference example URIs or fetch a live Resource while loading or serving an inline or referenced example. This specification defines no default example, wildcard match, template fallback, dynamic behavior, or external value.

Resource examples are MCP Description metadata, not fields of MCP Resource or Resource Template list values. <a id="req-resource-example-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-resource-example-projection-omitted&gt;</code></a></small></span> Projection to MCP list values MUST omit `examples` unless an independent MCP extension defines a destination. <a id="req-resource-example-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-example-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-resource-example-views&gt;</code></a></small></span> Effective Protocol View projection preserves the selected declaration's map and MUST NOT combine maps from declarations with disjoint scopes. MCP Description round-tripping MUST preserve example names and values.

Examples and their URIs are untrusted. <a id="req-resource-example-no-secrets"></a>Authors MUST NOT include secrets and SHOULD use conspicuously fictitious content. <a id="req-resource-example-untrusted"></a>Consumers MUST NOT dereference URIs automatically, MUST render content safely, MUST treat MIME types as untrusted hints, and SHOULD impose encoded-size, decoded-size, and processing limits. Binary fixtures SHOULD be decoded and inspected before publication.

#### 10.4.6 Resource Template Completion Examples

A Resource Template Object MAY contain `completionExamples`, a local non-empty map from an example name to an inline Completion Example Object. Unlike Resource Template `examples`, `completionExamples` do not support a component namespace or `$componentRef`; the containing Resource Template supplies the completion target identity.

<a id="req-template-completion-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-template-completion-examples-map&gt;</code></a></small></span> Each name MUST match `^[A-Za-z0-9._-]+$`, is case-sensitive, and is scoped to the containing Resource Template declaration. Entry order is not semantically significant. A Completion Example Object MAY carry `x-*` specification extensions and contains these properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `argument` | object | **Yes** | The selected template variable being completed, with required string `name` and `value`. |
| `context` | object | No | Optional contextual `arguments` map of already-supplied variable values. |
| `result` | object | **Yes** | Completed applicable MCP `completion/complete` result payload, excluding the JSON-RPC envelope. |

<a id="req-template-completion-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-template-completion-example-closed&gt;</code></a></small></span> The Completion Example Object MUST NOT contain other unprefixed properties. The `argument` object MUST contain required string properties `name` and `value`. <a id="req-template-completion-target"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-target" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/completion-example-target#required-by" title="This requirement is part of rule: mcpdesc.completion-example.target"><code>&lt;req-template-completion-target&gt;</code></a></small></span> `argument.name` MUST identify one RFC 6570 variable in the containing `uriTemplate`. Every `context.arguments` key MUST identify another RFC 6570 variable from the same template, and the completed argument MUST NOT also appear in context. Variable identity is determined by parsing RFC 6570 expressions: operators and modifiers do not change the variable name, so `{+path}` identifies `path`, `{id:3}` identifies `id`, and `{owner,repository}` identifies both `owner` and `repository`.

`context` MAY be omitted. <a id="req-template-completion-context-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-context-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-template-completion-context-shape&gt;</code></a></small></span> When present, it MUST contain a non-empty `arguments` map whose values are strings. An empty context MUST be omitted rather than represented as an empty object. <a id="req-template-completion-context-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-context-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/completion-context-protocol-version#required-by" title="This requirement is part of rule: mcp.completion.context.protocol-version"><code>&lt;req-template-completion-context-protocol-version&gt;</code></a></small></span> MCP 2025-03-26 does not define completion context, so a Resource Template completion example spanning that protocol version and a later protocol version MUST be split into disjoint protocol-scoped Resource Template declarations when context is needed.

<a id="req-template-completion-result"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-result" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-template-completion-result&gt;</code></a></small></span> `result` MUST contain `completion.values`, an ordered array of string candidates. It MAY preserve native `completion.total`, `completion.hasMore`, and protocol version-supported result `_meta`. For MCP 2026-07-28 it MUST contain `resultType: "complete"`. Fields that an applicable protocol version does not define follow [Section 3.6](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#36-carried-mcp-values). JSON-RPC envelope fields, errors, and incomplete workflows are not completion examples. Resource Template completion examples are valid only in an effective protocol scope where MCP defines completion and every represented field. <a id="req-template-completion-protocol-versions"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-protocol-versions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/completion-protocol-version#required-by" title="This requirement is part of rule: mcp.completion.protocol-version"><code>&lt;req-template-completion-protocol-versions&gt;</code></a></small></span> MCP Description does not support completion examples for MCP 2024-11-05.

Completion examples are illustrative and non-exhaustive. They do not create enums, defaults, authorization grants, or a promise that a future request yields the same candidates, ordering, total, or pagination state. <a id="req-template-completion-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-template-completion-projection-omitted&gt;</code></a></small></span> Projection to MCP Resource Template list values MUST omit `completionExamples` unless an independent MCP extension defines a destination. <a id="req-template-completion-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-template-completion-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-template-completion-views&gt;</code></a></small></span> Effective Protocol View projection and round-tripping MUST preserve the selected declaration's `completionExamples` map and MUST NOT merge maps from disjoint protocol variants.

### 10.5 Protocol Variants and Security

<a id="req-resource-scopes-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-resource-scopes-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-resource-scopes-disjoint&gt;</code></a></small></span> Resources with the same `uri` MUST have pairwise-disjoint effective protocol scopes. Resource Templates with the same `uriTemplate` MUST likewise have pairwise-disjoint effective protocol scopes.

Resource `security` describes statically known authorization required to access it. Resource Template `security` describes authorization required to use the template to access matching resources. Each replaces inherited transport or root security in full.

Resource `clientRequirements` applies only to `resources/read` of its URI. Resource Template `clientRequirements` applies only to `resources/read` of a concrete URI produced from the template. Neither applies to `resources/list` or `resources/templates/list`.

### 10.6 Examples

**Static resources for chess game history:**

```json
{
  "resources": [
    {
      "uri": "chess://leaderboard/classical",
      "name": "classical_leaderboard",
      "title": "Classical Leaderboard",
      "description": "Current top-100 classical chess ratings leaderboard",
      "mimeType": "application/json",
      "protocolVersions": ["2026-07-28"],
      "annotations": {
        "audience": ["user", "assistant"],
        "priority": 0.9,
        "lastModified": "2026-08-24T10:00:00Z"
      },
      "examples": {
        "top-two": {
          "result": {
            "resultType": "complete",
            "ttlMs": 60000,
            "cacheScope": "public",
            "contents": [
              {
                "uri": "chess://leaderboard/classical",
                "mimeType": "application/json",
                "text": "{\"players\":[{\"name\":\"Example A\",\"rating\":2810},{\"name\":\"Example B\",\"rating\":2795}]}"
              }
            ]
          }
        }
      },
      "tags": ["leaderboard", "rating"]
    },
    {
      "uri": "chess://leaderboard/rapid",
      "name": "rapid_leaderboard",
      "title": "Rapid Leaderboard",
      "description": "Current top-100 rapid chess ratings leaderboard",
      "mimeType": "application/json",
      "tags": ["leaderboard", "rating"]
    },
    {
      "uri": "chess://rules/fide-2024",
      "name": "fide_rules",
      "title": "FIDE Rules 2024",
      "description": "Official FIDE Laws of Chess (2024 edition)",
      "mimeType": "text/markdown",
      "tags": ["rules", "reference"]
    }
  ]
}
```

**Resource templates for parameterized access:**

```json
{
  "resourceTemplates": [
    {
      "uriTemplate": "chess://games/{game_id}",
      "name": "game_detail",
      "title": "Game Detail",
      "description": "Full details of a specific chess game including PGN, moves, and analysis",
      "mimeType": "application/json",
      "protocolVersions": ["2026-07-28"],
      "annotations": {
        "audience": ["assistant"],
        "priority": 0.7
      },
      "examples": {
        "sample-game": {
          "uri": "chess://games/example-1234",
          "result": {
            "resultType": "complete",
            "ttlMs": 60000,
            "cacheScope": "private",
            "contents": [
              {
                "uri": "chess://games/example-1234",
                "mimeType": "application/json",
                "text": "{\"id\":\"example-1234\",\"result\":\"1-0\"}"
              }
            ]
          }
        }
      },
      "tags": ["game", "history"]
    },
    {
      "uriTemplate": "chess://players/{player_id}/games?from={start_date}&to={end_date}",
      "name": "player_game_history",
      "title": "Player Game History",
      "description": "Game history for a specific player within an optional date range",
      "mimeType": "application/json",
      "tags": ["game", "history", "player"]
    },
    {
      "uriTemplate": "chess://players/{player_id}/rating-history",
      "name": "player_rating_history",
      "title": "Player Rating History",
      "description": "Historical rating progression for a player",
      "mimeType": "application/json",
      "tags": ["rating", "history", "player"]
    }
  ]
}
```

---

## 11. Prompts

The `prompts` array declares the prompt templates exposed by the MCP server. Each prompt is a server-side template that clients can invoke with arguments to generate messages.

### 11.1 Prompt Object

<a id="req-prompt-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-prompt-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-prompt-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `protocolVersions` | array\<string\> | No | MCP protocol versions to which this declaration applies. |
| `name` | string | **Yes** | Programmatic prompt name (identifier). |
| `title` | string | No | Human-readable display name for UI contexts. Since MCP 2025-06-18. |
| `description` | string | No | Human-readable prompt description. |
| `arguments` | non-empty array\<[Prompt Argument](#112-prompt-argument-object)\> | No | Prompt arguments. |
| `examples` | map<string, Prompt Example Object> | No | Named complete Prompt invocation/result pairs. |
| `completionExamples` | map<string, Completion Example Object> | No | Named `completion/complete` request-result observations for Prompt arguments. |
| `icons` | non-empty array\<Icon\> | No | Icons for UI display. Since MCP 2025-11-25. |
| `tags` | non-empty array\<string\> | No | Categorization tags. <a id="req-prompt-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-prompt-tags-references&gt;</code></a></small></span> When a root-level `tags` array is present, values MUST reference declared tag names (see [Section 13.3](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#133-tag-references)). |
| `elicitations` | non-empty array\<Elicitation Declaration Object\> | No | Additional user interactions that MAY be required while retrieving the Prompt (see [Section 12](https://mcpdesc.org/docs/specification/0.9.0-rc.3/elicitation)). |
| `deprecated` | boolean | No | Whether the prompt is deprecated. |
| `_meta` | object | No | Literal MCP metadata on the Prompt declaration, subject to [Section 3.5](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#35-mcp-_meta). Since MCP 2025-06-18. |
| `security` | Security Requirement Array | No | Primitive security override. |
| `clientRequirements` | [Client Capability Requirements Object](https://mcpdesc.org/docs/specification/0.9.0-rc.3/capabilities#85-primitive-client-capability-requirements) | No | Unconditional minimum client capabilities required for `prompts/get`; does not apply to `prompts/list`. |

<a id="req-prompt-scopes-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-scopes-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-prompt-scopes-disjoint&gt;</code></a></small></span> Prompt declarations with the same `name` MUST have pairwise-disjoint effective protocol scopes. Prompt `security` describes statically known authorization required to retrieve the Prompt and replaces inherited transport or root security in full.

Prompt `clientRequirements` applies only to retrieval through `prompts/get`. It does not state that a client needs those capabilities to discover the Prompt through `prompts/list`.

### 11.2 Prompt Argument Object

<a id="req-prompt-argument-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-prompt-argument-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-prompt-argument-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Programmatic argument name (identifier). |
| `title` | string | No | Human-readable display name for UI contexts. Since MCP 2025-06-18. |
| `description` | string | No | Argument description. |
| `required` | boolean | No | Whether the argument is required. |

### 11.3 Named Prompt Examples

A Prompt Object MAY contain `examples`, a map from a local example name to an inline Prompt Example Object or a Reference Object targeting `#/components/promptExamples/<name>`. <a id="req-prompt-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-examples-map&gt;</code></a></small></span> When present, the map MUST contain at least one entry. Each name MUST match `^[A-Za-z0-9._-]+$`; names are case-sensitive, scoped to the containing Prompt declaration, and serve as both human-meaningful labels and stable local selection names. Entry order is not semantically significant. <a id="req-prompt-example-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-prompt-example-references-resolved&gt;</code></a></small></span> A referenced example MUST be resolved before applying every contextual requirement of the containing Prompt and effective protocol scope.

<a id="req-prompt-example-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-example-fields&gt;</code></a></small></span> A Prompt Example Object contains these core properties and MAY carry `x-*` specification extensions:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `arguments` | map<string, string> | No | Complete `prompts/get.params.arguments` value; omission and `{}` both mean no arguments. |
| `result` | object | **Yes** | Complete applicable completed `GetPromptResult` payload, excluding the JSON-RPC envelope. |

<a id="req-prompt-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-example-closed&gt;</code></a></small></span> The Prompt Example Object MUST NOT contain other additional properties.

`arguments` MAY be omitted. <a id="req-prompt-example-arguments-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-arguments-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-example-arguments-shape&gt;</code></a></small></span> When present, it MUST be an object whose values are strings. <a id="req-prompt-example-arguments"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-arguments" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/prompt-example-arguments#required-by" title="This requirement is part of rule: mcpdesc.prompt.example.arguments"><code>&lt;req-prompt-example-arguments&gt;</code></a></small></span> Every key MUST identify an argument declared by the containing Prompt, and every declared argument with `required: true` MUST be present. Optional arguments MAY be omitted. <a id="req-prompt-example-completed-form"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-completed-form" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-completed-result-form#required-by" title="This requirement is part of rule: mcpdesc.example.completed-result-form"><code>&lt;req-prompt-example-completed-form&gt;</code></a></small></span> The example MUST NOT contain transport metadata, JSON-RPC IDs, method names, or request `_meta`.

<a id="req-prompt-example-result-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-result-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-prompt-example-result-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-result-protocol-fidelity#required-by" title="This requirement is part of rule: mcpdesc.example.result.protocol-fidelity"><code>&lt;req-prompt-example-result-shape&gt;</code></a></small></span> `result` MUST preserve the ordered `messages` array and MUST have the completed Prompt result shape defined by every applicable protocol version. For MCP 2026-07-28 it MUST contain `resultType: "complete"`. Fields that an applicable protocol version does not define follow [Section 3.6](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#36-carried-mcp-values). It MAY preserve the native result `description`. Task, input-required, streaming, partial, and JSON-RPC error forms are not Prompt Examples.

Protocol version-supported `_meta` on the completed result and message content is literal illustrative metadata governed by [Section 3.5](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#35-mcp-_meta). It is not request metadata or a schema declaration. <a id="req-prompt-example-content-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-content-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/content-block-protocol-version#required-by" title="This requirement is part of rule: mcp.content-block.protocol-version"><code>&lt;req-prompt-example-content-protocol-version&gt;</code></a></small></span> Message `content` MAY use any content-block form supported by every applicable protocol version.

Prompt examples are illustrative and non-exhaustive. They do not change Prompt arguments, capabilities, security, client requirements, or runtime behavior, and they do not guarantee deterministic or current output. <a id="req-prompt-example-tooling"></a>Documentation tooling SHOULD preserve example names and argument/result pairing. Mock or contract-test tooling MAY permit explicit selection by name but MUST NOT present an unnamed selection as a prediction of live behavior.

Examples are untrusted descriptive content. <a id="req-prompt-example-no-secrets"></a>Authors MUST NOT include secrets and SHOULD use conspicuously fictitious values. <a id="req-prompt-example-untrusted"></a>Consumers MUST validate values, render content as data, and apply appropriate size and evaluation limits. They MUST NOT treat examples as authorization, proof of behavior, or safe executable instructions.

Prompt Examples are MCP Description metadata, not fields of the MCP Prompt type. <a id="req-prompt-example-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-prompt-example-projection-omitted&gt;</code></a></small></span> Projection to an MCP `prompts/list` Prompt value MUST omit `examples` unless an independently specified MCP extension defines a destination. <a id="req-prompt-example-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-prompt-example-views&gt;</code></a></small></span> MCP Description round-tripping and protocol-version projection MUST preserve each selected Prompt declaration's example map and MUST NOT merge maps from disjoint variants with the same Prompt name.

### 11.4 Prompt Completion Examples

A Prompt Object MAY contain `completionExamples`, a local non-empty map from an example name to an inline Completion Example Object. Completion examples do not use `#/components/promptExamples` or any other component namespace; the containing Prompt declaration supplies the completion target identity.

<a id="req-prompt-completion-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-completion-examples-map&gt;</code></a></small></span> Each name MUST match `^[A-Za-z0-9._-]+$`, is case-sensitive, and is scoped to the containing Prompt declaration. Entry order is not semantically significant. A Completion Example Object MAY carry `x-*` specification extensions and contains these properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `argument` | object | **Yes** | The selected Prompt argument being completed, with required string `name` and `value`. |
| `context` | object | No | Optional contextual `arguments` map of already-supplied Prompt argument values. |
| `result` | object | **Yes** | Completed applicable MCP `completion/complete` result payload, excluding the JSON-RPC envelope. |

<a id="req-prompt-completion-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-completion-example-closed&gt;</code></a></small></span> The Completion Example Object MUST NOT contain other unprefixed properties. The `argument` object MUST contain required string properties `name` and `value`. <a id="req-prompt-completion-target"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-target" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/completion-example-target#required-by" title="This requirement is part of rule: mcpdesc.completion-example.target"><code>&lt;req-prompt-completion-target&gt;</code></a></small></span> `argument.name` MUST identify one declared Prompt Argument. Every `context.arguments` key MUST identify another declared Prompt Argument, and the completed argument MUST NOT also occur in context. Context MAY be partial: omission of a required Prompt argument means only that the illustrated completion request did not provide it.

`context` MAY be omitted. <a id="req-prompt-completion-context-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-context-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-completion-context-shape&gt;</code></a></small></span> When present, it MUST contain a non-empty `arguments` map whose values are strings. An empty context MUST be omitted rather than represented as an empty object. <a id="req-prompt-completion-context-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-context-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/completion-context-protocol-version#required-by" title="This requirement is part of rule: mcp.completion.context.protocol-version"><code>&lt;req-prompt-completion-context-protocol-version&gt;</code></a></small></span> MCP 2025-03-26 does not define completion context, so a Prompt completion example spanning that protocol version and a later protocol version MUST be split into disjoint protocol-scoped Prompt declarations when context is needed.

<a id="req-prompt-completion-result"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-result" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-prompt-completion-result&gt;</code></a></small></span> `result` MUST contain `completion.values`, an ordered array of string candidates. It MAY preserve native `completion.total`, `completion.hasMore`, and protocol version-supported result `_meta`. For MCP 2026-07-28 it MUST contain `resultType: "complete"`. Fields that an applicable protocol version does not define follow [Section 3.6](https://mcpdesc.org/docs/specification/0.9.0-rc.3/document-structure#36-carried-mcp-values). JSON-RPC envelope fields, errors, and incomplete workflows are not Prompt completion examples. Prompt completion examples are valid only in an effective protocol scope where MCP defines completion and every represented field. <a id="req-prompt-completion-protocol-versions"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-protocol-versions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/completion-protocol-version#required-by" title="This requirement is part of rule: mcp.completion.protocol-version"><code>&lt;req-prompt-completion-protocol-versions&gt;</code></a></small></span> MCP Description does not support completion examples for MCP 2024-11-05.

Completion examples are illustrative and non-exhaustive. They do not change Prompt arguments, retrieval requirements, capabilities, security, or runtime behavior, and they do not convert candidates into enums, defaults, or claims of future availability. <a id="req-prompt-completion-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-prompt-completion-projection-omitted&gt;</code></a></small></span> Projection to an MCP Prompt list value MUST omit `completionExamples` unless an independently specified MCP extension defines a destination. <a id="req-prompt-completion-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-prompt-completion-views&gt;</code></a></small></span> MCP Description round-tripping and protocol-version projection MUST preserve each selected Prompt declaration's `completionExamples` map and MUST NOT merge maps from disjoint variants with the same Prompt name.

### 11.5 Protocol Variants and Security

```json
{
  "prompts": [
    {
      "name": "city_briefing",
      "title": "City Briefing",
      "description": "Generate a role-specific city briefing",
      "protocolVersions": ["2026-07-28"],
      "arguments": [
        {
          "name": "city",
          "required": true
        },
        {
          "name": "audience"
        }
      ],
      "examples": {
        "paris-engineering": {
          "arguments": {
            "city": "Paris",
            "audience": "engineering"
          },
          "result": {
            "resultType": "complete",
            "description": "Engineering briefing for Paris",
            "messages": [
              {
                "role": "user",
                "content": {
                  "type": "text",
                  "text": "Summarize current engineering considerations for Paris."
                }
              }
            ]
          }
        }
      }
    },
    {
      "name": "greeting",
      "protocolVersions": ["2025-11-25"],
      "examples": {
        "default": {
          "result": {
            "messages": [
              {
                "role": "assistant",
                "content": {
                  "type": "text",
                  "text": "Hello."
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

<a id="req-prompt-variants-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-variants-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-prompt-variants-disjoint&gt;</code></a></small></span> Prompt declarations with the same `name` MUST have pairwise-disjoint effective protocol scopes. Prompt `security` describes statically known authorization required to retrieve the Prompt and replaces inherited transport or root security in full.

Prompt `clientRequirements` applies only to retrieval through `prompts/get`. It does not state that a client needs those capabilities to discover the Prompt through `prompts/list`.

---

## 12. Elicitation Declarations

### 12.1 Purpose and Placement

An Elicitation Declaration documents that fulfillment of a Tool, Resource, Resource Template, or Prompt may require additional interaction with the user through the MCP client.

Tool, Resource, Resource Template, and Prompt Objects MAY contain an `elicitations` array of Elicitation Declaration Objects. <a id="req-elicitations-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitations-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-elicitations-non-empty&gt;</code></a></small></span> The array MUST contain at least one declaration when present. A Resource Template declaration applies to `resources/read` operations on concrete Resource URIs produced from that template; it does not describe elicitation during template discovery.

An Elicitation Declaration describes durable server behavior rather than the protocol-specific wire exchange. It does not assert that every fulfillment triggers the interaction or that every client can fulfill it. <a id="req-elicitation-not-capability"></a>A conditional or optional Elicitation Declaration MUST NOT by itself be interpreted as an unconditional `clientRequirements.elicitation` capability requirement.

### 12.2 Elicitation Declaration Object

<a id="req-elicitation-declaration-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-elicitation-declaration-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-declaration-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Stable local declaration name. |
| `mode` | `"form"` or `"url"` | **Yes** | Canonical elicitation mode. |
| `message` | string | **Yes** | Representative user-facing explanation of the interaction. |
| `when` | string | No | Human-readable description of when the interaction may occur. |
| `requestedSchema` | object or Reference Object | Conditional | Inline or reusable restricted MCP form-response schema. |
| `url` | string (URI) | No | Static URL when known at description-authoring time. |
| `onDecline` | string | No | Human-readable expected behavior after explicit decline. |
| `onCancel` | string | No | Human-readable expected behavior after cancellation or dismissal. |
| `protocolVersions` | array\<string\> | No | MCP protocol versions to which this declaration applies. |

<a id="req-elicitation-name-format"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-name-format" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-name-format&gt;</code></a></small></span> `name` MUST match `^[A-Za-z0-9._-]+$`. <a id="req-elicitation-name-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-name-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-name-unique#required-by" title="This requirement is part of rule: mcpdesc.elicitation.name-unique"><code>&lt;req-elicitation-name-unique&gt;</code></a></small></span> Names are case-sensitive and MUST be unique within the containing primitive declaration.

<a id="req-elicitation-message"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-message" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-message&gt;</code></a></small></span> `message` MUST be non-empty. It documents the explanation a user should receive and MAY be representative or default wording when runtime context changes the exact text. <a id="req-elicitation-runtime-wording"></a>Runtime wording SHOULD NOT materially contradict the documented purpose, but mcpdesc does not require byte-for-byte equality.

<a id="req-elicitation-documentation-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-documentation-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-documentation-fields&gt;</code></a></small></span> `when`, `onDecline`, and `onCancel`, when present, MUST be non-empty descriptive contract documentation. They are not executable expressions, client instructions, or statically provable guarantees.

Although applicable MCP protocol versions permit omission of runtime `mode` for form elicitation, mcpdesc requires explicit `mode` to provide one canonical static representation.

### 12.3 Form Mode

For `mode: "form"`:

- <a id="req-elicitation-form-schema-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-schema-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-form-schema-required&gt;</code></a></small></span> `requestedSchema` is REQUIRED;
- <a id="req-elicitation-form-no-url"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-no-url" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-form-no-url&gt;</code></a></small></span> `url` MUST NOT appear; and
- <a id="req-elicitation-form-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/elicitation-form-schema-members#required-by" title="This requirement is part of rule: mcp.elicitation.form-schema.members"><code>&lt;req-elicitation-form-shape&gt;</code></a></small></span> `requestedSchema` MUST describe an object with only the property schemas allowed by every applicable MCP protocol version.

`requestedSchema` MAY be a Reference Object targeting the `schemas` component namespace. <a id="req-elicitation-schema-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-schema-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-elicitation-schema-references-resolved&gt;</code></a></small></span> The referenced schema MUST be resolved before applying every restricted-vocabulary and effective-protocol-scope requirement in this section.

The schema is limited to a flat object whose properties use MCP elicitation primitive schemas. Nested objects and arrays other than MCP-supported multi-select enumeration forms are invalid. Unsupported keywords and unsupported string formats are invalid.

MCP 2025-06-18 supports string, number, integer, boolean, and legacy string-enum property schemas. It permits string length constraints and the `email`, `uri`, `date`, and `date-time` formats, numeric bounds, boolean defaults, and optional `enumNames` corresponding to enum values. It does not define `$schema`, defaults for strings, numbers, or enums, titled `oneOf` enums, or multi-select arrays.

MCP 2025-11-25 and MCP 2026-07-28 additionally support defaults for all primitive types, standard titled single-select enums, titled and untitled multi-select enums, and the legacy `enumNames` form. <a id="req-elicitation-form-vocabulary"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-vocabulary" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/elicitation-form-schema-protocol-shape#required-by" title="This requirement is part of rule: mcp.elicitation.form-schema.protocol-shape"><code>&lt;req-elicitation-form-vocabulary&gt;</code></a></small></span> Validators MUST apply the vocabulary of every applicable protocol version.

<a id="req-elicitation-form-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-required&gt;</code></a></small></span> A `required` entry MUST name a property declared in `properties`. <a id="req-elicitation-form-enum-names"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-enum-names" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-enum-names&gt;</code></a></small></span> `enumNames`, when present, MUST contain one display name for every enum value. <a id="req-elicitation-form-defaults"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-defaults" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-defaults&gt;</code></a></small></span> An enum default MUST be one of its declared values, and every multi-select default value MUST occur in its declared item choices. <a id="req-elicitation-form-ranges"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-ranges" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-ranges&gt;</code></a></small></span> Minimum constraints MUST NOT exceed their corresponding maximum constraints.

### 12.4 URL Mode

For `mode: "url"`:

- <a id="req-elicitation-url-no-schema"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-url-no-schema" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-url-no-schema&gt;</code></a></small></span> `requestedSchema` MUST NOT appear;
- <a id="req-elicitation-url-syntax"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-url-syntax" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-url-syntax&gt;</code></a></small></span> `url`, when present, MUST be a syntactically valid URI; and
- omission of `url` means the concrete URL is generated or selected at runtime.

A runtime URL-mode elicitation still supplies every field required by the applicable MCP protocol version. Omission in mcpdesc does not make the runtime URL optional.

Validation of `url` is syntax-only. <a id="req-elicitation-url-no-fetch"></a>Validators and other consumers MUST NOT retrieve, prefetch, dereference, or otherwise access it while processing a description. A conforming declaration does not assert that the target is currently available, trusted, immutable, controlled by the server, or suitable for automatic navigation.

### 12.5 Protocol Applicability

An omitted Elicitation Declaration `protocolVersions` inherits the effective scope of its containing primitive. <a id="req-elicitation-scope"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-scope" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-elicitation-scope&gt;</code></a></small></span> An explicit scope MUST be non-empty and MUST be a subset of that containing scope.

Complete protocol-version-specific validation begins with MCP 2025-06-18:

- MCP 2025-06-18 supports form mode;
- MCP 2025-11-25 supports form and URL modes; and
- MCP 2026-07-28 supports form and URL modes.

<a id="req-elicitation-protocol-versions"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-protocol-versions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/elicitation-protocol-version#required-by" title="This requirement is part of rule: mcp.elicitation.protocol-version"><code>&lt;req-elicitation-protocol-versions&gt;</code></a></small></span> A declaration spanning multiple protocol versions MUST satisfy every applicable protocol version. Authors MUST split materially incompatible declarations into disjoint scopes.

MCP 2024-11-05 and MCP 2025-03-26 retain the legacy compatibility treatment in Section 3.5. <a id="req-elicitation-legacy-incomplete"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-legacy-incomplete" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/legacy-protocol-validation-scope#required-by" title="This requirement is part of rule: mcpdesc.legacy-protocol.validation-scope"><code>&lt;req-elicitation-legacy-incomplete&gt;</code></a></small></span> Validators apply structural and selected sound checks, issue the existing incomplete-validation diagnostic, and MUST NOT report complete MCP semantic conformance.

### 12.6 Static-Description Boundary

The applicable MCP protocol version remains authoritative for execution. MCP Description does not model whether elicitation uses a server-initiated request or Multi Round-Trip Requests, nor lifecycle messages, identifiers, request state, retries, correlation, capability negotiation, or transport behavior. Static primitive `clientRequirements` may record an unconditional minimum elicitation capability without defining any of that choreography.

A mock, gateway, documentation tool, or client MAY use a declaration to render its message, collect a form response matching `requestedSchema`, or present a known URL. The declaration alone does not define when a mock triggers the interaction, how it selects among declarations, how responses modify state, or which final primitive result follows.

Elicitation Declarations are distinct from named primitive examples. Tool Examples pair a complete invocation with a completed Tool Result, Tool `interactionExamples` add ordered semantic client-input steps for one Tool invocation, and Resource Examples contain completed read results. None of these models preserve JSON-RPC envelopes, MRTR request state, retries, timing, or a general executable workflow language.

The applicable MCP elicitation specification remains authoritative for runtime security and privacy requirements. MCP Description validation does not inspect or certify runtime behavior, privacy compliance, or security conformance and defines no sensitive-field diagnostic.

### 12.7 Example

```yaml
tools:
  - name: assign_issue
    description: Assign an issue to a teammate.
    inputSchema:
      type: object
      properties:
        issue:
          type: integer
        assignee:
          type: string
      required: [issue]
      additionalProperties: false
    elicitations:
      - name: choose_assignee
        mode: form
        when: No assignee was supplied.
        message: Who should own this issue?
        requestedSchema:
          type: object
          properties:
            assignee:
              type: string
              title: Assignee
          required: [assignee]
        onDecline: Leave the issue unassigned.
        onCancel: Abort without modifying the issue.
```

---

## 13. Tags

The root-level `tags` array defines a flat, document-wide tag catalogue for the MCP server. <a id="req-tags-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-tags-non-empty&gt;</code></a></small></span> It is OPTIONAL and MUST be non-empty when present. Tags are supplemental MCP Description metadata; they are not fields defined by the MCP protocol.

When present, `tags` declares all valid tags that MAY be referenced by tools, resources, resource templates, and prompts. <a id="req-tags-display-order"></a>The array order determines display priority — tags appearing earlier in the array SHOULD be presented first in UIs and documentation.

### 13.1 Tag Object

<a id="req-tag-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-tag-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tag-members#required-by" title="This requirement is part of rule: mcpdesc.tag.members"><code>&lt;req-tag-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Tag identifier. <a id="req-tag-name-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-tag-name-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tag-name-unique&gt;</code></a></small></span> MUST be unique across all tags. |
| `description` | string | No | Human-readable description of the tag's purpose. |

### 13.2 Tag Uniqueness

<a id="req-tags-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tags-unique&gt;</code></a></small></span> Tag names MUST be unique across all tags in the array. Implementations MUST reject documents containing duplicate tag names.

### 13.3 Tag References

<a id="req-entity-tags-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-entity-tags-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-entity-tags-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-members#required-by" title="This requirement is part of rule: mcpdesc.resource.members"><code>&lt;req-entity-tags-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-entity-tags-shape&gt;</code></a></small></span> Per-entity `tags` arrays (on tools, resources, resource templates, and prompts) MUST be non-empty when present and contain plain strings referencing tag names. When a root-level `tags` array is present:

- <a id="req-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tags-references&gt;</code></a></small></span> Every tag referenced by an entity MUST be declared in the root `tags` array.
- <a id="req-tags-undeclared-error"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-undeclared-error" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tags-undeclared-error&gt;</code></a></small></span> Implementations MUST treat a reference to an undeclared tag as a validation error.
- <a id="req-entity-tags-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-entity-tags-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-entity-tags-unique&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-members#required-by" title="This requirement is part of rule: mcpdesc.resource.members"><code>&lt;req-entity-tags-unique&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-entity-tags-unique&gt;</code></a></small></span> Per-entity tag arrays MUST NOT contain duplicate values.

When the root-level `tags` array is absent, per-entity tags are unconstrained strings (backward-compatible behavior). An empty root tag catalogue is invalid; <a id="req-tags-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-tags-omitted&gt;</code></a></small></span> producers MUST omit `tags` when no catalogue entries are declared.

### 13.4 Protocol Scopes and Effective Protocol Views

The root tag catalogue is not protocol-scoped. A tag describes a categorization concept across the MCP Description document rather than protocol behavior. <a id="req-tags-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-tags-views&gt;</code></a></small></span> An Effective Protocol View MUST preserve the complete root tag catalogue, including entries not referenced by a primitive retained in that view.

Protocol-scoped variants of the same primitive MAY use different `tags` arrays. Every reference in every variant is still validated against the document-wide root catalogue when that catalogue is present.

<a id="req-tags-merge"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-merge" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-tags-merge&gt;</code></a></small></span> Merge inputs MUST therefore agree on the root tag catalogue under the general unscoped-metadata merge rules. Merge tooling MUST NOT infer, discard, or synthesize catalogue entries from the tags referenced in individual views.

Elicitation Declarations do not carry tags. They are named behaviors nested within an already categorizable Tool, Resource, Resource Template, or Prompt. A future extension of tags to nested behaviors requires a separate use case and compatibility decision.

### 13.5 Example

Flat tag list with entity references:

```json
{
  "tags": [
    { "name": "analysis", "description": "Game analysis tools" },
    { "name": "rating", "description": "Player and game rating tools" },
    { "name": "history", "description": "Game history and records" },
    { "name": "leaderboard", "description": "Ranking leaderboards" },
    { "name": "player", "description": "Player-specific data" }
  ],
  "tools": [
    {
      "name": "analyze_game",
      "tags": ["analysis"]
    },
    {
      "name": "get_player_rating",
      "tags": ["rating", "player"]
    }
  ],
  "resources": [
    {
      "uri": "chess://leaderboards/classical",
      "name": "classical_leaderboard",
      "tags": ["leaderboard", "rating"]
    }
  ]
}
```

---

## 14. Specification Extensions

MCP Description documents support vendor-specific metadata through specification extensions on explicitly eligible semantic objects.

### 14.1 Extension Naming

<a id="req-extension-names"></a> <span class="mcpdesc-rule-links" data-anchor="req-extension-names" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-extension-names&gt;</code></a></small></span> Specification extension properties MUST match the pattern `^x-`. Names are case-sensitive. <a id="req-extension-naming-convention"></a>The RECOMMENDED naming convention is:

```
x-{organization}-{feature}
```

<a id="req-extension-lowercase-prefixes"></a>Authors SHOULD use lowercase organization prefixes. Examples include `x-acme-owner`, `x-example-runtime-observations`, and `x-example-cost-profile`.

### 14.2 Extension Placement

A specification extension MAY appear directly on the root MCP Description Object or another eligible MCP Description-defined semantic object. Eligible categories in 0.9.0 are:

- Info, Contact, License, Icon, and Tag Objects;
- Transport Objects and MCP Description-defined transport configuration objects;
- Security Scheme, OAuth Flows, and OAuth Flow Objects;
- the Capabilities Object, Client Capability Requirements Object, and MCP Description-defined capability declaration objects;
- Tool, Resource, Resource Template, Prompt, Prompt Argument, and Elicitation Declaration Objects; and
- MCP Description-defined named Tool, Resource, and Resource Template Example wrapper objects; and
- the outer Components Object and semantic Tool, Resource, and Resource Template Example component values.

Eligibility follows the object's specification-defined role, not the fact that a serialized value is a JSON object. A map value that is an eligible object MAY carry extensions, but the containing map does not thereby gain an extension slot.

<a id="req-extension-ineligible-locations"></a> <span class="mcpdesc-rule-links" data-anchor="req-extension-ineligible-locations" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/server-capabilities-members#required-by" title="This requirement is part of rule: mcp.server-capabilities.members"><code>&lt;req-extension-ineligible-locations&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-members#required-by" title="This requirement is part of rule: mcpdesc.components.members"><code>&lt;req-extension-ineligible-locations&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-requirements#required-by" title="This requirement is part of rule: mcpdesc.security.requirements"><code>&lt;req-extension-ineligible-locations&gt;</code></a></small></span> Specification extensions MUST NOT appear directly on scalar values; domain-keyed maps; Security Requirement Objects; the `capabilities.extensions` or `clientRequirements.extensions` protocol-extension map; embedded JSON Schemas; carried MCP payload, result, annotation, or `_meta` objects; opaque example or extension values; arbitrary JSON payloads; or Reference Objects unless the Reference Object specification explicitly defines adjacent-extension resolution behavior. Those locations retain the rules of their owning format or object model.

The outer Components Object and eligible semantic example component values MAY carry `x-*` properties. Component namespace maps, embedded schemas, and Reference Objects remain ineligible. <a id="req-extension-component-names"></a> <span class="mcpdesc-rule-links" data-anchor="req-extension-component-names" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-members#required-by" title="This requirement is part of rule: mcpdesc.components.members"><code>&lt;req-extension-component-names&gt;</code></a></small></span> An `x-*` key inside a component namespace map is an ordinary component name and its value MUST satisfy that namespace's component type.

### 14.3 Extension Values

An extension value MAY be any JSON-compatible value: object, array, string, number, boolean, or null. <a id="req-extension-object-values"></a>Authors SHOULD prefer an object when the value may evolve compatibly.

### 14.4 Processing Rules

<a id="req-extension-unknown-accepted"></a> <span class="mcpdesc-rule-links" data-anchor="req-extension-unknown-accepted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-extension-unknown-accepted&gt;</code></a></small></span> An implementation that does not recognize a specification extension MUST NOT reject the document because of that extension, MUST ignore it when interpreting core MCP Description semantics, and SHOULD preserve it when processing and reserializing the document. A consumer MUST NOT infer core semantics from an unrecognized extension.

<a id="req-extension-no-core-override"></a>A specification extension MUST NOT redefine, contradict, or weaken a core requirement. It cannot make a required field optional, change `security` or protocol applicability, or make an invalid example conforming. Core fields remain authoritative.

A validator MAY validate a recognized extension using a configured trusted schema. <a id="req-extension-schema-unavailable"></a>Failure to obtain that schema MUST NOT invalidate an otherwise conforming document unless the validator identifies a separate profile that requires the extension.

### 14.5 Ownership, Projection, and Merge

An object-level extension belongs to its containing semantic object and follows that object's lifecycle and Effective Protocol View. A nested `protocolVersions` member inside an extension value has no MCP Description scoping meaning.

<a id="req-extension-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-extension-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-extension-views&gt;</code></a></small></span> A single-version projection MUST preserve every `x-*` property on a retained eligible object unless extension stripping was explicitly requested. Projection MUST NOT move it, combine it with `_meta`, or reinterpret it as an MCP protocol extension. Removing an out-of-scope owner removes its extensions with it. Native MCP projection (Section 4.14) produces MCP values rather than an MCP Description document and omits `x-*` properties outside embedded JSON Schemas.

Extensions participate in the semantic representation of their containing object. Merge tools MAY collapse objects with semantically equivalent extension values under the ordinary merge rules. <a id="req-extension-merge"></a> <span class="mcpdesc-rule-links" data-anchor="req-extension-merge" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-extension-merge&gt;</code></a></small></span> For conflicting values on corresponding objects, a merge tool MUST retain distinct non-overlapping variants where representable or report a conflict. It MUST NOT guess, silently discard an extension, or move it to another object.

### 14.6 Extension Documentation

<a id="req-extension-documentation"></a>Extension authors SHOULD publish a JSON Schema for the value, purpose and semantic documentation, versioning information, and the eligible MCP Description object types on which the extension is valid.

### 14.7 Relationship to Other Extension Mechanisms

Object-level `x-*`, literal MCP `_meta`, formal MCP `capabilities.extensions`, and formal MCP `clientRequirements.extensions` are separate mechanisms. <a id="req-extension-mechanisms-separate"></a>Tooling MUST NOT automatically copy, project, or reinterpret data among them. `x-*` is MCP Description-specific vendor metadata; `_meta` represents literal MCP metadata in supported contexts; `capabilities.extensions` declares server extension support; and `clientRequirements.extensions` declares an unconditional primitive-level client extension requirement.

### 14.8 Security and Privacy

<a id="req-extension-no-secrets"></a>Authors MUST NOT publish credentials, tokens, user identifiers, confidential topology, live trace identifiers, or other secrets in extensions. <a id="req-extension-untrusted"></a>Consumers MUST treat extension names and values as untrusted content and apply appropriate size, output-encoding, rendering, logging, and execution controls. Unknown extensions MUST NOT bypass core conformance or security checks. Validators SHOULD avoid automatic network retrieval of extension schemas.

### 14.9 Example

```json
{
  "mcpdesc": "0.9.0",
  "info": {
    "name": "account-service",
    "version": "1.0.0",
    "x-acme-owner": { "team": "identity" }
  },
  "protocolVersions": ["2026-07-28"],
  "tools": [
    {
      "name": "delete_account",
      "inputSchema": { "type": "object" },
      "x-acme-governance": {
        "risk": "high",
        "reviewRequired": true
      }
    }
  ]
}
```

---

## 15. Serialization

### 15.1 Conforming Serializations

An MCP Description MAY be serialized as JSON or as restricted YAML. Both serializations decode to the single JSON-compatible MCP Description data model defined in Section 3.1 and use the same JSON Schema and semantic-validation requirements.

<a id="req-serialization-support"></a>A conforming document consumer or producer MUST support at least one conforming serialization and MUST declare whether it supports JSON, YAML, or both for each applicable input or output capability.

### 15.2 JSON Serialization

An MCP Description MAY be serialized as JSON. <a id="req-serialization-json"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-json" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-json&gt;</code></a></small></span> JSON serialization MUST conform to [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) and MUST be encoded in UTF-8.

<a id="req-serialization-json-claims"></a>A consumer that claims JSON input support MUST accept conforming JSON MCP Description documents. A producer that claims JSON output support MUST emit conforming JSON MCP Description documents. General MCP Description conformance does not make JSON support mandatory or preferred over YAML support.

The recommended JSON file extension remains:

```text
.mcpdesc.json
```

The recommended JSON media type remains:

```text
application/mcp-description+json
```

### 15.3 YAML Serialization

An MCP Description MAY be serialized as YAML 1.2.2 using the JSON schema defined by Section 10.2.1.3 of the [YAML 1.2.2 specification](https://yaml.org/spec/1.2.2/) for scalar resolution.

<a id="req-serialization-yaml-claims"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-claims" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-claims&gt;</code></a></small></span> A consumer that claims YAML input support MUST accept YAML MCP Description documents that satisfy this restricted profile and MUST reject documents that violate it. A producer that claims YAML output support MUST emit only documents that satisfy the restricted profile. General MCP Description conformance does not make YAML support mandatory or preferred over JSON support.

<a id="req-serialization-yaml-single-document"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-single-document" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-single-document&gt;</code></a></small></span> A YAML MCP Description MUST consist of exactly one YAML document and MUST decode to the JSON-compatible MCP Description data model defined in Section 3.1. A YAML stream containing zero or multiple documents MUST be rejected.

The recommended YAML file extensions are:

```text
.mcpdesc.yaml
.mcpdesc.yml
```

with `.mcpdesc.yaml` preferred.

The recommended YAML media type is:

```text
application/mcp-description+yaml
```

The project-specific `application/mcp-description+yaml` media type is not registered by RFC 9512. Its `+yaml` structured syntax suffix and the generic `application/yaml` media type are registered by [RFC 9512](https://www.rfc-editor.org/rfc/rfc9512). <a id="req-serialization-media-type"></a>Generic tooling SHOULD use `application/yaml` when the project-specific media type is unavailable or inappropriate.

#### 15.3.1 String Mapping Keys

<a id="req-serialization-yaml-string-keys"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-string-keys" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-string-keys&gt;</code></a></small></span> Every YAML mapping key MUST resolve to a string. Complex keys, sequence keys, numeric keys, boolean keys, null keys, and other non-string keys MUST be rejected.

#### 15.3.2 Duplicate Mapping Keys

<a id="req-serialization-yaml-duplicate-keys"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-duplicate-keys" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-duplicate-keys&gt;</code></a></small></span> A YAML mapping MUST NOT contain duplicate keys after scalar resolution. Implementations MUST reject duplicate keys rather than silently keeping the first or last value.

#### 15.3.3 Scalar Resolution and Numeric Values

<a id="req-serialization-yaml-scalars"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-scalars" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-scalars&gt;</code></a></small></span> A YAML processor MUST use the YAML 1.2.2 JSON schema for scalar resolution. A YAML scalar used as an MCP Description value MUST resolve to a string, finite number, boolean, or null. Non-finite numeric values such as positive infinity, negative infinity, and NaN MUST be rejected.

The YAML 1.2.2 JSON schema does not implicitly resolve timestamps. Date-time and date values therefore remain strings; <a id="req-serialization-yaml-quoted-dates"></a>authors SHOULD still quote them for clarity and portability across authoring tools.

#### 15.3.4 Tags and Safe Parsing

<a id="req-serialization-yaml-tags"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-tags" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-tags&gt;</code></a></small></span> Application-specific, language-specific, or custom YAML tags MUST NOT be used. Implementations MUST use a safe parser mode that does not instantiate application objects or execute constructors based on tags.

#### 15.3.5 Anchors and Aliases

<a id="req-serialization-yaml-aliases"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-aliases" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-aliases&gt;</code></a></small></span> YAML aliases and alias-based recursive structures MUST NOT be used in a conforming MCP Description YAML serialization. Implementations SHOULD reject documents containing aliases. This restriction avoids graph identity, recursion, and expansion semantics that have no representation in the JSON-compatible data model.

<a id="req-serialization-explicit-reuse"></a>Authors who need semantic reuse SHOULD duplicate the value explicitly or use a specification-defined reuse mechanism when one is available.

#### 15.3.6 Merge Keys

<a id="req-serialization-yaml-merge-keys"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-merge-keys" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-merge-keys&gt;</code></a></small></span> YAML merge-key conventions such as `<<` MUST NOT be interpreted as structural merge operations by MCP Description tooling. If a parser exposes `<<` as an ordinary string key, the resulting MCP Description will normally fail the MCP Description schema because `<<` is not a defined property. Implementations MUST NOT apply YAML merge semantics before MCP Description validation.

### 15.4 Parsing and Validation Pipeline

<a id="req-serialization-yaml-validation"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-yaml-validation" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/serialization-conforming#required-by" title="This requirement is part of rule: mcpdesc.serialization.conforming"><code>&lt;req-serialization-yaml-validation&gt;</code></a></small></span> A conforming validator that accepts YAML MUST parse YAML using the restrictions above, reject unsupported YAML constructs, normalize the parsed representation to the JSON-compatible MCP Description data model, apply the same MCP Description JSON Schema used for JSON documents, and apply the same cross-object and semantic validation used for JSON documents. A validator MUST NOT have weaker semantic validation for YAML than for JSON.

The MCP Description JSON Schema remains authoritative for structural instance validation. It is published as JSON and applies to the decoded data model regardless of the source serialization.

### 15.5 Serialization Equivalence

If a JSON document and a YAML document decode to the same JSON-compatible data model, they are semantically equivalent MCP Description documents, subject to the ordinary MCP Description semantic-equivalence rules. Source formatting, comments, quoting style, YAML block style, and object-key order do not participate in semantic equivalence.

<a id="req-serialization-conversion"></a>Tools that convert between JSON and YAML MUST preserve the decoded MCP Description data model, subject only to non-semantic source details such as comments, scalar style, and mapping order.

### 15.6 Common Value Requirements

<a id="req-serialization-numbers"></a>Implementations MUST support finite IEEE 754 double-precision floating-point numbers. Properties with `null` values SHOULD be omitted rather than included with a `null` value unless the property explicitly permits `null`.

<a id="req-serialization-empty-collections"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-empty-collections" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-serialization-empty-collections&gt;</code></a></small></span> An ordinary declaration collection with no entries MUST be omitted; an explicit empty array or object is not conforming. <a id="req-serialization-empty-values-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-empty-values-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-serialization-empty-values-preserved&gt;</code></a></small></span> Serialization MUST NOT convert omission into an explicit empty value. Implementations MUST preserve semantically significant empty values and MUST NOT convert them to omission. In particular, `security: []` clears inherited security while omission inherits it, `security: [{}]` declares an anonymous alternative, and empty Security Requirement scope arrays remain significant; these forms are not interchangeable.

<a id="req-serialization-value-formats"></a> <span class="mcpdesc-rule-links" data-anchor="req-serialization-value-formats" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/annotations-members#required-by" title="This requirement is part of rule: mcp.annotations.members"><code>&lt;req-serialization-value-formats&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/icon-members#required-by" title="This requirement is part of rule: mcp.icon.members"><code>&lt;req-serialization-value-formats&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcp/resource-uri#required-by" title="This requirement is part of rule: mcp.resource.uri"><code>&lt;req-serialization-value-formats&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/info-members#required-by" title="This requirement is part of rule: mcpdesc.info.members"><code>&lt;req-serialization-value-formats&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/security-scheme-members#required-by" title="This requirement is part of rule: mcpdesc.security-scheme.members"><code>&lt;req-serialization-value-formats&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/transport-members#required-by" title="This requirement is part of rule: mcpdesc.transport.members"><code>&lt;req-serialization-value-formats&gt;</code></a></small></span> String values MUST be valid JSON strings after decoding. URI values MUST conform to [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986). Email values SHOULD conform to [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322). Date values MUST conform to ISO 8601.

### 15.7 Schema Reference

<a id="req-serialization-schema-property"></a>MCP Description documents SHOULD include a `$schema` property referencing the appropriate JSON Schema for IDE validation and tooling support. The property has the same meaning in JSON and YAML, and the referenced schema remains a JSON Schema when the instance is serialized as YAML.

For the current 0.9.0 community working draft, the canonical value is `https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json`. The stable 0.9.0 release will instead use `https://mcpdesc.org/schema/mcp-description/0.9.0.json`. The `$schema` value does not change the required `mcpdesc: 0.9.0` discriminator.

```yaml
$schema: https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json
mcpdesc: 0.9.0
```

### 15.8 Producer and Consumer Guidance

<a id="req-serialization-negotiation"></a>Producers and consumers SHOULD explicitly communicate or negotiate the serialization when it cannot be determined from a file extension, media type, or other enclosing protocol metadata. Implementations MAY support JSON, YAML, or both according to their use case and declared capabilities.

<a id="req-serialization-untrusted"></a>Implementations MUST treat JSON and YAML input as untrusted and impose reasonable document-size, nesting-depth, scalar-length, and collection-size limits.

---

## 16. Conformance

### 16.1 Document Conformance

<a id="req-conforming-document"></a> <span class="mcpdesc-rule-links" data-anchor="req-conforming-document" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-conforming-document&gt;</code></a></small></span> A conforming MCP Description document MUST:

1. Decode from one conforming JSON or restricted YAML serialization to the JSON-compatible MCP Description data model (Sections 3.1 and 15).
2. Include the `mcpdesc` property with a recognized specification version (Section 4).
3. Include the `info` object with at least `name` and `version` (Section 5).
4. Include non-empty root `protocolVersions` containing only protocol versions supported by mcpdesc 0.9.0 (Section 4).
5. Contain at least one entry in every present ordinary declaration collection (Section 3.3).
6. When `transports` is present, contain at least one Transport Object and provide complete root protocol coverage (Section 6).
7. <a id="req-document-schema"></a> <span class="mcpdesc-rule-links" data-anchor="req-document-schema" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-document-schema&gt;</code></a></small></span> Validate against the JSON Schema for the declared `mcpdesc` version.
8. Satisfy semantic scope, identifier, Elicitation Declaration, client-requirement, security-reference, tag-reference, component-reference, protocol version-applicability, embedded Tool schema and example, and `x-mcp-header` constraints.
9. Not contain unknown properties on closed MCP Description-defined objects except specification extensions matching `^x-` at eligible locations.

### 16.2 Implementation Conformance

<a id="req-conforming-implementation"></a>A conforming implementation (tool, validator, or platform) MUST:

1. Support at least one conforming serialization and declare JSON, YAML, or both for each applicable input or output capability.
2. Accept and correctly parse conforming documents in every serialization for which it claims input support.
3. Emit only conforming documents in every serialization for which it claims output support.
4. Reject documents that fail the requirements in Section 16.1 or the restricted profile of a claimed input serialization.
5. Ignore unrecognized specification extensions when interpreting core semantics and accept them without error at eligible locations (Section 14.4).
6. Preserve root and object-level specification extensions when processing, projecting, merging, and reserializing documents unless explicitly requested to strip them (Sections 14.4 and 14.5). Native MCP projection produces MCP values, not documents, and omits them (Section 4.14).
7. Apply the same structural JSON Schema validation and cross-object semantic requirements after decoding JSON or YAML.
8. Use safe YAML parsing and reject unsupported YAML constructs when claiming YAML input support (Section 15.3).
9. Apply reasonable document-size, nesting-depth, scalar-length, and collection-size limits to supported input serializations.
10. Resolve `$componentRef` only within the same parsed document, without network access, before contextual semantic validation.

The published JSON Schema expresses structural constraints only. JSON-Schema-only acceptance is insufficient for document conformance because protocol scope, protocol version applicability, Client Capability Requirements, Elicitation Declarations, security and component reference resolution, embedded Tool schemas and examples, extension namespace diagnostics, and other cross-object rules require semantic validation.

A warning condition defined by this specification is non-fatal and does not by itself make a document non-conforming. <a id="req-stricter-profile"></a>An implementation MAY offer a stricter profile that promotes warnings to errors, but it MUST identify that profile separately from baseline mcpdesc conformance.

Complete protocol-version-specific `_meta` validation begins with MCP 2025-06-18. <a id="req-legacy-validation-scope"></a> <span class="mcpdesc-rule-links" data-anchor="req-legacy-validation-scope" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/legacy-protocol-validation-scope#required-by" title="This requirement is part of rule: mcpdesc.legacy-protocol.validation-scope"><code>&lt;req-legacy-validation-scope&gt;</code></a></small></span> For the recognized legacy compatibility protocol versions MCP 2024-11-05 and MCP 2025-03-26, validators MUST apply sound structural and selected checks, SHOULD warn that validation is incomplete, and MUST NOT report partial validation as complete MCP semantic conformance.

<a id="req-implementation-recommendations"></a>A conforming implementation SHOULD:

1. Support at least the current specification version.
2. Provide clear error messages when rejecting non-conforming documents.
3. Support JSON Schema validation against the published schema.

### 16.3 Partial Conformance

<a id="req-partial-support"></a>Implementations that support only a subset of the specification (e.g., only tools, or only a specific transport type) SHOULD document their limitations clearly.

### 16.4 Versioned Conformance

Conformance is assessed against a specific specification version. <a id="req-conformance-claim"></a>An implementation claiming conformance MUST state which `mcpdesc` version(s) it supports.

### 16.5 Validation Results

Validation rules identify the requirements that validators check (Section 2.3). The validation result format, published as [`validation/result.schema.json`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/result.schema.json), represents diagnostics and rule results; [`validation/README.md`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/README.md#rule-results) explains them.

<a id="req-diagnostic-rule"></a>Each diagnostic that a validator reports MUST identify the registered validation rule it reports, its severity, and the location it concerns in the document. When the finding depends on an MCP protocol version, the diagnostic SHOULD identify that version. A diagnostic MAY carry a code and a message; their values belong to the validator and are not defined by this specification.

<a id="req-diagnostic-source-location"></a>The location of a diagnostic MUST identify a value or member name present in
the document as written, before component references are replaced. A diagnostic
for a missing member MUST identify the closest enclosing object; in validation
result format `1.4.0`, its `detail.member` MUST identify the missing member and
its message, when present, SHOULD identify it. A diagnostic for an unexpected
or invalid member name MUST identify that member.

<a id="req-diagnostic-component-provenance"></a>A diagnostic for content reached through `$componentRef` MUST identify the
reference object at the use site as its primary location. In format `1.4.0`, it
MUST also include the location within the component as a related location with
relation `component-definition`. When chained references are resolved, the
related location is in the final component definition. For a finding at
resolved path `P`, the resolver selects the provenance entry whose
`referencePath` is the longest prefix of `P` (including `P` itself). The primary
location is that `referencePath`; the related location is the entry's
`targetPath` followed by the remainder of `P`. When no entry matches, `P` is
already a source-document location. The related location for a missing member
identifies the enclosing component object.

<a id="req-diagnostic-union-conditionals"></a>The document schema MUST express every union with a deterministic, portable
selector as guarded conditionals using JSON Schema 2020-12. A guard MUST use a
discriminator value, the presence of `$componentRef`, a JSON type, or defining
members; a discriminator guard MAY be combined with defining members. The
conditionals MUST select only the applicable alternative and preserve the
original acceptance constraints, including closure, required members, and
specification extensions, except for the explicit closure of the Elicitation
Interaction Response Object in [Section 9.4](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/sections/09-tools.md#req-interaction-response-closed).
A selector typo does not authorize a validator to infer the intended
alternative. A schema check MUST reject unreviewed
`oneOf`/`anyOf` occurrences and conditional guards outside these forms. An
allowlisted `anyOf` remains inclusive and MUST produce one
`missing-alternative` finding at the union value when it fails; failures of its
individual alternatives MUST NOT be emitted.

<a id="req-diagnostic-union-closure"></a>For each discriminated object union, the parent schema MUST declare the union
of member names accepted by its alternatives, keep the discriminator's
constraint, and reject other members while preserving its specification-
extension pattern. Other parent member schemas MUST be `true` so value
constraints remain in the selected branch. Alternative schemas retain their
own closure; a member allowed by a different alternative remains invalid in
the selected alternative.

<a id="req-diagnostic-conditional-reduction"></a>Findings from the selected `then` or `else` branch MUST be retained. A failure
reported for an `if` keyword MUST NOT be emitted when another finding exists
at or below the same instance location. Otherwise it MUST be emitted as kind
`constraint` with keyword `if`. A `not` failure over `required` members MUST
produce one `conflicting-members` finding at the object. Its member list names
the enclosing guard's required members followed by the members forbidden by
`not`; when selected by a discriminator, it also identifies that selector.
Unselected alternatives MUST NOT be reconstructed or inferred.

<a id="req-diagnostic-rule-attribution"></a>A schema-derived finding MUST be attributed to the rule whose catalog schema
pointer is the longest prefix of the absolute schema pointer of the subschema
containing the failing keyword. This is the location in the document schema,
not an engine evaluation path relative to a `$ref`. A shared definition is
therefore attributed to the same rule wherever it is used. A validator MUST
NOT attribute a finding to an enclosing union by choosing a best-matching
alternative. Findings removed by conditional or `anyOf` reduction MUST NOT
cause a rule to be reported as `failed`.

<a id="req-diagnostic-detail"></a>Validation result format `1.4.0` defines factual `detail` for findings derived
from the document schema. It identifies missing, unexpected, or invalid
members and values; expected types; conflicting members; missing alternatives;
and the failing keyword for other constraints. `allowedValues`,
`allowedMembers`, and `expectedTypes` describe the subschema that reported the
finding. The format also defines related component locations. `kind` is
extensible; consumers MUST fall back to `message` for an unrecognized kind.
Detail states facts, not remedies. The location, rule, severity, conditional
reduction, and generic handling of remaining `anyOf` and `not` findings are
specified; raw engine error counts, schema paths, `code`, and `message` wording
are not.

<a id="req-diagnostic-deduplication"></a>Duplicate findings share their source path, rule, severity, kind, and relevant
member or member-list facts; constraint findings are distinguished by failing
keyword. Only one duplicate MUST be emitted: the one whose failing keyword has
the longest absolute schema pointer. Independent findings MUST be retained.
Diagnostic order is not part of the contract; producers SHOULD order findings
by document position.

<a id="req-rule-results"></a>A validator MAY report rule results. A validator that claims conformance with this specification's validation fixtures MUST report them: one status for each rule and each protocol version declared by the document, or one status for a rule whose applicability does not depend on the protocol version. A status is `passed`, `failed`, `warning`, `not-applicable`, `not-evaluated`, or `delegated`. Rule results do not change document validity, which errors alone determine.

<a id="req-rule-results-executed"></a>A rule result MUST come from the checks the validator executed. A validator MUST NOT report `passed` for a rule that it did not check for that protocol version, including when an earlier validation stage failed, when it does not implement the check, or when the check is not applied to a legacy compatibility protocol version.

---

## 17. Reusable Components and Local References

### 17.1 Components Object

The root MCP Description Object MAY contain a `components` property. <a id="req-components-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-components-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-members#required-by" title="This requirement is part of rule: mcpdesc.components.members"><code>&lt;req-components-fields&gt;</code></a></small></span> A Components Object MUST contain at least one property when present and MAY contain these typed namespace maps:

| Property | Type | Description |
|----------|------|-------------|
| `schemas` | non-empty map\<string, JSON Schema Object or Reference Object\> | Reusable schema values. |
| `toolExamples` | non-empty map\<string, Tool Example Object or Reference Object\> | Reusable Tool examples. |
| `resourceExamples` | non-empty map\<string, Resource Example Object or Reference Object\> | Reusable static Resource examples. |
| `resourceTemplateExamples` | non-empty map\<string, Resource Template Example Object or Reference Object\> | Reusable Resource Template examples. |
| `promptExamples` | non-empty map\<string, Prompt Example Object or Reference Object\> | Reusable Prompt examples. |

<a id="req-component-maps"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-maps" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-members#required-by" title="This requirement is part of rule: mcpdesc.components.members"><code>&lt;req-component-maps&gt;</code></a></small></span> Every present namespace map MUST contain at least one entry. Each component name MUST match `^[A-Za-z0-9._-]+$`. Names are case-sensitive and unique only within their namespace.

<a id="req-components-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-components-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-members#required-by" title="This requirement is part of rule: mcpdesc.components.members"><code>&lt;req-components-closed&gt;</code></a></small></span> The outer Components Object MAY carry `x-*` specification extensions and MUST NOT contain other properties. Namespace maps are closed component-name maps rather than extension locations. Schema component values follow JSON Schema, including its extension-keyword rules. Tool, Resource, Resource Template, and Prompt Example component values are eligible semantic objects and MAY carry the same `x-*` specification extensions as their inline forms. Components and component values MUST NOT declare MCP Description `protocolVersions`; protocol applicability is inherited exclusively from each use site.

### 17.2 Reference Object

<a id="req-reference-object-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-reference-object-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-members#required-by" title="This requirement is part of rule: mcpdesc.components.members"><code>&lt;req-reference-object-fields&gt;</code></a></small></span> A Reference Object contains exactly one required property:

| Property | Type | Description |
|----------|------|-------------|
| `$componentRef` | string | Local JSON Pointer to one named value in the compatible `#/components` namespace. |

No sibling property, including an `x-*` property, is permitted. <a id="req-component-reference-form"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-reference-form" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-component-reference-form&gt;</code></a></small></span> The pointer MUST have the form `#/components/<namespace>/<name>`, where `<namespace>` is one of the five namespaces in Section 17.1 and `<name>` follows the component-name grammar. Remote URIs, relative-file references, pointers outside `#/components`, missing targets, and targets in an incompatible namespace are invalid.

A `$componentRef` is an MCP Description reference only at a use site that permits a Reference Object. JSON Schema `$ref` remains governed exclusively by the applicable embedded JSON Schema dialect. <a id="req-component-ref-distinct"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-ref-distinct" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-component-ref-distinct&gt;</code></a></small></span> Implementations MUST NOT accept `$ref` as an MCP Description component reference and MUST NOT reinterpret a `$componentRef` nested inside an embedded JSON Schema.

The distinct keyword separates two reference systems embedded in the same document. A JSON Schema `$ref` is an applicator: it applies another schema to the current instance location, participates in the schema dialect's URI-base and dynamic-scope rules, and may have adjacent schema keywords when the dialect permits them. A `$componentRef` instead replaces one complete MCP Description value before that value is checked in its use-site context. It can therefore reference non-schema values, but it does not compose, constrain, or annotate its target.

Local-only resolution is a separate design constraint, not a consequence of using a distinct keyword. OpenAPI Reference Objects use `$ref` URI references for typed OpenAPI values and can address internal or external targets; OpenAPI Schema Objects use the same spelling with JSON Schema semantics. MCP Description 0.9.0 deliberately does not define the base-URI, document loading, trust, bundling, or identity rules needed for external MCP Description values. This does not restrict `$ref`, `$id`, `$anchor`, `$dynamicRef`, composition keywords, or externally identified schema resources inside an embedded JSON Schema; those remain subject to Section 9.2 and the applicable schema dialect.

### 17.3 Use Sites and Contextual Validation

Tool `inputSchema`, Tool `outputSchema`, and Elicitation Declaration `requestedSchema` MAY reference `#/components/schemas/<name>`. Tool `examples` values MAY reference `toolExamples`; Resource `examples` values MAY reference `resourceExamples`; Resource Template `examples` values MAY reference `resourceTemplateExamples`; and Prompt `examples` values MAY reference `promptExamples`.

Resolution substitutes the referenced JSON value before every contextual structural and semantic rule at the use site. <a id="req-component-contextual-validation"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-contextual-validation" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-component-contextual-validation&gt;</code></a></small></span> A reusable schema or example MUST therefore conform independently under every containing primitive and effective protocol scope that references it. Component storage does not weaken Tool input object-root rules, Tool output protocol version rules, restricted Elicitation schemas, example/schema compatibility, completed-result shapes, URI relationships, or any other inline requirement.

### 17.4 Resolution

<a id="req-component-reference-pointer"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-reference-pointer" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-component-reference-pointer&gt;</code></a></small></span> A conforming implementation MUST resolve Reference Objects as JSON Pointers into the same parsed MCP Description document. <a id="req-component-reference-resolution"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-reference-resolution" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-component-reference-resolution&gt;</code></a></small></span> It MUST require the target to exist in the namespace appropriate to the use site, preserve the target JSON value for validation, follow component-to-component references transitively, and reject cycles. It MUST NOT access the network, filesystem, package registry, or another document while resolving `$componentRef`.

<a id="req-component-resolution-errors"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-resolution-errors" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-component-resolution-errors&gt;</code></a></small></span> Resolution errors are document-conformance errors. A validator SHOULD report the use-site or component path and distinguish a malformed pointer, missing target, incompatible namespace, and cycle.

### 17.5 Projection

An Effective Protocol View MAY retain every component or prune components unused by retained declarations. <a id="req-component-pruning"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-pruning" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-component-pruning&gt;</code></a></small></span> A pruning projection MUST retain every component transitively reached through a retained Reference Object and MUST remove no target required by the projected document. It MUST validate all retained references after projection. The outer Components Object and namespace maps MUST be omitted if pruning would otherwise leave them empty, except that retained outer specification extensions keep the Components Object non-empty.

Components have no independent protocol scope. Their validity is determined only after use-site projection.

### 17.6 Merge

<a id="req-component-merge"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-merge" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-component-merge&gt;</code></a></small></span> Merge tooling MUST preserve every referenced component and MUST NOT silently bind different component values to one name. It MAY deduplicate equivalent values. When different values collide at one namespace and name, tooling MAY fail with a merge conflict or deterministically rename one value and rewrite every affected Reference Object. A generated name MUST satisfy the component-name grammar, and all rewritten references MUST validate in the merged result.

<a id="req-component-merge-extensions"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-merge-extensions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-component-merge-extensions&gt;</code></a></small></span> Outer Components Object extensions with the same name and different values are conflicts unless the merge operation has an independently defined lossless representation. Merge processing MUST remain local and MUST NOT retrieve component values from a network or another document.

### 17.7 Security and Processing Limits

Components and referenced examples are untrusted document content. <a id="req-component-limits"></a>Implementations SHOULD bound reference depth, component count, nesting, and resolved validation work. <a id="req-component-cycles"></a> <span class="mcpdesc-rule-links" data-anchor="req-component-cycles" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-component-cycles&gt;</code></a></small></span> They MUST detect cycles without unbounded recursion and MUST apply the same safe rendering, schema-evaluation, URI, content, and secret-handling rules as for inline values.

### 17.8 Example

This excerpt defines a reusable Tool input schema and references it from a permitted use site:

```yaml
components:
	schemas:
		SearchInput:
			type: object
			properties:
				query:
					type: string
			required: [query]
tools:
	- name: search
		inputSchema:
			$componentRef: '#/components/schemas/SearchInput'
```

See the [complete reusable-components example](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/reusable-components.yaml) for reusable schemas and a referenced Tool Example Object.

---

## 18. Document-oriented Serialization Ordering

This section defines a recommended presentation order for MCP Description
properties in newly generated JSON and YAML documents. It is intended to make
documents easier to scan and more consistent across producers. It does not
change document meaning, validation, or conformance: property order remains
insignificant as specified in Sections 3.1 and 3.7.

<a id="req-document-ordering-default"></a>A producer that generates an MCP Description document without source property order to preserve or an explicit caller-selected ordering policy SHOULD emit properties according to this section. A source-preserving editor or converter SHOULD preserve the source property order unless the caller selects this ordering profile. Producers MAY expose other ordering policies.

The sequences in this section are the source of truth for this presentation
profile. JSON Schema property order, examples, and implementation-specific
constants do not define or override these sequences. A sequence applies only to
fields defined at the stated location for the document version; it does not
authorize a field or change its validity.

### 18.1 Ordering Algorithm

<a id="req-document-ordering-algorithm"></a>An implementation applying this profile MUST emit present known fields of a recognized fixed-field object in the listed left-to-right order, followed by unlisted fields in their existing relative order. It MUST skip missing fields and MUST NOT create defaults or empty sections. It MUST apply a rule to a child object only when that object's structure is recognized.

<a id="req-document-ordering-collections"></a>An implementation applying this profile MUST preserve the order of every array while visiting eligible elements and MUST preserve entry order in named maps while visiting values whose structure is explicitly known. The sequences below apply equally to JSON and YAML; neither format gives object member order semantic meaning.

<a id="req-document-ordering-recognition"></a>The implementation MUST identify a rule using the document path, owning structure, and union discriminator together. It MUST NOT classify arbitrary objects by matching familiar field names such as `name`, `type`, `properties`, or `description`. For an unknown object, unknown variant, malformed container, or opaque subtree, it MUST preserve the existing order and MUST NOT guess a rule or fall back to alphabetical sorting. Every array and named-map entry sequence MUST remain unchanged while the implementation visits eligible values. The implementation MUST preserve opaque subtrees without recursively applying this profile.

<a id="req-document-ordering-preservation"></a>Applying this profile MUST NOT change any value or field presence. It MUST NOT resolve references, deduplicate values, expand aliases, or replace inline objects with references. Unknown fields on an organized object follow the known fields and retain their relative order; this may change their absolute positions. A source-preserving policy is required when even those moves must be avoided.

This profile does not promise preservation of comments, whitespace, quoting,
YAML anchors, source locations, or original property positions after conversion.
It does not define canonical JSON or a source-aware editing API.

### 18.2 Root Document

| Structure | Field sequence |
| --- | --- |
| MCP Description root | `$schema`, `mcpdesc`, `info`, `instructions`, `protocolVersions`, `transports`, `securitySchemes`, `security`, `capabilities`, `tools`, `resources`, `resourceTemplates`, `prompts`, `tags`, `components` |

The header identifies the format first. Server identity and instructions
precede connectivity. Security definitions precede their default requirements.
Capability flags precede concrete declarations. Tag definitions and reusable
components follow the primary server description. Unknown fields and `x-*`
extensions follow `components`, retaining their relative order.

This sequence applies only to root properties. It does not sort tools,
resources, prompts, transports, tags, or capability entries within their arrays.

### 18.3 Identity and Shared Presentation Fields

| Structure | Field sequence |
| --- | --- |
| `info` | `name`, `title`, `version`, `id`, `description`, `icons`, `websiteUrl`, `contact`, `license` |
| `info.contact` | `name`, `url`, `email` |
| `info.license` | `name`, `url` |
| Icon entry wherever icons are declared | `src`, `mimeType`, `sizes`, `theme` |
| Root tag definition | `name`, `description` |

Preserve the order of icon and icon-size arrays. A declaration's `tags` array
contains names, not tag-definition objects, and retains its exact sequence.

### 18.4 Transports and Security

| Structure | Field sequence |
| --- | --- |
| HTTP transport, including the schema's HTTP variants | `type`, `url`, `protocolVersions`, `security` |
| Stdio transport | `type`, `command`, `args`, `env`, `protocolVersions`, `security` |
| HTTP security scheme | `type`, `scheme`, `bearerFormat`, `description` |
| API-key security scheme | `type`, `in`, `name`, `description` |
| OAuth 2 security scheme | `type`, `description`, `flows` |
| OpenID Connect security scheme | `type`, `description`, `openIdConnectUrl` |
| OAuth `flows` | `authorizationCode`, `clientCredentials`, `implicit`, `password` |
| OAuth flow | `authorizationUrl`, `tokenUrl`, `refreshUrl`, `scopes` |

`securitySchemes` is a named map: preserve scheme-name order and organize only
recognized scheme values. Stdio `env` is an environment-variable map and is
opaque. OAuth `scopes` is a scope-name-to-description map and retains entry
order.

Every `security` array retains its exact order. Each requirement object maps
scheme names to scope arrays; preserve both the object entry order and scope
array order. Do not sort alternatives, merge requirements, expand an empty
requirement, or collapse an empty security array.

### 18.5 Server and Client Capabilities

| Structure | Field sequence |
| --- | --- |
| Entry in root `capabilities` | `protocolVersions`, `tools`, `resources`, `prompts`, `logging`, `completions`, `tasks`, `extensions`, `experimental` |
| Server tool capability | `listChanged` |
| Server resource capability | `subscribe`, `listChanged` |
| Server prompt capability | `listChanged` |
| Server task capability | `list`, `cancel`, `requests` |
| Task `requests` | `tools` |
| Task `requests.tools` | `call` |
| Declaration `clientRequirements` | `roots`, `sampling`, `elicitation`, `tasks`, `extensions`, `experimental` |

`logging`, `completions`, server `experimental`, task `list`, task `cancel`, and
task `requests.tools.call` have open payload objects. Preserve them in full. An
empty object remains empty; do not synthesize capability flags.

Client requirement values are open objects. Preserve those values recursively;
do not interpret their keys as server capability fields or convert them to
flags. Client `experimental` is a named map of such values and is also
preserved. Both server and client `extensions` are extension-identifier maps
with opaque values. Preserve identifiers, their ordering, and all nested
payload ordering.

### 18.6 Concrete Capability Declarations

The common progression is identity, documentation, protocol scope, primary
contract, behavior, dependencies, examples, and metadata. Exact per-kind lists
avoid inventing fields on kinds that do not support them.

| Structure | Field sequence |
| --- | --- |
| Tool | `name`, `title`, `description`, `icons`, `tags`, `deprecated`, `protocolVersions`, `inputSchema`, `outputSchema`, `annotations`, `execution`, `security`, `clientRequirements`, `elicitations`, `examples`, `interactionExamples`, `_meta` |
| Resource | `uri`, `name`, `title`, `description`, `icons`, `tags`, `deprecated`, `protocolVersions`, `mimeType`, `size`, `annotations`, `security`, `clientRequirements`, `elicitations`, `examples`, `_meta` |
| Resource template | `uriTemplate`, `name`, `title`, `description`, `icons`, `tags`, `deprecated`, `protocolVersions`, `mimeType`, `annotations`, `security`, `clientRequirements`, `elicitations`, `examples`, `completionExamples`, `_meta` |
| Prompt | `name`, `title`, `description`, `icons`, `tags`, `deprecated`, `protocolVersions`, `arguments`, `security`, `clientRequirements`, `elicitations`, `examples`, `completionExamples`, `_meta` |
| Prompt argument | `name`, `title`, `description`, `required` |
| Tool annotations | `title`, `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint` |
| Resource annotations, including content-block annotations | `audience`, `priority`, `lastModified` |
| Tool `execution` | `taskSupport` |

Preserve `inputSchema` and `outputSchema` completely, including their property
maps, keyword order, and nested arrays. Preserve `_meta` completely. Annotation
rules apply only at recognized annotation locations, not arbitrary objects
called `annotations` inside schemas or application payloads.

### 18.7 Elicitation Declarations

| Structure | Field sequence |
| --- | --- |
| Elicitation declaration | `name`, `mode`, `message`, `protocolVersions`, `when`, `requestedSchema`, `url`, `onDecline`, `onCancel` |

Preserve the order of the declaration array. Mode selects the appropriate
shape; ordering never changes it or supplies a missing discriminator.

`requestedSchema` is an opaque schema boundary, even though the specification
defines a restricted elicitation schema vocabulary. This includes the known
form-schema fields `$schema`, `type`, `properties`, and `required`; property
fields `type`, `title`, `description`, `default`, `format`, `minLength`,
`maxLength`, `minimum`, `maximum`, `enum`, `enumNames`, `oneOf`, `items`,
`minItems`, and `maxItems`; enum-option `const` and `title`; and item `type`,
`enum`, or `anyOf` structures. Preserve `additionalProperties` and its nested
property-schema structure as well. None receives an ordering rule. Preserve
parallel arrays such as `enum` and `enumNames` exactly.

### 18.8 Examples and Their Fixed Envelopes

Example names are authored identifiers, not fields with a preferred order.
Preserve entry order in `examples`, `completionExamples`, and
`interactionExamples` maps. Apply the following rules only to recognized
example envelopes and protocol-defined objects within them, never arbitrary
application input or output.

| Structure | Field sequence |
| --- | --- |
| Tool example | `input`, `result` |
| Resource example | `result` |
| Resource-template example | `uri`, `result` |
| Prompt example | `arguments`, `result` |
| Completion example | `argument`, `context`, `result` |
| Completion argument | `name`, `value` |
| Completion context | `arguments` |
| Completion result | `values`, `total`, `hasMore` |
| Completed tool result | `resultType`, `isError`, `content`, `structuredContent`, `_meta` |
| Completed resource-read result | `resultType`, `contents`, `cacheScope`, `ttlMs`, `_meta` |
| Completed prompt result | `resultType`, `description`, `messages`, `_meta` |
| Completed completion result | `resultType`, `completion`, `_meta` |
| Prompt message | `role`, `content` |
| Resource text contents | `uri`, `mimeType`, `text`, `_meta` |
| Resource blob contents | `uri`, `mimeType`, `blob`, `_meta` |
| Text content block | `type`, `text`, `annotations`, `_meta` |
| Image or audio content block | `type`, `mimeType`, `data`, `annotations`, `_meta` |
| Embedded-resource content block | `type`, `resource`, `annotations`, `_meta` |
| Resource-link content block | `type`, `uri`, `name`, `title`, `description`, `icons`, `mimeType`, `size`, `annotations`, `_meta` |

Tool example `input`, result `structuredContent`, prompt example `arguments`,
and completion context `arguments` are application-owned payloads or argument
maps: preserve them recursively. Keep content, messages, resource contents,
completion values, and all other arrays in their original order.

String payloads such as `text`, `blob`, and `data` are never parsed,
reformatted, decoded, or interpreted as nested documents. Unknown result or
content variants remain untouched, including their nested objects.

### 18.9 Interaction Examples

| Structure | Field sequence |
| --- | --- |
| Tool interaction example | `input`, `steps`, `result` |
| Elicitation step | `type`, `declaration`, `request`, `response` |
| Roots or sampling step | `type`, `request`, `response` |
| Form elicitation request | `mode`, `message`, `requestedSchema` |
| URL elicitation request | `mode`, `message`, `url` |
| Accepted elicitation response | `action`, `content`, `_meta` |
| Declined or cancelled elicitation response | `action`, `_meta` |
| Roots-list request | No declared fields; preserve the empty object |
| Roots-list result | `roots`, `_meta` |
| Root declaration | `uri`, `name`, `_meta` |
| Sampling create-message request | `messages`, `systemPrompt`, `includeContext`, `modelPreferences`, `maxTokens`, `temperature`, `stopSequences`, `tools`, `toolChoice`, `metadata` |
| Sampling create-message result | `role`, `content`, `model`, `stopReason`, `_meta` |
| Sampling message | `role`, `content` |
| Sampling model preferences | `hints`, `intelligencePriority`, `speedPriority`, `costPriority` |
| Sampling model hint | `name` |
| Sampling request tool | `name`, `title`, `description`, `inputSchema`, `annotations` |
| Sampling tool choice | `mode` |
| Sampling tool-use content | `type`, `id`, `name`, `input` |
| Sampling tool-result content | `type`, `toolUseId`, `isError`, `content` |

The `steps` array is an ordered interaction trace, and the array-preservation
requirement above applies to it. Tool inputs, elicitation response `content`,
sampling tool-use `input`, sampling `metadata`, every `_meta` subtree, and
schemas retain their existing internal order.

Sampling message content uses the known content-block rules above where its
variant is recognized. Model hint, message, tool, stop-sequence, and roots
arrays retain their order. Unknown fields on open result envelopes follow known
fields in their existing relative order, with opaque values; openness does not
permit interpreting those values.

### 18.10 Reusable Components and References

| Structure | Field sequence |
| --- | --- |
| `components` | `schemas`, `toolExamples`, `resourceExamples`, `resourceTemplateExamples`, `promptExamples` |
| Component reference object | `$componentRef` |

Each component category is a named map. Preserve component-name order. Entire
`components.schemas` values are opaque, including schema objects and component
references. Boolean subschemas inside a schema remain untouched. Other
component values use the corresponding recognized example envelope rule or
remain reference objects. Reference objects inside an opaque schema are part
of that schema and are not traversed.

Keep reference strings byte-for-byte unchanged. Do not resolve references,
rename components, reorder component entries by dependencies, inline values,
or change relative versus absolute references as part of ordering.

---

These examples come from [the canonical specification repository](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples) at [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/tree/v0.9.0-rc.3).

## Minimal example

```yaml
$schema: https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json
mcpdesc: 0.9.0
info:
  name: chess-rating-server
  title: Chess Rating MCP Server
  version: 1.0.0
protocolVersions:
  - "2025-11-25"
transports:
  - args:
      - serve
    command: chess-rating
    type: stdio
tools:
  - description: Get the current Elo rating for a chess player
    inputSchema:
      properties:
        player_id:
          description: Player identifier
          type: string
      required:
        - player_id
      type: object
    name: get_player_rating
```

## Complete example set

- [`client-requirements.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/client-requirements.yaml)
- [`full-featured.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/full-featured.yaml)
- [`http-server.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/http-server.yaml)
- [`minimal.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/minimal.yaml)
- [`multi-transport.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/multi-transport.yaml)
- [`multi-version.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/multi-version.yaml)
- [`reusable-components.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/reusable-components.yaml)
- [`stdio-server.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/stdio-server.yaml)

---

***

## Appendix A: Icon Object

<a id="req-icon-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-icon-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcp/icon-members#required-by" title="This requirement is part of rule: mcp.icon.members"><code>&lt;req-icon-fields&gt;</code></a></small></span> The Icon object is used throughout the specification for UI display.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `src` | string (URI) | **Yes** | URI pointing to an icon resource (HTTP/HTTPS URL or `data:` URI). |
| `mimeType` | string | No | MIME type override (e.g., `"image/png"`, `"image/svg+xml"`). |
| `sizes` | array\<string\> | No | Sizes at which the icon can be used (e.g., `"48x48"`, `"96x96"`, `"any"`). |
| `theme` | string | No | Theme this icon is designed for: `"light"` or `"dark"`. |

<a id="req-icon-client-formats"></a>Clients MUST support `image/png` and `image/jpeg`. Clients SHOULD also support `image/svg+xml` and `image/webp`.

---

## Appendix B: Complete Example

See [examples/full-featured.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/examples/full-featured.yaml) for a complete MCP Description document demonstrating a broad set of features from this specification.

---

## Appendix C: JSON Schema

The normative JSON Schema for this specification version is available at:

- [../../../schemas/mcp-description/0.9.0.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/schemas/mcp-description/0.9.0.json)
- `https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json` for the current community working draft canonical schema resource
- `https://mcpdesc.org/schema/mcp-description/0.9.0.json` for the stable 0.9.0 canonical schema resource after release

Archival retrieval locations may also exist for frozen historical bytes, including the legacy Draft 3 short URI `https://mcpdesc.org/schema/0.8.0.json` and the stable 0.7.0 mirror `https://mcpdesc.org/schema/mcp-description/0.7.0.json`. Those retrieval URLs do not change the historical embedded `$id` values of the frozen schemas they mirror.

---

## Appendix D: References

### Normative References

- **[RFC 2119]** Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", RFC 2119, March 1997.
- **[RFC 3986]** Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier (URI): Generic Syntax", RFC 3986, January 2005.
- **[RFC 6570]** Gregorio, J., Fielding, R., Hadley, M., Nottingham, M., and D. Orchard, "URI Template", RFC 6570, March 2012.
- **[RFC 8259]** Bray, T., "The JavaScript Object Notation (JSON) Data Interchange Format", RFC 8259, December 2017.
- **[RFC 9512]** Bormann, C., et al., "YAML Media Type", RFC 9512, February 2024.
- **[YAML 1.2.2]** Ben-Kiki, O., Evans, C., and I. döt Net, "YAML Ain't Markup Language, Version 1.2.2", October 2021.
- **[JSON Schema]** Wright, A., Andrews, H., Hutton, B., "JSON Schema: A Media Type for Describing JSON Documents", draft-bhutton-json-schema-01, June 2022.

### Informative References

- **[MCP Protocol]** Anthropic, "Model Context Protocol Specification", https://modelcontextprotocol.io
- **[OpenAPI 3.1]** OpenAPI Initiative, "OpenAPI Specification v3.1.0", https://spec.openapis.org/oas/v3.1.0
- **[Semantic Versioning]** Preston-Werner, T., "Semantic Versioning 2.0.0", https://semver.org
