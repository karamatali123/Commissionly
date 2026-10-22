"use client";

import { useEffect, useRef, useState } from "react";
import { salaryDefaults, SalaryCalculator } from "@/components/calculators/SalaryCalculator";
import { simpleDefaults, type SimpleMode, CommissionModes } from "@/components/calculators/CommissionModes";
import { tieredDefaults, TieredCalculator } from "@/components/calculators/TieredCalculator";
import { mergeQuery, readQuery } from "@/lib/url-state";

const tabs = [
  { id: "commission", label: "Commission" },
  { id: "reverse", label: "Reverse (find sale amount)" },
  { id: "rate", label: "Find rate" },
  { id: "tiered", label: "Tiered" },
  { id: "salary", label: "Salary + commission" },
] as const;

type HomeTab = (typeof tabs)[number]["id"];

const managedKeys = ["tab", ...Object.keys(simpleDefaults), ...Object.keys(tieredDefaults), ...Object.keys(salaryDefaults)];

export function HomeCalculator() {
  const [tab, setTab] = useState<HomeTab>("commission");
  const [simple, setSimple] = useState<Record<string, string>>(simpleDefaults);
  const [tiered, setTiered] = useState<Record<string, string>>(tieredDefaults);
  const [salary, setSalary] = useState<Record<string, string>>(salaryDefaults);
  const [ready, setReady] = useState(false);
  const pending = useRef({ tab, simple, tiered, salary });

  function updateSimple(next: Record<string, string>) {
    pending.current = { ...pending.current, simple: next };
    setSimple(next);
  }

  function updateTiered(next: Record<string, string>) {
    pending.current = { ...pending.current, tiered: next };
    setTiered(next);
  }

  function updateSalary(next: Record<string, string>) {
    pending.current = { ...pending.current, salary: next };
    setSalary(next);
  }

  function selectTab(next: HomeTab) {
    pending.current = { ...pending.current, tab: next };
    setTab(next);
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("tab");
      const nextTab: HomeTab =
        requested === "reverse" || requested === "rate" || requested === "tiered" || requested === "salary" || requested === "commission"
          ? requested
          : "commission";
      const nextSimple = readQuery(window.location.search, simpleDefaults);
      const nextTiered = readQuery(window.location.search, tieredDefaults);
      const nextSalary = readQuery(window.location.search, salaryDefaults);
      pending.current = { tab: nextTab, simple: nextSimple, tiered: nextTiered, salary: nextSalary };
      setTab(nextTab);
      setSimple(nextSimple);
      setTiered(nextTiered);
      setSalary(nextSalary);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => write(tab, simple, tiered, salary), 150);
    return () => window.clearTimeout(id);
  }, [ready, tab, simple, tiered, salary]);

  function flush() {
    const current = pending.current;
    write(current.tab, current.simple, current.tiered, current.salary);
  }

  const simpleMode: SimpleMode = tab === "reverse" || tab === "rate" ? tab : "commission";

  return (
    <div>
      <div role="tablist" aria-label="Commission calculator modes" className="flex flex-wrap gap-2">
        {tabs.map((item, index) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            aria-controls={`panel-${item.id}`}
            tabIndex={tab === item.id ? 0 : -1}
            className={`inline-flex min-h-11 items-center rounded-full px-4 ${tab === item.id ? "bg-accent font-semibold text-accent-ink" : "border border-line bg-surface"}`}
            onClick={() => selectTab(item.id)}
            onKeyDown={(event) => {
              const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : event.key === "Home" ? -index : event.key === "End" ? tabs.length - 1 - index : 0;
              if (!delta && event.key !== "Home" && event.key !== "End") return;
              event.preventDefault();
              const next = tabs[(index + delta + tabs.length) % tabs.length];
              if (!next) return;
              selectTab(next.id);
              document.getElementById(`tab-${next.id}`)?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "tiered" ? (
          <TieredCalculator values={tiered} onChange={updateTiered} onFlush={flush} />
        ) : tab === "salary" ? (
          <SalaryCalculator values={salary} onChange={updateSalary} onFlush={flush} />
        ) : (
          <CommissionModes mode={simpleMode} values={simple} onChange={updateSimple} onFlush={flush} />
        )}
      </div>
    </div>
  );
}

function write(tab: HomeTab, simple: Record<string, string>, tiered: Record<string, string>, salary: Record<string, string>) {
  const active = tab === "tiered" ? { tab, ...tiered } : tab === "salary" ? { tab, ...salary } : { tab, ...simple };
  const qs = mergeQuery(window.location.search, managedKeys, active);
  window.history.replaceState(null, "", `${window.location.pathname}${qs}`);
}
