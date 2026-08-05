import React from 'react';
import { Calculator, Sparkles, HelpCircle, FileText } from 'lucide-react';
import { CurrencySymbol } from '../types';

interface HeaderProps {
  currency: CurrencySymbol;
  onCurrencyChange: (c: CurrencySymbol) => void;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currency, onCurrencyChange, onScrollToSection }) => {
  const currencies: CurrencySymbol[] = ['$', '€', '£', '₹', 'A$', 'C$'];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 text-white">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Simple Interest Calculator
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                PRO 2026
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Fast, accurate financial formulas & schedule breakdowns
            </p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 font-mono text-[11px] hidden md:inline">Currency:</span>
            {currencies.map((symbol) => (
              <button
                key={symbol}
                type="button"
                onClick={() => onCurrencyChange(symbol)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  currency === symbol
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-label={`Set currency to ${symbol}`}
              >
                {symbol}
              </button>
            ))}
          </div>

          {/* Quick Nav Links */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300">
            <button
              onClick={() => onScrollToSection('formula-guide')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition border border-slate-700/50"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Formula</span>
            </button>
            <button
              onClick={() => onScrollToSection('faq-section')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition border border-slate-700/50"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>FAQ</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
