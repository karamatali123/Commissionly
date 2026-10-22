import { ADS_ENABLED } from "@/lib/site";

export function AdSlot() {
  if (!ADS_ENABLED) return null;
  return (
    <aside className="mx-auto mt-8 h-[250px] w-full max-w-[336px]" aria-label="Advertisement" data-ad-slot="below-calculator">
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted">
        Advertisement
      </div>
    </aside>
  );
}
