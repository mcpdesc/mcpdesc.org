# Resource content fixtures (design-time, fake data)

Static, illustrative content for the quiz's two read surfaces, so a design review can show
what the assistant would read — not just that the resources are advertised. This directly
exercises resources that would otherwise be *designed but unused* (the over-design
anti-pattern).

| File | Resource | Illustrates |
|---|---|---|
| `leaderboard.json` | `quiz://leaderboard/global` | "Where do I rank?" — a small public ranked board. |
| `result-qz_res_REPLAY03.json` | `quiz://results/qz_res_REPLAY03` | A completed result with a per-question review that explains **where and why** the participant missed q2. |

## Important caveats

- **Fake, tutorial-only data.** Names, scores, and timestamps are invented for illustration.
- **Replay serves equivalent resource content.** `mcpmock` 1.2.0+ can serve per-URI resource
  responses from `../replay/3-questions-quiz.jsonl`. These standalone files remain useful as
  readable design fixtures; the replay embeds their equivalent JSON as MCP resource content.
  The simpler `--data` mode still returns generated placeholder content for resource reads.

- **Answer keys appear in the result review.** Per the revised Decision 8, a completed result
  reveals `correctOption` and an `explanation`. This is an accepted tutorial simplification;
  the privacy-preserving variant is enumerated under [../advanced/](../advanced/README.md).
- **Dynamic behaviour is deferred.** These are static snapshots; a real, computed result and
  live leaderboard come later (implementation via automated code generation).

The result fixture pairs with the 3-question replay game (`../replay/3-questions-quiz.jsonl`,
session `qz_sess_REPLAY03`): the participant answered q1 and q3 correctly and missed q2,
scoring 2/3.
