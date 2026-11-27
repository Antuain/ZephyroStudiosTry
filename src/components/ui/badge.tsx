import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-[var(--zs-radius-xs)] border font-mono text-[length:var(--text-eyebrow)] tracking-[0.1em] uppercase transition-colors duration-[var(--duration-ember)]',
  {
    variants: {
      variant: {
        breeze:
          'border-[var(--zs-border-interactive)] bg-[var(--bg-surface)] px-3 py-1 text-[var(--text-accent)]',
        ember:
          'border-[var(--cta-bg)] bg-[var(--bg-surface)] px-3 py-1 text-[var(--zs-ember-400)]',
        surface:
          'border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 text-[var(--text-secondary)]',
      },
    },
    defaultVariants: {
      variant: 'surface',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
