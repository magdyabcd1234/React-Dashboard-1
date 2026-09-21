import React, { useState } from 'react';
import {
  X,
  Mail,
  Crown,
  Building2,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingBag,
  DollarSign,
  Copy,
  Check,
} from 'lucide-react';
import type { DetailedCustomer } from '../../types/dashboard';

interface CustomerProfileModalProps {
  customer: DetailedCustomer | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (customer: DetailedCustomer) => void;
  onUpdateStatus: (customerId: string, newStatus: DetailedCustomer['status']) => void;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({
  customer,
  isOpen,
  onClose,
  onSendMessage,
  onUpdateStatus,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !customer) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(customer.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const avgOrderValue =
    customer.ordersCount > 0 ? (customer.totalSpent / customer.ordersCount).toFixed(2) : '0.00';

  const getStatusBadge = (status: DetailedCustomer['status']) => {
    switch (status) {
      case 'vip':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Crown className="h-3.5 w-3.5 text-purple-500" /> VIP Partner
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Account
          </span>
        );
      case 'lead':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            Prospect Lead
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-md"
              />
              {customer.status === 'vip' && (
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white shadow-md">
                  <Crown className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{customer.name}</h3>
                {getStatusBadge(customer.status)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                {customer.company}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-slate-400" />
                {customer.country} • ID: {customer.id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-3 gap-3 py-5">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
              <span>Total Spent</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              ${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Lifetime Value
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <ShoppingBag className="h-3.5 w-3.5 text-indigo-500" />
              <span>Orders Placed</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {customer.ordersCount}
            </p>
            <span className="text-[10px] text-slate-400">Total volume</span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <CreditCard className="h-3.5 w-3.5 text-violet-500" />
              <span>Avg. Order</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              ${avgOrderValue}
            </p>
            <span className="text-[10px] text-slate-400">Per transaction</span>
          </div>
        </div>

        {/* Customer Details Box */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/20 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Email Address:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                {customer.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50 transition-colors"
                title="Copy email"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Member Since:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              {customer.joinedDate}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Change Status Tier:</span>
            <div className="flex gap-1.5">
              {(['active', 'vip', 'lead'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => onUpdateStatus(customer.id, tier)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold uppercase transition-colors ${
                    customer.status === tier
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            onClick={() => {
              onClose();
              onSendMessage(customer);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all cursor-pointer active:scale-98"
          >
            <Mail className="h-4 w-4" />
            <span>Send Direct Message</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
