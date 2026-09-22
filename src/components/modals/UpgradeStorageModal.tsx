import React, { useState } from 'react';
import {
  X,
  HardDrive,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Server,
} from 'lucide-react';

interface UpgradeStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsageGB?: number;
  currentTotalGB?: number;
  onUpgradeSuccess: (newTotalGB: number) => void;
}

const STORAGE_TIERS = [
  {
    id: 'starter',
    name: 'Standard Pro',
    sizeGB: 100,
    price: '$29',
    period: '/month',
    features: ['100 GB NVMe Storage', '50,000 API Requests/mo', 'Standard Support'],
    isCurrent: true,
  },
  {
    id: 'scale',
    name: 'Enterprise Scale',
    sizeGB: 500,
    price: '$69',
    period: '/month',
    features: ['500 GB High-Throughput NVMe', '250,000 API Requests/mo', '24/7 Dedicated Slack Channel', 'Daily Automated Snapshot'],
    popular: true,
  },
  {
    id: 'ultra',
    name: 'Dedicated Cloud Mesh',
    sizeGB: 1000,
    price: '$129',
    period: '/month',
    features: ['1,000 GB Global SSD Cluster', 'Unlimited High-Speed API Quota', 'Custom SLA 99.99%', 'Dedicated Account Architect'],
  },
];

export const UpgradeStorageModal: React.FC<UpgradeStorageModalProps> = ({
  isOpen,
  onClose,
  currentUsageGB = 78,
  currentTotalGB = 100,
  onUpgradeSuccess,
}) => {
  const [selectedTier, setSelectedTier] = useState<number>(500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [upgradedSuccess, setUpgradedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentPercent = Math.round((currentUsageGB / currentTotalGB) * 100);
  const newPercent = Math.round((currentUsageGB / selectedTier) * 100);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsProcessing(false);
    setUpgradedSuccess(true);
    onUpgradeSuccess(selectedTier);
    setTimeout(() => {
      setUpgradedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <HardDrive className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Upgrade Cloud Storage Quota
                </h3>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  Instant Activation
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Scale your cloud compute capacity, database volume, and API bandwidth seamlessly.
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

        {upgradedSuccess ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Storage Upgraded Successfully! 🎉
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your capacity has been upgraded to <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedTier} GB</strong>. Current usage is now only <strong className="text-emerald-600 font-bold">{newPercent}%</strong>.
            </p>
          </div>
        ) : (
          <div className="space-y-6 pt-5">
            {/* Current vs New Capacity Gauge */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/20">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Storage Allocation Preview:
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  {currentUsageGB} GB used of {selectedTier} GB (<strong className="text-indigo-600 dark:text-indigo-400">{newPercent}%</strong>)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(newPercent, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
                <span>Before: {currentPercent}% used ({currentTotalGB} GB limit)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  +{(selectedTier - currentTotalGB)} GB Extra Space
                </span>
              </div>
            </div>

            {/* Storage Tier Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {STORAGE_TIERS.map((tier) => {
                const isSelected = selectedTier === tier.sizeGB;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.sizeGB)}
                    className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/20 shadow-md shadow-indigo-600/10 dark:border-indigo-500 dark:bg-indigo-950/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-800/40'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase text-white shadow-sm">
                        Recommended
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold text-slate-900 dark:text-white">
                      <Server className="h-3.5 w-3.5 text-indigo-500" />
                      <span>{tier.name}</span>
                    </div>

                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        {tier.sizeGB}
                      </span>
                      <span className="text-xs font-bold text-slate-400">GB</span>
                    </div>

                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {tier.price} <span className="text-[10px] text-slate-400 font-normal">{tier.period}</span>
                    </p>

                    <ul className="mt-3 space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-500 dark:text-slate-400">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Encrypted 256-bit Stripe Enterprise Billing</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleUpgrade}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Upgrading Cluster...</span>
                    </>
                  ) : (
                    <>
                      <span>Upgrade to {selectedTier} GB</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
