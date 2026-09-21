import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockTrafficSources } from '../../data/mockData';
import { Globe } from 'lucide-react';

export const TrafficSourceChart: React.FC = () => {
  const totalVisits = mockTrafficSources.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/70">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Acquisition Channels
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Breakdown of organic & referral leads
            </p>
          </div>
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            <Globe className="h-4 w-4" />
          </div>
        </div>

        {/* Donut Chart with Centered KPI */}
        <div className="relative h-56 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {data.name}: {data.value.toLocaleString()} ({data.percentage}%)
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={mockTrafficSources}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={88}
                paddingAngle={5}
                dataKey="value"
              >
                {mockTrafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {(totalVisits / 1000).toFixed(1)}k
            </span>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Total Visits
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown list */}
      <div className="mt-4 space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/70">
        {mockTrafficSources.map((source) => (
          <div key={source.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {source.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono text-[11px]">
                {source.value.toLocaleString()}
              </span>
              <span className="font-bold text-slate-900 dark:text-white w-8 text-right">
                {source.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
