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

## T8 — Read a finished result

```text
◆ model: reads resource quiz://results/qz_res_01
⧉ server: { resultId: "qz_res_01", displayName: "Ada", score: 4, maxScore: 5,
            durationSeconds: 132, rank: 3, completedAt: "…",
            questions: [ { questionId: "q1", wasCorrect: true }, … ] }
```

No correct-answer key and no chosen options appear in the result (Decision 8).

---

## Review checklist seeded for M4

- [ ] Are capability **names** understood by the model without extra explanation?
- [ ] Does the model choose the **resource** for rules/leaderboard/result rather than a tool?
- [ ] Are **error** `suggestedAction` fields specific enough to recover?
- [ ] Is the **auto-completion** result obvious, or is a `complete_quiz` call expected?
- [ ] Does the **anti-cheating** boundary hold under T6?
- [ ] Do any outputs risk **leaking** answer keys?
