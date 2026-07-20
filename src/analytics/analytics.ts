import type { AnalyticsEventName, AnalyticsProps } from './analytics.types';
import type { AnalyticsProvider } from './analytics.types';
import { noopAnalyticsProvider } from './providers/noop.provider';
import { PlausibleAnalyticsProvider } from './providers/plausible.provider';
import { getCampaignProps } from './campaign';

function createProvider(): AnalyticsProvider {
  const enabled = import.meta.env.PUBLIC_ANALYTICS_ENABLED === 'true';
  const provider = import.meta.env.PUBLIC_ANALYTICS_PROVIDER;

  if (!enabled) return noopAnalyticsProvider;
  if (provider === 'plausible') return new PlausibleAnalyticsProvider();

  return noopAnalyticsProvider;
}

const provider = createProvider();
provider.init();

/**
 * Central analytics entry point. Campaign (UTM) props are merged into every
 * event automatically. Callers pass only safe, allow-listed metadata.
 */
export const analytics = {
  track(eventName: AnalyticsEventName, props: AnalyticsProps = {}) {
    provider.track(eventName, {
      ...getCampaignProps(),
      ...props,
    });
  },
};
