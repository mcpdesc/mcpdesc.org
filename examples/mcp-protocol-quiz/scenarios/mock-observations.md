# Mock Observations (M4)

Design-time review of the MCP Protocol Quiz using `mcpmock`. **This is design validation,
not implementation testing.** No claim is made about production correctness, protocol
conformance, or coverage.

- Tools: `mcpcontract` 1.0.0, `mcpmock` 1.0.0
- Command: `mcpmock run mcp-protocol-quiz.mcpdesc.yaml --data mock-data/`
- Date: 2026-07-26

## What the mock advertised

- `tools/list` → `start_quiz`, `submit_answer`, `complete_quiz` with full input/output schemas.
- `resources/list` → `quiz://rules`, `quiz://leaderboard/global`.
- `resources/templates/list` → `quiz://results/{result_id}`,
  `quiz://sessions/{session_id}/current-question`.
- `prompts/get run_mcp_quiz` → returned the prompt description and a message carrying the
  facilitator/anti-cheating text.

The advertised surface matches the design: the leaderboard and result appear as
**resources/templates**, not tools; the prompt carries the anti-cheating boundary.

## Required scenarios

| Scenario | How reviewed | Observation |
|---|---|---|
| Happy path | Served: `start_quiz` → `submit_answer` → `complete_quiz` fixtures | Outputs now carry `sessionId`, `currentQuestionUri`, `resultUri` — the model can proceed and read the next resource without assembling URIs. |
| Leaderboard read | Served: `resources/read quiz://leaderboard/global` | Mock returns **auto-generated placeholder** content (see limitation L3). The resource is correctly advertised and read-only. |
| Result read | Served: `resources/read quiz://results/{id}` | Same as above — advertised as a template; content is placeholder. |
| Invalid session | Design fixture (not arg-branched) | Returns `SESSION_NOT_FOUND` via `isError`; `suggestedAction` says start a new quiz. |
| Duplicate answer | Design fixture | Returns `ANSWER_ALREADY_SUBMITTED` (recoverable); recovery reads `currentQuestionUri`. |
| Invalid answer option | Design fixture | Returns `INVALID_ANSWER_OPTION` with `details.allowedOptions`. |
| Ask the model to answer | Prompt/description review | The `run_mcp_quiz` prompt and tool descriptions instruct the model to decline; enforcement is server-side (no answer keys exposed). |
| Completion repeated | Design fixture | `complete_quiz` is idempotent — repeats return the same result. |

Error/branching scenarios are **documented design fixtures** because the mock serves one
response per tool (limitation L1). See `scenarios/design-transcripts.md`.

## Limitations observed (verified)

- **L1 — One response per tool.** No argument-based branching; alternate/error paths are
  documented, not served dynamically.
- **L2 — Text content, not `structuredContent`.** Tool results come back as a JSON text
  block. Data is exact; structured output typing is not surfaced by this mock version.
- **L3 — Resource content is generated.** `--data` overrides tools only; `resources/read`
  returns placeholder content. Real rules/leaderboard/result content is a server concern.

## Design observations that drove refinements

1. Because the next readable items are **resource templates**, a model holding only a
   `sessionId`/`resultId` must assemble the URI itself. → added resolved `currentQuestionUri`
   and `resultUri` to tool outputs.
2. Tool outputs are consumed as opaque JSON; a response should be **self-identifying** so a
   host tracking multiple sessions can match it. → echo `sessionId` in `submit_answer` and
   `complete_quiz`.
3. The prompt correctly carries the anti-cheating boundary, and no served payload exposed a
   correct answer — confirming the privacy/anti-cheating design holds under review.

See `design-review-report.md` for the full findings and the before/after.
