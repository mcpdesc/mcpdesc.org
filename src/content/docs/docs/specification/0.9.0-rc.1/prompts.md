---
title: "11. Prompts"
description: "MCP Description specification v0.9.0-rc.1 — 11. Prompts."
slug: docs/specification/0.9.0-rc.1/prompts
sidebar:
  order: 11
---

The `prompts` array declares the prompt templates exposed by the MCP server. Each prompt is a server-side template that clients can invoke with arguments to generate messages.

### 11.1 Prompt Object

<a id="req-prompt-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-prompt-fields"><br><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-prompt-fields&gt;</code></a></small><br></span>

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
| `tags` | non-empty array\<string\> | No | Categorization tags. <a id="req-prompt-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-prompt-tags-references&gt;</code></a></small></span>  When a root-level `tags` array is present, values MUST reference declared tag names (see [Section 13.3](/docs/specification/0.9.0-rc.1/tags#133-tag-references)). |
| `elicitations` | non-empty array\<Elicitation Declaration Object\> | No | Additional user interactions that MAY be required while retrieving the Prompt (see [Section 12](/docs/specification/0.9.0-rc.1/elicitation#12-elicitation-declarations)). |
| `deprecated` | boolean | No | Whether the prompt is deprecated. |
| `_meta` | object | No | Literal MCP metadata on the Prompt declaration, subject to [Section 3.5](/docs/specification/0.9.0-rc.1/document-structure#35-mcp-_meta). Since MCP 2025-06-18. |
| `security` | Security Requirement Array | No | Primitive security override. |
| `clientRequirements` | [Client Capability Requirements Object](/docs/specification/0.9.0-rc.1/capabilities#85-primitive-client-capability-requirements) | No | Unconditional minimum client capabilities required for `prompts/get`; does not apply to `prompts/list`. |

<a id="req-prompt-scopes-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-scopes-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-prompt-scopes-disjoint&gt;</code></a></small></span>  Prompt declarations with the same `name` MUST have pairwise-disjoint effective protocol scopes. Prompt `security` describes statically known authorization required to retrieve the Prompt and replaces inherited transport or root security in full.

Prompt `clientRequirements` applies only to retrieval through `prompts/get`. It does not state that a client needs those capabilities to discover the Prompt through `prompts/list`.

### 11.2 Prompt Argument Object

<a id="req-prompt-argument-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-prompt-argument-fields"><br><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-prompt-argument-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Programmatic argument name (identifier). |
| `title` | string | No | Human-readable display name for UI contexts. Since MCP 2025-06-18. |
| `description` | string | No | Argument description. |
| `required` | boolean | No | Whether the argument is required. |

### 11.3 Named Prompt Examples

A Prompt Object MAY contain `examples`, a map from a local example name to an inline Prompt Example Object or a Reference Object targeting `#/components/promptExamples/<name>`. <a id="req-prompt-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-examples-map&gt;</code></a></small></span>  When present, the map MUST contain at least one entry. Each name MUST match `^[A-Za-z0-9._-]+$`; names are case-sensitive, scoped to the containing Prompt declaration, and serve as both human-meaningful labels and stable local selection names. Entry order is not semantically significant. <a id="req-prompt-example-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-prompt-example-references-resolved&gt;</code></a></small></span>  A referenced example MUST be resolved before applying every contextual requirement of the containing Prompt and effective protocol scope.

<a id="req-prompt-example-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-example-fields&gt;</code></a></small></span>  A Prompt Example Object contains these core properties and MAY carry `x-*` specification extensions:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `arguments` | map<string, string> | No | Complete `prompts/get.params.arguments` value; omission and `{}` both mean no arguments. |
| `result` | object | **Yes** | Complete applicable completed `GetPromptResult` payload, excluding the JSON-RPC envelope. |

<a id="req-prompt-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-example-closed&gt;</code></a></small></span>  The Prompt Example Object MUST NOT contain other additional properties.

`arguments` MAY be omitted. <a id="req-prompt-example-arguments-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-arguments-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-example-arguments-shape&gt;</code></a></small></span>  When present, it MUST be an object whose values are strings. <a id="req-prompt-example-arguments"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-arguments" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/prompt-example-arguments#required-by" title="This requirement is part of rule: mcpdesc.prompt.example.arguments"><code>&lt;req-prompt-example-arguments&gt;</code></a></small></span>  Every key MUST identify an argument declared by the containing Prompt, and every declared argument with `required: true` MUST be present. Optional arguments MAY be omitted. <a id="req-prompt-example-completed-form"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-completed-form" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-completed-result-form#required-by" title="This requirement is part of rule: mcpdesc.example.completed-result-form"><code>&lt;req-prompt-example-completed-form&gt;</code></a></small></span>  The example MUST NOT contain transport metadata, JSON-RPC IDs, method names, or request `_meta`.

<a id="req-prompt-example-result-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-result-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-prompt-example-result-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-result-protocol-fidelity#required-by" title="This requirement is part of rule: mcpdesc.example.result.protocol-fidelity"><code>&lt;req-prompt-example-result-shape&gt;</code></a></small></span>  `result` MUST preserve the ordered `messages` array and MUST have the completed Prompt result shape defined by every applicable protocol version. For MCP 2026-07-28 it MUST contain `resultType: "complete"`. Fields that an applicable protocol version does not define follow [Section 3.6](/docs/specification/0.9.0-rc.1/document-structure#36-carried-mcp-values). It MAY preserve the native result `description`. Task, input-required, streaming, partial, and JSON-RPC error forms are not Prompt Examples.

Protocol version-supported `_meta` on the completed result and message content is literal illustrative metadata governed by [Section 3.5](/docs/specification/0.9.0-rc.1/document-structure#35-mcp-_meta). It is not request metadata or a schema declaration. <a id="req-prompt-example-content-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-content-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/content-block-protocol-version#required-by" title="This requirement is part of rule: mcp.content-block.protocol-version"><code>&lt;req-prompt-example-content-protocol-version&gt;</code></a></small></span>  Message `content` MAY use any content-block form supported by every applicable protocol version.

Prompt examples are illustrative and non-exhaustive. They do not change Prompt arguments, capabilities, security, client requirements, or runtime behavior, and they do not guarantee deterministic or current output. <a id="req-prompt-example-tooling"></a>Documentation tooling SHOULD preserve example names and argument/result pairing. Mock or contract-test tooling MAY permit explicit selection by name but MUST NOT present an unnamed selection as a prediction of live behavior.

Examples are untrusted descriptive content. <a id="req-prompt-example-no-secrets"></a>Authors MUST NOT include secrets and SHOULD use conspicuously fictitious values. <a id="req-prompt-example-untrusted"></a>Consumers MUST validate values, render content as data, and apply appropriate size and evaluation limits. They MUST NOT treat examples as authorization, proof of behavior, or safe executable instructions.

Prompt Examples are MCP Description metadata, not fields of the MCP Prompt type. <a id="req-prompt-example-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-prompt-example-projection-omitted&gt;</code></a></small></span>  Projection to an MCP `prompts/list` Prompt value MUST omit `examples` unless an independently specified MCP extension defines a destination. <a id="req-prompt-example-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-example-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-prompt-example-views&gt;</code></a></small></span>  MCP Description round-tripping and protocol-version projection MUST preserve each selected Prompt declaration's example map and MUST NOT merge maps from disjoint variants with the same Prompt name.

### 11.4 Prompt Completion Examples

A Prompt Object MAY contain `completionExamples`, a local non-empty map from an example name to an inline Completion Example Object. Completion examples do not use `#/components/promptExamples` or any other component namespace; the containing Prompt declaration supplies the completion target identity.

<a id="req-prompt-completion-examples-map"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-examples-map" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-completion-examples-map&gt;</code></a></small></span>  Each name MUST match `^[A-Za-z0-9._-]+$`, is case-sensitive, and is scoped to the containing Prompt declaration. Entry order is not semantically significant. A Completion Example Object MAY carry `x-*` specification extensions and contains these properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `argument` | object | **Yes** | The selected Prompt argument being completed, with required string `name` and `value`. |
| `context` | object | No | Optional contextual `arguments` map of already-supplied Prompt argument values. |
| `result` | object | **Yes** | Completed applicable MCP `completion/complete` result payload, excluding the JSON-RPC envelope. |

<a id="req-prompt-completion-example-closed"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-example-closed" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-completion-example-closed&gt;</code></a></small></span>  The Completion Example Object MUST NOT contain other unprefixed properties. The `argument` object MUST contain required string properties `name` and `value`. <a id="req-prompt-completion-target"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-target" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/completion-example-target#required-by" title="This requirement is part of rule: mcpdesc.completion-example.target"><code>&lt;req-prompt-completion-target&gt;</code></a></small></span>  `argument.name` MUST identify one declared Prompt Argument. Every `context.arguments` key MUST identify another declared Prompt Argument, and the completed argument MUST NOT also occur in context. Context MAY be partial: omission of a required Prompt argument means only that the illustrated completion request did not provide it.

`context` MAY be omitted. <a id="req-prompt-completion-context-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-context-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/example-members#required-by" title="This requirement is part of rule: mcpdesc.example.members"><code>&lt;req-prompt-completion-context-shape&gt;</code></a></small></span>  When present, it MUST contain a non-empty `arguments` map whose values are strings. An empty context MUST be omitted rather than represented as an empty object. <a id="req-prompt-completion-context-protocol-version"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-context-protocol-version" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/completion-context-protocol-version#required-by" title="This requirement is part of rule: mcp.completion.context.protocol-version"><code>&lt;req-prompt-completion-context-protocol-version&gt;</code></a></small></span>  MCP 2025-03-26 does not define completion context, so a Prompt completion example spanning that protocol version and a later protocol version MUST be split into disjoint protocol-scoped Prompt declarations when context is needed.

<a id="req-prompt-completion-result"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-result" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/example-result-members#required-by" title="This requirement is part of rule: mcp.example-result.members"><code>&lt;req-prompt-completion-result&gt;</code></a></small></span>  `result` MUST contain `completion.values`, an ordered array of string candidates. It MAY preserve native `completion.total`, `completion.hasMore`, and protocol version-supported result `_meta`. For MCP 2026-07-28 it MUST contain `resultType: "complete"`. Fields that an applicable protocol version does not define follow [Section 3.6](/docs/specification/0.9.0-rc.1/document-structure#36-carried-mcp-values). JSON-RPC envelope fields, errors, and incomplete workflows are not Prompt completion examples. Prompt completion examples are valid only in an effective protocol scope where MCP defines completion and every represented field. <a id="req-prompt-completion-protocol-versions"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-protocol-versions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/completion-protocol-version#required-by" title="This requirement is part of rule: mcp.completion.protocol-version"><code>&lt;req-prompt-completion-protocol-versions&gt;</code></a></small></span>  MCP Description does not support completion examples for MCP 2024-11-05.

Completion examples are illustrative and non-exhaustive. They do not change Prompt arguments, retrieval requirements, capabilities, security, or runtime behavior, and they do not convert candidates into enums, defaults, or claims of future availability. <a id="req-prompt-completion-projection-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-projection-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/projection-native-schema#required-by" title="This requirement is part of rule: mcpdesc.projection.native-schema"><code>&lt;req-prompt-completion-projection-omitted&gt;</code></a></small></span>  Projection to an MCP Prompt list value MUST omit `completionExamples` unless an independently specified MCP extension defines a destination. <a id="req-prompt-completion-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-completion-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-prompt-completion-views&gt;</code></a></small></span>  MCP Description round-tripping and protocol-version projection MUST preserve each selected Prompt declaration's `completionExamples` map and MUST NOT merge maps from disjoint variants with the same Prompt name.

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

<a id="req-prompt-variants-disjoint"></a> <span class="mcpdesc-rule-links" data-anchor="req-prompt-variants-disjoint" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-prompt-variants-disjoint&gt;</code></a></small></span>  Prompt declarations with the same `name` MUST have pairwise-disjoint effective protocol scopes. Prompt `security` describes statically known authorization required to retrieve the Prompt and replaces inherited transport or root security in full.

Prompt `clientRequirements` applies only to retrieval through `prompts/get`. It does not state that a client needs those capabilities to discover the Prompt through `prompts/list`.
