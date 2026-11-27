import { cn } from '@/lib/utils';

interface ChapterEyebrowProps {
  index: string;
  label: string;
  className?: string;
}

export function ChapterEyebrow({ index, label, className }: ChapterEyebrowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 font-mono text-[length:var(--text-eyebrow)] tracking-[var(--tracking-eyebrow)] text-[var(--text-accent)] uppercase',
        className,
      )}
    >
      <span>{index}</span>
      <span aria-hidden="true" className="h-px w-6 bg-[var(--zs-border-interactive)]" />
      <span>{label}</span>
    </div>
  );
}
