# Methodology — building a replay dataset from an MCP Description

How to hand-author an `mcpmock` **replay** dataset (JSONL) from an MCP Description alone,
with no live server and no recording. This generalises the worked example in
[`3-questions-quiz.jsonl`](./3-questions-quiz.jsonl) into a repeatable procedure — the same
procedure a future **Agent Skill** can follow after asking the user a few questions.

> Format authority: the `TrafficEntry` type and the loader/matcher in `mcptoolkit-mock`
> (`src/lib/types.ts`, `src/lib/traffic-replayer.ts`). This document describes *how to
> design* a dataset; it does not restate the full format spec.

## 1. What replay gives you, and what it cannot

Replay mode returns a **recorded** response for an incoming JSON-RPC request instead of
generating one with Faker. Matching is **argument-based and stateless**:

1. Requests are grouped by a composite key: `tools/call:<name>` (and `prompts/get:<name>`);
   every other method keys on the method alone.
2. Within a key, an **exact** match of the cleaned argument object wins immediately
   (arguments are stripped of `_meta`/`_`-prefixed keys, sorted, MD5-hashed).
3. Otherwise the best **similarity** match above `--similarity-threshold` (default 70%)
   wins. Per key: `1.0` if present on both sides with equal values, `0.5` if present but
   different, `0` if missing on one side; score = `matchedWeight / max(keyCountA, keyCountB)`.
4. If nothing clears the threshold, Faker is used.

**The consequence that shapes everything below:** a recorded response can only depend on the
**arguments of the current call**. It cannot observe prior calls, so it cannot track true
session state (cumulative score, which questions were already answered, elapsed time). Any
"stateful" behaviour must be *simulated* by choosing values that are consistent along an
intended path.

## 2. Design inputs, taken only from the MCP Description

For each capability you want to drive, read from the mcpdesc:

- **Tools** — `name`, `inputSchema` (required fields, `enum`s, formats, `min`/`max`), and
  `outputSchema` (the exact shape and required fields a response must satisfy).
- **Prompts** — `name` and `arguments`.
- **Resources / templates** — note that `resources/read` is **not** overridable by replay
  in a name-specific way (it keys on method only), so plan resource content separately.

For the quiz, the tools are `start_quiz`, `submit_answer`, `complete_quiz`; the relevant
enums are `difficulty ∈ {easy, medium, hard}` and `selectedOption ∈ {A, B, C, D}`; the
constraint that drives volume is that **any** option may be chosen for **any** question.

## 3. Enumerate the argument sets to cover

Turn each tool's schema into the concrete argument sets a real playthrough will produce.

- **`start_quiz`** — `displayName` is free text (varies every game → rely on similarity, do
  **not** try to match it), `difficulty` is an enum (cover each value you want to allow),
  `questionCount` is fixed to the game length. → one recorded interaction per difficulty.
- **`submit_answer`** — the discriminating arguments are `questionId` and `selectedOption`
  (with a constant `sessionId`). A playable game must answer *any* option, so cover the full
  cross-product: **`questions × 4 options`**.
- **`complete_quiz`** — only `sessionId`; one interaction.

## 4. Pick a session identity and author the golden path

Because responses are stateless, choose **one** session id (here `qz_sess_REPLAY03`) and one
result id (`qz_res_REPLAY03`) and reuse them everywhere. `start_quiz` mints them in its
recorded response; every later request carries the same `sessionId` (the host echoes what
`start_quiz` returned), so those calls match exactly.

Then define an intended **golden path** (all answers correct) and make its numbers exact:

- `runningScore` on question *i* (1-based): `i` if the chosen option is correct, else `i-1`
  — i.e. *assume every previous question was answered correctly*. On the all-correct path
  this reads `1 → 2 → 3`; other paths are plausible but not audited.
- `questionsRemaining` counts down from the schema's `totalQuestions`.
- The **final** `submit_answer` flips `state` to `completed`, sets `nextQuestion: null` and
  `currentQuestionUri: null`, and adds `resultId`/`resultUri`.
- `complete_quiz` reports the golden final score (`3 / 3` here), a fixed `durationSeconds`,
  and a `rank`.

Document this modelling choice wherever the dataset ships — it is the honest boundary of an
argument-based mock.

## 5. Emit request/response pairs

For every argument set, write two JSONL lines sharing a unique, descriptive `id`
(`start-medium`, `q1-B`, `complete`, …):

- **request**: `direction:"request"`, `method:"tools/call"`, `params.name`,
  `params.arguments`.
- **response**: `direction:"response"`, the same `id`, and a `result` (or `error`) whose
  `content[0].text` is the `outputSchema`-shaped payload, JSON-stringified.

Vary only what the arguments justify: for `submit_answer`, the four options of one question
share the same `nextQuestion` and differ only in `wasCorrect` and `runningScore`.

Model failure scenarios (unknown/expired session, duplicate answer, invalid option) with an
`error` object instead of `result` when you want the mock to exercise a recovery path.

## 6. Choose the run configuration

- Keep the **default 70% threshold** when any tool has free-text arguments that must match
  by similarity (here `start_quiz`'s `displayName`). Raising it to `100` would force Faker
  for those calls.
- If *every* discriminating argument is exact (enums/ids only), `--similarity-threshold 100`
  gives strict, unambiguous selection.
- Ensure the host sends the arguments you keyed on. For the quiz, `questionCount` **must** be
  present (omitting it drops `start_quiz` below threshold), so the instructions tell the
  participant to ask for a specific number of questions.

## 7. Validate

```bash
jq -c . dataset.jsonl > /dev/null                                   # valid JSONL
jq -s 'group_by(.id)|map(select(length!=2))' dataset.jsonl          # every id paired → []
jq -r 'select(.direction=="response")|.result.content[0].text' dataset.jsonl | jq -c . >/dev/null
mcpmock run ../server.mcpdesc.yaml --replay dataset.jsonl --debug   # confirm matches, not Faker
```

## 8. Scaling analysis — 3, 5, and 10 question games

With the coverage model above (one `start_quiz` per difficulty, all four options per
question, one `complete_quiz`), the size is:

```
interactions = 3 (start, per difficulty) + 4 × Q (submit) + 1 (complete) = 4Q + 4
lines        = 2 × interactions                                          = 8Q + 8
```

| Game length `Q` | `submit_answer` pairs | Total interactions | JSONL lines |
|---:|---:|---:|---:|
| **3** | 12 | **16** | **32** |
| **5** | 20 | **24** | **48** |
| **10** | 40 | **44** | **88** |

Only three things change between game lengths, all mechanical:

1. `questionCount` and `totalQuestions` are set to `Q` in the recorded `start_quiz`.
2. The `submit_answer` cross-product grows to `Q × 4` pairs; the last question's four
   responses are the completing ones.
3. `complete_quiz` reports `score`/`maxScore` out of `Q`.

Two design notes for longer games:

- **Question bank.** The mcpdesc constrains the tool *shape*, not the question content. A
  `Q`-question game needs `Q` authored questions (prompt + four options + intended correct
  option). Keep them small and educational, as the existing bank does.
- **No new limitations at scale.** The stateless-scoring caveat (§4) is identical for 3, 5,
  or 10 questions — the golden path stays exact; mixed paths stay plausible.

The 3-, 5-, and 10-question datasets are therefore all generable by the same procedure; only
the 3-question dataset is authored for now.

## 9. What a future Agent Skill would ask the user

A skill that turns any mcpdesc into a replay dataset can run steps 2–7 automatically once it
has collected a few decisions it cannot infer from the schema:

1. **Which capabilities** to drive (all tools, or a subset)?
2. **Which enum values / argument sets** to cover, and how exhaustively (e.g. all four quiz
   options vs a golden path only)?
3. For stateful flows, the **golden path** and how to model non-golden values
   (assume-prior-correct, per-call only, …).
4. **Identifiers** to mint (session/result ids) and any fixed values (duration, rank).
5. **Domain content** the schema cannot provide (here: the questions and their correct
   options; error messages and `suggestedAction` text).
6. **Run configuration**: similarity threshold, transport/port, and whether to layer a
   `--data` fallback.

With those answers the skill enumerates argument sets from the `inputSchema`, shapes each
response from the `outputSchema`, emits paired JSONL, and runs the §7 validations.

Verified with `mcpmock` 1.0.0.
