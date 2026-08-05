import React, { useState } from 'react';
import { ScheduleRow, CurrencySymbol } from '../types';
import { formatCurrency } from '../utils/calculator';
import { Table, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScheduleTableProps {
  schedule: ScheduleRow[];
  currency: CurrencySymbol;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule, currency }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = schedule.filter((row) =>
    row.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 sm:p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-base font-bold text-white">Periodic Schedule Breakdown</h3>
            <p className="text-xs text-slate-400">Detailed growth breakdown over time</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-48">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search period..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-900/60">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300 font-mono">
          <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
            <tr>
              <th className="py-2.5 px-3">Period</th>
              <th className="py-2.5 px-3">Starting Balance</th>
              <th className="py-2.5 px-3">Interest Earned</th>
              <th className="py-2.5 px-3">Total Interest</th>
              <th className="py-2.5 px-3">Ending Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginated.length > 0 ? (
              paginated.map((row) => (
                <tr key={row.period} className="hover:bg-slate-800/50 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-200">{row.label}</td>
                  <td className="py-2.5 px-3">{formatCurrency(row.startingBalance, currency)}</td>
                  <td className="py-2.5 px-3 text-cyan-400 font-medium">{formatCurrency(row.interestEarned, currency)}</td>
                  <td className="py-2.5 px-3 text-blue-400">{formatCurrency(row.totalInterestToDate, currency)}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-semibold">{formatCurrency(row.endingBalance, currency)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-500 italic">
                  No matching period found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
          <span>
            Showing Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
