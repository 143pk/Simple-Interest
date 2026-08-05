import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What is simple interest and how does it work?',
    answer:
      'Simple interest is a straightforward method of calculating interest charges or earnings based exclusively on the initial principal amount. Unlike compound interest, simple interest does not accumulate interest on previously earned interest over time.',
  },
  {
    question: 'What is the formula for calculating simple interest?',
    answer:
      'The simple interest formula is I = P × r × t, where I is the interest amount, P is the principal sum, r is the annual interest rate expressed as a decimal (percentage divided by 100), and t is the time duration in years.',
  },
  {
    question: 'How do you calculate simple interest for months or days?',
    answer:
      'To calculate simple interest for months, divide the number of months by 12 (e.g. 18 months = 1.5 years). For days, divide the number of days by 365 (e.g. 180 days = 180/365 ≈ 0.493 years) and plug the resulting value into the time variable t.',
  },
  {
    question: 'What is the key difference between simple interest and compound interest?',
    answer:
      'Simple interest is computed strictly on the starting principal balance every period. Compound interest computes interest on both the principal balance and all prior accumulated interest, leading to exponential growth over time.',
  },
  {
    question: 'Is simple interest better for borrowers or investors?',
    answer:
      'Simple interest is generally more favorable for borrowers because loan costs remain constant and do not compound. Conversely, investors usually prefer compound interest for investments because earnings accumulate exponentially.',
  },
  {
    question: 'What is reverse simple interest calculation?',
    answer:
      'Reverse simple interest calculation allows you to rearrange the formula to find an unknown variable when the interest amount is known. You can solve for Principal P = I / (r × t), Interest Rate r = (I / (P × t)) × 100, or Time t = I / (P × r).',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Answers to common questions about simple interest calculations, formulas, and usage
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-slate-900/80 rounded-xl border border-slate-700/70 overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-100 hover:text-cyan-400 transition focus:outline-none"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
