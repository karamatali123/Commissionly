import { formatCurrency, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface TravelInput {
  bookingAmount: number;
  commissionRatePercent: number;
  agentKeepPercent: number;
}

export interface TravelMath {
  gross: number;
  agentNet: number;
  hostShare: number;
  rows: MoneyRow[];
}

export function calculateTravel(input: TravelInput): CalcResult<TravelMath> {
  if (input.bookingAmount < 0 || input.commissionRatePercent < 0 || input.agentKeepPercent < 0) {
    return { ok: false, error: "Booking amount and rates cannot be negative." };
  }
  if (input.commissionRatePercent > 100 || input.agentKeepPercent > 100) {
    return { ok: false, error: "Commission and host-split percentages cannot exceed 100%." };
  }
  const gross = (input.bookingAmount * input.commissionRatePercent) / 100;
  const agentNet = (gross * input.agentKeepPercent) / 100;
  const hostShare = gross - agentNet;
  const rows: MoneyRow[] = [
    {
      label: "Supplier commission",
      detail: `${formatCurrency(input.bookingAmount)} × ${formatPercent(input.commissionRatePercent)} = ${formatCurrency(gross)}`,
      amount: gross,
    },
    {
      label: "You keep",
      detail: `${formatCurrency(gross)} × ${formatPercent(input.agentKeepPercent)} = ${formatCurrency(agentNet)}`,
      amount: agentNet,
      emphasize: true,
    },
    {
      label: "Host agency share",
      detail: `${formatCurrency(gross)} − ${formatCurrency(agentNet)} = ${formatCurrency(hostShare)}`,
      amount: hostShare,
    },
  ];
  return { ok: true, gross, agentNet, hostShare, rows };
}
