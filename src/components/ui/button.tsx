import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--zs-radius-sm)] font-sans text-[length:var(--text-meta)] tracking-[0.02em] transition-[background-color,border-color,color,transform] duration-[var(--duration-ember)] ease-[var(--ease-breeze)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--cta-bg)] text-[var(--cta-fg)] font-semibold hover:bg-[var(--cta-bg-hover)] active:translate-y-px',
        breeze:
          'border border-[var(--border-control)] bg-transparent text-[var(--text-primary)] font-medium hover:border-[var(--text-accent)] hover:bg-[var(--bg-surface)]',
        subtle:
          'border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium hover:border-[var(--border-control)] hover:bg-[var(--bg-surface-elevated)]',
        ghost:
          'bg-transparent text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]',
      },
      size: {
        default: 'min-h-12 px-6 py-3',
        sm: 'min-h-10 px-4 py-2',
        lg: 'min-h-13 px-7 py-3.5 text-[length:var(--text-body)]',
        icon: 'min-h-11 min-w-11 p-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
