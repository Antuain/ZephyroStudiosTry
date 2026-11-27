import { cn } from '@/lib/utils';

interface ZephyroMarkProps {
  className?: string;
  kinetic?: boolean;
  label?: string;
}

export function ZephyroMark({
  className,
  kinetic = false,
  label,
}: ZephyroMarkProps) {
  const isDecorative = !label;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 724"
      fill="none"
      role={isDecorative ? undefined : 'img'}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={label}
      className={cn(kinetic && 'zs-mark-kinetic', className)}
    >
      {label ? <title>{label}</title> : null}
      <path
        id="zephyro-blade-top"
        className="zs-blade-top"
        fill="currentColor"
        d="M 796.41,436.59 C 473.49,449.08 427.36,384.57 427.36,384.57 C 427.36,384.57 487.48,263.17 394.15,245.05 C 125.46,192.87 15.58,2.99 15.58,2.99 L 469.11,3.11 Z"
      />
      <path
        id="zephyro-blade-bottom"
        className="zs-blade-bottom"
        fill="currentColor"
        d="M 784.4,721.01 L 330.88,720.89 L 3.59,287.39 C 326.49,274.9 372.63,339.41 372.63,339.41 C 372.63,339.41 312.5,460.82 405.84,478.95 C 674.54,531.11 784.4,721.01 784.4,721.01 Z"
      />
    </svg>
  );
}
