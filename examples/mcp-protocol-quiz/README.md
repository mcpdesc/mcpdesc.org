# MCP Protocol Quiz — Design Example

A worked, **design-only** example that applies the {mcpdesc} design-first method to a small
service: an MCP-native quiz that helps a participant check their knowledge of the Model
Context Protocol through an AI host.

> This package contains a reviewed **design** — a capability map, decision records, an
> MCP Description document, deterministic mock fixtures, and review notes. It does **not**
> include a server implementation. Implementation and testing are a separate, deferred
> workstream.

## Read the methodology first

This example applies, without repeating, the conceptual article:

- [Design-First for MCP Servers](../../src/content/docs/docs/design-first/methodology.mdx)

## Contents

| File | What it is |
|---|---|
| [capability-map.md](capability-map.md) | Human-readable capability inventory and primitive choices. |
| [decisions.md](decisions.md) | Design decisions: interface, state, timing, privacy, retries, anti-cheating. |
| [scenarios/design-transcripts.md](scenarios/design-transcripts.md) | Intended agent interactions (design fixtures). |
| [mock-plan.md](mock-plan.md) | How the design-time mock is used for review. |
| [mcp-protocol-quiz.mcpdesc.yaml](mcp-protocol-quiz.mcpdesc.yaml) | Canonical MCP Description document (validates against 0.7.0). |
| [mock-data/](mock-data/) | Deterministic mock fixtures for the three tools. |
| [resource-fixtures/](resource-fixtures/) | Static fake content for the leaderboard and a result review (illustrates the resource reads). |
| [replay/](replay/) | Advanced: a `--replay` dataset for a full 3-question playthrough. |
| [advanced/](advanced/) | Advanced use cases & next steps (privacy-preserving review, per-difficulty leaderboard, practice mode). |
| [scenarios/mock-observations.md](scenarios/mock-observations.md) | What the design-time mock actually showed. |
| [design-review-report.md](design-review-report.md) | Review findings and the before/after refinements. |
| [screenshot-manifest.md](screenshot-manifest.md) | Live Editor visuals (reproducible capture steps). |

## Capability surface (summary)

- **Tools:** `start_quiz`, `submit_answer`, `complete_quiz`
- **Resources:** `quiz://rules`, `quiz://leaderboard/global`
- **Resource templates:** `quiz://results/{result_id}`, `quiz://sessions/{session_id}/current-question`
- **Prompt:** `run_mcp_quiz`

## Design-time tools (verified versions)

- Validate: `mcpcontract validate mcp-protocol-quiz.mcpdesc.yaml --schema mcpdesc --strict`
  (`@cisco_open/mcptoolkit-contract`, verified with 2.0.0-rc.1)
- Mock: `mcpmock run mcp-protocol-quiz.mcpdesc.yaml` (`@cisco_open/mcptoolkit-mock`,
  verified with 1.2.2)
- Visual review: the [Live Editor](https://editor.mcpdesc.org)

Schema: **MCP Description 0.7.0**. The document validates clean (0 errors, 0 warnings,
strict mode) and loads in the mock. Reverify tool versions before relying on them.

## Scope

Human quiz mode only. No authentication, no persistence, no real leaderboard service, no
implementation, and no implementation testing. An agent-challenge mode is a possible future
extension and is intentionally excluded here.
