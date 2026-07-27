// Import the MCP Description specification sections from a vendored upstream clone into the
// Starlight docs collection as versioned, per-section Markdown pages.
//
// Strategy: docs/specification-mirror-strategy.md (arbitrations A–D, signed off 2026-07-16).
// - Multi-page: one page per normative section (01–15).
// - Fully versioned URLs: output under src/content/docs/docs/specification/<version>/.
// - Verbatim normative text (kept faithful to upstream, incl. its own terminology).
// - Each page gets a provenance banner (Starlight :::note aside) linking to the EXACT
//   source ref (repo + tag + path), so it is unambiguous what was mirrored.
//
// The source is identified by three coordinates so the on-site pages point at an immutable
// reference (never the moving `main` branch):
//   --repo <owner/name>   default: cisco-open/mcptoolkit-contract
//   --path <subpath>      default: spec            (sections live in <path>/sections)
//   --tag  <git-tag>      default: mcpdesc-v<version>
//
// Usage:
//   node scripts/import-spec.mjs <version> [--repo o/n] [--path spec] [--tag mcpdesc-vX]
//   node scripts/import-spec.mjs 0.7.0                        # tag defaults to mcpdesc-v0.7.0
//   node scripts/import-spec.mjs 0.8.0 --tag mcpdesc-v0.8.0
//
// The local clone is read from ref/<repo-name>/<path>/sections (ref/ is gitignored). Check
// that clone out at <tag> so the mirrored content matches the reference the pages link to.
//
// Re-runnable: on a new upstream version, run with the new version number. Existing
// version folders are immutable and are NOT touched (edit them by hand for annotations).

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- CLI: version (positional or --version) + source coordinates (--repo/--path/--tag) ---
const argv = process.argv.slice(2);
const opts = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    const eq = a.indexOf('=');
    if (eq !== -1) opts[a.slice(2, eq)] = a.slice(eq + 1);
    else opts[a.slice(2)] = argv[++i];
  } else {
    positional.push(a);
  }
}

const VERSION = opts.version ?? positional[0] ?? '0.7.0';
const REPO = opts.repo ?? 'cisco-open/mcptoolkit-contract';
const SPEC_PATH = (opts.path ?? 'spec').replace(/^\/+|\/+$/g, '');
const TAG = opts.tag ?? `mcpdesc-v${VERSION}`;

const REPO_NAME = REPO.split('/').filter(Boolean).pop();
const SRC_DIR = join(ROOT, 'ref', REPO_NAME, SPEC_PATH, 'sections');
const OUT_DIR = join(ROOT, 'src/content/docs/docs/specification', VERSION);
const UPSTREAM_BASE = `https://github.com/${REPO}/blob/${TAG}/${SPEC_PATH}`;

if (!existsSync(SRC_DIR)) {
  console.error(
    `Source sections not found: ${SRC_DIR}\n` +
      `Clone ${REPO} into ref/${REPO_NAME} and check out the '${TAG}' tag, e.g.:\n` +
      `  git clone https://github.com/${REPO}.git ref/${REPO_NAME}\n` +
      `  git -C ref/${REPO_NAME} checkout ${TAG}`,
  );
  process.exit(1);
}

// Advisory: confirm the local clone is actually at <tag>, so the content we mirror matches
// the reference URL we bake into the pages. Non-fatal (the clone may be a plain copy).
(function verifyCheckout() {
  const repoDir = join(ROOT, 'ref', REPO_NAME);
  try {
    const head = execFileSync('git', ['-C', repoDir, 'rev-parse', 'HEAD'], {
      encoding: 'utf8',
    }).trim();
    let exact = '';
    try {
      exact = execFileSync('git', ['-C', repoDir, 'describe', '--tags', '--exact-match'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
    } catch {
      /* HEAD is not exactly on a tag */
    }
    if (exact && exact !== TAG) {
      console.warn(
        `⚠  Local clone is at tag '${exact}' but importing as '${TAG}'. Check out '${TAG}' to match.`,
      );
    } else if (!exact) {
      console.warn(
        `⚠  Local clone is not on a tag (HEAD ${head.slice(0, 8)}); expected '${TAG}'. ` +
          `Content may not match the reference baked into the pages.`,
      );
    }
  } catch {
    /* ref/ is not a git checkout — skip the advisory */
  }
})();

console.log(`Importing MCP Description specification v${VERSION}`);
console.log(`  repo : ${REPO}`);
console.log(`  tag  : ${TAG}`);
console.log(`  path : ${SPEC_PATH}`);
console.log(`  from : ${SRC_DIR}`);
console.log(`  ref  : ${UPSTREAM_BASE}\n`);

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
