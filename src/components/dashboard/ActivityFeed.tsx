import React from 'react';
import type { ActivityItem } from '../../types/dashboard';
import { Activity, ShoppingBag, CreditCard, UserPlus, Server } from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-3.5 w-3.5 text-indigo-500" />;
      case 'payment':
        return <CreditCard className="h-3.5 w-3.5 text-emerald-500" />;
      case 'user':
        return <UserPlus className="h-3.5 w-3.5 text-sky-500" />;
      case 'system':
      default:
        return <Server className="h-3.5 w-3.5 text-amber-500" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/70">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Live Activity Stream
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Real-time operations and platform audit events
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Activity className="h-4 w-4" />
        </div>
      </div>

      <div className="relative mt-4 pl-4 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
        <div className="space-y-4">
          {activities.map((item) => (
            <div key={item.id} className="relative flex items-start gap-3">
              {/* Icon circle */}
              <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-slate-900 dark:ring-slate-900 border border-slate-200 dark:border-slate-700">
                {getIcon(item.type)}
              </div>

              {/* Text content */}
              <div className="flex-1 text-xs">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.user}
                  </span>{' '}
                  {item.action}{' '}
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {item.target}
                  </span>
                </p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {item.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
