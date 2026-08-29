import React from 'react';
import { cn } from '@/lib/utils';

interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: 'new-arrival' | 'in-stock' | 'out-of-stock' | 'featured' | 'bestseller' | 'category' | 'discount';
  size?: 'sm' | 'md';
  className?: string;
}

export function GlassBadge({
  children,
  variant = 'category',
  size = 'md',
  className,
}: GlassBadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wide font-medium',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  const variantStyles = {
    'new-arrival':
      'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/40 text-amber-300 shadow-sm shadow-amber-500/20 animate-pulse',
    'in-stock':
      'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
    'out-of-stock':
      'bg-rose-500/15 border-rose-400/30 text-rose-300',
    featured:
      'bg-purple-500/20 border-purple-400/40 text-purple-200',
    bestseller:
      'bg-sky-500/20 border-sky-400/40 text-sky-200',
    category:
      'bg-white/10 border-white/15 text-slate-200 backdrop-blur-sm',
    discount:
      'bg-emerald-600/30 border-emerald-400/40 text-emerald-200 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border backdrop-blur-md',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
