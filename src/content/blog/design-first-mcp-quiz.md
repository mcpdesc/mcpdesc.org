---
title: 'From Idea to Mock MCP Server — Before Writing the Implementation'
listTitle: 'Design-first MCP: from idea to mock'
description: 'A code-first MCP handler is easy to write — and easy to freeze the wrong design into. Here is what changed when we described and mocked an MCP Protocol Quiz before implementing it.'
date: 2026-07-26
author: Stève Sfartz
draft: true
---

The first MCP tool handler is easy. The harder question is whether it should have been that
tool at all.

When you start an MCP server from an SDK template, the first handler arrives before any
deliberate design. And that first handler quietly decides things that are expensive to change
later: the capability boundaries, the schemas, the names a model reasons about, the state
transitions, the retry behaviour, and what information the server exposes. The implementation
becomes the design by default.

So we tried the opposite order on a small example: describe the server first, review and mock
it, and only then consider building it. The example is an **MCP Protocol Quiz** — a quiz about
the Model Context Protocol that a participant takes through an AI host, one question at a time.
It is small enough to hold in your head but rich enough to need tools, resources, a resource
template, and a prompt.

Working design-first with an [MCP Description](/docs/design-first/methodology) document — the
portable `{mcpdesc}` format for describing an MCP server — the interface changed three times
*before* a single handler existed. Each change would have been a refactor if we had coded first.

## Three things the design review changed

### 1. The leaderboard stopped being a tool

The obvious first sketch had a `get_leaderboard` tool. Writing the capability map made the
question explicit: is reading the leaderboard an *action*, or is it *data*? It is read-only
ranked data, so it became a resource — `quiz://leaderboard/global` — not a tool. The same
reasoning turned "get the current question" from a tool into a resource template. A code-first
start would have shipped both as tools, because a handler is the path of least resistance.

### 2. Tool responses learned to identify themselves

The result and the current question are resource *templates* — addresses like
`quiz://results/{result_id}`. Reviewing the mocked interaction surfaced a gap: a model that
had just completed a quiz held only a `resultId`, and would have to assemble the resource URI
by hand to read the result. The responses were also anonymous — nothing tied a reply back to
its session.

So the tool outputs gained a few fields: the resolved `resultUri` and `currentQuestionUri`,
and an echoed `sessionId`. Small changes, but they are exactly the kind of thing you only
notice when you look at the interaction as a whole — and exactly the kind of thing that is
annoying to retrofit once clients depend on the old shape.

### 3. "Don't answer for the player" became a rule, not a hope

The quiz only works if the assistant *facilitates* — it must not answer on the participant's
behalf or reveal the correct option. It is tempting to write that instruction into the prompt
and move on. But prompt text is guidance, not a control. Designing first made the boundary
concrete: no resource exposes an answer key, the current-question resource omits the correct
option, and the server validates every submitted answer. The prompt still sets the tone; the
server enforces the rule.

## What describing it first made possible

None of this required a running server. Because the design was a real document, we could:

- **review** it against a checklist and in the [Live Editor](/live-editor), where the
  capability cards make "resource vs tool" visible at a glance;
- **validate** it against the format schema, so structural mistakes surfaced immediately;
- **mock** it deterministically and walk the actual conversations — the happy path, a
  duplicate answer, an invalid option, and "just answer it for me";
- **reuse** the same artifact as the basis for documentation, fixtures, and an eventual
  implementation.

A note on the mock, because it is easy to overclaim: it is a *design instrument*. It showed us
whether the names read well, whether the model would reach for a resource instead of a tool,
and whether any response leaked a protected value. It also made the format's limits concrete:
this mock serves one canonical response per tool and returns generated content for resource
reads, so the error paths and real leaderboard data are documented alongside the fixtures
rather than pretended. It did **not** prove the business logic, the storage, the security, or
the protocol conformance of a future server. Mocking a design is not testing an
implementation, and we were careful to keep those two ideas apart.

## Where this workflow stops

The tutorial ends with an implementation-ready package: a validated description, a decision
record, deterministic fixtures, and review notes. It deliberately stops before writing the
server. Choosing an SDK, implementing domain logic, adding persistence and authentication,
standing up a real leaderboard, and running conformance tests are a separate workstream — and
a separate article that starts from this exact package. Designing first does not remove that
work; it makes it start from a reviewed target instead of an accidental one.

This is not an argument that MCP should replace HTTP APIs, or that every service belongs behind
a model. Part of the design-first method is
[deciding whether MCP is the right interface at all](/docs/design-first/api-vs-mcp). For this
example, AI hosts are the first-class consumers, so MCP earns its place.

## Try it

- Walk the full [design-first tutorial](/docs/design-first/tutorial) and reproduce the design.
- Read the concepts behind it: [Design-First for MCP Servers](/docs/design-first/methodology)
  and [Deciding Between an MCP Server and an HTTP API](/docs/design-first/api-vs-mcp).
- Open a description in the [Live Editor](/live-editor).
- Browse the complete [MCP Protocol Quiz example](https://github.com/mcpdesc/mcpdesc.org/tree/main/examples/mcp-protocol-quiz),
  or reuse the workflow with the [`design-mcp-server` skill](https://github.com/mcpdesc/mcpdesc.org/tree/main/skills/design-mcp-server).

Describe the agent-facing interface before you write the handler. It is the cheapest time to
change your mind.
