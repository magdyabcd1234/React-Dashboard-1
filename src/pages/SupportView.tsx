import React, { useState } from 'react';
import {
  BookOpen,
  MessageSquare,
  ChevronDown,
  Search,
  LifeBuoy,
  FileCode2,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I integrate the ApexDash API with our React frontend?',
    answer:
      'You can install our official client SDK via npm (`@apexdash/client`). Initialize it with your public key in your App wrapper and use our hooks such as `useAnalytics()` and `useOrders()` to retrieve live synchronized data.',
  },
  {
    question: 'How is enterprise billing calculated for multiple team seats?',
    answer:
      'Our Cloud Pro and Enterprise plans include 10 seats by default. Additional seats are billed at $15/month per member. All invoices are consolidated at the end of the monthly billing cycle.',
  },
  {
    question: 'How do webhooks handle retries upon endpoint failure?',
    answer:
      'ApexDash automatically implements exponential backoff retries up to 7 times over a 24-hour window whenever your webhook endpoint returns a non-2xx HTTP status code.',
  },
  {
    question: 'What is your uptime guarantee for global API gateways?',
    answer:
      'We maintain an enterprise 99.99% Service Level Agreement (SLA) with active-active edge clusters distributed across North America, Europe, Asia, and the Middle East.',
  },
];

export const SupportView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-300 w-fit backdrop-blur-md mb-3">
          <LifeBuoy className="h-3.5 w-3.5" />
          <span>Help & Documentation Center</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          How can we help you today?
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-indigo-200 max-w-xl">
          Search developer guides, review API specs, or get in touch with our dedicated engineering support.
        </p>

        {/* Search input */}
        <div className="relative mt-6 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search docs, APIs, billing questions, webhooks..."
            className="w-full rounded-2xl border-0 bg-white/10 py-3.5 pl-11 pr-4 text-xs text-white placeholder-indigo-200/60 backdrop-blur-md focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* 3 Quick Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-400 transition-colors cursor-pointer group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 group-hover:scale-105 transition-transform">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
            Developer Documentation
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Step-by-step installation, REST API endpoints, and SDK usage.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-400 transition-colors cursor-pointer group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            <FileCode2 className="h-5 w-5" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
            API Reference & Swagger
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Interactive playground with example payloads and schemas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 hover:border-indigo-400 transition-colors cursor-pointer group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 group-hover:scale-105 transition-transform">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
            24/7 Priority Support
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Connect directly with an engineer via Slack or dedicated chat.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-3.5">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between text-left text-xs font-semibold text-slate-900 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-slate-400 transition-transform duration-200',
                      isOpen && 'rotate-180 text-indigo-600 dark:text-indigo-400'
                    )}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed animate-in fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
