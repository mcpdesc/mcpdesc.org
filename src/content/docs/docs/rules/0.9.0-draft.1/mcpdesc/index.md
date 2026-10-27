---
title: "MCP Description Rules"
description: "Rules defined by MCP Description, including its own semantics and projections."
slug: docs/rules/0.9.0-draft.1/mcpdesc
sidebar:
  label: MCP Description Rules (23)
---

Rules defined by MCP Description, including its own semantics and projections.

Rules in this set are attached to MCP Description 0.9.0-draft.1. See the [rules overview](/docs/rules/0.9.0-draft.1/) and [MCP revision guide](/docs/rules/0.9.0-draft.1/revisions).

## Completion example

- [`mcpdesc.completion-example.target`](completion-example-target) — A completion example completes a declared Prompt argument or URI template variable, and its context names other declared arguments or variables only.<br>Severity: `prompt-completion-example-unknown-argument` (error), `prompt-completion-example-context-unknown-argument` (error), `resource-template-completion-example-unknown-variable` (error), `resource-template-completion-example-context-unknown-variable` (error), `completion-example-duplicate-target-context` (error) · Applies: none listed as applicable

## Document

- [`mcpdesc.document.schema`](document-schema) — A document validates against the JSON Schema for its declared mcpdesc version. Used for structural failures not attributed to a more specific rule.<br>Severity: `schema-validation` (error) · Applies: none listed as applicable
- [`mcpdesc.legacy-revisions.validation-scope`](legacy-revisions-validation-scope) — A document applying to MCP 2024-11-05 or 2025-03-26 is reported as receiving structural and selected checks only, not complete MCP semantic conformance.<br>Severity: `legacy-protocol-validation-incomplete` (warning) · Applies: none listed as applicable
- [`mcpdesc.protocol-scope.consistency`](protocol-scope-consistency) — Nested protocol scopes stay within their parent scope, and same-named primitives and capability objects do not overlap in protocol scope.<br>Severity: `protocol-scope-outside-parent` (error), `primitive-scope-overlap` (error), `capability-scope-overlap` (error) · Applies: none listed as applicable
- [`mcpdesc.transports.coverage`](transports-coverage) — Every protocol version at the root is covered by at least one transport when transports are declared.<br>Severity: `transport-coverage-gap` (error) · Applies: none listed as applicable

## Elicitation Declaration

- [`mcpdesc.elicitation.form-schema.consistency`](elicitation-form-schema-consistency) — A form requestedSchema is internally consistent: required names declared properties, enumNames match enum values, defaults lie within enums, and minimum bounds do not exceed maximum bounds.<br>Severity: `elicitation-form-required-property-unknown` (error), `elicitation-form-enum-names-mismatch` (error), `elicitation-form-default-outside-enum` (error), `elicitation-form-invalid-range` (error) · Applies: none listed as applicable
- [`mcpdesc.elicitation.name-unique`](elicitation-name-unique) — Elicitation Declaration names are unique within their primitive.<br>Severity: `duplicate-elicitation-name` (error) · Applies: none listed as applicable

## Example result

- [`mcpdesc.example.completed-result-form`](example-completed-result-form) — An example result is a completed result payload: it contains no JSON-RPC envelope field and no non-completed workflow field.<br>Severity: `tool-example-json-rpc-envelope` (error), `prompt-example-json-rpc-envelope` (error), `resource-example-json-rpc-envelope` (error), `completion-example-json-rpc-envelope` (error), `incomplete-tool-example-result` (error), `incomplete-prompt-example-result` (error), `incomplete-resource-example-result` (error), `incomplete-completion-example-result` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcpdesc.example.result.revision-fidelity`](example-result-revision-fidelity) — An example result contains every field that each applicable MCP revision requires, and every field a revision defines has a valid value.<br>Severity: `tool-example-result-version-mismatch` (error), `resource-example-result-version-mismatch` (error), `resource-example-cache-fields-version-mismatch` (error), `prompt-example-result-version-mismatch` (error), `completion-example-result-version-mismatch` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## Extension identifier

- [`mcpdesc.extensions.catalogue-maturity`](extensions-catalogue-maturity) — An extension identifier under an MCP-reserved prefix that the pinned extension catalogue lists as experimental, or does not list, is preserved with a warning.<br>Severity: `unknown-reserved-extension-identifier` (warning), `experimental-reserved-extension-identifier` (warning) · Applies: none listed as applicable

## Native projection

- [`mcpdesc.projection.declaration-applicable`](projection-declaration-applicable) — Native projection selects one declaration of the requested kind and identifier in the Effective Protocol View of the revision.<br>Severity: `projection-declaration-not-applicable` (error) · Applies: none listed as applicable
- [`mcpdesc.projection.source-valid`](projection-source-valid) — Native projection starts from a document without validation errors and from a revision in its root protocolVersions.<br>Severity: `projection-source-invalid` (error), `projection-revision-not-declared` (error) · Applies: none listed as applicable

## Prompt example

- [`mcpdesc.prompt.example.arguments`](prompt-example-arguments) — A Prompt example supplies every required Prompt argument and no undeclared argument.<br>Severity: `prompt-example-missing-required-argument` (error), `prompt-example-unknown-argument` (error) · Applies: none listed as applicable

## Reference Object

- [`mcpdesc.components.references`](components-references) — A Reference Object targets an existing component in the namespace its use site requires, without cycles.<br>Severity: `missing-component-reference-target` (error), `wrong-component-reference-namespace` (error), `component-reference-cycle` (error) · Applies: none listed as applicable

## Resource example

- [`mcpdesc.resource.example.consistency`](resource-example-consistency) — Resource example contents agree with their declaration: the requested URI is returned, MIME types match, and raw size matches a declared size.<br>Severity: `resource-example-requested-uri-not-returned` (warning), `resource-example-mime-type-mismatch` (warning), `resource-example-size-mismatch` (warning) · Applies: none listed as applicable

## Resource Template example

- [`mcpdesc.resource-template.example.expansion`](resource-template-example-expansion) — A Resource Template example uri is a valid RFC 6570 expansion of the template.<br>Severity: `resource-template-example-invalid-expansion` (error) · Applies: none listed as applicable

## Security Requirement

- [`mcpdesc.security.requirements`](security-requirements) — Security requirements name declared schemes, list scopes only for OAuth 2.0 and OpenID Connect schemes, do not repeat scopes, and use catalogued scopes when the scheme declares a static catalogue.<br>Severity: `unknown-security-scheme` (error), `non-oauth-scope-misuse` (error), `duplicate-security-scope` (error), `schema-validation` (error), `uncatalogued-oauth-scope` (warning) · Applies: none listed as applicable

## Tag

- [`mcpdesc.tags.references`](tags-references) — Root tag names are unique, and primitives reference only declared tags.<br>Severity: `duplicate-root-tag` (error), `unknown-tag-reference` (error) · Applies: none listed as applicable

## Tool example

- [`mcpdesc.tool.example.error-result`](tool-example-error-result) — A Tool execution-error example result sets isError to true and does not contain structuredContent.<br>Severity: `structured-tool-error-example` (error) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`
- [`mcpdesc.tool.example.schema-conformance`](tool-example-schema-conformance) — A Tool example input validates against inputSchema, and its structuredContent against outputSchema, for every applicable revision; incomplete validation is reported.<br>Severity: `tool-example-schema-mismatch` (error), `incomplete-tool-example-validation` (warning) · Applies: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `2026-07-28`

## Tool interaction example

- [`mcpdesc.tool.interaction.client-requirements-consistency`](tool-interaction-client-requirements-consistency) — Interaction steps do not contradict the Tool's explicit client capability requirements.<br>Severity: `interaction-example-client-requirements-contradiction` (warning) · Applies: none listed as applicable
- [`mcpdesc.tool.interaction.elicitation-consistency`](tool-interaction-elicitation-consistency) — An elicitation step matches the Tool's named Elicitation Declaration, and its response content is present exactly when an accepted form response requires it and validates against the requested schema.<br>Severity: `unknown-elicitation-declaration` (error), `interaction-example-elicitation-declaration-mismatch` (error), `interaction-example-elicitation-response-mismatch` (error), `interaction-example-elicitation-content-schema-mismatch` (error) · Applies: none listed as applicable

## Tool, Resource, ResourceTemplate, Prompt

- [`mcpdesc.projection.native-schema`](projection-native-schema) — A native projection keeps exactly the declaration fields that the MCP type defines in the revision, unchanged after reference resolution, and the value validates against the pinned MCP schema of the revision.<br>Severity: `projection-postcondition-failed` (error) · Applies: none listed as applicable
