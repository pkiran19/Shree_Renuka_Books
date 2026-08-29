'use client';

import React from 'react';
import Image from 'next/image';
import { PhoneCall, Sparkles, Eye, CheckCircle2, XCircle, Tag } from 'lucide-react';
import { Item } from '@/lib/types';
import { STORE_CONTACT } from '@/lib/initial-data';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { GlassCard } from '../ui/GlassCard';
import { GlassBadge } from '../ui/GlassBadge';

interface ItemCardProps {
  item: Item;
  onQuickView?: (item: Item) => void;
}

export function ItemCard({ item, onQuickView }: ItemCardProps) {
  const discount = calculateDiscount(item.price, item.originalPrice);

  return (
    <GlassCard className="group flex flex-col justify-between overflow-hidden relative border-white/10 hover:border-sky-500/40">
      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
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

        <div>
          {item.inStock ? (
            <GlassBadge variant="in-stock" size="sm">
              <CheckCircle2 className="w-3 h-3" />
              <span>In Stock</span>
            </GlassBadge>
          ) : (
            <GlassBadge variant="out-of-stock" size="sm">
              <XCircle className="w-3 h-3" />
              <span>Out of Stock</span>
            </GlassBadge>
          )}
        </div>
      </div>

      {/* Image / Cover Section */}
      <div className="relative w-full h-56 overflow-hidden bg-slate-900/60 flex items-center justify-center">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(item)}
            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-slate-950/80 hover:bg-sky-600 text-white border border-white/20 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
            title="Quick View Details"
            aria-label={`Quick view ${item.title}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="uppercase tracking-wider font-semibold text-sky-400">
              {item.category}
            </span>
            {item.editionOrSpec && (
              <span className="text-slate-400 truncate max-w-[120px]">
                {item.editionOrSpec}
              </span>
            )}
          </div>

          <h3
            className="font-bold text-base text-white line-clamp-2 group-hover:text-sky-300 transition-colors cursor-pointer"
            onClick={() => onQuickView && onQuickView(item)}
          >
            {item.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1">
            {item.type === 'book' ? 'Author: ' : 'Brand: '}
            <strong className="text-slate-300 font-medium">{item.authorOrBrand}</strong>
          </p>

          <p className="text-xs text-slate-400 line-clamp-2 pt-1">
            {item.description}
          </p>
        </div>

        {/* Price and Action Section */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-emerald-400">
                {formatPrice(item.price)}
              </span>
              {item.originalPrice && item.originalPrice > item.price && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400">Shop 5, Tennis Court Complex</span>
          </div>

          {/* Direct Phone Call Button */}
          <div className="grid grid-cols-2 gap-2">
            {onQuickView && (
              <button
                onClick={() => onQuickView(item)}
                className="w-full py-2 px-3 rounded-xl text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            )}

            <a
              href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5 ${
                !onQuickView ? 'col-span-2' : ''
              }`}
              title="Call store to check availability and book delivery"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call to Order</span>
            </a>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
