import React from 'react';
import { Calendar, Download, Sparkles } from 'lucide-react';
import { exportExecutiveReportPDF } from '../../utils/pdfGenerator';
import { useAuth } from '../../context/AuthContext';

interface WelcomeBannerProps {
  onOpenQuickAction: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onOpenQuickAction }) => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const firstName = user?.name ? user.name.split(' ')[0] : 'Alex';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20">
      {/* Background glowing orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md border border-indigo-500/30">
              <Calendar className="h-3.5 w-3.5" />
              {currentDate}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Feed Active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Everything looks healthy. Your revenue increased by{' '}
            <span className="font-semibold text-emerald-400">+14.8%</span> this month with 12
            new customer subscriptions pending verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportExecutiveReportPDF()}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4 text-indigo-300" />
            <span>Export Report (PDF)</span>
          </button>

          <button
            onClick={onOpenQuickAction}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/40 transition-all hover:bg-indigo-500 active:scale-95 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>
    </div>
  );
};
