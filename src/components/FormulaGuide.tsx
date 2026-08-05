import React from 'react';
import { CalculationResult } from '../types';
import { formatCurrency } from '../utils/calculator';
import { BookOpen, CheckCircle2, Lightbulb, Calculator as CalcIcon } from 'lucide-react';

interface FormulaGuideProps {
  result: CalculationResult;
}

export const FormulaGuide: React.FC<FormulaGuideProps> = ({ result }) => {
  const { principal, annualRate, effectiveYears, interestAmount, totalAmount, currency } = result;

  return (
    <section id="formula-guide" className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Simple Interest Formula & Equation Guide</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Learn the exact mathematical formulas used to compute simple interest on loans and investments
          </p>
        </div>
      </div>

      {/* Primary Mathematical Formula Box */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-xl border border-slate-700 text-center font-mono space-y-3">
        <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">Standard Simple Interest Equation</p>
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
          I = P × r × t
        </div>
        <div className="text-xs text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
          Where <strong className="text-cyan-300 font-mono">I</strong> = Total Interest,{' '}
          <strong className="text-emerald-300 font-mono">P</strong> = Principal Amount,{' '}
          <strong className="text-blue-300 font-mono">r</strong> = Annual Rate in decimal (Rate % ÷ 100), and{' '}
          <strong className="text-amber-300 font-mono">t</strong> = Duration in Years.
        </div>
      </div>

      {/* Dynamic Live Substitution Card */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-700/70 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
          <CalcIcon className="w-4 h-4" />
          <span>Live Substitution with Your Active Numbers</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs sm:text-sm text-slate-200 leading-relaxed border border-slate-800 space-y-2">
          <div>
            <span className="text-slate-500">1. Formula:</span> I = P × (r / 100) × t
          </div>
          <div>
            <span className="text-slate-500">2. Substitution:</span> I = {formatCurrency(principal, currency)} × ({annualRate} / 100) × {effectiveYears.toFixed(2)} years
          </div>
          <div>
            <span className="text-slate-500">3. Decimal Rate:</span> I = {formatCurrency(principal, currency)} × {(annualRate / 100).toFixed(4)} × {effectiveYears.toFixed(2)}
          </div>
          <div className="pt-2 border-t border-slate-800 text-cyan-300 font-bold">
            <span className="text-slate-400">4. Result:</span> Total Interest (I) = {formatCurrency(interestAmount, currency)}
          </div>
          <div className="text-emerald-300 font-bold">
            <span className="text-slate-400">5. Total Maturity Value (A = P + I):</span> {formatCurrency(principal, currency)} + {formatCurrency(interestAmount, currency)} = {formatCurrency(totalAmount, currency)}
          </div>
        </div>
      </div>

      {/* Rearranged Formula Variants */}
      <div>
        <h3 className="text-base font-bold text-white mb-3">Rearranged Simple Interest Formulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 block">Solving for Principal (P)</span>
            <code className="block bg-slate-950 p-2 rounded text-center text-sm text-white font-mono">P = I / (r × t)</code>
            <p className="text-xs text-slate-400 leading-normal">
              Determines how much starting principal is needed to earn a desired interest amount.
            </p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400 block">Solving for Rate (r)</span>
            <code className="block bg-slate-950 p-2 rounded text-center text-sm text-white font-mono">r = (I / (P × t)) × 100</code>
            <p className="text-xs text-slate-400 leading-normal">
              Calculates the required annual interest rate to achieve a specific target return.
            </p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 block">Solving for Time (t)</span>
            <code className="block bg-slate-950 p-2 rounded text-center text-sm text-white font-mono">t = I / (P × r)</code>
            <p className="text-xs text-slate-400 leading-normal">
              Computes the time in years required to earn a specific target interest payout.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Applications Grid */}
      <div className="pt-2">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          Common Real-World Uses of Simple Interest
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2 p-3 bg-slate-900/40 rounded-lg border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">Short-Term Personal Loans</strong>
              Simple interest is standard for short-term personal and auto loans where interest is calculated strictly on the original principal balance.
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-slate-900/40 rounded-lg border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">Fixed Deposit Certificates (CDs)</strong>
              Many certificates of deposit payout simple interest periodically without reinvesting earnings back into the base principal.
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-slate-900/40 rounded-lg border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">Treasury Bills & Bonds</strong>
              Government treasury bills and municipal bonds issue simple interest coupon payments over set holding periods.
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-slate-900/40 rounded-lg border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">Academic & Financial Education</strong>
              Understanding simple interest is the foundational building block for analyzing mortgages, compound interest, and corporate finance.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
