import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    // Optional shorter/alternate title shown in the blog index (table of contents).
    // Falls back to `title` when not set.
    listTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Stève Sfartz'),
    draft: z.boolean().default(false),
  }),
});

const catalog = defineCollection({
  loader: glob({ base: './tools', pattern: 'catalog.yaml' }),
  schema: z.object({
    toc: z.array(z.string()),
  }),
});

const toolCategories = defineCollection({
  loader: glob({ base: './tools', pattern: 'categories.yaml' }),
  schema: z.object({
    categories: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    })),
  }),
});

// The tools catalog is data-driven: one YAML file per tool under tools/.
// Filename = the tool id (<owner>-<repo> or mcpdesc-<slug>).
// Tool IDs always contain at least one dash, so the glob *-*.yaml naturally excludes
// catalog.yaml. The display order is controlled by tools/catalog.yaml.
// Categories are coarse, goal-oriented buckets defined in tools/categories.yaml.
// creation=produce a description, testing=validate/lint/test/diff,
// documentation=generate readable output, hosting=serve/proxy at runtime.
const TOOL_CATEGORIES = ['creation', 'documentation', 'hosting', 'testing'] as const;

// Language set follows the awesome-mcp-devtools SDK legend.
const TOOL_LANGUAGES = [
  'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'Kotlin', 'C#',
  'Scala', 'Dart', 'Ruby', 'Elixir', 'C/C++', 'Swift', 'Bash', 'Common Lisp',
] as const;

// Package registries where a tool is published — each entry has a name and a package URL.
const TOOL_REGISTRIES = [
  'npm', 'PyPI', 'crates.io', 'Go', 'Maven', 'NuGet', 'RubyGems', 'Hex', 'pub.dev',
] as const;

const tools = defineCollection({
  loader: glob({ base: './tools', pattern: '**/*-*.yaml' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    tagline: z.string(),
    categories: z.array(z.enum(TOOL_CATEGORIES)).default([]),
    languages: z.array(z.enum(TOOL_LANGUAGES)).default([]),
    registries: z.preprocess(
      (v) => v ?? [],
      z.array(z.object({ name: z.enum(TOOL_REGISTRIES), url: z.url() }))
    ).default([]),
    status: z.enum(['Available', 'Planned', 'Exploration', 'Coming soon']),
    href: z.string().optional(),
    outbound: z.boolean().default(false),
    // entrypoint: the canonical landing URL for this specific tool — may be a deep README
    // path in a monorepo, a dedicated website, or an npm page. Distinct from repoUrl
    // (the root repo). Optional; when absent, href serves as the effective entry point.
    entrypoint: z.string().optional(),
    // visibility controls whether the card appears in production.
    // 'public' = visible; 'draft' = dev-only (for review before publishing).
    visibility: z.enum(['draft', 'public']).default('public'),
    // Records-only metadata below (never rendered on the site).
    repoUrl: z.url().optional(),
    badge: z.boolean().default(false),
    specVersions: z.array(z.string()).optional(),
    license: z.string().optional(),
    contact: z.object({ name: z.string(), email: z.email() }).optional(),
    added: z.coerce.date().optional(),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  blog,
  catalog,
  toolCategories,
  tools,
};
