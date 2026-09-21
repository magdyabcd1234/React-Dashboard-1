import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Check,
  Save,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface SettingsViewProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ darkMode, setDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance'>('profile');
  const [fullName, setFullName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@company.com');
  const [company, setCompany] = useState('ApexDash Analytics Inc.');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Platform & Account Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize your profile, notification channels, security parameters, and workspace preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={cn(
            'flex items-center gap-2 pb-3 border-b-2 transition-colors',
            activeTab === 'profile'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
          )}
        >
          <User className="h-4 w-4" />
          <span>Profile & Workspace</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={cn(
            'flex items-center gap-2 pb-3 border-b-2 transition-colors',
            activeTab === 'notifications'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
          )}
        >
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={cn(
            'flex items-center gap-2 pb-3 border-b-2 transition-colors',
            activeTab === 'security'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
          )}
        >
          <Shield className="h-4 w-4" />
          <span>Security & 2FA</span>
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={cn(
            'flex items-center gap-2 pb-3 border-b-2 transition-colors',
            activeTab === 'appearance'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
          )}
        >
          <Palette className="h-4 w-4" />
          <span>Appearance</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Personal Information
            </h3>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Alex Morgan"
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <button
                  type="button"
                  onClick={() => alert('Photo upload dialog simulation...')}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Change Avatar
                </button>
                <p className="text-[11px] text-slate-400 mt-1">JPG, GIF or PNG. Max size 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Work Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Organization / Enterprise
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Notification Preferences
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="flex items-center justify-between py-3.5">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Instant Purchase & Order Alerts
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Receive instant notifications whenever a client transaction settles
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between py-3.5">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Weekly Financial Digest
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Get a curated performance report of revenues, MRR, and subscriber changes
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Security & Credentials
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Two-Factor Authentication (2FA)
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Enforce SMS or Authenticator App code verification at login
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className={cn(
                    'rounded-xl px-3.5 py-1.5 font-semibold transition-colors',
                    twoFactorAuth
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  )}
                >
                  {twoFactorAuth ? 'Enabled' : 'Enable 2FA'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Interface Theme
            </h3>
            <p className="text-xs text-slate-400">
              Select your preferred color theme for ApexDash
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
              <button
                type="button"
                onClick={() => setDarkMode(false)}
                className={cn(
                  'rounded-2xl border-2 p-4 text-center transition-all',
                  !darkMode
                    ? 'border-indigo-600 bg-indigo-50/20'
                    : 'border-slate-200 dark:border-slate-800'
                )}
              >
                <div className="h-10 w-10 rounded-full bg-slate-100 mx-auto mb-2 flex items-center justify-center text-slate-700">
                  ☀️
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</p>
              </button>

              <button
                type="button"
                onClick={() => setDarkMode(true)}
                className={cn(
                  'rounded-2xl border-2 p-4 text-center transition-all',
                  darkMode
                    ? 'border-indigo-600 bg-indigo-950/20'
                    : 'border-slate-200 dark:border-slate-800'
                )}
              >
                <div className="h-10 w-10 rounded-full bg-slate-800 mx-auto mb-2 flex items-center justify-center text-amber-400">
                  🌙
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</p>
              </button>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
              <Check className="h-4 w-4" /> Changes saved successfully!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
