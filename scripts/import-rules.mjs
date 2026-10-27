// Import and validate a versioned MCP Description validation rule registry.
// Usage: node scripts/import-rules.mjs <version> [--repo owner/name] [--path spec/draft] [--tag v<version>] [--force]

import Ajv2020 from 'ajv/dist/2020.js';
import YAML from 'yaml';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve, sep, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const options = {};
const positional = [];

for (let index = 0; index < argv.length; index += 1) {
  const argument = argv[index];
  if (argument === '--force') {
    options.force = true;
  } else if (argument.startsWith('--')) {
    const equals = argument.indexOf('=');
    if (equals !== -1) options[argument.slice(2, equals)] = argument.slice(equals + 1);
    else options[argument.slice(2)] = argv[++index];
  } else {
    positional.push(argument);
  }
}

const VERSION = options.version ?? positional[0];
if (!VERSION) {
  console.error('Usage: node scripts/import-rules.mjs <version> [--repo owner/name] [--path spec/draft] [--tag v<version>] [--force]');
  process.exit(1);
}

const REPO = options.repo ?? 'mcpdesc/mcpdesc-specification';
const SPEC_PATH = (options.path ?? 'spec/draft').replace(/^\/+|\/+$/g, '');
const TAG = options.tag ?? `v${VERSION}`;
const REPO_NAME = REPO.split('/').filter(Boolean).at(-1);
const REF_DIR = join(ROOT, 'ref', REPO_NAME);
const SOURCE_DIR = join(REF_DIR, SPEC_PATH);
const VALIDATION_DIR = join(SOURCE_DIR, 'validation');
const RULES_DIR = join(VALIDATION_DIR, 'rules');
const DOCS_DIR = join(ROOT, 'src/content/docs/docs');
const VERSION_DOCS_DIR = join(DOCS_DIR, 'rules', VERSION);
const SPEC_DOCS_DIR = join(DOCS_DIR, 'specification', VERSION);
const REVISION_ORDER = ['2024-11-05', '2025-03-26', '2025-06-18', '2025-11-25', '2026-07-28'];
const RULE_OWNERS = {
  mcp: {
    title: 'MCP Rules',
    description: 'Rules whose authority is the applicable MCP protocol revision.',
  },
  mcpdesc: {
    title: 'MCP Description Rules',
    description: 'Rules defined by MCP Description, including its own semantics and projections.',
  },
  'json-schema': {
    title: 'JSON Schema Rules',
    description: 'Rules delegated to embedded JSON Schema dialects and validation.',
  },
};
const SOURCE_TIERS = {
  1: 'MCP schema.ts and normative specification text',
  2: 'Normative referenced standards',
  3: 'Generated MCP schema.json',
  4: 'Official MCP clarifications and final SEPs',
  5: 'Official SDKs and reference implementations',
  6: 'MCP Inspector and official conformance framework',
  7: 'Other ecosystem tooling',
};
const SPEC_SECTION_FILES = readdirSync(join(SOURCE_DIR, 'sections'))
  .filter((file) => /^\d\d-.+\.md$/.test(file))
  .sort();
const SECTION_SLUGS = new Map(
  SPEC_SECTION_FILES.map((file) => [file, file.replace(/^\d\d-/, '').replace(/\.md$/, '')]),
);
const SOURCE_BASE_URL = `https://github.com/${REPO}/blob/${encodeURIComponent(TAG)}`;

function fail(message) {
  throw new Error(message);
}

function encodePath(path) {
  return path.split('/').map(encodeURIComponent).join('/');
}

function sourceUrl(path, fragment = '') {
  return `${SOURCE_BASE_URL}/${encodePath(path)}${fragment}`;
}

function ensureInside(base, target, label) {
  const absolute = resolve(base, target);
  const pathFromBase = relative(base, absolute);
  if (pathFromBase === '..' || pathFromBase.startsWith(`..${sep}`) || resolve(base) === absolute) {
    fail(`${label} escapes its source directory: ${target}`);
  }
  return absolute;
}

function verifyTag() {
  if (!existsSync(RULES_DIR)) fail(`Rule directory not found: ${RULES_DIR}`);
  if (TAG === 'main') fail('Rules must be imported from an immutable tag, not main.');

  try {
    const head = execFileSync('git', ['-C', REF_DIR, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    const taggedCommit = execFileSync('git', ['-C', REF_DIR, 'rev-parse', `refs/tags/${TAG}^{commit}`], { encoding: 'utf8' }).trim();
    if (head !== taggedCommit) {
      fail(`The local specification checkout does not match tag '${TAG}'. Check out that tag before importing.`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('The local specification checkout')) throw error;
    fail(`Could not verify tag '${TAG}' in ${REF_DIR}.`);
  }
}

function parseYaml(filePath, label) {
  try {
    return YAML.parse(readFileSync(filePath, 'utf8'), { uniqueKeys: true });
  } catch (error) {
    fail(`Could not parse ${label}: ${error.message}`);
  }
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolvePointer(document, pointer, label) {
  if (pointer === '') return document;
  if (!pointer.startsWith('/')) fail(`${label}: invalid JSON Pointer '${pointer}'.`);

  return pointer.slice(1).split('/').reduce((value, rawToken) => {
    const token = rawToken.replace(/~1/g, '/').replace(/~0/g, '~');
    if (Array.isArray(value)) {
      if (!/^(0|[1-9]\d*)$/.test(token) || Number(token) >= value.length) {
        fail(`${label}: JSON Pointer '${pointer}' does not resolve.`);
      }
      return value[Number(token)];
    }
    if (value === null || typeof value !== 'object' || !Object.hasOwn(value, token)) {
      fail(`${label}: JSON Pointer '${pointer}' does not resolve.`);
    }
    return value[token];
  }, document);
}

function resolveFixturePath(fixturePath) {
  const base = fixturePath.startsWith('projection-fixtures/') ? SOURCE_DIR : join(SOURCE_DIR, 'fixtures');
  const path = fixturePath.startsWith('projection-fixtures/')
    ? fixturePath
    : join('fixtures', fixturePath);
  const absolute = ensureInside(SOURCE_DIR, path, 'Fixture path');
  if (!existsSync(absolute)) fail(`Fixture not found: ${fixturePath}`);
  return { absolute, base };
}

function validateLocationExists(location, manifest, label) {
  if (/^https:\/\//.test(location)) return;
  const [path, fragment = ''] = location.split('#');

  if (path.startsWith('sections/')) {
    const file = path.slice('sections/'.length);
    if (!SECTION_SLUGS.has(file)) fail(`${label}: unknown specification section '${file}'.`);
    return;
  }

  if (path.startsWith('validation/mcp-schemas/')) {
    const match = path.match(/^validation\/mcp-schemas\/(\d{4}-\d{2}-\d{2})\/(schema\.(?:ts|json))$/);
    if (!match) fail(`${label}: unsupported MCP schema location '${location}'.`);
    const sourcePath = `${match[1]}/${match[2]}`;
    const entry = manifest.files.find((file) => file.path === sourcePath);
    const schemaPath = join(VALIDATION_DIR, 'mcp-schemas', sourcePath);
    if (!entry || !existsSync(schemaPath)) {
      fail(`${label}: MCP schema location is not present in the pinned manifest: '${location}'.`);
    }
    const schemaContent = readFileSync(schemaPath);
    const digest = createHash('sha256').update(schemaContent).digest('hex');
    if (digest !== entry.sha256) {
      fail(`${label}: vendored MCP schema digest does not match the pinned manifest: '${location}'.`);
    }
    const lines = fragment.match(/^L(\d+)(?:-L(\d+))?$/);
    if (!lines) fail(`${label}: MCP schema location must include a line anchor: '${location}'.`);
    const firstLine = Number(lines[1]);
    const lastLine = Number(lines[2] ?? lines[1]);
    const lineCount = schemaContent.toString('utf8').split('\n').length;
    if (firstLine < 1 || lastLine < firstLine || lastLine > lineCount) {
      fail(`${label}: MCP schema line range is outside ${sourcePath} (${lineCount} lines): '${location}'.`);
    }
    return;
  }

  const normalized = posix.normalize(posix.join(SPEC_PATH, path));
  if (normalized === '..' || normalized.startsWith('../')) fail(`${label}: location escapes the upstream repository: '${location}'.`);
  if (!existsSync(join(REF_DIR, normalized))) fail(`${label}: source location not found: '${location}'.`);
}

function markdownLocation(location, manifest) {
  if (/^https:\/\//.test(location)) return `[${location}](${location})`;
  const [path, fragment = ''] = location.split('#');
  if (path.startsWith('sections/')) {
    const sectionFile = path.slice('sections/'.length);
    const slug = SECTION_SLUGS.get(sectionFile);
    return `[/docs/specification/${VERSION}/${slug}#${fragment}](/docs/specification/${VERSION}/${slug}#${fragment})`;
  }

  if (path.startsWith('validation/mcp-schemas/')) {
    const match = path.match(/^validation\/mcp-schemas\/(\d{4}-\d{2}-\d{2})\/(schema\.(?:ts|json))$/);
    const entry = manifest.files.find((file) => file.path === `${match[1]}/${match[2]}`);
    const sourcePath = entry.source.replace(/^\//, '');
    return `[${location}](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/${manifest.commit}/${encodePath(sourcePath)}#${fragment})`;
  }

  const upstreamPath = posix.normalize(posix.join(SPEC_PATH, path));
  return `[${location}](${sourceUrl(upstreamPath, fragment ? `#${fragment}` : '')})`;
}

function ruleSlug(rule) {
  return rule.id.slice(rule.owner.length + 1).replaceAll('.', '-');
}

function ruleUrl(rule) {
  return `/docs/rules/${VERSION}/${rule.owner}/${ruleSlug(rule)}`;
}

function formatRevisionTable(applicability = {}) {
  return [
    `| ${REVISION_ORDER.map((revision) => `\`${revision}\``).join(' | ')} |`,
    `| ${REVISION_ORDER.map(() => '---').join(' | ')} |`,
    `| ${REVISION_ORDER.map((revision) => applicability[revision] ?? 'not specified').join(' | ')} |`,
  ].join('\n');
}

function formatLocations(locations, manifest) {
  return locations.map((location) => `  - ${markdownLocation(location, manifest)}`).join('\n');
}

function formatSpecification(rule, manifest) {
  return rule.specification.map((requirement) => [
    `- **${requirement.reference}**`,
    formatLocations(requirement.locations, manifest),
  ].join('\n')).join('\n');
}

function formatSources(rule, manifest) {
  if (!rule.sources?.length) return '';
  return [
    '## Based on',
    '',
    ...rule.sources.map((source) => [
      `- **Tier ${source.tier} — ${SOURCE_TIERS[source.tier]}:** ${source.reference}`,
      formatLocations(source.locations, manifest),
    ].join('\n')),
    '',
  ].join('\n');
}

function formatGapsAndArbitrations(rule) {
  const blocks = [];
  for (const gap of rule.gaps ?? []) {
    const revisions = gap.revisions?.map((revision) => `\`${revision}\``).join(', ');
    blocks.push([
      `:::note[Known gap${revisions ? `: ${revisions}` : ''}]`,
      gap.behavior,
      '',
      `Resolution: **${gap.resolution}**${gap.reference ? ` (${gap.reference})` : ''}.`,
      ':::',
    ].join('\n'));
  }
  for (const arbitration of rule.arbitrations ?? []) {
    const revisions = arbitration.revisions.map((revision) => `\`${revision}\``).join(', ');
    const upstream = arbitration.upstream ? `\n\nUpstream: [${arbitration.upstream}](${arbitration.upstream}).` : '';
    blocks.push([
      `:::note[${arbitration.status === 'proposed' ? 'Proposed arbitration' : 'Arbitration'}: ${revisions}]`,
      `**Conflict:** ${arbitration.conflict}`,
      '',
      `**Authority:** ${arbitration.authority}`,
      '',
      `**Behavior:** ${arbitration.behavior}`,
      '',
      `**Rationale:** ${arbitration.rationale}`,
      '',
      `**Review trigger:** ${arbitration.reviewTrigger}.${upstream}`,
      ':::',
    ].join('\n'));
  }
  if (!blocks.length) return '';
  return `## Gaps and arbitrations\n\n${blocks.join('\n\n')}\n\n`;
}

function fencedCode(text, language) {
  const runs = [...text.matchAll(/`+/g)].map((match) => match[0].length);
  const fence = '`'.repeat(Math.max(3, ...runs.map((length) => length + 1)));
  return `${fence}${language}\n${text}\n${fence}`;
}

function fixtureExample(rule, fixture) {
  const { absolute } = resolveFixturePath(fixture.path);
  const extension = fixture.path.split('.').at(-1);
  const value = extension === 'json'
    ? JSON.parse(readFileSync(absolute, 'utf8'))
    : parseYaml(absolute, `fixture ${fixture.path}`);
  const selected = resolvePointer(value, fixture.pointer, `${rule.id}, ${fixture.path}`);
  const serialized = extension === 'json'
    ? JSON.stringify(selected, null, 2)
    : YAML.stringify(selected).trimEnd();
  const type = fixture.path.startsWith('expected-valid/')
    ? 'Valid example'
    : fixture.path.startsWith('expected-warning/')
      ? 'Accepted with a warning'
      : fixture.path.startsWith('expected-invalid/')
        ? 'Invalid example'
        : 'Native projection fixture';
  const pointer = fixture.pointer === '' ? 'whole document' : `\`${fixture.pointer}\``;
  const fixtureSourcePath = fixture.path.startsWith('projection-fixtures/')
    ? posix.join(SPEC_PATH, fixture.path)
    : posix.join(SPEC_PATH, 'fixtures', fixture.path);
  const language = extension === 'json' ? 'json' : 'yaml';
  const example = fencedCode(serialized, language);
  const sourceLink = `[${fixture.path}](${sourceUrl(fixtureSourcePath)})`;

  if (fixture.pointer === '') {
    return `### ${type}\n\nSource: ${sourceLink} · Selected: ${pointer}\n\n<details>\n<summary>Show whole fixture</summary>\n\n${example}\n\n</details>\n`;
  }
  return `### ${type}\n\nSource: ${sourceLink} · Selected: ${pointer}\n\n${example}\n`;
}

function renderRule(rule, sourceFile, manifest) {
  const title = rule.summary.replace(/\s+/g, ' ').trim();
  const description = title.slice(0, 180);
  const sourcePath = posix.join(SPEC_PATH, 'validation', 'rules', sourceFile);
  const applicability = formatRevisionTable(rule.applicability);
  const fixtures = rule.fixtures.map((fixture) => fixtureExample(rule, fixture)).join('\n');
  const notes = rule.notes ? `## Notes\n\n${rule.notes}\n\n` : '';
  const sourceBlock = [
    '## Source record',
    '',
    `[` + sourceFile + `](${sourceUrl(sourcePath)}) at immutable tag [\`${TAG}\`](${sourceUrl(SPEC_PATH)}).`,
    '',
  ].join('\n');

  return [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `slug: docs/rules/${VERSION}/${rule.owner}/${ruleSlug(rule)}`,
    '---',
    '',
    `**Rule ID:** \`${rule.id}\`<br>`,
    `**Owner:** ${rule.owner}<br>`,
    `**Surface:** ${rule.surface}${rule.path ? ` · **Path:** \`${rule.path}\`` : ''}<br>`,
    `**Kind:** ${rule.kind}<br>`,
    `**Requirement:** ${rule.requirement ?? 'Not specified in the rule record'}<br>`,
    `**Status:** ${rule.status} · **Enforcement:** ${rule.enforcement}`,
    '',
    '## Revision applicability',
    '',
    applicability,
    '',
    '## Diagnostics',
    '',
    rule.diagnostics?.length
      ? ['| Code | Severity |', '| --- | --- |', ...rule.diagnostics.map(({ code, severity }) => `| \`${code}\` | **${severity}** |`)].join('\n')
      : 'This rule record declares no diagnostic codes.',
    '',
    '## Required by',
    '',
    formatSpecification(rule, manifest),
    '',
    formatSources(rule, manifest),
    formatGapsAndArbitrations(rule),
    notes,
    '## Examples',
    '',
    fixtures,
    sourceBlock,
  ].join('\n');
}

function renderRuleset(owner, rules) {
  const groups = new Map();
  for (const rule of rules) {
    const surface = rule.surface || 'Other';
    if (!groups.has(surface)) groups.set(surface, []);
    groups.get(surface).push(rule);
  }

  const sections = [...groups.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([surface, surfaceRules]) => [
    `## ${surface}`,
    '',
    ...surfaceRules.sort((left, right) => left.id.localeCompare(right.id)).map((rule) => {
      const revisions = REVISION_ORDER.filter((revision) => rule.applicability?.[revision] === 'applies')
        .map((revision) => `\`${revision}\``).join(', ') || 'none listed as applicable';
      const diagnostics = rule.diagnostics?.length
        ? rule.diagnostics.map(({ code, severity }) => `\`${code}\` (${severity})`).join(', ')
        : 'no diagnostic code';
      return `- [\`${rule.id}\`](${ruleSlug(rule)}) — ${rule.summary.replace(/\s+/g, ' ').trim()}<br>Severity: ${diagnostics} · Applies: ${revisions}`;
    }),
    '',
  ].join('\n'));
  const ownerInfo = RULE_OWNERS[owner];

  return [
    '---',
    `title: ${JSON.stringify(ownerInfo.title)}`,
    `description: ${JSON.stringify(ownerInfo.description)}`,
    `slug: docs/rules/${VERSION}/${owner}`,
    'sidebar:',
    `  label: ${ownerInfo.title} (${rules.length})`,
    '---',
    '',
    ownerInfo.description,
    '',
    `Rules in this set are attached to MCP Description ${VERSION}. See the [rules overview](/docs/rules/${VERSION}/) and [MCP revision guide](/docs/rules/${VERSION}/revisions).`,
    '',
    ...sections,
  ].join('\n');
}

function renderOverview(rules) {
  const ownerLinks = Object.entries(RULE_OWNERS).map(([owner, details]) => {
    const count = rules.filter((rule) => rule.owner === owner).length;
    return `- [${details.title}](/docs/rules/${VERSION}/${owner}/) — ${count} rules.`;
  }).join('\n');
  const example = [
    '```json',
    '{',
    '  "code": "schema-validation",',
    '  "severity": "error",',
    '  "message": "inputSchema must have an object root",',
    '  "path": ["tools", 0, "inputSchema"],',
    '  "rule": "mcp.tool.input-schema.object-root"',
    '}',
    '```',
  ].join('\n');

  return [
    '---',
    `title: Validation Rules ${VERSION}`,
    `description: Validation rule registry and protocol revision guidance for MCP Description ${VERSION}.`,
    `slug: docs/rules/${VERSION}`,
    'sidebar:',
    '  label: Overview',
    '  order: 0',
    '---',
    '',
    `These versioned pages document the validation rule registry published with [\`${TAG}\`](${sourceUrl(SPEC_PATH)}). Select the rules attached to a specification version; this set describes the 0.9.0 working draft, not stable 0.8.0.`,
    '',
    ':::caution[Working draft registry]',
    'This is a pilot registry implementing review-stage Proposal 0024. Its contents are non-normative until the proposal is accepted. Rule records explain ownership, applicability, evidence, and fixtures; they are not a separate conformance specification.',
    ':::',
    '',
    '## Implementation status',
    '',
    'The prerelease [`@mcpdesc/validator` 0.14.0-rc.1](https://www.npmjs.com/package/@mcpdesc/validator/v/0.14.0-rc.1) supports the rule registry. Native MCP projections are supported by the prerelease [`@mcpdesc/core` 0.13.0-rc.1](https://www.npmjs.com/package/@mcpdesc/core/v/0.13.0-rc.1). Both are npm `next` releases, not stable releases.',
    '',
    '## Rule ownership',
    '',
    'A rule has one owner: MCP protocol requirements, MCP Description requirements, or an embedded standard such as JSON Schema. The owner determines the authority for the behavior; external sources provide evidence and are ranked by source tier.',
    '',
    ownerLinks,
    '',
    '## Rule identity and diagnostics',
    '',
    'Each rule has a permanent identifier. Diagnostics use `code` for the detected condition and `rule` for the requirement that the rule checks. A code can be shared by multiple rules.',
    '',
    example,
    '',
    '## Requirements and severity',
    '',
    'The optional `requirement` field records the source requirement level (`must`, `should`, or `may`); it is distinct from diagnostic severity. Diagnostics declare `error` or `warning` severity. The source protocol revision determines how requirement levels are interpreted.',
    '',
    '## Protocol revision applicability',
    '',
    `MCP structures can differ by protocol revision. Each rule records its applicability across the five revisions listed in the [revision guide](/docs/rules/${VERSION}/revisions); an absent value is not inferred.`,
    '',
    '## Arbitrations, gaps, and fixtures',
    '',
    'Arbitrations document conflicts in authority and the selected behavior; proposed arbitrations are unresolved. Gaps identify known differences from validator behavior. Fixture examples link to the immutable source tag and show the fragment selected by each JSON Pointer. Warning fixtures are labeled as accepted with a warning.',
    '',
    `## Source\n\nCanonical source: [\`${REPO}\` at \`${TAG}\`](${sourceUrl(SPEC_PATH)}). The pinned MCP schema source manifest is [available here](${sourceUrl(posix.join(SPEC_PATH, 'validation/mcp-schemas/manifest.json'))}).`,
    '',
    `## MCP revision guide\n\nRead the [versioned revision guide](/docs/rules/${VERSION}/revisions) or [view its source at the tag](${sourceUrl(posix.join(SPEC_PATH, 'validation/mcp-revisions.md'))}).`,
    '',
    `## Rule records\n\nThe [rule JSON Schema](${sourceUrl(posix.join(SPEC_PATH, 'validation/rule.schema.json'))}) defines the registry fields. ${rules.length} rules are grouped into three owner-specific rulesets.`,
    '',
  ].join('\n');
}

function rewriteGuideLinks(markdown, sourcePath) {
  const sourceDirectory = posix.dirname(sourcePath);
  return markdown.replace(/\]\(([^)]+)\)/g, (whole, target) => {
    if (/^(https?:|mailto:|#)/.test(target)) return whole;
    const hashIndex = target.indexOf('#');
    const path = hashIndex === -1 ? target : target.slice(0, hashIndex);
    const fragment = hashIndex === -1 ? '' : target.slice(hashIndex);
    const normalized = posix.normalize(posix.join(sourceDirectory, path));
    return `](${sourceUrl(normalized, fragment)})`;
  });
}

function renderRevisionGuide() {
  const sourcePath = posix.join(SPEC_PATH, 'validation/mcp-revisions.md');
  const raw = readFileSync(join(REF_DIR, sourcePath), 'utf8').trimEnd();
  const body = rewriteGuideLinks(raw.replace(/^#\s+.*\r?\n+/, ''), sourcePath);
  return [
    '---',
    'title: MCP Revision Guide',
    `description: MCP protocol revision differences for MCP Description ${VERSION}.`,
    `slug: docs/rules/${VERSION}/revisions`,
    'sidebar:',
    '  order: 1',
    '---',
    '',
    `:::note[Mirrored guide]\nThis guide mirrors [\`${sourcePath}\`](${sourceUrl(sourcePath)}) from the immutable tag [\`${TAG}\`](${sourceUrl(SPEC_PATH)}). The upstream source wins if this page differs.\n:::`,
    '',
    body,
    '',
  ].join('\n');
}

function collectRules(validateRegistry, manifest) {
  const files = readdirSync(RULES_DIR).filter((file) => file.endsWith('.yaml') || file.endsWith('.yml')).sort();
  if (!files.length) fail(`No YAML rule records found in ${RULES_DIR}.`);

  const rules = [];
  const fileById = new Map();
  for (const file of files) {
    const filePath = join(RULES_DIR, file);
    const registry = parseYaml(filePath, `rule file ${file}`);
    if (!validateRegistry(registry)) {
      const errors = validateRegistry.errors.map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ');
      fail(`${file} does not match rule.schema.json: ${errors}`);
    }

    for (const rule of registry.rules) {
      if (!RULE_OWNERS[rule.owner]) fail(`${rule.id}: unsupported owner '${rule.owner}'.`);
      if (!rule.id.startsWith(`${rule.owner}.`)) fail(`${rule.id}: rule ID namespace does not match owner '${rule.owner}'.`);
      if (fileById.has(rule.id)) fail(`Duplicate rule ID '${rule.id}' in ${file} and ${fileById.get(rule.id)}.`);
      fileById.set(rule.id, file);

      for (const group of [...rule.specification, ...(rule.sources ?? [])]) {
        for (const location of group.locations) validateLocationExists(location, manifest, rule.id);
      }
      for (const fixture of rule.fixtures) {
        const { absolute } = resolveFixturePath(fixture.path);
        const extension = fixture.path.split('.').at(-1);
        const document = extension === 'json'
          ? JSON.parse(readFileSync(absolute, 'utf8'))
          : parseYaml(absolute, `fixture ${fixture.path}`);
        resolvePointer(document, fixture.pointer, `${rule.id}, ${fixture.path}`);
      }
      rules.push(rule);
    }
  }

  const ruleSlugs = new Set();
  for (const rule of rules) {
    const key = `${rule.owner}/${ruleSlug(rule)}`;
    if (ruleSlugs.has(key)) fail(`Rule page slug collision at '${key}'.`);
    ruleSlugs.add(key);
  }

  return { rules, fileById };
}

function buildRequirementMarkers(rules, specPages) {
  const markersByPage = new Map();
  for (const rule of rules) {
    for (const requirement of rule.specification) {
      for (const location of requirement.locations) {
        const match = location.match(/^sections\/(\d\d-.+\.md)#(req-[a-z0-9-]+)$/);
        if (!match) continue;
        const slug = SECTION_SLUGS.get(match[1]);
        const pagePath = join(SPEC_DOCS_DIR, `${slug}.md`);
        if (!existsSync(pagePath)) fail(`${rule.id}: imported specification page is missing for '${location}'. Run import-spec first.`);
        const anchor = match[2];
        const markdown = specPages.get(pagePath) ?? readFileSync(pagePath, 'utf8');
        const anchorPattern = new RegExp(`<a id="${escapeRegExp(anchor)}"></a>`, 'g');
        if ([...markdown.matchAll(anchorPattern)].length !== 1) {
          fail(`${rule.id}: requirement anchor '${anchor}' must occur exactly once in imported page ${slug}.md.`);
        }
        if (!markersByPage.has(pagePath)) markersByPage.set(pagePath, new Map());
        const pageAnchors = markersByPage.get(pagePath);
        if (!pageAnchors.has(anchor)) pageAnchors.set(anchor, new Map());
        pageAnchors.get(anchor).set(rule.id, rule);
      }
    }
  }

  for (const [pagePath, anchors] of markersByPage) {
    let markdown = (specPages.get(pagePath) ?? readFileSync(pagePath, 'utf8'))
      .replace(/<span class="mcpdesc-rule-links" data-anchor="[^"]+">[\s\S]*?<\/span>/g, '');
    for (const [anchor, rulesForAnchor] of anchors) {
      const links = [...rulesForAnchor.values()].sort((left, right) => left.id.localeCompare(right.id))
        .map((rule) => `<a href="${ruleUrl(rule)}">${rule.id}</a>`).join(', ');
      const marker = `<span class="mcpdesc-rule-links" data-anchor="${anchor}"><small>Checked by: ${links}</small></span>`;
      const anchorPattern = new RegExp(`(<a id="${escapeRegExp(anchor)}"></a>)`);
      markdown = markdown.replace(anchorPattern, `$1 ${marker}`);
    }
    specPages.set(pagePath, markdown);
  }
  return specPages;
}

function createGeneratedPages(rules, fileById, manifest) {
  const pages = new Map();
  pages.set(join(VERSION_DOCS_DIR, 'index.md'), renderOverview(rules));
  pages.set(join(VERSION_DOCS_DIR, 'revisions.md'), renderRevisionGuide());

  for (const [owner] of Object.entries(RULE_OWNERS)) {
    const ownerRules = rules.filter((rule) => rule.owner === owner);
    const ownerDirectory = join(VERSION_DOCS_DIR, owner);
    pages.set(join(ownerDirectory, 'index.md'), renderRuleset(owner, ownerRules));
    for (const rule of ownerRules) {
      const file = fileById.get(rule.id);
      pages.set(join(ownerDirectory, `${ruleSlug(rule)}.md`), renderRule(rule, file, manifest));
    }
  }
  return pages;
}

function writePages(pages) {
  if (existsSync(VERSION_DOCS_DIR) && !options.force) {
    fail(`Output already exists: ${VERSION_DOCS_DIR}. Use --force to replace generated pages for this version.`);
  }
  if (existsSync(VERSION_DOCS_DIR)) rmSync(VERSION_DOCS_DIR, { recursive: true, force: true });
  for (const [path, content] of pages) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, 'utf8');
  }
}

try {
  verifyTag();
  const manifestPath = join(VALIDATION_DIR, 'mcp-schemas', 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (!manifest.commit || manifest.modified !== false) {
    fail('MCP schema manifest must identify an unmodified pinned commit.');
  }

  const schema = JSON.parse(readFileSync(join(VALIDATION_DIR, 'rule.schema.json'), 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validateRegistry = ajv.compile(schema);
  const { rules, fileById } = collectRules(validateRegistry, manifest);
  const pages = createGeneratedPages(rules, fileById, manifest);
  const specPages = buildRequirementMarkers(rules, new Map());

  writePages(pages);
  for (const [path, content] of specPages) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, 'utf8');
  }

  console.log(
    `Imported ${rules.length} rules from ${filesCount()} YAML files at ${REPO}@${TAG} into ${VERSION_DOCS_DIR}.`,
  );
  console.log(`Added requirement links to ${specPages.size} mirrored specification page(s).`);
  console.log('Update the /docs/rules latest redirect and sidebar entry when publishing a new rules version.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

function filesCount() {
  return readdirSync(RULES_DIR).filter((file) => file.endsWith('.yaml') || file.endsWith('.yml')).length;
}