# Licensing policy

Audience: maintainers and contributors of the mcpdesc.org repository.

This document explains how licensing works in this repository, how to decide which license
applies to a given file, and how to review a pull request for licensing. It is editorial
documentation and is itself licensed under **CC BY 4.0** (see [`LICENSE-docs`](../LICENSE-docs)).

## Philosophy

- **Licensing is defined at the repository level, not per file.** We do **not** annotate
  every file with a copyright header or SPDX identifier, and we do not run mass annotation of
  the tree.
- **Copyright stays with contributors.** Each contribution remains the copyright of its
  author or the organization that legally owns it. There is **no CLA**, **no copyright
  assignment**, and **no DCO sign-off** required by the mcpdesc project. Git preserves the
  authorship history; the project does
  not centralize copyright.
- **No misleading centralized notice.** We do not add `Copyright <year> mcpdesc` or a
  nominative `Copyright <year> <person>` to source files.
- **Two licenses, by the nature of the content.** Technical/normative material is
  Apache-2.0; editorial/pedagogical material is CC-BY-4.0.
- **Third-party material keeps its own license and notices.**

The full terms live in [`LICENSE`](../LICENSE) (Apache-2.0) and
[`LICENSE-docs`](../LICENSE-docs) (CC BY 4.0). This repository keeps the two-file model and
does not use a `LICENSES/` directory.

## License mapping

| Content category | License |
|---|---|
| Source code (`src/**` components, layouts, pages, analytics, `src/env.d.ts`, `src/content.config.ts`) | Apache-2.0 |
| Tools & scripts (`scripts/**`, `astro.config.mjs`, `tsconfig.json`) | Apache-2.0 |
| Styles (`src/styles/**`) | Apache-2.0 |
| Tools catalog data & rulesets (`tools/*.yaml`, `mcpdesc-spectral-ruleset.yaml`) | Apache-2.0 |
| Site config/data (`public/_headers`, `public/manifest.webmanifest`, `public/badge/*.json`) | Apache-2.0 |
| Normative specification mirror (`src/content/docs/docs/specification/**`) | Apache-2.0 (third-party origin — see exceptions) |
| Editorial docs pages (`src/content/docs/docs/**`, except `specification/**`) | CC-BY-4.0 |
| Blog (`src/content/blog/**`) | CC-BY-4.0 |
| Repository documentation (`docs/**`, including this file) | CC-BY-4.0 |
| Governance/community docs (`README.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `MAINTAINERS.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`) | CC-BY-4.0 |
| Branding assets (logo, wordmark, favicon, social images) | Not covered — project branding (see exceptions) |

Directory-level summary:

```text
src/                                  Apache-2.0
src/styles/                           Apache-2.0
scripts/                              Apache-2.0
tools/                                Apache-2.0
public/ (config & data)               Apache-2.0
src/content/docs/docs/specification/  Apache-2.0  (normative; Cisco-originated)
src/content/docs/                     CC-BY-4.0   (editorial; except specification/)
src/content/blog/                     CC-BY-4.0
docs/                                 CC-BY-4.0
```

## Normative vs editorial

The license is determined by the **nature** of the content, not by the file extension. A
Markdown file can be Apache-2.0.

**Apache-2.0** — content required for implementation or interoperability:

- normative specification;
- field definitions;
- `MUST` / `SHOULD` / `MAY` requirements;
- schemas;
- normative examples;
- API descriptions;
- algorithms and data formats;
- conformance tests;
- documentation generated directly from interfaces or code.

**CC-BY-4.0** — primarily editorial or pedagogical content:

- tutorials and getting-started guides;
- articles and blog posts;
- marketing pages;
- conceptual, non-normative explanations;
- community content and editorial website content.

When a single file mixes normative and editorial content, prefer to (1) split it into
separate files, (2) place the normative part under Apache-2.0, and (3) place the editorial
part under CC-BY-4.0. Avoid dual-licensing an individual file unless there is a demonstrated
need.

## SPDX identifiers (optional)

SPDX identifiers are **not** added systematically. Add one to an individual file only when it
provides real value, for example:

- a file meant to be copied independently of the repository;
- a file distributed as a standalone artifact;
- a schema published separately;
- an example frequently copied into other projects;
- a file whose applicable license would otherwise be ambiguous;
- a third-party or generated file that needs a specific declaration.

When used, the identifier matches the file's comment style, e.g.:

```text
// SPDX-License-Identifier: Apache-2.0
```

```html
<!-- SPDX-License-Identifier: CC-BY-4.0 -->
```

Allowed identifiers in this repository are `Apache-2.0` and `CC-BY-4.0`. Do **not** declare a
whole-repository `Apache-2.0 OR CC-BY-4.0`: the two licenses apply to different content
categories, not to the same files at the reader's choice.

## JSON and comment-less formats

Files that cannot carry comments (JSON such as `public/badge/*.json`, data files) are covered
by their **location** in the mapping above and by the repository-level declarations. Do not
add an artificial license field to JSON or alter a data/schema file only to insert license
information.

## Package metadata

Distributable software packages declare **`Apache-2.0`**. In this repository,
[`package.json`](../package.json) declares `"license": "Apache-2.0"`. Do not set the package
license to `CC-BY-4.0` merely because the repository also contains CC-BY-4.0 documentation.

## Exceptions

- **Mirrored specification** — `src/content/docs/docs/specification/**` is normative content
  that originated at Cisco DevNet and was released under Apache-2.0. It stays **Apache-2.0**
  even though it lives inside the otherwise-editorial `src/content/` tree, and its original
  Cisco copyright notices are preserved.
- **Branding assets** — the `{mcpdesc}` logo, wordmark, favicon, and social images were
  created by Jeanne and Stève Sfartz, who grant them to the project for use as project
  branding. They are **not** automatically covered by Apache-2.0 or CC-BY-4.0.
- **Generated and vendored trees** — `dist/`, `.astro/`, `node_modules/`, and the local
  reference clones under `ref/` are generated or third-party and are excluded from version
  control via `.gitignore`. Generated files, if ever committed, inherit the license of their
  source.

## Contribution model (no sign-off required)

Copyright in each contribution stays with its author or the organization that legally owns it.
By intentionally submitting a contribution, a contributor accepts that it is distributed under
the license applicable to the part of the repository being modified, and represents that they
have the right to submit it. The project does **not** require a Contributor License Agreement,
a copyright assignment, or a Developer Certificate of Origin sign-off; a `Signed-off-by` line
is **not** required.

## Adding a new content type

When a new kind of content is introduced:

1. Decide whether it is **normative/technical** (Apache-2.0) or **editorial/pedagogical**
   (CC-BY-4.0), using the criteria above.
2. Add it to the mapping table in this document.
3. If a directory mixes categories, document the exception here or in a local `README.md`.
4. Add an SPDX identifier only if the file meets one of the specific criteria above.

## Reviewing a pull request

Maintainers should check that a PR:

- does not add a nominative or centralized copyright line to source files;
- does not add per-file SPDX headers en masse (only justified, documented cases);
- does not remove or alter third-party copyright or license notices;
- keeps normative specification content under Apache-2.0 (not CC-BY-4.0);
- keeps general editorial content under CC-BY-4.0 where the mapping calls for it;
- keeps `package.json` `license` set to `Apache-2.0`;
- comes from a contributor who has the right to submit it under the applicable license.
