# Changelog

All notable changes to the {mcpdesc} project website (`mcpdesc.org`) are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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