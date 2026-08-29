'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Sparkles, CheckCircle2, Image as ImageIcon, Sparkle, Tag, BookOpen, Layers } from 'lucide-react';
import { Item, ItemType, ItemCategory, BookCategory, StationeryCategory } from '@/lib/types';
import { PRESET_IMAGE_CATEGORIES } from '@/lib/initial-data';
import { formatPrice } from '@/lib/utils';
import { GlassModal } from '../ui/GlassModal';
import { GlassButton } from '../ui/GlassButton';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<Item, 'id' | 'createdAt'>) => void;
}

const BOOK_CATEGORIES: BookCategory[] = [
  'Kannada Literature',
  'Academic & College',
  'Engineering & Medical',
  'Competitive Exams',
  'School Textbooks',
  'Fiction & Novels',
  'Self-Help & Biographies',
  'Children & Comics',
];

const STATIONERY_CATEGORIES: StationeryCategory[] = [
  'College & School Notebooks',
  'Pens & Writing Instruments',
  'Engineering & Drafting Tools',
  'Medical & Lab Supplies',
  'Art & Craft Materials',
  'Office & Filing Supplies',
  'Calculators & Electronics',
];

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [type, setType] = useState<ItemType>('book');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Academic & College');
  const [authorOrBrand, setAuthorOrBrand] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop'
  );
  const [description, setDescription] = useState('');
  const [editionOrSpec, setEditionOrSpec] = useState('2026 Edition');
  const [language, setLanguage] = useState('Kannada & English');
  const [tagsInput, setTagsInput] = useState('Davangere, New Arrival');
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleTypeChange = (newType: ItemType) => {
    setType(newType);
    if (newType === 'book') {
      setCategory('Academic & College');
    } else {
      setCategory('College & School Notebooks');
    }
  };

  const handleSelectPreset = (url: string) => {
    setCoverImage(url);
    setSelectedPreset(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category || !price) {
      alert('Please fill in Title, Category, and Price.');
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice) : undefined;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAdd({
      title: title.trim(),
      type,
      category,
      authorOrBrand: authorOrBrand.trim() || (type === 'book' ? 'Author' : 'Brand'),
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
      description: description.trim() || 'Available at Shree Renuka Book House, Davangere.',
      inStock,
      isNewArrival,
      isFeatured,
      tags,
      editionOrSpec: editionOrSpec.trim() || undefined,
      language: type === 'book' ? language.trim() || undefined : undefined,
    });

    // Reset form & close
    setTitle('');
    setAuthorOrBrand('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    onClose();
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Arrival / Inventory Item"
      subtitle="Publish new books or stationery items directly to the Davangere storefront."
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pb-2">
        {/* Step 1: Item Type Selector */}
        <div className="flex items-center gap-3 p-1.5 bg-slate-900/80 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => handleTypeChange('book')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              type === 'book'
                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Book / Academic Textbook / Sahitya</span>
          </button>

          <button
            type="button"
            onClick={() => handleTypeChange('stationery')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              type === 'stationery'
                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Stationery & College Supplies</span>
          </button>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Core Fields */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {type === 'book' ? 'Book Title *' : 'Stationery Item Name *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={type === 'book' ? 'e.g. 2nd PUC Biology Guide / Parva' : 'e.g. Classmate Pulse 6-Subject Notebook'}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500"
              />
            </div>

            {/* Category & Author/Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-sm text-white bg-slate-900"
                >
                  {type === 'book'
                    ? BOOK_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-900 text-white">
                          {cat}
                        </option>
                      ))
                    : STATIONERY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-900 text-white">
                          {cat}
                        </option>
                      ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {type === 'book' ? 'Author / Publication' : 'Brand / Manufacturer'}
                </label>
                <input
                  type="text"
                  value={authorOrBrand}
                  onChange={(e) => setAuthorOrBrand(e.target.value)}
                  placeholder={type === 'book' ? 'e.g. Kuvempu / Pearson' : 'e.g. Classmate / Camlin'}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 299"
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-emerald-400 font-bold placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Original Price / MRP (₹)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="e.g. 350 (Optional)"
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Edition/Spec & Language */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Edition / Specification</label>
                <input
                  type="text"
                  value={editionOrSpec}
                  onChange={(e) => setEditionOrSpec(e.target.value)}
                  placeholder="e.g. 2026 NEP Edition"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                />
              </div>

              {type === 'book' ? (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Language</label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g. Kannada / English"
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="College, Drawing, BIET"
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Description / Notes</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details about the book, syllabus, college recommendations, or stationery features..."
                className="w-full glass-input rounded-xl px-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Right Column: Cover Image Selector & Badges */}
          <div className="space-y-4">
            {/* Image URL & Preview */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Cover Image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => {
                    setCoverImage(e.target.value);
                    setSelectedPreset(null);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 glass-input rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 truncate"
                />
              </div>
            </div>

            {/* Curated Preset Covers (1-Click selection) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                <span>1-Click Preset Images</span>
                <span className="text-[10px] text-sky-400 font-normal">Click to pick</span>
              </label>

              <div className="space-y-3 bg-slate-900/60 p-3 rounded-xl border border-white/5 max-h-48 overflow-y-auto">
                {PRESET_IMAGE_CATEGORIES.map((group) => (
                  <div key={group.name} className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{group.name}</span>
                    <div className="grid grid-cols-3 gap-2">
                      {group.images.map((img) => (
                        <button
                          type="button"
                          key={img.url}
                          onClick={() => handleSelectPreset(img.url)}
                          className={`relative h-16 rounded-lg overflow-hidden border transition-all text-left group ${
                            coverImage === img.url
                              ? 'border-sky-400 ring-2 ring-sky-400/50 scale-95'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Image src={img.url} alt={img.label} fill sizes="100px" className="object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] text-slate-200 px-1 py-0.5 truncate text-center">
                            {img.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status & Badge Toggles */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
              <label className="text-xs font-semibold text-slate-300 block">Product Badges & Visibility</label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 cursor-pointer text-xs text-amber-300">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  <span className="font-semibold">New Arrival</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-400/20 cursor-pointer text-xs text-emerald-300">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-500"
                  />
                  <span className="font-semibold">In Stock</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-purple-500/10 border border-purple-400/20 cursor-pointer text-xs text-purple-300">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded accent-purple-500"
                  />
                  <span className="font-semibold">Featured</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <GlassButton type="submit" variant="primary" size="md" className="gap-2 font-bold">
            <Plus className="w-4 h-4" />
            <span>Publish New Arrival</span>
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
