import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shree Renuka Book House & Stationery | Davangere, Karnataka',
  description:
    'Premier bookstore and stationery shop in Davangere. Academic textbooks for AVK College, Davangere University, BIET, GMIT, Kannada literature, competitive exam books & premium stationery. Located at Shop 5, Tennis Court Complex, AVK College Road, PJ Extension, Davangere.',
  keywords: [
    'Davangere Bookstore',
    'AVK College Road Books',
    'PJ Extension Bookstall Davangere',
    'Kannada Sahitya Davangere',
    'Stationery Shop Davangere',
    'BIET Engineering Textbooks',
    'KPSC FDA SDA Books Davangere',
    'Shree Renuka Book House',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative bg-[#090d16] text-slate-100 selection:bg-sky-500 selection:text-white">
        {/* Ambient background glow orbs for top-notch glassmorphism */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="ambient-glow-1 -top-32 -left-32 opacity-70" />
          <div className="ambient-glow-2 top-1/3 -right-48 opacity-60" />
          <div className="ambient-glow-3 -bottom-48 left-1/4 opacity-60" />
        </div>

        {/* Global Layout Structure */}
        <div className="relative z-10 flex flex-col flex-1">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
