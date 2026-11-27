import { ArrowLeft, ArrowUpRight, Film, Play } from 'lucide-react';
import { ChapterEyebrow } from '@/components/editorial/ChapterEyebrow';
import { EditorialSection } from '@/components/editorial/EditorialSection';
import { PortfolioProjectCard } from '@/components/editorial/PortfolioProjectCard';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  MEDIA_LINKS,
  PORTFOLIO_PROJECTS,
  STUDIO_LINKS,
} from '@/data/studio';
import { cn } from '@/lib/utils';

interface PortfolioViewProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenTrailer: () => void;
}

export function PortfolioView({
  onNavigateHome,
  onOpenTrailer,
}: PortfolioViewProps) {
  return (
    <div>
      {/* Cabecera editorial del Portafolio */}
      <section className="px-[var(--zs-gutter)] pt-14 pb-16 md:pt-24 md:pb-20">
        <div className="mx-auto w-full max-w-[var(--zs-container-max)]">
          <button
            type="button"
            onClick={() => onNavigateHome('inicio')}
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-4')}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Volver al inicio</span>
          </button>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[length:var(--text-eyebrow)] tracking-[var(--tracking-eyebrow)] text-[var(--text-accent)] uppercase">
                Archivo jugable // Zephyro Studios
              </p>
              <h1
                id="contenido-principal"
                tabIndex={-1}
                className="mt-4 font-display text-[length:var(--text-display)] leading-[var(--leading-display)] font-extrabold tracking-[var(--tracking-display)] text-[var(--text-primary)] focus:outline-none"
              >
                Nuestros Juegos
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="max-w-[var(--zs-measure-editorial)] text-[length:var(--text-lead)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
                Un vistazo a los proyectos y experiencias interactivas que desarrollamos en{' '}
                <span className="text-[var(--text-primary)]">Zephyro Studios</span>.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={STUDIO_LINKS.itchio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: 'default', size: 'default' }))}
                >
                  <span>Perfil oficial en itch.io</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Button variant="breeze" onClick={onOpenTrailer}>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  <span>Tráiler Pueblo Chico</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showreel 2026 */}
      <EditorialSection id="showreel" withTopBorder className="pt-0 md:pt-0">
        <ChapterEyebrow index="01" label="Showreel 2026" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[length:var(--text-h2)] leading-[var(--leading-heading)] font-bold tracking-[var(--tracking-heading)]">
            Showreel 2026
          </h2>
          <Badge variant="ember" className="gap-2">
            <Film className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Compilado de proyectos</span>
          </Badge>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[var(--zs-radius-md)] border border-[var(--border-hairline)] bg-[var(--zs-night-900)]">
          <div className="aspect-video w-full bg-[var(--bg-canvas)]">
            <video
              controls
              playsInline
              preload="metadata"
              aria-label="Showreel 2026 de Zephyro Studios"
              className="h-full w-full object-contain"
            >
              <source src={MEDIA_LINKS.showreelVideoUrl} type="video/mp4" />
              Tu navegador no soporta reproducción de video.
            </video>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] bg-[var(--surface-scrim)] px-6 py-3.5">
            <p className="font-mono text-[length:var(--text-eyebrow)] tracking-[0.1em] text-[var(--text-secondary)] uppercase">
              Zephyro Studios · Muestra 2026 · Música y gameplay
            </p>
            <button
              type="button"
              onClick={onOpenTrailer}
              className="inline-flex min-h-10 items-center gap-2 font-mono text-[length:var(--text-eyebrow)] tracking-[0.08em] text-[var(--text-accent)] uppercase transition-colors duration-[var(--duration-ember)] hover:text-[var(--zs-ember-400)] cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Ver tráiler de Pueblo Chico</span>
            </button>
          </div>
        </div>
      </EditorialSection>

      {/* Grilla de 6 proyectos jugables */}
      <EditorialSection id="juegos" withTopBorder>
        <ChapterEyebrow index="02" label="Proyectos Disponibles" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[length:var(--text-h2)] leading-[var(--leading-heading)] font-bold tracking-[var(--tracking-heading)]">
            Proyectos Jugables
          </h2>
          <p className="font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)]">
            06 títulos disponibles en web e itch.io
          </p>
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
      </EditorialSection>
    </div>
  );
}
