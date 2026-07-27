---
name: design-mcp-server
description: >-
  Guide a user from a product idea to a reviewed, validated MCP Description document —
  deciding MCP vs HTTP, mapping intentions to tools/resources/resource templates/prompts,
  designing schemas and behaviour, and planning a design-time mock. Use when designing a
  new MCP server before implementation, or reviewing an existing MCP Description. Does not
  generate a production server, tests, or deployment.
metadata:
  mcpdesc.status: exploration
  mcpdesc.visibility: private
  mcpdesc.family: first-party
---

# Design an MCP Server

Help a user design an MCP server **before** implementation and stop at a reviewed,
validated MCP Description document plus its supporting design notes. This skill applies the
{mcpdesc} design-first method; it does not implement, generate, scaffold, or test a server.

This skill applies — rather than restates — two conceptual articles. Link to them at the
moment a rationale is needed:

- Design-First for MCP Servers — <https://mcpdesc.org/docs/design-first/methodology>
- Deciding Between an MCP Server and an HTTP API — <https://mcpdesc.org/docs/design-first/api-vs-mcp>

## When to use

- Designing a new MCP server from a product idea or requirements.
- Reviewing or refining an existing MCP Description document.
- Deciding whether a service should expose MCP, an HTTP API, or both.

## When not to use

- Implementing a server, handlers, persistence, authentication, or deployment.
- Generating code from a description, or writing implementation/conformance tests.
  In these cases, stop and produce a handoff (see **Phase 8**).

## Primary output

```text
design/
├── server.mcpdesc.yaml   # validated MCP Description document
├── capability-map.md     # intentions → primitives, with rejected alternatives
├── decisions.md          # interface, state, privacy, retries, anti-abuse decisions
├── review-report.md      # findings from the review pass
└── mock-plan.md          # deterministic design-time mock plan
```

## Workflow

Work through the phases in order. Skip a phase only when the user has already resolved it,
and record that it was skipped.

1. **Understand the outcome.** Ask only high-value questions using
   `references/discovery-questionnaire.md`. Capture users, outcomes, external systems,
   side effects, sensitive data, determinism, auth assumption, and transport context.
2. **Interface decision checkpoint.** Apply the MCP-vs-HTTP method (do not restate it) and
   record a short verdict: `MCP / HTTP / both / insufficient evidence`, with rationale and
   accepted costs. If MCP is not justified, say so — do not force MCP.
3. **Capability map.** Propose tools, resources, resource templates, and prompts using
   `references/choosing-primitives.md`. For each proposal give a reason and, where the
   primitive choice is ambiguous, one rejected alternative. Fill `assets/capability-map-template.md`.
4. **Contract design.** Define names, descriptions, inputs/outputs, side effects,
   annotations, error behaviour, state and identifiers, retries/duplicate calls, privacy,
   and the security assumption. Use `references/schema-design.md` and
   `references/side-effects-and-retries.md`. Record decisions in `assets/decisions-template.md`.
5. **Generate the description.** Author the MCP Description from the resolved schema. Start
   from `assets/minimal-description-template.yaml`. Follow `references/format-reference.md`
   for the current version, allowed fields, and constraints. Do not invent unsupported fields.
6. **Review.** Run the checklist in `references/review-checklist.md`: backend leakage,
   generic/overlapping tools, missing output schemas, ambiguous descriptions, unsafe side
   effects, secret/answer leakage, unclear retry behaviour, missed resource/prompt
   opportunities, and validation errors. Write `review-report.md`.
7. **Mock plan.** Prepare a deterministic design-time mock plan and fixtures. The mock is a
   design instrument, not implementation. Only launch a mock when the tools are available
   and the user asked to run it.
8. **Handoff.** Produce an implementation-ready design package and **stop**. Do not begin
   implementation. Summarize what remains for the implementation/testing workstream.

## Validation

Validate after Phase 5 and again after any change:

```bash
scripts/validate-description.sh design/server.mcpdesc.yaml
```

Prepare a mock-fixtures scaffold (no server code) with:

```bash
scripts/prepare-mock-fixtures.sh design/server.mcpdesc.yaml
```

## Resume behaviour

This skill can start from any of:

- a product brief or requirements;
- an existing MCP Description document;
- an extracted runtime description;
- a partially completed design folder.

Preserve user-authored decisions. When new input contradicts an existing decision, **flag
the contradiction and ask** — do not overwrite silently.

## Hard stops (do not do)

- Do not generate a production server, SDK setup, handlers, persistence, authentication, or
  deployment files.
- Do not write implementation or conformance tests.
- Do not claim a mock proves production correctness.
- Do not put secrets or real personal data in example values.

When asked to do any of the above, stop and create a handoff instead.

## Sample invocations

```text
Design an MCP server for managing conference paper submissions. Start with discovery.
```

```text
Review this MCP Description and tell me what would confuse an agent: ./server.mcpdesc.yaml
```

```text
I have an HTTP API for a booking system. Should it be an MCP server, and if so, design it.
```

## Worked example

`references/example-quiz-walkthrough.md` shows this skill applied to the MCP Protocol Quiz,
producing a validated description without any implementation.
