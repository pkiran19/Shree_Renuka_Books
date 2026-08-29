'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookOpen, Sparkles, PhoneCall, Filter, RotateCcw } from 'lucide-react';
import { Item, ItemType, ItemCategory, BookCategory } from '@/lib/types';
import { STORE_CONTACT } from '@/lib/initial-data';
import { getStoredItems, subscribeToInventory } from '@/lib/store';
import { ItemCard } from '@/components/items/ItemCard';
import { ItemDetailModal } from '@/components/items/ItemDetailModal';
import { FilterSidebar } from '@/components/items/FilterSidebar';
import { GlassCard } from '@/components/ui/GlassCard';

function BooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter');
  const initialSearch = searchParams.get('search') || '';

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState<ItemType | 'all'>('book');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(initialFilter === 'new-arrivals');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  useEffect(() => {
    setItems(getStoredItems());
    const unsubscribe = subscribeToInventory((updated) => {
      setItems(updated);
    });
    return () => unsubscribe();
  }, []);

  // Update when URL search params change
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialFilter === 'new-arrivals') setNewArrivalsOnly(true);
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialCategory, initialFilter, initialSearch]);

  const availableCategories: ItemCategory[] = useMemo(() => {
    const set = new Set<ItemCategory>();
    items.forEach((item) => {
      if (selectedType === 'all' || item.type === selectedType) {
        set.add(item.category);
      }
    });
    return Array.from(set);
  }, [items, selectedType]);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Type filter
        if (selectedType !== 'all' && item.type !== selectedType) return false;

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title.toLowerCase().includes(q);
          const matchesAuthor = item.authorOrBrand.toLowerCase().includes(q);
          const matchesDesc = item.description.toLowerCase().includes(q);
          const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesAuthor && !matchesDesc && !matchesTags) return false;
        }

        // New Arrivals Only
        if (newArrivalsOnly && !item.isNewArrival) return false;

        // In Stock Only
        if (inStockOnly && !item.inStock) return false;

        // Price
        if (item.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        // Default newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [items, selectedType, selectedCategory, searchQuery, newArrivalsOnly, inStockOnly, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('book');
    setSelectedCategory('all');
    setInStockOnly(false);
    setNewArrivalsOnly(false);
    setMaxPrice(2000);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <GlassCard className="p-6 sm:p-8 bg-gradient-to-r from-sky-950/70 via-slate-900/80 to-indigo-950/70 border-sky-500/20" hoverEffect={false}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Complete Davangere Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Books & Academic Textbooks
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Prescribed university textbooks, Kannada Sahitya, competitive exam study materials, and general reading. Available for same-day delivery in Davangere or store pickup at PJ Extension.
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

      {/* Main Catalog Grid & Filter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filter */}
        <div className="lg:col-span-1">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            availableCategories={availableCategories}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            newArrivalsOnly={newArrivalsOnly}
            setNewArrivalsOnly={setNewArrivalsOnly}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Bar & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </span>
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {selectedCategory}
                </span>
              )}
              {newArrivalsOnly && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  New Arrivals
                </span>
              )}
              {inStockOnly && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  In Stock Only
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="glass-input rounded-xl px-3 py-1.5 text-xs text-white bg-slate-900"
              >
                <option value="newest" className="bg-slate-900 text-white">Newest First</option>
                <option value="price-low" className="bg-slate-900 text-white">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900 text-white">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Items Grid */}
          {filteredItems.length === 0 ? (
            <GlassCard className="p-12 text-center space-y-4 border-white/10" hoverEffect={false}>
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Books Found</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                No items match your active filters or search terms. Try adjusting the filters or resetting.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} onQuickView={setSelectedItem} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-white">Loading Catalog...</div>}>
      <BooksContent />
    </Suspense>
  );
}
