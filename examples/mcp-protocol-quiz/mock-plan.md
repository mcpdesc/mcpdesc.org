# MCP Protocol Quiz — Initial Mock Plan

> Design artifact (M1). Plans how the design-time **mock** will be used to review the
> capability surface. The mock is a **design instrument**, not a test of a real
> implementation. Fixtures and observations are produced in the mock review (M4).

## Tool and versions

- Mock: `@cisco_open/mcptoolkit-mock` (`mcpmock`), v1.1.0 — reverify before publication.
- Runtime: Node.js ≥ 20.
- Source of truth for capabilities: `mcp-protocol-quiz.mcpdesc.yaml` (authored in M2).

## Verified mock capabilities (from the mock README)

The mock can serve: `initialize`, `tools/list`, `tools/call`, `prompts/list`,
`prompts/get`, `resources/list`, `resources/templates/list`, `resources/read`. It supports
stdio (default) and Streamable HTTP transports, auto-generates data from JSON schemas, and
accepts JSON override fixtures. These map directly onto the quiz surface.

## Planned commands (verified syntax; run in M4)

```bash
# stdio (default) — the shell is the client
mcpmock run examples/mcp-protocol-quiz/mcp-protocol-quiz.mcpdesc.yaml

# Streamable HTTP — persistent server for host/inspector review
mcpmock run examples/mcp-protocol-quiz/mcp-protocol-quiz.mcpdesc.yaml \
  --transport streamable-http --port 3000
```

## Fixtures to prepare (deterministic, no implementation logic)

| Fixture | Purpose | Scenario |
|---|---|---|
| `start_quiz` success | First question returned inline | T1 |
| `submit_answer` correct | `wasCorrect: true`, next question | T1 |
| `submit_answer` incorrect | `wasCorrect: false`, running score | T1 |
| `submit_answer` final | Auto-completion with `resultId` | T1 |
| `ANSWER_ALREADY_SUBMITTED` | Duplicate-answer error object | T3 |
| `INVALID_ANSWER_OPTION` | Option not in A–D | T4 |
| `SESSION_NOT_FOUND` / `SESSION_EXPIRED` | Session errors | T2, T5 |
| `quiz://rules` | Rules resource read | pre-T1 |
| `quiz://leaderboard/global` | Leaderboard resource read | T7 |
| `quiz://results/{result_id}` | Result resource template read | T8 |
| `quiz://sessions/{session_id}/current-question` | Current question, **no answer key** | T3 recovery |
| `run_mcp_quiz` prompt | Prompt text with anti-cheating rules | T6 |

Fixtures must contain **no correct-answer keys** in any resource payload (Decision 8).

## What the mock will and will not establish

The mock **will** help answer: are the names understood, does the model pick the resource
vs the tool correctly, are inputs/outputs usable, can the interaction recover from a designed
error, and does any output leak protected data.

The mock **will not** establish: correct business logic, secure authorization, reliable
storage, protocol conformance of a future server, production performance, or compatibility
with every MCP host.

## Feature-support checks to confirm in M4

## Feature-support checks (verified 2026-07-26, mcpmock 1.0.0)

- [x] `resourceTemplates` are advertised via `resources/templates/list`. **Reads** of a
      concrete templated URI return **auto-generated placeholder** content (`--data` overrides
      apply to tools only).
- [x] `prompts/get` returns the prompt description and a message carrying the anti-cheating
      text, as designed.
- [~] JSON override fixtures replace tool responses (returned as a **text** content block,
      not `structuredContent`); they do **not** override resource reads.
- [x] Mock limitations that affect a transcript are documented in
      `scenarios/mock-observations.md`, not worked around.

See `design-review-report.md` for the resulting refinements.
