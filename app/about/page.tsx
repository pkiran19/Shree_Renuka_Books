'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  MapPin,
  PhoneCall,
  GraduationCap,
  Sparkles,
  Heart,
  Truck,
  Award,
  Layers,
  CheckCircle2,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { STORE_CONTACT } from '@/lib/initial-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { DeliveryNoticeCard } from '@/components/common/DeliveryNoticeCard';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Hero Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Serving Davangere’s Readers & Students Since 2012</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Nurturing Minds & Empowering Dreams in{' '}
          <span className="bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">
            Davangere
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Welcome to <strong>Shree Renuka Book House & Stationery Hub</strong>, located right in the heart of Davangere’s educational epicenter on AVK College Road, PJ Extension.
        </p>
      </section>

      {/* 2. Story & Store Context */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Rooted in the Heritage of Davangere
            </h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Established at <strong>Shop 5, Tennis Court Complex, AVK College Road, PJ Extension</strong>, Shree Renuka Book House was founded with a singular mission: to provide students, educators, and literature enthusiasts in Davangere with instantaneous access to genuine books and high-grade stationery.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            Over the years, we have become the go-to academic bookstore for students from <strong>AVK College for Women, B.I.E.T. Engineering College, G.M. Institute of Technology (GMIT), Davangere University, JJM Medical College, and DRM Science College</strong>.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            Simultaneously, we take immense pride in promoting <strong>Kannada Sahitya</strong>, maintaining an extensive collection of works by legendary authors like Kuvempu, Poornachandra Tejaswi, Da Ra Bendre, S.L. Bhyrappa, and modern Kannada thinkers.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Genuine University Syllabi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Prescribed College Textbooks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Phone Ordering</span>
            </div>
          </div>
        </div>

        {/* Visual Glass Showcase */}
        <div className="relative">
          <GlassCard className="p-8 space-y-6 border-sky-500/30 bg-gradient-to-br from-slate-900/90 via-sky-950/40 to-slate-900/90" glow="blue">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Davangere Address</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>Shop 5, Tennis Court Complex</strong><br />
                AVK College Road, Prince Jayachamaraja Wodeyar (PJ Extension),<br />
                Davangere, Karnataka 577004
              </p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-amber-400 block">Landmarks:</span>
                <p>Opposite AVK College for Women, near PJ Extension Police Station & Tennis Court Complex.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Orders & Deliveries</span>
                <span className="text-base font-bold text-emerald-400">
                  {STORE_CONTACT.phoneNumbers.primary}
                </span>
              </div>
              <a
                href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Store</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 3. Core Pillars & What We Offer */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What Makes Shree Renuka Special
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Dedicated services crafted for students, competitive exam aspirants, and local institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-3 border-white/10" glow="blue">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Davangere University & College Books</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We stock the full range of textbooks prescribed for B.A, B.Sc, B.Com, BBA, BCA, Engineering (VTU/BIET/GMIT), and Medical programs.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3 border-white/10" glow="amber">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Competitive Exam Hub</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Updated KPSC FDA, SDA, PSI, Police Constable, Banking, KSET, and UPSC study materials, question banks, and monthly current affairs.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3 border-white/10" glow="purple">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Comprehensive Stationery Store</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              From Classmate notebooks and Casio scientific calculators to mini drafters, drafting sheets, dissection kits, and artist watercolors.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 4. Delivery & Ordering Process */}
      <section>
        <DeliveryNoticeCard />
      </section>

      {/* 5. Institutional & Bulk Inquiries */}
      <section>
        <GlassCard className="p-8 sm:p-10 border-white/10 bg-gradient-to-r from-sky-950/60 via-slate-900/80 to-emerald-950/60 text-center space-y-6" hoverEffect={false}>
          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              School, College & Bulk Institutional Supplies
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Are you a school, college department, library, or coaching institute in Davangere looking for bulk textbook or stationery supply? We offer special institutional discounts and fast delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call for Bulk Supply: {STORE_CONTACT.phoneNumbers.primary}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
            >
              <span>Contact Store Location</span>
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
