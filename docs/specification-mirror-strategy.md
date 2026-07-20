# Specification Docs — Mirror & Versioning Strategy

Status: **Accepted** — implementation in progress
Owner: maintainers · Last updated: 2026-07-16

This document defines how `mcpdesc.org` publishes the **MCP Description specification** under
`/docs/specification/**`, how it mirrors the canonical source, how it is versioned, and how
we may add our own annotations without corrupting the normative text.

It is the source of truth for *how the spec section is built and kept in sync* — not the spec
itself. The spec's source of truth remains upstream (see Provenance).

---

## 1. Canonical source & provenance

- **Canonical source of truth:** the `spec/` folder of
  [`cisco-open/mcptoolkit-contract`](https://github.com/cisco-open/mcptoolkit-contract)
  (mirrored locally under `ref/mcptoolkit-contract/spec/`).
- **Current version:** `mcpdesc` **0.7.0** — Status: **Draft** — dated 2026-03-23.
- **What lives upstream (do not fork silently):**
  - `mcp-description.md` — assembled normative spec (~1,200 lines).
  - `sections/00…15` — the same normative text, split by section.
  - `guides/` — non-normative rationale, tutorials, comparisons.
  - `examples/` — example `mcpdesc` documents.
  - `extensions/` — vendor extension specs (e.g. `x-cisco-metadata`).
  - `schemas/mcp-description/<version>.json` — versioned JSON Schemas.
  - `CHANGELOG.md`, `GOVERNANCE.md`, `implementations.md`.

`spec.mcpdesc.org` is planned. Until it exists, this `/docs/specification/**` section is the
community-rendered home of the spec, and every page links back to the upstream source.

---

## 2. Arbitrations (decisions)

Each item lists the options, the **recommended** choice, and the rationale. Items marked
🔲 need explicit sign-off before implementation.

### A. Page structure — 🔲

- **Options:** (1) one long page mirroring `mcp-description.md`; (2) **multi-page, one
  Starlight page per normative section**.
- **Recommended: (2) multi-page.** Better readability, deep-linking, per-section sidebar
  navigation, and localized "editor's notes". A 1,200-line single page is poor UX.
- **Cost:** more files to keep in sync. Mitigated by the sync procedure (§5) and the fact
  that section boundaries already exist upstream (`sections/00…15`).

### B. Versioning & URL scheme — 🔲

- **Recommended: "latest unversioned + archived snapshots".**
  - `/docs/specification/` — landing (status, version, source & schema links, section index).
  - `/docs/specification/<section-slug>` — the **latest** normative sections.
  - `/docs/specification/changelog` — full version history (from upstream `CHANGELOG.md`).
  - `/docs/specification/versions` — version index; links to archived snapshots.
  - On a version bump, freeze the current pages into
    `/docs/specification/v<old>/**` (read-only snapshot) before importing the new text.
- **Alternative:** fully versioned from day one (`/docs/specification/0.7.0/...`). Heavier,
  cleaner archival, worse "just read the latest spec" ergonomics. Chosen only if we expect
  frequent breaking versions.
- **Why:** matches how OpenAPI / JSON Schema present a stable "latest" while preserving
  history — good for the common "read the spec" path and for SEO stability.

### C. Terminology: the "contract" conflict — ✅ DECIDED: verbatim

- **Problem:** the upstream normative text uses **"contract"** for the format ("portable
  contract format", "server contract"). `docs/terminology-and-positioning.md` **bans**
  "contract" for the format (the OpenAPI *analogy* is fine).
- **Decision: mirror normative text verbatim** (keep "contract" where upstream uses it),
  with a provenance banner. House style applies only to *our* wrapper/index/commentary
  pages, never to the mirrored normative text. Rationale: silently rewording a normative
  spec risks changing meaning and creates a spec that disagrees with the canonical source.
  Revisit if/when the community controls the spec text at `spec.mcpdesc.org`.

### D. Copy vs. link for non-normative material — ✅ DECIDED: mirror examples, link guides

- **Normative sections + changelog:** **mirror** (the core ask).
- **Examples:** include a curated **Examples** page (minimal + one full example) and
  link to the full set upstream.
- **Guides** (`comparison-with-openapi`, `design-principles`, `faq`, …): **link out**;
  selectively adopt later if we want them rendered on-site.
- **JSON Schema:** **never copy**; always link the versioned file in `cisco-open`.

### E. Annotation mechanism ("we may want to add details")

- Our additions use Starlight asides clearly marked as ours, e.g.
  `:::note[Editor's note]` … `:::`, never interleaved as if normative.
- Each mirrored page carries frontmatter recording provenance:
  ```yaml
  specSource: sections/09-tools.md
  specVersion: 0.7.0
  specUpstream: https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec/sections/09-tools.md
  ```
- A visible **provenance banner** at the top of each spec page: "Mirrored from
  `cisco-open/mcptoolkit-contract` — spec v0.7.0. [View source ↗]". This keeps *ours vs.
  theirs* unambiguous and satisfies "point the user to the original document".

### F. Normative keywords & formatting

- Preserve RFC 2119 keywords (MUST/SHOULD/MAY) exactly.
- Convert upstream relative links (`implementations.md`, `../schemas/...`) to absolute
  upstream GitHub URLs or on-site routes during import — never leave dead relative links.

---

## 3. Information architecture (fully versioned)

```
/docs/specification/
  index            Version index → lists all versions, marks latest
  changelog        Cross-version history (from upstream CHANGELOG.md)
  0.7.0/
    index              Version landing: status, source + schema links, section map
    introduction         (01)
    terminology          (02)
    document-structure   (03)
    versioning           (04)
    info-object          (05)
    transports           (06)
    security             (07)
    capabilities         (08)
    tools                (09)
    resources            (10)
    prompts              (11)
    tags                 (12)
    specification-extensions (13)
    serialization        (14)
    conformance          (15)
    examples             Curated examples + link to upstream set
  0.8.0/**             Added on the next release; 0.7.0 stays live, marked superseded
```

Sidebar: a dedicated **Specification** group. Because versions are self-contained folders,
the sidebar can surface the latest version's sections plus a link to the version index.

Generation: normative section pages are produced by `scripts/import-spec.mjs` (§5), which
reads the upstream `sections/*.md` for a given version and writes the versioned `.mdx`
pages with provenance frontmatter + banner. Generated pages are committed and become the
frozen, editable source for that version (annotations added by hand afterwards).

---

## 4. Relationship to existing pages

- `/format` (marketing) stays the friendly overview and CTA; it links **into**
  `/docs/specification/` for the normative detail.
- No duplication of normative text on marketing pages — they summarize and link.
- `/docs` index gains a link to the Specification section.

---

## 5. Sync procedure (when upstream changes)

When upstream releases a new spec version (e.g. 0.7.1 or 0.8.0):

1. **Import:** run `scripts/import-spec.mjs <version>` to generate
   `/docs/specification/<version>/**` from the upstream `sections/` for that version.
2. **Landing + examples:** author the version landing page and curated examples page.
3. **Changelog:** update `/docs/specification/changelog` from upstream `CHANGELOG.md`.
4. **Version index:** add the new version and re-mark which version is **latest**; add a
   **superseded** banner to the previous version's landing.
5. **Sidebar:** point the Specification group at the new latest version.
6. **Editor's notes:** author any new annotations directly in the new frozen version.
7. **Terminology:** re-confirm arbitration C still holds for any new/changed wording.

Older version folders are **never rewritten** — they are immutable once released. Patch vs.
minor vs. major handling follows upstream SemVer (spec §4): patch = errata, minor =
additive/back-compatible, major = breaking.

---

## 6. Decisions log

Signed off 2026-07-16:

1. **A** — multi-page per section. ✅
2. **B** — fully versioned URLs (`/docs/specification/<version>/**`), frozen folders. ✅
3. **C** — verbatim normative text (keep "contract"); house style only on our own pages. ✅
4. **D** — mirror examples on-site; link guides out. ✅

Implementation proceeds section by section, each page carrying the provenance banner and
frontmatter from §2E.
