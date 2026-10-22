export function mergeQuery(
  current: string,
  managedKeys: readonly string[],
  fields: Record<string, string>,
): string {
  const params = new URLSearchParams(current.startsWith("?") ? current.slice(1) : current);
  for (const key of managedKeys) params.delete(key);
  for (const [key, value] of Object.entries(fields)) {
    if (value !== "") params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function readQuery(
  search: string,
  defaults: Record<string, string>,
): Record<string, string> {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const next = { ...defaults };
  for (const key of Object.keys(defaults)) {
    const value = params.get(key);
    if (value !== null) next[key] = value;
  }
  return next;
}

export function writeBrowserQuery(managedKeys: readonly string[], fields: Record<string, string>) {
  const qs = mergeQuery(window.location.search, managedKeys, fields);
  const next = `${window.location.pathname}${qs}`;
  window.history.replaceState(null, "", next);
}
