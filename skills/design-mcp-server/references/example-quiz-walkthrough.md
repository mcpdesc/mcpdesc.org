# Worked Example — MCP Protocol Quiz

This shows the skill applied to a real brief, producing a validated MCP Description with **no
implementation**. The full artifacts live in the example package at
`examples/mcp-protocol-quiz/` in this repository.

## Phase 1 — Outcome (excerpt)

- User: a person checking their knowledge of the Model Context Protocol through an AI host.
- Model role: facilitator only; must never answer for the participant.
- Sensitive data: correct answers must never reach a resource or the model.
- Side effects: starting a session, recording answers, completing a quiz.

## Phase 2 — Interface decision

MCP, because AI hosts are first-class consumers and the capabilities should be discoverable
across hosts. A production version could expose HTTP too, over shared domain logic.

## Phase 3 — Capability map (with a rejected alternative)

- `start_quiz`, `submit_answer`, `complete_quiz` → **tools** (side effects).
- `quiz://rules`, `quiz://leaderboard/global` → **resources** (leaderboard rejected as a
  tool: it is read-only data).
- `quiz://results/{result_id}`, `quiz://sessions/{session_id}/current-question` →
  **resource templates** (a "get current question" tool was rejected: reading is not an
  action).
- `run_mcp_quiz` → **prompt** (facilitator workflow + anti-abuse boundary).

## Phase 4 — Contract design (highlights)

- `submit_answer` auto-completes on the final answer; `complete_quiz` is idempotent.
- `outputSchema` is success-only; domain errors are documented and surfaced via `isError`.
- No resource exposes the correct option; `submit_answer` validates the option server-side.

## Phase 5 — Generate and validate

```bash
scripts/validate-description.sh examples/mcp-protocol-quiz/mcp-protocol-quiz.mcpdesc.yaml
# → Valid mcpdesc (0 errors, 0 warnings, strict)
```

## Phase 6–8 — Review, mock plan, handoff

Review confirmed no answer-key leakage and clear tool descriptions. A deterministic mock
plan was prepared. The package **stops** at an implementation-ready design; SDK selection,
handlers, persistence, authentication, and tests are deferred.
