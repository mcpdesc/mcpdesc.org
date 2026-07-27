# Discovery Questionnaire

Ask only high-value questions. Skip anything that can be derived later or that the user has
already answered. Group answers into **facts**, **assumptions**, **decisions**, and **open
questions**.

## Outcome and users

1. Who is the user or agent, and what outcome do they want?
2. Which consumers will connect — AI hosts/agents, applications, both?
3. What would the user say in one sentence to trigger this server?

## Systems and data

4. Which external systems, APIs, or data stores are involved?
5. What information is sensitive or must never be exposed to the model or a resource?
6. What data is naturally *contextual* (read) versus *actionable* (do)?

## Behaviour

7. Which operations create side effects (create, update, delete, send, pay, deploy)?
8. Which operations must be deterministic or server-enforced regardless of the model?
9. Where is explicit user confirmation required?
10. What should happen if the same request arrives twice?

## Constraints

11. What is the authentication assumption for this design (including "none, for now")?
12. What transport/deployment context is expected (local stdio, remote HTTP)?
13. What is explicitly out of scope?

## Anti-goals

14. What must this server **not** do?
15. Which low-level operations should stay internal rather than becoming tools?

Record unresolved items; do not invent answers. Carry open questions into `decisions.md`.
