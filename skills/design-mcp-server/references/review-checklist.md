# Review Checklist

Use during Phase 6. Classify each finding as **error** (blocking), **warning**, or
**advice**, and give a precise remediation. Do not infer runtime correctness from a static
document.

## Structure and identity

- [ ] Server identity, version, and transport are present and appropriate.
- [ ] Only supported fields are used (validate against the resolved schema).

## Capabilities

- [ ] No generic `execute`/`run`/`call_api` tool.
- [ ] Read-only operations are resources, not tools.
- [ ] Addressable data uses resource templates.
- [ ] Resources and prompts were considered, not only tools.
- [ ] No duplicated or overlapping capabilities that impair agent selection.

## Descriptions

- [ ] Every tool description states what it does, when to call it, when **not** to, key
      preconditions, side effects, and any explicit-user-input requirement.
- [ ] Descriptions and schemas agree (no omissions or contradictions).

## Schemas

- [ ] Inputs use enums/constraints and explicit `required`.
- [ ] Every data-returning tool has an `outputSchema` (success only).
- [ ] Outputs support the next interaction.

## Safety and privacy

- [ ] No field exposes secrets, credentials, or answer keys.
- [ ] Reading a resource cannot reveal protected data.
- [ ] Annotations are conservative and not asserted as guarantees.
- [ ] Duplicate-call and retry behaviour is defined.

## Validation

- [ ] The document validates with zero errors (strict) against the resolved schema.
- [ ] Any warnings are resolved or explained.

## Verdict

End with a readiness verdict and a list of unresolved evidence gaps. Design review does not
prove implementation behaviour.
