// Compute the Markdown-twin URL for a given page pathname. Must stay in sync with the
// twin file naming in src/integrations/markdown-twins.mjs (which maps built HTML files):
//   /                        -> /index.md
//   /docs/                   -> /docs.md
//   /docs/getting-started/   -> /docs/getting-started.md
export function twinUrl(pathname: string): string {
  const p = pathname.replace(/index\.html$/, '').replace(/\/+$/, '');
  return p === '' ? '/index.md' : `${p}.md`;
}
