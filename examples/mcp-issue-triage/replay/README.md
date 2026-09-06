# Replay dataset (`--replay`)

`triage.jsonl` is a hand-authored replay dataset: request/response pairs that let the mock
return **argument-dependent** responses, including a real error path. Run it deterministically:

```bash
mcpmock run mcp-issue-triage.mcpdesc.yaml \
  --replay replay/triage.jsonl \
  --similarity-threshold 100
```

## What it covers

| Interaction | Result |
|---|---|
| Read `triage://issues/open` | The three open issues (`ISSUE-101`, `-102`, `-103`). |
| Read `triage://reference/labels` | Valid priorities and resolutions. |
| Read `triage://issues/ISSUE-101` / `ISSUE-102` | Each issue's full detail (distinct per URI). |
| Read `triage://issues/ISSUE-999` | `Issue not found` error (`-32004`). |
| `set_priority` `ISSUE-101` → `P1` | Success (with `structuredContent`). |
| `assign_issue` `ISSUE-101` → `alice` | Success. |
| `close_issue` `ISSUE-102` as `duplicate` of `ISSUE-101` | Success. |

A believable triage conversation: read the queue, open `ISSUE-101` and `ISSUE-102`, notice they
are the same crash, prioritise and assign the canonical one, close the duplicate, and see a clean
error when reading an issue that does not exist.

## Requires mcpmock 1.2.0

This dataset relies on two capabilities added in `mcpmock` 1.2.0: **per-URI `resources/read`
replay** (distinct content and errors per resource URI) and **`structuredContent`** on tool
results (each tool response carries both the text block and the structured object). Tool calls are
keyed on `method:name` + argument hash; resource reads are discriminated by URI.

## Format

See the upstream spec: authoring replay datasets for `mcpmock`
(`docs/authoring-replay-datasets.md` in `cisco-open/mcptoolkit-mock`). Each interaction is a
`request` line and a `response` line sharing an `id`; tool results use
`result.content[0].text`, resource reads use `result.contents[0].text`, and errors use `error`.
Validate with `jq -c . replay/triage.jsonl > /dev/null`.
