# Contributing to mcpdesc.org

Thanks for helping improve the **{mcpdesc} Project ** website at
[mcpdesc.org](https://mcpdesc.org)! This repository is the community-first website of the
`{mcpdesc}` project.

For project-wide governance (roles, decision-making, specification changes), see
[GOVERNANCE.md](https://github.com/mcpdesc/.github/blob/main/GOVERNANCE.md) (in the `mcpdesc`
`.github` repository). 

For terminology and positioning, see `docs/terminology-and-positioning.md`.

## What lives here

- Marketing pages (home, format, tools, editor, community) — `src/pages/`
- Documentation (`/docs`) — `src/content/docs/docs/` (Starlight)
- Blog — `src/content/blog/`
- Privacy-preserving analytics plugin — `src/analytics/`
- Repo docs (deployment, analytics, terminology) — `docs/`

## Local development

```bash
npm ci
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run check    # type + diagnostics check
```

Analytics is **disabled by default** in development. See `.env.example`.

## License of contributions

By submitting a contribution to the {mcpdesc} project, you agree that it will be licensed under the
license applicable to the part of the repository being modified, determined at the
repository level (see [GOVERNANCE.md](./GOVERNANCE.md) and
[docs/licensing-policy.md](./docs/licensing-policy.md)):

- **`Apache-2.0`** — code, scripts, schemas, tests, technical examples, and normative
  specification content ([LICENSE](./LICENSE)).
- **`CC-BY-4.0`** — editorial documentation, guides, tutorials, and non-normative site
  content ([LICENSE-docs](./LICENSE-docs)).

Copyright in your contribution remains with you or with the organization that legally owns
it. **No CLA** and **no copyright assignment** to the mcpdesc project are required. The
project does not centralize copyright; Git preserves the authorship history.

Please **do not** submit content you are not authorized to publish, and **do not** remove or
alter third-party copyright or license notices. Files do **not** need a per-file copyright
header or SPDX identifier; add an SPDX line only when a specific file needs it (see the
licensing policy). Branding assets (logo, wordmark, favicon, social images) are **not**
automatically covered by these licenses.

You represent that you have the right to submit your contribution under the applicable
license. mcpdesc does **not** require a Contributor License Agreement (CLA), a copyright
assignment, or a Developer Certificate of Origin (DCO) sign-off; a `Signed-off-by` line is
**not** required.

## Ground rules

1. **Never add tracking of user content.** The analytics layer only forwards an
   allow-listed set of safe, scalar metadata (see `src/analytics/events.ts`). Never
   send document content, URLs, tool/resource/prompt names, filenames, or error text.
   Call `analytics.track(...)` — never `window.plausible` directly.
2. **Follow the branding and terminology guidance.** See
   `docs/terminology-and-positioning.md` and [AGENTS.md](./AGENTS.md). Describe
3. **Keep it static.** The site is a static Astro build deployed to Cloudflare Pages.
   Avoid adding server-side runtime dependencies.

## Pull requests

- Keep changes focused; run `npm run build` and `npm run check` before opening a PR.
- Ensure you have the right to submit your changes under the applicable license.
- By contributing, you agree that your code contributions are licensed under Apache-2.0
  and your content contributions under CC BY 4.0 (see [LICENSE](./LICENSE) and
  [LICENSE-docs](./LICENSE-docs)).

## Publishing workflow

Use frontmatter `draft: true` for any content not ready for public release.

- Docs pages (`src/content/docs/docs/**`): draft pages are visible in `npm run dev` and excluded from production build output and docs navigation.
- Blog (`src/content/blog/**`):
   - dev mode: drafts are visible and labeled `Draft (visible only in dev env)`
   - production build: drafts are excluded from routes and public listings

Template:

```md
---
title: Upcoming update
description: Internal draft
date: 2026-07-10
draft: true
---
```

For true confidentiality before publication, do not rely on `draft: true` alone in a public repository. Keep sensitive drafts on a private branch/fork or outside this repo until publication.

### Versioning and updates

- This site does not currently implement multi-version docs navigation.
- Updating a page edits the current version that will publish on next deploy.
- Prior states are retained via Git history and release tags.
