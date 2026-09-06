# MCP Protocol Quiz — Design Decisions

> Design artifact (M1). Records the decisions that shape the agent-facing design of the
> MCP Protocol Quiz before the MCP Description document is written. Companion to
> [capability-map.md](capability-map.md). These are **design-time** decisions; no server
> is implemented here.

Each decision states the options considered, the outcome, and the review trigger that would
justify revisiting it. The design-first *methodology* lives in the conceptual article and is
applied here, not repeated:

- [Design-First for MCP Servers](../../src/content/docs/docs/design-first/methodology.mdx)

---

## Decision 1 — Expose an MCP interface

- Status: accepted

**Context.** A quiz could be delivered as a conventional HTTP API behind a website.

**Options.**
- HTTP API: simplest for a single deterministic web front end.
- MCP server: capabilities are discoverable and usable across many AI hosts.

**Decision.** Expose an **MCP interface** for the tutorial product.

**Rationale.** AI hosts are the first-class consumers: the model should discover the quiz
tools, read the rules and leaderboard as resources, and run a reusable prompt — without a
bespoke integration per host. A production product could later expose *both* HTTP and MCP
over shared domain logic; that is out of scope here.

**Review trigger.** If the only consumer became a single controlled web UI, an HTTP API
would be sufficient and MCP would add cost without value.

---

## Decision 2 — `get_current_question` is a resource, not a tool

- Status: accepted

**Context.** The brief listed `get_current_question` as a candidate tool.

**Decision.** Represent the current question as a **read-only resource template**
`quiz://sessions/{session_id}/current-question`, and additionally return the next question
inline in the structured output of `start_quiz` and `submit_answer`.

**Rationale.** Reading a question is contextual data, not a state-mutating action. Modeling
it as a tool would imply a side effect (advancing the quiz) that it must not have — the
cursor only advances when an answer is submitted. The inline `nextQuestion` field gives the
model immediate next-step guidance without an extra round trip; the resource lets the
participant re-read the current question at any time.

**Consequences.** The `NO_ACTIVE_QUESTION` error code from the brief is unnecessary; reading
the resource when no question is active is a normal read that returns an empty/`null`
`currentQuestion`. The resource **never** contains the correct option (see Decision 8).

**Review trigger.** If a host could not read resources, the current question would need a
tool or would rely solely on the inline field.

---

## Decision 3 — The leaderboard is a resource, not a tool

- Status: accepted

**Context.** The brief proposed a `get_leaderboard` tool but flagged it for challenge.

**Decision.** Model the leaderboard as a **resource** `quiz://leaderboard/global`.

**Rationale.** The leaderboard is read-only ranked data with no side effect. A tool would
imply an action and force the model to "call" for data that is naturally addressable and
cacheable. This is the clearest illustration in the example of choosing a resource over a
tool.

**Review trigger.** If the leaderboard required parameters that felt like a query action
(for example, per-difficulty ranking with complex filters), a tool or a parameterized
resource template would be reconsidered.

---

## Decision 4 — Completion is automatic, and `complete_quiz` is idempotent

- Status: accepted

**Context.** Should the quiz end automatically after the final answer, or require an
explicit completion call?

**Decision.** Both, with clear roles:
- `submit_answer` on the **final** question automatically transitions to `completed` and
  returns a `resultId`.
- `complete_quiz` exists for **early completion** and is **idempotent**: calling it on an
  already-completed session returns the existing result rather than an error.

**Rationale.** Automatic completion removes a redundant step in the common path. An explicit
idempotent `complete_quiz` lets a participant stop early and lets a host safely retry a call
whose outcome it is unsure of — a designed answer to "what happens if the same request is
submitted twice?".

**Consequences.** `QUIZ_ALREADY_COMPLETED` applies to `submit_answer` against a completed
session, **not** to the idempotent `complete_quiz` path.

**Review trigger.** If partial results should not be produced on early completion, the
early-completion behaviour would change.

---

## Decision 5 — Immediate per-answer correctness, no answer key mid-quiz

- Status: accepted

**Decision.** `submit_answer` returns `wasCorrect` and the `runningScore` immediately, but
does **not** reveal the correct option for a missed question while the quiz is active.

**Rationale.** Immediate correctness is useful feedback. Revealing the correct option
mid-quiz would leak answer keys into the interaction and undermine the anti-cheating
boundary (Decision 9). Correct/incorrect status per question appears only in the final
result (Decision 8).

**Review trigger.** A "practice mode" that teaches by revealing answers would relax this,
but that is a different product mode.

---

## Decision 6 — Session lifecycle, expiry, and timing

- Status: accepted

**Decision.**
- States: `created → active → completed`, with `active → expired` after **30 minutes** of
  inactivity.
- Elapsed time is measured **server-side conceptually**, from session start to completion,
  and reported as `durationSeconds`. The host does not measure or supply timing.
- Submitting to an expired session returns `SESSION_EXPIRED` (`recoverable: false`,
  `suggestedAction`: start a new quiz).

**Rationale.** Server-minted time and state prevent a host or model from influencing scoring
or ranking. The 30-minute idle window is a **design assumption** for the tutorial, not a
verified product value.

**Review trigger.** Real usage data or product requirements would set the true expiry window.

---

## Decision 7 — Ranking and leaderboard nature

- Status: accepted

**Decision.** Rank by: (1) higher `score` first, (2) lower `durationSeconds` breaks a score
tie, (3) earlier `completedAt` breaks any remaining tie. The leaderboard is **tutorial-only
mock data**, not a live multi-user service.

**Rationale.** A deterministic, documented tie-break keeps the example reproducible. Labeling
the leaderboard as mock data keeps the example within the design-only scope.

**Review trigger.** A real leaderboard service would define consistency, retention, and
abuse-prevention rules — deferred to implementation.

---

## Decision 8 — Privacy and protected data

- Status: accepted (revised 2026-07-28 to add a post-completion result review)

**Public leaderboard fields** (`quiz://leaderboard/global`): `rank`, `displayName`, `score`,
`maxScore`, `durationSeconds`, `completedAt`. The leaderboard never carries per-question
data or answers.

**Completed result** (`quiz://results/{result_id}`): the public fields above **plus a
per-question review** — for each question `{ questionId, wasCorrect, selectedOption,
correctOption, explanation }`. The review exists to let the assistant explain to the
participant *where and why* they missed a question after the quiz ends.

**Never exposed through any resource or output:** `session_id`, client metadata, IP
addresses, host or model information. Correct answers and chosen options remain hidden
**while the quiz is active** (Decisions 5 and 9) and appear **only** in a completed result's
review.

**Rationale.** Immediate post-quiz review is a core learning use case; a result that only
says "you got q2 wrong" cannot teach. Keeping the leaderboard answer-free preserves the
anti-cheating boundary for the shared, ranked surface.

**Accepted trade-off.** Because a result is addressed by a *public* `result_id`, putting the
answer key in the result makes it readable by anyone who has (or guesses) a result id — the
answer bank is no longer fully server-private. This is accepted for the tutorial: the bank is
small, tutorial-only mock data, and the simplicity is worth more than perfect secrecy at this
stage. The privacy-preserving alternative — keep the public/shareable result answer-free and
serve the detailed review only through a **participant-scoped** surface — is deferred and
enumerated under [advanced/](advanced/README.md).

**Review trigger.** Real personal data (beyond a display name), a real multi-user
leaderboard, or a need to protect the answer bank would move the detailed review to the
participant-scoped design in `advanced/`.

---

## Decision 9 — Anti-cheating boundary (prompt vs server)

- Status: accepted

**Decision.** The `run_mcp_quiz` prompt and the tool descriptions instruct the model to:
- act as a **facilitator**, never the contestant;
- **never** answer on the participant's behalf;
- **never** read or infer answer keys;
- **only** submit an answer explicitly provided by the participant;
- **never** call `submit_answer` without an explicit participant answer.

**Server-enforced (not left to the prompt):** no resource exposes answer keys; the
current-question resource omits the correct option; `submit_answer` validates the selected
option against the allowed set and returns `INVALID_ANSWER_OPTION` otherwise.

**Rationale.** Guidance in a prompt is not a security control. The design keeps enforcement
in the server so the boundary holds even if a model ignores the instructions.

**Review trigger.** New host behaviours that bypass the prompt would strengthen server-side
checks further.

---

## Decision 10 — Display-name and input policy

- Status: accepted

**Decision.**
- `displayName`: 1–40 characters after trimming; no control characters; invalid input →
  `INVALID_DISPLAY_NAME`.
- `difficulty`: enum `easy | medium | hard`; other values → `UNSUPPORTED_DIFFICULTY`.
- `questionCount`: integer 3–10; the deterministic bank is served in fixed order and the
  first *N* questions are selected (reproducible, no randomization in the tutorial).
- `selectedOption`: enum `A | B | C | D`.

**Rationale.** Constrained, enumerated inputs are easier for a model to satisfy and make
validation errors actionable.

**Review trigger.** Localization or a larger question bank would revisit these limits.

---

## Refinements from design review (M4)

The design-time mock review (`design-review-report.md`) produced three interface refinements.
They make tool outputs self-identifying and point directly to the next readable resource,
because the current question and result are resource **templates** whose concrete URIs a
model would otherwise assemble by hand.

| ID | Refinement | Applied to |
|---|---|---|
| R1 | Return resolved `currentQuestionUri` | `start_quiz`, `submit_answer` |
| R2 | Echo `sessionId` in outputs | `submit_answer`, `complete_quiz` |
| R3 | Return resolved `resultUri` | `complete_quiz`, completed `submit_answer` |

Confirmed unchanged by review: leaderboard/result remain resources/templates; the prompt
carries the anti-cheating boundary; no served payload exposed a correct answer.

---

## Error model

The 0.7.0 schema has **no dedicated error location**.

> MCP Description 0.7.0 does not provide a native, machine-readable catalogue of tool execution errors. 
> 
> The tutorial therefore keeps outputSchema limited to successful structured output, represents mock failures using MCP’s isError: true result mechanism, and records expected domain errors and recovery guidance in the design decisions. 
> 
> A native tool-error catalogue remains a potential future MCP Description enhancement. It
> is deliberately outside this 0.7.0 design.

Accordingly, each tool's `outputSchema` describes **successful** structured output only.
Expected domain errors are documented here and, in the design-time mock, are surfaced using
MCP's `isError: true` result mechanism rather than as an `outputSchema` field. Each
documented error uses this shape in its result content:

```yaml
error:
  code: string          # stable machine code
  message: string       # human-readable summary
  recoverable: boolean  # can the interaction continue after handling it?
  suggestedAction: string
  details: object        # optional structured context
```

Codes used by the final design (only those the capability surface requires):

| Code | Raised by | Recoverable |
|---|---|---|
| `INVALID_DISPLAY_NAME` | `start_quiz` | yes |
| `UNSUPPORTED_DIFFICULTY` | `start_quiz` | yes |
| `SESSION_NOT_FOUND` | `submit_answer`, `complete_quiz` | no |
| `SESSION_EXPIRED` | `submit_answer` | no |
| `ANSWER_ALREADY_SUBMITTED` | `submit_answer` | yes |
| `INVALID_ANSWER_OPTION` | `submit_answer` | yes |
| `QUIZ_ALREADY_COMPLETED` | `submit_answer` | no |

`NO_ACTIVE_QUESTION` from the brief is intentionally dropped (see Decision 2).

## Unresolved and deferred

These are recorded now and revisited after the M4 mock review; none need server code:

1. Should the current-question resource be paginated or single-item? (Currently single-item.)
2. Should `completedAt` be coarsened (for example, to the minute) for extra privacy?
3. Should the leaderboard expose a per-difficulty view as a separate resource?
4. Exact `durationSeconds` rounding rule.

Implementation-only concerns (SDK, persistence, authentication, real leaderboard service,
conformance testing) are **out of scope** and belong to the deferred implementation article.
