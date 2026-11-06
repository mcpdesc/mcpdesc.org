---
title: "9. Tools"
description: "MCP Description specification v0.9.0-rc.2 — 9. Tools."
slug: docs/specification/0.9.0-rc.2/tools
sidebar:
  order: 9
---

The `tools` array declares the tools exposed by the MCP server. Each tool represents a server-side function that clients can invoke.

### 9.1 Tool Object

<a id="req-tool-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-tool-fields"><br><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-tool-fields&gt;</code></a></small><br></span>

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
| `tags` | non-empty array\<string\> | No | Categorization tags. <a id="req-tool-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tool-tags-references&gt;</code></a></small></span> When a root-level `tags` array is present, values MUST reference declared tag names (see [Section 13.3](/docs/specification/0.9.0-rc.2/tags#133-tag-references)). |
| `elicitations` | non-empty array\<Elicitation Declaration Object\> | No | Additional user interactions that MAY be required while fulfilling the Tool (see [Section 12](/docs/specification/0.9.0-rc.2/elicitation#12-elicitation-declarations)). |
| `deprecated` | boolean | No | Whether the tool is deprecated. |
| `_meta` | object | No | Literal MCP metadata on the Tool declaration, subject to [Section 3.5](/docs/specification/0.9.0-rc.2/document-structure#35-mcp-_meta). Since MCP 2025-06-18. |
| `security` | Security Requirement Array | No | Primitive security override. |
| `clientRequirements` | [Client Capability Requirements Object](/docs/specification/0.9.0-rc.2/capabilities#85-primitive-client-capability-requirements) | No | Unconditional minimum client capabilities required for `tools/call`; does not apply to `tools/list`. |

### 9.2 Input and Output Schemas

<a id="req-tool-input-schema-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-input-schema-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-tool-input-schema-required&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-tool-input-schema-required&gt;</code></a></small></span> Every Tool MUST contain `inputSchema`. Absence MUST NOT be interpreted as evidence that the Tool accepts no arguments. <a id="req-tool-input-schema-object-root"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-input-schema-object-root" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-input-schema-object-root#required-by" title="This requirement is part of rule: mcp.tool.input-schema.object-root"><code>&lt;req-tool-input-schema-object-root&gt;</code></a></small></span> The schema root MUST describe an object, because Tool arguments are always a JSON object. A root that declares `type` MUST give `"object"` or an array that contains `"object"`. Before MCP 2025-11-25, the root MUST declare `"type": "object"`.

`inputSchema` and `outputSchema` MAY be Reference Objects targeting the `schemas` component namespace. <a id="req-tool-schema-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-tool-schema-references-resolved&gt;</code></a></small></span> Resolution MUST occur before applying every inline schema rule in this section, including root shape, dialect, protocol applicability, `x-mcp-header`, and example compatibility. See [Section 17](/docs/specification/0.9.0-rc.2/components#17-reusable-components-and-local-references).

<a id="req-tool-schema-closed-recommended"></a>A closed no-parameter Tool SHOULD use `{ "type": "object", "additionalProperties": false }`. An open unspecified-parameter Tool may use `{ "type": "object" }`, but this is NOT RECOMMENDED because it gives little validation or guidance. A declared-parameter schema uses `properties` and, when undeclared properties must be rejected, `additionalProperties: false`.

<a id="req-tool-output-schema-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-output-schema-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-output-schema-valid&gt;</code></a></small></span> The `outputSchema` property, when present, MUST be a valid JSON Schema object describing the tool's structured output. For MCP 2025-11-25 and MCP 2026-07-28, it defaults to JSON Schema 2020-12 when no explicit `$schema` is provided.

For MCP 2025-11-25 and MCP 2026-07-28, both schemas MAY include an explicit `$schema` property to declare the JSON Schema dialect. <a id="req-tool-schema-dialect-keyword"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-dialect-keyword" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/declaration-field-protocol-version#required-by" title="This requirement is part of rule: mcp.declaration.field.protocol-version"><code>&lt;req-tool-schema-dialect-keyword&gt;</code></a></small></span> Earlier protocol versions do not define that property on Tool schemas. <a id="req-tool-schema-vocabulary"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-vocabulary" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-schema-keywords-preserve#required-by" title="This requirement is part of rule: mcp.tool.schema-keywords.preserve"><code>&lt;req-tool-schema-vocabulary&gt;</code></a></small></span> For MCP 2026-07-28, validators MUST accept the applicable JSON Schema 2020-12 vocabulary, including references, composition, and conditionals, plus MCP-defined annotations where valid. Earlier views MUST be checked according to their applicable MCP schema rules.

<a id="req-tool-schema-dialect-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-dialect-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-schema-dialect-valid&gt;</code></a></small></span> For MCP 2025-11-25 and MCP 2026-07-28, every embedded Tool schema MUST be valid under its declared or default dialect. Both protocol versions default to JSON Schema 2020-12. <a id="req-tool-schema-dialect-set"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-dialect-set" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-schema-dialect-set&gt;</code></a></small></span> A declared dialect MUST be JSON Schema 2020-12 (`https://json-schema.org/draft/2020-12/schema`) or JSON Schema draft-07 (`http://json-schema.org/draft-07/schema#`), with either `http` or `https` and with or without the empty fragment; a schema that declares any other dialect makes the MCP Description invalid. This set is fixed by this specification so that conformance does not depend on the validator. MCP requires implementations to support only JSON Schema 2020-12, so authors SHOULD prefer it.

For MCP 2025-11-25 and MCP 2026-07-28, the dialect, not the TypeScript type of the MCP `Tool`, decides whether an embedded schema is valid. The MCP `Tool` type of these protocol versions also restricts schema syntax that the dialect allows: it requires `"type": "object"` at the `inputSchema` root in both protocol versions and, for MCP 2025-11-25, at the `outputSchema` root and an object as the value of every top-level `properties` entry of either schema. <a id="req-tool-schema-native-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-native-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-schema-native-shape#required-by" title="This requirement is part of rule: mcp.tool.schema.native-shape"><code>&lt;req-tool-schema-native-shape&gt;</code></a></small></span> A Tool schema that is valid under its dialect but does not meet such a restriction for an applicable protocol version MUST NOT make the MCP Description invalid. Validators MUST report a warning for each such location, naming the protocol versions concerned, because native projection fails for them (Section 4.14). Authors SHOULD meet the restrictions, for example by writing `{}` instead of `true`, `{ "not": {} }` instead of `false`, or `"type": "object"` beside `$ref` or `allOf`, or SHOULD narrow the Tool's `protocolVersions`.

The supported protocol versions before MCP 2025-11-25 define an object-rooted Tool schema shape but do not state an embedded-schema dialect default. <a id="req-tool-schema-legacy-no-dialect"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-legacy-no-dialect" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-schema-legacy-shape#required-by" title="This requirement is part of rule: mcp.tool.schema.legacy-shape"><code>&lt;req-tool-schema-legacy-no-dialect&gt;</code></a></small></span> For those protocol versions, validators MUST enforce the applicable shape without inferring a dialect solely from the enclosing generated MCP schema. <a id="req-tool-schema-legacy-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-legacy-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-schema-legacy-shape#required-by" title="This requirement is part of rule: mcp.tool.schema.legacy-shape"><code>&lt;req-tool-schema-legacy-shape&gt;</code></a></small></span> `properties`, when present, MUST be an object whose values are objects, and `required`, when present, MUST be an array of strings. <a id="req-tool-schema-keywords-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-keywords-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-schema-keywords-preserve#required-by" title="This requirement is part of rule: mcp.tool.schema-keywords.preserve"><code>&lt;req-tool-schema-keywords-preserved&gt;</code></a></small></span> Other keywords MUST be preserved and MUST NOT be rejected solely by applying an inferred meta-schema.

<a id="req-tool-schema-no-fetch"></a>An mcpdesc validator MUST NOT automatically retrieve an external `$ref` target from a network. It MAY resolve external references from an explicitly supplied trusted local catalogue or an explicitly enabled resolver that follows the applicable MCP security guidance. <a id="req-tool-schema-external-ref"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-schema-external-ref" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/json-schema/tool-schema-valid#required-by" title="This requirement is part of rule: json-schema.tool-schema.valid"><code>&lt;req-tool-schema-external-ref&gt;</code></a></small></span> If a target remains unavailable, the `$ref` MUST be preserved and its presence alone MUST NOT make the containing MCP Description invalid. The validator SHOULD warn that complete embedded-schema validation was not possible and MUST NOT report a weakened or partial validation as complete. <a id="req-tool-schema-consumer-certainty"></a>Consumers that require executable schema certainty SHOULD require resolution or treat this warning as an error. <a id="req-tool-schema-self-contained"></a>Authors SHOULD prefer self-contained Tool schemas using local `$defs`.

<a id="req-tool-output-schema-object-root"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-output-schema-object-root" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-output-schema-object-root#required-by" title="This requirement is part of rule: mcp.tool.output-schema.object-root"><code>&lt;req-tool-output-schema-object-root&gt;</code></a></small></span> Before MCP 2026-07-28, `outputSchema` MUST describe an object, because structured output is an object in those protocol versions. For MCP 2025-06-18 it MUST declare `"type": "object"`; for MCP 2025-11-25 a root that declares `type` MUST give `"object"` or an array that contains `"object"`. MCP 2026-07-28 permits any valid JSON Schema root for `outputSchema`.

MCP 2026-07-28 `inputSchema` properties MAY use `x-mcp-header` to map an input to an HTTP header. <a id="req-tool-x-mcp-header"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-x-mcp-header" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-input-schema-x-mcp-header#required-by" title="This requirement is part of rule: mcp.tool.input-schema.x-mcp-header"><code>&lt;req-tool-x-mcp-header&gt;</code></a></small></span> The annotation value MUST be a non-empty HTTP field-name token and MUST be unique case-insensitively within that `inputSchema`. It is valid only on a `string`, `integer`, or `boolean` property that is statically reachable from the schema root through `properties` chains. It MUST NOT be used on a property reached through arrays, composition, conditionals, or `$ref`.

### 9.3 Named Tool Examples

A Tool Object MAY contain `examples`, a map from a local example name to an inline Tool Example Object or a Reference Object targeting `#/components/toolExamples/<name>`. <a id="req-tool-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-tool-examples-map&gt;</code></a></small></span> When present, the map MUST contain at least one entry. Each name MUST match `^[A-Za-z0-9._-]+$`; names are case-sensitive, scoped to the containing Tool declaration, and serve as both human-meaningful labels and stable local selection names. Entry order is not semantically significant. <a id="req-tool-example-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-tool-example-references-resolved&gt;</code></a></small></span> A referenced example MUST be resolved before applying every contextual requirement of the containing Tool and effective protocol scope.

<a id="req-tool-example-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-tool-example-fields&gt;</code></a></small></span> A Tool Example Object contains these core properties and MAY carry `x-*` specification extensions:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `input` | object | **Yes** | Complete `params.arguments` value from a `tools/call` request. |
| `result` | object | **Yes** | Complete applicable completed Tool Result payload, excluding the JSON-RPC envelope. |

<a id="req-tool-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-tool-example-closed&gt;</code></a></small></span> The Tool Example Object MUST NOT contain other additional properties. In particular, 0.9.0 does not define `summary`, `description`, or `externalValue`.

<a id="req-tool-example-input-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-input-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-example-schema-conformance#required-by" title="This requirement is part of rule: mcpdesc.tool.example.schema-conformance"><code>&lt;req-tool-example-input-valid&gt;</code></a></small></span> `input` MUST be an object and MUST validate against the containing Tool's `inputSchema` under every applicable protocol version's schema rules. A no-argument invocation MUST use `input: {}`. Schema-invalid values belong in negative test material, not conforming Tool Examples.

<a id="req-tool-example-result-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-result-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-tool-example-result-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.2/mcpdesc/example-result-protocol-fidelity#required-by" title="This requirement is part of rule: mcpdesc.example.result.protocol-fidelity"><code>&lt;req-tool-example-result-shape&gt;</code></a></small></span> `result` MUST contain `content` and MUST have the completed Tool Result shape defined by every applicable protocol version. For MCP 2026-07-28 it MUST contain `resultType: "complete"`. Fields that an applicable protocol version does not define follow [Section 3.6](/docs/specification/0.9.0-rc.2/document-structure#36-carried-mcp-values). <a id="req-tool-example-completed-form"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-completed-form" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/example-completed-result-form#required-by" title="This requirement is part of rule: mcpdesc.example.completed-result-form"><code>&lt;req-tool-example-completed-form&gt;</code></a></small></span> Task, input-required, streaming, progress, JSON-RPC envelope, and JSON-RPC protocol-error forms are not Tool Examples. <a id="req-tool-example-content-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-content-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/content-block-protocol-version#required-by" title="This requirement is part of rule: mcp.content-block.protocol-version"><code>&lt;req-tool-example-content-protocol-version&gt;</code></a></small></span> Content blocks MAY use any text, image, audio, embedded-resource, or resource-link form supported by every applicable protocol version.

Protocol version-supported `_meta` on the completed result, content blocks, and embedded Resource Contents is literal illustrative metadata governed by [Section 3.5](/docs/specification/0.9.0-rc.2/document-structure#35-mcp-_meta). It is not a schema or a request-metadata declaration. In MCP 2026-07-28, a result example MAY use `io.modelcontextprotocol/serverInfo` with an MCP Implementation value; request-only and notification-only reserved keys are invalid in these represented contexts.

<a id="req-tool-example-success"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-success" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-example-error-result#required-by" title="This requirement is part of rule: mcpdesc.tool.example.error-result"><code>&lt;req-tool-example-success&gt;</code></a></small></span> A successful result MUST omit `isError` or set it to `false`. It MAY contain `structuredContent` only in protocol versions that support that field. <a id="req-tool-example-structured-content"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-structured-content" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-structured-content-output-schema#required-by" title="This requirement is part of rule: mcp.tool.structured-content.output-schema"><code>&lt;req-tool-example-structured-content&gt;</code></a></small></span> If the Tool declares `outputSchema`, a successful result MUST contain `structuredContent`, which MUST validate against that schema under the applicable schema rules. Unstructured `content` remains required when `structuredContent` is present. If the Tool has no `outputSchema`, a successful result MAY contain protocol version-supported `structuredContent`, but mcpdesc makes no schema-compatibility claim for that value.

<a id="req-tool-example-error-result"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-error-result" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-example-error-result#required-by" title="This requirement is part of rule: mcpdesc.tool.example.error-result"><code>&lt;req-tool-example-error-result&gt;</code></a></small></span> A Tool execution-error result MUST set `isError` to `true`, MUST contain unstructured `content`, and MUST NOT contain `structuredContent`. `outputSchema` does not validate error content. JSON-RPC protocol errors and transport or intermediary failures that prevent a Tool Result are outside this model.

Example compatibility is a semantic conformance requirement. <a id="req-tool-example-incomplete-validation"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-incomplete-validation" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-example-schema-conformance#required-by" title="This requirement is part of rule: mcpdesc.tool.example.schema-conformance"><code>&lt;req-tool-example-incomplete-validation&gt;</code></a></small></span> For protocol versions before MCP 2025-11-25, validators MUST enforce constraints they can interpret without inventing an embedded-schema dialect, SHOULD warn when complete compatibility validation is impossible, and MUST NOT report incomplete validation as complete. An unresolved external `$ref` follows the policy in Section 9.2: validators preserve the schema and example, do not retrieve the target automatically, and warn that compatibility validation is incomplete. A schema-incompatible example is an error whenever complete evaluation is possible.

Tool `examples` and JSON Schema `examples` annotations are independent. Schema annotations remain suitable for anonymous values at an instance location; Tool Examples pair named complete invocations with completed results. <a id="req-tool-example-not-inferred"></a>Producers MUST NOT infer an author-supplied Tool Example by combining unrelated schema annotations.

Tool Examples are illustrative and non-exhaustive. They do not alter schemas, annotations, security requirements, side effects, or runtime behavior, and they do not guarantee that a live server returns a shown result. <a id="req-tool-example-tooling"></a>Documentation tooling SHOULD preserve names and input/result pairing. Mock or contract-test tooling MAY permit explicit selection by name but MUST NOT execute a live Tool or reproduce declared side effects merely because an example exists. Selection without an explicit name MUST use a deterministic documented policy and MUST NOT be presented as a prediction of live behavior.

Examples are untrusted descriptive content. <a id="req-tool-example-no-secrets"></a>Authors MUST NOT include secrets and SHOULD use conspicuously fictitious values. <a id="req-tool-example-untrusted"></a>Consumers MUST validate values, render content as data, and apply appropriate size and evaluation limits. They MUST NOT treat examples as authorization, proof of behavior, or safe executable instructions.

Tool Examples are MCP Description metadata, not fields of the MCP Tool type. <a id="req-tool-example-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-tool-example-projection-omitted&gt;</code></a></small></span> Projection to an MCP `tools/list` Tool value MUST omit `examples` unless an independently specified MCP extension defines a destination. <a id="req-tool-example-views-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-views-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-tool-example-views-preserved&gt;</code></a></small></span> MCP Description round-tripping and protocol-version projection MUST preserve each selected Tool declaration's example map and MUST NOT merge maps from disjoint variants with the same Tool name.

### 9.4 Tool Interaction Examples

A Tool Object MAY contain `interactionExamples`, a non-empty map from a local scenario name to a Tool Interaction Example Object. <a id="req-interaction-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-examples-map&gt;</code></a></small></span> Each name MUST match `^[A-Za-z0-9._-]+$`, is case-sensitive, and is scoped to the containing Tool declaration. The map is declaration-local: 0.9.0 defines no `components` namespace for interaction scenarios.

Tool `interactionExamples` are separate from completed Tool `examples`. <a id="req-tool-example-not-interaction"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-example-not-interaction" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/example-completed-result-form#required-by" title="This requirement is part of rule: mcpdesc.example.completed-result-form"><code>&lt;req-tool-example-not-interaction&gt;</code></a></small></span> A producer MUST NOT place an incomplete workflow, semantic interaction step, or non-terminal Tool result in the completed `examples` map.

<a id="req-interaction-example-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-example-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-example-fields&gt;</code></a></small></span> A Tool Interaction Example Object contains these core properties and MAY carry `x-*` specification extensions:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `input` | object | **Yes** | Complete initial `tools/call.params.arguments` object. |
| `steps` | non-empty array\<Tool Interaction Step Object\> | **Yes** | Ordered semantic client-input exchanges for this illustrated invocation. |
| `result` | object | **Yes** | Terminal completed Tool Result payload, excluding the JSON-RPC envelope. |

`input` follows the same schema-compatibility rules as Tool Example `input`. `result` follows the same completed success and execution-error rules as Tool Example `result`. The scenario is illustrative and non-exhaustive: it asserts only that the shown steps occur in the displayed order in this example. It does not define branching, retries, correlation IDs, task state, transport framing, timing, or behavior for responses not shown.

<a id="req-interaction-step-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-step-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-step-fields&gt;</code></a></small></span> Every Tool Interaction Step Object MUST contain `type`, `request`, and `response`. MCP Description 0.9.0 defines three step kinds:

| `type` | Request payload | Response payload |
|--------|-----------------|------------------|
| `elicitation` | Canonical elicitation request fields | Canonical elicitation response action and optional form content |
| `sampling` | Native `sampling/createMessage` parameters | Native completed sampling result |
| `roots` | Empty object | Native ordered `roots` result object |

<a id="req-interaction-step-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-step-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-members#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.members"><code>&lt;req-interaction-step-closed&gt;</code></a></small></span> Steps MAY carry `x-*` specification extensions and MUST NOT contain other additional fields except those defined for their step kind. Step `response` values are carried MCP values governed by [Section 3.6](/docs/specification/0.9.0-rc.2/document-structure#36-carried-mcp-values). A step is semantic MCP Description metadata, not a native MCP wire object. <a id="req-interaction-step-not-wire"></a>An implementation MUST NOT serialize a Tool Interaction Step directly onto an MCP connection.

An `elicitation` step MAY contain `declaration`, naming an Elicitation Declaration on the same Tool. <a id="req-interaction-elicitation-declaration"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-elicitation-declaration" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-elicitation-consistency#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.elicitation-consistency"><code>&lt;req-interaction-elicitation-declaration&gt;</code></a></small></span> When present, the request mode and the request schema or known URL MUST be compatible with that declaration after local reference resolution. <a id="req-interaction-elicitation-response"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-elicitation-response" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-elicitation-consistency#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.elicitation-consistency"><code>&lt;req-interaction-elicitation-response&gt;</code></a></small></span> For `mode: "form"`, an accepted response MUST contain `content` conforming to the request schema; declined and cancelled responses MUST NOT contain `content`. For `mode: "url"`, the response MUST omit `content`.

<a id="req-interaction-sampling-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-sampling-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/sampling-tools-protocol-version#required-by" title="This requirement is part of rule: mcp.sampling.tools.protocol-version"><code>&lt;req-interaction-sampling-protocol-version&gt;</code></a></small></span> A `sampling` step request uses the native `sampling/createMessage` parameter field names and constraints of every MCP protocol version in the containing Tool's effective protocol scope, excluding JSON-RPC, transport, task, and MRTR framing. This includes required `messages` and `maxTokens`, and MAY include protocol version-supported model preferences, system prompt, context inclusion, stop sequences, temperature, metadata, and Tool-related fields. Its response uses the native completed sampling result field names and constraints of every applicable protocol version, excluding JSON-RPC and task framing.

A `roots` step request is an empty object. Its response contains the ordered native `roots` declarations returned by the client for this illustration. Roots are descriptive input only; they do not authorize filesystem access.

The containing Tool's effective protocol scope controls validation. <a id="req-interaction-protocol-version-valid"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-protocol-version-valid" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/elicitation-protocol-version#required-by" title="This requirement is part of rule: mcp.elicitation.protocol-version"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.2/mcp/input-response-closed#required-by" title="This requirement is part of rule: mcp.input-response.closed"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.2/mcp/interaction-message-members#required-by" title="This requirement is part of rule: mcp.interaction-message.members"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.2/mcp/root-meta-protocol-version#required-by" title="This requirement is part of rule: mcp.root.meta.protocol-version"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.2/mcp/root-uri-file-scheme#required-by" title="This requirement is part of rule: mcp.root.uri.file-scheme"><code>&lt;req-interaction-protocol-version-valid&gt;</code></a></small></span> Every represented semantic field MUST be valid in every applicable protocol version. A Tool spanning materially incompatible interaction shapes MUST be split into disjoint protocol-scoped variants. `interactionExamples` themselves do not carry `protocolVersions`.

Tool `interactionExamples` do not add server capabilities, `clientRequirements`, or Elicitation Declarations. <a id="req-interaction-client-requirements-warning"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-client-requirements-warning" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-interaction-client-requirements-consistency#required-by" title="This requirement is part of rule: mcpdesc.tool.interaction.client-requirements-consistency"><code>&lt;req-interaction-client-requirements-warning&gt;</code></a></small></span> Validators SHOULD warn when a scenario contradicts an explicit primitive `clientRequirements` declaration, but MUST NOT infer a requirement when the Tool declares none.

Tool Interaction Examples are MCP Description metadata, not fields of the MCP Tool type. <a id="req-interaction-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-interaction-projection-omitted&gt;</code></a></small></span> Projection to an MCP `tools/list` Tool value MUST omit `interactionExamples` unless an independently specified MCP extension defines a destination. <a id="req-interaction-views-preserved"></a> <span class="mcpdesc-rule-links" data-anchor="req-interaction-views-preserved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-interaction-views-preserved&gt;</code></a></small></span> Effective Protocol View projection MUST preserve the selected Tool declaration's scenario map without combining disjoint variants. Merge tooling MUST NOT concatenate step arrays or guess how to combine unequal same-name scenarios.

Interaction scenarios are untrusted descriptive content. <a id="req-interaction-no-secrets"></a>Authors MUST use fictitious or sanitized values and MUST NOT include secrets, credentials, opaque runtime request state, task handles, or live session identifiers. <a id="req-interaction-untrusted"></a>Consumers MUST treat URLs, prompts, roots, and generated content as data and MUST NOT navigate, execute, or trust them merely because a scenario exists.

### 9.5 Protocol Variants and Security

<a id="req-tool-names-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-names-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-tool-names-disjoint&gt;</code></a></small></span> Tools with the same `name` MUST have pairwise-disjoint effective protocol scopes. Projection therefore yields at most one declaration for that name. An omitted scope covers all root protocol versions and overlaps every scoped Tool with the same name.

Tool `security` describes statically known authorization required to call the Tool and replaces inherited transport or root security in full.

Tool `clientRequirements` applies only to invocation through `tools/call`. It does not state that a client needs those capabilities to discover the Tool through `tools/list`.

### 9.6 Tool Annotations

Tool Annotations provide hints about Tool behavior. They are distinct from the Resource Annotations used by Resources, Resource Templates, and content blocks (see [Section 10.3](/docs/specification/0.9.0-rc.2/resources#103-resource-annotations)). <a id="req-tool-annotations-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-annotations-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-annotations-members#required-by" title="This requirement is part of rule: mcp.tool-annotations.members"><code>&lt;req-tool-annotations-fields&gt;</code></a></small></span> A Tool `annotations` object MUST use the fields and semantics in this section; Resource Annotation fields such as `audience`, `priority`, and `lastModified` do not acquire those semantics when placed on a Tool.

All Tool Annotation properties are advisory. They are not guaranteed to describe Tool behavior faithfully, including `title`. <a id="req-tool-annotations-untrusted"></a>Clients MUST treat Tool Annotations from untrusted servers as untrusted and MUST NOT make Tool-use decisions based on them.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | — | Human-readable title for the tool |
| `readOnlyHint` | boolean | `false` | Tool does not modify its environment |
| `destructiveHint` | boolean | `true` | Tool may perform destructive updates |
| `idempotentHint` | boolean | `false` | Repeated calls with same arguments have no additional effect |
| `openWorldHint` | boolean | `true` | Tool may interact with external entities |

<a id="req-tool-annotations-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-tool-annotations-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.2/mcp/tool-annotations-members#required-by" title="This requirement is part of rule: mcp.tool-annotations.members"><code>&lt;req-tool-annotations-closed&gt;</code></a></small></span> The Tool Annotations object contains only the properties above. MCP defines `ToolAnnotations` as a closed type in every supported protocol version, so other properties, including `x-*` keys, MUST NOT appear. Resource Annotation fields MUST NOT be used here.

### 9.7 Execution Object

<a id="req-execution-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-execution-fields"><br><small><a href="/docs/rules/0.9.0-rc.2/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-execution-fields&gt;</code></a></small><br></span>

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
