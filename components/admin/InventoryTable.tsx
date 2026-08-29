'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Sparkles, CheckCircle2, XCircle, Edit, Trash2, BookOpen, Layers, RotateCcw, AlertTriangle } from 'lucide-react';
import { Item, ItemType } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { GlassCard } from '../ui/GlassCard';
import { GlassBadge } from '../ui/GlassBadge';

interface InventoryTableProps {
  items: Item[];
  onToggleStock: (id: string) => void;
  onToggleNewArrival: (id: string) => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
}

export function InventoryTable({
  items,
  onToggleStock,
  onToggleNewArrival,
  onEdit,
  onDelete,
  onReset,
}: InventoryTableProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ItemType | 'all'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.authorOrBrand.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <GlassCard className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-white/10" hoverEffect={false}>
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items in inventory..."
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500"
          />
        </div>

        {/* Filter Pills & Reset */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                typeFilter === 'all' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setTypeFilter('book')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                typeFilter === 'book' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Books</span>
            </button>
            <button
              onClick={() => setTypeFilter('stationery')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                typeFilter === 'stationery' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Stationery</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset inventory back to initial sample catalog? Any custom items will be restored.')) {
                onReset();
              }
            }}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
            title="Reset to default dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </GlassCard>

      {/* Table Container */}
      <GlassCard className="overflow-hidden border-white/10" hoverEffect={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Item Details</th>
                <th className="py-3 px-4">Category / Type</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">New Arrival Status</th>
                <th className="py-3 px-4 text-center">In Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No items found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    {/* Item details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-14 rounded-lg overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                          <Image src={item.coverImage} alt={item.title} fill sizes="60px" className="object-cover" />
                        </div>
                        <div className="max-w-xs">
                          <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 truncate">{item.authorOrBrand}</p>
                          {item.editionOrSpec && (
                            <span className="text-[10px] text-sky-400 block">{item.editionOrSpec}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category & Type */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-white block text-xs truncate max-w-[150px]">{item.category}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{item.type}</span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-emerald-400">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-slate-500 line-through block">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </td>

                    {/* Toggle New Arrival */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onToggleNewArrival(item.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          item.isNewArrival
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-sm shadow-amber-500/20 animate-pulse'
                            : 'bg-white/5 text-slate-500 border-white/10 hover:text-slate-300'
                        }`}
                        title="Click to toggle New Arrival status on homepage"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{item.isNewArrival ? 'New Arrival' : 'Regular'}</span>
                      </button>
                    </td>

                    {/* Toggle Stock */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onToggleStock(item.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          item.inStock
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                            : 'bg-rose-500/15 text-rose-300 border-rose-400/30'
                        }`}
                        title="Click to toggle In-Stock / Out-of-Stock"
                      >
                        {item.inStock ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-sky-600/30 text-slate-300 hover:text-sky-300 border border-white/10 transition-colors"
                          title="Edit details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {deleteConfirmId === item.id ? (
                          <div className="inline-flex items-center gap-1 bg-rose-950/90 border border-rose-500/50 p-1 rounded-lg">
                            <span className="text-[10px] text-rose-300 px-1">Sure?</span>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 text-[10px]"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-rose-600/30 text-slate-300 hover:text-rose-300 border border-white/10 transition-colors"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
