import React, { useState, useMemo } from 'react';
import { CalculatorInputs, CurrencySymbol } from './types';
import { calculateSimpleInterest } from './utils/calculator';
import { Header } from './components/Header';
import { SimpleInterestCalculator } from './components/SimpleInterestCalculator';
import { ResultsVisualizer } from './components/ResultsVisualizer';
import { ScheduleTable } from './components/ScheduleTable';
import { FormulaGuide } from './components/FormulaGuide';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    principal: 10000,
    rate: 5.0,
    timeValue: 3,
    timeUnit: 'years',
    currency: '$',
    targetMode: 'interest',
    targetInterest: 1500,
  });

  const handleInputChange = (updated: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({ ...prev, ...updated }));
  };

  const handleCurrencyChange = (c: CurrencySymbol) => {
    setInputs((prev) => ({ ...prev, currency: c }));
  };

  const handleReset = () => {
    setInputs({
      principal: 10000,
      rate: 5.0,
      timeValue: 3,
      timeUnit: 'years',
      currency: inputs.currency,
      targetMode: 'interest',
      targetInterest: 1500,
    });
  };

  const calculationResult = useMemo(() => {
    return calculateSimpleInterest(inputs);
  }, [inputs]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header
        currency={inputs.currency}
        onCurrencyChange={handleCurrencyChange}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-6 space-y-8">
        {/* Ad Banner 1: Top Leaderboard */}
        <AdBanner slotId={1} label="Ad Slot #1 - Top Leaderboard" />

        {/* Hero SEO Header Section */}
        <section className="text-center space-y-2 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Online Simple Interest Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Calculate simple interest, principal amounts, annual interest rates, or tenure instantly.
            Includes dynamic schedule tables, compound interest comparisons, and reverse equations.
          </p>
        </section>

        {/* Interactive Simple Interest Calculator Tool */}
        <section aria-label="Simple Interest Calculator Form">
          <SimpleInterestCalculator
            inputs={inputs}
            onChange={handleInputChange}
            result={calculationResult}
            onReset={handleReset}
          />
        </section>

        {/* Ad Banner 2 */}
        <AdBanner slotId={2} label="Ad Slot #2 - Post Calculator" />

        {/* Results Visualizer: Ratio Distribution & Compound Interest Comparison */}
        <section aria-label="Interest Results Visualizer">
          <ResultsVisualizer result={calculationResult} />
        </section>

        {/* Ad Banner 3 */}
        <AdBanner slotId={3} label="Ad Slot #3 - Mid Content" />

        {/* Ad Banner 4 */}
        <AdBanner slotId={4} label="Ad Slot #4 - Comparison Interstitial" />

        {/* Ad Banner 5 */}
        <AdBanner slotId={5} label="Ad Slot #5 - Pre-Schedule" />

        {/* Periodic Schedule Breakdown Table */}
        <section aria-label="Amortization and Interest Schedule Table">
          <ScheduleTable
            schedule={calculationResult.schedule}
            currency={inputs.currency}
          />
        </section>

        {/* Ad Banner 6 */}
        <AdBanner slotId={6} label="Ad Slot #6 - Post-Schedule" />

        {/* Ad Banner 7 */}
        <AdBanner slotId={7} label="Ad Slot #7 - Pre-Formula" />

        {/* Formula & Equation Educational Guide */}
        <FormulaGuide result={calculationResult} />

        {/* Ad Banner 8 */}
        <AdBanner slotId={8} label="Ad Slot #8 - Post-Formula" />

        {/* Ad Banner 9 */}
        <AdBanner slotId={9} label="Ad Slot #9 - Pre-FAQ" />

        {/* FAQ Section */}
        <FaqSection />

        {/* Ad Banner 10 */}
        <AdBanner slotId={10} label="Ad Slot #10 - Bottom Footer Banner" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
