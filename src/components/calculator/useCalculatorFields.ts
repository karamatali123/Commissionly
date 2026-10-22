"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { readQuery, writeBrowserQuery } from "@/lib/url-state";

export function useCalculatorFields(
  defaults: Record<string, string>,
  controlled?: {
    values: Record<string, string>;
    onChange: (values: Record<string, string>) => void;
    onFlush?: () => void;
  },
) {
  const defaultsRef = useRef(defaults);
  const [fields, setFields] = useState(defaults);
  const [ready, setReady] = useState(false);
  const enabled = !controlled;

  useEffect(() => {
    if (!enabled) return;
    const frame = window.requestAnimationFrame(() => {
      setFields(readQuery(window.location.search, defaultsRef.current));
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !ready) return;
    const id = window.setTimeout(() => {
      writeBrowserQuery(Object.keys(defaultsRef.current), fields);
    }, 150);
    return () => window.clearTimeout(id);
  }, [enabled, fields, ready]);

  const value = controlled?.values ?? fields;

  const patch = useCallback(
    (partial: Record<string, string>) => {
      if (controlled) {
        controlled.onChange({ ...controlled.values, ...partial });
        return;
      }
      setFields((current) => ({ ...current, ...partial }));
    },
    [controlled],
  );

  const setField = useCallback((key: string, next: string) => patch({ [key]: next }), [patch]);

  const reset = useCallback(() => {
    const snapshot = { ...defaultsRef.current };
    if (controlled) {
      controlled.onChange(snapshot);
      controlled.onFlush?.();
      return snapshot;
    }
    setFields(snapshot);
    writeBrowserQuery(Object.keys(snapshot), snapshot);
    return snapshot;
  }, [controlled]);

  const flush = useCallback(() => {
    if (controlled) {
      controlled.onFlush?.();
      return;
    }
    writeBrowserQuery(Object.keys(defaultsRef.current), value);
  }, [controlled, value]);

  return { fields: value, setField, patch, reset, flush };
}

export function useDebounced<T>(value: T, delay = 150): [T, (next: T) => void] {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return [debounced, setDebounced];
}
