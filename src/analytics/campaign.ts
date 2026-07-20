const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;
type UtmKey = (typeof UTM_KEYS)[number];

type CampaignProps = Partial<Record<UtmKey, string>>;

let cachedCampaignProps: CampaignProps | null = null;

/**
 * Extract UTM campaign parameters from the current URL.
 * Values are truncated and kept only in browser memory for the session.
 */
export function getCampaignProps(): CampaignProps {
  if (cachedCampaignProps) return cachedCampaignProps;

  if (typeof window === 'undefined') {
    cachedCampaignProps = {};
    return cachedCampaignProps;
  }

  const params = new URLSearchParams(window.location.search);
  const props: CampaignProps = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) props[key] = value.slice(0, 80);
  }

  cachedCampaignProps = props;
  return props;
}
