import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { buildDocsNavigation, flattenDocsNavigation, latestDocsVersion, versionFromPath } from './lib/docs-navigation';

export const onRequest = defineMiddleware(async (context) => {
  const version = versionFromPath(context.url.pathname) ?? latestDocsVersion;
  const sidebar = buildDocsNavigation(await getCollection('docs'), version, context.url.pathname);
  const route = context.locals.starlightRoute;
  route.sidebar = sidebar;
  const links = flattenDocsNavigation(sidebar);
  const current = links.findIndex((entry) => entry.isCurrent);
  route.pagination = {
    prev: current > 0 ? links[current - 1] : undefined,
    next: current >= 0 ? links[current + 1] : undefined,
  };
});