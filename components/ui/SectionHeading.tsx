import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-3',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-purple-950/70 text-purple-300 border border-purple-800/60 shadow-xs'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          {badge}
        </div>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
