# Design Review Report (M4)

Review of the MCP Protocol Quiz design using the Live Editor review criteria and a
design-time `mcpmock` walkthrough. **Design validation only** — not implementation testing,
not a conformance or coverage claim.

## Inputs

- `mcp-protocol-quiz.mcpdesc.yaml` (validated 0.7.0, strict: 0 errors, 0 warnings)
- `mock-data/` fixtures; `scenarios/mock-observations.md`
- Tools: `mcpcontract` 1.0.0, `mcpmock` 1.0.0

## Findings and refinements

The review produced three meaningful interface refinements. Each improves the agent-facing
interface; none expands scope toward implementation.

### R1 — Return a resolved `currentQuestionUri`

- **Finding.** The current question is a resource **template**
  (`quiz://sessions/{session_id}/current-question`). A model holding only a `sessionId`
  must assemble the concrete URI to re-read the question.
- **Change.** `start_quiz` and `submit_answer` now return `currentQuestionUri` (null on
  completion). This is the design-review "add a next-action field" outcome.

### R2 — Echo `sessionId` in tool outputs

- **Finding.** Tool results are consumed as opaque JSON. A host running several sessions
  cannot reliably match a response to its session from the payload alone.
- **Change.** `submit_answer` and `complete_quiz` now echo `sessionId`.

### R3 — Return a resolved `resultUri`

- **Finding.** The result is a resource **template** (`quiz://results/{result_id}`); the
  same URI-assembly burden applies at completion.
- **Change.** `complete_quiz` (and completed `submit_answer`) now return `resultUri`.

## Before / after

| Tool | Before | After |
|---|---|---|
| `start_quiz` | sessionId, state, totalQuestions, nextQuestion | + **currentQuestionUri** |
| `submit_answer` | wasCorrect, runningScore, questionsRemaining, state, nextQuestion, resultId | + **sessionId**, **currentQuestionUri**, **resultUri** |
| `complete_quiz` | resultId, state, score, maxScore, durationSeconds, rank | + **sessionId**, **resultUri** |

## Confirmed by review (no change needed)

- The leaderboard and result are advertised as **resources/templates**, not tools (the key
  primitive decisions hold under review).
- The `run_mcp_quiz` prompt carries the facilitator/anti-cheating boundary; no served
  payload exposed a correct answer, confirming the privacy design.
- `complete_quiz` idempotency and the auto-completion path read clearly with the added
  identifiers.

## Deferred (unchanged)

- Coarsening `completedAt` for privacy and a per-difficulty leaderboard view remain deferred
  design questions; they concern resource **content**, which is a server concern and not part
  of the description.

## Mock limitations (scope of this review)

- One response per tool (no argument branching); error paths are documented design fixtures.
- Tool output surfaced as text, not `structuredContent`.
- Resource content is auto-generated; real rules/leaderboard/result content is deferred to
  implementation.

## Verdict

The refined description validates clean against 0.7.0 (strict) and the fixtures serve. The
design is **implementation-ready** for the deferred implementation/testing workstream. This
review does not establish runtime correctness, security, storage, or protocol conformance.
