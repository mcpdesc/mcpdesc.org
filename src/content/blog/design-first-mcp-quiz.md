---
title: "Design and Mock an MCP Server Before You Implement It"
listTitle: "Design-first for MCP servers: lessons from a quiz"
description: "Shape, validate, and test an MCP server interface with MCP Description 0.7.0 before implementation decisions become expensive to change."
date: 2026-09-06
author: Stève Sfartz
draft: true
---

Starting an MCP server from an SDK is quick. The first tools can appear before anyone has
deliberately decided what the server should expose, and those early handlers quietly define
the names, descriptions, schemas, and boundaries that agents will discover.

The implementation becomes the design by default. Only afterward do the harder questions
arrive: is this the right tool, and should it have been a tool at all?

A design-first approach reverses that order. Start with an MCP Description document, review
the capability surface, validate it, and run it as a deterministic mock. Implement the server
only after the interface survives that review.

## A design-first quiz

The design-first learning path uses an **MCP Protocol Quiz** as its worked example. It begins
with product and interface decisions, produces an MCP Description 0.7.0 document, and then
loads that document with `mcpmock` so an AI assistant can exercise the proposed server shape.

Choose the depth that fits your goal:

- [Run the finished design in five minutes](/docs/design-first/quickstart).
- [Use the `design-mcp-server` skill in fifteen minutes](/docs/design-first/skill-tutorial).
- [Build the complete quiz design step by step](/docs/design-first/tutorial).
- Read the underlying [Design-First for MCP Servers methodology](/docs/design-first/methodology).

The complete walkthrough ends with an implementation-ready package: a validated description,
a capability map, a decision record, deterministic fixtures, and review notes. It deliberately
stops before server implementation and runtime conformance testing.

## What changed before any code existed

The quiz design changed several times while it was still only a description and a set of mock
interactions. Those changes are the practical value of moving interface decisions earlier.

### 1. The leaderboard stopped being a tool

The first sketch included a `get_leaderboard` tool. The capability map forced a more useful
question: is reading the leaderboard an action, or is it data?

It is read-only ranked data, so it became the `quiz://leaderboard/global` resource. The same
reasoning turned “get the current question” into a resource template. Both would have worked
as tools, but working is not the same as communicating the right semantics to an MCP host.

### 2. Tool responses became self-identifying

Quiz results and current questions are addressed through resource templates such as
`quiz://results/{result_id}`. During the mocked interaction, a model that completed a quiz held
only a `resultId`; it had to assemble the resource URI itself, and the response did not clearly
identify its session.

The tool outputs gained resolved `resultUri` and `currentQuestionUri` values and echoed the
`sessionId`. These are small changes, but they are much easier to make before clients depend on
the original output shape.

### 3. “Do not answer for the player” became an enforceable boundary

The quiz works only when the assistant facilitates instead of answering on the participant’s
behalf or revealing the correct option. Prompt text can express that instruction, but prompt
text is guidance rather than a security control.

The design therefore keeps answer keys out of every resource, omits the correct option from
the current-question representation, and requires the server to validate submitted answers.
The prompt sets the interaction style; the server design enforces the boundary.

### 4. Tool-execution failures exposed a protocol gap

An expired session, a duplicate answer, or a rate limit can require a client to retry, correct
an argument, or ask the participant to start again. MCP can mark such a result with
`isError: true` and provide human-readable content, but it does not provide a standard,
schema-governed error result equivalent to a successful tool’s `structuredContent` and
`outputSchema`.

A model can understand “session expired; start a new quiz,” but client code cannot safely parse
that prose to choose a recovery action. The design records expected failures without pretending
that MCP Description 0.7.0 can standardize a protocol feature that MCP itself does not define.
The separate [structured tool-errors draft](/blog/structured-error-gap) explores that gap.

## Design first, then implement

Design-first does not remove implementation work. It moves the decisions that shape an
agent-facing interface to the point where they are easiest to inspect and least expensive to
change.

The quiz still needs handlers, persistence, authentication decisions, runtime tests, and
deployment before it becomes a production server. What it no longer needs is an implementation
to discover what its interface should have been.
