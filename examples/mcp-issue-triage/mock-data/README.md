# Static mock fixtures (`--data`)

One JSON file per tool. Each holds that tool's canonical **successful** structured response,
returned by `mcpmock run ... --data mock-data/` as a text block plus `structuredContent`.

```bash
mcpmock run mcp-issue-triage.mcpdesc.yaml --data mock-data/
```

| File | Tool | Represents |
|---|---|---|
| `set_priority.json` | `set_priority` | `ISSUE-101` set to `P1`. |
| `assign_issue.json` | `assign_issue` | `ISSUE-101` assigned to `alice`. |
| `close_issue.json` | `close_issue` | `ISSUE-102` closed as a duplicate of `ISSUE-101`. |

Notes:

- `--data` serves **one response per tool** — it does not branch on arguments. For an
  argument-dependent conversation and an error path, use the replay dataset in `../replay/`.
- On `mcpmock` 1.2.0 each tool response also carries **`structuredContent`** (built from the
  tool's `outputSchema`) alongside the text block.
- Resource reads under `--data` return generated placeholders; real per-URI resource content is
  served by the replay dataset in `../replay/`.
- Fixtures contain no real tracker data; identifiers are illustrative.
