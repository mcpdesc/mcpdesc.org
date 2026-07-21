# AI Contribution Policy

> [!IMPORTANT]
>
> If you use **any kind of AI assistance** to contribute to the `{mcpdesc}` project,
> it must be disclosed in the pull request or issue.

We welcome and encourage the use of AI tools to help improve the `{mcpdesc}` project.
AI assistance can help with code generation, schema and example drafting, issue
triage, documentation, and reviewing changes.

That said, if you use any kind of AI assistance (for example, agents such as Claude
Code or ChatGPT) while contributing, **this must be disclosed in the pull request or
issue**, along with the extent to which it was used (for example, editorial polish vs.
generating an entire schema or specification change).

If your PR responses or review comments are AI-generated, disclose that as well.

As an exception, trivial spacing or typo fixes do not need to be disclosed, so long
as the changes are limited to small parts of a file or short phrases.

An example disclosure:

> This PR was drafted primarily with Claude Code; I reviewed and validated every change.

Or a more detailed disclosure:

> I consulted ChatGPT to understand the format, but the solution was fully authored
> manually.

Failure to disclose is, first and foremost, discourteous to the maintainers reviewing
your contribution. It also makes it harder to judge how much scrutiny a change needs —
especially for the specification, schemas, and normative examples, where correctness
and provenance matter.

## What we look for

When submitting AI-assisted contributions, please ensure they include:

- **Clear disclosure of AI use** — you are transparent about whether and how much AI
  was involved.
- **Human understanding** — you personally understand what the change does.
- **Clear rationale** — you can explain why the change is needed and how it fits the
  goals of the `{mcpdesc}` format and ecosystem.
- **Concrete evidence** — tests, examples, or scenarios that demonstrate the change
  works as intended.
- **Your own analysis** — your assessment of the change and its trade-offs.

## What we may close

We reserve the right to close submissions that appear not to follow this disclosure
policy, or where AI-generated content cannot be reasonably understood, maintained, or
justified by the contributor.

## Scope

This policy applies to **all repositories in the
[mcpdesc](https://github.com/mcpdesc) organization**, including the website,
documentation, specification, schemas, examples, and tooling.

For the broader contribution model, see [CONTRIBUTING.md](CONTRIBUTING.md) and the
project [GOVERNANCE.md](GOVERNANCE.md).
