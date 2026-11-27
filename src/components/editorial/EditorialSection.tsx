import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EditorialSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  withTopBorder?: boolean;
}

export function EditorialSection({
  id,
  children,
  className,
  withTopBorder = false,
}: EditorialSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 px-[var(--zs-gutter)] py-[var(--zs-section-space)]',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-[var(--zs-container-max)]',
          withTopBorder && 'border-t border-[var(--border-hairline)] pt-12 md:pt-16',
        )}
      >
        {children}
      </div>
    </section>
  );
}
