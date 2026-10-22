export type CalcResult<T> = ({ ok: true } & T) | { ok: false; error: string };
