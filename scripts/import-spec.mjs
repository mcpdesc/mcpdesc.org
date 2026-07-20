// Import the MCP Description specification sections from the vendored upstream source
// (ref/mcptoolkit-contract/spec) into the Starlight docs collection as versioned,
// per-section Markdown pages.
//
// Strategy: docs/specification-mirror-strategy.md (arbitrations A–D, signed off 2026-07-16).
// - Multi-page: one page per normative section (01–15).
// - Fully versioned URLs: output under src/content/docs/docs/specification/<version>/.
// - Verbatim normative text (kept faithful to upstream, incl. its own terminology).
// - Each page gets a provenance banner (Starlight :::note aside) linking to the source.
//
// Usage:  node scripts/import-spec.mjs <version>       (default: 0.7.0)
//
// Re-runnable: on a new upstream version, run with the new version number. Existing
// version folders are immutable and are NOT touched (edit them by hand for annotations).

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const VERSION = process.argv[2] ?? '0.7.0';
const SRC_DIR = join(ROOT, 'ref/mcptoolkit-contract/spec/sections');
const OUT_DIR = join(ROOT, 'src/content/docs/docs/specification', VERSION);
const UPSTREAM_BASE = 'https://github.com/cisco-open/mcptoolkit-contract/blob/main/spec';

// Sections 01–15 become pages; 00 (front matter / abstract) is folded into the landing page.
const SECTION_FILES = readdirSync(SRC_DIR)
  .filter((f) => /^\d\d-.+\.md$/.test(f) && !f.startsWith('00-'))
  .sort();

// filename "09-tools.md" -> { num: 9, slug: "tools" }
function parseName(file) {
  const m = file.match(/^(\d\d)-(.+)\.md$/);
  return { num: Number(m[1]), slug: m[2] };
}

// GitHub/Starlight-compatible heading slug (matches github-slugger for our headings).
function slugifyHeading(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// First pass: build a map of heading-anchor -> page slug, so cross-section anchor links
// (e.g. a link in "tools" pointing at "#123-tag-references" which lives in "tags") can be
// rewritten to an absolute on-site path.
const anchorToPage = new Map();
const parsed = SECTION_FILES.map((file) => {
  const { num, slug } = parseName(file);
  const raw = readFileSync(join(SRC_DIR, file), 'utf8');
  for (const line of raw.split('\n')) {
    const h = line.match(/^#{2,4}\s+(.*)$/);
    if (h) anchorToPage.set(slugifyHeading(h[1]), slug);
  }
  return { file, num, slug, raw };
});

const pageTitle = (raw) => {
  const h = raw.split('\n').find((l) => /^##\s+/.test(l));
  return h ? h.replace(/^##\s+/, '').trim() : 'Specification';
};

function rewriteLinks(body, currentSlug) {
  return body.replace(/\]\(([^)]+)\)/g, (whole, target) => {
    // Pure in-page anchor: keep if it belongs to this page, else point at the owning page.
    if (target.startsWith('#')) {
      const anchor = target.slice(1);
      const owner = anchorToPage.get(anchor);
      if (owner && owner !== currentSlug) {
        return `](/docs/specification/${VERSION}/${owner}#${anchor})`;
      }
      return whole; // same-page anchor
    }
    // External links: leave untouched.
    if (/^(https?:)?\/\//.test(target) || target.startsWith('mailto:')) return whole;
    // Relative links into the upstream spec tree resolve to the canonical source on GitHub.
    const clean = target.replace(/^\.\//, '').replace(/^\.\.\//, '');
    return `](${UPSTREAM_BASE}/${clean})`;
  });
}

mkdirSync(OUT_DIR, { recursive: true });

for (const { file, num, slug, raw } of parsed) {
  const title = pageTitle(raw);
  const banner =
    `:::note[Mirrored specification]\n` +
    `This page mirrors **${title}** of the MCP Description specification **v${VERSION}**. ` +
    `The canonical source of truth is ` +
    `[\`cisco-open/mcptoolkit-contract\`](${UPSTREAM_BASE}/sections/${file}). ` +
    `Where this page differs from upstream, upstream wins.\n:::\n\n`;

  const body = rewriteLinks(raw.trimEnd(), slug);

  const frontmatter =
    `---\n` +
    `title: ${JSON.stringify(title)}\n` +
    `description: ${JSON.stringify(`MCP Description specification v${VERSION} — ${title}.`)}\n` +
    `slug: docs/specification/${VERSION}/${slug}\n` +
    `sidebar:\n  order: ${num}\n` +
    `---\n\n`;

  writeFileSync(join(OUT_DIR, `${slug}.md`), frontmatter + banner + body + '\n', 'utf8');
  console.log(`  wrote ${slug}.md  (${title})`);
}

console.log(`\nImported ${parsed.length} sections for v${VERSION} into ${OUT_DIR}`);
if (!existsSync(join(OUT_DIR, 'index.md'))) {
  console.log('Next: author the version landing page (index.md) and examples.md by hand.');
}
