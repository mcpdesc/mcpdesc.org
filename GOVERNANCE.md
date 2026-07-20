# Governance

Status: v0.3
Date: 2026-07-19

The `{mcpdesc}` project is an independent open source initiative supporting the MCP Description format, its ecosystem, and related tools.

This document defines the basic governance model for the `{mcpdesc}` project, including the roles of maintainers and contributors, how decisions are made, and how changes to the MCP Description format, tools, documentation, and project assets are managed.

## Project scope

The `{mcpdesc}` project maintains and promotes the MCP Description format and related open source assets, including:

- the MCP Description specification;
- schemas, examples, and reference documents;
- documentation and tutorials;
- tools that create, validate, render, compare, test, or consume `mcpdesc` documents;
- community resources, websites, and project repositories;
- project branding and communication assets.

The project is open source and community-oriented. It is not a Cisco product, Cisco service, or official Cisco standardization effort. References to Cisco are provided for attribution to the origins of the initial work.

## Contributors

A contributor is anyone who participates in the project by proposing, discussing, or submitting improvements.

Contributions may include, but are not limited to:

- code changes;
- documentation updates;
- specification feedback;
- schema improvements;
- examples and test cases;
- bug reports;
- feature requests;
- issue triage;
- design feedback;
- tool integrations;
- community discussions.

Unless a repository states otherwise, code and specification contributions are licensed under Apache-2.0. Repository documentation may use a separate content license; for example, mcpdesc.org documentation and site content use CC BY 4.0. Contributors retain copyright to their contributions. No CLA, copyright assignment, or DCO sign-off is required.

Contributors are expected to:

- act respectfully and constructively;
- keep discussions focused on the project goals;
- provide clear rationale for proposed changes;
- follow repository-level contribution guidelines;
- avoid submitting code, text, or assets they do not have the right to contribute.

## Copyright and licensing

Copyright in each contribution to the `{mcpdesc}` project remains with the applicable
copyright holder. Contributors are not required to assign their copyright to the project, its
maintainers, or any participating organization. Git preserves the authorship history;
copyright is **not** centralized under mcpdesc, maintainers administer the repository without
becoming owners of the contributions, and taking part in the project does not create any
implicit transfer of rights.

Licensing is defined at the repository level by the nature and location of the material.
Unless explicitly stated otherwise:

- code, scripts, schemas, normative specifications, tests, tools, and technical examples are
  licensed under the **Apache License, Version 2.0**;
- editorial documentation, tutorials, guides, and non-normative website content are licensed
  under the **Creative Commons Attribution 4.0 International License** (`CC-BY-4.0`).

By submitting a contribution for inclusion in the project, a contributor agrees that it may
be distributed under the license applicable to the part of the repository being modified, and
represents that they have the right to submit it under that license. The project does not
require a copyright assignment, a Contributor License Agreement, or a Developer Certificate of
Origin sign-off. Third-party materials remain subject to their original licenses and notices.
The full directory mapping and rationale are documented in `docs/licensing-policy.md`.

## Maintainers

Maintainers are trusted project members responsible for stewarding the project and keeping it useful, coherent, and sustainable.

Maintainers may be responsible for:

- reviewing and merging pull requests;
- triaging issues and discussions;
- guiding the roadmap;
- maintaining the MCP Description specification;
- publishing releases;
- maintaining schemas, examples, and reference tools;
- maintaining documentation and websites;
- curating the tools catalog published on mcpdesc.org (submission and listing criteria are documented on the site);
- managing repository settings and project infrastructure;
- representing the project in community discussions;
- ensuring that licensing, attribution, and governance practices remain clear.

Maintainers do not own contributor copyrights. Contributors retain copyright to their own contributions and license those contributions under the project license.

## Competition and technical collaboration

The `{mcpdesc}` project is an open technical collaboration. Project discussions must remain focused on technical requirements, interoperability, implementation, security, testing, documentation, and open standards.

Participants must not use project spaces to exchange or coordinate competitively sensitive information, including prices, discounts, commercial terms, margins, allocation of customers or suppliers, intentions regarding bids or tenders, or confidential business strategies.

Participation in the `{mcpdesc}` project does not restrict any person or organization from independently developing, supporting, licensing, offering, pricing, or promoting competing formats, technologies, products, or services.

Maintainers may stop or redirect discussions that fall outside these boundaries.

This section is a project participation guideline and does not constitute legal advice.

## Maintainer responsibilities

Maintainers should act in the interest of the project and its users. They are expected to:

- encourage open discussion and constructive feedback;
- explain decisions when a proposal is accepted or rejected;
- avoid unnecessary centralization of decision-making;
- preserve compatibility where reasonable;
- document breaking changes clearly;
- distinguish personal opinions from project decisions;
- avoid presenting the project as endorsed by organizations unless such endorsement is explicit;
- keep the specification, tools, and documentation aligned.

## Becoming a maintainer

Maintainers may invite contributors to become maintainers when they have shown sustained, high-quality participation and good judgment.

Signals may include:

- repeated constructive contributions;
- reliable review or triage work;
- deep understanding of the MCP Description format;
- responsible behavior in discussions;
- ability to balance compatibility, usability, and project direction;
- willingness to help maintain the project over time.

A new maintainer should be approved by existing maintainers. Until the project defines a more formal process, maintainer appointment is by rough consensus of the existing maintainers.

## Maintainer inactivity or removal

A maintainer may step down at any time.

Maintainers who are inactive for an extended period may be moved to an emeritus or former maintainer status, after reasonable attempts to contact them.

A maintainer may be removed for behavior that harms the project, violates community expectations, creates legal or security risk, or repeatedly acts against the project’s governance. Removal should be handled carefully and, where possible, by consensus of the remaining maintainers.

## Decision-making

The project uses a lightweight, consensus-oriented model.

For most changes, maintainers make decisions through normal issue and pull request review. A change may be accepted when there is sufficient agreement, no unresolved blocking concern, and at least one maintainer approves it.

For larger changes, maintainers should seek broader feedback before merging. Larger changes may include:

- changes to the MCP Description specification;
- breaking schema changes;
- major tooling changes;
- changes to governance, licensing, or contribution rules;
- changes to project branding or public positioning;
- creation, renaming, or archival of official repositories.

When consensus is not obvious, maintainers should document the decision and the rationale.

## Specification changes

The MCP Description specification is the core asset of the project. Changes to the specification should be handled with care.

Specification changes should generally:

- explain the problem being solved;
- describe the proposed change;
- include examples where relevant;
- consider compatibility with existing `mcpdesc` documents;
- identify whether the change is additive, compatible, or breaking;
- update schemas, documentation, and examples as needed.

Breaking changes should be rare, clearly documented, and released with an appropriate version change.

## Releases and versioning

Repositories may define their own release process, but releases should be clearly tagged and documented.

For the MCP Description specification, maintainers should use semantic versioning principles where practical:

- patch versions for clarifications and compatible fixes;
- minor versions for compatible additions;
- major versions for breaking changes.

Release notes should explain important changes and migration considerations.

## Branding and project identity

The `{mcpdesc}` logo, wordmark, and visual designs were created by Jeanne Sfartz and Stève Sfartz, who grant them to the project, and are maintained as project branding.

Branding assets are not automatically covered by the same contribution assumptions as code, documentation, and specification contributions unless explicitly stated in the relevant repository or asset file.

Use of the project name, logo, or wordmark should not imply endorsement, certification, or official status unless approved by the project maintainers.

## Relationship to Cisco-originated work

The initial MCP Description specification work and initial related tools originated at Cisco DevNet and were released as open source through Cisco Open.

The `{mcpdesc}` project builds on that open-licensed foundation as an independent open source initiative. It is not a Cisco product, Cisco service, or official Cisco standardization effort.

Subsequent contributions are copyrighted by their respective contributors and are licensed under the applicable repository license unless otherwise stated. Existing valid copyright notices, including notices on Cisco-originated files, must be preserved.

## Changes to this governance document

Changes to this document should be proposed through pull requests and reviewed by maintainers.
