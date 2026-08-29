'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Sparkles,
  BookOpen,
  Layers,
  PhoneCall,
  MapPin,
  Clock,
  Truck,
  Award,
  GraduationCap,
  Feather,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Item, ItemType } from '@/lib/types';
import { STORE_CONTACT } from '@/lib/initial-data';
import { getStoredItems, subscribeToInventory } from '@/lib/store';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { ItemCard } from '@/components/items/ItemCard';
import { ItemDetailModal } from '@/components/items/ItemDetailModal';
import { DeliveryNoticeCard } from '@/components/common/DeliveryNoticeCard';

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [activeNewArrivalTab, setActiveNewArrivalTab] = useState<ItemType | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [quickSearch, setQuickSearch] = useState('');

  useEffect(() => {
    setItems(getStoredItems());
    const unsubscribe = subscribeToInventory((updatedItems) => {
      setItems(updatedItems);
    });
    return () => unsubscribe();
  }, []);

  const newArrivals = items.filter((item) => item.isNewArrival);
  const filteredNewArrivals = newArrivals.filter((item) => {
    if (activeNewArrivalTab === 'all') return true;
    return item.type === activeNewArrivalTab;
  });

  const featuredStationery = items.filter((item) => item.type === 'stationery').slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg shadow-sky-500/10">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-200">
              PJ Extension, AVK College Road • Davangere, Karnataka
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Davangere’s Premier Destination for{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Books & Stationery
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Supplying AVK College, Davangere University, BIET, GMIT, JJMMC students & readers across Karnataka with genuine academic textbooks, timeless Kannada Sahitya, competitive exam study materials, and premium stationery.
          </p>

          {/* Quick Search Glass Input */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (quickSearch.trim()) {
                  window.location.href = `/books?search=${encodeURIComponent(quickSearch.trim())}`;
                }
              }}
              className="relative flex items-center"
            >
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search by book name, author (e.g. Tejaswi), or stationery (e.g. Classmate)..."
                className="w-full glass-input rounded-2xl pl-12 pr-32 py-4 text-sm sm:text-base text-white placeholder-slate-400 shadow-2xl border-white/20"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Call: {STORE_CONTACT.phoneNumbers.primary}</span>
            </a>

            <a
              href={`tel:${STORE_CONTACT.phoneNumbers.formattedSecondary}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 border border-sky-400/40 shadow-lg shadow-sky-600/30 transition-all hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {STORE_CONTACT.phoneNumbers.secondary}</span>
            </a>

            <Link
              href="/books?filter=new-arrivals"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>New Arrivals</span>
            </Link>
          </div>
        </div>

        {/* Quick Highlights / Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
          <GlassCard className="p-4 text-center border-white/10" hoverEffect={false}>
            <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 block">15,000+</span>
            <span className="text-xs text-slate-300 mt-1 block">Books & Study Materials</span>
          </GlassCard>

          <GlassCard className="p-4 text-center border-white/10" hoverEffect={false}>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">100% Genuine</span>
            <span className="text-xs text-slate-300 mt-1 block">Publishers & Brand Supplies</span>
          </GlassCard>

          <GlassCard className="p-4 text-center border-white/10" hoverEffect={false}>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">Same-Day</span>
            <span className="text-xs text-slate-300 mt-1 block">Davangere Home Delivery</span>
          </GlassCard>

          <GlassCard className="p-4 text-center border-white/10" hoverEffect={false}>
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 block">PJ Extension</span>
            <span className="text-xs text-slate-300 mt-1 block">Shop 5, Tennis Court Complex</span>
          </GlassCard>
        </div>
      </section>

      {/* 2. HOW DELIVERY WORKS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeliveryNoticeCard />
      </section>

      {/* 3. NEW ARRIVALS SHOWCASE */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Off the Press & Shelf</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2026 New Arrivals in Store
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Updated daily by our bookstore admin at PJ Extension, Davangere.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveNewArrivalTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeNewArrivalTab === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({newArrivals.length})
            </button>
            <button
              onClick={() => setActiveNewArrivalTab('book')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                activeNewArrivalTab === 'book'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Books</span>
            </button>
            <button
              onClick={() => setActiveNewArrivalTab('stationery')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                activeNewArrivalTab === 'stationery'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Stationery</span>
            </button>
          </div>
        </div>

        {/* Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNewArrivals.map((item) => (
            <ItemCard key={item.id} item={item} onQuickView={setSelectedItem} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-4">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-sm font-semibold text-white transition-all hover:scale-105"
          >
            <span>View Complete Store Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. CURATED CATEGORY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Explore by Specialization & Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tailored selections for Davangere colleges, competitive exams, Kannada literature lovers, and stationery needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: College & University */}
          <Link href="/books?category=Academic+%26+College" className="group">
            <GlassCard className="p-6 h-full flex flex-col justify-between border-white/10 group-hover:border-sky-500/50" glow="blue">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                  AVK College & Davangere Univ
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  NEP syllabus textbooks for B.A, B.Sc, B.Com, BBA, BCA, and postgraduate courses aligned with Davangere University.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-sky-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Browse Academic Textbooks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </GlassCard>
          </Link>

          {/* Card 2: Kannada Sahitya */}
          <Link href="/books?category=Kannada+Literature" className="group">
            <GlassCard className="p-6 h-full flex flex-col justify-between border-white/10 group-hover:border-amber-500/50" glow="amber">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Feather className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  Kannada Sahitya & Novels
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Celebrated works of Kuvempu, Poornachandra Tejaswi, Da Ra Bendre, S.L. Bhyrappa, Shivarama Karanth, and contemporary authors.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Explore Kannada Literature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </GlassCard>
          </Link>

          {/* Card 3: Engineering & Medical */}
          <Link href="/books?category=Engineering+%26+Medical" className="group">
            <GlassCard className="p-6 h-full flex flex-col justify-between border-white/10 group-hover:border-purple-500/50" glow="purple">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                  Engineering (BIET/GMIT) & Medical
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  VTU standard engineering textbooks, BS Grewal, medical anatomy/physiology guides for JJMMC and SSIMS students.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-purple-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Engineering & Medical</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </GlassCard>
          </Link>

          {/* Card 4: Competitive Exams */}
          <Link href="/books?category=Competitive+Exams" className="group">
            <GlassCard className="p-6 h-full flex flex-col justify-between border-white/10 group-hover:border-emerald-500/50" glow="emerald">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                  KPSC, FDA, SDA & Banking
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Comprehensive Karnataka job recruitment guidebooks, solved question papers, general knowledge, PSI, and police constable guides.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-emerald-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Browse Exam Books</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </GlassCard>
          </Link>

          {/* Card 5: Stationery Supplies */}
          <Link href="/stationery" className="group">
            <GlassCard className="p-6 h-full flex flex-col justify-between border-white/10 group-hover:border-sky-500/50" glow="blue">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                  Notebooks & Student Stationery
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Classmate notebooks, Parker/Uniball pens, geometry boxes, Casio scientific calculators, files, and college essentials.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-sky-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Explore Stationery Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </GlassCard>
          </Link>

          {/* Card 6: Engineering & Art Drafting */}
          <Link href="/stationery" className="group">
            <GlassCard className="p-6 h-full flex flex-col justify-between border-white/10 group-hover:border-amber-500/50" glow="amber">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  Drafting & Medical Instruments
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mini drafters, drawing sheets, T-squares, dissection kits, lab coats, and Faber-Castell artist watercolor sets.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Technical Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </GlassCard>
          </Link>
        </div>
      </section>

      {/* 5. STATIONERY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              Stationery Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Student & Office Stationery Hub
            </h2>
          </div>
          <Link
            href="/stationery"
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Stationery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredStationery.map((item) => (
            <ItemCard key={item.id} item={item} onQuickView={setSelectedItem} />
          ))}
        </div>
      </section>

      {/* 6. DAVANGERE STORE VISIT & MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <GlassCard className="p-6 sm:p-10 border-white/15 bg-gradient-to-br from-slate-900/90 via-sky-950/30 to-slate-900/90" hoverEffect={false}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Address Info & Hours */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Visit Our Davangere Bookstore</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Located in the Educational Hub of PJ Extension
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Conveniently situated on AVK College Road inside the Tennis Court Complex, easily accessible from all major colleges and schools in Davangere.
                </p>
              </div>

              {/* Exact Address Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Shree Renuka Book House</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Shop 5, Tennis Court Complex, AVK College Road,<br />
                      Prince Jayachamaraja Wodeyar (PJ Extension),<br />
                      Davangere, Karnataka 577004
                    </p>
                    <span className="text-[11px] text-amber-400 font-medium block mt-1">
                      Landmark: Opposite AVK College for Women & Tennis Court
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>9:00 AM – 9:30 PM (Mon – Sat)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <a href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}>
                      {STORE_CONTACT.phoneNumbers.primary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Store to Order</span>
                </a>

                <a
                  href={STORE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right: Embedded Interactive Map */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
              <iframe
                title="Shree Renuka Book House Davangere Location"
                src={STORE_CONTACT.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-90"
              />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Quick View Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
