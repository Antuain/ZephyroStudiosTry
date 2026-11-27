import { cn } from '@/lib/utils';

interface SeparatorProps {
  className?: string;
  decorative?: boolean;
}

export function Separator({ className, decorative = true }: SeparatorProps) {
  return (
    <hr
      aria-hidden={decorative ? true : undefined}
      className={cn('h-px w-full border-0 bg-[var(--border-hairline)]', className)}
    />
  );
}
