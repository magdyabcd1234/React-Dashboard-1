import {
  ShoppingBag,
  Receipt,
  Package,
  Compass,
  ArrowRight,
  Search,
} from 'lucide-react';
import type { Order, DetailedCustomer, Invoice, CatalogProduct } from '../../types/dashboard';

interface GlobalSearchResultsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  customers: DetailedCustomer[];
  invoices: Invoice[];
  products: CatalogProduct[];
  onSelectOrder: (order: Order) => void;
  onNavigateTab: (tabId: string) => void;
}

interface NavShortcut {
  id: string;
  title: string;
  category: string;
  keywords: string[];
}

const APP_NAVIGATION: NavShortcut[] = [
  { id: 'dashboard', title: 'Dashboard Overview', category: 'Navigation', keywords: ['home', 'overview', 'stats', 'metrics'] },
  { id: 'analytics', title: 'Live Performance Analytics', category: 'Navigation', keywords: ['charts', 'traffic', 'growth', 'kpi'] },
  { id: 'orders', title: 'Orders & Fulfillment', category: 'Navigation', keywords: ['purchases', 'sales', 'checkout'] },
  { id: 'customers', title: 'Customer Directory', category: 'Navigation', keywords: ['users', 'clients', 'members'] },
  { id: 'products', title: 'Products & Solutions Catalog', category: 'Navigation', keywords: ['items', 'inventory', 'stock'] },
  { id: 'transactions', title: 'Financial Transactions', category: 'Navigation', keywords: ['payments', 'gateways', 'stripe', 'paypal'] },
  { id: 'invoices', title: 'Billing & Invoices', category: 'Navigation', keywords: ['statements', 'bills', 'accounting'] },
  { id: 'settings', title: 'System Settings', category: 'Navigation', keywords: ['preferences', 'profile', 'dark mode', 'config'] },
  { id: 'api-keys', title: 'API Keys & Developer Tokens', category: 'Navigation', keywords: ['dev', 'tokens', 'secret', 'integration'] },
  { id: 'support', title: 'Help & Documentation', category: 'Navigation', keywords: ['docs', 'faq', 'support', 'guide'] },
];

export const GlobalSearchResults: React.FC<GlobalSearchResultsProps> = ({
  query,
  isOpen,
  onClose,
  orders,
  customers,
  invoices,
  products,
  onSelectOrder,
  onNavigateTab,
}) => {
  if (!isOpen || !query.trim()) return null;

  const q = query.trim().toLowerCase();

  // 1. Search matching orders
  const matchedOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q)
  ).slice(0, 4);

  // 2. Search matching customers
  const matchedCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q)
  ).slice(0, 3);

  // 3. Search matching invoices
  const matchedInvoices = invoices.filter(
    (inv) =>
      inv.number.toLowerCase().includes(q) ||
      inv.customer.toLowerCase().includes(q) ||
      inv.email.toLowerCase().includes(q)
  ).slice(0, 3);

  // 4. Search matching products
  const matchedProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  ).slice(0, 3);

  // 5. Search app pages/navigation
  const matchedNav = APP_NAVIGATION.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.keywords.some((k) => k.toLowerCase().includes(q))
  ).slice(0, 3);

  const totalResults =
    matchedOrders.length +
    matchedCustomers.length +
    matchedInvoices.length +
    matchedProducts.length +
    matchedNav.length;

  return (
    <div
      className="absolute left-0 top-full mt-2 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/60 z-50 animate-in fade-in zoom-in-95 max-h-[75vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
        <span className="font-semibold text-slate-500 dark:text-slate-400">
          Search results for &quot;<span className="text-indigo-600 dark:text-indigo-400 font-bold">{query}</span>&quot;
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {totalResults} {totalResults === 1 ? 'match' : 'matches'}
        </span>
      </div>

      {totalResults === 0 ? (
        <div className="py-8 text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <Search className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            No results found for &quot;{query}&quot;
          </p>
          <p className="text-[11px] text-slate-400">
            Try searching with customer name, order ID, product name, or a section name.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-3 pt-2">
          {/* Navigation matches */}
          {matchedNav.length > 0 && (
            <div className="pt-2 space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Navigation & Views
              </span>
              {matchedNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateTab(item.id);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors text-start"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <Compass className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-[10px] text-slate-400">Jump to section</p>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                </button>
              ))}
            </div>
          )}

          {/* Orders matches */}
          {matchedOrders.length > 0 && (
            <div className="pt-2 space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Orders ({matchedOrders.length})
              </span>
              {matchedOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => {
                    onSelectOrder(order);
                    onClose();
                  }}
                  className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 dark:text-white">{order.id}</span>
                        <span className="text-slate-400">•</span>
                        <span className="truncate font-medium text-slate-600 dark:text-slate-300">
                          {order.customer.name}
                        </span>
                      </div>
                      <p className="truncate text-[11px] text-slate-400">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-end shrink-0 pl-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      ${order.amount.toFixed(2)}
                    </span>
                    <span className="block text-[10px] capitalize text-slate-400">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Customer matches */}
          {matchedCustomers.length > 0 && (
            <div className="pt-2 space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Customers ({matchedCustomers.length})
              </span>
              {matchedCustomers.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onNavigateTab('customers');
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/70 transition-colors text-start"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-7 w-7 rounded-full object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{c.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{c.company} • {c.email}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    ${c.totalSpent.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Invoices matches */}
          {matchedInvoices.length > 0 && (
            <div className="pt-2 space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Invoices ({matchedInvoices.length})
              </span>
              {matchedInvoices.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => {
                    onNavigateTab('invoices');
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/70 transition-colors text-start"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Receipt className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{inv.number}</p>
                      <p className="text-[10px] text-slate-400">{inv.customer}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="font-bold text-slate-900 dark:text-white">${inv.amount.toFixed(2)}</span>
                    <span className="block text-[10px] uppercase text-emerald-600 font-semibold">{inv.status}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Products matches */}
          {matchedProducts.length > 0 && (
            <div className="pt-2 space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Products ({matchedProducts.length})
              </span>
              {matchedProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onNavigateTab('products');
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/70 transition-colors text-start"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.category}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">${p.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
