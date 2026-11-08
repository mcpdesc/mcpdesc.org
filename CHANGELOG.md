# Changelog

All notable changes to the {mcpdesc} project website (`mcpdesc.org`) are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **RC.3 schema publication gate.** Published the MCP Description
  [`0.9.0-rc.3` schema](https://mcpdesc.org/schema/mcp-description/0.9.0-rc.3.json) and
  [validation result schema 1.4.0](https://mcpdesc.org/schema/validation-result/1.4.0.json)
  byte-for-byte from approved preparation commit
  [`106387d882030f2c5407291cb14e7cee2d6d6a31`](https://github.com/mcpdesc/mcpdesc-specification/commit/106387d882030f2c5407291cb14e7cee2d6d6a31),
  before upstream tagging. Result format 1.4.0 adds factual diagnostic details and related
  component-definition locations. The existing rule schema 1.3.0 is unchanged; documentation,
  bundles, and catalog discovery remain on RC.2 pending the separate tagged import.
- **Reusable schema publication skill.** Added the workspace
  [`publish-mcpdesc-schema` skill](.github/skills/publish-mcpdesc-schema/SKILL.md) for approved
  release, draft, and RC schema hosting, companion schemas, and live publication checks.
  The schema publisher now supports independently versioned validation rule/result schemas
  and preserves exact source bytes, including files without a trailing newline; focused
  publisher tests run in CI.
- **MCP Description v0.9.0 RC.2 schema and documentation.** Published the schema from
  `v0.9.0-rc.2` and mirrored its specification, examples, companion guides, and 85 validation
  rules, including the immutable machine-readable rule catalog. RC.2 adds
  document-oriented serialization ordering and discriminator-driven schema
  validation; validation rule and result formats remain 1.3.0.

### Changed

- **Active release candidate.** Advanced candidate discovery, docs navigation, and the rules
  alias to RC.2. Retired RC.1 docs and bundle URLs redirect to their immutable upstream tag;
  previously published schema and catalog artifacts remain available. MCP Description 0.8.0
  remains the latest stable release.
- **Validation catalog discovery.** Advanced the discovery index to rule format 1.3.0 and
  RC.2 only after verifying the immutable schemas and catalog on the live site.

### Fixed

- **Single-file specification headings.** Restore numbered section headings from page
  titles when bundling pages whose duplicate body headings were removed.

## [1.3.1] - 2026-11-03

### Added

- **Validation rule visibility control.** Specification pages with validation-rule references now let readers show or hide those inline links.

### Changed

- **Validation rule cross-links.** Rule pages identify each referenced requirement by its specification section and link directly to it; specification requirement links now lead to the corresponding rule's "Required by" section.
- **Specification section headings.** Removed the duplicate body heading from mirrored section pages; the page title remains the single section heading.
- **Validation Rules navigation.** Moved "How validation works" from Guides to follow the Validation Rules overview, and hid the Unchecked Requirements link from the sidebar and overview while retaining its direct page.
- **Requirement-reference layout.** Inline validation-rule references now appear on a separate line; hiding them restores the surrounding text flow.

## [1.3.0] - 2026-11-02

### Added

- **MCP Description v0.9.0 RC.1 mirror and validation artifacts.** Imported the immutable
  `v0.9.0-rc.1` specification, examples, and all companion guides using MCP protocol-version
  terminology. Published the RC1 MCP Description schema, validation rule/result schemas
  1.3.0, and the complete 85-rule catalog; RC1 is now the active candidate. Earlier draft
  snapshots remain available from the canonical repository, while the site mirrors only the
  active prerelease and redirects retired draft URLs upstream. Published schema and catalog
  artifact URLs remain available; the discovery index advances after live verification.
  Validator and projection defaults for `0.9.0` advance with each RC until final `0.9.0` is
  released.

## [1.2.0] - 2026-11-02

### Added

- **MCP Description v0.9.0 draft series.** Mirrored immutable drafts 1 through 4, with
  draft.4 now active and drafts 1 to 3 retained as archived snapshots. Draft.1 established
  the specification, examples, migration guide, schema, and initial rule registry, with
  requirement cross-links and prerelease support documented for `@mcpdesc/validator` and
  `@mcpdesc/core`. Draft.2 added companion guides and aligned the rules overview with its
  canonical reader-focused text; draft.3 added protocol-version guidance and adopted rule
  format 1.1.0. Draft.4 builds on that foundation, advancing to format 1.2.0 and growing the
  catalog from 63 to 85 rules. It adds view, merge, serialization, and `not-applicable`
  examples plus an Unchecked Requirements page. `/docs/rules` now resolves to draft.4.
- **Versioned MCP Description schemas.** Published immutable schemas for
  [draft.1](https://mcpdesc.org/schema/mcp-description/0.9.0-draft.1.json),
  [draft.2](https://mcpdesc.org/schema/mcp-description/0.9.0-draft.2.json),
  [draft.3](https://mcpdesc.org/schema/mcp-description/0.9.0-draft.3.json), and
  [draft.4](https://mcpdesc.org/schema/mcp-description/0.9.0-draft.4.json).
- **Validation rule catalogs.** Published immutable catalogs for drafts 3 and 4 under
  `/validation/catalogs/`; draft.4 contains 85 rules in format 1.2.0, exported from its
  annotated source tag. After live verification, the discovery index was updated to format
  1.2.0 and draft.4 as the current draft. Catalog files are served with `no-transform` and a
  five-minute cache.
- **Validation rule schemas.** Published rule-format schemas [1.0.0](https://mcpdesc.org/schema/validation-rule/1.0.0.json),
  [1.1.0](https://mcpdesc.org/schema/validation-rule/1.1.0.json), and
  [1.2.0](https://mcpdesc.org/schema/validation-rule/1.2.0.json). Version 1.0.0 defines
  catalog and discovery envelopes; 1.1.0 requires fixture outcomes and removes `diagnostics`;
  1.2.0 adds document-schema locations, unchecked requirements, and a result-schema reference.
  All versions have cross-origin access and immutable caching and remain available unchanged.
- **Validation result schema 1.0.0.** Added
  [`mcpdesc.org/schema/validation-result/1.0.0.json`](https://mcpdesc.org/schema/validation-result/1.0.0.json),
  the validation result format (Proposal 0031). All three schemas have cross-origin access
  and immutable caching; earlier versions remain published unchanged.
- **Documentation version selector.** Added a docs-only selector for Latest, Previous,
  and Draft, with version-specific navigation for MCP Description, Guides, Specifications,
  and Validation Rules. The selector sits beside the header logo and lists released versions
  newest-first, followed by Draft only when a candidate exists. Unavailable sections are
  omitted; historical URLs remain unchanged. Restored native sidebar collapse controls;
  Guides and Validation Rules default to collapsed outside their active pages.

### Fixed

- Added a site 404 page. Without one, Cloudflare Pages served the homepage with status 200
  for every missing URL, hiding broken links and missing JSON artifacts. The page is
  `noindex` and has no Markdown twin.
- Served the immutable rule catalog files with `Cache-Control: no-transform`, so Cloudflare
  no longer compresses them and weakens their ETag, which catalog publication checks reject.
- Preserved imported section content when it begins with a Markdown horizontal rule,
  preventing the renderer from mistaking the opening appendix content for frontmatter.
- Kept archived bundle bytes unchanged during regeneration and made requirement-marker
  insertion deterministic from the first import onward.

### Security

- Updated Astro and semver-compatible npm dependencies to resolve all critical and high
  audit findings. Overrode the vulnerable `postcss-selector-parser` transitive dependency
  to patched version `6.1.5`, clearing the remaining moderate findings without downgrading
  `@tailwindcss/typography`.

## [1.1.0] - 2026-10-19

### Added

- **Latest MCP Description guides.** Mirrored the companion guides from the immutable
  `mcpdesc/mcpdesc-specification` tag `v0.8.0+editorial.1`, including the new comparison
  with MCP primitive schemas and the updated FAQ. Added a top-level **Guides** documentation
  section with reader-focused navigation, kept the guide documents pinned to the stable
  v0.8.0 edition, and removed duplicated page-title headings from the imported content.

## [1.0.0] - 2026-09-09

### Changed

- **MCP Description v0.8.0 stable release.** Promoted v0.8.0 to the latest stable
  specification and refreshed the complete mirror and schema from the immutable `v0.8.0`
  release tag. Published the final schema and documentation URLs, moved 0.7.0 to the
  previous channel, removed the active candidate, and redirected the former RC.4
  documentation URLs to v0.8.0.
- **Release announcement.** Published the v0.8 article and updated the homepage banner to
  link to it as the latest stable release.

## [1.0.0-rc.1] - 2026-09-08

### Added

- **MCP Description v0.8.0 RC.4 documentation.** Published the immutable RC.4 snapshot
  from `mcpdesc/mcpdesc-specification`, including all 17
  normative sections, Appendix A, examples, migration guide, condensed changelog, and a
  first-party single-file bundle. The version index now exposes explicit `stable` and
  `candidate` channels while retaining `latest` and `next` compatibility aliases. The
  Format page and Live Editor page now advertise the active candidate.
- **Mutable schema aliases.** Added temporary redirects from `latest.json` to stable 0.7.0
  and from `draft.json` to 0.8.0-rc.4, with short-lived caching separate from immutable
  versioned schema resources.
- **0.8 compatibility-series badge.** Tools can declare 0.8-series support with
  `/badge/0.8.json` and record the exact tested release or candidate in their own README.
- **First-party MCP Description JSON Schemas.** Versioned schemas are available at
  `/schema/mcp-description/<version>.json`, including `0.7.0` and `0.8.0-rc.4`. The
  immutable static resources support cross-origin
  loading by IDEs and validation tools.
- **MCP Description v0.8 article.** Added a focused overview of MCP `2026-07-28` support,
  multi-protocol descriptions, conformance tooling, and the path toward v1.0.
- **Updated Live Editor preview.** Added a current editor screenshot and candidate-support
  guidance.

### Changed

- **Specification provenance.** Each mirrored version now carries one provenance notice on
  its overview after the source and schema links, instead of repeating the notice on every
  section, example, and migration page. The importer enforces this layout for future mirrors.
- **Candidate cleanup.** Removed the superseded RC.3 documentation, schema, bundle, and
  discovery entries so RC.4 is the only published v0.8 candidate on the site.

## [0.9.2] - 2026-07-27

### Added

- **Cache and discovery headers for the specification bundles.** `public/_headers` now
  gives each first-party specification resource a self-contained, explicit caching contract
  instead of relying on Cloudflare's default heuristics: `/specification/index.json` and the
  mutable `/specification/latest/*` alias are cached briefly (`max-age=300`, with
  `stale-while-revalidate` for `latest`), while versioned bundles under
  `/specification/0.7.0/*` are cached for a week (`max-age=604800`,
  `stale-while-revalidate=86400`) — stable but not marked `immutable`, so a regenerated
  bundle still propagates within a bounded window. Each rule restates its content type and
  CORS so behaviour does not depend on how overlapping `_headers` rules are merged.
- **`rel="alternate"` link to the single-file specification.** The 0.7.0 specification
  overview page now advertises its complete Markdown bundle
  (`/specification/0.7.0/mcpdesc.md`) via a `<link rel="alternate" type="text/markdown">`
  in the page head, so crawlers and agents starting from the HTML page can discover the
  one-request source.
- **Homepage search-engine optimization.** The homepage now has a descriptive, keyword-rich
  `<title>` ("MCP Description: a portable format for MCP servers · mcpdesc") instead of the
  bare word "mcpdesc", an H1 and opening paragraph that name both **MCP Description** and
  `mcpdesc` and enumerate what the format declares, a focused meta description, a `WebSite`
  JSON-LD block (via a new named `head` slot in `BaseLayout`), and a prominent descriptive
  link to the 0.7.0 specification. This helps search engines index the site under its real
  identity rather than a parked-domain heuristic.

### Changed

- **"Using the site with AI" documents one-request spec retrieval.** The
  `/docs/using-with-ai` page now explains that the complete specification can be fetched in
  a single request from `/specification/latest/mcpdesc.md` (or a pinned
  `/specification/<version>/mcpdesc.md`) and discovered via `/specification/index.json`.

## [0.9.1] - 2026-07-27

### Added

- **First-party specification bundles for AI retrieval.** The whole MCP Description
  specification is now available as a single Markdown file per version at
  `/specification/<version>/mcpdesc.md` (latest alias: `/specification/latest/mcpdesc.md`),
  alongside a machine-readable version index at `/specification/index.json` that lists the
  current latest and any work-in-progress draft plus each version's full-file, canonical
  (view + raw), and schema URLs. This lets AI assistants and build tools retrieve the
  complete spec in one request and discover which versions exist. Generated by
  `scripts/build-spec-bundle.mjs` from the committed section pages and advertised via
  `public/llms.txt`, the spec landing pages, and `public/_headers`. See
  `docs/specification-mirror-strategy.md` §6.

### Changed

- **Specification references pinned to an immutable upstream tag.** The 0.7.0 section
  pages, single-file bundle, and `index.json` now link the canonical source and JSON Schema
  at `cisco-open/mcptoolkit-contract` tag `mcpdesc-v0.7.0` instead of the moving `main`
  branch. `scripts/import-spec.mjs` is now tag-aware (`--repo`/`--path`/`--tag`, defaulting
  to `mcpdesc-v<version>`) so future imports reference an exact release.

## [0.9.0] - 2026-07-21

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