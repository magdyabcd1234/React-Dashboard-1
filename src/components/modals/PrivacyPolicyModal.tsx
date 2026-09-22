import React from 'react';
import { X, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                ApexDash Enterprise Privacy Policy
              </h3>
              <p className="text-[11px] text-slate-400">
                Effective Date: September 2026 • Compliance Standard: GDPR & SOC2 Type II
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
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/20">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
              <Lock className="h-4 w-4 text-indigo-500" />
              Our Core Commitment
            </h4>
            <p className="text-[11px]">
              ApexDash Analytics Inc. takes your commercial confidentiality and personal data security with utmost gravity. We do not monetize, sell, or rent customer analytics or corporate transaction records to any third parties.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Information We Collect</h4>
            <p>
              We collect information strictly necessary to provide high-speed enterprise dashboard services, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <li>Authentication credentials (work email, hashed passwords, session tokens).</li>
              <li>Customer organization profiles and corporate billing identifiers.</li>
              <li>Transactional data generated during receipt creation and payment tracking.</li>
              <li>Telemetry metrics for cluster health and API rate limit management.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Data Encryption & Storage</h4>
            <p>
              All traffic between your browser and ApexDash servers is encrypted in transit using TLS 1.3. Stored database records and generated PDF receipts utilize AES-256 bit encryption at rest with automated multi-zone replication.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. GDPR & CCPA Rights</h4>
            <p>
              Enterprise clients hold complete authority to inspect, export, or permanently erase their data records. You can request automated account archives or data purge via <span className="font-semibold text-indigo-600 dark:text-indigo-400">privacy@apexdash.io</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Fully Verified & Audited
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
