export interface PlatformFee {
  id: string;
  label: string;
  ratePercent: number;
  lastVerified: string;
  sourceUrl: string;
  notes: string;
}

/**
 * Marketplace and affiliate rates belong here only after a human checks the
 * source URL. TODO: verify each rate before a platform calculator is published.
 * Do not invent a rate to fill this list.
 */
export const platformFees: PlatformFee[] = [];
