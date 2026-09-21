import React, { useState } from 'react';
import { mockApiKeys } from '../data/mockData';
import type { ApiKeyItem } from '../types/dashboard';
import {
  KeyRound,
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  Webhook,
  Activity,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { cn } from '../utils/cn';

export const ApiKeysView: React.FC = () => {
  const [keys, setKeys] = useState<ApiKeyItem[]>(mockApiKeys);
  const [showSecretMap, setShowSecretMap] = useState<Record<string, boolean>>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const toggleShowSecret = (id: string) => {
    setShowSecretMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, secret: string) => {
    navigator.clipboard.writeText(secret);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    const newKey: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      prefix: 'pk_live_new...',
      secret: `sk_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      createdDate: 'Today',
      lastUsed: 'Never',
      status: 'active',
    };

    setKeys([newKey, ...keys]);
    setShowGenerateModal(false);
    setNewKeyName('');
  };

  const handleRevokeKey = (id: string) => {
    if (confirm('Are you sure you want to revoke this API key? Services using it will fail.')) {
      setKeys(keys.map((k) => (k.id === id ? { ...k, status: 'revoked' } : k)));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Developer API Keys & Webhooks
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Authenticate your backend services, microservices, and external webhook integrations
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Secret Key</span>
        </button>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total API Calls</span>
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">8,429,102</p>
          <span className="text-[11px] text-slate-400 font-medium">Logged in the last 30 days</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Gateway Uptime</span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.99%</p>
          <span className="text-[11px] text-slate-400 font-medium">No downtime recorded</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Rate Limit Quota</span>
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <KeyRound className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">1,000 / min</p>
          <span className="text-[11px] text-slate-400 font-medium">Enterprise Tier Limit</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Webhooks</span>
            <div className="rounded-xl bg-violet-50 p-2 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
              <Webhook className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">4 Endpoints</p>
          <span className="text-[11px] text-slate-400 font-medium">Subscribed to order.paid</span>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="border-b border-slate-100 p-5 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Secret Keys</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Never expose your secret keys in frontend applications or public git repositories
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {keys.map((k) => {
            const isVisible = showSecretMap[k.id];
            const isCopied = copiedKeyId === k.id;
            const isRevoked = k.status === 'revoked';

            return (
              <div
                key={k.id}
                className={cn(
                  'flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between transition-colors',
                  isRevoked ? 'opacity-50 bg-slate-50/50 dark:bg-slate-950/40' : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                )}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{k.name}</span>
                    <span
                      className={cn(
                        'rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase',
                        isRevoked
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                          : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                      )}
                    >
                      {k.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-slate-400 text-[11px]">
                    <span>Created: {k.createdDate}</span>
                    <span>•</span>
                    <span>Last used: {k.lastUsed}</span>
                  </div>
                </div>

                {/* Key and Actions */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-[11px] text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <span>{isVisible ? k.secret : `${k.secret.substring(0, 10)}••••••••••••••••`}</span>
                    <button
                      type="button"
                      onClick={() => toggleShowSecret(k.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1"
                      title={isVisible ? 'Hide key' : 'Reveal key'}
                    >
                      {isVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(k.id, k.secret)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    title="Copy secret"
                  >
                    {isCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>

                  {!isRevoked && (
                    <button
                      type="button"
                      onClick={() => handleRevokeKey(k.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-950/40"
                      title="Revoke key"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generate Key Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Generate New Secret Key
            </h3>
            <form onSubmit={handleGenerateKey} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Key Name / Description
                </label>
                <input
                  type="text"
                  required
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Mobile iOS Client v2"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="rounded-xl px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
