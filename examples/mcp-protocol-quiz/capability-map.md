# MCP Protocol Quiz — Capability Map

> Design artifact (M1). Human-readable capability inventory produced **before** the
> MCP Description document. It applies the methodology from
> [Design-First for MCP Servers](../../src/content/docs/docs/design-first/methodology.mdx)
> to a concrete example. It does not repeat that article.

## Product outcome

| Field | Value |
|---|---|
| Participant | A person who wants to check their knowledge of the Model Context Protocol. |
| Desired outcome | Take a short quiz through an AI host, answer one question at a time, and receive a score, duration, and leaderboard position. |
| Host / model role | **Facilitator only.** The model presents questions and submits the participant's explicit answers. It never answers on the participant's behalf. |
| Why an AI host | The quiz is meant to be discoverable and usable from any MCP host, with model-facing tools, contextual resources, and a reusable prompt. |
| Simpler as HTTP? | A conventional quiz website would use an HTTP API. See the interface decision in [decisions.md](decisions.md#decision-1--expose-an-mcp-interface). |

## Interface decision (summary)

MCP is selected because AI hosts are the first-class consumers and the capabilities
should be discovered through a standard model-oriented interface. Full rationale and the
rejected alternative are recorded in [decisions.md](decisions.md#decision-1--expose-an-mcp-interface).

## Approved capability surface

| User intention | MCP primitive | Name | Reason |
|---|---|---|---|
| Learn the rules before starting | Resource | `quiz://rules` | Passive contextual information, read once. |
| Start a quiz | Tool | `start_quiz` | Creates a session (side effect); needs parameters. |
| See the current question | Resource template | `quiz://sessions/{session_id}/current-question` | Reading a question is contextual data, not an action; also returned inline by the tools. |
| Answer a question | Tool | `submit_answer` | Records the participant's answer and advances state. |
| Finish (or stop early) | Tool | `complete_quiz` | Closes the session and produces a result; idempotent. |
| Read a finished result | Resource template | `quiz://results/{result_id}` | Addressable, read-only public data identified by URI. |
| View the leaderboard | Resource | `quiz://leaderboard/global` | Ranked read-only data, not an action. |
| Run the whole quiz conversationally | Prompt | `run_mcp_quiz` | Reusable, user-initiated workflow that coordinates the tools and resources. |

This surface satisfies the example requirements: **3 purposeful tools**, **2 resources**,
**2 parameterized resource templates**, and **1 user-invoked prompt**.

## Challenged primitive choices

Every candidate from the design brief was challenged. Where a choice was not obvious, the
rejected alternative is recorded.

| Candidate | Challenge | Outcome |
|---|---|---|
| `get_current_question` **tool** | Is fetching a question an *action*? | **Rejected as a tool.** Reading the current question is contextual data → resource template `quiz://sessions/{session_id}/current-question`. The tools also return the next question inline, so no separate fetch tool is needed. |
| `get_leaderboard` **tool** | Is the leaderboard an *action* or *data*? | **Rejected as a tool.** The leaderboard is read-only ranked data → resource `quiz://leaderboard/global`. |
| Result as **tool output only** | Should a completed result be addressable later? | **Rejected.** A result is durable, shareable, read-only data → resource template `quiz://results/{result_id}` (the tools also return the `resultId`). |
| Explicit `complete_quiz` vs automatic completion | Do we need an explicit completion tool? | **Both, deliberately.** `submit_answer` on the final question auto-completes; `complete_quiz` allows stopping early and is **idempotent** for safe re-calls. |
| A session resource template exposing full state | Would it leak answer keys? | **Restricted.** Only the current question (without the correct option) is exposed; full session state and answer keys are never exposed as resources. |

See [decisions.md](decisions.md) for the reasoning behind each of these and for the state,
timing, ranking, privacy, retry, and anti-cheating decisions.

## State model

```text
created ──start_quiz──▶ active ──submit_answer (final) / complete_quiz──▶ completed
                          │
                          └──idle 30 min──▶ expired
```

| From | Trigger | To | Notes |
|---|---|---|---|
| — | `start_quiz` | active (via created) | Server mints a session identifier. |
| active | `submit_answer` (non-final) | active | Advances the question cursor. |
| active | `submit_answer` (final) | completed | Auto-completes and returns a `resultId`. |
| active | `complete_quiz` | completed | Early completion; idempotent thereafter. |
| active | 30 min idle | expired | Further submissions return `SESSION_EXPIRED`. |
| completed | `complete_quiz` | completed | Idempotent — returns the existing result. |

## Identifiers

- `session_id` — server-minted, prefix `qz_sess_`. Private (never in a public resource).
- `result_id` — server-minted, prefix `qz_res_`. Public (appears in `quiz://results/{result_id}`).

Session and result identifiers are intentionally distinct so a public result can be shared
without exposing the private session.

## Unresolved questions (deferred)

Tracked in [decisions.md](decisions.md#unresolved-and-deferred) and revisited after the
design-time mock review (M4). None require server code to resolve.
