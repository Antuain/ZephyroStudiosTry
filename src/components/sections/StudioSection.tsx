import { ChapterEyebrow } from '@/components/editorial/ChapterEyebrow';
import { EditorialSection } from '@/components/editorial/EditorialSection';
import { Badge } from '@/components/ui/badge';
import { TEAM_MEMBERS } from '@/data/studio';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

const STUDIO_DOSSIER = [
  { label: 'Identidad', value: 'Estudio independiente' },
  { label: 'Base', value: 'Córdoba, Argentina' },
  { label: 'Filosofía', value: '«Aire nuevo»' },
  { label: 'Equipo fundador', value: '06 Desarrolladores' },
] as const;

export function StudioSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <EditorialSection id="el-estudio" withTopBorder>
      <div
        ref={ref}
        data-revealed={isVisible ? 'true' : 'false'}
        className="zs-reveal"
      >
        <ChapterEyebrow index="03" label="El Estudio" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[length:var(--text-h2)] leading-[var(--leading-heading)] font-bold tracking-[var(--tracking-heading)]">
              Zephyro Studios
            </h2>

            <p className="mt-6 max-w-[var(--zs-measure-editorial)] text-[length:var(--text-lead)] leading-[var(--leading-body)] text-[var(--text-primary)]">
              Somos un estudio independiente de desarrollo de videojuegos con base en{' '}
              <span className="text-[var(--text-accent)]">Córdoba, Argentina</span>, unido por
              una convicción compartida: traer{' '}
              <strong className="font-semibold text-[var(--text-primary)]">«aire nuevo»</strong>{' '}
              al terror latinoamericano.
            </p>

            <p className="mt-5 max-w-[var(--zs-measure-editorial)] text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-secondary)]">
              Como el viento del oeste que da nombre al estudio, buscamos mover la escena desde el
              oficio artesanal. Lo que empezó entre compañeros en el IES hoy toma voz propia:
              sistemas limpios, diseño sonoro como mecánica central y mundos contados desde el sur.
            </p>
          </div>

          <aside className="rounded-[var(--zs-radius-md)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 md:p-8 lg:col-span-5">
            <p className="font-mono text-[length:var(--text-eyebrow)] tracking-[var(--tracking-eyebrow)] text-[var(--text-accent)] uppercase">
              Manifiesto // Ficha del estudio
            </p>
            <dl className="mt-5 divide-y divide-[var(--border-hairline)] border-t border-[var(--border-hairline)]">
              {STUDIO_DOSSIER.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-2 py-3.5"
                >
                  <dt className="font-mono text-[length:var(--text-eyebrow)] tracking-[0.08em] text-[var(--text-secondary)] uppercase">
                    {row.label}
                  </dt>
                  <dd className="font-sans text-[length:var(--text-meta)] font-medium text-[var(--text-primary)]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* Equipo de 6 desarrolladores */}
        <div className="mt-16 border-t border-[var(--border-hairline)] pt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-display text-[length:var(--text-h3)] font-bold tracking-[-0.02em]">
              El Equipo
            </h3>
            <p className="font-mono text-[length:var(--text-meta)] text-[var(--text-secondary)]">
              06 integrantes · Córdoba, Argentina
            </p>
          </div>

          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--zs-radius-md)] border border-[var(--border-hairline)] bg-[var(--border-hairline)] sm:grid-cols-2 lg:grid-cols-3"
          >
            {TEAM_MEMBERS.map((member) => (
              <li
                key={member.name}
                className="flex flex-col justify-between gap-6 bg-[var(--bg-canvas)] p-6 transition-colors duration-[var(--duration-ember)] hover:bg-[var(--bg-surface)] md:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[length:var(--text-eyebrow)] tracking-[0.12em] text-[var(--text-secondary)]">
                    {member.index}
                  </span>
                  <Badge variant="breeze">{member.role}</Badge>
                </div>

                <div>
                  <p className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">
                    {member.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </EditorialSection>
  );
}
