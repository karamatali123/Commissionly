"use client";

const inputClass =
  "mt-1 h-11 w-full rounded-lg border border-line bg-bg px-3 text-base text-ink";

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  suffix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  suffix?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm leading-5 text-muted">
          {hint}
        </p>
      ) : null}
      <div className="relative">
        <input
          id={id}
          className={inputClass}
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix ? <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted">{suffix}</span> : null}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1 text-sm leading-5 text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <select id={id} className={inputClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ChoiceGroup({
  label,
  name,
  value,
  onChange,
  options,
  wide = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; hint?: string }[];
  wide?: boolean;
}) {
  return (
    <fieldset className={wide ? "min-w-0 sm:col-span-2" : "min-w-0"}>
      <legend className="text-sm font-medium">{label}</legend>
      <div className="mt-2 grid gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-line px-3 py-2">
            <input
              className="mt-1"
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>
              <span className="block font-medium">{option.label}</span>
              {option.hint ? <span className="block text-sm leading-5 text-muted">{option.hint}</span> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
