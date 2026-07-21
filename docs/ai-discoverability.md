# Making the site AI-friendly

Internal design notes for maintainers. This documents how `mcpdesc.org` is made discoverable
and consumable by search engines and AI agents, why each piece exists, and how to maintain it.
It is a companion to [`deployment.md`](./deployment.md) (Cloudflare specifics) and the
repository-level `CHANGELOG.md`.

## Goals

- Be reliably **discoverable** by search engines and AI crawlers.
- Explicitly **allow** search indexing, AI input (retrieval/grounding), and AI training.
- Serve **clean Markdown** to agents so they spend fewer tokens and parse content reliably.
- Stay **fully static** (Astro build → `dist/` on Cloudflare Pages Free). No server runtime,
  no backend, no API routes.
- **Never** publish draft content (`draft: true`) to any of the above surfaces.

## Components at a glance

| Surface | File / source | Generated | Purpose |
|---|---|---|---|
| Crawler policy | [`public/robots.txt`](../public/robots.txt) | static | Allow all crawlers + AI use; advertise sitemap |
| Sitemap | `@astrojs/sitemap` → `dist/sitemap-index.xml` | build time | List every public HTML page |
| AI entry point | [`public/llms.txt`](../public/llms.txt) | static | Curated map of the most important content |
| Markdown twins | [`src/integrations/markdown-twins.mjs`](../src/integrations/markdown-twins.mjs) | build time | A `.md` copy of every page for agents |
| Headers | [`public/_headers`](../public/_headers) | static | Correct `Content-Type` / CORS for the above |

Released in `0.4.0` (robots.txt, sitemap, llms.txt) and `0.5.0` (Markdown twins).

## 1. robots.txt

[`public/robots.txt`](../public/robots.txt) allows crawling for search and AI input, but
**disallows AI training**, and points crawlers at the sitemap:

```text
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

Sitemap: https://mcpdesc.org/sitemap-index.xml
```

- `Content-Signal` is the [Content Signals](https://contentsignals.org/) framework: we
  permit search indexing and AI input (retrieval/grounding), but **not AI training**. The
  specification is still a **Draft**, so the content should be used only as a reference, not
  as training data. Revisit `ai-train` when the spec stabilizes.
- **Cloudflare interaction (important):** Cloudflare's managed/default `robots.txt` was
  **disabled** in the dashboard. Its managed file did not merge cleanly with ours, so leaving
  it on risked serving a conflicting policy. With it off, our static `public/robots.txt` is
  the single authoritative file served at `/robots.txt`.
- Keep this file's `Content-Signal` in sync with any future policy change.

## 2. Sitemap

The [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
integration (wired in [`astro.config.mjs`](../astro.config.mjs)) emits
`dist/sitemap-index.xml` + `dist/sitemap-0.xml` at **build time**. It requires the `site`
option (`https://mcpdesc.org`) for absolute URLs.

- **Drafts are excluded automatically.** The sitemap only lists routes that were actually
  built, and drafts are never built in production (see [Draft handling](#draft-handling)).
- Redirect stubs (`/editor`, `/mcp-description`) are excluded by the integration.
- Markdown twins (`.md`) are **not** in the sitemap — they are created after the Astro build
  and are not Astro routes, so the sitemap stays HTML-only (which is what we want).
- New pages appear automatically on the next build; there is no manual list to maintain.

## 3. llms.txt

[`public/llms.txt`](../public/llms.txt) follows the [llms.txt](https://llmstxt.org/)
convention (H1 + blockquote summary + `##` sections of links). It is a **curated** entry
point that points agents at the highest-value content (format, docs, spec, tools, community,
the introductory blog post) plus a few grounding facts that enforce our branding rules.

- It intentionally lives at the **root** (`/llms.txt`), not under `.well-known`.
- It advertises the Markdown twins: agents can append `.md` to any path.
- Curate by hand. When adding a landmark page, add it here; keep terminology compliant with
  `AGENTS.md`.

## 4. Markdown twins (our Markdown-for-agents implementation)

**Decision:** we serve Markdown to agents using our **own build-time implementation**, not
Cloudflare's paid *Markdown for Agents* feature. The twins work on the Free plan, are fully
static, and are version-controlled/testable in this repo. Cloudflare's feature remains
documented in [`deployment.md`](./deployment.md) as a possible future addition if the zone
ever moves to Pro, but it is **not** what powers the site today.

### How it works

[`src/integrations/markdown-twins.mjs`](../src/integrations/markdown-twins.mjs) is an Astro
integration with an `astro:build:done` hook. After the static build it walks `dist/`, and for
every HTML page writes a Markdown counterpart:

- `dist/docs/getting-started/index.html` → `dist/docs/getting-started.md`
  (served at `/docs/getting-started.md`).
- Discovery: it injects `<link rel="alternate" type="text/markdown" href="…">` into each
  HTML page's `<head>`, and the twin path is simply the page path + `.md`.
- Content extraction selects, in order: `.sl-markdown-content` (Starlight docs) → `main`
  (marketing and blog pages). Note: `<main>` is used rather than a nested `article`, so pages
  with multiple `<article>` cards (e.g. the tools catalog) are captured in full.
- It strips non-content chrome (Starlight heading anchor links, Expressive Code copy buttons
  and captions), reconstructs code blocks with real newlines and language fences, and
  separates adjacent inline badges (e.g. category pills) so they don't run together.
- Redirect stubs (pages with a `<meta http-equiv="refresh">`) are skipped.
- Each twin gets YAML frontmatter (`title`, `description`, `source`) derived from the page's
  `<title>`, meta description, and canonical URL.

### Serving

[`public/_headers`](../public/_headers) serves `.md` files as Markdown with open CORS:

```text
/*.md
  Content-Type: text/markdown; charset=utf-8
  Access-Control-Allow-Origin: *
```

### Maintenance gotcha

`node-html-parser` keeps `<pre>` content as **raw text**, so the integration re-parses each
code block's `innerHTML` as a standalone fragment to read Expressive Code's per-line
`.ec-line` elements. If Starlight/Expressive Code changes its DOM (class names or line
structure), revisit `normalizeExpressiveCode()`. The two build-time dependencies
(`node-html-parser`, `node-html-markdown`) are **devDependencies** — they never ship to the
client.

### Twins vs. Cloudflare Markdown for Agents

| | Markdown twins (in use) | Cloudflare Markdown for Agents |
|---|---|---|
| Cost | Free (Pages Free) | Requires Pro/Business zone |
| Runtime | None (build step) | Edge conversion |
| Discovery | URL `.md` suffix + `rel="alternate"` | `Accept: text/markdown` on same URL |
| Where defined | This repo | Cloudflare dashboard |
| Drafts | Excluded (not in `dist/`) | Excluded (not served) |

The two could coexist later, but today the twins are authoritative.

## Draft handling

Draft content must never reach search engines, agents, the sitemap, or the twins. This holds
because **drafts are never built into `dist/` in production**:

- Blog routes filter on `import.meta.env.DEV` (see
  [`src/pages/blog/[slug].astro`](../src/pages/blog/%5Bslug%5D.astro) and
  [`src/pages/blog/index.astro`](../src/pages/blog/index.astro)).
- Starlight excludes `draft: true` docs from production builds.
- Tools use `visibility: draft` (dev-only) in [`src/content.config.ts`](../src/content.config.ts).

Because the sitemap and the Markdown twins both derive strictly from the built `dist/` output,
a draft page produces no HTML, therefore no sitemap entry and no `.md` twin. Verified by
temporarily adding a `draft: true` post and confirming absence across all three surfaces.

## Verify after deploy

```bash
# Our robots.txt is served (not a Cloudflare-managed one)
curl -s https://mcpdesc.org/robots.txt

# Sitemap is reachable
curl -s https://mcpdesc.org/sitemap-index.xml | head

# A Markdown twin exists and is typed correctly
curl -sI https://mcpdesc.org/docs/getting-started.md | grep -i content-type
# expect: content-type: text/markdown; charset=utf-8
```

## Related docs

- [`deployment.md`](./deployment.md) — Cloudflare Pages, headers, and the (unused) Markdown
  for Agents option.
- [`analytics.md`](./analytics.md) — privacy-first analytics policy.
- `AGENTS.md` — branding/terminology rules that all of the above content must follow.
