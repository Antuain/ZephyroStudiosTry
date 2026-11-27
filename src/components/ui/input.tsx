import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = ComponentProps<'input'>;

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'zs-field-control min-h-12 w-full rounded-[var(--zs-radius-sm)] border border-[var(--border-control)] bg-[var(--bg-canvas)] px-4 py-3 font-sans text-[length:max(1rem,1em)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/65 transition-[border-color,background-color] duration-[var(--duration-ember)] focus-visible:border-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
