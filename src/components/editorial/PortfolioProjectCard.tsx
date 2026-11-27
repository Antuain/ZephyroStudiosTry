import {
  ArrowUpRight,
  Brain,
  Crosshair,
  Gamepad2,
  Gauge,
  Ghost,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import type { PortfolioIcon, PortfolioProject } from '@/data/studio';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<PortfolioIcon, LucideIcon> = {
  ghost: Ghost,
  gamepad: Gamepad2,
  brain: Brain,
  crosshair: Crosshair,
  rocket: Rocket,
  gauge: Gauge,
};

interface PortfolioProjectCardProps {
  project: PortfolioProject;
}

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  const Icon = ICON_MAP[project.icon];

  return (
    <article className="group flex flex-col justify-between gap-6 rounded-[var(--zs-radius-md)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors duration-[var(--duration-ember)] hover:border-[var(--cta-bg)] md:p-7">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--zs-radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-accent)] transition-colors duration-[var(--duration-ember)] group-hover:border-[var(--cta-bg)] group-hover:text-[var(--zs-ember-400)]"
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-mono text-[length:var(--text-eyebrow)] tracking-[0.12em] text-[var(--text-secondary)]">
              {project.index}
            </span>
          </div>

          <Badge variant="breeze">{project.platform}</Badge>
        </div>

        <h3 className="mt-6 font-display text-[length:var(--text-h3)] leading-snug font-bold tracking-[-0.02em] text-[var(--text-primary)]">
          {project.title}
        </h3>

        <p className="mt-1 font-mono text-[0.75rem] tracking-[0.08em] text-[var(--text-accent)] uppercase">
          {project.genre}
        </p>

        <p className="mt-4 text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
          {project.description}
        </p>
      </div>

      <div className="border-t border-[var(--border-hairline)] pt-5">
        <a
          href={project.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'default', size: 'default' }), 'w-full justify-between')}
        >
          <span className="inline-flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" aria-hidden="true" />
            <span>Jugar</span>
          </span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
