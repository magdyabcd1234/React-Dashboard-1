import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Check,
  Save,
  Upload,
  Camera,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface SettingsViewProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
];

export const SettingsView: React.FC<SettingsViewProps> = ({ darkMode, setDarkMode }) => {
  const { user, updateProfile } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance'>('profile');

  // Form states initialized with current user
  const [fullName, setFullName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'alex@company.com');
  const [company, setCompany] = useState(user?.company || 'ApexDash Enterprise');
  const [avatar, setAvatar] = useState(user?.avatar || PRESET_AVATARS[0]);

  // Notifications states
  const [emailAlerts, setEmailAlerts] = useState<boolean>(() => {
    return localStorage.getItem('apex_pref_alerts') !== 'false';
  });
  const [weeklyDigest, setWeeklyDigest] = useState<boolean>(() => {
    return localStorage.getItem('apex_pref_digest') !== 'false';
  });

  // Security states
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(() => {
    return localStorage.getItem('apex_pref_2fa') === 'true';
  });
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);

  // Status
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
      setCompany(user.company || 'ApexDash Enterprise');
      setAvatar(user.avatar || PRESET_AVATARS[0]);
    }
  }, [user]);

  // Handle local file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Update user profile in AuthContext & localStorage
    updateProfile({
      name: fullName,
      email: email,
      company: company,
      avatar: avatar,
    });

    // 2. Save preferences
    localStorage.setItem('apex_pref_alerts', String(emailAlerts));
    localStorage.setItem('apex_pref_digest', String(weeklyDigest));
    localStorage.setItem('apex_pref_2fa', String(twoFactorAuth));

    // 3. Password handling if entered
    if (newPass) {
      if (newPass.length < 6) {
        setPasswordNotice('New password must be at least 6 characters.');
        return;
      }
      if (newPass !== confirmPass) {
        setPasswordNotice('Passwords do not match.');
        return;
      }
      setPasswordNotice('Password updated successfully!');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setPasswordNotice(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Platform & Account Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize your profile, avatar, notification preferences, security credentials, and language
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={cn(
            'flex items-center gap-2 pb-3 border-b-2 transition-colors cursor-pointer shrink-0',
            activeTab === 'profile'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
          )}
        >
          <User className="h-4 w-4" />
          <span>Profile & Avatar</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={cn(
            'flex items-center gap-2 pb-3 border-b-2 transition-colors cursor-pointer shrink-0',
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
            'flex items-center gap-2 pb-3 border-b-2 transition-colors cursor-pointer shrink-0',
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
            'flex items-center gap-2 pb-3 border-b-2 transition-colors cursor-pointer shrink-0',
            activeTab === 'appearance'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
          )}
        >
          <Palette className="h-4 w-4" />
          <span>Theme & Language</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Personal Information & Avatar
            </h3>

            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
              <div className="relative group shrink-0">
                <img
                  src={avatar}
                  alt={fullName}
                  className="h-20 w-20 rounded-2xl object-cover ring-2 ring-indigo-500/30 shadow-md transition-opacity group-hover:opacity-90"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Upload new photo"
                >
                  <Camera className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload New Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvatar(PRESET_AVATARS[0])}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    Reset Default
                  </button>
                </div>

                {/* Preset Avatars Selector */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400">Or choose preset:</span>
                  <div className="flex gap-2">
                    {PRESET_AVATARS.map((preset, idx) => (
                      <img
                        key={idx}
                        src={preset}
                        alt={`Preset ${idx}`}
                        onClick={() => setAvatar(preset)}
                        className={`h-7 w-7 rounded-lg object-cover cursor-pointer transition-all ${
                          avatar === preset ? 'ring-2 ring-indigo-600 scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Recommended size: 400x400px. JPG, PNG or WebP up to 2MB.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
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
                  required
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
                  className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
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
                  className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Security Credentials & Authentication
            </h3>

            {passwordNotice && (
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 text-xs">
                {passwordNotice}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
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
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
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
                    'rounded-xl px-3.5 py-1.5 font-semibold transition-colors cursor-pointer',
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

        {/* Appearance & Language Tab */}
        {activeTab === 'appearance' && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Language & Localization
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Switch dashboard language and text direction (RTL / LTR)
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md pt-3">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'rounded-2xl border-2 p-4 text-center transition-all cursor-pointer',
                    language === 'en'
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800'
                  )}
                >
                  <div className="text-2xl mb-1">🇺🇸</div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">English (LTR)</p>
                  <p className="text-[10px] text-slate-400">Standard English</p>
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={cn(
                    'rounded-2xl border-2 p-4 text-center transition-all cursor-pointer',
                    language === 'ar'
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800'
                  )}
                >
                  <div className="text-2xl mb-1">🇸🇦</div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">العربية (RTL)</p>
                  <p className="text-[10px] text-slate-400">واجهة عربية كاملة</p>
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interface Color Theme
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Select your preferred visual mode for ApexDash
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md pt-3">
                <button
                  type="button"
                  onClick={() => setDarkMode(false)}
                  className={cn(
                    'rounded-2xl border-2 p-4 text-center transition-all cursor-pointer',
                    !darkMode
                      ? 'border-indigo-600 bg-indigo-50/20'
                      : 'border-slate-200 dark:border-slate-800'
                  )}
                >
                  <div className="h-10 w-10 rounded-full bg-slate-100 mx-auto mb-2 flex items-center justify-center text-slate-700 text-lg">
                    ☀️
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDarkMode(true)}
                  className={cn(
                    'rounded-2xl border-2 p-4 text-center transition-all cursor-pointer',
                    darkMode
                      ? 'border-indigo-600 bg-indigo-950/20'
                      : 'border-slate-200 dark:border-slate-800'
                  )}
                >
                  <div className="h-10 w-10 rounded-full bg-slate-800 mx-auto mb-2 flex items-center justify-center text-amber-400 text-lg">
                    🌙
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
              <Check className="h-4 w-4" /> Changes saved and profile updated!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors cursor-pointer"
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
