import { ArrowRight, Film } from 'lucide-react';
import { ChapterEyebrow } from '@/components/editorial/ChapterEyebrow';
import { EditorialSection } from '@/components/editorial/EditorialSection';
import { PortfolioProjectCard } from '@/components/editorial/PortfolioProjectCard';
import { buttonVariants } from '@/components/ui/button';
import { PORTFOLIO_PROJECTS } from '@/data/studio';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { cn } from '@/lib/utils';

interface PortfolioPreviewSectionProps {
  onNavigatePortfolio: () => void;
}

export function PortfolioPreviewSection({
  onNavigatePortfolio,
}: PortfolioPreviewSectionProps) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <EditorialSection id="portafolio" withTopBorder>
      <div
        ref={ref}
        data-revealed={isVisible ? 'true' : 'false'}
        className="zs-reveal"
      >
        <ChapterEyebrow index="02" label="Portafolio" />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[length:var(--text-h2)] leading-[var(--leading-heading)] font-bold tracking-[var(--tracking-heading)]">
              Showreel 2026 & Proyectos Jugables
            </h2>
            <p className="mt-4 max-w-[var(--zs-measure-editorial)] text-[length:var(--text-lead)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
              Antes y en paralelo a Pueblo Chico, exploramos mecánicas arcade, pathfinding y
              prototipos web que hoy podés jugar directo desde el navegador o en itch.io.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <a
              href="#/portafolio"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePortfolio();
              }}
              className={cn(buttonVariants({ variant: 'breeze', size: 'lg' }))}
            >
              <Film className="h-4 w-4 text-[var(--zs-ember-400)]" aria-hidden="true" />
              <span>Abrir Portafolio y Showreel</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PORTFOLIO_PROJECTS.map((project) => (
            <li key={project.title} className="flex">
              <PortfolioProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </EditorialSection>
  );
}
