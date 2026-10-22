import { activeAffiliates } from "@/data/affiliates";

export function AffiliateBlock() {
  const offers = activeAffiliates();
  if (offers.length === 0) return null;
  return (
    <aside className="mt-10 rounded-2xl border border-line bg-surface p-5">
      <h2 className="text-xl font-semibold tracking-tight">Commission tracking tools</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Advertisement. Commissionly may earn a commission if you buy through these links, at no extra cost to you.
      </p>
      <ul className="mt-4 space-y-3">
        {offers.map((offer) => (
          <li key={offer.href}>
            <a href={offer.href} className="font-semibold text-accent" rel="sponsored nofollow noopener noreferrer" target="_blank">
              {offer.name}
            </a>
            <p className="text-sm leading-6">{offer.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
