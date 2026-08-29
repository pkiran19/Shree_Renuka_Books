import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'call' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: GlassButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl cursor-pointer transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'glass-button-primary',
    secondary: 'glass-button-secondary',
    call: 'glass-button-call',
    danger: 'bg-rose-600/80 hover:bg-rose-500 text-white border border-rose-400/30 backdrop-blur-md shadow-lg shadow-rose-600/30',
    ghost: 'bg-transparent hover:bg-white/10 text-slate-200 border border-transparent hover:border-white/10',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
