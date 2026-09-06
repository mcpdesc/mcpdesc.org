# Screenshot Manifest — MCP Protocol Quiz

The first design-first draft is intentionally text-first. These visuals are deferred editorial
enhancements, not required artifacts for draft review or the local draft commit.

Reproducible capture steps for the tutorial visuals. Images are **pending**; every entry
below can be reproduced from the committed example files with the versions listed. Prefer
generating captures from these committed artifacts (no ad-hoc data).

| ID | Filename | Purpose | Source artifact | Version | Steps | Alt text | Status |
|---|---|---|---|---|---|---|---|
| V1 | design-first-workflow.png | Workflow diagram | tutorial diagram | n/a | Render the Outcome→Decision→Map→Description→Editor→Mock→Refine→Handoff flow | "Design-first workflow from product outcome to implementation handoff." | planned (diagram) |
| V2 | capability-map.png | Capability map | `capability-map.md` | n/a | Diagram tools/resources/templates/prompt around the quiz outcome | "Quiz capabilities: three tools, two resources, two resource templates, one prompt." | planned (diagram) |
| V3 | state-model.png | State model | `capability-map.md` | n/a | Render created→active→completed with active→expired | "Quiz session states and transitions." | planned (diagram) |
| V4 | live-editor-overview.png | Live Editor review | `mcp-protocol-quiz.mcpdesc.yaml` | editor @ editor.mcpdesc.org; schema 0.7.0 | Open the Live Editor, paste the YAML, show validation panel + capability cards | "Live Editor showing the validated quiz description and its capability cards." | pending capture |
| V5 | live-editor-error.png | Validation error | edited copy of the YAML | editor; schema 0.7.0 | Introduce one schema error (e.g. add a root `$defs`), show the error, then the fix | "Live Editor reporting a schema error and the corrected document." | pending capture |
| V6 | refinement-before-after.png | Interface refinement | `design-review-report.md` | n/a | Show `complete_quiz` output before/after (added sessionId, resultUri) | "Before and after: completion output gains self-identifying URIs." | planned (diagram) |
| V7 | handoff-tree.png | Handoff package | example folder | n/a | File tree of the approved design package | "The implementation-ready design package file tree." | planned (diagram) |

## Capture environment

```text
Operating system:
Browser:
Browser version:
Viewport: 1440x900 (suggested)
Zoom: 100%
Theme: light (site pins github-light for code)
Editor version: editor.mcpdesc.org (record commit/date at capture)
Schema version: 0.7.0
Mock version: mcpmock 1.2.2
Date:
```

## Reproduction inputs

- Validate: `mcpcontract validate mcp-protocol-quiz.mcpdesc.yaml --schema mcpdesc --strict`
- Mock: `mcpmock run mcp-protocol-quiz.mcpdesc.yaml --data mock-data/`

## Review

- [ ] No secrets.
- [ ] No local personal paths.
- [ ] No unrelated browser tabs or extensions.
- [ ] Text is legible.
- [ ] Dark/light rendering is acceptable.
- [ ] Alt text describes the instructional purpose.
- [ ] Screenshot matches committed files.
