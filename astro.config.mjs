// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Community-first website of the mcpdesc Project.
// Docs are served under /docs via Starlight; marketing pages are plain Astro pages.
export default defineConfig({
  site: 'https://mcpdesc.org',
  redirects: {
    // The MCP Description intro page moved from /mcp-description to /format.
    '/mcp-description': '/format',
    // The live editor landing page moved from /editor to /live-editor, to distinguish
    // the mcpdesc.org live experience from the mcpeditor open-source component.
    '/editor': '/live-editor',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // Emits sitemap-index.xml (+ sitemap-0.xml) at build time from all non-draft
    // routes. Referenced by public/robots.txt so search engines and AI crawlers can
    // discover the full page set. `site` (above) is required for absolute URLs.
    sitemap(),
    starlight({
      title: 'mcpdesc',
      description:
        'The {mcpdesc} project is an independent open source initiative promoting a portable, machine-readable description format for MCP servers.',
      favicon: '/favicon-32.png',
      // Starlight already emits og:title/description/url and twitter:card. Add the shared
      // social share image (so docs links unfurl like marketing pages), plus the apple
      // touch icon and web manifest for docs pages.
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://mcpdesc.org/mcpdesc-og.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://mcpdesc.org/mcpdesc-og.png' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/manifest.webmanifest' } },
      ],
      // Code blocks in Markdown (blog, examples) and docs are rendered by
      // Expressive Code (bundled with Starlight). Pin a single light theme so all
      // snippets render on a white background with GitHub-light syntax highlighting —
      // consistent with the <Code theme="github-light" /> blocks on the MCP Description
      // page. Plain `text` blocks (flow/schema diagrams) become readable dark-on-white.
      expressiveCode: {
        themes: ['github-light'],
      },
      // Starlight only owns routes generated from the docs content collection.
      // Content lives under src/content/docs/docs/**, so docs are served under /docs/**.
      // The marketing homepage (src/pages/index.astro) keeps ownership of "/".
      disable404Route: true,
      lastUpdated: true,
      customCss: ['./src/styles/global.css'],
      components: {
        // Match the marketing site's "{mcpdesc}" wordmark instead of Starlight's
        // default plain-text site title (see SiteHeader.astro).
        SiteTitle: './src/components/StarlightSiteTitle.astro',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/mcpdesc/mcpdesc.org/tree/main/src/content/docs/docs',
        },
      ],
      sidebar: [
        {
          label: 'Documentation',
          items: [
            { slug: 'docs' },
            { slug: 'docs/getting-started' },
            { slug: 'docs/add-a-tool' },
            { slug: 'docs/terminology' },
          ],
        },
        {
          label: 'Specifications',
          items: [
            { slug: 'docs/specification' },
            { slug: 'docs/specification/changelog' },
            { label: '0.7.0', collapsed: true, items: [{ autogenerate: { directory: 'docs/specification/0.7.0' } }] },
          ],
        },
        {
          label: 'Project',
          items: [
            { slug: 'docs/governance' },
            { slug: 'docs/attribution' },
            { slug: 'docs/privacy' },
            { slug: 'docs/faq' },
          ],
        },
      ],
    }),
  ],
});
