# Side Effects, Annotations, and Retries

Treat side effects, idempotency, and retry behaviour as part of the interface. Design them
before implementation.

## Annotations

The current format supports these tool annotation hints:

| Hint | Meaning | Set true when |
|---|---|---|
| `readOnlyHint` | Does not modify state | the tool only reads/computes |
| `destructiveHint` | May remove or overwrite data | the tool deletes/overwrites |
| `idempotentHint` | Same call → same effect | repeating the call is safe |
| `openWorldHint` | Interacts with external systems | the tool calls out to the world |

Annotations are **hints, not guarantees**. The server must still enforce behaviour. Set them
conservatively; when unsure, omit rather than assert.

## Idempotency and duplicate calls

For every mutating tool, decide:

- Is it safe to call twice? If yes, set `idempotentHint: true` and make the design return
  the same result on repeat.
- If not idempotent, define what a duplicate call returns (for example, an
  "already done" error the model can recover from).
- Does the caller need a client-supplied idempotency key?

## Confirmation and reversibility

- Which operations should the host confirm with the user first?
- Can the operation be reversed? If not, say so in the description.

## State

- Enumerate states and permitted transitions.
- Prefer **server-minted** identifiers for sessions and results.
- Define expiry and what happens to expired state.
- Keep private identifiers out of public resources.
