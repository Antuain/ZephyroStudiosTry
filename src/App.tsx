import { useCallback, useEffect, useRef, useState } from 'react';
import { TrailerModal } from '@/components/editorial/TrailerModal';
import {
  ContactSection,
  SiteFooter,
  type ContactTopic,
} from '@/components/sections/FooterContact';
import { HeroStageshow } from '@/components/sections/HeroStageshow';
import { Navbar } from '@/components/sections/Navbar';
import { PortfolioPreviewSection } from '@/components/sections/PortfolioPreviewSection';
import { PortfolioView } from '@/components/sections/PortfolioView';
import { PuebloChicoSection } from '@/components/sections/PuebloChicoSection';
import { StudioSection } from '@/components/sections/StudioSection';

type AppView = 'home' | 'portfolio';

function getViewFromHash(hash: string): AppView {
  const normalized = hash.toLowerCase();
  if (normalized.startsWith('#/portafolio') || normalized.startsWith('#/portfolio')) {
    return 'portfolio';
  }
  return 'home';
}

export function App() {
  const [currentView, setCurrentView] = useState<AppView>(() =>
    getViewFromHash(window.location.hash),
  );
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ContactTopic>('notify');
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentView(getViewFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title =
      currentView === 'portfolio'
        ? 'Portafolio y Showreel 2026 | Zephyro Studios'
        : 'Zephyro Studios — Pueblo Chico | Estudio de Videojuegos Independiente';
  }, [currentView]);

  const scrollToSection = useCallback((sectionId: string) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      return;
    }
    const target = document.getElementById(sectionId);
    target?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  useEffect(() => {
    if (currentView !== 'home' || !pendingSection) return;
    const sectionToScroll = pendingSection;
    setPendingSection(null);
    window.requestAnimationFrame(() => scrollToSection(sectionToScroll));
  }, [currentView, pendingSection, scrollToSection]);

  const handleNavigateHome = useCallback(
    (sectionId = 'inicio') => {
      if (currentView !== 'home') {
        window.location.hash = '#/';
        setCurrentView('home');
        setPendingSection(sectionId);
        return;
      }
      scrollToSection(sectionId);
    },
    [currentView, scrollToSection],
  );

  const handleNavigatePortfolio = useCallback(() => {
    if (currentView !== 'portfolio') {
      window.location.hash = '#/portafolio';
      setCurrentView('portfolio');
    }
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, [currentView]);

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Navbar
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigatePortfolio={handleNavigatePortfolio}
        onOpenTrailer={() => setTrailerOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'portfolio' ? (
          <PortfolioView
            onNavigateHome={handleNavigateHome}
            onOpenTrailer={() => setTrailerOpen(true)}
          />
        ) : (
          <>
            <HeroStageshow onOpenTrailer={() => setTrailerOpen(true)} />
            <PuebloChicoSection onOpenTrailer={() => setTrailerOpen(true)} />
            <PortfolioPreviewSection onNavigatePortfolio={handleNavigatePortfolio} />
            <StudioSection />
            <ContactSection
              topicSignal={0}
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              nameInputRef={nameInputRef}
            />
          </>
        )}
      </main>

      <SiteFooter
        onNavigateHome={handleNavigateHome}
        onNavigatePortfolio={handleNavigatePortfolio}
      />

      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
    </div>
  );
}

export default App;
