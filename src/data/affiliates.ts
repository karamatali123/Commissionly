export interface AffiliateOffer {
  name: string;
  href: string;
  description: string;
}

export const affiliates: AffiliateOffer[] = [];

export function activeAffiliates(list: readonly AffiliateOffer[] = affiliates): AffiliateOffer[] {
  return list.filter(
    (offer) =>
      offer.name.trim().length > 0 &&
      offer.description.trim().length > 0 &&
      offer.href.startsWith("https://"),
  );
}
