"use client";

import { useEffect, useState } from "react";
import { ADSENSE_CLIENT, ADS_ENABLED, PLAUSIBLE_DOMAIN } from "@/lib/site";

const CONSENT_KEY = "commissionly-consent";

function loadOptionalScripts() {
  if (PLAUSIBLE_DOMAIN && !document.querySelector("script[data-commissionly-analytics]")) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.commissionlyAnalytics = "true";
    script.dataset.domain = PLAUSIBLE_DOMAIN;
    script.src = "https://plausible.io/js/script.js";
    document.body.appendChild(script);
  }
  if (ADS_ENABLED && ADSENSE_CLIENT && !document.querySelector("script[data-commissionly-ads]")) {
    const start = () => {
      if (document.querySelector("script[data-commissionly-ads]")) return;
      const script = document.createElement("script");
      script.async = true;
      script.dataset.commissionlyAds = "true";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };
    window.requestIdleCallback(start);
  }
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      loadOptionalScripts();
      return;
    }
    if (stored === "rejected") return;
    const frame = window.requestAnimationFrame(() => setOpen(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.paddingBottom = open ? "7rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [open]);

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(CONSENT_KEY, value);
    setOpen(false);
    if (value === "accepted") loadOptionalScripts();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-4 py-4 shadow-lg" role="dialog" aria-label="Cookie choices">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6">
          Optional analytics and ads stay off until you accept. Rejecting keeps the calculators working and loads neither.
        </p>
        <div className="flex gap-2">
          <button type="button" className="inline-flex min-h-11 items-center rounded-lg border border-line px-4" onClick={() => choose("rejected")}>
            Reject
          </button>
          <button type="button" className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 font-semibold text-accent-ink" onClick={() => choose("accepted")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
