# Changelog

All notable changes to the {mcpdesc} project website (`mcpdesc.org`) are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Mobile horizontal overflow caused by missing base reset styles: added Tailwind preflight import so global `box-sizing: border-box` and zero `body` margin are applied, preventing full-width containers with horizontal padding from exceeding the viewport (`src/styles/global.css`).

## [0.8.0] - 2026-07-21

### Changed

- **Footer version label** now reads **"mcpdesc.org site v{version}"** (was just
  "v{version}") to make clear it is the *website* version and avoid confusion with the
  `mcpdesc` / MCP Description format version (currently 0.7.0). Rendered by
  `src/components/SiteFooter.astro`.
- **Community page licensing wording** now reflects the project's two-license model —
  code under Apache-2.0, documentation and editorial content under CC BY 4.0 — instead of
  attributing all contributions to Apache-2.0 (`src/pages/community.astro`).

### Fixed

- Copy typos: "something that support" → "supports" (`src/pages/tools.astro`),
  "Embedabble" → "Embeddable" (`tools/cisco-open-mcptoolkit-editor.yaml`),
  "MCP Descriotion" → "MCP Description" (`tools/cisco-open-mcptoolkit-editor-viewer.yaml`),
  "ensuring descriptions accuracy" → "ensuring description accuracy"
  (`tools/categories.yaml`), and "avocate" → "advocate" (`src/pages/community.astro`).

## [0.6.0] - 2026-07-21

### Added

- **"Copy as Markdown" control** in the site header (next to the GitHub icon): copies the
  current page's Markdown twin to the clipboard and offers a compact **`.md`** link (which
  also works without JavaScript). Rendered by `src/components/MarkdownActions.astro`, shown on
  marketing/blog pages via `SiteHeader` and on docs pages via a Starlight `SocialIcons`
  override. The copy click is tracked via the existing privacy-safe `data-analytics-cta`
  wiring where analytics is active.
- New docs page **"Using the site with AI"** (`/docs/using-with-ai`, in the Project sidebar
  group) explaining, from a user's perspective, how the site is accessible to AI and how to
  use the Markdown twins, `.md` URLs, and `llms.txt` with an assistant.

### Changed

- **`robots.txt` now sets `ai-train=no`** (was `ai-train=yes`): while the specification is a
  Draft, the content may be used for search and AI input (retrieval/grounding) but not for
  model training. Documented in `docs/ai-discoverability.md`.

### Fixed

- Markdown twins now capture the **full** page content on pages with multiple `<article>`
  cards (e.g. the tools catalog) — previously only the first card was included — and separate
  adjacent inline items (category pills, social/CTA link rows) so they don't run together.
- Markdown twins are written with a UTF-8 BOM so accented characters (e.g. "Stève") display
  correctly even in viewers that ignore the HTTP `charset=utf-8` (the files were already
  valid UTF-8; production also serves them with the correct charset).

## [0.5.0] - 2026-07-21

### Added

- **Markdown twins** for every page ("Option A"): a build-time `astro:build:done`
  integration ([`src/integrations/markdown-twins.mjs`](src/integrations/markdown-twins.mjs))
  emits a `.md` counterpart next to each built HTML page (append `.md` to any path, e.g.
  `/docs/getting-started.md`). Each HTML page links its twin via
  `<link rel="alternate" type="text/markdown">`, and `.md` files are served as
  `text/markdown` via `public/_headers`. Fully static — no server runtime — and drafts are
  excluded automatically (they are never built into `dist/`, so they get no twin and never
  appear in the sitemap). This is a free alternative to Cloudflare's paid Markdown for
  Agents feature.

### Documentation

- Documented how to enable Cloudflare **Markdown for Agents** (edge HTML→Markdown content
  negotiation via `Accept: text/markdown`) in `docs/deployment.md`, including the Pro-plan
  requirement and its alignment with the site's Content-Signal policy.

## [0.4.0] - 2026-07-21

### Added

- `robots.txt` explicitly allowing search and AI crawling (including `Content-Signal:
  search=yes, ai-input=yes, ai-train=yes`) and advertising the sitemap.
- XML sitemap generation via the `@astrojs/sitemap` integration; `sitemap-index.xml`
  (and `sitemap-0.xml`) are emitted at build time and referenced from `robots.txt`.
- `llms.txt` pointing AI crawlers to the site's most important pages (introductory blog
  post, format, docs, specification, tools, community).

## [0.3.1] - 2026-07-20

### Changed

- Plausible configuration patch

## [0.3.0] - 2026-07-20

### Changed

- Activated Plausible analytics using its latest script format (async site-specific
  bundle plus `window.plausible` init stub); the legacy `data-domain` script was removed.
- Optimized the introductory blog post's title and meta description for SEO and rendering.
- Copy-edited the governance, attribution, FAQ, and blog content (spelling, grammar, Oxford commas, trailing whitespace).


## [0.2.1] - 2026-07-20

- Clarifications per sanity check of the governance, attribution and FAQ documentations


## [0.2.0] - 2026-07-20

### Changed

- The 'quality' category was too vague, it is now renamed 'testing'. Tools cards and documentation reflect the updated name.
- The documentation to add a tool has been updated


## [0.1.1] - 2026-07-20

### Changed

- The hosted **Live Editor** (`editor.mcpdesc.org`) is now live. The "Open the Editor"
  CTA on the `/live-editor` page is enabled and links out to the hosted editor.

## [0.1.0] - 2026-07-19

Initial release of the **{mcpdesc}** project website (`mcpdesc.org`) 