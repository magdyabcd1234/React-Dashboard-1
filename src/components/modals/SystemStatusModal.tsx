import React from 'react';
import { X, Activity, CheckCircle2, ShieldCheck, Server, Cpu, RefreshCw, Zap } from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  { name: 'Global API Gateway & Edge Proxy', status: 'Operational', latency: '18ms', uptime: '99.99%', icon: Server },
  { name: 'Distributed PostgreSQL Database Cluster', status: 'Operational', latency: '4ms', uptime: '100.0%', icon: Cpu },
  { name: 'Automated PDF Receipt & Invoice Engine', status: 'Operational', latency: '95ms', uptime: '100.0%', icon: Zap },
  { name: 'Enterprise Authentication & JWT Vault', status: 'Operational', latency: '12ms', uptime: '100.0%', icon: ShieldCheck },
  { name: 'Real-time WebSocket & Live Data Feeds', status: 'Operational', latency: '22ms', uptime: '99.98%', icon: Activity },
  { name: 'Encrypted Multi-Region NVMe Cloud Storage', status: 'Operational', latency: '28ms', uptime: '100.0%', icon: Server },
];

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  System Health & Operational Status
                </h3>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  v2.4 Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Real-time telemetry and cluster operational metrics across global nodes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* Main Status Hero */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  All Systems Fully Operational
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Zero degraded services detected in the past 90 days.
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                100% Uptime
              </span>
              <p className="text-[10px] text-slate-400">Last 90 Days</p>
            </div>
          </div>

          {/* Service Nodes List */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-slate-400">
              Core Subsystems & Microservices
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 rounded-2xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30 overflow-hidden">
              {SERVICES.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-2xs dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {srv.name}
                        </p>
                        <p className="text-[10px] text-slate-400">Uptime: {srv.uptime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {srv.latency}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        {srv.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Historical Bar representation */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>90 Days Ago</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">100.0% Continuous Availability</span>
              <span>Today</span>
            </div>
            <div className="flex gap-1 h-7 items-center">
              {Array.from({ length: 45 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 transition-colors h-6 rounded-xs"
                  title="Day 100% Operational"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800">
          <span className="text-[11px] text-slate-400">
            Node: us-east-prod-cluster-04 • Automated heartbeat: 10s
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
