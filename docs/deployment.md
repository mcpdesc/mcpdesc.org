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

## Post-launch checks (weekly)

Cloudflare Analytics, Security Events, Pages deploy history, Plausible visitors/goals,
and unusual 404s/paths.
