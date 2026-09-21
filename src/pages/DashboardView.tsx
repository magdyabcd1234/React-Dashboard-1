import React from 'react';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { TrafficSourceChart } from '../components/dashboard/TrafficSourceChart';
import { RecentOrdersTable } from '../components/dashboard/RecentOrdersTable';
import { TopProductsList } from '../components/dashboard/TopProductsList';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { mockStatMetrics, mockTopProducts } from '../data/mockData';
import type { Order, OrderStatus, ActivityItem } from '../types/dashboard';

interface DashboardViewProps {
  orders: Order[];
  activities: ActivityItem[];
  onOpenQuickAction: () => void;
  onDeleteOrder?: (id: string) => void;
  onUpdateOrderStatus?: (id: string, status: OrderStatus) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  activities,
  onOpenQuickAction,
  onDeleteOrder,
  onUpdateOrderStatus,
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome & KPI Banner */}
      <WelcomeBanner onOpenQuickAction={onOpenQuickAction} />

      {/* KPI Stats Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockStatMetrics.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>

      {/* Performance & Channels Charts Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <TrafficSourceChart />
        </div>
      </section>

      {/* Recent Orders & Widgets Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrdersTable
            orders={orders}
            onDeleteOrder={onDeleteOrder}
            onUpdateStatus={onUpdateOrderStatus}
          />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <TopProductsList products={mockTopProducts} />
          <ActivityFeed activities={activities} />
        </div>
      </section>
    </div>
  );
};
