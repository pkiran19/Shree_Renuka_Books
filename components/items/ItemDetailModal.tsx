'use client';

import React from 'react';
import Image from 'next/image';
import { PhoneCall, Sparkles, CheckCircle2, XCircle, MapPin, Truck, BookOpen, Layers, Tag, ShieldCheck } from 'lucide-react';
import { Item } from '@/lib/types';
import { STORE_CONTACT } from '@/lib/initial-data';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { GlassModal } from '../ui/GlassModal';
import { GlassBadge } from '../ui/GlassBadge';

interface ItemDetailModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  const discount = calculateDiscount(item.price, item.originalPrice);

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={item.title}
      subtitle={`${item.type === 'book' ? 'Book' : 'Stationery'} • ${item.category}`}
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Left Column: Image & Badges */}
        <div className="space-y-4">
          <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {item.isNewArrival && (
                <GlassBadge variant="new-arrival" size="sm">
                  <Sparkles className="w-3 h-3" />
                  <span>New Arrival</span>
                </GlassBadge>
              )}
              {discount && (
                <GlassBadge variant="discount" size="sm">
                  <Tag className="w-2.5 h-2.5" />
                  <span>{discount}% OFF</span>
                </GlassBadge>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              {item.inStock ? (
                <span className="inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 px-2.5 py-1 rounded-full backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Available in Davangere Store</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-rose-950/80 border border-rose-400/40 text-rose-300 px-2.5 py-1 rounded-full backdrop-blur-md">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Temporarily Out of Stock</span>
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Call to Order */}
        <div className="flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Price Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Davangere Store Price</span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="text-2xl font-extrabold text-emerald-400">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-slate-400 line-through">
                      MRP {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 font-medium">
                  Verified Genuine
                </span>
              </div>
            </div>

            {/* Meta Specifications */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase">
                  {item.type === 'book' ? 'Author / Publication' : 'Brand / Manufacturer'}
                </span>
                <span className="font-semibold text-white mt-0.5 block truncate">
                  {item.authorOrBrand}
                </span>
              </div>

              {item.editionOrSpec && (
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Edition / Spec</span>
                  <span className="font-semibold text-white mt-0.5 block truncate">
                    {item.editionOrSpec}
                  </span>
                </div>
              )}

              {item.language && (
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase">Language</span>
                  <span className="font-semibold text-white mt-0.5 block truncate">
                    {item.language}
                  </span>
                </div>
              )}

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase">Category</span>
                <span className="font-semibold text-sky-400 mt-0.5 block truncate">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Overview</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-white/5">
                {item.description}
              </p>
            </div>
          </div>

          {/* Call to Order & Delivery Action */}
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/50 to-slate-900/60 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Truck className="w-4 h-4" />
                <span>Call to Order & Schedule Delivery:</span>
              </div>

              <a
                href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Call: {STORE_CONTACT.phoneNumbers.primary}</span>
              </a>

              <p className="text-[11px] text-slate-300 text-center">
                Mention <strong className="text-white">"{item.title}"</strong> when calling. Delivery available across Davangere and outstation transport.
              </p>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-400 px-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
              <span>
                <strong>In-Store Pickup:</strong> {STORE_CONTACT.address.fullAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassModal>
  );
}
