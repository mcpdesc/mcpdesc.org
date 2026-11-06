---
title: Unchecked Requirements
description: Normative MCP Description 0.9.0-rc.2 requirements that no validation rule checks, and why.
slug: docs/rules/0.9.0-rc.2/unchecked
sidebar:
  label: Unchecked requirements
  order: 1
---

87 normative requirements are not checked by any validation rule. Each entry links to the requirement and states why validation cannot check it.

| Reason | Meaning | Requirements |
| --- | --- | --- |
| `runtime` | Runtime behavior of MCP clients, servers, or consumers | 19 |
| `processing` | Behavior of MCP Description tools that document fixtures cannot show | 48 |
| `guidance` | An authoring choice the document cannot decide | 20 |

## 3. Document Structure

- [`req-serialization-order`](/docs/specification/0.9.0-rc.2/document-structure#req-serialization-order) · **processing** — Concerns how tools read a serialization, not a document value.
- [`req-omission-not-absence`](/docs/specification/0.9.0-rc.2/document-structure#req-omission-not-absence) · **runtime** — Constrains how consumers interpret an absent property.
- [`req-primitive-absence`](/docs/specification/0.9.0-rc.2/document-structure#req-primitive-absence) · **runtime** — Constrains how consumers interpret an absent collection.
- [`req-property-order`](/docs/specification/0.9.0-rc.2/document-structure#req-property-order) · **processing** — Concerns how tools read a serialization, not a document value.

## 4. Versioning

- [`req-schema-identifier-exact`](/docs/specification/0.9.0-rc.2/versioning#req-schema-identifier-exact) · **guidance** — An authoring choice; omitting or varying $schema does not change conformance.
- [`req-schema-uri-immutable`](/docs/specification/0.9.0-rc.2/versioning#req-schema-uri-immutable) · **processing** — Concerns schema publication, checked by the release publication checks rather than by document validation.
- [`req-schema-bytes-immutable`](/docs/specification/0.9.0-rc.2/versioning#req-schema-bytes-immutable) · **processing** — Concerns schema publication, checked by the release publication checks rather than by document validation.
- [`req-schema-prerelease-identity`](/docs/specification/0.9.0-rc.2/versioning#req-schema-prerelease-identity) · **processing** — Concerns schema publication, checked by the release publication checks rather than by document validation.
- [`req-schema-publication-http`](/docs/specification/0.9.0-rc.2/versioning#req-schema-publication-http) · **processing** — Concerns schema publication, checked by the release publication checks rather than by document validation.
- [`req-schema-publication-headers`](/docs/specification/0.9.0-rc.2/versioning#req-schema-publication-headers) · **processing** — Concerns schema publication, checked by the release publication checks rather than by document validation.
- [`req-schema-aliases`](/docs/specification/0.9.0-rc.2/versioning#req-schema-aliases) · **processing** — Concerns schema publication, checked by the release publication checks rather than by document validation.
- [`req-schema-status-manifests`](/docs/specification/0.9.0-rc.2/versioning#req-schema-status-manifests) · **processing** — Concerns repository files, not documents.
- [`req-no-network-conformance`](/docs/specification/0.9.0-rc.2/versioning#req-no-network-conformance) · **processing** — Network access by a validator cannot be shown by a document fixture.
- [`req-schema-retrieval-policy`](/docs/specification/0.9.0-rc.2/versioning#req-schema-retrieval-policy) · **processing** — Network access by a consumer cannot be shown by a document fixture.
- [`req-version-support`](/docs/specification/0.9.0-rc.2/versioning#req-version-support) · **processing** — Concerns implementation claims.

## 5. Info Object

- [`req-info-trust`](/docs/specification/0.9.0-rc.2/info-object#req-info-trust) · **runtime** — Constrains how consumers interpret Info values.
- [`req-info-version-semver`](/docs/specification/0.9.0-rc.2/info-object#req-info-version-semver) · **guidance** — A versioning convention; any non-empty version is valid.

## 6. Transports

- [`req-transports-omission`](/docs/specification/0.9.0-rc.2/transports#req-transports-omission) · **runtime** — Constrains how consumers interpret absent transports.
- [`req-transport-selection`](/docs/specification/0.9.0-rc.2/transports#req-transport-selection) · **runtime** — Concerns client connection behavior.

## 7. Security

- [`req-security-schemes-omission`](/docs/specification/0.9.0-rc.2/security#req-security-schemes-omission) · **runtime** — Constrains how consumers interpret absent security schemes.
- [`req-security-transport-variants`](/docs/specification/0.9.0-rc.2/security#req-security-transport-variants) · **guidance** — An authoring choice that a document cannot show.
- [`req-security-no-combined-requirement`](/docs/specification/0.9.0-rc.2/security#req-security-no-combined-requirement) · **processing** — Concerns tool behavior when transports differ.

## 8. Capabilities

- [`req-extensions-not-reinterpreted`](/docs/specification/0.9.0-rc.2/capabilities#req-extensions-not-reinterpreted) · **processing** — Concerns tool transformations, not document values.
- [`req-extensions-catalogue-disclosure`](/docs/specification/0.9.0-rc.2/capabilities#req-extensions-catalogue-disclosure) · **processing** — Concerns validator metadata and release practice.
- [`req-extensions-profiles`](/docs/specification/0.9.0-rc.2/capabilities#req-extensions-profiles) · **processing** — Concerns optional validation profiles.
- [`req-client-requirements-unconditional`](/docs/specification/0.9.0-rc.2/capabilities#req-client-requirements-unconditional) · **guidance** — Whether a capability is used on every runtime path cannot be decided from the document.
- [`req-client-requirements-extension-compatibility`](/docs/specification/0.9.0-rc.2/capabilities#req-client-requirements-extension-compatibility) · **processing** — Concerns compatibility tools, not documents.
- [`req-client-requirements-compatibility`](/docs/specification/0.9.0-rc.2/capabilities#req-client-requirements-compatibility) · **processing** — Concerns compatibility tools, not documents.
- [`req-capability-independence`](/docs/specification/0.9.0-rc.2/capabilities#req-capability-independence) · **processing** — Concerns tool transformations, not document values.

## 9. Tools

- [`req-tool-schema-closed-recommended`](/docs/specification/0.9.0-rc.2/tools#req-tool-schema-closed-recommended) · **guidance** — Recommends a schema style; both styles are valid.
- [`req-tool-schema-no-fetch`](/docs/specification/0.9.0-rc.2/tools#req-tool-schema-no-fetch) · **processing** — Network access by a validator cannot be shown by a document fixture.
- [`req-tool-schema-consumer-certainty`](/docs/specification/0.9.0-rc.2/tools#req-tool-schema-consumer-certainty) · **runtime** — Advice to consumers about unresolved references.
- [`req-tool-schema-self-contained`](/docs/specification/0.9.0-rc.2/tools#req-tool-schema-self-contained) · **guidance** — An authoring preference; external references remain valid.
- [`req-tool-example-not-inferred`](/docs/specification/0.9.0-rc.2/tools#req-tool-example-not-inferred) · **processing** — Concerns how producers create documents.
- [`req-tool-example-tooling`](/docs/specification/0.9.0-rc.2/tools#req-tool-example-tooling) · **processing** — Concerns documentation and mock tooling.
- [`req-tool-example-no-secrets`](/docs/specification/0.9.0-rc.2/tools#req-tool-example-no-secrets) · **guidance** — Whether a value is a secret cannot be decided from the document.
- [`req-tool-example-untrusted`](/docs/specification/0.9.0-rc.2/tools#req-tool-example-untrusted) · **runtime** — Constrains how consumers use example content.
- [`req-interaction-step-not-wire`](/docs/specification/0.9.0-rc.2/tools#req-interaction-step-not-wire) · **runtime** — Concerns MCP connections, not documents.
- [`req-interaction-no-secrets`](/docs/specification/0.9.0-rc.2/tools#req-interaction-no-secrets) · **guidance** — Whether a value is a secret cannot be decided from the document.
- [`req-interaction-untrusted`](/docs/specification/0.9.0-rc.2/tools#req-interaction-untrusted) · **runtime** — Constrains how consumers use scenario content.
- [`req-tool-annotations-untrusted`](/docs/specification/0.9.0-rc.2/tools#req-tool-annotations-untrusted) · **runtime** — Constrains MCP clients.

## 10. Resources and Resource Templates

- [`req-resource-annotations-hints`](/docs/specification/0.9.0-rc.2/resources#req-resource-annotations-hints) · **runtime** — Constrains how consumers use annotations.
- [`req-resource-example-order`](/docs/specification/0.9.0-rc.2/resources#req-resource-example-order) · **processing** — Concerns how consumers use example contents.
- [`req-resource-example-tooling`](/docs/specification/0.9.0-rc.2/resources#req-resource-example-tooling) · **processing** — Concerns documentation and mock tooling.
- [`req-resource-example-no-secrets`](/docs/specification/0.9.0-rc.2/resources#req-resource-example-no-secrets) · **guidance** — Whether a value is a secret cannot be decided from the document.
- [`req-resource-example-untrusted`](/docs/specification/0.9.0-rc.2/resources#req-resource-example-untrusted) · **runtime** — Constrains how consumers use example content.

## 11. Prompts

- [`req-prompt-example-tooling`](/docs/specification/0.9.0-rc.2/prompts#req-prompt-example-tooling) · **processing** — Concerns documentation and mock tooling.
- [`req-prompt-example-no-secrets`](/docs/specification/0.9.0-rc.2/prompts#req-prompt-example-no-secrets) · **guidance** — Whether a value is a secret cannot be decided from the document.
- [`req-prompt-example-untrusted`](/docs/specification/0.9.0-rc.2/prompts#req-prompt-example-untrusted) · **runtime** — Constrains how consumers use example content.

## 12. Elicitation Declarations

- [`req-elicitation-not-capability`](/docs/specification/0.9.0-rc.2/elicitation#req-elicitation-not-capability) · **runtime** — Constrains how consumers interpret a declaration.
- [`req-elicitation-runtime-wording`](/docs/specification/0.9.0-rc.2/elicitation#req-elicitation-runtime-wording) · **runtime** — Concerns the message a server sends at run time.
- [`req-elicitation-url-no-fetch`](/docs/specification/0.9.0-rc.2/elicitation#req-elicitation-url-no-fetch) · **processing** — Network access by a validator cannot be shown by a document fixture.

## 13. Tags

- [`req-tags-display-order`](/docs/specification/0.9.0-rc.2/tags#req-tags-display-order) · **runtime** — Concerns how user interfaces present tags.

## 14. Specification Extensions

- [`req-extension-naming-convention`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-naming-convention) · **guidance** — A naming convention; any name matching ^x- is valid.
- [`req-extension-lowercase-prefixes`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-lowercase-prefixes) · **guidance** — A naming convention; any name matching ^x- is valid.
- [`req-extension-object-values`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-object-values) · **guidance** — An authoring preference; any JSON value is valid.
- [`req-extension-no-core-override`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-no-core-override) · **guidance** — Concerns extension design; validation applies core rules regardless of extensions.
- [`req-extension-schema-unavailable`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-schema-unavailable) · **processing** — Concerns optional extension validation by tools.
- [`req-extension-documentation`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-documentation) · **guidance** — Concerns extension publication, outside the document.
- [`req-extension-mechanisms-separate`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-mechanisms-separate) · **processing** — Concerns tool transformations, not document values.
- [`req-extension-no-secrets`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-no-secrets) · **guidance** — Whether a value is a secret cannot be decided from the document.
- [`req-extension-untrusted`](/docs/specification/0.9.0-rc.2/specification-extensions#req-extension-untrusted) · **runtime** — Constrains how consumers use extension content.

## 15. Serialization

- [`req-serialization-support`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-support) · **processing** — Concerns implementation capabilities.
- [`req-serialization-json-claims`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-json-claims) · **processing** — Concerns implementation claims.
- [`req-serialization-media-type`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-media-type) · **processing** — Concerns media types used by tools.
- [`req-serialization-yaml-quoted-dates`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-yaml-quoted-dates) · **guidance** — A style recommendation; unquoted dates decode identically.
- [`req-serialization-explicit-reuse`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-explicit-reuse) · **guidance** — An authoring recommendation.
- [`req-serialization-conversion`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-conversion) · **processing** — Checked for one document pair by scripts/test-serializations.mjs; concerns conversion tools.
- [`req-serialization-numbers`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-numbers) · **processing** — Concerns implementation number handling.
- [`req-serialization-schema-property`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-schema-property) · **guidance** — An authoring recommendation; $schema is optional.
- [`req-serialization-negotiation`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-negotiation) · **processing** — Concerns tool exchanges, not documents.
- [`req-serialization-untrusted`](/docs/specification/0.9.0-rc.2/serialization#req-serialization-untrusted) · **processing** — Resource limits of tools cannot be shown by a document fixture.

## 16. Conformance

- [`req-conforming-implementation`](/docs/specification/0.9.0-rc.2/conformance#req-conforming-implementation) · **processing** — Concerns implementation behavior; its checkable parts are separate requirements.
- [`req-stricter-profile`](/docs/specification/0.9.0-rc.2/conformance#req-stricter-profile) · **processing** — Concerns implementation profiles.
- [`req-implementation-recommendations`](/docs/specification/0.9.0-rc.2/conformance#req-implementation-recommendations) · **processing** — Concerns implementation behavior.
- [`req-partial-support`](/docs/specification/0.9.0-rc.2/conformance#req-partial-support) · **processing** — Concerns implementation documentation.
- [`req-conformance-claim`](/docs/specification/0.9.0-rc.2/conformance#req-conformance-claim) · **processing** — Concerns implementation claims.
- [`req-diagnostic-rule`](/docs/specification/0.9.0-rc.2/conformance#req-diagnostic-rule) · **processing** — Concerns validator output; scripts/test-validation-rules.mjs checks it for the candidate validator on every fixture.
- [`req-rule-results`](/docs/specification/0.9.0-rc.2/conformance#req-rule-results) · **processing** — Concerns validator output; scripts/test-validation-rules.mjs checks the candidate validator's rule results against the validation result schema and every fixture citation.
- [`req-rule-results-executed`](/docs/specification/0.9.0-rc.2/conformance#req-rule-results-executed) · **processing** — Concerns validator behavior; scripts/test-validation-rules.mjs checks that every passed result of the candidate validator has a recorded evaluation.

## 17. Reusable Components and Local References

- [`req-component-limits`](/docs/specification/0.9.0-rc.2/components#req-component-limits) · **processing** — Resource limits of tools cannot be shown by a document fixture.

## 18. Document-oriented Serialization Ordering

- [`req-document-ordering-default`](/docs/specification/0.9.0-rc.2/document-ordering#req-document-ordering-default) · **guidance** — Recommends an authoring and serialization presentation policy; property order does not affect document conformance.
- [`req-document-ordering-algorithm`](/docs/specification/0.9.0-rc.2/document-ordering#req-document-ordering-algorithm) · **processing** — Concerns how serializers organize output, not a document value.
- [`req-document-ordering-collections`](/docs/specification/0.9.0-rc.2/document-ordering#req-document-ordering-collections) · **processing** — Constrains preservation of arrays and named-map entries during serialization.
- [`req-document-ordering-recognition`](/docs/specification/0.9.0-rc.2/document-ordering#req-document-ordering-recognition) · **processing** — Constrains serializer traversal and handling of unknown or opaque values.
- [`req-document-ordering-preservation`](/docs/specification/0.9.0-rc.2/document-ordering#req-document-ordering-preservation) · **processing** — Constrains serializer behavior when applying the presentation profile.

## Appendix A: Icon Object

- [`req-icon-client-formats`](/docs/specification/0.9.0-rc.2/appendices#req-icon-client-formats) · **runtime** — Constrains MCP clients that display icons.

Source: [`validation/unchecked-requirements.yaml`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft/validation/unchecked-requirements.yaml) at immutable tag [`v0.9.0-rc.2`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.2/spec/draft).
