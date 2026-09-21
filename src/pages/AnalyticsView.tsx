import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  Eye,
  Clock,
  MousePointerClick,
  Users,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Calendar,
} from 'lucide-react';

const analyticsSessionsData = [
  { day: 'Mon', organic: 12400, paid: 4800, direct: 8200 },
  { day: 'Tue', organic: 14200, paid: 5600, direct: 9100 },
  { day: 'Wed', organic: 16800, paid: 6200, direct: 10400 },
  { day: 'Thu', organic: 15300, paid: 5900, direct: 9800 },
  { day: 'Fri', organic: 18900, paid: 7400, direct: 11600 },
  { day: 'Sat', organic: 21400, paid: 8600, direct: 13200 },
  { day: 'Sun', organic: 19800, paid: 7900, direct: 12100 },
];

const conversionFunnel = [
  { step: 'Page Impressions', count: '450,000', percentage: '100%', drop: null },
  { step: 'Landing Visits', count: '215,000', percentage: '47.7%', drop: '-52.3%' },
  { step: 'Solution Explorations', count: '94,200', percentage: '20.9%', drop: '-56.1%' },
  { step: 'Checkout Initiated', count: '32,100', percentage: '7.1%', drop: '-65.9%' },
  { step: 'Purchased Customers', count: '12,450', percentage: '2.8%', drop: '-61.2%' },
];

const topCountries = [
  { name: 'United States', flag: '🇺🇸', visits: '184,200', share: 42, color: 'bg-indigo-500' },
  { name: 'Germany', flag: '🇩🇪', visits: '78,900', share: 18, color: 'bg-emerald-500' },
  { name: 'United Kingdom', flag: '🇬🇧', visits: '52,400', share: 12, color: 'bg-sky-500' },
  { name: 'United Arab Emirates', flag: '🇦🇪', visits: '43,800', share: 10, color: 'bg-amber-500' },
  { name: 'France', flag: '🇫🇷', visits: '35,100', share: 8, color: 'bg-rose-500' },
  { name: 'Other Countries', flag: '🌐', visits: '44,200', share: 10, color: 'bg-slate-400' },
];

export const AnalyticsView: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analytics & Traffic Insights
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deep dive into user acquisition channels, engagement funnels, and global reach
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Last 7 Days (Live)</span>
          </div>
          <button
            onClick={() => alert('Exporting Analytics CSV...')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* 4 Analytics KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Page Views</span>
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">1,482,920</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> +18.2% <span className="text-[11px] text-slate-400 font-normal">vs previous week</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Avg. Session Duration</span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">4m 24s</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> +14.6% <span className="text-[11px] text-slate-400 font-normal">longer sessions</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Bounce Rate</span>
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <MousePointerClick className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">31.8%</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> -3.4% <span className="text-[11px] text-slate-400 font-normal">healthy bounce rate</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Unique Visitors</span>
            <div className="rounded-xl bg-violet-50 p-2 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">340,110</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> +22.8% <span className="text-[11px] text-slate-400 font-normal">vs last week</span>
          </div>
        </div>
      </div>

      {/* Main Sessions Breakdown Chart */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Daily Traffic Channels Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Comparing Organic Traffic, Paid Ad Campaigns, and Direct Referrals
            </p>
          </div>

          {/* Toggle Bar / Line */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800 self-start">
            <button
              onClick={() => setChartType('bar')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                chartType === 'bar'
                  ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Bar View
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                chartType === 'line'
                  ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Line View
            </button>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={analyticsSessionsData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b" opacity={0.15} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">{label}</p>
                          {payload.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4 text-xs py-0.5">
                              <span className="flex items-center gap-1.5 text-slate-500 capitalize">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                {item.name}:
                              </span>
                              <span className="font-bold text-slate-900 dark:text-white">{Number(item.value).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="organic" fill="#6366f1" radius={[4, 4, 0, 0]} name="Organic" />
                <Bar dataKey="direct" fill="#10b981" radius={[4, 4, 0, 0]} name="Direct" />
                <Bar dataKey="paid" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Paid Ads" />
              </BarChart>
            ) : (
              <LineChart data={analyticsSessionsData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b" opacity={0.15} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip />
                <Line type="monotone" dataKey="organic" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} name="Organic" />
                <Line type="monotone" dataKey="direct" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Direct" />
                <Line type="monotone" dataKey="paid" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="Paid Ads" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lower Row: Conversion Funnel & Global Geography */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Conversion Funnel */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Visitor Conversion Funnel
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 mb-5">
            Step-by-step user journey from impression to final sale
          </p>

          <div className="space-y-3">
            {conversionFunnel.map((step, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {idx + 1}. {step.step}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{step.count}</span>
                    <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[11px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      {step.percentage}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                    style={{ width: step.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Top Regions & Devices */}
        <div className="space-y-6">
          {/* Devices Breakdown */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Devices & Hardware Distribution
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-100 p-3 text-center dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <Monitor className="h-5 w-5 mx-auto text-indigo-500 mb-1" />
                <p className="text-xs font-bold text-slate-900 dark:text-white">62%</p>
                <p className="text-[11px] text-slate-400">Desktop</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-3 text-center dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <Smartphone className="h-5 w-5 mx-auto text-emerald-500 mb-1" />
                <p className="text-xs font-bold text-slate-900 dark:text-white">31%</p>
                <p className="text-[11px] text-slate-400">Mobile</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-3 text-center dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <Tablet className="h-5 w-5 mx-auto text-amber-500 mb-1" />
                <p className="text-xs font-bold text-slate-900 dark:text-white">7%</p>
                <p className="text-[11px] text-slate-400">Tablet</p>
              </div>
            </div>
          </div>

          {/* Top Countries */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Top Geographic Regions
            </h3>
            <div className="space-y-2.5">
              {topCountries.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-[11px]">{c.visits} visits</span>
                    <span className="font-bold text-slate-900 dark:text-white w-8 text-right">{c.share}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
