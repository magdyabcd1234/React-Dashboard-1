import React from 'react';
import { X, FileText } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Terms of Service & Master Service Agreement
              </h3>
              <p className="text-[11px] text-slate-400">
                ApexDash Platform Version 2.4 • Effective September 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">
              Agreement Overview
            </h4>
            <p className="text-[11px]">
              By logging into, using, or interacting with the ApexDash Enterprise Dashboard and its associated API endpoints, you agree to comply with and be bound by the following operational terms.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Authorized Platform Usage</h4>
            <p>
              Users are granted a non-exclusive, non-transferable license to access analytics dashboards, export transaction invoices, and utilize allocated cloud storage quotas in accordance with their designated plan.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. 99.99% SLA Uptime Commitment</h4>
            <p>
              ApexDash Enterprise guarantees a monthly service availability of not less than 99.99%. In the rare event of service disruption exceeding guaranteed margins, billing credits are automatically calculated and refunded to your corporate account balance.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Storage & API Rate Limits</h4>
            <p>
              Compute quotas and storage capacities are strictly governed by active subscriptions. Storage upgrades take immediate effect upon verification through payment gateway authorization.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800">
          <span className="text-[11px] text-slate-400">
            Questions? Contact <strong className="text-slate-700 dark:text-slate-200">legal@apexdash.io</strong>
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
