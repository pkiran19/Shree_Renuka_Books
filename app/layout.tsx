import type { Metadata } from 'next';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

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
    <html lang="en" className="h-full antialiased font-sans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
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
