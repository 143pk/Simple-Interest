import { CalculatorInputs, CalculationResult, ScheduleRow, CompoundComparison } from '../types';

export function calculateSimpleInterest(inputs: CalculatorInputs): CalculationResult {
  const { principal, rate, timeValue, timeUnit, currency, targetMode, targetInterest } = inputs;

  // Convert time to years
  let effectiveYears = 1;
  if (timeUnit === 'years') {
    effectiveYears = Math.max(timeValue, 0.0001);
  } else if (timeUnit === 'months') {
    effectiveYears = Math.max(timeValue / 12, 0.0001);
  } else if (timeUnit === 'days') {
    effectiveYears = Math.max(timeValue / 365, 0.0001);
  }

  let finalPrincipal = principal;
  let finalRate = rate;
  let finalYears = effectiveYears;
  let finalInterest = 0;

  if (targetMode === 'interest') {
    finalInterest = finalPrincipal * (finalRate / 100) * finalYears;
  } else if (targetMode === 'principal') {
    finalInterest = targetInterest;
    const denominator = (finalRate / 100) * finalYears;
    finalPrincipal = denominator > 0 ? targetInterest / denominator : 0;
  } else if (targetMode === 'rate') {
    finalInterest = targetInterest;
    const denominator = finalPrincipal * finalYears;
    finalRate = denominator > 0 ? (targetInterest / denominator) * 100 : 0;
  } else if (targetMode === 'time') {
    finalInterest = targetInterest;
    const denominator = finalPrincipal * (finalRate / 100);
    finalYears = denominator > 0 ? targetInterest / denominator : 0;
  }

  const totalAmount = finalPrincipal + finalInterest;
  const totalDays = Math.max(finalYears * 365, 1);
  const totalMonths = Math.max(finalYears * 12, 1);

  const dailyInterest = finalInterest / totalDays;
  const monthlyInterest = finalInterest / totalMonths;
  const annualInterest = finalYears > 0 ? finalInterest / finalYears : finalInterest;

  // Generate schedule rows
  const schedule: ScheduleRow[] = [];
  const periodsCount = timeUnit === 'months' 
    ? Math.min(Math.ceil(timeValue), 120)
    : Math.min(Math.ceil(finalYears), 50);

  const interestPerPeriod = periodsCount > 0 ? finalInterest / periodsCount : 0;
  let currentBalance = finalPrincipal;
  let accumulatedInterest = 0;

  for (let i = 1; i <= periodsCount; i++) {
    const startBal = currentBalance;
    const periodInterest = interestPerPeriod;
    accumulatedInterest += periodInterest;
    currentBalance = finalPrincipal + accumulatedInterest;

    const periodLabel = timeUnit === 'months' ? `Month ${i}` : `Year ${i}`;

    schedule.push({
      period: i,
      label: periodLabel,
      startingBalance: startBal,
      interestEarned: periodInterest,
      totalInterestToDate: accumulatedInterest,
      endingBalance: currentBalance,
    });
  }

  // Calculate compound interest comparison
  const P = finalPrincipal;
  const r = finalRate / 100;
  const t = finalYears;

  const compoundAnnually = P * Math.pow(1 + r / 1, 1 * t);
  const compoundSemiAnnually = P * Math.pow(1 + r / 2, 2 * t);
  const compoundQuarterly = P * Math.pow(1 + r / 4, 4 * t);
  const compoundMonthly = P * Math.pow(1 + r / 12, 12 * t);

  const compoundComparison: CompoundComparison = {
    simpleTotal: totalAmount,
    simpleInterest: finalInterest,
    compoundAnnually,
    compoundSemiAnnually,
    compoundQuarterly,
    compoundMonthly,
    extraFromCompounding: compoundMonthly - totalAmount,
  };

  return {
    principal: finalPrincipal,
    annualRate: finalRate,
    effectiveYears: finalYears,
    timeValue,
    timeUnit,
    interestAmount: finalInterest,
    totalAmount,
    dailyInterest,
    monthlyInterest,
    annualInterest,
    currency,
    schedule,
    compoundComparison,
  };
}

export function formatCurrency(amount: number, currencySymbol: string = '$'): string {
  if (isNaN(amount) || !isFinite(amount)) return `${currencySymbol}0.00`;
  return `${currencySymbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
