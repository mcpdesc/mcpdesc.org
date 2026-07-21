# Deployment (Cloudflare Pages)

The site is a **static** Astro build deployed to Cloudflare Pages. Start on the **Free**
plan; upgrade to Pro only when traffic or security signals justify it.

## Cloudflare Pages project

| Setting | Value |
|---|---|
| Project name | `mcpdesc-org` |
| Repository | this repository |
| Production branch | `main` |
| Build command | `npm ci && npm run build` |
| Build output directory | `dist` |
| Production domain | `mcpdesc.org` |

The hosted editor is a **separate** Cloudflare Pages project (`mcpdesc-editor`,
production domain `editor.mcpdesc.org`, **live**) built from its own repository.

## DNS

```text
mcpdesc.org                 Cloudflare Pages (this site)
www.mcpdesc.org             Redirect to mcpdesc.org
editor.mcpdesc.org          Cloudflare Pages (editor project)
spec.mcpdesc.org            Community-hosted specification — planned
mcpdesc.com/.io/.eu/.tech   Redirect to mcpdesc.org
```

Prefer Cloudflare Pages custom-domain binding over manual DNS records. Do not redirect
`.org` to `.com`.

## Environment variables

Set these in the Cloudflare Pages **production** environment (see `.env.example`):

```text
PUBLIC_ANALYTICS_ENABLED=true
PUBLIC_ANALYTICS_PROVIDER=plausible
PUBLIC_PLAUSIBLE_DOMAIN=mcpdesc.org
PUBLIC_PLAUSIBLE_SRC=https://plausible.io/js/script.js
```

For **preview** deployments and local development, keep analytics disabled:

```text
PUBLIC_ANALYTICS_ENABLED=false
```

## Security headers

Headers are defined in [`public/_headers`](../public/_headers):

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Cross-Origin-Opener-Policy: same-origin
```

### TODO: Content Security Policy

A strict CSP is **not** enabled yet — it must be validated against Astro/Starlight,
Pagefind search, and Plausible first. Candidate to test later:

```text
Content-Security-Policy: default-src 'self'; script-src 'self' https://plausible.io; connect-src 'self' https://plausible.io; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
```

## Markdown for Agents

[Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
lets Cloudflare convert this site's HTML pages to Markdown **at the edge** when an agent
requests them with `Accept: text/markdown`. HTML stays the default for browsers. This needs
**no application code or build changes** — it is a zone-level Cloudflare setting, so it stays
compatible with keeping the site static.

**Plan requirement:** the feature is available on **Pro, Business, and Enterprise** plans
(and SSL for SaaS) at no extra cost. This site runs on the **Free** plan (see above), so
Markdown for Agents cannot be enabled until the zone is upgraded to Pro. Enable it when the
zone moves to Pro (see "Upgrade to Pro when" below).

How it behaves once enabled:

- A request with `Accept: text/markdown` returns `Content-Type: text/markdown; charset=utf-8`,
  `Vary: Accept`, and token-count headers (`x-markdown-tokens`, `x-original-tokens`).
- Security and cache headers from [`public/_headers`](../public/_headers) are preserved on the
  converted response.
- Content Signals: our origin does not send a `content-signal` HTTP header, so Cloudflare adds
  its default `content-signal: ai-train=yes, search=yes, ai-input=yes`. Note this **differs**
  from our [`public/robots.txt`](../public/robots.txt) policy, which sets `ai-train=no` while
  the spec is a Draft. If Markdown for Agents is ever enabled, set a matching `content-signal`
  HTTP header at the origin so the converted responses honor the same `ai-train=no` policy.

To enable (zone on Pro or above):

1. Cloudflare dashboard → the `mcpdesc.org` zone → **AI Crawl Control**.
2. Enable **Markdown for Agents** (or `PATCH .../zones/{zone_tag}/settings/content_converter`
   with `{"value": "on"}`).

Verify after enabling:

```bash
curl -sD - https://mcpdesc.org/ -H "Accept: text/markdown" -o /dev/null \
  | grep -i -E 'content-type|vary|x-markdown-tokens'
# expect: content-type: text/markdown; charset=utf-8
```

### Free alternative already in place: Markdown twins

Because the site runs on the Free plan, it ships **Markdown twins** instead: a build-time
integration ([`src/integrations/markdown-twins.mjs`](../src/integrations/markdown-twins.mjs))
writes a `.md` copy next to every built HTML page. Agents fetch Markdown by appending `.md`
to any path (for example `https://mcpdesc.org/docs/getting-started.md`), and each HTML page
advertises its twin with `<link rel="alternate" type="text/markdown">`. `.md` files are
served as `text/markdown` via [`public/_headers`](../public/_headers). This is fully static
and needs no Cloudflare plan upgrade. The difference from Markdown for Agents is that
discovery is URL-based (`.md` suffix) rather than `Accept: text/markdown` content
negotiation on the same URL. If the zone later moves to Pro, both can coexist.

## AI discoverability and crawling

The site is intentionally open to search engines and AI agents. The full design (robots.txt,
sitemap, `llms.txt`, and our build-time Markdown twins) is documented in
[`ai-discoverability.md`](./ai-discoverability.md).

Cloudflare-side note: the zone's **managed/default `robots.txt` is disabled** in the
dashboard, because it did not merge cleanly with ours. With it off, the static
[`public/robots.txt`](../public/robots.txt) is the single authoritative file served at
`/robots.txt`. For Markdown, the site uses its **own Markdown twins** (see above), not the
Cloudflare Markdown for Agents feature.

## WAF and security (Free plan)

Enable: Cloudflare proxy, Universal SSL, DDoS protection, WAF Free Managed Ruleset,
Security Events monitoring, and Bot Fight Mode if available.

Suggested conservative custom rules:

- **Block** common junk paths: `/wp-admin*`, `/wp-login.php`, `/xmlrpc.php`, `/.env`,
  `/phpmyadmin*`, `/server-status`, `/.git*`.
- **Managed Challenge** for suspicious high-frequency traffic.

## Upgrade to Pro when

- A real marketing campaign starts or traffic grows meaningfully.
- Security Events show abusive/suspicious traffic.
- You need stronger managed WAF rulesets or Super Bot Fight Mode.
- Build volume becomes limiting, or the project's public visibility/reputation grows.
- You want to enable **Markdown for Agents** (edge HTML→Markdown for AI agents; see above).

## Post-launch checks (weekly)

Cloudflare Analytics, Security Events, Pages deploy history, Plausible visitors/goals,
and unusual 404s/paths.
