---
title: "12. Elicitation Declarations"
description: "MCP Description specification v0.9.0-rc.1 — 12. Elicitation Declarations."
slug: docs/specification/0.9.0-rc.1/elicitation
sidebar:
  order: 12
---

### 12.1 Purpose and Placement

An Elicitation Declaration documents that fulfillment of a Tool, Resource, Resource Template, or Prompt may require additional interaction with the user through the MCP client.

Tool, Resource, Resource Template, and Prompt Objects MAY contain an `elicitations` array of Elicitation Declaration Objects. <a id="req-elicitations-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitations-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-elicitations-non-empty&gt;</code></a></small></span>  The array MUST contain at least one declaration when present. A Resource Template declaration applies to `resources/read` operations on concrete Resource URIs produced from that template; it does not describe elicitation during template discovery.

An Elicitation Declaration describes durable server behavior rather than the protocol-specific wire exchange. It does not assert that every fulfillment triggers the interaction or that every client can fulfill it. <a id="req-elicitation-not-capability"></a>A conditional or optional Elicitation Declaration MUST NOT by itself be interpreted as an unconditional `clientRequirements.elicitation` capability requirement.

### 12.2 Elicitation Declaration Object

<a id="req-elicitation-declaration-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-elicitation-declaration-fields"><br><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-declaration-fields&gt;</code></a></small><br></span>

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

<a id="req-elicitation-name-format"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-name-format" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-name-format&gt;</code></a></small></span>  `name` MUST match `^[A-Za-z0-9._-]+$`. <a id="req-elicitation-name-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-name-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-name-unique#required-by" title="This requirement is part of rule: mcpdesc.elicitation.name-unique"><code>&lt;req-elicitation-name-unique&gt;</code></a></small></span>  Names are case-sensitive and MUST be unique within the containing primitive declaration.

<a id="req-elicitation-message"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-message" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-message&gt;</code></a></small></span>  `message` MUST be non-empty. It documents the explanation a user should receive and MAY be representative or default wording when runtime context changes the exact text. <a id="req-elicitation-runtime-wording"></a>Runtime wording SHOULD NOT materially contradict the documented purpose, but mcpdesc does not require byte-for-byte equality.

<a id="req-elicitation-documentation-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-documentation-fields" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-documentation-fields&gt;</code></a></small></span>  `when`, `onDecline`, and `onCancel`, when present, MUST be non-empty descriptive contract documentation. They are not executable expressions, client instructions, or statically provable guarantees.

Although applicable MCP protocol versions permit omission of runtime `mode` for form elicitation, mcpdesc requires explicit `mode` to provide one canonical static representation.

### 12.3 Form Mode

For `mode: "form"`:

- <a id="req-elicitation-form-schema-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-schema-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-form-schema-required&gt;</code></a></small></span>  `requestedSchema` is REQUIRED;
- <a id="req-elicitation-form-no-url"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-no-url" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-form-no-url&gt;</code></a></small></span>  `url` MUST NOT appear; and
- <a id="req-elicitation-form-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/elicitation-form-schema-members#required-by" title="This requirement is part of rule: mcp.elicitation.form-schema.members"><code>&lt;req-elicitation-form-shape&gt;</code></a></small></span>  `requestedSchema` MUST describe an object with only the property schemas allowed by every applicable MCP protocol version.

`requestedSchema` MAY be a Reference Object targeting the `schemas` component namespace. <a id="req-elicitation-schema-references-resolved"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-schema-references-resolved" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/components-references#required-by" title="This requirement is part of rule: mcpdesc.components.references"><code>&lt;req-elicitation-schema-references-resolved&gt;</code></a></small></span>  The referenced schema MUST be resolved before applying every restricted-vocabulary and effective-protocol-scope requirement in this section.

The schema is limited to a flat object whose properties use MCP elicitation primitive schemas. Nested objects and arrays other than MCP-supported multi-select enumeration forms are invalid. Unsupported keywords and unsupported string formats are invalid.

MCP 2025-06-18 supports string, number, integer, boolean, and legacy string-enum property schemas. It permits string length constraints and the `email`, `uri`, `date`, and `date-time` formats, numeric bounds, boolean defaults, and optional `enumNames` corresponding to enum values. It does not define `$schema`, defaults for strings, numbers, or enums, titled `oneOf` enums, or multi-select arrays.

MCP 2025-11-25 and MCP 2026-07-28 additionally support defaults for all primitive types, standard titled single-select enums, titled and untitled multi-select enums, and the legacy `enumNames` form. <a id="req-elicitation-form-vocabulary"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-vocabulary" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/elicitation-form-schema-protocol-shape#required-by" title="This requirement is part of rule: mcp.elicitation.form-schema.protocol-shape"><code>&lt;req-elicitation-form-vocabulary&gt;</code></a></small></span>  Validators MUST apply the vocabulary of every applicable protocol version.

<a id="req-elicitation-form-required"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-required" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-required&gt;</code></a></small></span>  A `required` entry MUST name a property declared in `properties`. <a id="req-elicitation-form-enum-names"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-enum-names" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-enum-names&gt;</code></a></small></span>  `enumNames`, when present, MUST contain one display name for every enum value. <a id="req-elicitation-form-defaults"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-defaults" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-defaults&gt;</code></a></small></span>  An enum default MUST be one of its declared values, and every multi-select default value MUST occur in its declared item choices. <a id="req-elicitation-form-ranges"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-form-ranges" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-form-schema-consistency#required-by" title="This requirement is part of rule: mcpdesc.elicitation.form-schema.consistency"><code>&lt;req-elicitation-form-ranges&gt;</code></a></small></span>  Minimum constraints MUST NOT exceed their corresponding maximum constraints.

### 12.4 URL Mode

For `mode: "url"`:

- <a id="req-elicitation-url-no-schema"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-url-no-schema" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-url-no-schema&gt;</code></a></small></span>  `requestedSchema` MUST NOT appear;
- <a id="req-elicitation-url-syntax"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-url-syntax" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/elicitation-members#required-by" title="This requirement is part of rule: mcpdesc.elicitation.members"><code>&lt;req-elicitation-url-syntax&gt;</code></a></small></span>  `url`, when present, MUST be a syntactically valid URI; and
- omission of `url` means the concrete URL is generated or selected at runtime.

A runtime URL-mode elicitation still supplies every field required by the applicable MCP protocol version. Omission in mcpdesc does not make the runtime URL optional.

Validation of `url` is syntax-only. <a id="req-elicitation-url-no-fetch"></a>Validators and other consumers MUST NOT retrieve, prefetch, dereference, or otherwise access it while processing a description. A conforming declaration does not assert that the target is currently available, trusted, immutable, controlled by the server, or suitable for automatic navigation.

### 12.5 Protocol Applicability

An omitted Elicitation Declaration `protocolVersions` inherits the effective scope of its containing primitive. <a id="req-elicitation-scope"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-scope" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/protocol-scope-consistency#required-by" title="This requirement is part of rule: mcpdesc.protocol-scope.consistency"><code>&lt;req-elicitation-scope&gt;</code></a></small></span>  An explicit scope MUST be non-empty and MUST be a subset of that containing scope.

Complete protocol-version-specific validation begins with MCP 2025-06-18:

- MCP 2025-06-18 supports form mode;
- MCP 2025-11-25 supports form and URL modes; and
- MCP 2026-07-28 supports form and URL modes.

<a id="req-elicitation-protocol-versions"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-protocol-versions" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcp/elicitation-protocol-version#required-by" title="This requirement is part of rule: mcp.elicitation.protocol-version"><code>&lt;req-elicitation-protocol-versions&gt;</code></a></small></span>  A declaration spanning multiple protocol versions MUST satisfy every applicable protocol version. Authors MUST split materially incompatible declarations into disjoint scopes.

MCP 2024-11-05 and MCP 2025-03-26 retain the legacy compatibility treatment in Section 3.5. <a id="req-elicitation-legacy-incomplete"></a> <span class="mcpdesc-rule-links" data-anchor="req-elicitation-legacy-incomplete" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.1/mcpdesc/legacy-protocol-validation-scope#required-by" title="This requirement is part of rule: mcpdesc.legacy-protocol.validation-scope"><code>&lt;req-elicitation-legacy-incomplete&gt;</code></a></small></span>  Validators apply structural and selected sound checks, issue the existing incomplete-validation diagnostic, and MUST NOT report complete MCP semantic conformance.

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
