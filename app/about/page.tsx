'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ownerPhoto from './owner.jpg';
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

      {/* 2. Story & Store Owner Spotlight */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Real Store & Owner Image */}
        <div className="space-y-4">
          <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden border-2 border-sky-400/30 shadow-2xl bg-slate-900">
            <Image
              src={ownerPhoto}
              alt="Shree Renuka Book House Store Owner inside Davangere Shop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top hover:scale-102 transition-transform duration-500"
              priority
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-xs text-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-sm text-white">Shree Renuka Book House</strong>
                <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                  Davangere Store
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Shop 5, Tennis Court Complex, AVK College Road, PJ Extension, Davangere
              </p>
            </div>
          </div>
        </div>

        {/* Text Story */}
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Our Legacy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Personalized Service & Trust in Davangere
            </h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Established at <strong>Shop 5, Tennis Court Complex, AVK College Road, PJ Extension</strong>, Shree Renuka Book House was founded with a singular mission: to provide students, educators, and literature enthusiasts in Davangere with instantaneous access to genuine books and high-grade stationery.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            Over the years, we have become the trusted academic bookstore for students from <strong>AVK College for Women, B.I.E.T. Engineering College, G.M. Institute of Technology (GMIT), Davangere University, JJM Medical College, and DRM Science College</strong>.
          </p>

          {/* Contact Direct Numbers Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              Direct In-Store Assistance & Delivery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
                className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 flex items-center gap-2.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Primary Mobile</span>
                  <span className="font-bold text-white">{STORE_CONTACT.phoneNumbers.primary}</span>
                </div>
              </a>

              <a
                href={`tel:${STORE_CONTACT.phoneNumbers.formattedSecondary}`}
                className="p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 flex items-center gap-2.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Alternative Mobile</span>
                  <span className="font-bold text-white">{STORE_CONTACT.phoneNumbers.secondary}</span>
                </div>
              </a>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Genuine University Syllabi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Prescribed Textbooks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Doorstep Davangere Delivery</span>
            </div>
          </div>
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
              <span>Call: {STORE_CONTACT.phoneNumbers.primary}</span>
            </a>

            <a
              href={`tel:${STORE_CONTACT.phoneNumbers.formattedSecondary}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 border border-sky-400/40 shadow-lg shadow-sky-600/30 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {STORE_CONTACT.phoneNumbers.secondary}</span>
            </a>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
