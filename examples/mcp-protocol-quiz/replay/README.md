# Replay mode — full 3-question quiz playthrough (advanced)

> **Advanced, design-time only.** This directory is **not** part of the tutorial. It shows
> how to drive a *complete, playable* quiz game against the design-time mock using
> `mcpmock` **replay mode**, which selects a recorded response based on the **arguments** of
> a tool call. The static fixtures in [`../mock-data/`](../mock-data/) serve one response
> per tool and cannot branch on arguments (see limitation L1 there); replay complements
> them by making a real playthrough possible.
>
> Nothing here is a test of a real implementation. There is no server. Responses are
> hand-authored design fixtures and contain **no answer keys beyond what a participant would
> already see** — the correctness of each option is baked into the recorded response purely
> so the mock can give feedback during a design review.

## Files

| File | Purpose |
|---|---|
| `3-questions-quiz.jsonl` | Replay dataset for one complete 3-question game (session `qz_sess_REPLAY03`). |
| `methodology.md` | How a replay dataset is built from an MCP Description, and how it scales to 5- and 10-question games. |

## What the dataset covers

A single 3-question session, `qz_sess_REPLAY03`, over three MCP tools:

- `start_quiz` — three recorded requests (one per difficulty: `easy`, `medium`, `hard`),
  each returning the same first question and `totalQuestions: 3`.
- `submit_answer` — **all four options (A/B/C/D) for each of the three questions** (12
  interactions), so any answer the participant gives returns correct feedback and advances
  to the right next question. The final question completes the quiz and returns a
  `resultId`.
- `complete_quiz` — one recorded response for stopping early or re-reading the result.

Correct answers (for reference): **q1 → B (Resource)**, **q2 → C (Prompt)**,
**q3 → C (Tool)**.

## Run

Replay mode selects responses by matching the tool name **and** the call arguments. Run
from this `replay/` directory. The default similarity threshold (**70%**) is intentional —
see [Why not `--similarity-threshold 100`](#why-not---similarity-threshold-100) below.

### stdio (pipe JSON-RPC yourself)

```bash
mcpmock run ../mcp-protocol-quiz.mcpdesc.yaml \
  --replay 3-questions-quiz.jsonl \
  --debug
```

### Streamable HTTP (connect a host, e.g. VS Code)

This matches the endpoint already configured in the workpack's
`.vscode/mcp.json` (`http://localhost:3111/mcp`):

```bash
mcpmock run ../mcp-protocol-quiz.mcpdesc.yaml \
  --replay 3-questions-quiz.jsonl \
  --transport streamable-http --port 3111 \
  --debug
```

### Layered with the static fallback (the "complementary" combination)

Replay is checked first; if a request does not match any recorded entry, `mcpmock` falls
back to the `--data` static override, then to Faker:

```bash
mcpmock run ../mcp-protocol-quiz.mcpdesc.yaml \
  --replay 3-questions-quiz.jsonl \
  --data ../mock-data/ \
  --debug
```

```
match replay entry ──▶ (no match) ──▶ static <tool>.json override ──▶ (none) ──▶ Faker
```

> Note: on the fallback path, `../mock-data/start_quiz.json` describes a **5-question**
> session. If a `start_quiz` call fails to match replay (see below) it will silently serve
> that 5-question fixture instead of the 3-question game. Prefer the replay-only command
> for a clean playthrough.

## How to play

Start a quiz through your host and, when asked:

1. Give **any** display name (the dataset matches regardless of the name).
2. Choose **any** difficulty — `easy`, `medium`, or `hard` are all recorded.
3. **Ask for 3 questions.** The recorded `start_quiz` requests all include
   `questionCount: 3`; if the host omits `questionCount`, the match drops below the
   threshold and falls back to Faker (or the 5-question static fixture). Always request 3.

Then answer q1–q3 with A/B/C/D. Any choice returns correct/incorrect feedback and advances;
the third answer completes the quiz and yields `qz_res_REPLAY03`.

## Why not `--similarity-threshold 100`

`start_quiz` takes a free-text `displayName` that changes every game, so an incoming call
never matches a recorded one exactly. Matching succeeds on **similarity**: `difficulty` and
`questionCount` match (weight 1.0 each) while `displayName` differs (0.5), giving
`2.5 / 3 ≈ 83%` — above the default 70% threshold, below 100%. Running at `100` would force
Faker for every `start_quiz`. `submit_answer` and `complete_quiz` carry no free-text
arguments, so they match exactly (100%) regardless of the threshold.

## Validate the dataset

```bash
# 1. Every line is valid JSON
jq -c . 3-questions-quiz.jsonl > /dev/null && echo OK

# 2. Every id has exactly one request and one response
jq -s 'group_by(.id) | map({id: .[0].id, entries: length}) | map(select(.entries != 2))' \
  3-questions-quiz.jsonl   # → [] means all paired

# 3. Every recorded payload is itself valid JSON
jq -r 'select(.direction=="response") | .result.content[0].text' 3-questions-quiz.jsonl \
  | jq -c . > /dev/null && echo OK

# 4. Dry-run and watch the matcher decide (composite key, hash, similarity per candidate)
mcpmock run ../mcp-protocol-quiz.mcpdesc.yaml --replay 3-questions-quiz.jsonl --debug
```

## Known behaviours (design-time)

- **Scoring is golden-path-consistent, not truly cumulative.** A replay response can only
  depend on the current call's arguments (`sessionId`, `questionId`, `selectedOption`) — it
  cannot see earlier answers. Scores are therefore authored assuming every *previous*
  question was answered correctly: the all-correct path reads exactly `1 → 2 → 3` and a
  final `3/3`, while mixed paths show a plausible-but-not-audited `runningScore`. See
  `methodology.md` for the full explanation.
- **`mcpmock` returns tool output only as a text content block, never as
  `structuredContent`** (same as the static fixtures, limitation L2). An MCP
  `CallToolResult` can carry output in two places: `content` (readable blocks) and the
  optional `structuredContent` (a typed JSON object validated against the tool's
  `outputSchema`). `mcpmock` 1.0.0 emits the entire payload as a JSON-stringified string
  inside a single `text` block and omits `structuredContent` entirely — verified here:

  ```jsonc
  // tools/call start_quiz →
  {
    "content": [ { "type": "text", "text": "{\"sessionId\":\"qz_sess_REPLAY03\", ... }" } ]
    // no "structuredContent" key
  }
  ```

  The JSON is exact and the game plays correctly (hosts fall back to reading the text), but
  the `outputSchema` → `structuredContent` typing path is **not** exercised by this mock
  version. This is a property of `mcpmock`, not of the replay dataset: replay returns the
  recorded `result` verbatim, so if a future `mcpmock` populated `structuredContent` you
  could add that field to each recorded response and it would pass through unchanged. Raised
  upstream against the mock CLI (see the issue draft in the project handoff notes).
- **Resource reads are not covered** here; `resources/read` still returns mock-generated
  placeholder content.

Verified with `mcpmock` 1.0.0.
