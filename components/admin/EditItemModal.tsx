'use client';

import React, { useState, useEffect } from 'react';
import { Item, ItemCategory } from '@/lib/types';
import { GlassModal } from '../ui/GlassModal';
import { GlassButton } from '../ui/GlassButton';

interface EditItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Item>) => void;
}

export function EditItemModal({ item, isOpen, onClose, onSave }: EditItemModalProps) {
  const [title, setTitle] = useState('');
  const [authorOrBrand, setAuthorOrBrand] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setAuthorOrBrand(item.authorOrBrand);
      setPrice(item.price.toString());
      setOriginalPrice(item.originalPrice ? item.originalPrice.toString() : '');
      setDescription(item.description);
      setInStock(item.inStock);
      setIsNewArrival(item.isNewArrival);
      setIsFeatured(!!item.isFeatured);
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    onSave(item.id, {
      title: title.trim(),
      authorOrBrand: authorOrBrand.trim(),
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      description: description.trim(),
      inStock,
      isNewArrival,
      isFeatured,
    });

    onClose();
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Inventory Item"
      subtitle={`Editing: ${item.title}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pb-2">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full glass-input rounded-xl px-4 py-2 text-sm text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Author / Brand</label>
            <input
              type="text"
              value={authorOrBrand}
              onChange={(e) => setAuthorOrBrand(e.target.value)}
              className="w-full glass-input rounded-xl px-4 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Selling Price (₹) *</label>
            <input
              type="number"
              required
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full glass-input rounded-xl px-4 py-2 text-sm text-emerald-400 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Original Price / MRP (₹)</label>
          <input
            type="number"
            min="1"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full glass-input rounded-xl px-4 py-2 text-sm text-slate-300"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full glass-input rounded-xl px-4 py-2 text-xs sm:text-sm text-white"
          />
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) => setIsNewArrival(e.target.checked)}
              className="w-4 h-4 rounded accent-amber-500"
            />
            <span>New Arrival</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-emerald-300 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
            <span>In Stock</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-purple-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span>Featured</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <GlassButton type="submit" variant="primary" size="sm">
            Save Changes
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
