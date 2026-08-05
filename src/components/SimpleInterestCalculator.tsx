import React from 'react';
import { CalculatorInputs, CalculationResult, TimeUnit, CalculationMode } from '../types';
import { formatCurrency } from '../utils/calculator';
import { DollarSign, Percent, Calendar, RefreshCw, SlidersHorizontal, ArrowRightLeft } from 'lucide-react';

interface SimpleInterestCalculatorProps {
  inputs: CalculatorInputs;
  onChange: (updated: Partial<CalculatorInputs>) => void;
  result: CalculationResult;
  onReset: () => void;
}

export const SimpleInterestCalculator: React.FC<SimpleInterestCalculatorProps> = ({
  inputs,
  onChange,
  result,
  onReset,
}) => {
  const { principal, rate, timeValue, timeUnit, currency, targetMode, targetInterest } = inputs;

  const handleModeChange = (mode: CalculationMode) => {
    onChange({ targetMode: mode });
  };

  const handleTimeUnitChange = (unit: TimeUnit) => {
    onChange({ timeUnit: unit });
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Target Calculation Mode Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            Calculation Goal
          </label>
          <button
            onClick={onReset}
            className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition"
            title="Reset calculator values"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/60">
          <button
            type="button"
            onClick={() => handleModeChange('interest')}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
              targetMode === 'interest'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Interest (I)
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('principal')}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
              targetMode === 'principal'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Principal (P)
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('rate')}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
              targetMode === 'rate'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Rate (R)
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('time')}
            className={`py-2 px-3 text-xs font-medium rounded-lg transition-all ${
              targetMode === 'time'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Time (T)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Principal Input (if not solving for principal) */}
          {targetMode !== 'principal' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Principal Amount ({currency})
                </label>
                <div className="flex gap-1">
                  {[1000, 5000, 10000, 50000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onChange({ principal: preset })}
                      className="text-[10px] bg-slate-700/60 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition"
                    >
                      {currency}{preset >= 1000 ? `${preset / 1000}k` : preset}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  {currency}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={principal || ''}
                  onChange={(e) => onChange({ principal: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  placeholder="10,000"
                />
              </div>
            </div>
          )}

          {/* Interest Amount Input (only if solving for principal, rate, or time) */}
          {targetMode !== 'interest' && (
            <div>
              <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5 mb-1.5">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                Target Interest ({currency})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  {currency}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={targetInterest || ''}
                  onChange={(e) => onChange({ targetInterest: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  placeholder="500"
                />
              </div>
            </div>
          )}

          {/* Interest Rate Input (if not solving for rate) */}
          {targetMode !== 'rate' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-blue-400" />
                  Annual Interest Rate (% p.a.)
                </label>
                <div className="flex gap-1">
                  {[3, 5, 7.5, 10, 12].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onChange({ rate: preset })}
                      className="text-[10px] bg-slate-700/60 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition"
                    >
                      {preset}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={rate || ''}
                  onChange={(e) => onChange({ rate: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  placeholder="5.0"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  %
                </span>
              </div>
            </div>
          )}

          {/* Time Duration & TimeUnit Input (if not solving for time) */}
          {targetMode !== 'time' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Time Period
                </label>
                <div className="flex gap-1">
                  {[1, 3, 5, 10].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onChange({ timeValue: preset, timeUnit: 'years' })}
                      className="text-[10px] bg-slate-700/60 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition"
                    >
                      {preset} Yr{preset > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-7">
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    value={timeValue || ''}
                    onChange={(e) => onChange({ timeValue: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl py-3 px-4 text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                    placeholder="3"
                  />
                </div>
                <div className="col-span-5">
                  <select
                    value={timeUnit}
                    onChange={(e) => handleTimeUnitChange(e.target.value as TimeUnit)}
                    className="w-full h-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Calculation Cards Column */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-xl border border-slate-700/70 shadow-inner">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
              {targetMode === 'interest' && 'Simple Interest Breakdown'}
              {targetMode === 'principal' && 'Required Principal Result'}
              {targetMode === 'rate' && 'Required Interest Rate Result'}
              {targetMode === 'time' && 'Required Loan Duration Result'}
            </span>

            {/* Primary Highlight */}
            <div className="mt-3 mb-5 pb-4 border-b border-slate-800">
              <p className="text-xs text-slate-400">Total Interest Earned / Owed</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono mt-1">
                {formatCurrency(result.interestAmount, currency)}
              </p>
            </div>

            {/* Secondary Highlights */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-300">Total Principal Amount</span>
                <span className="text-sm font-semibold font-mono text-emerald-400">
                  {formatCurrency(result.principal, currency)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-300">Total Payoff (Principal + Interest)</span>
                <span className="text-sm font-semibold font-mono text-cyan-300">
                  {formatCurrency(result.totalAmount, currency)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-300">Annual Interest Rate</span>
                <span className="text-sm font-semibold font-mono text-blue-400">
                  {result.annualRate.toFixed(2)}% p.a.
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-300">Effective Duration</span>
                <span className="text-sm font-semibold font-mono text-amber-300">
                  {result.effectiveYears.toFixed(2)} Years ({Math.round(result.effectiveYears * 365)} Days)
                </span>
              </div>
            </div>
          </div>

          {/* Periodic Rates */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-800/40 rounded-lg">
              <span className="block text-[10px] text-slate-400 uppercase font-mono">Daily</span>
              <span className="font-mono text-slate-200 font-semibold">
                {formatCurrency(result.dailyInterest, currency)}
              </span>
            </div>
            <div className="p-2 bg-slate-800/40 rounded-lg">
              <span className="block text-[10px] text-slate-400 uppercase font-mono">Monthly</span>
              <span className="font-mono text-slate-200 font-semibold">
                {formatCurrency(result.monthlyInterest, currency)}
              </span>
            </div>
            <div className="p-2 bg-slate-800/40 rounded-lg">
              <span className="block text-[10px] text-slate-400 uppercase font-mono">Yearly</span>
              <span className="font-mono text-slate-200 font-semibold">
                {formatCurrency(result.annualInterest, currency)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
