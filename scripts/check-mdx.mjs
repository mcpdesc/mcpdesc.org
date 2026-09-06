// Pre-build MDX validator.
//
// `astro build` compiles MDX through @astrojs/mdx, and when a file has a syntax
// error (most commonly a bare `{` that MDX tries to parse as a JSX expression)
// the underlying oxc/mdx error is surfaced without the file name — you only get
// a bare `line:col` and a stack trace into node_modules. That makes it very hard
// to tell *which* file broke.
//
// This script compiles every .mdx file one at a time with the same MDX compiler
// and, on failure, prints the workspace-relative path plus line/column so the
// failing file is obvious. Wired as the `prebuild` npm script so it runs before
// `astro build`.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from '@mdx-js/mdx';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentDir = join(root, 'src', 'content');

/** Recursively collect all .mdx files under a directory. */
async function collectMdxFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return collectMdxFiles(full);
      return entry.isFile() && entry.name.endsWith('.mdx') ? [full] : [];
    }),
  );
  return files.flat();
}

/**
 * Strip a leading YAML frontmatter block so the MDX compiler (which is not
 * configured with remark-frontmatter here) does not misparse the `---` fences.
 * Frontmatter is validated separately by Astro's content collections.
 */
function stripFrontmatter(source) {
  const match = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!match) return { body: source, offset: 0 };
  const lineCount = match[0].split(/\r?\n/).length - 1;
  return { body: source.slice(match[0].length), offset: lineCount };
}

const files = await collectMdxFiles(contentDir);
const failures = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const { body, offset } = stripFrontmatter(source);
  try {
    await compile(body);
  } catch (error) {
    const rel = relative(root, file);
    const line = error?.line != null ? error.line + offset : undefined;
    const column = error?.column;
    const where = line != null ? `:${line}${column != null ? `:${column}` : ''}` : '';
    const reason = error?.reason ?? error?.message ?? String(error);
    failures.push(`  ${rel}${where}\n    ${reason}`);
  }
}

if (failures.length > 0) {
  console.error(`\n[check-mdx] ✗ ${failures.length} MDX file(s) failed to parse:\n`);
  console.error(failures.join('\n\n'));
  console.error('\n[check-mdx] Tip: wrap raw JSON/code examples in fenced ``` code blocks —');
  console.error('a bare `{` in MDX body is parsed as a JSX expression.\n');
  process.exit(1);
}

console.log(`[check-mdx] ✓ ${files.length} MDX file(s) parsed cleanly.`);
