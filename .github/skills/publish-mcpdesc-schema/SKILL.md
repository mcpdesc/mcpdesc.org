---
name: publish-mcpdesc-schema
description: 'Publish an MCP Description schema update on mcpdesc.org when a new mcpdesc-specification release, release candidate, or draft is ready. Use for schema publication before tagging, companion validation-rule/result schema updates, immutable artifact hosting, and live publication-gate verification. Does not import specification documentation or publish validation catalogs.'
argument-hint: '<snapshot version> [approved upstream commit or tag]'
---

# Publish MCP Description schemas

Publish exact upstream schema bytes as static artifacts on mcpdesc.org. This is
the schema-hosting gate, not a specification release, documentation import, or
catalog publication.

## 1. Establish the approved source

- Read `docs/specification-mirror-strategy.md`, `scripts/publish-schema.mjs`,
  `public/_headers`, and the current `CHANGELOG.md`.
- Inspect the site's branch, remote, worktree, and relation to its remote branch.
  Preserve unrelated work. Confirm permission before committing, pushing, or
  deploying. Direct-to-main publication requires explicit approval for this run;
  do not assume approval from an earlier publication.
- The canonical upstream repository is `mcpdesc/mcpdesc-specification`, normally
  available in the gitignored `ref/mcpdesc-specification` checkout.
- Use `gh` to inspect the preparation/release PR, its merge commit and CI, tags,
  `specification-status.json`, `schemas/draft.json` when present, and the format
  and validation format changelogs. Distinguish prepared, tagged, and published.
- Pin a clean local upstream checkout to the exact approved commit or tag.
  Do not modify a dirty checkout. Do not publish from a moving branch URL.
  Record the full commit SHA in the site changelog for a pre-tag publication.
- For a prerelease, cross-check the requested snapshot against `snapshotTag`,
  `snapshotDate`, `schemaId`, and the root schema `$id`. The document `mcpdesc`
  value is the base format version, not the prerelease selector.
- Run the upstream preparation check from the upstream directory:
  `npm run release:check -- rc` or `npm run release:check -- draft`.
  For a stable release, use `npm run release:check -- stable <version>`.
  Read the upstream scripts if these interfaces have changed; stop on failures.

An approved preparation commit can be used before tagging: upstream release
checks require its schema URL to be live before the tag is created. Final docs
and catalogs still require the immutable release tag. Do not create upstream
tags, change release metadata, or publish packages as part of this skill.

## 2. Stage only new schemas

Derive source paths from upstream metadata rather than assuming them:

- MCP Description prerelease: the `schema` path in `schemas/draft.json`.
- Stable MCP Description: `schemas/mcp-description/<version>.json`.
- Companion schemas: `<spec-path>/validation/rule.schema.json` and
  `result.schema.json` when present. Each has its own format version in `$id`;
  do not use the MCP Description version for these schemas.

For each companion schema, compare its bytes with the site's file at its
declared canonical identity. If already present and identical, retain it.
If the same version has different bytes, stop: immutable URLs cannot be
overwritten. A new upstream schema version is required.

From the site root, use the existing publisher:

```bash
node scripts/publish-schema.mjs <snapshot> <upstream-mcp-schema>
node scripts/publish-schema.mjs <rule-format> <upstream-rule-schema> --kind validation-rule
node scripts/publish-schema.mjs <result-format> <upstream-result-schema> --kind validation-result
```

Run only the commands for new files. The publisher validates dialect, identity,
and MCP Description conformance version, preserves exact source bytes, and
refuses to overwrite. An already-published MCP Description schema must also
match the approved source byte-for-byte; verify it rather than rewriting it.

Add an explicit `public/_headers` entry for every new versioned schema:

```text
/schema/<kind>/<version>.json
  Content-Type: application/schema+json; charset=utf-8
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=31536000, immutable, no-transform
```

`no-transform` prevents CDN compression from weakening the ETag required by
upstream publication gates. Keep historical header entries unchanged.

Do not advance stable/candidate discovery, the docs selector, `/docs/rules`,
schema aliases, or catalog indexes in a schema-only publication. Never move
`latest.json` to a prerelease. Do not import docs or generate spec bundles.
Update the site changelog with the new schema URLs, companion format versions,
source commit/tag, and the fact that docs/catalog discovery remain unchanged.

## 3. Validate and publish

- Compare all staged schemas byte-for-byte with the pinned upstream sources.
  Validate companion schemas with the upstream schema-only catalog checks.
  A pre-tag bundle can be exported from a clean approved upstream commit with
  `npm run rules:export -- <snapshot> <new-session-output-dir> --prepare`;
  this preview is not a catalog publication. Do not copy its manifest or rules
  into the site.
- Run `node --test scripts/publish-schema.test.mjs`, `npm run check`, and
  `npm run build` from the site root. Install dependencies only if missing.
- Review the complete scoped diff and confirm existing schemas, aliases,
  catalogs, and bundles are unchanged. Stage only the intended files.
- With this run's approval, commit and push using the agreed branch workflow.
  Include the repository's required co-author trailer. Do not force-push,
  amend, create a release tag, or bump the site version without approval.
- Wait for the deployment corresponding to the pushed commit; inspect GitHub
  checks/deployment status. A successful push or build is not live verification.

## 4. Verify the canonical URLs

Run from the pinned upstream checkout:

```bash
npm run release:check -- rc-publication
npm run rules:check-publication -- <snapshot> <prepared-bundle> --schema-only
```

Use `draft-publication` for a draft. The upstream `stable <version>` check also
verifies stable schema hosting; do not switch the website's stable channel here.

Require direct HTTP 200, no redirects or HTML fallback, exact source bytes and
`$id`/dialect, JSON-compatible content type, open CORS, one-year immutable
caching, and a strong ETag. Test with `Accept-Encoding: gzip, br` as well to
confirm CDN transformations do not break the gate.

If deployment is delayed, report it as pending and retry only within a bounded
wait. If publication fails, surface the exact failed requirement; do not claim
success or weaken the verification. Clean up only named temporary outputs
created by this run.

Report the verified schema URLs, source SHA/tag, pushed commit, and publication
check results. Stop here: tagging and the subsequent docs/catalog import are
separate steps.
