import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

test('rewrites section-title and requirement links after removing duplicate headings', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'mcpdesc-import-spec-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'scripts'));
  copyFileSync(join(dirname(fileURLToPath(import.meta.url)), 'import-spec.mjs'), join(root, 'scripts/import-spec.mjs'));
  const sections = join(root, 'ref/mcpdesc-specification/spec/draft/sections');
  mkdirSync(sections, { recursive: true });
  writeFileSync(join(sections, '01-first.md'), [
    '## 1. First',
    '',
    '[This section](#1-first)',
    '[Second section](#2-second)',
    '[Requirement](#req-second)',
    '[Subsection](#21-detail)',
    '[Local requirement](#req-first)',
    '<a id="req-first"></a>First requirement.',
    '',
  ].join('\n'));
  writeFileSync(join(sections, '02-second.md'), [
    '## 2. Second',
    '',
    '### 2.1 Detail',
    '',
    '<a id="req-second"></a>Second requirement.',
    '',
  ].join('\n'));
  const result = spawnSync(process.execPath, [join(root, 'scripts/import-spec.mjs'), '0.9.0-rc.3'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const first = readFileSync(join(root, 'src/content/docs/docs/specification/0.9.0-rc.3/first.md'), 'utf8');
  assert.ok(!first.includes('## 1. First'));
  assert.ok(first.includes('[This section](/docs/specification/0.9.0-rc.3/first)'));
  assert.ok(first.includes('[Second section](/docs/specification/0.9.0-rc.3/second)'));
  assert.ok(first.includes('[Requirement](/docs/specification/0.9.0-rc.3/second#req-second)'));
  assert.ok(first.includes('[Subsection](/docs/specification/0.9.0-rc.3/second#21-detail)'));
  assert.ok(first.includes('[Local requirement](#req-first)'));
  assert.ok(first.includes('<a id="req-first"></a>First requirement.'));
  const second = readFileSync(join(root, 'src/content/docs/docs/specification/0.9.0-rc.3/second.md'), 'utf8');
  assert.ok(second.includes('### 2.1 Detail'));
  assert.ok(second.includes('<a id="req-second"></a>Second requirement.'));
});
