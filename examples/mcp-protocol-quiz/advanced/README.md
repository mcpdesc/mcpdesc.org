# Advanced use cases & next steps

The [canonical example](../mcp-protocol-quiz.mcpdesc.yaml) keeps a **simple** design: a public
leaderboard and a completed result whose per-question review reveals `correctOption` and an
`explanation` (revised Decision 8). That simplicity has an accepted trade-off — a public
`result_id` makes the answer bank readable.

This folder enumerates richer designs that a follow-up tutorial (or the automated
code-generation step) could adopt. Each is a **design sketch**, not a validated canonical
artifact; [`mcp-protocol-quiz.advanced.mcpdesc.yaml`](mcp-protocol-quiz.advanced.mcpdesc.yaml)
is an exploratory skeleton of the headline surfaces, meant to be merged onto the canonical
base, not run as-is.

> Dynamic behaviour (real scoring, a live leaderboard, computed reviews) is deferred; the
> plan is to implement via automated code generation later. These options describe the
> *interface*, not the runtime.

## A. Privacy-preserving review (headline)

**Problem.** In the simple design, answers leak through the public result id.

**Sketch.** Split the surface:
- `quiz://results/{result_id}` — **public, answer-free**: public fields + per-question
  `wasCorrect` only (shareable, safe on a leaderboard).
- `quiz://results/{result_id}/review` — **participant-scoped**: adds `selectedOption`,
  `correctOption`, `explanation`. In a real implementation this is gated to the owning
  participant; at design time it is documented as participant-only.
- A `review_my_result` prompt to walk the participant through their own review.

**Review trigger.** Real personal data, a real multi-user leaderboard, or a need to protect
the answer bank.

## B. Per-difficulty leaderboard

**Sketch.** A parameterized `quiz://leaderboard/{difficulty}` (easy | medium | hard) template
alongside the global board — resolves deferred question 3 in `../decisions.md`.

**Review trigger.** Participants asking to rank within a difficulty tier.

## C. Practice mode (reveal answers mid-quiz)

**Sketch.** A `mode` input on `start_quiz` (`quiz` | `practice`). In `practice`,
`submit_answer` may reveal the correct option and an explanation immediately — deliberately
relaxing Decision 5 for a teaching mode. Keep the ranked leaderboard limited to `quiz` mode.

**Review trigger.** A learning-focused product mode distinct from the ranked quiz.

## D. Result history / list

**Sketch.** A `quiz://results` collection (recent public results) or a participant-scoped
`quiz://participants/{id}/results`, enabling "show my past attempts".

**Review trigger.** Returning participants; progress tracking.

## E. Question metadata & topics

**Sketch.** A read-only `quiz://topics` resource and richer per-question metadata (topic,
difficulty, spec reference) so reviews can link to MCP documentation.

## F. Privacy hardening

**Sketch.** Coarsen `completedAt` (deferred question 2), pseudonymous display names, and a
retention policy for the leaderboard.

## G. Pagination

**Sketch.** Paginate the leaderboard and (if a bank grows) the current-question resource
(deferred question 1).

---

## Mapping to deferred items

| Advanced option | Source |
|---|---|
| A. Privacy-preserving review | Revised Decision 8 trade-off |
| B. Per-difficulty leaderboard | `../decisions.md` deferred Q3 |
| C. Practice mode | Decision 5 review trigger |
| F. Coarsened `completedAt` | `../decisions.md` deferred Q2 |
| G. Pagination | `../decisions.md` deferred Q1 |

These are interface options only; none require server code here.
