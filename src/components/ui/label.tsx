import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'inline-block font-sans text-[length:var(--text-meta)] font-medium text-[var(--text-primary)]',
        className,
      )}
      {...props}
    />
  );
}
