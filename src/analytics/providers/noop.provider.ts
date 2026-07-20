import type {
  AnalyticsEventName,
  AnalyticsProps,
  AnalyticsProvider,
} from '../analytics.types';

// Default provider. Does nothing. Used in development, tests, and whenever
// analytics is disabled or misconfigured.
export const noopAnalyticsProvider: AnalyticsProvider = {
  init: () => {},
  track: (_eventName: AnalyticsEventName, _props?: AnalyticsProps) => {},
};
