import type {
  AnalyticsEventName,
  AnalyticsProps,
  AnalyticsProvider,
} from '../analytics.types';
import { sanitizeAnalyticsProps } from '../events';

/**
 * Plausible provider. The Plausible script itself is injected by the
 * Analytics.astro component for production builds; this provider only forwards
 * safe, sanitized custom events to `window.plausible`.
 *
 * Analytics must never break the site, so every call is failure-tolerant.
 */
export class PlausibleAnalyticsProvider implements AnalyticsProvider {
  private initialized = false;

  init(): void {
    if (this.initialized) return;
    this.initialized = true;
  }

  track(eventName: AnalyticsEventName, props: AnalyticsProps = {}): void {
    try {
      if (typeof window === 'undefined') return;
      if (!window.plausible) return;

      const sanitized = sanitizeAnalyticsProps(props);
      window.plausible(eventName, { props: sanitized });
    } catch {
      // Analytics must never break the site.
    }
  }
}
