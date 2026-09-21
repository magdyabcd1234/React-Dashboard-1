import React from 'react';
import type { TopProduct } from '../../types/dashboard';
import { Star, Package } from 'lucide-react';

interface TopProductsListProps {
  products: TopProduct[];
}

export const TopProductsList: React.FC<TopProductsListProps> = ({ products }) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/70">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Top Performing Products
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Highest revenue yielding solutions this quarter
          </p>
        </div>
        <div className="rounded-xl bg-violet-50 p-2 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
          <Package className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {products.map((product) => {
          const progress = Math.min(100, Math.round((product.sales / 1200) * 100));

          return (
            <div
              key={product.id}
              className="group rounded-xl p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-slate-400">{product.category}</span>
                    <span className="text-[10px] text-slate-300 dark:text-slate-600">•</span>
                    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-500">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400">{product.sales} sales</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2.5 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-400">{progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
