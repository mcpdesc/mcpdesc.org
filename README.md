# {mcpdesc} — Project Website (`mcpdesc.org`)

[Format](https://mcpdesc.org/format) · [Docs](https://mcpdesc.org/docs) · [Community](https://mcpdesc.org/community) · [GitHub](https://github.com/mcpdesc)

![Code License](https://img.shields.io/badge/code-Apache--2.0-blue)
![Docs License](https://img.shields.io/badge/docs-CC%20BY%204.0-lightgrey)
![Built with Astro](https://img.shields.io/badge/built%20with-Astro-ff5d01)
![Hosted on Cloudflare Pages](https://img.shields.io/badge/hosted%20on-Cloudflare%20Pages-orange)

This repo contains the source code for the {mcpdesc} project website.

> **Looking for tools' source codes?** Check the [tools](https://mcpdesc.org/) section of the website for existing tools that support the MCP Description format.

## Tech stack

- **[Astro](https://astro.build/)** — static site generator
- **[Starlight](https://starlight.astro.build/)** — documentation (served at `/docs`)
- **[Tailwind CSS](https://tailwindcss.com/)** — styling
- **[Plausible](https://plausible.io/)** — privacy-preserving analytics (opt-in)
- **[Cloudflare Pages](https://pages.cloudflare.com/)** — hosting (Free tier to start)

## Getting started

```bash
npm ci
npm run dev      # http://localhost:4321
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run Astro type/diagnostics checks |

## Project structure

```text
.
├── tools/                    # Tools catalog: one YAML per tool + catalog.yaml TOC
├── docs/                     # Project/repo documentation (NOT the published /docs pages)
│   ├── terminology-and-positioning.md  # Naming & positioning source of truth
│   ├── tool-badge.md         # mcpdesc badge & tools-catalog strategy
│   ├── deployment.md         # Cloudflare Pages deployment guide
│   └── analytics.md          # Analytics plugin & privacy guide
├── public/
│   ├── _headers              # Cloudflare Pages security headers
│   ├── badge/                # Hosted mcpdesc badge JSON (shields.io endpoint)
│   └── mcpdesc-favicon.png
├── src/
│   ├── analytics/            # Privacy-preserving analytics plugin
│   ├── components/           # Header, footer, analytics wiring
│   ├── content/              # docs (Starlight), blog
│   ├── layouts/              # BaseLayout for marketing pages
│   ├── pages/                # Home, live editor landing, tools, examples, blog
│   └── styles/               # Tailwind + Starlight entry CSS
├── astro.config.mjs
├── AGENTS.md                 # Rules for contributors and AI agents
└── package.json
```

Note the two meanings of "docs": `docs/` (this folder) is *repository* documentation,
while `src/content/docs/docs/` holds the *published* site docs served at
`mcpdesc.org/docs`.

## Privacy

> Your MCP Description stays in your browser. No MCP server description content is
> uploaded to our servers. Analytics only tracks anonymous product usage events.

See [`docs/analytics.md`](./docs/analytics.md) for the analytics design and the strict
list of what is never tracked.

## Deployment

The site deploys to Cloudflare Pages as a static build (`dist/`). See
[`docs/deployment.md`](./docs/deployment.md) for project settings, DNS, environment
variables, security headers, and the Free → Pro upgrade path.

## Publishing workflow

This repo uses frontmatter `draft: true` to keep content out of production builds until
you are ready to publish.

For complete rules and lifecycle guidance (dev vs production behavior, confidentiality caveats,
and versioning/update policy), see [CONTRIBUTING.md](./CONTRIBUTING.md#publishing-workflow).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md), [AGENTS.md](./AGENTS.md), and the
[Code of Conduct](./CODE_OF_CONDUCT.md).

## Licensing

mcpdesc.org uses different licenses depending on the type of material:

- **Code, scripts, schemas, tests, technical examples, and normative specification content**
  — [Apache-2.0](./LICENSE).
- **Editorial documentation, guides, tutorials, and non-normative site content** —
  [CC BY 4.0](./LICENSE-docs).

Copyright remains with the applicable contributors or their employers. No copyright
assignment, CLA, or DCO sign-off is required. Licensing is defined at the repository level;
the full mapping and rationale are in [docs/licensing-policy.md](./docs/licensing-policy.md).

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [GOVERNANCE.md](./GOVERNANCE.md) for the
contribution model and participation guidelines.
