// Build first-party, single-file specification bundles and a machine-readable version
// index, so AI assistants and build tools can retrieve the complete MCP Description
// specification in ONE request (no cross-domain GitHub fetch, no link-following) and
// discover which stable and candidate versions exist.
//
// Why a committed artifact (not an Astro integration): the canonical upstream source
// (ref/mcptoolkit-contract/spec) is a local-only clone (gitignored) and is NOT present
// at Cloudflare build time. The mirrored, verbatim section pages under
// src/content/docs/docs/specification/<version>/ ARE always in the repo, so this script
// reads THOSE and concatenates them. Output lands in public/ and is committed — served
// statically with no build step, exactly like the section pages themselves.
//
// Outputs (all under public/specification/):
//   <version>/mcpdesc.md   Complete spec for a version, one Markdown file (immutable).
//   latest/mcpdesc.md      Copy of the stable version.
//   index.json             Machine-readable index of ALL versions: stable, candidate,
//                          latest/next compatibility aliases,
//                          per-version full-file + canonical + schema URLs, and sha256.
//
// Usage:  node scripts/build-spec-bundle.mjs
//
// Adding a version / starting a draft: edit the VERSIONS registry below.

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  existsSync,
  rmSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE = 'https://mcpdesc.org';
const DOCS_ROOT = join(ROOT, 'src/content/docs/docs/specification');
const OUT_ROOT = join(ROOT, 'public/specification');

// ---------------------------------------------------------------------------------------
// Version registry — the single editorial source of truth for the index.
//
//   channel   "stable"    the current stable version (exactly one)
//             "previous"  a published, superseded version
//             "candidate" the active prerelease candidate
//   maturity  "draft" | "stable" | "release-candidate" | "wip"
//
// A version WITH on-site section pages (docsDir present under DOCS_ROOT) gets a full
// mcpdesc.md generated. A "wip" entry without on-site pages is index-only.
// ---------------------------------------------------------------------------------------
const VERSIONS = [
  {
    version: '0.7.0',
    channel: 'stable',
    maturity: 'stable',
    date: '2026-03-23',
    normativeSectionCount: 15,
    canonicalRepo: 'cisco-open/mcptoolkit-contract',
    // Pinned to an immutable upstream release tag so canonical/raw/schema links are stable
    // (not the moving `main` branch). Bump this when a new tag mirrors a new version.
    canonicalRef: 'mcpdesc-v0.7.0',
  },
  {
    version: '0.8.0-rc.4',
    channel: 'candidate',
    maturity: 'release-candidate',
    date: '2026-09-08',
    normativeSectionCount: 17,
    canonicalRepo: 'mcpdesc/mcpdesc-specification',
    canonicalRef: 'v0.8.0-rc.4+editorial.1',
    canonicalPath: 'spec/draft',
    tracking: 'https://github.com/mcpdesc/mcpdesc-specification/issues',
  },
];

// ---------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------

function canonicalUrls(v) {
  const path = v.canonicalPath ?? 'spec';
  const base = `https://github.com/${v.canonicalRepo}/blob/${v.canonicalRef}/${path}`;
  const raw = `https://raw.githubusercontent.com/${v.canonicalRepo}/${v.canonicalRef}/${path}`;
  return {
    canonical: `${base}/mcp-description.md`,
    canonicalRaw: `${raw}/mcp-description.md`,
    schema: `https://mcpdesc.org/schema/mcp-description/${v.version}.json`,
  };
}

// Parse the leading YAML frontmatter of a mirrored section page. We only need `title`
// and `sidebar.order` — a tiny hand-rolled parser avoids adding a YAML dependency.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: raw };
  const body = raw.slice(m[0].length);
  const data = {};
  let order;
  for (const line of m[1].split('\n')) {
    const t = line.match(/^title:\s*(.*)$/);
    if (t) data.title = t[1].trim().replace(/^["']|["']$/g, '');
    const o = line.match(/^\s*order:\s*(\d+)\s*$/);
    if (o) order = Number(o[1]);
  }
  if (order !== undefined) data.order = order;
  return { data, body };
}

// Convert Starlight container asides (:::note[Title] … :::) to plain Markdown blockquotes
// so the bundle is portable Markdown, and DROP the per-page "Mirrored specification"
// provenance banner (the bundle carries a single provenance header of its own).
function transformAsides(md) {
  const lines = md.split('\n');
  const out = [];
  let inAside = false;
  let title = null;
  let drop = false;
  let buf = [];
  const flush = () => {
    if (!drop) {
      if (title) {
        out.push(`> **${title}**`);
        out.push('>');
      }
      for (const l of buf) out.push(l.length ? `> ${l}` : '>');
    }
    buf = [];
    title = null;
    drop = false;
  };
  for (const line of lines) {
    const open = line.match(/^:::(\w+)(?:\[(.*?)\])?\s*$/);
    if (!inAside && open) {
      inAside = true;
      title = open[2] || open[1][0].toUpperCase() + open[1].slice(1);
      drop = /mirrored specification/i.test(title);
      continue;
    }
    if (inAside && /^:::\s*$/.test(line)) {
      inAside = false;
      flush();
      continue;
    }
    if (inAside) {
      buf.push(line);
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

// Rewrite on-site root-absolute links (](/…) to absolute mcpdesc.org URLs so they remain
// resolvable from a standalone file. Leave in-page anchors (](#…) and external links.
function absolutizeLinks(md) {
  return md.replace(/\]\((\/[^)]*)\)/g, `](${SITE}$1)`);
}

// Pin upstream repo links that the mirrored pages left on the moving `main` branch (e.g.
// example-file and appendix references) to the version's immutable canonical ref, so a
// per-version bundle points only at stable URLs.
function pinUpstreamRef(md, repo, ref) {
  if (!ref || ref === 'main') return md;
  return md
    .split(`github.com/${repo}/blob/main/`)
    .join(`github.com/${repo}/blob/${ref}/`)
    .split(`raw.githubusercontent.com/${repo}/main/`)
    .join(`raw.githubusercontent.com/${repo}/${ref}/`);
}

function cleanSection(raw, { isOverview, slug }) {
  const { data, body } = parseFrontmatter(raw);
  let md = transformAsides(body);
  // The overview page ends with a redundant on-site "## Sections" nav list + "See also";
  // drop it — the bundle already contains every section inline.
  if (isOverview) md = md.replace(/\n## Sections[\s\S]*$/m, '\n');
  md = absolutizeLinks(md);
  return {
    order: data.order ?? (isOverview ? 0 : 999),
    title: data.title,
    slug,
    md: md.trim(),
  };
}

function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

// ---------------------------------------------------------------------------------------
// Build one version's single-file bundle from its committed section pages.
// Returns { fullPath, sha256, sections } or null when the version has no on-site pages.
// ---------------------------------------------------------------------------------------
function buildFull(v) {
  const dir = join(DOCS_ROOT, v.version);
  if (!existsSync(dir)) return null;

  const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  const parts = files
    .map((f) =>
      cleanSection(readFileSync(join(dir, f), 'utf8'), {
        isOverview: f === 'index.md',
        slug: f.replace(/\.md$/, ''),
      }),
    )
    .filter((p) => p.md.length > 0)
    .sort((a, b) => a.order - b.order);

  const urls = canonicalUrls(v);
  const header = [
    `<!-- mcpdesc-spec version=${v.version} maturity=${v.maturity} channel=${v.channel}${v.date ? ` date=${v.date}` : ''} -->`,
    ``,
    `# MCP Description Specification — v${v.version}`,
    ``,
    `**Version:** ${v.version} · **Maturity:** ${v.maturity}${v.date ? ` · **Date:** ${v.date}` : ''}`,
    ``,
    `> Complete MCP Description specification (all sections) as a single Markdown file,`,
    `> for one-request retrieval by AI assistants and build tools.`,
    `>`,
    `> Canonical source of truth: ${urls.canonical}`,
    `> Raw Markdown: ${urls.canonicalRaw}`,
    `> JSON Schema: ${urls.schema}`,
    `> Version index (machine-readable): ${SITE}/specification/index.json`,
    `>`,
    `> This first-party copy mirrors the versioned section pages at`,
    `> ${SITE}/docs/specification/${v.version}/. Where it differs from the canonical`,
    `> source above, the canonical source wins.`,
    ``,
    `---`,
    ``,
    ``,
  ].join('\n');

  const full = header + pinUpstreamRef(parts.map((p) => p.md).join('\n\n---\n\n'), v.canonicalRepo, v.canonicalRef) + '\n';

  const outDir = join(OUT_ROOT, v.version);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'mcpdesc.md'), full, 'utf8');

  const sections = parts
    .filter((p) => p.order >= 1 && p.order <= v.normativeSectionCount)
    .map((p) => ({
      title: p.title,
      url: `${SITE}/docs/specification/${v.version}/${p.slug}`,
    }));

  return {
    sha256: sha256(full),
    full: `${SITE}/specification/${v.version}/mcpdesc.md`,
    sections,
  };
}

// ---------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------

// Clean previous output so removed versions don't linger (files are regenerated below).
if (existsSync(OUT_ROOT)) rmSync(OUT_ROOT, { recursive: true, force: true });
mkdirSync(OUT_ROOT, { recursive: true });

const stable = VERSIONS.find((v) => v.channel === 'stable');
const candidate = VERSIONS.find((v) => v.channel === 'candidate');

const indexVersions = [];
for (const v of VERSIONS) {
  const urls = canonicalUrls(v);
  const built = buildFull(v);
  const entry = {
    version: v.version,
    channel: v.channel,
    maturity: v.maturity,
    date: v.date ?? null,
    html: built ? `${SITE}/docs/specification/${v.version}/` : null,
    full: built ? built.full : null,
    sha256: built ? built.sha256 : null,
    canonical: urls.canonical,
    canonicalRaw: urls.canonicalRaw,
    schema: urls.schema,
  };
  if (v.tracking) entry.tracking = v.tracking;
  if (built && built.sections.length) entry.sections = built.sections;
  indexVersions.push(entry);
}

// Publish the "latest" alias file.
if (stable) {
  const src = join(OUT_ROOT, stable.version, 'mcpdesc.md');
  if (existsSync(src)) {
    const latestDir = join(OUT_ROOT, 'latest');
    mkdirSync(latestDir, { recursive: true });
    writeFileSync(join(latestDir, 'mcpdesc.md'), readFileSync(src, 'utf8'), 'utf8');
  }
}

const index = {
  $comment:
    'Machine-readable index of MCP Description specification versions. Fetch this first ' +
    'to discover the stable and candidate versions. ' +
    'Each version exposes a single-file `full` Markdown for one-request retrieval.',
  site: SITE,
  stable: stable ? stable.version : null,
  candidate: candidate ? candidate.version : null,
  latest: stable ? stable.version : null,
  latestFull: stable ? `${SITE}/specification/latest/mcpdesc.md` : null,
  next: candidate ? candidate.version : null,
  versions: indexVersions,
};

writeFileSync(join(OUT_ROOT, 'index.json'), JSON.stringify(index, null, 2) + '\n', 'utf8');

const built = indexVersions.filter((v) => v.full).map((v) => v.version);
console.log(
  `Wrote public/specification/index.json (${VERSIONS.length} version(s); ` +
    `full bundles: ${built.join(', ') || 'none'}; stable: ${index.stable ?? 'none'}; ` +
    `candidate: ${index.candidate ?? 'none'}).`,
);
