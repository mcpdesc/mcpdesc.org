# Terminology & Positioning (source of truth)

Status: **Canonical reference** 

This is the **single source of truth** for how we name and position everything in the
`{mcpdesc}` project: website copy, README files, specifications, governance docs, GitHub repositories, bios, and public communications. The public reader-facing glossary at [`/docs/terminology`](../src/content/docs/docs/terminology.mdx) is a slim summary that points here.

---

## 1. Core positioning

**Canonical short description (default):**

> **The `{mcpdesc}` project is an independent initiative promoting an open,
> portable, machine-readable description format for MCP servers. The goal is to help the MCP ecosystem converge on interoperable server descriptions.**

**Shorter version:**

> `{mcpdesc}` promotes open, portable, machine-readable descriptions for MCP servers.

**One-line technical description:**

> MCP Description is a portable, machine-readable format for describing MCP server
> capabilities, tools, transports, versions, and metadata — like OpenAPI, but for MCP
> servers.

**Supporting / candidate-status language** (use when discussing future direction): *open proposal*, *community proposal*, *candidate description format*, *path toward
interoperability*, *contribution to the MCP ecosystem*.

**Emphasize:** interoperability · portability · machine-readable descriptions · MCP server capabilities · ecosystem tooling · governance & discoverability · convergence toward a shared description format.

**Do not** present `{mcpdesc}` as an official standard unless/until it becomes one. **Do not** use the word **"contract"** for the format (use "format"; the OpenAPI *analogy* is fine).

---

## 2. Canonical terms

| Term | Meaning / use |
|---|---|
| **MCP** | Model Context Protocol — the protocol ecosystem. Say "MCP servers/clients/tools/ecosystem". Avoid "MCPs". |
| **MCP server** | A server implementing MCP and exposing tools, resources, prompts, etc. — the thing an MCP Description describes. |
| **MCP Description** | The **formal name** of the format/specification. Use: "MCP Description format / specification / document / schema". Avoid "the MCP Description standard" (not standardized) and "Cisco MCP Description". |
| **`mcpdesc`** | Short **technical** name — filenames, schemas, packages, tools, commands, domains, repos. Lowercase, backticked in prose. |
| **`{mcpdesc}`** | The **brand / wordmark**. Use for the project, community, website, or visual identity. **Not** in filenames, package names, or commands. |

**Style split (mental model):**

```text
MCP Description  = the format / specification (formal name)
mcpdesc          = the technical shorthand (files, packages, code)
{mcpdesc}        = the project brand / wordmark
```

**Two rules (still in force):**

- **Do not pluralize** the format name as "MCP Descriptions". The plural artifact is
  **MCP Description documents** / **`mcpdesc` documents**.
- The format is for **describing** servers. Validate / document / mock / test / compare are **tool** capabilities — never attribute them to the format itself.

---

## 3. Project, community, website, organization

- **The `{mcpdesc}` project** — the initiative as a whole (format, schemas, examples, docs,   tools, editor, website, roadmap, governance, branding, community processes). "The   `{mcpdesc}` project is an independent open source initiative." Avoid "mcpdesc.org is the initiative", "the community owns the format", "Cisco owns the project".
- **The `{mcpdesc}` Community** — the people around the project (maintainers, contributors, users, adopters, tool builders, reviewers). "Open to contributors, users, and tool builders." The project is **led by maintainers** and open to contributions from the community — avoid "the community leads the project".
- **`mcpdesc.org`** — the public website and documentation home ("a home, not a legal entity or governance structure").
- **`github.com/mcpdesc`** — the GitHub organization hosting the project's repositories.
- **`editor.mcpdesc.org`** — the hosted **Live Editor** / playground for trying the `mcpdesc` format.

---

## 4. Maintainers, contributors, users, adopters

- **Maintainers** operate and **lead** the project (review/merge, roadmap, releases,
  spec/schemas/docs/tools/site, moderation, decisions, public representation). "The
  `{mcpdesc}` project is led by its maintainers and open to contributions from the broader community." Avoid "led by maintainers and contributors".
- **Contributors** contribute code, docs, spec feedback, examples, issues, PRs,
  discussions, design, or tooling. They **retain copyright** and license under Apache-2.0. Contributing does not confer maintainer status or decision authority unless governance grants it.
- **Users** adopt `mcpdesc` documents to describe and govern MCP servers they build or consume.
- **Adopters** are teams/vendors/orgs using the format or compatible tools. Do not imply endorsement unless they have agreed to be listed.

---

## 5. Licensing & contribution model

> We welcome contributions. Unless a repository states otherwise, code and specification
> contributions are licensed under **Apache-2.0**. Contributors retain copyright to their
> contributions; **no CLA**, **copyright assignment**, or **DCO sign-off** is required. See
> each repo's `CONTRIBUTING.md` and `AGENTS.md`.

Write the license as **`Apache-2.0`** (not "Apache 2", "Apache license", etc.). Note:
**site documentation/content** in this repo is CC BY 4.0 (`LICENSE-docs`).

---

## 6. Copyright & licensing conventions

Licensing is defined **at the repository level**, not per file. There is **no requirement**
to add a copyright header or SPDX identifier to every file, and no mass annotation of the
tree.

- **Do not** add a nominative copyright line (e.g. `Copyright 2026 <person>`) or a
  centralized `Copyright 2026 mcpdesc` to source files. Copyright stays with each
  contributor or their employer; Git preserves the authorship history.
- The applicable license is determined by the **content category** and its location, not by
  file extension. Code, scripts, schemas, tests, technical examples, and **normative**
  specification content are **`Apache-2.0`**; editorial documentation, guides, tutorials,
  and non-normative site content are **`CC-BY-4.0`**. A Markdown file that defines
  requirements or schemas is Apache-2.0.
- Add an SPDX identifier to an individual file **only when there is a specific reason** (a
  file meant to be copied standalone, a separately published schema, or a file whose license
  would otherwise be ambiguous) — never as a blanket policy.
- **Preserve** existing third-party copyright and license notices (e.g. Cisco-originated
  files); do not remove or alter them.

The authoritative directory mapping and rationale live in `docs/licensing-policy.md`; the
root `LICENSE` (Apache-2.0) and `LICENSE-docs` (CC-BY-4.0) carry the full terms.

---

## 7. Cisco attribution & boundaries

Two framings, applied by context:

- **The format / specification (origin):** "The initial MCP Description specification work
  **originated at Cisco DevNet** and was **released as open source through Cisco Open**
  (`cisco-open`)."
- **MCP Toolkit (a tool suite that use MCP Description as a pivot format):** "MCP Toolkit is an open-source project **initiated
  by Cisco DevNet** that illustrates usage of the `mcpdesc` format. It is released under
  **Apache-2.0** and **maintained at the `cisco-open` GitHub organization**." Keep the name
  and the `@cisco_open/mcptoolkit-*` package names. Avoid "contributed by Cisco" (it implies a formal donation of Cisco to the {mcpdesc} project).

**Standard attribution statement** (README, org profile, attribution page):

> The `{mcpdesc}` project builds on work that originated at Cisco DevNet and was released as open source through Cisco Open. It is not a Cisco product, Cisco service, or official > Cisco standardization effort. References to Cisco are provided for attribution to the origins of the initial work.

**Avoid:** "affiliated with Cisco" (ambiguous), "endorsed by Cisco" (unless formal),
"Cisco standard", "MCP standard", "official MCP Description standard", "endorsed by
Anthropic" — unless/until formally true.

---

## 8. Branding & visual identity

- **Credit:** "The `{mcpdesc}` logo, wordmark, and visual designs were **created by Jeanne and Stève Sfartz**, who grant them to the project, and are maintained as project branding."
- **License carve-out:** branding assets (logo, wordmark, favicon, social/OG images, visual identity) are **not** automatically Apache-2.0. The Apache-2.0 statement covers code, docs, and specification contributions — **not** branding or trademarks.
- **One visual system, two lockups:** project/format lockup `{mcpdesc}`; community lockup `{mcpdesc}` over `Community`.

---

## 9. Tools & ecosystem

- **MCP Toolkit** — an open-source project **initiated by Cisco DevNet** that illustrates usage of the `mcpdesc` format (capture, edit, document, compare, mock, validate, and test MCP servers). Released under Apache-2.0 and **maintained at the `cisco-open`** GitHub organization. It is **one** tool suite, not the whole project. On first mention, frame it as "a toolkit for MCP Description".
- **"Tools"** broadly = editor, validator, linter, diff, changelog generator, doc
  generator, schema tools, examples, ecosystem integrations.
- **Editor naming (two referents):**
  - **The hosted experience** on mcpdesc.org — **Live Editor** (short) · **Live MCP Description Editor** (formal, first mention). Served at `/live-editor`; hosted at `editor.mcpdesc.org`.
  - **The open-source component** it embeds — **mcpdesc Editor** (product name) · **mcpeditor** (tool/package id, `@cisco_open/mcptoolkit-editor`).
- "The `{mcpdesc}` project builds, curates, and lists tools that use or support MCP
  Description documents." Do not imply all listed tools are official.

---

## 10. File & naming conventions

**Verified against the spec** (`cisco-open/mcptoolkit-contract`, `mcpdesc` 0.7.0):

- Recommended extension: **`.mcpdesc.yaml`** / **`.mcpdesc.json`** (spec example:
  `chess-coach.mcpdesc.yaml`).

**Project convention (soft, not mandated by the spec):**

- Descriptive, lowercase names, e.g. `github.mcpdesc.yaml`. A version/date may be encoded for captured dumps; the tooling's own dumps use `\<name\>-v\<version\>-\<date\>.yaml`
  (e.g. `ms-learn-dump-v1.0.0-2026-06-30.yaml`) rather than a fixed
  `\<name\>-\<version\>.mcpdesc.yaml` pattern. Prefer matching whatever the generating tool emits; do not over-specify a pattern the tools don't follow.

---

## 11. Public bio & speaker language

**Preferred bio:**

> Stève Sfartz is a Principal Architect at Cisco and the initiator of the `{mcpdesc}`
> project. He created the initial MCP Description format, and the MCP Toolkit open-sourced > at cisco-open.

**Avoid:** "representing Cisco in MCP standardization" (unless approved). Prefer
"contributing to the MCP ecosystem discussion and work around server descriptions".

---

## 12. Do / do not (quick reference)

**Do:** the `{mcpdesc}` project · MCP Description format · `mcpdesc` document · `{mcpdesc}`
Community · mcpdesc.org · project maintainers · contributors · open source initiative ·
Apache-2.0 · no CLA · no copyright assignment · no DCO sign-off · Cisco-originated initial
work · "not a Cisco product, service, or official standardization effort" · OpenAPI
*analogy*.

**Do not:** "mcpdesc.org is the initiative" · "mcpdesc Community owns the project" · "led by maintainers and contributors" · "Copyright … mcpdesc Community" · "Cisco standard" · "official MCP standard" · "endorsed by/affiliated with Cisco" · "endorsed by Anthropic" · the word **"contract"** for the format · pluralizing as "MCP Descriptions" · `{mcpdesc}` in filenames/packages/commands.
