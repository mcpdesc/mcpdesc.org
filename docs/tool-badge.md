# mcpdesc badge & tools-catalog strategy

Status: **Working strategy** — how the `{mcpdesc}` project manages the tools catalog and the
`mcpdesc` badge. This is a repository design doc; the reader-facing "how to add a tool" guide
lives on the site at [`/docs/add-a-tool`](../src/content/docs/docs/add-a-tool.mdx).

## Goals

- Let tool authors **self-declare** which MCP Description spec version their tool supports.
- Keep that declaration **at the source** (the tool's own repository README), not duplicated
  and drifting on mcpdesc.org.
- Give the `{mcpdesc}` project a **structured, auditable catalog** it can grow with the
  community and, later, build automatically.

## Division of responsibility

- **The tool** declares its supported spec version(s) via the **mcpdesc badge** in its
  README. The tool is the source of truth for its own version support.
- **mcpdesc.org** does **not** display which spec version a tool supports. The tools page
  shows only the tool name, a one-line description, and a maturity status. At submission
  time we verify the badge exists in the README and points at a real published spec version.

## The mcpdesc badge

The mcpdesc badge states the supported MCP Description specification version in the mcpdesc
brand blue **`#3c68d9`** (= RGB 60/104/217, the sRGB rendering of the site's
`--color-brand`). There are two forms; both render as **mcpdesc | 0.7.0**.

### Hosted endpoint badge (recommended)

Repositories reference a JSON file hosted on mcpdesc.org via shields.io's
[endpoint badge](https://shields.io/badges/endpoint-badge). shields fetches the label,
version, and color from us, so **the project controls the badge centrally** — change the
JSON and every repo re-renders the new label/color the next time its badge cache refreshes.

```markdown
[![mcpdesc](https://img.shields.io/endpoint?url=https://mcpdesc.org/badge/0.7.0.json)](https://mcpdesc.org)
```

- The JSON files live under [`public/badge/`](../public/badge/), one per published spec
  version (e.g. `0.7.0.json`). Each is the record for that version.
- A tool references the file matching the version it supports; multiple versions = multiple
  badges.
- **Caching caveat:** GitHub proxies README images through its Camo cache and shields.io
  caches endpoint responses, so a change to the JSON is **eventually consistent**, not
  instant — it can take minutes to hours to propagate. Colours and labels update
  automatically; version *numbers* should still be treated as stable per file.

### Static badge (fallback only)

Use this only where a repository cannot depend on a remote endpoint. It is self-contained but
forfeits central maintainability — the color and label are frozen into each README:

```markdown
[![mcpdesc](https://img.shields.io/badge/mcpdesc-0.7.0-3c68d9)](https://mcpdesc.org)
```

The version segment must be a published MCP Description spec version. The badge links to
`https://mcpdesc.org`.

The badge is **self-declared** in either form. It is not a certification, endorsement, or
conformance guarantee by the `{mcpdesc}` project.

### Adding a new spec version

When a new spec version ships, add `public/badge/<version>.json` (copy an existing file and
bump `message`). Existing per-version badges are unaffected; tools opt in to the new version
by pointing at the new file.

## The catalog (records)

The catalog is data-driven, one YAML file per tool under
[`tools/`](../tools/), validated by the `tools` collection schema in
[`src/content.config.ts`](../src/content.config.ts). The tools page renders from this
collection; the structured format lets us build filtering and counts later.

**Filename = the tool id** (`<owner>-<repo>`, e.g. `cisco-open-mcptoolkit-contract.yaml`).
First-party non-repo entries use `mcpdesc-<slug>`.

Rendered fields: `id` (→ `#id` anchor on the card), `name`, `tagline`, `status`,
`categories`, `languages`, `registries`, `href`.

**Categories** are coarse, goal-oriented buckets — organized by *what the user is trying to
do*, not by tool verb, and deliberately **not** the awesome-MCP *server* taxonomy (which
categorizes servers by domain). The four buckets map to a build-vs-run axis:

| Category | Covers | Axis |
|---|---|---|
| `creation` | capture/dump, generate, edit descriptions | build |
| `documentation` | generate + render human-readable docs | build |
| `hosting` | mock, serve, gateway, proxy from a description | run |
| `testing` | validate, lint, test, diff/compare, conformance | build |

**Languages** follow the awesome-mcp-devtools SDK legend (TypeScript, Python, Go, Rust, …).
**Registries** record where the tool is published (npm, PyPI, crates.io, …). Both render as a
small muted meta line on the card (e.g. `TypeScript · npm`).

A `draft` flag controls visibility: draft entries are shown only in the dev server (with a
“Draft” indicator) and hidden from production. Flip `draft: false` to publish an entry
automatically on the next build.

Records-only fields (kept for our records, **never** rendered): `repoUrl`, `badge`
(whether the README badge was verified), `specVersions` (the versions the tool declares),
`license`, `contact` (main point of contact — name + email), and `added`.

## Submission & verification flow

1. Author submits the **Tool submission** GitHub issue form
   (`.github/ISSUE_TEMPLATE/tool-submission.yml`).
2. The single hard requirement is the badge: a maintainer verifies the repo README shows the
   mcpdesc badge and that its version is a real published specification version. The form also
   captures the latest supported version (a dropdown) for our records.
3. On acceptance, a maintainer adds a `tools/<slug>.yaml` entry recording the
   submitted metadata (including `badge: true`, `specVersions`, and the `contact`). Add it as
   `draft: true` first to review the card in dev, then set `draft: false` to publish.

## When a new spec version ships

Listed tools are expected to update their badge (and, if needed, resubmit metadata) to
declare support for the new version. Because versions live on the tools' own READMEs, no
site content changes are required when a tool bumps its supported version.

## Cost & caching

Hosting the badge JSON does **not** scale cost with the number of repos, because every repo
that supports a given version references the **same** endpoint URL (`/badge/<version>.json`):

- **shields.io** caches per endpoint URL, so 1,000 repos map to **one** cache key. It
  refetches our JSON only when its cache expires (`cacheSeconds: 3600`, with a 300s floor
  enforced by shields).
- **GitHub Camo** caches the rendered badge image for hours, so the large majority of README
  views never reach shields, let alone our origin.
- Net origin load is on the order of a few requests per hour and a few MB per month — well
  within **Cloudflare Pages Free** (unlimited static requests and bandwidth). Effective cost
  ≈ **$0**.

Guardrail: keep the endpoint URL **shared per version**. Never mint per-repo badge URLs — it
would multiply shields cache keys and origin fetches for no benefit.
