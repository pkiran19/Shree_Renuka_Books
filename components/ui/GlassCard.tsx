import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
  glow?: 'blue' | 'amber' | 'emerald' | 'purple' | 'none';
}

export function GlassCard({
  children,
  hoverEffect = true,
  className,
  glow = 'none',
  ...props
}: GlassCardProps) {
  const glowStyles = {
    blue: 'border-sky-500/30 hover:border-sky-400/60 shadow-sky-500/10',
    amber: 'border-amber-500/30 hover:border-amber-400/60 shadow-amber-500/10',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/60 shadow-emerald-500/10',
    purple: 'border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/10',
    none: '',
  };

  return (
    <div
      className={cn(
        hoverEffect ? 'glass-card' : 'glass-card-static',
        glow !== 'none' && glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
