'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Layers, Sparkles, PhoneCall, Search, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Item, StationeryCategory } from '@/lib/types';
import { STORE_CONTACT } from '@/lib/initial-data';
import { getStoredItems, subscribeToInventory } from '@/lib/store';
import { ItemCard } from '@/components/items/ItemCard';
import { ItemDetailModal } from '@/components/items/ItemDetailModal';
import { GlassCard } from '@/components/ui/GlassCard';
import { DeliveryNoticeCard } from '@/components/common/DeliveryNoticeCard';

const STATIONERY_CATEGORIES: StationeryCategory[] = [
  'College & School Notebooks',
  'Pens & Writing Instruments',
  'Engineering & Drafting Tools',
  'Medical & Lab Supplies',
  'Art & Craft Materials',
  'Office & Filing Supplies',
  'Calculators & Electronics',
];

export default function StationeryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [search, setSearch] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    setItems(getStoredItems());
    const unsubscribe = subscribeToInventory((updated) => {
      setItems(updated);
    });
    return () => unsubscribe();
  }, []);

  const stationeryItems = items.filter((i) => i.type === 'stationery');

  const filteredItems = useMemo(() => {
    return stationeryItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (inStockOnly && !item.inStock) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesBrand = item.authorOrBrand.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesDesc) return false;
      }
      return true;
    });
  }, [stationeryItems, selectedCategory, inStockOnly, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <GlassCard className="p-6 sm:p-8 bg-gradient-to-r from-indigo-950/70 via-slate-900/80 to-purple-950/70 border-purple-500/20" hoverEffect={false}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Davangere Stationery Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Stationery & Educational Supplies
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Equipping schools, AVK College, BIET engineering, and JJM medical students with brand-name notebooks, drafting instruments, luxury pens, calculators, and office supplies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <a
              href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call to Order: {STORE_CONTACT.phoneNumbers.primary}</span>
            </a>
          </div>
        </div>
      </GlassCard>

      {/* Category Pills & Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stationery (e.g. Classmate, Casio)..."
              className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500"
            />
          </div>

          {/* In Stock Toggle */}
          <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 cursor-pointer hover:bg-white/10 transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>In-Stock Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500 ml-1"
            />
          </label>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            All Stationery ({stationeryItems.length})
          </button>

          {STATIONERY_CATEGORIES.map((cat) => {
            const count = stationeryItems.filter((i) => i.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Stationery Grid */}
      {filteredItems.length === 0 ? (
        <GlassCard className="p-12 text-center space-y-4 border-white/10" hoverEffect={false}>
          <Layers className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Stationery Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            No stationery supplies match your current search or category. Try clearing filters or calling the store.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearch('');
              setInStockOnly(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onQuickView={setSelectedItem} />
          ))}
        </div>
      )}

      {/* Delivery Notice */}
      <DeliveryNoticeCard />

      {/* Quick View Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
