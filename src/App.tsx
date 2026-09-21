import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { QuickActionsModal } from './components/dashboard/QuickActionsModal';
import { OrderDetailsModal } from './components/dashboard/OrderDetailsModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './pages/LoginView';

// Dedicated Page Views
import { DashboardView } from './pages/DashboardView';
import { AnalyticsView } from './pages/AnalyticsView';
import { CustomersView } from './pages/CustomersView';
import { OrdersView } from './pages/OrdersView';
import { ProductsView } from './pages/ProductsView';
import { TransactionsView } from './pages/TransactionsView';
import { InvoicesView } from './pages/InvoicesView';
import { SettingsView } from './pages/SettingsView';
import { ApiKeysView } from './pages/ApiKeysView';
import { SupportView } from './pages/SupportView';

import {
  mockRecentOrders,
  mockActivities,
  mockNotifications,
  mockDetailedCustomers,
  mockInvoices,
  mockCatalogProducts,
} from './data/mockData';
import type { Order, OrderStatus, NotificationItem } from './types/dashboard';

function DashboardContent() {
  const { isAuthenticated, isLoading } = useAuth();

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('apex_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sidebar & Navigation states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Search & Modal states
  const [searchQuery, setSearchQuery] = useState('');
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  // Dynamic Data states
  const [orders, setOrders] = useState<Order[]>(mockRecentOrders);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [activities, setActivities] = useState(mockActivities);

  // Sync theme with HTML document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('apex_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('apex_theme', 'light');
    }
  }, [darkMode]);

  // Keyboard shortcut (Cmd/Ctrl + K for search focus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAddNewOrder = (newOrderData: {
    customerName: string;
    amount: number;
    product: string;
  }) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: {
        name: newOrderData.customerName,
        email: `${newOrderData.customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      },
      product: newOrderData.product,
      date: 'Just now',
      amount: newOrderData.amount,
      status: 'completed',
      paymentMethod: 'Credit Card',
    };

    setOrders([newOrder, ...orders]);

    // Also add to live activities
    setActivities([
      {
        id: `act-${Date.now()}`,
        user: newOrderData.customerName,
        avatar: '',
        action: 'completed purchase for',
        target: `$${newOrderData.amount.toFixed(2)} (${newOrderData.product})`,
        timestamp: 'Just now',
        type: 'order',
      },
      ...activities,
    ]);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        user: 'Administrator',
        avatar: '',
        action: 'deleted transaction record',
        target: `#${orderId}`,
        timestamp: 'Just now',
        type: 'system',
      },
      ...prev,
    ]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrderForModal && selectedOrderForModal.id === orderId) {
      setSelectedOrderForModal({ ...selectedOrderForModal, status: newStatus });
    }
  };

  // Loading indicator while resolving auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white gap-4">
        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Initializing ApexDash Security...
        </p>
      </div>
    );
  }

  // Not authenticated: Show Login Screen
  if (!isAuthenticated) {
    return <LoginView />;
  }

  // Render dynamic page view based on active sidebar tab
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            orders={orders}
            activities={activities}
            onOpenQuickAction={() => setQuickActionOpen(true)}
            onDeleteOrder={handleDeleteOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        );
      case 'analytics':
        return <AnalyticsView />;
      case 'customers':
        return <CustomersView />;
      case 'orders':
        return (
          <OrdersView
            orders={orders}
            onOpenNewOrder={() => setQuickActionOpen(true)}
            onDeleteOrder={handleDeleteOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        );
      case 'products':
        return <ProductsView />;
      case 'transactions':
        return <TransactionsView />;
      case 'invoices':
        return <InvoicesView />;
      case 'settings':
        return <SettingsView darkMode={darkMode} setDarkMode={setDarkMode} />;
      case 'api-keys':
        return <ApiKeysView />;
      case 'support':
        return <SupportView />;
      default:
        return (
          <DashboardView
            orders={orders}
            activities={activities}
            onOpenQuickAction={() => setQuickActionOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 font-sans antialiased selection:bg-indigo-500 selection:text-white dark:bg-[#090d16] dark:text-slate-100">
      <div className="flex">
        {/* Left Collapsible Navigation Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Top Sticky Header */}
          <Header
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            notifications={notifications}
            onMarkAllNotificationsRead={handleMarkAllRead}
            onOpenQuickAction={() => setQuickActionOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            orders={orders}
            customers={mockDetailedCustomers}
            invoices={mockInvoices}
            products={mockCatalogProducts}
            onSelectOrder={(order) => setSelectedOrderForModal(order)}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Main Content View Switcher */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
            {renderCurrentView()}
          </main>

          {/* Dashboard Footer */}
          <footer className="border-t border-slate-200/80 bg-white/50 px-4 py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 ApexDash Analytics Inc. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  All Systems Operational
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <a href="#privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</a>
                <a href="#terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms</a>
                <a href="#status" className="hover:text-indigo-600 dark:hover:text-indigo-400">Status v2.4</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Quick Action Modal for live order creation */}
      <QuickActionsModal
        isOpen={quickActionOpen}
        onClose={() => setQuickActionOpen(false)}
        onAddOrderSuccess={handleAddNewOrder}
      />

      {/* Order Details Modal triggered from search or table */}
      <OrderDetailsModal
        order={selectedOrderForModal}
        onClose={() => setSelectedOrderForModal(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}

export default App;
