import React from 'react';
import { DollarSign, Users, ShoppingBag, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import type { StatMetric } from '../../types/dashboard';
import { cn } from '../../utils/cn';

interface StatCardProps {
  metric: StatMetric;
}

export const StatCard: React.FC<StatCardProps> = ({ metric }) => {
  const getIcon = () => {
    switch (metric.iconName) {
      case 'dollar':
        return DollarSign;
      case 'users':
        return Users;
      case 'shoppingBag':
        return ShoppingBag;
      case 'activity':
      default:
        return Activity;
    }
  };

  const Icon = getIcon();

  const colorConfig = {
    indigo: {
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/15',
      sparklineColor: '#6366f1',
    },
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/15',
      sparklineColor: '#10b981',
    },
    violet: {
      bg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 dark:bg-violet-500/15',
      sparklineColor: '#8b5cf6',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/15',
      sparklineColor: '#f59e0b',
    },
  };

  const currentConfig = colorConfig[metric.color] || colorConfig.indigo;

  // Generate SVG path for sparkline
  const minVal = Math.min(...metric.sparkline);
  const maxVal = Math.max(...metric.sparkline);
  const range = maxVal - minVal || 1;
  const height = 36;
  const width = 84;
  const points = metric.sparkline
    .map((val, index) => {
      const x = (index / (metric.sparkline.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-slate-950/50">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {metric.title}
          </span>
          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {metric.value}
          </h3>
        </div>
        <div className={cn('rounded-xl p-3 shadow-xs', currentConfig.bg)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
              metric.isPositive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
            )}
          >
            {metric.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {metric.change}
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            {metric.timeframe}
          </span>
        </div>

        {/* Mini Sparkline Chart */}
        <div className="h-9 w-20">
          <svg className="h-full w-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <polyline
              fill="none"
              stroke={currentConfig.sparklineColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
