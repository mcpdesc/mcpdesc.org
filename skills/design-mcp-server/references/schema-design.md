# Schema Design

Design input and output schemas as part of the agent-facing interface, not as a copy of a
storage model.

## Inputs

- Use `enum` for closed sets (difficulty, option, status).
- Constrain strings (`minLength`, `maxLength`, `pattern`) and numbers (`minimum`,
  `maximum`) where the domain has limits.
- Mark `required` explicitly; make required inputs genuinely necessary.
- Set `additionalProperties: false` on objects the model must not extend.
- Prefer values a model can supply from the conversation; avoid internal identifiers as
  required inputs unless the model legitimately holds them.

## Outputs

- Every tool that returns data should declare an `outputSchema`.
- **`outputSchema` describes successful output only.** Do not model errors as an output
  field unless the resolved format has a native error location (current versions do not).
- Return the information the model needs for the **next** step (for example, a next-step
  object or an id to read a resource).
- Exclude internal implementation details and anything sensitive.

## Errors

The current MCP Description format has no native machine-readable tool-error catalogue.
Therefore:

- keep `outputSchema` limited to success;
- represent failures in a design-time mock using MCP's `isError: true` result mechanism;
- document expected domain errors and recovery guidance in `decisions.md`, using a stable
  shape such as `{ code, message, recoverable, suggestedAction, details }`.

## Leakage review

- No schema field may expose secrets, credentials, or answer keys.
- Reading a resource must never reveal protected data (for example, correct answers).
- Keep authentication and secret configuration out of example values.

## Shared shapes

The current format **does not allow a document root `$defs`**. Inline shared object shapes
inside each `inputSchema`/`outputSchema`, or accept controlled duplication. Confirm current
rules in `format-reference.md`.
