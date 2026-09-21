import React, { useState, useRef, useEffect } from 'react';
import type { Order, OrderStatus } from '../../types/dashboard';
import {
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { OrderDetailsModal } from './OrderDetailsModal';
import { exportOrderReceiptPDF } from '../../utils/pdfGenerator';

interface RecentOrdersTableProps {
  orders: Order[];
  onDeleteOrder?: (id: string) => void;
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
}

export const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({
  orders,
  onDeleteOrder,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 5;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    if (onDeleteOrder) {
      onDeleteOrder(id);
    }
    setActiveDropdownId(null);
  };

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, newStatus);
    }
    setActiveDropdownId(null);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
            <Clock className="h-3 w-3 animate-spin" />
            Processing
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <AlertCircle className="h-3 w-3" />
            Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <XCircle className="h-3 w-3" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800/80 dark:bg-slate-900 overflow-hidden">
        {/* Table Header Controls */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/70">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Transactions & Orders
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Manage, filter, and track recent buyer operations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Table Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filter table..."
                className="h-9 rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder-slate-500"
              />
            </div>

            {/* Export CSV Button */}
            <button
              onClick={() => {
                const headers = 'Order ID,Customer Name,Customer Email,Product,Date,Amount,Status,Payment Method\n';
                const rows = orders.map((o) => `"${o.id}","${o.customer.name}","${o.customer.email}","${o.product}","${o.date}",${o.amount},"${o.status}","${o.paymentMethod}"`).join('\n');
                const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Orders-Export-${new Date().toISOString().slice(0, 10)}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-5 py-3 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/40">
          {['all', 'completed', 'processing', 'pending', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setFilterStatus(st);
                setCurrentPage(1);
              }}
              className={cn(
                'rounded-lg px-3 py-1 text-xs font-medium capitalize transition-colors',
                filterStatus === st
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800'
              )}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800/60 dark:bg-slate-950/20">
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Product / Service</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => {
                  const isMenuOpen = activeDropdownId === order.id;

                  return (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 font-mono font-medium text-indigo-600 dark:text-indigo-400">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                          />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {order.customer.name}
                            </p>
                            <p className="text-[11px] text-slate-400">{order.customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">
                        {order.product}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-slate-500 dark:text-slate-400">
                        {order.date}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right relative">
                        {/* Action Menu Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(isMenuOpen ? null : order.id);
                          }}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
                          title="Actions menu"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {/* Interactive Dropdown Menu */}
                        {isMenuOpen && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-5 mt-1 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 z-40 text-start animate-in fade-in zoom-in-95"
                          >
                            <button
                              onClick={() => {
                                setSelectedOrderForDetails(order);
                                setActiveDropdownId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                              <Eye className="h-4 w-4 text-indigo-500" />
                              <span>View Details</span>
                            </button>

                            <button
                              onClick={() => {
                                exportOrderReceiptPDF(order);
                                setActiveDropdownId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <FileText className="h-4 w-4 text-emerald-500" />
                              <span>Download Receipt</span>
                            </button>

                            {/* Status Toggles */}
                            <div className="my-1 border-t border-slate-100 dark:border-slate-800 pt-1">
                              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                Change Status
                              </span>
                              <div className="mt-1 space-y-0.5">
                                {order.status !== 'completed' && (
                                  <button
                                    onClick={() => handleStatusChange(order.id, 'completed')}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-[11px] font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    <span>Mark as Completed</span>
                                  </button>
                                )}
                                {order.status !== 'processing' && (
                                  <button
                                    onClick={() => handleStatusChange(order.id, 'processing')}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-[11px] font-medium text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/30"
                                  >
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>Mark as Processing</span>
                                  </button>
                                )}
                                {order.status !== 'cancelled' && (
                                  <button
                                    onClick={() => handleStatusChange(order.id, 'cancelled')}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-[11px] font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                                  >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    <span>Mark as Cancelled</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Delete Action */}
                            <div className="mt-1 border-t border-slate-100 dark:border-slate-800 pt-1">
                              <button
                                onClick={() => handleDelete(order.id)}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete Order</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-400">
                    No orders match the current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 dark:border-slate-800/70 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{Math.min(filteredOrders.length, (currentPage - 1) * itemsPerPage + 1)}</span> to{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{Math.min(filteredOrders.length, currentPage * itemsPerPage)}</span> of{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{filteredOrders.length}</span> entries
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 font-medium text-slate-700 dark:text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrderForDetails}
        onClose={() => setSelectedOrderForDetails(null)}
        onUpdateStatus={onUpdateStatus}
      />
    </>
  );
};
