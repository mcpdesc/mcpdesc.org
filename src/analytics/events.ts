import type { AnalyticsProps } from './analytics.types';

// Only these keys are ever allowed to leave the browser.
// Everything else is dropped. This is the privacy backstop for the whole site.
const ALLOWED_KEYS = new Set([
  // --- Group A: sent by the website today ---
  'page_type', // which kind of page a click came from (home, editor landing, docs, blog)
  'cta_id', // which call-to-action button was clicked (e.g. open_editor)
  'outbound_target', // bucketed outbound destination category (github, npm, docs, ...)
  'utm_source', // campaign attribution: where the visit originated
  'utm_medium', // campaign attribution: channel (e.g. blog, social)
  'utm_campaign', // campaign attribution: named campaign

  // --- Group C: reserved for future editor events, NOT currently sent ---
  // No code in this repo or the hosted editor emits these yet. They are kept
  // here so instrumentation is ready if/when the editor gains opt-out events.
  'schema_version',
  'input_format',
  'output_format',
  'valid',
  'error_count_bucket',
  'example_id',
  'size_bucket',
  'copy_format',
  'app_version',
]);

/**
 * Reduce arbitrary props to a safe, allow-listed set of scalar values.
 * - Drops any key not explicitly allowed.
 * - Drops null/undefined values.
 * - Truncates long strings.
 * - Never forwards raw document content, URLs, or identifiers.
 */
export function sanitizeAnalyticsProps(
  props: AnalyticsProps = {},
): Record<string, string | number | boolean> {
  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(props)) {
    if (!ALLOWED_KEYS.has(key)) continue;
    if (value === undefined || value === null) continue;

    if (typeof value === 'string') {
      sanitized[key] = value.slice(0, 80);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
