# AGENTS.md

Guidance for AI agents and human contributors working in this repository.

## What this repo is

The **community-first website** of the **{mcpdesc} project**, served at `mcpdesc.org`. It
is a **static** Astro site deployed to Cloudflare Pages. It is a *communication* project —
it promotes **MCP Description** (`mcpdesc`), an open proposal for describing MCP servers.

The MCP Toolkit tool suite's source code lives under the
[`cisco-open`](https://github.com/cisco-open) GitHub organization, not here.

## Golden rules (do not violate)

1. **Never track user content.** Analytics may only forward the allow-listed scalar
   metadata defined in `src/analytics/events.ts`. Never send, log, or transmit:
   MCP description content, server URLs, tool/resource/prompt names, prompt text,
   uploaded filenames, validation error text, raw schema, auth values, or any private
   identifier. When in doubt, do not track it.
2. **Call `analytics.track(...)` — never `window.plausible(...)` directly** from pages
   or components. Wire events declaratively via `data-analytics-cta` and
   `data-analytics-outbound` attributes (see `src/components/Analytics.astro`).
3. **Keep the site static.** No server runtime, no backend, no API routes. It must build
   to `dist/` and run on Cloudflare Pages Free.
4. **Respect the branding rules** (see below and `docs/terminology-and-positioning.md`).

## Branding and wording

The naming hierarchy (source of truth: `docs/terminology-and-positioning.md`):

- **Community:** the `{mcpdesc}` Community
- **Project (umbrella):** the `{mcpdesc}` project — an independent open source initiative
- **Format (formal):** MCP Description · **short technical name:** `mcpdesc`
- **Tooling:** MCP Toolkit — one open-source tool suite that demonstrates what `mcpdesc` enables, **not** the whole project
- **Website:** mcpdesc.org

Use:

- "Community open-source project", "community-first project"
- Lead: "The `{mcpdesc}` project is an independent open source initiative promoting a
  portable, machine-readable description format for MCP servers" ("open proposal" =
  supporting/candidate language)

Terminology rules (source of truth: `docs/terminology-and-positioning.md`):

- Lead positioning: "The `{mcpdesc}` project is an independent open source initiative
  promoting a portable, machine-readable description format for MCP servers." "open
  proposal" is supporting/candidate language.
- The format's primary noun is **format**. **Do not** use the word "contract" for the
  format; the OpenAPI *analogy* ("like OpenAPI, but for MCP servers") is fine.
- The format is for **describing** servers. Validate/document/mock/test are **tool**
  capabilities — never attribute them to the format itself.
- **Do not pluralize** the format name as "MCP Descriptions"; the plural is **MCP
  Description documents** / **`mcpdesc` documents** (on disk: **`mcpdesc` file**).
- **Always use "an" before MCP** (not "a"): "M" is pronounced "em" (vowel sound),
  so the correct article is "an MCP Description", "an MCP server", "an MCP client".
- **Braces `{mcpdesc}`** = the brand/wordmark; use them in prose for the **project,
  community, and brand**. Use plain `mcpdesc` for technical/file/package/command contexts,
  and **MCP Description** for the formal format name. (In `.mdx` write `` `{mcpdesc}` ``;
  YAML frontmatter must not contain bare braces.)
- **project vs community vs initiative** (be rigorous — these are three distinct referents):
  - **the `{mcpdesc}` project** = the *whole thing* (format, spec, tools, docs, website,
    governance, branding, assets). Use it for **scope, assets, decisions, governance,
    releases, positioning, and curation** — e.g. "the project lists compatible tools",
    "the project maintains the spec", "project branding".
  - **the `{mcpdesc}` Community** = the *people* (maintainers, contributors, users,
    adopters). Use it for **participation, discussion, expectations, and roles**. Capital C
    as a proper noun; lowercase "community" only for generic references ("the wider MCP
    community").
  - **initiative** = a *descriptor of the project*, used only in the predicate ("the
    `{mcpdesc}` project **is** an independent open source initiative"). Never use "the
    initiative" as a standalone actor.
  - **Do not** write: "the Community owns/maintains the format or assets", "the Community is
    an initiative", "the initiative maintains/promotes …", "a community around MCP
    Description", "mcpdesc.org is the initiative", or "Copyright … mcpdesc Community"
    (licensing is defined at the repository level — do not add nominative or centralized
    copyright lines to files; see `docs/licensing-policy.md`).
- The project is **led by maintainers**; contributors contribute. Editor names — two
  referents: hosted experience = **Live Editor** / **Live MCP Description Editor**;
  open-source component = **mcpdesc Editor** / **mcpeditor** (tool id).
- Cisco: the **format** "originated at Cisco DevNet"; **MCP Toolkit** was "initiated by
  Cisco DevNet and maintained at cisco-open". Avoid "contributed by / affiliated with /
  endorsed by Cisco". Logo/wordmark by **Jeanne and Stève Sfartz** (granted to the project);
  branding assets are not auto Apache-2.0.

Avoid unless explicitly approved:

- "Official Cisco product", "Cisco MCP platform", "Cisco-certified", "Cisco commercial
  service", "Cisco-backed product", "enterprise-supported by Cisco"
- Framing MCP Toolkit as the whole project or as *the* standard/official/universal MCP toolkit.
- Implying affiliation with or endorsement by Anthropic, or other MCP ecosystem vendors. "MCP" and "Model Context Protocol" refer to the open protocol ecosystem.
- Heavy Cisco logo / trademark usage. Prefer text references and links to `cisco-open`.

## Domains

- Canonical: `https://mcpdesc.org`.
- Docs are served at `mcpdesc.org/docs` (path) for v1.
- `spec.mcpdesc.org` (community-hosted specification) is **planned**; spec links currently
  point to the live `cisco-open/mcptoolkit-contract` (`mcpdesc` 0.7.0).
- `editor.mcpdesc.org` (hosted **Live Editor**) is **coming soon**. The `/live-editor` page is a
  **landing page**, and its "Open the Editor" CTA is intentionally **disabled** until the
  hosted editor is live — do not re-enable it before then.
- Legacy `mcptoolkit.org` → `mcpdesc.org/tools`; secondary domains
  (`.com/.io/.eu/.tech`) → `mcpdesc.org`. Do **not** redirect `.org` to `.com`.

## Tech and conventions

- Astro + Starlight (docs) + Tailwind CSS v4. Package manager: **npm**.
- Client env vars use the **`PUBLIC_`** prefix (Astro-native), e.g.
  `PUBLIC_ANALYTICS_ENABLED`. Analytics is **disabled by default**; only enabled in
  production via Cloudflare Pages env vars.
- Published docs live in `src/content/docs/docs/**` so routes resolve under `/docs/**`.
  Do not add `src/content/docs/index.*` (it would collide with the marketing homepage).
- Repository documentation lives in `docs/` — this is distinct from the site's `/docs`.
- Public contact addresses: `contact@mcpdesc.org` (general) and `security@mcpdesc.org`
  (vulnerability reports). Maintainers' personal emails belong on the Community page, not in
  shared aliases.

## Content strategy

- Use **site docs** for stable, reference-like truth: what exists today, maturity labels,
  getting started, supported vs experimental status, and clearly scoped forward-looking
  notes.
- Use the **blog** for narrative: introductions, ecosystem analysis, community updates,
  announcements, and calls for feedback. Announcements (new tool releases, spec milestones)
  belong here.
- There is **no site changelog page**. Product/tool release notes live in the `cisco-open`
  repositories (GitHub releases); link out to them instead of duplicating. Site build
  changes are tracked only in the repo-level `CHANGELOG.md`.
- Keep introductory blog posts focused. Do not overload them with roadmap material when a
  docs page can carry the nuance more clearly.
- If content mentions future work, label it explicitly as one of: **available today**,
  **early public**, **internal workflow/prototype**, or **not started**.
- Do not present internal Cisco workflows or prototypes as supported public tools unless
  explicitly approved. They may be described as inspiration, examples, or possible future
  demos.
- Prefer one canonical docs page for current tool status instead of repeating conflicting
  maturity claims across multiple blog posts.
- The primary site CTA is: try the tools that exist now, provide feedback, and help shape
  the community discussion.

## Tools catalog & badge

- The **tools catalog** is data-driven: one YAML file per tool under `tools/**`
  (schema in `src/content.config.ts`); `src/pages/tools.astro` renders from it. The catalog is
  **curated by the project maintainers**. A `draft: true` entry is shown only in dev (for
  review) and auto-publishes when set to `draft: false`.
- Display order is controlled by `tools/catalog.yaml` (the TOC). Add the tool ID there to include it.
- **Never display a tool's supported spec version on the site.** Each tool self-declares its
  supported MCP Description version via the **mcpdesc badge** in its own README. The version
  data kept in the YAML (`specVersions`) is a private record, not rendered.
- The **mcpdesc badge** is a hosted shields.io *endpoint* badge; definitions live at
  `public/badge/<version>.json` (brand color `#3c68d9` = the sRGB of `--color-brand`). Prefer
  the hosted endpoint over static badges so branding stays centrally maintainable. Strategy:
  `docs/tool-badge.md`; public how-to: `/docs/add-a-tool`.
- Tool submissions come through the GitHub issue form
  `.github/ISSUE_TEMPLATE/tool-submission.yml`. The **only hard requirement** is that the repo
  README shows the mcpdesc badge; maintainers verify it before adding a catalog entry.

## Before you commit

```bash
npm run build   # must succeed
npm run check   # type/diagnostics should pass
```

## Licensing

- Code contributions: Apache-2.0 (`LICENSE`).
- Documentation/content contributions: CC BY 4.0 (`LICENSE-docs`).
