'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Truck,
  Send,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { STORE_CONTACT } from '@/lib/initial-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: 'Book Availability Check',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your Name and Phone Number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Davangere Store & Delivery Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact & Visit Our Store
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Have a question about textbook availability, competitive exam material, or want to book doorstep delivery? Call or visit us at PJ Extension, Davangere.
        </p>
      </div>

      {/* 2. Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards (Left 1 Col) */}
        <div className="space-y-4 lg:col-span-1">
          {/* Storefront & Owner Photo Card */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-slate-900">
            <Image
              src="/images/owner.jpg"
              alt="Shree Renuka Book House Store Owner inside Davangere Shop"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Shree Renuka Book House</span>
                <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20">
                  Open Today
                </span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">Shop 5, Tennis Court Complex, PJ Extension</p>
            </div>
          </div>

          {/* Address Card */}
          <GlassCard className="p-6 space-y-3 border-white/10" glow="blue">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Store Address</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Shop 5, Tennis Court Complex</strong><br />
              AVK College Road, Prince Jayachamaraja Wodeyar (PJ Extension),<br />
              Davangere, Karnataka 577004
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-amber-400 font-medium block">
                Landmark: Opposite AVK College for Women
              </span>
            </div>
          </GlassCard>

          {/* Phone Numbers */}
          <GlassCard className="p-6 space-y-3 border-white/10" glow="emerald">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Telephone Orders & Delivery</h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Primary Order Line:</span>
                <a
                  href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`}
                  className="font-bold text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {STORE_CONTACT.phoneNumbers.primary}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Secondary Helpline:</span>
                <a
                  href={`tel:${STORE_CONTACT.phoneNumbers.formattedSecondary}`}
                  className="font-bold text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {STORE_CONTACT.phoneNumbers.secondary}
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Timings */}
          <GlassCard className="p-6 space-y-3 border-white/10" glow="purple">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Opening Hours</h3>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Monday – Saturday:</span>
                <span className="font-semibold text-white">9:00 AM – 9:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold text-white">9:30 AM – 8:30 PM</span>
              </div>
              <div className="pt-2 text-[11px] text-emerald-400 font-medium">
                ● Open today for store visits & home deliveries
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Callback / Inquiry Form & Info (Right 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 sm:p-8 border-white/10 bg-gradient-to-br from-slate-900/90 via-sky-950/20 to-slate-900/90" hoverEffect={false}>
            <div className="space-y-2 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Request a Book / Ask for Delivery
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Leave your book or stationery requirement and phone number. Our Davangere store team will call you back to confirm availability and schedule delivery.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Thank You, {formData.name}!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  We have received your inquiry. Our team at <strong>Shop 5, PJ Extension</strong> will call you shortly at <strong>{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', purpose: 'Book Availability Check', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Inquiry Purpose</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white bg-slate-900"
                  >
                    <option value="Book Availability Check" className="bg-slate-900 text-white">Check Book / Textbook Availability</option>
                    <option value="Davangere Home Delivery" className="bg-slate-900 text-white">Book Home Delivery in Davangere</option>
                    <option value="Stationery Inquiry" className="bg-slate-900 text-white">Stationery & Drawing Supplies</option>
                    <option value="College Bulk Supply" className="bg-slate-900 text-white">College / School Bulk Supply</option>
                    <option value="Out of Print Book Search" className="bg-slate-900 text-white">Search Rare / Out of Print Book</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Book Names, Subject, or Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Need 4th Sem B.Com Corporate Accounting and 3 Classmate Pulse 6-subject notebooks to PJ Extension..."
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    Prefer direct calling? Dial <a href={`tel:${STORE_CONTACT.phoneNumbers.formattedPrimary}`} className="text-emerald-400 font-bold">{STORE_CONTACT.phoneNumbers.primary}</a>
                  </span>

                  <GlassButton type="submit" variant="primary" size="md" className="gap-2 font-bold w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    <span>Send Request</span>
                  </GlassButton>
                </div>
              </form>
            )}
          </GlassCard>

          {/* Delivery Scope Note */}
          <GlassCard className="p-5 border-white/10 bg-gradient-to-r from-slate-900/90 to-sky-950/40" hoverEffect={false}>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Delivery Coverage Across Davangere:</strong>
                <p className="mt-0.5 leading-relaxed text-slate-400">
                  {STORE_CONTACT.deliveryInfo.davangereCoverage} Outstation parcels dispatched daily via KSRTC logistics and private couriers.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 3. Embedded Google Map Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Google Maps & Location
            </h2>
            <p className="text-xs text-slate-400">
              Shop 5, Tennis Court Complex, AVK College Road, PJ Extension, Davangere, Karnataka 577004
            </p>
          </div>

          <a
            href={STORE_CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-4"
          >
            <span>Open Directions in Google Maps App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="w-full h-96 rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
          <iframe
            title="Davangere Bookstore Google Maps"
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
      </section>
    </div>
  );
}
