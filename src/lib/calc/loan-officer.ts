import { formatCurrency, formatNumber, formatPercent, type MoneyRow } from "@/lib/format";
import type { CalcResult } from "@/lib/calc/types";

export interface LoanOfficerInput {
  loanAmount: number;
  basisPoints: number;
  keepPercent: number;
  minimum: number | null;
  maximum: number | null;
}

export interface LoanOfficerMath {
  gross: number;
  clamped: number;
  agentNet: number;
  companyShare: number;
  rows: MoneyRow[];
}

export function calculateLoanOfficer(input: LoanOfficerInput): CalcResult<LoanOfficerMath> {
  if (input.loanAmount < 0 || input.basisPoints < 0 || input.keepPercent < 0) {
    return { ok: false, error: "Loan amount, basis points, and split cannot be negative." };
  }
  if (input.keepPercent > 100) return { ok: false, error: "The share you keep cannot exceed 100%." };
  if (input.minimum !== null && input.minimum < 0) return { ok: false, error: "Minimum cannot be negative." };
  if (input.maximum !== null && input.maximum < 0) return { ok: false, error: "Maximum cannot be negative." };
  if (input.minimum !== null && input.maximum !== null && input.minimum > input.maximum) {
    return { ok: false, error: "Minimum cannot be larger than maximum." };
  }

  const gross = (input.loanAmount * input.basisPoints) / 10000;
  let clamped = gross;
  if (input.minimum !== null) clamped = Math.max(clamped, input.minimum);
  if (input.maximum !== null) clamped = Math.min(clamped, input.maximum);
  const agentNet = (clamped * input.keepPercent) / 100;
  const companyShare = clamped - agentNet;
  const rows: MoneyRow[] = [
    {
      label: "Gross commission",
      detail: `${formatCurrency(input.loanAmount)} × ${formatNumber(input.basisPoints)} basis points = ${formatCurrency(gross)}`,
      amount: gross,
    },
  ];
  if (clamped !== gross) {
    rows.push({
      label: "After minimum or maximum",
      detail: `${formatCurrency(gross)} is adjusted to ${formatCurrency(clamped)}.`,
      amount: clamped,
    });
  }
  rows.push(
    {
      label: "You keep",
      detail: `${formatCurrency(clamped)} × ${formatPercent(input.keepPercent)} = ${formatCurrency(agentNet)}`,
      amount: agentNet,
      emphasize: true,
    },
    {
      label: "Company share",
      detail: `${formatCurrency(clamped)} − ${formatCurrency(agentNet)} = ${formatCurrency(companyShare)}`,
      amount: companyShare,
    },
  );
  return { ok: true, gross, clamped, agentNet, companyShare, rows };
}
