import React from 'react';
import { MapPin, PhoneCall, Clock, Truck } from 'lucide-react';
import { STORE_CONTACT } from '@/lib/initial-data';

export function AnnouncementBar() {
  return (
    <aside aria-label="Store Announcement" className="relative z-40 bg-gradient-to-r from-sky-950/80 via-slate-900/90 to-indigo-950/80 border-b border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-300 py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        {/* Left: Location Cue */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="truncate">
            <strong className="text-white font-medium">Davangere Store:</strong> Shop 5, Tennis Court Complex, AVK College Rd, PJ Extension
          </span>
        </div>

        {/* Center/Right: Call to Delivery Prompt */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Open Today: 9:00 AM – 9:30 PM</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>Doorstep Delivery across Davangere:</span>
            <a
              href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
              className="inline-flex items-center gap-1 text-white bg-emerald-600/60 hover:bg-emerald-500/80 px-2.5 py-0.5 rounded-full border border-emerald-400/40 transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{STORE_CONTACT.phoneNumbers.primary}</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
