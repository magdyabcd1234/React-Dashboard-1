import React, { useState } from 'react';
import { mockTransactions } from '../data/mockData';
import type { Transaction } from '../types/dashboard';
import {
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Search,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { cn } from '../utils/cn';

export const TransactionsView: React.FC = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [search, setSearch] = useState('');
  const [gatewayFilter, setGatewayFilter] = useState('all');

  const filteredTxns = transactions.filter((t) => {
    const matchesGateway = gatewayFilter === 'all' || t.gateway === gatewayFilter;
    const matchesSearch =
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    return matchesGateway && matchesSearch;
  });

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Settled
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <Clock className="h-3 w-3" /> In Escrow
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <XCircle className="h-3 w-3" /> Failed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Financial Ledger & Transactions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-gateway payment settlements, fees, and ledger audit records
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Financial Ledger report...')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Gross Inflow Volume</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$148,250.00</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> +16.2% <span className="text-[11px] text-slate-400 font-normal">this month</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Net Settled Payouts</span>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">$139,800.00</p>
          <span className="text-[11px] text-slate-400 font-medium">Deposited to corporate account</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Gateway Processing Fees</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$8,450.00</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
            <Percent className="h-3 w-3" /> Avg 2.1% across Stripe & PayPal
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Dispute & Refund Rate</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">0.24%</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Well below 1% industry safety limit
          </span>
        </div>
      </div>

      {/* Transactions Table Container */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by transaction ID or client..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'Stripe', 'PayPal', 'Apple Pay', 'Bank Wire'].map((gw) => (
              <button
                key={gw}
                onClick={() => setGatewayFilter(gw)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  gatewayFilter === gw
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                {gw}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-950/20">
                <th className="px-5 py-3">Transaction ID</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Date & Time</th>
                <th className="px-5 py-3">Gateway</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Gross Amount</th>
                <th className="px-5 py-3">Fee</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3.5 font-mono font-medium text-indigo-600 dark:text-indigo-400">
                    {txn.id}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                    {txn.customer}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{txn.date}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {txn.gateway}
                  </td>
                  <td className="px-5 py-3.5 capitalize text-slate-500 dark:text-slate-400">
                    {txn.type}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                    ${txn.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-400">
                    ${txn.fee.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5">{getStatusBadge(txn.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
