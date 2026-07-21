// Build-time Markdown twins ("Option A"): after the static build, emit a `.md`
// counterpart next to every HTML page (e.g. /docs/getting-started.md alongside
// /docs/getting-started/). This gives AI agents a clean Markdown representation of the
// site's content without any server runtime — it is a pure post-build step, so the site
// stays a static Cloudflare Pages deployment.
//
// Draft handling: drafts are never written to `dist/` in a production build (the blog
// routes filter on `import.meta.env.DEV`, and Starlight excludes `draft: true` docs), so
// draft pages simply have no HTML here and therefore get no `.md` twin — and never appear
// in the sitemap either.
//
// Each HTML page also gets a `<link rel="alternate" type="text/markdown">` in its <head>
// pointing at its twin, so agents can discover the Markdown version via content links.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse } from 'node-html-parser';
import { NodeHtmlMarkdown } from 'node-html-markdown';

const nhm = new NodeHtmlMarkdown();

async function* walkHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtml(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

// Map a built HTML file (relative to dist) to its flattened `.md` twin path/URL.
//   index.html                              -> index.md            (/index.md)
//   docs/index.html                         -> docs.md             (/docs.md)
//   docs/getting-started/index.html         -> docs/getting-started.md
function twinFor(relHtml) {
  const noIndex = relHtml.replace(/(?:^|\/)index\.html$/, (m) =>
    m.startsWith('/') ? '.md' : 'index.md',
  );
  const rel = noIndex === 'index.md' ? 'index.md' : noIndex.replace(/\.html$/, '.md');
  return { rel, url: '/' + rel.split(path.sep).join('/') };
}

function yamlEscape(value) {
  return JSON.stringify(value ?? '');
}

// Strip the "· mcpdesc" / "| mcpdesc" site-name suffix from a page <title>.
function cleanTitle(title) {
  return title.replace(/\s*[|·]\s*mcpdesc\s*$/i, '').trim();
}

const HTML_ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

// Starlight renders code via Expressive Code as one <div class="ec-line"> per line with
// no newline text nodes, and wraps blocks in frame chrome (caption, copy button). Convert
// each code block back to a plain <pre><code> with real newlines so the Markdown twin gets
// a proper fenced block instead of a single run-on line.
//
// node-html-parser keeps <pre> content as raw text, so re-parse each block's innerHTML as
// a standalone fragment to read the per-line elements.
function normalizeExpressiveCode(root) {
  for (const pre of root.querySelectorAll('pre')) {
    const lines = parse(pre.innerHTML).querySelectorAll('.ec-line');
    if (!lines.length) continue;
    const code = lines
      .map((line) => line.text)
      .join('\n')
      .replace(/[&<>]/g, (c) => HTML_ESCAPE[c]);
    const lang = pre.getAttribute('data-language');
    const codeClass = lang ? ` class="language-${lang}"` : '';
    pre.set_content(`<code${codeClass}>${code}</code>`);
  }
}

// Adjacent inline items (category/status pills as bare <span>s, or link rows like social
// profiles and hero CTAs) have no whitespace between them, so they run together in Markdown
// ("creationdocumentation", "[GitHub][LinkedIn]"). Append a trailing space to each inline
// item in a multi-item flex row so they stay separated.
function separateInlineBadges(root) {
  for (const row of root.querySelectorAll('[class*="flex"]')) {
    const items = row.childNodes.filter(
      (node) =>
        node.nodeType === 1 && (node.rawTagName === 'span' || node.rawTagName === 'a'),
    );
    if (items.length > 1) {
      for (const item of items) item.set_content(`${item.innerHTML} `);
    }
  }
}

export default function markdownTwins() {
  return {
    name: 'markdown-twins',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distPath = fileURLToPath(dir);
        let count = 0;
        for await (const file of walkHtml(distPath)) {
          const html = await readFile(file, 'utf8');
          // Skip redirect stubs (e.g. /editor, /mcp-description) — no real content.
          if (/<meta[^>]+http-equiv=["']?refresh/i.test(html)) continue;

          const root = parse(html);
          const content =
            root.querySelector('.sl-markdown-content') ??
            root.querySelector('main');
          if (!content) continue;

          // Remove non-content chrome before conversion: Starlight heading anchor links
          // ("Section titled …"), Expressive Code copy buttons and frame captions.
          content
            .querySelectorAll('a.sl-anchor-link, figcaption, button, .copy')
            .forEach((node) => node.remove());
          normalizeExpressiveCode(content);
          separateInlineBadges(content);

          const body = nhm.translate(content.innerHTML).trim();
          if (!body) continue;

          const relHtml = path.relative(distPath, file).split(path.sep).join('/');
          const { rel, url } = twinFor(relHtml);

          const title = cleanTitle(root.querySelector('title')?.text?.trim() ?? '');
          const description =
            root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
          const canonical =
            root.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';

          const frontmatter = [
            '---',
            title && `title: ${yamlEscape(title)}`,
            description && `description: ${yamlEscape(description)}`,
            canonical && `source: ${yamlEscape(canonical)}`,
            '---',
          ]
            .filter(Boolean)
            .join('\n');

          // Prepend a UTF-8 BOM so viewers that ignore the HTTP charset (local file opens,
          // servers that omit `charset=utf-8`) still decode accented characters correctly.
          // Production also serves these as `text/markdown; charset=utf-8` (public/_headers).
          await writeFile(
            path.join(distPath, rel),
            `\uFEFF${frontmatter}\n\n${body}\n`,
            'utf8',
          );

          // Advertise the twin from the HTML page's <head> for agent discovery.
          const link = `<link rel="alternate" type="text/markdown" href="${url}">`;
          if (!html.includes('type="text/markdown"')) {
            await writeFile(file, html.replace('</head>', `${link}</head>`), 'utf8');
          }
          count++;
        }
        logger.info(`Generated ${count} Markdown twin${count === 1 ? '' : 's'}.`);
      },
    },
  };
}
