import React from 'react';
import { PhoneCall, Truck, MapPin, CheckCircle2, PackageCheck } from 'lucide-react';
import { STORE_CONTACT } from '@/lib/initial-data';
import { GlassCard } from '../ui/GlassCard';

export function DeliveryNoticeCard() {
  return (
    <GlassCard className="p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 via-sky-950/40 to-slate-900/90 border-sky-500/20 my-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-3 flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>Fast Delivery & In-Store Pickup in Davangere</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How to Book Your Book & Stationery Delivery
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            We offer instant telephone ordering for all students, parents, and institutions in Davangere. Follow these easy steps:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-400/30">
                1
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">Find Your Books</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Explore catalog or note syllabus / author names.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-400/30">
                2
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">Call Our Store</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Dial {STORE_CONTACT.phoneNumbers.primary} & confirm stock.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-400/30">
                3
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">Receive Order</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Doorstep delivery in Davangere or express parcel.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Side */}
        <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
          <a
            href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-xl shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
          >
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <span>Call to Book: {STORE_CONTACT.phoneNumbers.primary}</span>
          </a>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-sky-400" />
            <span>Shop 5, Tennis Court Complex, AVK Rd</span>
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
