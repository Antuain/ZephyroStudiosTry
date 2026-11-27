import { useEffect, useState } from 'react';
import { Menu, Play, X } from 'lucide-react';
import { ZephyroMark } from '@/components/editorial/ZephyroMark';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  currentView: 'home' | 'portfolio';
  onNavigateHome: (sectionId?: string) => void;
  onNavigatePortfolio: () => void;
  onOpenTrailer: () => void;
}

export function Navbar({
  currentView,
  onNavigateHome,
  onNavigatePortfolio,
  onOpenTrailer,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleHomeAnchor = (sectionId: string) => {
    setMobileOpen(false);
    onNavigateHome(sectionId);
  };

  const handlePortfolioClick = () => {
    setMobileOpen(false);
    onNavigatePortfolio();
  };

  const handleTrailerClick = () => {
    setMobileOpen(false);
    onOpenTrailer();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--surface-scrim)] backdrop-blur-md">
      <a
        href="#contenido-principal"
        className="visually-hidden fixed top-4 left-4 z-50 rounded-[var(--zs-radius-sm)] bg-[var(--cta-bg)] px-4 py-2.5 font-sans text-[length:var(--text-meta)] font-semibold text-[var(--cta-fg)]"
      >
        Saltar al contenido principal
      </a>

      <div className="mx-auto flex min-h-16 w-full max-w-[var(--zs-container-max)] items-center justify-between gap-4 px-[var(--zs-gutter)] py-3">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleHomeAnchor('inicio');
          }}
          className="group inline-flex min-h-11 items-center gap-3 text-[var(--text-primary)] no-underline"
        >
          <ZephyroMark kinetic className="h-7 w-auto text-[var(--text-primary)]" />
          <span className="font-display text-[1.0625rem] font-bold tracking-[-0.025em]">
            Zephyro Studios
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          <ul role="list" className="flex items-center gap-7">
            <li>
              <a
                href="#pueblo-chico"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeAnchor('pueblo-chico');
                }}
                className="inline-flex min-h-11 items-center font-sans text-[length:var(--text-meta)] font-medium text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
              >
                Pueblo Chico
              </a>
            </li>
            <li>
              <a
                href="#/portafolio"
                aria-current={currentView === 'portfolio' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handlePortfolioClick();
                }}
                className={cn(
                  'inline-flex min-h-11 items-center font-sans text-[length:var(--text-meta)] font-medium transition-colors duration-[var(--duration-ember)]',
                  currentView === 'portfolio'
                    ? 'text-[var(--text-accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                )}
              >
                Portafolio
              </a>
            </li>
            <li>
              <a
                href="#el-estudio"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeAnchor('el-estudio');
                }}
                className="inline-flex min-h-11 items-center font-sans text-[length:var(--text-meta)] font-medium text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
              >
                El Estudio
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeAnchor('contacto');
                }}
                className="inline-flex min-h-11 items-center font-sans text-[length:var(--text-meta)] font-medium text-[var(--text-secondary)] transition-colors duration-[var(--duration-ember)] hover:text-[var(--text-primary)]"
              >
                Contacto
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={handleTrailerClick}
            className={cn(buttonVariants({ variant: 'breeze', size: 'sm' }))}
          >
            <Play className="h-3.5 w-3.5 text-[var(--zs-ember-400)]" aria-hidden="true" />
            <span>Mirá el tráiler</span>
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--zs-radius-sm)] border border-[var(--border-control)] text-[var(--text-primary)] transition-colors duration-[var(--duration-ember)] hover:border-[var(--text-accent)] hover:bg-[var(--bg-surface)] md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Móvil"
          className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-[var(--zs-gutter)] py-5 md:hidden"
        >
          <ul role="list" className="flex flex-col gap-2">
            <li>
              <a
                href="#pueblo-chico"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeAnchor('pueblo-chico');
                }}
                className="flex min-h-11 items-center font-display text-lg font-semibold text-[var(--text-primary)]"
              >
                Pueblo Chico
              </a>
            </li>
            <li>
              <a
                href="#/portafolio"
                aria-current={currentView === 'portfolio' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handlePortfolioClick();
                }}
                className={cn(
                  'flex min-h-11 items-center font-display text-lg font-semibold',
                  currentView === 'portfolio'
                    ? 'text-[var(--text-accent)]'
                    : 'text-[var(--text-primary)]',
                )}
              >
                Portafolio
              </a>
            </li>
            <li>
              <a
                href="#el-estudio"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeAnchor('el-estudio');
                }}
                className="flex min-h-11 items-center font-display text-lg font-semibold text-[var(--text-primary)]"
              >
                El Estudio
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleHomeAnchor('contacto');
                }}
                className="flex min-h-11 items-center font-display text-lg font-semibold text-[var(--text-primary)]"
              >
                Contacto
              </a>
            </li>
            <li className="pt-2">
              <button
                type="button"
                onClick={handleTrailerClick}
                className={cn(buttonVariants({ variant: 'default', size: 'default' }), 'w-full')}
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                <span>Mirá el tráiler</span>
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
