import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingBag,
  Package,
  Receipt,
  CreditCard,
  Settings,
  KeyRound,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  activeTab,
  setActiveTab,
}) => {
  const { user, logout } = useAuth();
  const sections: NavSection[] = [
    {
      title: 'Main Menu',
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'Live', badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
        { id: 'customers', label: 'Customers', icon: Users, badge: 42 },
        { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: 12, badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
        { id: 'products', label: 'Products', icon: Package },
      ],
    },
    {
      title: 'Finance & Sales',
      items: [
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
        { id: 'invoices', label: 'Invoices', icon: Receipt },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'api-keys', label: 'API Keys', icon: KeyRound },
        { id: 'support', label: 'Help & Docs', icon: HelpCircle },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950',
          collapsed ? 'lg:w-20' : 'lg:w-64',
          mobileOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/20 text-white font-bold text-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold tracking-tight text-slate-900 text-lg dark:text-white">
                    Apex<span className="text-indigo-600 dark:text-indigo-400">Dash</span>
                  </span>
                  <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Enterprise Suite</span>
              </div>
            )}
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Collapse button for desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:flex"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.title}
                </h3>
              )}
              {collapsed && idx > 0 && (
                <div className="mx-auto my-2 w-8 border-t border-slate-200 dark:border-slate-800" />
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileOpen(false);
                      }}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 dark:bg-indigo-600'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105',
                          isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                        )}
                      />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-start truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : item.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Plan Card (Desktop only when expanded) */}
        {!collapsed && (
          <div className="p-3 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-100 dark:border-indigo-900/40">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Cloud Pro Plan</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              You are using 78% of your monthly API compute quota.
            </p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-3">
              <div className="bg-indigo-600 h-full rounded-full w-[78%]" />
            </div>
            <button className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-1.5 transition-colors shadow-xs">
              Upgrade Storage
            </button>
          </div>
        )}

        {/* User Footer Profile */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800/80">
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/70',
              collapsed && 'justify-center'
            )}
          >
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                alt={user?.name || "User Avatar"}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
            </div>
            {!collapsed && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {user?.name || "Alex Morgan"}
                </span>
                <span className="truncate text-[11px] text-slate-400">
                  {user?.email || "alex@company.com"}
                </span>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={logout}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 cursor-pointer transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
