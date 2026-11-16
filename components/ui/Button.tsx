import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary:
        'bg-purple-600 hover:bg-purple-500 text-white shadow-sm shadow-purple-500/20 hover:shadow-md hover:shadow-purple-500/30 active:scale-[0.98]',
      secondary:
        'bg-purple-950/70 hover:bg-purple-900/80 text-purple-200 border border-purple-800/50 hover:border-purple-700 active:scale-[0.98]',
      outline:
        'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-purple-500/60 active:scale-[0.98]',
      ghost:
        'text-slate-300 hover:text-white hover:bg-slate-800/60 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5 tracking-wide uppercase font-semibold',
      md: 'text-sm px-5 py-2.5 gap-2 font-medium',
      lg: 'text-base px-6 py-3.5 gap-2.5 font-medium',
    };

    const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
