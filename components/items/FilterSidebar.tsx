'use client';

import React from 'react';
import { Search, Sparkles, Filter, CheckCircle2, RotateCcw, BookOpen, Layers } from 'lucide-react';
import { ItemType, ItemCategory } from '@/lib/types';
import { GlassCard } from '../ui/GlassCard';

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedType: ItemType | 'all';
  setSelectedType: (type: ItemType | 'all') => void;
  selectedCategory: string | 'all';
  setSelectedCategory: (cat: string | 'all') => void;
  availableCategories: ItemCategory[];
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  newArrivalsOnly: boolean;
  setNewArrivalsOnly: (val: boolean) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  onReset: () => void;
}

export function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  availableCategories,
  inStockOnly,
  setInStockOnly,
  newArrivalsOnly,
  setNewArrivalsOnly,
  maxPrice,
  setMaxPrice,
  onReset,
}: FilterSidebarProps) {
  return (
    <GlassCard className="p-5 space-y-6 sticky top-24 border-white/10" hoverEffect={false}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Filter className="w-4 h-4 text-sky-400" />
          <span>Filters & Search</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-sky-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 block">Search Title, Author or Item</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Tejaswi, FDA, Classmate, Casio..."
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Type Toggle: All / Books / Stationery */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 block">Item Type</label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
              selectedType === 'all'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Items
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('book')}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
              selectedType === 'book'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Books</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('stationery')}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
              selectedType === 'stationery'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Stationery</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">Category</label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'all' && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
          </button>

          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                selectedCategory === cat
                  ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className="truncate">{cat}</span>
              {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Toggles: New Arrivals & In Stock */}
      <div className="space-y-2.5 pt-3 border-t border-white/10">
        <label className="text-xs font-semibold text-slate-300 block">Special Filters</label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>New Arrivals Only</span>
          </div>
          <input
            type="checkbox"
            checked={newArrivalsOnly}
            onChange={(e) => setNewArrivalsOnly(e.target.checked)}
            className="w-4 h-4 rounded accent-amber-500"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>In Stock Only</span>
          </div>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-500"
          />
        </label>
      </div>

      {/* Price Slider */}
      <div className="space-y-2 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold">Max Price</span>
          <span className="text-emerald-400 font-bold">Up to ₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min={50}
          max={2000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>₹50</span>
          <span>₹1,000</span>
          <span>₹2,000+</span>
        </div>
      </div>
    </GlassCard>
  );
}
