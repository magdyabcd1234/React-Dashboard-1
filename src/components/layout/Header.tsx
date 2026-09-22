import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Moon,
  Sun,
  Bell,
  CheckCheck,
  Plus,
  Command,
  ExternalLink,
  X,
  LogOut,
  Languages,
} from 'lucide-react';
import type { NotificationItem, Order, DetailedCustomer, Invoice, CatalogProduct } from '../../types/dashboard';
import { GlobalSearchResults } from './GlobalSearchResults';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onOpenQuickAction: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  orders: Order[];
  customers: DetailedCustomer[];
  invoices: Invoice[];
  products: CatalogProduct[];
  onSelectOrder: (order: Order) => void;
  onNavigateTab: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  darkMode,
  setDarkMode,
  notifications,
  onMarkAllNotificationsRead,
  onOpenQuickAction,
  searchQuery,
  setSearchQuery,
  orders,
  customers,
  invoices,
  products,
  onSelectOrder,
  onNavigateTab,
}) => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-950/80 lg:px-8">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Live Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block" ref={searchContainerRef}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchFocused(true);
            }}
            placeholder={t('header.searchPlaceholder')}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-16 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchFocused(false);
                }}
                className="rounded-md p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-800"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <kbd className="inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              <Command className="h-3 w-3" /> K
            </kbd>
          </div>

          {/* Interactive Live Search Dropdown */}
          <GlobalSearchResults
            query={searchQuery}
            isOpen={searchFocused && !!searchQuery.trim()}
            onClose={() => {
              setSearchFocused(false);
              setSearchQuery('');
            }}
            orders={orders}
            customers={customers}
            invoices={invoices}
            products={products}
            onSelectOrder={onSelectOrder}
            onNavigateTab={onNavigateTab}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="rounded-xl border border-slate-200/80 bg-white px-2.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-100 hover:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1.5"
          title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
        >
          <Languages className="h-4 w-4 text-indigo-500" />
          <span className="tracking-wide">{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onOpenQuickAction}
          className="hidden md:inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs shadow-indigo-600/30 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600/40 active:scale-98 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{t('header.newAction')}</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-xl border border-slate-200/80 bg-white p-2.5 text-slate-600 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 cursor-pointer"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border border-slate-200/80 bg-white p-2.5 text-slate-600 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-400">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={onMarkAllNotificationsRead}
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium cursor-pointer"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all as read
                </button>
              </div>

              <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`py-3 px-2 rounded-xl transition-colors ${
                      item.read
                        ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        : 'bg-indigo-50/40 dark:bg-indigo-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with dropdown & dynamic user data */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 p-1.5 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt={user?.name || "User Avatar"}
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div className="hidden text-start xl:block pr-1">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user?.name || "Alex Morgan"}</p>
              <p className="text-[10px] text-slate-400">{user?.role || "Administrator"}</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{user?.name || "Alex Morgan"}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || "alex@company.com"}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    onNavigateTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 text-start cursor-pointer"
                >
                  <span>{t('header.myProfile')}</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('invoices');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 text-start cursor-pointer"
                >
                  {t('header.billing')}
                </button>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-start text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30 cursor-pointer transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{t('header.signOut')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
