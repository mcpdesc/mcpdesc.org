# Choosing Primitives

Apply the design-first method; do not restate it. For the rationale, link to
<https://mcpdesc.org/docs/design-first/methodology>.

## Decision order

For each user intention, ask in this order:

1. **Is it an action with a side effect or a computation?** → **Tool**.
2. **Is it contextual data the consumer reads?** → **Resource**.
3. **Is it addressable data identified by a variable id?** → **Resource template**.
4. **Is it a reusable, user-initiated workflow?** → **Prompt**.

Do not default everything to a tool. A leaderboard, a rules document, or a stored result is
usually a **resource**, not a tool.

## Challenge every candidate

For each proposed capability, record:

- the user intention it serves;
- why this primitive (not another);
- at least one **rejected alternative** when the choice is ambiguous;
- whether reading it has a side effect (it should not, for resources).

## Common corrections

| Symptom | Likely correction |
|---|---|
| A `get_*` tool that only reads data | Model it as a resource or resource template. |
| One generic `execute`/`run`/`call_api` tool | Split into intention-named tools. |
| Every backend endpoint mapped 1:1 to a tool | Design higher-level, intention-based tools. |
| A tool that "advances" state just by reading | Separate reading (resource) from mutating (tool). |
| Tool output that only a human can interpret | Add a structured output schema. |

## Coverage check

Before finishing the map, confirm you considered **resources and prompts**, not only tools.
Missing resource/prompt opportunities is a common design gap.
