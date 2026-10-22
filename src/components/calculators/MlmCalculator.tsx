"use client";

import { calculateMlm } from "@/lib/calc/mlm";
import { formatCurrency, readMoney, readPercent } from "@/lib/format";
import { TextField } from "@/components/calculator/Fields";
import { CalculatorFrame, ResultPanel } from "@/components/calculator/ResultPanel";
import { useCalculatorFields, useDebounced } from "@/components/calculator/useCalculatorFields";

const defaults = {
  personalVolume: "1000",
  personalRate: "20",
  volume1: "5000",
  rate1: "5",
  volume2: "",
  rate2: "",
  volume3: "",
  rate3: "",
};

export function MlmCalculator() {
  const state = useCalculatorFields(defaults);
  const [shown, setShown] = useDebounced(state.fields);
  const outcome = compute(shown);
  const live = compute(state.fields);
  return (
    <CalculatorFrame
      onSubmit={() => setShown(state.fields)}
      result={<ResultPanel label="Total from the levels entered" value={outcome.value} rows={outcome.rows} note={outcome.note} onReset={() => setShown(state.reset())} onCopy={state.flush} />}
    >
      <TextField id="mlm-volume" label="Personal sales volume ($)" value={state.fields.personalVolume ?? ""} onChange={(value) => state.setField("personalVolume", value)} error={live.errors.personalVolume} />
      <TextField id="mlm-rate" label="Personal commission rate (%)" value={state.fields.personalRate ?? ""} onChange={(value) => state.setField("personalRate", value)} error={live.errors.personalRate} />
      {[1, 2, 3].map((level) => (
        <div key={level} className="grid gap-3 sm:grid-cols-2">
          <TextField id={`mlm-volume-${level}`} label={`Override level ${level} volume ($)`} hint={level > 1 ? "Leave blank to skip this level." : undefined} value={state.fields[`volume${level}`] ?? ""} onChange={(value) => state.setField(`volume${level}`, value)} error={live.errors[`volume${level}`]} />
          <TextField id={`mlm-rate-${level}`} label={`Override level ${level} rate (%)`} value={state.fields[`rate${level}`] ?? ""} onChange={(value) => state.setField(`rate${level}`, value)} error={live.errors[`rate${level}`]} />
        </div>
      ))}
    </CalculatorFrame>
  );
}

function compute(fields: Record<string, string>) {
  const personalVolume = readMoney(fields.personalVolume ?? "", "personal volume");
  const personalRate = readPercent(fields.personalRate ?? "", "a personal rate", 100);
  const errors: Record<string, string | undefined> = {
    personalVolume: personalVolume.ok ? undefined : personalVolume.error,
    personalRate: personalRate.ok ? undefined : personalRate.error,
  };
  const overrides: { volume: number; ratePercent: number }[] = [];
  for (const level of [1, 2, 3]) {
    const volumeRaw = fields[`volume${level}`] ?? "";
    const rateRaw = fields[`rate${level}`] ?? "";
    if (volumeRaw.trim() === "" && rateRaw.trim() === "") continue;
    const volume = readMoney(volumeRaw, `level ${level} volume`);
    const rate = readPercent(rateRaw, `level ${level} rate`, 100);
    errors[`volume${level}`] = volume.ok ? undefined : volume.error;
    errors[`rate${level}`] = rate.ok ? undefined : rate.error;
    if (volume.ok && rate.ok) overrides.push({ volume: volume.value, ratePercent: rate.value });
    else return { value: "—", rows: [], note: errors[`volume${level}`] ?? errors[`rate${level}`], errors };
  }
  if (!personalVolume.ok || !personalRate.ok) {
    return { value: "—", rows: [], note: errors.personalVolume ?? errors.personalRate, errors };
  }
  const result = calculateMlm({
    personalVolume: personalVolume.value,
    personalRatePercent: personalRate.value,
    overrides,
  });
  if (!result.ok) return { value: "—", rows: [], note: result.error, errors };
  return {
    value: formatCurrency(result.total),
    rows: result.rows,
    note: "This adds only the levels you typed. It is not a prediction of what a downline will earn.",
    errors,
  };
}
