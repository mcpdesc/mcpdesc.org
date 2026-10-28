import type { CollectionEntry } from 'astro:content';
import manifest from '../../public/specification/index.json';

export const docsVersions = [...manifest.versions].sort((left, right) => {
  const rank = (channel: string) => channel === 'stable' ? 0 : channel === 'candidate' ? 2 : 1;
  return rank(left.channel) - rank(right.channel) || right.version.localeCompare(left.version, 'en', { numeric: true });
}).map((version) => ({
  version: version.version,
  label: version.channel === 'candidate'
    ? 'Draft'
    : `Version ${version.version}${version.channel === 'stable' ? ' (Latest)' : ''}`,
}));
export const latestDocsVersion = manifest.stable;
export type DocsSidebar = App.Locals['starlightRoute']['sidebar'];

export function versionFromPath(path: string) {
  return docsVersions.find(({ version }) =>
    path === `/docs/specification/${version}` || path.startsWith(`/docs/specification/${version}/`) ||
    path === `/docs/rules/${version}` || path.startsWith(`/docs/rules/${version}/`),
  )?.version;
}

export function buildDocsNavigation(entries: CollectionEntry<'docs'>[], version: string, pathname: string): DocsSidebar {
  const link = (entry: CollectionEntry<'docs'>): DocsSidebar[number] => ({
    type: 'link',
    label: entry.data.sidebar?.label ?? entry.data.title,
    href: `/${entry.id}/`,
    isCurrent: pathname.replace(/\/$/, '') === `/${entry.id}`,
    badge: undefined,
    attrs: {},
  });
  const group = (label: string, pages: CollectionEntry<'docs'>[]): DocsSidebar[number] => ({
    type: 'group', label, entries: pages.map(link), collapsed: label === 'Guides', badge: undefined,
  });
  const ordered = (pages: CollectionEntry<'docs'>[]) => pages.sort((left, right) =>
    (left.data.sidebar?.order ?? 50) - (right.data.sidebar?.order ?? 50) || left.id.localeCompare(right.id),
  );
  const specPrefix = `docs/specification/${version}`;
  const specifications = ordered(entries.filter((entry) =>
    entry.id === specPrefix || (entry.id.startsWith(`${specPrefix}/`) &&
      !entry.id.includes('/guides') && !entry.id.includes('/migration-')),
  ));
  const sidebar: DocsSidebar = [];
  const shared = ['docs', 'docs/getting-started', 'docs/add-a-tool', 'docs/terminology',
    'docs/using-with-ai', 'docs/governance', 'docs/attribution', 'docs/privacy', 'docs/faq'];
  sidebar.push(group('MCP Description', shared.flatMap((id) => entries.filter((entry) => entry.id === id))));
  if (version !== '0.7.0') {
    const guides = ordered(entries.filter((entry) => entry.id.startsWith(`${specPrefix}/guides`) ||
      (entry.id.startsWith(`${specPrefix}/`) && entry.id.includes('/migration-'))));
    if (guides.length) sidebar.push(group('Guides', guides));
  }
  const rulesPrefix = `docs/rules/${version}`;
  const rules = entries.filter((entry) => entry.id === rulesPrefix || entry.id.startsWith(`${rulesPrefix}/`));
  if (rules.length) {
    const owners: DocsSidebar = ['mcp', 'mcpdesc', 'json-schema'].map((owner) => {
      const ownerPrefix = `${rulesPrefix}/${owner}`;
      const ownerRules = rules.filter((entry) => entry.id.startsWith(`${ownerPrefix}/`));
      const surfaces = [...new Set(ownerRules.map((entry) => entry.data.ruleSurface ?? 'Other'))].sort();
      return {
        type: 'group', label: owner === 'mcp' ? 'MCP' : owner === 'mcpdesc' ? 'MCP Description' : 'JSON Schema',
        entries: [
          ...rules.filter((entry) => entry.id === ownerPrefix).map(link),
          ...surfaces.map((surface) => ({
            ...group(surface, ordered(ownerRules.filter((entry) => (entry.data.ruleSurface ?? 'Other') === surface))),
            collapsed: true,
          })),
        ],
        collapsed: true, badge: undefined,
      };
    });
    sidebar.push({
      type: 'group', label: 'Validation Rules', collapsed: true, badge: undefined,
      entries: [...ordered(rules.filter((entry) => entry.id === rulesPrefix || entry.id === `${rulesPrefix}/revisions`)).map(link), ...owners],
    });
  }
  if (specifications.length) sidebar.push(group('Specifications', specifications));
  return sidebar;
}

export function flattenDocsNavigation(sidebar: DocsSidebar): Extract<DocsSidebar[number], { type: 'link' }>[] {
  return sidebar.flatMap((entry) => entry.type === 'link' ? [entry] : flattenDocsNavigation(entry.entries));
}