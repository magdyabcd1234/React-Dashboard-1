import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockRevenueDataYearly, mockRevenueDataMonthly } from '../../data/mockData';
import { TrendingUp } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Period: <span className="text-slate-900 dark:text-white font-bold">{label}</span>
        </p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name === 'revenue' ? 'Revenue' : entry.name === 'profit' ? 'Net Profit' : 'Expenses'}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'yearly' | 'monthly'>('yearly');

  const data = timeRange === 'yearly' ? mockRevenueDataYearly : mockRevenueDataMonthly;
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
      {/* Chart Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 dark:border-slate-800/70">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Financial Performance
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +18.4%
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            Revenue and net profit stream breakdown
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80 self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('yearly')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timeRange === 'yearly'
                ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-700 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            12 Months
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timeRange === 'monthly'
                ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-700 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Summary Badges */}
      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Total Inflow
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Net Margin
          </span>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            ${totalProfit.toLocaleString()}
          </p>
        </div>
        <div className="hidden sm:block">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Margin Rate
          </span>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
            {((totalProfit / totalRevenue) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b" opacity={0.15} />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(val) => `$${val / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfit)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Indicators */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-indigo-500 shadow-xs" />
          <span className="text-slate-600 dark:text-slate-400">Total Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-xs" />
          <span className="text-slate-600 dark:text-slate-400">Net Profit</span>
        </div>
      </div>
    </div>
  );
};
