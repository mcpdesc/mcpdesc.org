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
const PROTOCOL_VERSION_ORDER = ['2024-11-05', '2025-03-26', '2025-06-18', '2025-11-25', '2026-07-28'];
const RULE_OWNERS = {
  mcp: { label: 'MCP' },
  'json-schema': { label: 'JSON Schema' },
  mcpdesc: { label: 'mcpdesc' },
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

const FIXTURE_ROOTS = ['projection-fixtures/', 'view-fixtures/', 'serialization-fixtures/'];

function fixtureSourcePath(fixturePath) {
  return FIXTURE_ROOTS.some((root) => fixturePath.startsWith(root)) ? fixturePath : join('fixtures', fixturePath);
}

function resolveFixturePath(fixturePath) {
  const absolute = ensureInside(SOURCE_DIR, fixtureSourcePath(fixturePath), 'Fixture path');
  if (!existsSync(absolute)) fail(`Fixture not found: ${fixturePath}`);
  return { absolute };
}

// Serialization fixtures are deliberately malformed YAML; they are shown verbatim, never parsed.
function readFixture(rule, fixture) {
  const { absolute } = resolveFixturePath(fixture.path);
  const extension = fixture.path.split('.').at(-1);
  const language = extension === 'json' ? 'json' : 'yaml';
  if (fixture.path.startsWith('serialization-fixtures/')) {
    if (fixture.pointer !== '') fail(`${rule.id}, ${fixture.path}: serialization fixtures must select the whole document.`);
    return { language, text: readFileSync(absolute, 'utf8').trimEnd() };
  }
  const value = extension === 'json'
    ? JSON.parse(readFileSync(absolute, 'utf8'))
    : parseYaml(absolute, `fixture ${fixture.path}`);
  const selected = resolvePointer(value, fixture.pointer, `${rule.id}, ${fixture.path}`);
  return { language, text: extension === 'json' ? JSON.stringify(selected, null, 2) : YAML.stringify(selected).trimEnd() };
}

const FIXTURE_LABELS = [
  ['projection-fixtures/', { passes: 'Projection succeeds', error: 'Projection fails' }],
  ['view-fixtures/merge-', { passes: 'Merge succeeds', error: 'Merge fails' }],
  ['view-fixtures/', { passes: 'View succeeds', error: 'View fails' }],
  ['serialization-fixtures/', { passes: 'Decoding accepts', error: 'Decoding rejects' }],
  ['', { passes: 'Valid example', warning: 'Accepted with a warning', error: 'Invalid example', 'not-applicable': 'Rule not applicable' }],
];

function fixtureLabel(rule, fixture) {
  const [, labels] = FIXTURE_LABELS.find(([prefix]) => fixture.path.startsWith(prefix));
  const label = labels[fixture.outcome];
  if (!label) fail(`${rule.id}, ${fixture.path}: unsupported outcome '${fixture.outcome}' for this fixture kind.`);
  return label;
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

function headingSlug(text) {
  return text.trim().toLowerCase().replace(/`/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function ruleSlug(rule) {
  return rule.id.slice(rule.owner.length + 1).replaceAll('.', '-');
}

function ruleUrl(rule) {
  return `/docs/rules/${VERSION}/${rule.owner}/${ruleSlug(rule)}`;
}

function formatProtocolVersionTable(applicability) {
  return [
    `| ${PROTOCOL_VERSION_ORDER.map((version) => `\`${version}\``).join(' | ')} |`,
    `| ${PROTOCOL_VERSION_ORDER.map(() => '---').join(' | ')} |`,
    `| ${PROTOCOL_VERSION_ORDER.map((version) => applicability[version]).join(' | ')} |`,
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
    const protocolVersions = gap.protocolVersions?.map((version) => `\`${version}\``).join(', ');
    blocks.push([
      `:::note[Known gap${protocolVersions ? `: ${protocolVersions}` : ''}]`,
      gap.behavior,
      '',
      `Resolution: **${gap.resolution}**${gap.reference ? ` (${gap.reference})` : ''}.`,
      ':::',
    ].join('\n'));
  }
  for (const arbitration of rule.arbitrations ?? []) {
    const protocolVersions = arbitration.protocolVersions.map((version) => `\`${version}\``).join(', ');
    const upstream = arbitration.upstream ? `\n\nUpstream: [${arbitration.upstream}](${arbitration.upstream}).` : '';
    blocks.push([
      `:::note[${arbitration.status === 'proposed' ? 'Proposed arbitration' : 'Arbitration'}: ${protocolVersions}]`,
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
  const { language, text } = readFixture(rule, fixture);
  const type = fixtureLabel(rule, fixture);
  const pointer = fixture.pointer === '' ? 'whole document' : `\`${fixture.pointer}\``;
  const example = fencedCode(text, language);
  const sourceLink = `[${fixture.path}](${sourceUrl(posix.join(SPEC_PATH, fixtureSourcePath(fixture.path)))})`;
  const note = fixture.outcome === 'not-applicable'
    ? 'The rule does not run on this fragment for any MCP protocol version it applies to.\n\n' : '';

  if (fixture.pointer === '' && !fixture.path.startsWith('serialization-fixtures/')) {
    return `### ${type}\n\n${note}Source: ${sourceLink} · Selected: ${pointer}\n\n<details>\n<summary>Show whole fixture</summary>\n\n${example}\n\n</details>\n`;
  }
  return `### ${type}\n\n${note}Source: ${sourceLink} · Selected: ${pointer}\n\n${example}\n`;
}

function renderRule(rule, sourceFile, manifest) {
  if (!rule.title || !rule.description) {
    fail(`${rule.id}: record lacks title/description; this importer supports rule format 1.1.0 and later (draft.3 onward).`);
  }
  const description = rule.description.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim().slice(0, 180);
  const sourcePath = posix.join(SPEC_PATH, 'validation', 'rules', sourceFile);
  const protocolVersions = rule.applicability?.protocolVersions;
  const applicability = protocolVersions && protocolVersions !== 'independent'
    ? `## Protocol version applicability\n\n${formatProtocolVersionTable(protocolVersions)}\n\n` : '';
  const details = [
    `**Rule ID:** \`${rule.id}\``,
    `**Owner:** ${rule.owner}`,
    `**Surface:** ${rule.surface}${rule.path ? ` · **Path:** \`${rule.path}\`` : ''}`,
    `**Kind:** ${rule.kind}`,
    `**Requirement level:** ${rule.requirement ?? 'Not specified in the rule record'}`,
    ...(protocolVersions === 'independent' ? ['**Protocol versions:** independent of the MCP protocol version'] : []),
    ...(rule.applicability?.schemaDialects?.length
      ? [`**JSON Schema dialects:** ${rule.applicability.schemaDialects.map((dialect) => `\`${dialect}\``).join(', ')}`] : []),
    ...(rule.documentSchema?.length
      ? [`**Document schema locations:** ${rule.documentSchema.map((pointer) => `\`${pointer}\``).join(', ')}`] : []),
    `**Status:** ${rule.status} · **Enforcement:** ${rule.enforcement}`,
  ].join('<br>\n');
  const retired = rule.status === 'retired'
    ? ':::caution[Retired rule]\nThis record is retired in this catalog and is excluded from active checks.\n:::\n\n' : '';
  const outcomeOrder = ['passes', 'warning', 'error', 'not-applicable'];
  const fixtures = [...rule.fixtures]
    .sort((left, right) => outcomeOrder.indexOf(left.outcome) - outcomeOrder.indexOf(right.outcome))
    .map((fixture) => fixtureExample(rule, fixture)).join('\n');
  const notes = rule.notes ? `## Notes\n\n${rule.notes}\n\n` : '';
  const sourceBlock = [
    '## Rule Source Code',
    '',
    `[` + sourceFile + `](${sourceUrl(sourcePath)}) at immutable tag [\`${TAG}\`](${sourceUrl(SPEC_PATH)}).`,
    '',
  ].join('\n');

  return [
    '---',
    `title: ${JSON.stringify(rule.title)}`,
    `description: ${JSON.stringify(description)}`,
    `slug: docs/rules/${VERSION}/${rule.owner}/${ruleSlug(rule)}`,
    'sidebar:',
    `  label: ${JSON.stringify(rule.id)}`,
    '---',
    '',
    rewriteGuideLinks(rule.description.trim(), posix.join(SPEC_PATH, 'rule-description.md')),
    '',
    retired.trimEnd(),
    '## Requirement',
    '',
    rule.summary,
    '',
    '## Details',
    '',
    details,
    '',
    applicability.trimEnd(),
    ...(rule.diagnostics?.length ? [
      '## Diagnostics',
      '',
      ['| Code | Severity |', '| --- | --- |', ...rule.diagnostics.map(({ code, severity }) => `| \`${code}\` | **${severity}** |`)].join('\n'),
      '',
    ] : []),
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

function renderOverview(rules, unchecked) {
  const ownerLinks = [
    ...Object.entries(RULE_OWNERS).map(([owner, details]) => {
      const count = rules.filter((rule) => rule.owner === owner).length;
      return `- **${details.label}** — ${count} ${count === 1 ? 'rule' : 'rules'}.`;
    }),
    ...(unchecked ? [`- [**Unchecked requirements**](/docs/rules/${VERSION}/unchecked) — ${unchecked.length} normative requirements that no rule checks, with the reason.`] : []),
  ].join('\n');
  const sourcePath = posix.join(SPEC_PATH, 'validation/README.md');
  const overviewSource = readFileSync(join(REF_DIR, sourcePath), 'utf8');
  const startMarker = '<!-- mcpdesc:validation-overview:start -->';
  const endMarker = '<!-- mcpdesc:validation-overview:end -->';
  if (!overviewSource.includes(startMarker) || !overviewSource.includes(endMarker)) {
    fail('The source README must contain validation overview markers.');
  }
  const parts = overviewSource.split(startMarker);
  if (parts.length !== 2 || parts[1].split(endMarker).length !== 2 || parts[0].includes(endMarker)) {
    fail('Expected exactly one correctly ordered validation overview marker pair.');
  }
  const excerpt = parts[1].split(endMarker)[0].trim();
  if (!excerpt) fail('The marked validation overview is empty.');
  const readmeUrl = sourceUrl(sourcePath);
  const headingSlugs = new Set([...excerpt.matchAll(/^#{1,6}\s+(.*)$/gm)].map((heading) => headingSlug(heading[1])));
  const resolved = rewriteGuideLinks(excerpt, sourcePath).replace(/\]\(#([^)]+)\)/g,
    (whole, anchor) => (headingSlugs.has(anchor) ? whole : `](${readmeUrl}#${anchor})`));
  const protocolGuide = 'understanding-mcp-protocol-versions';
  const guidance = existsSync(join(SPEC_DOCS_DIR, 'guides', `${protocolGuide}.md`))
    ? `- [How MCP protocol versions are managed](/docs/specification/${VERSION}/guides/${protocolGuide})` : '';
  return [
    '---',
    'title: Validation Rules',
    `description: Validation rules and troubleshooting for MCP Description ${VERSION}.`,
    `slug: docs/rules/${VERSION}`,
    'sidebar:',
    '  label: Overview',
    '  order: 0',
    '---',
    '',
    resolved,
    '',
    '## Browse by owner',
    '',
    ownerLinks,
    '',
    ...(guidance ? ['## Protocol version guidance', '', guidance, ''] : []),
    ':::note[Mirrored overview]',
    `This overview mirrors the marked excerpt in [the source README](${sourceUrl(sourcePath)})`,
    `at immutable tag [\`${TAG}\`](${sourceUrl(SPEC_PATH)}). Upstream wins if this copy differs.`,
    ':::',
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
    const sectionPrefix = `${SPEC_PATH}/sections/`;
    if (normalized.startsWith(sectionPrefix)) {
      const slug = SECTION_SLUGS.get(normalized.slice(sectionPrefix.length));
      if (slug && existsSync(join(SPEC_DOCS_DIR, `${slug}.md`))) {
        return `](/docs/specification/${VERSION}/${slug}${fragment})`;
      }
    }
    const localGuides = new Map([
      [posix.join(SPEC_PATH, 'validation/README.md'), `/docs/rules/${VERSION}/`],
    ]);
    const local = localGuides.get(normalized);
    if (local) return `](${local}${fragment})`;
    const guidePrefix = `${SPEC_PATH}/guides/`;
    if (normalized.startsWith(guidePrefix) && normalized.endsWith('.md')) {
      const guide = normalized.slice(guidePrefix.length, -3);
      if (existsSync(join(SPEC_DOCS_DIR, 'guides', `${guide}.md`))) {
        return `](/docs/specification/${VERSION}/guides/${guide === 'intro' ? '' : guide}${fragment})`;
      }
    }
    return `](${sourceUrl(normalized, fragment)})`;
  });
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
      for (const fixture of rule.fixtures) readFixture(rule, fixture);
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
      .replace(/[ \t]*<span class="mcpdesc-rule-links" data-anchor="[^"]+">[\s\S]*?<\/span>/g, '');
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

function collectUnchecked(ajv, schema) {
  const path = join(VALIDATION_DIR, 'unchecked-requirements.yaml');
  if (!existsSync(path)) return undefined;
  const registry = parseYaml(path, 'unchecked-requirements.yaml');
  const validate = ajv.getSchema(`${schema.$id}#/$defs/unchecked-requirements`);
  if (!validate) fail('rule.schema.json does not define #/$defs/unchecked-requirements.');
  if (!validate(registry)) {
    fail(`unchecked-requirements.yaml does not match rule.schema.json: ${validate.errors.map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ')}`);
  }
  return registry.uncheckedRequirements.map((item) => {
    const [, file, anchor] = item.location.match(/^sections\/(\d\d-.+\.md)#(req-[a-z0-9-]+)$/);
    const slug = SECTION_SLUGS.get(file);
    const pagePath = join(SPEC_DOCS_DIR, `${slug}.md`);
    if (!slug || !existsSync(pagePath)) fail(`Unchecked requirement '${item.location}': imported specification page is missing. Run import-spec first.`);
    const markdown = readFileSync(pagePath, 'utf8');
    if ([...markdown.matchAll(new RegExp(`<a id="${escapeRegExp(anchor)}"></a>`, 'g'))].length !== 1) {
      fail(`Unchecked requirement '${item.location}': anchor must occur exactly once in ${slug}.md.`);
    }
    const title = markdown.match(/^title:\s*(.+)$/m)?.[1].replace(/^"|"$/g, '') ?? slug;
    return { ...item, slug, anchor, title };
  });
}

const UNCHECKED_REASONS = {
  runtime: 'Runtime behavior of MCP clients, servers, or consumers',
  processing: 'Behavior of MCP Description tools that document fixtures cannot show',
  guidance: 'An authoring choice the document cannot decide',
};

function renderUnchecked(unchecked) {
  const sections = [...new Map([...unchecked].sort((left, right) => left.location.localeCompare(right.location))
    .map((item) => [item.slug, item.title])).entries()];
  const counts = Object.keys(UNCHECKED_REASONS).map((reason) => [reason, unchecked.filter((item) => item.reason === reason).length]);
  return [
    '---',
    'title: Unchecked Requirements',
    `description: Normative MCP Description ${VERSION} requirements that no validation rule checks, and why.`,
    `slug: docs/rules/${VERSION}/unchecked`,
    'sidebar:',
    '  label: Unchecked requirements',
    '  order: 1',
    '---',
    '',
    `${unchecked.length} normative requirements are not checked by any validation rule. Each entry links to the requirement and states why validation cannot check it.`,
    '',
    '| Reason | Meaning | Requirements |',
    '| --- | --- | --- |',
    ...counts.map(([reason, count]) => `| \`${reason}\` | ${UNCHECKED_REASONS[reason]} | ${count} |`),
    '',
    ...sections.flatMap(([slug, title]) => [
      `## ${title}`,
      '',
      ...unchecked.filter((item) => item.slug === slug).map((item) =>
        `- [\`${item.anchor}\`](/docs/specification/${VERSION}/${slug}#${item.anchor}) · **${item.reason}** — ${item.note.replace(/\s+/g, ' ').trim()}`),
      '',
    ]),
    `Source: [\`validation/unchecked-requirements.yaml\`](${sourceUrl(posix.join(SPEC_PATH, 'validation/unchecked-requirements.yaml'))}) at immutable tag [\`${TAG}\`](${sourceUrl(SPEC_PATH)}).`,
    '',
  ].join('\n');
}

function createGeneratedPages(rules, fileById, manifest, unchecked) {
  const pages = new Map();
  pages.set(join(VERSION_DOCS_DIR, 'index.md'), renderOverview(rules, unchecked));
  if (unchecked) pages.set(join(VERSION_DOCS_DIR, 'unchecked.md'), renderUnchecked(unchecked));

  for (const [owner] of Object.entries(RULE_OWNERS)) {
    const ownerRules = rules.filter((rule) => rule.owner === owner);
    const ownerDirectory = join(VERSION_DOCS_DIR, owner);
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
  const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
  const validateRegistry = ajv.compile(schema);
  const { rules, fileById } = collectRules(validateRegistry, manifest);
  const unchecked = collectUnchecked(ajv, schema);
  const pages = createGeneratedPages(rules, fileById, manifest, unchecked);
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