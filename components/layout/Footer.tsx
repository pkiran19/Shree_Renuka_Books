import React from 'react';
import Link from 'next/link';
import { BookOpen, MapPin, PhoneCall, Mail, Clock, Truck, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { STORE_CONTACT } from '@/lib/initial-data';
import { GlassCard } from '../ui/GlassCard';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 glass-panel bg-slate-950/80">
      {/* Top Highlight Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <GlassCard className="p-6 sm:p-8 bg-gradient-to-r from-sky-950/60 via-slate-900/60 to-emerald-950/60 border-sky-500/20 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Truck className="w-3.5 h-3.5" />
                <span>Doorstep Delivery Available</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Need Books or Stationery Delivered to Your Doorstep?
              </h3>
              <p className="text-sm text-slate-300">
                Call our Davangere store directly! We deliver across PJ Extension, MCC A/B Block, Vidyanagar, KB Extension, Shamnur Road, and dispatch parcels across Karnataka.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 shadow-xl shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call to Order: {STORE_CONTACT.phoneNumbers.primary}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
              >
                <span>Store Location</span>
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Store Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-white text-base">Shree Renuka</span>
                <p className="text-xs text-sky-400 font-medium">Book House & Stationery</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Davangere’s preferred bookstore for academic college textbooks, Kannada literature, competitive exam study materials, and premium stationery supplies since 2012.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Books & Supplies</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Book Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/books?category=Kannada+Literature" className="hover:text-sky-300 transition-colors">
                  • Kannada Sahitya & Novels
                </Link>
              </li>
              <li>
                <Link href="/books?category=Academic+%26+College" className="hover:text-sky-300 transition-colors">
                  • AVK College & Davangere Univ
                </Link>
              </li>
              <li>
                <Link href="/books?category=Engineering+%26+Medical" className="hover:text-sky-300 transition-colors">
                  • Engineering (BIET / GMIT) & Medical
                </Link>
              </li>
              <li>
                <Link href="/books?category=Competitive+Exams" className="hover:text-sky-300 transition-colors">
                  • KPSC, FDA, SDA & PSI Guides
                </Link>
              </li>
              <li>
                <Link href="/books?category=School+Textbooks" className="hover:text-sky-300 transition-colors">
                  • PUC & School Curricula
                </Link>
              </li>
              <li>
                <Link href="/books?filter=new-arrivals" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  ★ Latest 2026 New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Stationery Hub */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Stationery & Supplies</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/stationery" className="hover:text-sky-300 transition-colors">
                  • College & School Notebooks (Classmate)
                </Link>
              </li>
              <li>
                <Link href="/stationery" className="hover:text-sky-300 transition-colors">
                  • Engineering Mini Drafters & Geometry
                </Link>
              </li>
              <li>
                <Link href="/stationery" className="hover:text-sky-300 transition-colors">
                  • Medical Dissection & Lab Sets
                </Link>
              </li>
              <li>
                <Link href="/stationery" className="hover:text-sky-300 transition-colors">
                  • Premium Pens (Parker, Pilot, Uniball)
                </Link>
              </li>
              <li>
                <Link href="/stationery" className="hover:text-sky-300 transition-colors">
                  • Casio Scientific Calculators
                </Link>
              </li>
              <li>
                <Link href="/stationery" className="hover:text-sky-300 transition-colors">
                  • Art & Sketch Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Davangere Address & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Visit Davangere Store</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white block">Shop 5, Tennis Court Complex</strong>
                  AVK College Road, Prince Jayachamaraja Wodeyar (PJ Extension),<br />
                  Davangere, Karnataka 577004
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`} className="hover:text-emerald-300 transition-colors font-medium text-emerald-400">
                  {STORE_CONTACT.phoneNumbers.primary}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 9:30 PM</span>
              </div>

              <div className="pt-2">
                <a
                  href={STORE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Shree Renuka Book House & Stationery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
