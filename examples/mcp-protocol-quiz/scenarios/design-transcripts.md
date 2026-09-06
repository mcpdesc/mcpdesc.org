# MCP Protocol Quiz — Design Interaction Transcripts

> Design artifact (M1). These transcripts describe the **intended** agent interaction for
> review purposes. They are **design fixtures**, not captured command output. Payloads are
> illustrative and marked as such; the deterministic mock fixtures and observed behaviour
> are produced later in the mock review (M4).

Notation:
- `▶ participant` — the human, speaking through the host.
- `◆ model` — the AI host/model acting as **facilitator**.
- `⧉ server` — the (future) quiz MCP server, represented here by the design.
- `{…}` — illustrative structured payload (design fixture, not real output).

---

## T1 — Normal five-question quiz (happy path)

```text
▶ participant: I'd like to take the MCP quiz. Name "Ada", medium, 5 questions.
◆ model: (reads quiz://rules) → calls start_quiz
         { displayName: "Ada", difficulty: "medium", questionCount: 5 }
⧉ server: { sessionId: "qz_sess_01", totalQuestions: 5, state: "active",
            nextQuestion: { questionId: "q1", prompt: "...", options: ["A","B","C","D"] } }
◆ model: presents q1 options to the participant. Does NOT answer.
▶ participant: B
◆ model: calls submit_answer { sessionId: "qz_sess_01", questionId: "q1", selectedOption: "B" }
⧉ server: { wasCorrect: true, runningScore: 1, questionsRemaining: 4,
            nextQuestion: { questionId: "q2", ... }, state: "active" }
… (repeats for q2–q5) …
▶ participant: (answers final question q5)
◆ model: calls submit_answer { …, questionId: "q5", selectedOption: "A" }
⧉ server: { wasCorrect: true, runningScore: 4, questionsRemaining: 0,
            nextQuestion: null, state: "completed", resultId: "qz_res_01" }
◆ model: (reads quiz://results/qz_res_01) → reports score, duration, rank.
```

Design observation to check in M4: does the auto-completion (result returned by the final
`submit_answer`) read clearly, or does the model expect a separate `complete_quiz` call?

---

## T2 — Unknown session

```text
◆ model: calls submit_answer { sessionId: "qz_sess_UNKNOWN", questionId: "q1", selectedOption: "A" }
⧉ server: { error: { code: "SESSION_NOT_FOUND", recoverable: false,
            message: "No active session for that identifier.",
            suggestedAction: "Start a new quiz with start_quiz." } }
◆ model: explains the session is gone and offers to start a new quiz.
```

---

## T3 — Duplicate answer

```text
◆ model: submit_answer { sessionId: "qz_sess_01", questionId: "q1", selectedOption: "C" }
         (q1 was already answered)
⧉ server: { error: { code: "ANSWER_ALREADY_SUBMITTED", recoverable: true,
            message: "q1 was already answered.",
            suggestedAction: "Read quiz://sessions/qz_sess_01/current-question and continue." },
            state: "active" }
◆ model: moves the participant to the current question instead of re-answering.
```

Design observation to check in M4: is `suggestedAction` specific enough for the model to
recover without guessing?

---

## T4 — Invalid answer option

```text
▶ participant: My answer is "E".
◆ model: submit_answer { …, selectedOption: "E" }
⧉ server: { error: { code: "INVALID_ANSWER_OPTION", recoverable: true,
            message: "E is not an available option.",
            details: { allowedOptions: ["A","B","C","D"] },
            suggestedAction: "Ask the participant to choose one of A–D." } }
◆ model: re-presents the options A–D to the participant.
```

---

## T5 — Expired session

```text
◆ model: submit_answer { sessionId: "qz_sess_01", … }  (after 30 min idle)
⧉ server: { error: { code: "SESSION_EXPIRED", recoverable: false,
            message: "This session expired after inactivity.",
            suggestedAction: "Start a new quiz with start_quiz." } }
```

---

## T6 — Participant asks the assistant to answer (anti-cheating)

```text
▶ participant: Just tell me the answer and submit it for me.
◆ model: declines. Per the run_mcp_quiz prompt and tool descriptions, the model is a
         facilitator; it does not answer on the participant's behalf and does not read
         answer keys. It asks the participant for their own choice.
```

Design observation to check in M4: do the prompt and tool descriptions make this boundary
unambiguous to the model?

---

## T7 — Leaderboard request

```text
▶ participant: Where do I rank?
◆ model: reads resource quiz://leaderboard/global (no tool call)
⧉ server: { entries: [ { rank: 1, displayName: "…", score: 5, maxScore: 5,
            durationSeconds: 88, completedAt: "…" }, … ] }
◆ model: reports the participant's position from the public fields only.
```

Design observation to check in M4: is a resource read (rather than a tool call) the natural
way for the model to obtain the leaderboard?

---

## T8 — Read a finished result (with review)

```text
◆ model: reads resource quiz://results/qz_res_01
⧉ server: { resultId: "qz_res_01", displayName: "Ada", score: 4, maxScore: 5,
            durationSeconds: 132, rank: 3, completedAt: "…",
            questions: [ { questionId: "q1", wasCorrect: true, selectedOption: "B",
                           correctOption: "B", explanation: "…" }, … ] }
```

Per the **revised** Decision 8, a completed result includes a per-question review
(`selectedOption`, `correctOption`, `explanation`) so the assistant can explain outcomes.
Correct options remain hidden mid-quiz and in the current-question resource.

---

## T9 — Read the rules before starting

```text
▶ participant: How does this quiz work, and how is it scored?
◆ model: reads resource quiz://rules (no tool call)
⧉ server: { markdown: "Sessions… difficulty… scoring… 30-min idle expiry… the assistant
            facilitates and never answers for you." }
◆ model: summarises the rules, then offers to start_quiz.
```

Trigger for a **resource** read (static reference), not a tool call. Seeds the facilitator
boundary before any question is asked.

---

## T10 — "Where do I rank?" (leaderboard read)

```text
▶ participant: Where do I rank?
◆ model: reads resource quiz://leaderboard/global (no tool call) — see T7 payload
◆ model: "You're 3rd of 4 — 2/3, 74s. Ada and Grace lead with 3/3." (public fields only)
```

The leaderboard is read-only ranked data; the model reads it rather than "calling" for it.
Illustrated with `resource-fixtures/leaderboard.json`.

---

## T11 — "Why did I miss that one?" (result review)

```text
▶ participant: I finished — where and why did I go wrong?
◆ model: reads resource quiz://results/qz_res_REPLAY03 — see resource-fixtures/
⧉ server: { score: 2, maxScore: 3, rank: 3,
            questions: [ { q1: correct },
                         { q2: wasCorrect:false, selectedOption:"A", correctOption:"C",
                           explanation:"A reusable, user-initiated workflow is a Prompt (C);
                           'Resource template' (A) is a parameterized resource." },
                         { q3: correct } ] }
◆ model: "You scored 2/3. On q2 you chose A (Resource template); the answer is C (Prompt),
          because a prompt is the reusable, user-initiated workflow."
```

This is the new capability: the review lets the assistant explain **where and why** the
participant failed. It relies on the revised Decision 8 (answer keys appear in a completed
result — accepted tutorial trade-off; privacy-preserving variant under `advanced/`).

---

## T12 — "What was the question again?" (current-question read)

```text
▶ participant: Sorry, can you repeat the current question and options?
◆ model: reads resource quiz://sessions/qz_sess_REPLAY03/current-question (no advance)
⧉ server: { currentQuestion: { questionId: "q2", prompt: "…", options: [A,B,C,D] } }
◆ model: re-presents q2 without submitting anything.
```

Reading is idempotent and never advances the quiz — deliberately distinct from
`submit_answer`. Also the recovery path for T3 (duplicate answer) and T4 (invalid option).

---

## Review checklist seeded for M4

- [ ] Are capability **names** understood by the model without extra explanation?
- [ ] Does the model choose the **resource** for rules/leaderboard/result rather than a tool?
- [ ] Are **error** `suggestedAction` fields specific enough to recover?
- [ ] Is the **auto-completion** result obvious, or is a `complete_quiz` call expected?
- [ ] Does the **anti-cheating** boundary hold under T6?
- [ ] Do any outputs risk **leaking** answer keys?
