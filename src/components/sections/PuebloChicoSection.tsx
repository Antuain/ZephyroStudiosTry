import { ArrowUpRight, Play } from 'lucide-react';
import { ChapterEyebrow } from '@/components/editorial/ChapterEyebrow';
import { EditorialSection } from '@/components/editorial/EditorialSection';
import { Button, buttonVariants } from '@/components/ui/button';
import { GAME_PILLARS, GAME_SPECS, STUDIO_LINKS } from '@/data/studio';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { cn } from '@/lib/utils';

interface PuebloChicoSectionProps {
  onOpenTrailer: () => void;
}

export function PuebloChicoSection({ onOpenTrailer }: PuebloChicoSectionProps) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <EditorialSection id="pueblo-chico" withTopBorder>
      <div
        ref={ref}
        data-revealed={isVisible ? 'true' : 'false'}
        className="zs-reveal"
      >
        <ChapterEyebrow index="01" label="El Proyecto" />

        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Columna izquierda anclada: Ficha técnica y CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-[length:var(--text-h2)] leading-[var(--leading-heading)] font-bold tracking-[var(--tracking-heading)]">
              Pueblo Chico
            </h2>

            <p className="mt-4 max-w-[44ch] text-[length:var(--text-lead)] text-[var(--text-secondary)]">
              Un descenso lento hacia la noche del interior argentino, donde lo familiar se vuelve
              irreconocible apenas cae la bruma.
            </p>

            <dl className="mt-8 border-t border-[var(--border-hairline)]">
              {GAME_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border-hairline)] py-3.5"
                >
                  <dt className="font-mono text-[length:var(--text-eyebrow)] tracking-[0.1em] text-[var(--text-secondary)] uppercase">
                    {spec.label}
                  </dt>
                  <dd className="font-sans text-[length:var(--text-meta)] font-medium text-[var(--text-primary)]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={STUDIO_LINKS.itchio}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'w-full sm:w-auto')}
              >
                <span>Jugar / Ver en itch.io</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <Button
                variant="breeze"
                size="lg"
                onClick={onOpenTrailer}
                className="w-full sm:w-auto"
              >
                <Play className="h-4 w-4 text-[var(--zs-ember-400)]" aria-hidden="true" />
                <span>Mirá el tráiler</span>
              </Button>
            </div>

            <p className="mt-3 max-w-[42ch] font-mono text-[length:var(--text-meta)] leading-[var(--leading-meta)] text-[var(--text-secondary)]">
              Descargas y novedades oficiales publicadas en{' '}
              <span className="text-[var(--text-primary)]">zephyro-studios.itch.io</span>.
            </p>
          </div>

          {/* Columna derecha: Sinopsis y pilares editoriales */}
          <div className="lg:col-span-7">
            <div className="space-y-6 border-b border-[var(--border-hairline)] pb-12">
              <h3 className="font-display text-[length:var(--text-h3)] font-semibold tracking-[-0.015em] text-[var(--text-accent)]">
                Sinopsis
              </h3>
              <p className="max-w-[var(--zs-measure-editorial)] text-[length:var(--text-lead)] leading-[var(--leading-body)] text-[var(--text-primary)]">
                En un paraje aislado entre caminos de tierra y monte cerrado, las casas guardan
                más historia que habitantes. Lo que comienza como una búsqueda nocturna se
                transforma en una prueba de percepción: cada puerta entreabierta, cada alambre
                vibrando con el viento y cada silencio prolongado esconden una señal.
              </p>
              <p className="max-w-[var(--zs-measure-editorial)] text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
                Pueblo Chico propone un terror contenido e inmersivo, arraigado en nuestra tierra y
                diseñado alrededor de la escucha profunda. No estás solo cuando todo calla.
              </p>
            </div>

            <div className="pt-12">
              <h3 className="font-display text-[length:var(--text-h3)] font-semibold tracking-[-0.015em]">
                Pilares de diseño
              </h3>

              <ol className="mt-8 divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)]">
                {GAME_PILLARS.map((pillar) => (
                  <li key={pillar.index} className="py-8 first:pt-7 last:pb-7">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-6">
                      <div className="sm:col-span-4">
                        <span className="font-mono text-[length:var(--text-eyebrow)] tracking-[var(--tracking-eyebrow)] text-[var(--zs-ember-400)] uppercase">
                          {pillar.index} // PILAR
                        </span>
                        <h4 className="mt-2 font-display text-[length:var(--text-h3)] font-bold tracking-[-0.02em]">
                          {pillar.title}
                        </h4>
                        <p className="mt-1.5 font-mono text-[0.75rem] tracking-[0.06em] text-[var(--text-accent)] uppercase">
                          {pillar.tag}
                        </p>
                      </div>

                      <p className="max-w-[var(--zs-measure-editorial)] text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-secondary)] sm:col-span-8">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </EditorialSection>
  );
}
