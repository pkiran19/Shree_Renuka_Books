import React from 'react';
import { BookOpen, Sparkles, Layers, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Item } from '@/lib/types';
import { GlassCard } from '../ui/GlassCard';

interface AdminStatsProps {
  items: Item[];
}

export function AdminStats({ items }: AdminStatsProps) {
  const totalBooks = items.filter((i) => i.type === 'book').length;
  const totalStationery = items.filter((i) => i.type === 'stationery').length;
  const totalNewArrivals = items.filter((i) => i.isNewArrival).length;
  const outOfStock = items.filter((i) => !i.inStock).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Items */}
      <GlassCard className="p-4 sm:p-5 border-white/10" glow="blue">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Books</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{totalBooks}</h3>
          </div>
          <div className="p-3 rounded-2xl bg-sky-500/15 border border-sky-400/30 text-sky-400">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>
      </GlassCard>

      {/* New Arrivals */}
      <GlassCard className="p-4 sm:p-5 border-white/10" glow="amber">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Active New Arrivals</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">{totalNewArrivals}</h3>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </GlassCard>

      {/* Total Stationery */}
      <GlassCard className="p-4 sm:p-5 border-white/10" glow="purple">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Stationery Supplies</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-300 mt-1">{totalStationery}</h3>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </GlassCard>

      {/* Out of stock */}
      <GlassCard className="p-4 sm:p-5 border-white/10" glow={outOfStock > 0 ? 'none' : 'emerald'}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Out of Stock</span>
            <h3 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${outOfStock > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {outOfStock}
            </h3>
          </div>
          <div className={`p-3 rounded-2xl border ${outOfStock > 0 ? 'bg-rose-500/15 border-rose-400/30 text-rose-400' : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-400'}`}>
            {outOfStock > 0 ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
