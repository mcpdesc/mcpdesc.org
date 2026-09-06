# Mock fixtures (design-time only)

Deterministic override fixtures for reviewing the MCP Protocol Quiz design with `mcpmock`.
They are a **design instrument**, not a test of a real implementation, and contain **no
answer keys** and no real personal data.

## Files

| File | Tool | Represents |
|---|---|---|
| `start_quiz.json` | `start_quiz` | A started 5-question session, returning the first question. |
| `submit_answer.json` | `submit_answer` | A correct answer that advances to the next question. |
| `complete_quiz.json` | `complete_quiz` | A completed result with score, duration, and rank. |

Each file is named exactly after its tool and holds the tool's structured success response.

## Run

```bash
mcpmock run ../mcp-protocol-quiz.mcpdesc.yaml --data .
# stdio; pipe JSON-RPC requests. Add --transport streamable-http --port 3000 for HTTP.
```

## Mock behaviour (verified 2026-07-30, mcpmock 1.2.0)

- **One response per tool with `--data`.** Static overrides do not branch on arguments, so a
  single canonical response is served per tool. Use `--replay` (see `../replay/`) for
  argument-dependent responses and error paths (incorrect answer, duplicate, invalid option,
  expired/unknown session, repeated completion), also documented as design fixtures in
  `../scenarios/design-transcripts.md` and `../scenarios/mock-observations.md`.
- **Tool output now includes `structuredContent`** (built from each tool's `outputSchema`)
  alongside the text block; hosts that only read text still see the same data.
- **Resource content:** under `--data`, `resources/read` returns placeholder content; `--replay`
  now serves real per-URI resource content, so rules, leaderboard, and result content can be
  pinned in a replay dataset.

None of these affect the design decisions; they scope what the mock can demonstrate.
