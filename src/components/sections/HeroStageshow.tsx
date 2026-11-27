import { useState } from 'react';
import { ArrowUpRight, Headphones, Pause, Play } from 'lucide-react';
import zephyroIsotipoUrl from '@/assets/zephyro-isotipo.svg';
import { AmbientBreeze } from '@/components/editorial/AmbientBreeze';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { STUDIO_LINKS } from '@/data/studio';
import { cn } from '@/lib/utils';

interface HeroStageshowProps {
  onOpenTrailer: () => void;
}

const WAVE_BARS = [
  { id: 'w1', height: '38%', delay: '0s' },
  { id: 'w2', height: '72%', delay: '0.35s' },
  { id: 'w3', height: '54%', delay: '0.7s' },
  { id: 'w4', height: '92%', delay: '0.2s' },
  { id: 'w5', height: '48%', delay: '0.9s' },
  { id: 'w6', height: '80%', delay: '0.45s' },
  { id: 'w7', height: '34%', delay: '0.15s' },
  { id: 'w8', height: '66%', delay: '0.6s' },
  { id: 'w9', height: '44%', delay: '0.85s' },
] as const;

export function HeroStageshow({ onOpenTrailer }: HeroStageshowProps) {
  const [atmospherePaused, setAtmospherePaused] = useState(false);

  return (
    <section
      id="inicio"
      className="px-[var(--zs-gutter)] pt-14 pb-20 md:pt-24 md:pb-28"
    >
      <div className="mx-auto w-full max-w-[var(--zs-container-max)]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[length:var(--text-eyebrow)] tracking-[var(--tracking-eyebrow)] text-[var(--text-accent)] uppercase">
              31°25′S 64°11′W · Córdoba, Argentina · Título debut
            </p>
            <h1
              id="contenido-principal"
              tabIndex={-1}
              className="mt-4 font-display text-[length:var(--text-display)] leading-[var(--leading-display)] font-extrabold tracking-[var(--tracking-display)] text-[var(--text-primary)] focus:outline-none"
            >
              Pueblo Chico
            </h1>
            <p className="mt-5 font-display text-[length:var(--text-h3)] leading-snug font-medium tracking-[-0.015em] text-[var(--text-accent)]">
              «El silencio es tu peor enemigo»
            </p>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-[var(--zs-measure-editorial)] text-[length:var(--text-lead)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
              Terror folclórico en primera persona donde el audio 3D espacial reemplaza la
              certeza visual. Un desarrollo independiente de{' '}
              <span className="text-[var(--text-primary)]">Zephyro Studios</span>.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={STUDIO_LINKS.itchio}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
              >
                <span>Ver en itch.io</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Button variant="breeze" size="lg" onClick={onOpenTrailer}>
                <Play className="h-4 w-4 text-[var(--zs-ember-400)]" aria-hidden="true" />
                <span>Mirá el tráiler</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Contenedor Stageshow para el tráiler oficial de Pueblo Chico */}
        <div
          className="@container relative mt-12 overflow-hidden rounded-[var(--zs-radius-md)] border border-[var(--border-hairline)] bg-[var(--zs-night-900)] md:mt-16"
        >
          <div className="relative flex min-h-[22rem] w-full flex-col justify-between md:aspect-video">
            <AmbientBreeze paused={atmospherePaused} />
            <div aria-hidden="true" className="zs-grain pointer-events-none absolute inset-0" />

            {/* Esquinas arquitectónicas del visor stageshow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-4 h-5 w-5 border-t border-l border-[var(--zs-border-interactive)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-4 right-4 h-5 w-5 border-t border-r border-[var(--zs-border-interactive)]"
            />

            {/* Barra superior de estado del tráiler */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-6 pt-6 md:px-10 md:pt-8">
              <Badge variant="ember" className="gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[var(--cta-bg)]"
                />
                <span>Tráiler oficial — Pueblo Chico</span>
              </Badge>

              <span className="font-mono text-[length:var(--text-eyebrow)] tracking-[0.12em] text-[var(--text-secondary)] uppercase">
                Stageshow // Slot 01
              </span>
            </div>

            {/* Centro atmosférico del Stageshow */}
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 py-10 text-center md:py-12">
              <img
                src={zephyroIsotipoUrl}
                alt=""
                className="h-11 w-auto opacity-90 md:h-13"
              />

              <p className="mt-6 font-display text-[length:var(--text-h2)] leading-[var(--leading-heading)] font-bold tracking-[var(--tracking-heading)] text-[var(--text-primary)]">
                «El silencio es tu peor enemigo»
              </p>

              <p className="mt-3 max-w-[46ch] text-[length:var(--text-body)] text-[var(--text-secondary)]">
                Cuando el viento baja en la sierra, escuchás lo que no deberías escuchar.
              </p>

              <div className="mt-6">
                <Button size="lg" onClick={onOpenTrailer}>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  <span>Mirá el tráiler</span>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                <div
                  aria-hidden="true"
                  data-paused={atmospherePaused ? 'true' : 'false'}
                  className="flex h-7 items-end gap-1.5"
                >
                  {WAVE_BARS.map((bar) => (
                    <span
                      key={bar.id}
                      className="zs-wave-bar w-1 rounded-full bg-[var(--text-accent)]"
                      style={{ height: bar.height, animationDelay: bar.delay }}
                    />
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-[length:var(--text-meta)] text-[var(--text-accent)]">
                  <Headphones className="h-4 w-4" aria-hidden="true" />
                  <span>Audio 3D espacial · Recomendado con auriculares</span>
                </span>
              </div>
            </div>

            {/* Barra inferior de telemetría y control accesible WCAG 2.2.2 */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] bg-[var(--surface-scrim)] px-6 py-3.5 md:px-10">
              <p className="font-mono text-[length:var(--text-eyebrow)] tracking-[0.12em] text-[var(--text-secondary)] uppercase">
                Pueblo Chico · Zephyro Studios · Córdoba AR
              </p>

              <button
                type="button"
                onClick={() => setAtmospherePaused((prev) => !prev)}
                className="inline-flex min-h-10 items-center gap-2 rounded-[var(--zs-radius-xs)] border border-[var(--border-control)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-[length:var(--text-eyebrow)] tracking-[0.08em] text-[var(--text-primary)] uppercase transition-colors duration-[var(--duration-ember)] hover:border-[var(--text-accent)] cursor-pointer"
              >
                {atmospherePaused ? (
                  <>
                    <Play className="h-3.5 w-3.5 text-[var(--text-accent)]" aria-hidden="true" />
                    <span>Reanudar atmósfera</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5 text-[var(--text-accent)]" aria-hidden="true" />
                    <span>Pausar atmósfera</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
