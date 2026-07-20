// Typed analytics contract for the mcpdesc.org site.
// UI code must call `analytics.track(...)` only — never `window.plausible` directly.

export type AnalyticsEventName =
  // Group A: sent by the website today.
  | 'outbound_link_clicked'
  | 'campaign_cta_clicked'
  // Group C: reserved for future editor events, not currently sent.
  | 'editor_opened'
  | 'example_loaded'
  | 'file_imported'
  | 'document_parsed'
  | 'validation_completed'
  | 'export_clicked'
  | 'copy_clicked';

export type AnalyticsScalar = string | number | boolean | undefined;

export type AnalyticsProps = Record<string, AnalyticsScalar>;

export interface AnalyticsProvider {
  init(): void;
  track(eventName: AnalyticsEventName, props?: AnalyticsProps): void;
}
