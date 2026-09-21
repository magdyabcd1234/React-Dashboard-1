import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Mail,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import type { DetailedCustomer } from '../../types/dashboard';

interface SendMessageModalProps {
  customer: DetailedCustomer | null;
  isOpen: boolean;
  onClose: () => void;
  onMessageSent?: (customer: DetailedCustomer, subject: string, message: string) => void;
}

const TEMPLATES = [
  {
    id: 'statement',
    label: 'Statement & Billing',
    subject: 'Your Latest ApexDash Monthly Statement & Invoicing',
    body: (name: string, company: string) =>
      `Dear ${name},\n\nWe hope you are enjoying your enterprise experience with ApexDash at ${company}.\n\nThis is a friendly notification that your latest account statement and invoice summary are ready for review. You can download and inspect all transaction receipts directly from your dashboard.\n\nShould you need customized billing assistance or enterprise support, please feel free to reply directly to this message.\n\nBest regards,\n ApexDash Client Operations Team`,
  },
  {
    id: 'vip_offer',
    label: 'VIP Upgrade',
    subject: 'Exclusive Priority SLA & Cloud Infrastructure Allocation',
    body: (name: string, company: string) =>
      `Hi ${name},\n\nAs a valued partner at ${company}, we would like to invite your team to participate in our VIP Dedicated Infrastructure Program.\n\nThis includes dedicated API rate limits, guaranteed 99.99% SLA, and personal onboarding assistance from our principal engineering architects.\n\nLet us know if you'd like to schedule a brief 15-minute briefing session.\n\nSincerely,\nApexDash Enterprise Success`,
  },
  {
    id: 'checkin',
    label: 'Success Check-in',
    subject: 'Checking in on your ApexDash experience',
    body: (name: string) =>
      `Hello ${name},\n\nWe are checking in to ensure everything is running smoothly with your recent dashboard deployments.\n\nPlease don't hesitate to reach out if you have any questions or feature requests for our product team.\n\nWarm regards,\nApexDash Customer Support`,
  },
];

export const SendMessageModal: React.FC<SendMessageModalProps> = ({
  customer,
  isOpen,
  onClose,
  onMessageSent,
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Initialize with default template when customer changes
  useEffect(() => {
    if (customer) {
      setSubject(TEMPLATES[0].subject);
      setMessage(TEMPLATES[0].body(customer.name, customer.company));
      setSentSuccess(false);
    }
  }, [customer]);

  if (!isOpen || !customer) return null;

  const handleSelectTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setSubject(tmpl.subject);
    setMessage(tmpl.body(customer.name, customer.company));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSending(true);

    // Realistic delivery feedback simulation
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSending(false);
    setSentSuccess(true);

    if (onMessageSent) {
      onMessageSent(customer, subject, message);
    }

    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Dispatch Direct Communication
              </h3>
              <p className="text-xs text-slate-400">
                To: <span className="font-semibold text-slate-700 dark:text-slate-300">{customer.name}</span> ({customer.email})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {sentSuccess ? (
          <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Message Successfully Dispatched!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Your message has been queued and delivered to <span className="font-semibold text-indigo-600 dark:text-indigo-400">{customer.email}</span> with encrypted SSL verification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 pt-4 text-xs">
            {/* Template Quick Selectors */}
            <div className="space-y-1.5">
              <span className="block font-semibold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">
                Quick Template Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleSelectTemplate(tmpl)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-indigo-500 transition-colors cursor-pointer"
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">
                Subject Line
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject line..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/70 dark:text-white"
              />
            </div>

            {/* Message Body Field */}
            <div className="space-y-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">
                Message Content
              </label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/70 dark:text-white font-sans text-xs leading-relaxed resize-none"
              />
            </div>

            {/* Options Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span>Priority:</span>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent Escalation</option>
                </select>
              </div>

              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                TLS 1.3 Encrypted
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
              >
                {isSending ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
