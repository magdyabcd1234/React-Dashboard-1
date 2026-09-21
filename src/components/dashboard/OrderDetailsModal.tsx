import { X, CheckCircle2, Clock, AlertCircle, XCircle, Download, Mail, CreditCard, FileText } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/dashboard';
import { exportOrderReceiptPDF, exportInvoicePDF } from '../../utils/pdfGenerator';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Completed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
            <Clock className="h-3.5 w-3.5 animate-spin" /> Processing
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <AlertCircle className="h-3.5 w-3.5" /> Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <XCircle className="h-3.5 w-3.5" /> Cancelled
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Order {order.id}
            </h3>
            {getStatusBadge(order.status)}
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="mt-5 space-y-5 text-xs">
          {/* Customer Info Card */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <img
                src={order.customer.avatar}
                alt={order.customer.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {order.customer.name}
                </p>
                <p className="text-slate-400 mt-0.5">{order.customer.email}</p>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  Verified Buyer
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Emailing ${order.customer.email}...`)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Contact</span>
            </button>
          </div>

          {/* Product & Order Breakdown */}
          <div className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider text-[11px]">
              Purchased Solution
            </h4>
            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-medium text-slate-900 dark:text-white">
                {order.product}
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                ${order.amount.toFixed(2)}
              </span>
            </div>

            {/* Financial Summary */}
            <div className="mt-3 space-y-1.5 text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${(order.amount * 0.85).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Tax & VAT (15%):</span>
                <span>${(order.amount * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-slate-900 dark:text-white text-sm">
                <span>Total Settled:</span>
                <span className="text-indigo-600 dark:text-indigo-400">${order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment & Logistics details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
              <span className="text-slate-400 text-[11px]">Payment Method</span>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                <CreditCard className="h-4 w-4 text-indigo-500" />
                {order.paymentMethod}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
              <span className="text-slate-400 text-[11px]">Order Timestamp</span>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                {order.date}
              </p>
            </div>
          </div>

          {/* Quick status change inside modal */}
          {onUpdateStatus && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Change Status:
              </span>
              <div className="flex gap-1.5">
                {(['completed', 'processing', 'pending', 'cancelled'] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateStatus(order.id, st);
                      onClose();
                    }}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold capitalize transition-all ${
                      order.status === st
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportOrderReceiptPDF(order)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <FileText className="h-4 w-4 text-emerald-500" />
              <span>Download Receipt</span>
            </button>
            <button
              onClick={() =>
                exportInvoicePDF({
                  id: order.id,
                  number: `INV-${order.id}`,
                  customer: order.customer.name,
                  email: order.customer.email,
                  amount: order.amount,
                  issueDate: order.date,
                  status: order.status,
                })
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400 dark:hover:bg-indigo-900/60 cursor-pointer transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Invoice PDF</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
