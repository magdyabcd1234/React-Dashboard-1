import React, { useState } from 'react';
import { mockDetailedCustomers } from '../data/mockData';
import type { DetailedCustomer } from '../types/dashboard';
import {
  UserCheck,
  Crown,
  TrendingUp,
  Search,
  Mail,
  MoreVertical,
  UserPlus,
  Eye,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { CustomerProfileModal } from '../components/customers/CustomerProfileModal';
import { SendMessageModal } from '../components/customers/SendMessageModal';

export const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<DetailedCustomer[]>(mockDetailedCustomers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedCustomerForProfile, setSelectedCustomerForProfile] = useState<DetailedCustomer | null>(null);
  const [selectedCustomerForMessage, setSelectedCustomerForMessage] = useState<DetailedCustomer | null>(null);

  // New Customer Form State
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustCompany, setNewCustCompany] = useState('');
  const [newCustCountry, setNewCustCountry] = useState('United States');

  const filteredCustomers = customers.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustEmail) return;

    const newCust: DetailedCustomer = {
      id: `CUST-00${customers.length + 1}`,
      name: newCustName,
      email: newCustEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      company: newCustCompany || 'Independent Enterprise',
      status: 'active',
      totalSpent: 0,
      ordersCount: 0,
      country: newCustCountry,
      joinedDate: 'Today',
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setNewCustName('');
    setNewCustEmail('');
    setNewCustCompany('');
  };

  const getStatusBadge = (status: DetailedCustomer['status']) => {
    switch (status) {
      case 'vip':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
            <Crown className="h-3 w-3" /> VIP Client
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <UserCheck className="h-3 w-3" /> Active
          </span>
        );
      case 'lead':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            Prospective Lead
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Customer Directory (CRM)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your global client base, accounts, relationships, and lifetime values
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Accounts</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">42,892</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> +8.4% <span className="text-[11px] text-slate-400 font-normal">this month</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">VIP / Enterprise</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">1,240</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-semibold">
            <Crown className="h-3 w-3" /> +12.1% <span className="text-[11px] text-slate-400 font-normal">high tier</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Retention Rate</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">94.2%</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> +1.8% <span className="text-[11px] text-slate-400 font-normal">satisfaction</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Average Lifetime Value</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$1,420.00</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> +$120 <span className="text-[11px] text-slate-400 font-normal">per subscriber</span>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Table Filters */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, email..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'vip', 'active', 'lead', 'inactive'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  statusFilter === st
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-950/20">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3">Total Spend</th>
                <th className="px-5 py-3">Orders</th>
                <th className="px-5 py-3">Joined Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3.5">
                    <div
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => setSelectedCustomerForProfile(cust)}
                      title="Click to view full customer profile"
                    >
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 group-hover:ring-2 group-hover:ring-indigo-500 transition-all"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {cust.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{cust.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {cust.company}
                  </td>
                  <td className="px-5 py-3.5">{getStatusBadge(cust.status)}</td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">{cust.country}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                    ${cust.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                    {cust.ordersCount}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{cust.joinedDate}</td>
                  <td className="px-5 py-3.5 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId(activeDropdownId === cust.id ? null : cust.id);
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
                      title="Customer actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {activeDropdownId === cust.id && (
                      <div className="absolute right-5 mt-1 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 z-30 text-start animate-in fade-in zoom-in-95">
                        <button
                          onClick={() => {
                            setSelectedCustomerForProfile(cust);
                            setActiveDropdownId(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 text-indigo-500" />
                          <span>View Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedCustomerForMessage(cust);
                            setActiveDropdownId(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Mail className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Send Message</span>
                        </button>

                        <div className="my-1 border-t border-slate-100 dark:border-slate-800 pt-1">
                          <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            Change Tier
                          </span>
                          {cust.status !== 'vip' && (
                            <button
                              onClick={() => {
                                setCustomers(customers.map((c) => (c.id === cust.id ? { ...c, status: 'vip' } : c)));
                                setActiveDropdownId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-1 text-[11px] font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                            >
                              <Crown className="h-3 w-3" />
                              <span>Upgrade to VIP</span>
                            </button>
                          )}
                          {cust.status !== 'active' && (
                            <button
                              onClick={() => {
                                setCustomers(customers.map((c) => (c.id === cust.id ? { ...c, status: 'active' } : c)));
                                setActiveDropdownId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-1 text-[11px] font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Set as Active</span>
                            </button>
                          )}
                        </div>

                        <div className="mt-1 border-t border-slate-100 dark:border-slate-800 pt-1">
                          <button
                            onClick={() => {
                              setCustomers(customers.filter((c) => c.id !== cust.id));
                              setActiveDropdownId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete Customer</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Add New Customer Account
            </h3>
            <form onSubmit={handleAddCustomer} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  placeholder="rachel@enterprise.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={newCustCompany}
                  onChange={(e) => setNewCustCompany(e.target.value)}
                  placeholder="e.g. CyberTech Labs"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Country
                </label>
                <select
                  value={newCustCountry}
                  onChange={(e) => setNewCustCountry(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                >
                  <option>United States</option>
                  <option>United Arab Emirates</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>Singapore</option>
                  <option>France</option>
                  <option>Saudi Arabia</option>
                  <option>Egypt</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Create Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Profile Modal */}
      <CustomerProfileModal
        customer={selectedCustomerForProfile}
        isOpen={!!selectedCustomerForProfile}
        onClose={() => setSelectedCustomerForProfile(null)}
        onSendMessage={(cust) => {
          setSelectedCustomerForMessage(cust);
        }}
        onUpdateStatus={(customerId, newStatus) => {
          setCustomers((prev) =>
            prev.map((c) => (c.id === customerId ? { ...c, status: newStatus } : c))
          );
          if (selectedCustomerForProfile && selectedCustomerForProfile.id === customerId) {
            setSelectedCustomerForProfile({ ...selectedCustomerForProfile, status: newStatus });
          }
        }}
      />

      {/* Send Message / Direct Communication Modal */}
      <SendMessageModal
        customer={selectedCustomerForMessage}
        isOpen={!!selectedCustomerForMessage}
        onClose={() => setSelectedCustomerForMessage(null)}
        onMessageSent={(cust, subject) => {
          console.log(`Dispatched message to ${cust.email}: "${subject}"`);
        }}
      />
    </div>
  );
};
