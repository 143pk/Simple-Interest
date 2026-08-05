export type TimeUnit = 'years' | 'months' | 'days';
export type CurrencySymbol = '$' | '€' | '£' | '₹' | 'A$' | 'C$';

export type CalculationMode = 'interest' | 'principal' | 'rate' | 'time';

export interface CalculatorInputs {
  principal: number;
  rate: number;
  timeValue: number;
  timeUnit: TimeUnit;
  currency: CurrencySymbol;
  targetMode: CalculationMode;
  targetInterest: number; // Used in reverse calculation
}

export interface ScheduleRow {
  period: number;
  label: string;
  startingBalance: number;
  interestEarned: number;
  totalInterestToDate: number;
  endingBalance: number;
}

export interface CompoundComparison {
  simpleTotal: number;
  simpleInterest: number;
  compoundAnnually: number;
  compoundSemiAnnually: number;
  compoundQuarterly: number;
  compoundMonthly: number;
  extraFromCompounding: number;
}

export interface CalculationResult {
  principal: number;
  annualRate: number;
  effectiveYears: number;
  timeValue: number;
  timeUnit: TimeUnit;
  interestAmount: number;
  totalAmount: number;
  dailyInterest: number;
  monthlyInterest: number;
  annualInterest: number;
  currency: CurrencySymbol;
  schedule: ScheduleRow[];
  compoundComparison: CompoundComparison;
}
