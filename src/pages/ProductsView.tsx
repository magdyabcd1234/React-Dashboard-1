import React, { useState } from 'react';
import { mockCatalogProducts } from '../data/mockData';
import type { CatalogProduct } from '../types/dashboard';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Plus,
  Star,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../utils/cn';

export const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<CatalogProduct[]>(mockCatalogProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('SaaS Suite');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('100');

  const categories = ['all', 'SaaS Suite', 'AI Services', 'Cybersecurity', 'Infrastructure', 'Finance Tool'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return;

    const newProd: CatalogProduct = {
      id: `PRD-${Math.floor(100 + Math.random() * 900)}`,
      name: prodName,
      category: prodCategory,
      price: parseFloat(prodPrice) || 99,
      stock: parseInt(prodStock) || 50,
      status: parseInt(prodStock) > 20 ? 'in_stock' : parseInt(prodStock) > 0 ? 'low_stock' : 'out_of_stock',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80',
      totalSales: 0,
      rating: 5.0,
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    setProdName('');
    setProdPrice('');
  };

  const getStockBadge = (status: CatalogProduct['status']) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> In Stock
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <AlertTriangle className="h-3 w-3" /> Low Stock
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <XCircle className="h-3 w-3" /> Out of Stock
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Product Catalog & Inventory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your digital products, software tiers, API subscriptions, and inventory stock
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Solutions</span>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{products.length}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3 w-3" /> Active Catalog
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">In Stock Ready</span>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {products.filter((p) => p.status === 'in_stock').length}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Ready for deployment</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Low Stock Alerts</span>
          <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
            {products.filter((p) => p.status === 'low_stock').length}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Needs replenishment</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Units Sold</span>
          <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {products.reduce((acc, p) => acc + p.totalSales, 0).toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">All time volume</span>
        </div>
      </div>

      {/* Catalog Table Container */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Filter row */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, SKUs, categories..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  categoryFilter === cat
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-950/20">
                <th className="px-5 py-3">Product Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock Units</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Total Sold</th>
                <th className="px-5 py-3">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{product.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-600 dark:text-slate-300">
                    {product.category}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                    {product.stock} units
                  </td>
                  <td className="px-5 py-3.5">{getStockBadge(product.status)}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                    {product.totalSales}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Add New Solution / Product
            </h3>
            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product / Service Name
                </label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. AI Data Pipeline Suite"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                >
                  <option>SaaS Suite</option>
                  <option>AI Services</option>
                  <option>Cybersecurity</option>
                  <option>Infrastructure</option>
                  <option>Finance Tool</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="299.00"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="100"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
