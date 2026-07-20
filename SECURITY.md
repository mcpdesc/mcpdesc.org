# Security Policy

## Reporting a vulnerability

This repository hosts a **static website** with no backend. Still, if you discover a
security issue — for example a content injection vector, a dependency vulnerability, or
a misconfiguration in the deployment/headers — please report it responsibly.

- **Do not** open a public issue for security-sensitive reports.
- Contact the maintainers listed in [MAINTAINERS.md](./MAINTAINERS.md) privately, or use the email [security@mcpdesc.org](mailto:security@mcpdesc.org).

Please include:

- A description of the issue and its potential impact.
- Steps to reproduce, if applicable.
- Any relevant URLs, request/response details, or configuration.

## Scope

In scope:

- This website's code, configuration, and deployment (Cloudflare Pages, security
  headers in `public/_headers`).
- The client-side analytics plugin (`src/analytics/`).

Out of scope:

- Issues with an tool that is listed in the curated list. For any issue with a particular tool, refer to the source repo for instructions on how to report an issue.

## Supported versions

The live site is built from the `main` branch. Only `main` is supported.
