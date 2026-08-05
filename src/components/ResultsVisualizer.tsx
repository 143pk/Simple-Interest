import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { formatCurrency } from '../utils/calculator';
import { PieChart, Copy, Check, Download, Layers, TrendingUp } from 'lucide-react';

interface ResultsVisualizerProps {
  result: CalculationResult;
}

export const ResultsVisualizer: React.FC<ResultsVisualizerProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const { principal, interestAmount, totalAmount, currency, compoundComparison, schedule } = result;

  const principalRatio = totalAmount > 0 ? (principal / totalAmount) * 100 : 100;
  const interestRatio = totalAmount > 0 ? (interestAmount / totalAmount) * 100 : 0;

  const handleCopySummary = () => {
    const summaryText = `Simple Interest Calculation Summary:
• Principal: ${formatCurrency(principal, currency)}
• Interest Rate: ${result.annualRate}% p.a.
• Duration: ${result.timeValue} ${result.timeUnit}
• Total Simple Interest: ${formatCurrency(interestAmount, currency)}
• Total Maturity Amount: ${formatCurrency(totalAmount, currency)}
• Daily Interest: ${formatCurrency(result.dailyInterest, currency)}
• Monthly Interest: ${formatCurrency(result.monthlyInterest, currency)}
Calculated via Simple Interest Calculator (simpleinterestcalculator.org)`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCSV = () => {
    if (!schedule.length) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Period,Starting Balance,Interest Earned,Total Interest To Date,Ending Balance\n';

    schedule.forEach((row) => {
      csvContent += `"${row.label}",${row.startingBalance.toFixed(2)},${row.interestEarned.toFixed(2)},${row.totalInterestToDate.toFixed(2)},${row.endingBalance.toFixed(2)}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `simple_interest_schedule_${result.timeValue}_${result.timeUnit}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Principal vs Interest Distribution Bar */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Investment Ratio Breakdown</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-slate-700/70 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition border border-slate-600/50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied Summary!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-xs font-medium text-cyan-200 flex items-center gap-1.5 transition border border-cyan-500/40"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Visual Progress Stack */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-900 rounded-full overflow-hidden flex p-1 border border-slate-700/80 shadow-inner">
            <div
              style={{ width: `${principalRatio}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-l-full transition-all duration-500"
              title={`Principal: ${principalRatio.toFixed(1)}%`}
            />
            <div
              style={{ width: `${interestRatio}%` }}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-r-full transition-all duration-500"
              title={`Interest: ${interestRatio.toFixed(1)}%`}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300 font-mono px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span>Principal: <strong>{principalRatio.toFixed(1)}%</strong> ({formatCurrency(principal, currency)})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
              <span>Interest: <strong>{interestRatio.toFixed(1)}%</strong> ({formatCurrency(interestAmount, currency)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simple vs Compound Interest Comparison Table */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 sm:p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white">Simple Interest vs. Compound Interest</h3>
            <p className="text-xs text-slate-400">See how much additional growth compound frequencies produce</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300 font-mono">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-2.5 px-3">Interest Frequency Type</th>
                <th className="py-2.5 px-3">Total Maturity Value</th>
                <th className="py-2.5 px-3">Total Interest Earned</th>
                <th className="py-2.5 px-3">Extra vs Simple Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              <tr className="bg-cyan-950/30 font-semibold text-cyan-200">
                <td className="py-3 px-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Simple Interest (Standard)
                </td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.simpleTotal, currency)}</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.simpleInterest, currency)}</td>
                <td className="py-3 px-3 text-slate-500">— Base</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Compound Annually (1x / yr)</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundAnnually, currency)}</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundAnnually - principal, currency)}</td>
                <td className="py-3 px-3 text-emerald-400 font-semibold">
                  +{formatCurrency(compoundComparison.compoundAnnually - compoundComparison.simpleTotal, currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3">Compound Semi-Annually (2x / yr)</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundSemiAnnually, currency)}</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundSemiAnnually - principal, currency)}</td>
                <td className="py-3 px-3 text-emerald-400 font-semibold">
                  +{formatCurrency(compoundComparison.compoundSemiAnnually - compoundComparison.simpleTotal, currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3">Compound Quarterly (4x / yr)</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundQuarterly, currency)}</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundQuarterly - principal, currency)}</td>
                <td className="py-3 px-3 text-emerald-400 font-semibold">
                  +{formatCurrency(compoundComparison.compoundQuarterly - compoundComparison.simpleTotal, currency)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3">Compound Monthly (12x / yr)</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundMonthly, currency)}</td>
                <td className="py-3 px-3">{formatCurrency(compoundComparison.compoundMonthly - principal, currency)}</td>
                <td className="py-3 px-3 text-emerald-400 font-semibold">
                  +{formatCurrency(compoundComparison.compoundMonthly - compoundComparison.simpleTotal, currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
