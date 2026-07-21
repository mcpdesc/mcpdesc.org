# Analytics and privacy

The site uses [Plausible](https://plausible.io/) through an internal plugin layer so that
tracking is centralized, typed, privacy-preserving, and easy to disable or replace.

## Privacy promise

> Your MCP Description stays in your browser. No MCP server description content is
> uploaded to our servers. Analytics only tracks anonymous product usage events.

## Design

```text
src/analytics/
  analytics.types.ts        # AnalyticsProvider contract + event names
  analytics.ts              # entry point; merges UTM props; picks provider
  events.ts                 # sanitizeAnalyticsProps + ALLOWED_KEYS allow-list
  campaign.ts               # UTM parsing (session-only, in memory)
  providers/
    noop.provider.ts        # default; does nothing
    plausible.provider.ts   # forwards sanitized events to window.plausible
src/components/Analytics.astro  # injects Plausible script + wires DOM events
```

**Rules:**

- UI code calls `analytics.track(name, props)` — never `window.plausible` directly.
- Analytics is disabled unless `PUBLIC_ANALYTICS_ENABLED === 'true'`.
- Every call is failure-tolerant; analytics must never break the site.

## Never tracked

MCP description content, server URLs, tool/resource/prompt names, prompt text, uploaded
filenames, validation error text, raw schema content, authentication values, and any
private customer/project identifier.

## Allowed safe metadata

Only the keys in the `ALLOWED_KEYS` allow-list (`src/analytics/events.ts`) are ever sent.
Everything else is dropped; strings are truncated. Prefer buckets over exact values:

```text
error_count_bucket: 0 | 1 | 2-5 | 6-10 | 10+
size_bucket:        tiny | small | medium | large | huge
```

**Group A — sent by the website today:**

| Key | Purpose |
|-----|---------|
| `page_type` | Which kind of page a click came from (home, editor landing, docs, blog). |
| `cta_id` | Which call-to-action was clicked (e.g. `open_editor`). |
| `outbound_target` | Bucketed outbound destination category. Never a raw URL. |
| `utm_source` | Campaign attribution: where the visit originated. |
| `utm_medium` | Campaign attribution: channel. |
| `utm_campaign` | Campaign attribution: named campaign. |

**Group C — reserved for future editor events, not currently sent:** `schema_version`,
`input_format`, `output_format`, `valid`, `error_count_bucket`, `example_id`, `size_bucket`,
`copy_format`, `app_version`. No code in this repo or the hosted editor emits these yet;
they stay in the allow-list so the sanitizer already governs them if the editor ever gains
opt-out usage events.

The `utm_content` and `utm_term` keys were intentionally dropped — this is a community
project and does not run split-testing or paid-search campaigns.

## Declarative event wiring

Attach safe events in markup via data attributes; `Analytics.astro` binds them:

```html
<a href="/live-editor" data-analytics-cta="open_editor">Try the Live Editor</a>
<a href="https://github.com/cisco-open" data-analytics-outbound="github">GitHub</a>
```

- `data-analytics-cta="..."` → `campaign_cta_clicked` (with `cta_id`, `page_type`)
- `data-analytics-outbound="..."` → `outbound_link_clicked` (allow-listed
  `outbound_target`: `github` | `npm` | `docs` | `companion_site` | `issue` | `other`)

## Environment variables

See [`.env.example`](../.env.example). Enabled only in the Cloudflare Pages production
environment; disabled for previews and local dev.

| Variable | Purpose |
|----------|---------|
| `PUBLIC_ANALYTICS_ENABLED` | Master switch. Analytics runs only when this is exactly `true`. Must keep the `PUBLIC_` prefix — the flag is also read in the browser bundle (`analytics.ts`), and Astro only inlines `PUBLIC_`-prefixed vars into client code. |
| `PUBLIC_ANALYTICS_PROVIDER` | Provider to use. Currently only `plausible`. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Site domain (`mcpdesc.org`). Retained as the "site is configured" enable signal. |
| `PUBLIC_PLAUSIBLE_SRC` | The site-specific Plausible script bundle URL. |

## Plausible script

`Analytics.astro` injects Plausible's current script format when analytics is enabled: an
`async` site-specific bundle plus a small init stub that sets up the `window.plausible`
event queue.

```html
<script async src="https://plausible.io/js/pa-<site-id>.js"></script>
<script>
  window.plausible = window.plausible || function () { (plausible.q = plausible.q || []).push(arguments) };
  plausible.init = plausible.init || function (i) { plausible.o = i || {} };
  plausible.init();
</script>
```

The site identity is embedded in the bundle filename (`PUBLIC_PLAUSIBLE_SRC`), so the older
`data-domain` attribute is no longer used. The inline stub is the sanctioned Plausible
bootstrap inside `Analytics.astro`; UI code still never calls `window.plausible` directly —
it goes through `analytics.track(...)`.

> **Emit the inline stub as raw JS.** In a `.astro` file, the content of a `<script>` tag is
> treated as **raw text** — Astro does not evaluate a JSX expression like `` {`…`} `` inside
> it. Writing the stub as `` <script is:inline>{`…plausible.init()`}</script> `` therefore
> emits the braces and backticks *literally* into the page, so `plausible.init()` never runs
> and **no pageviews are tracked**. Inject the bootstrap via `set:html` (raw executable JS)
> instead:
>
> ```astro
> <script is:inline set:html={`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`} />
> ```

## How mcpdesc.org and editor.mcpdesc.org differ

Both sites load the same Plausible snippet, but they wire it up differently. They are two
**separate** Plausible sites (different `pa-<site-id>.js` bundles), so they collect
independent stats.

| Aspect | mcpdesc.org (this repo) | editor.mcpdesc.org |
|---|---|---|
| Site nature | Full Astro site (pages are built here) | Hosting layer that **wraps** a prebuilt editor build (`@cisco_open/mcptoolkit-editor-dist`) |
| Injection mechanism | Astro component `Analytics.astro`, rendered in the layout | Node script `scripts/build.mjs` that rewrites `index.html` (`replace('<head>', …)`) |
| Injection time | Astro build, via `import.meta.env` | Node post-build step on the copied HTML |
| Enable condition | Three vars: `PUBLIC_ANALYTICS_ENABLED` + `PUBLIC_ANALYTICS_PROVIDER=plausible` + `PUBLIC_PLAUSIBLE_DOMAIN` | One var: `ANALYTICS_ENABLED=true` |
| Env var prefix | `PUBLIC_` (inlined into the browser bundle — required by Astro) | no prefix (read only in the Node build) |
| Script source | `PUBLIC_PLAUSIBLE_SRC` | `PLAUSIBLE_SRC` (**different** Plausible site) |
| CSP | None served yet (see [deployment.md](./deployment.md) TODO) | Strict CSP in `overlay/_headers`, with a build-time **SHA-256 hash** of the inline stub |
| Analytics layer | Rich: `src/analytics/**` (typed provider, sanitized events, UTM, `data-analytics-*` wiring) | Minimal: just the two `<script>` tags; the editor emits its own events |

Practical consequences:

- **Enabling is easier to miss here.** This repo needs all **three** `PUBLIC_*` vars set (in
  the correct Cloudflare Pages environment scope) before the script is injected; the editor
  needs only one.
- **CSP lives with the editor, not here.** The editor whitelists `https://plausible.io` and
  hashes its inline stub. When a CSP is eventually added to this site, the same inline stub
  will need an equivalent allowance (hash or `script-src https://plausible.io`).
- **Raw-JS injection is the shared requirement.** The editor injects raw JS via Node string
  replacement; this repo must do the equivalent with `set:html` (see the note above). Both
  ultimately ship the identical executable bootstrap.

