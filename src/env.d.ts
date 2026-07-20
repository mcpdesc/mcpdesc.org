/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** "true" to enable analytics. Any other value disables it. */
  readonly PUBLIC_ANALYTICS_ENABLED?: string;
  /** Analytics provider id, e.g. "plausible". */
  readonly PUBLIC_ANALYTICS_PROVIDER?: string;
  /** Plausible data-domain, e.g. "mcpdesc.org". */
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  /** Plausible script src, e.g. "https://plausible.io/js/script.js". */
  readonly PUBLIC_PLAUSIBLE_SRC?: string;
  /** Public app/site version surfaced in safe analytics metadata. */
  readonly PUBLIC_APP_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  plausible?: (
    eventName: string,
    options?: { props?: Record<string, string | number | boolean> },
  ) => void;
}
