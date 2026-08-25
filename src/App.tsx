import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { NothinLandingHero } from './components/NothinLandingHero';
import { HeroCarousel } from './components/HeroCarousel';
import { CircularFeaturesGallery } from './components/CircularFeaturesGallery';
import { HowItWorks } from './components/HowItWorks';
import { SponsorsStrip } from './components/SponsorsStrip';
import { TestimonialsGallery } from './components/TestimonialsGallery';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { RegistrationModal } from './components/RegistrationModal';
import { DemoModal } from './components/DemoModal';
import { ArchiveGallery } from './components/ArchiveGallery';
import { GuestProfiles } from './components/GuestProfiles';
import { FestSchedule } from './components/FestSchedule';
import { CountdownTimer } from './components/CountdownTimer';
import { CustomCursor } from './components/CustomCursor';
import { HackathonPage } from './competitions/hackathon/HackathonPage';
import { EsportsPage } from './competitions/esports/EsportsPage';
import { CtfPage } from './competitions/ctf/CtfPage';
import { TreasureHuntPage } from './competitions/treasure-hunt/TreasureHuntPage';
import { WorkshopPage } from './competitions/workshop/WorkshopPage';
import { EventTrack } from './types';

export type ViewType =
  | 'landing'
  | 'hackathon'
  | 'esports'
  | 'ctf'
  | 'treasure-hunt'
  | 'workshop';

const pathToViewMap: Record<string, ViewType> = {
  '': 'landing',
  '/': 'landing',
  '/landing': 'landing',
  '/hackathon': 'hackathon',
  '/esports': 'esports',
  '/ctf': 'ctf',
  '/treasure-hunt': 'treasure-hunt',
  '/treasurehunt': 'treasure-hunt',
  '/quest': 'treasure-hunt',
  '/workshop': 'workshop',
  '/workshops': 'workshop',
  '/newspaper': 'hackathon',
};

const viewToPathMap: Record<ViewType, string> = {
  landing: '/',
  hackathon: '/hackathon',
  esports: '/esports',
  ctf: '/ctf',
  'treasure-hunt': '/treasure-hunt',
  workshop: '/workshop',
};

export function App() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  
  // Read initial path on load
  const getInitialView = (): ViewType => {
    if (typeof window === 'undefined') return 'landing';
    const cleanPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    return pathToViewMap[cleanPath] || 'landing';
  };

  const [currentView, setCurrentView] = useState<ViewType>(getInitialView);

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerDefaultTrack, setRegisterDefaultTrack] = useState<string | undefined>(undefined);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [customCursorEnabled, setCustomCursorEnabled] = useState(false);

  // Synchronize browser history and popstate for back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const cleanPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
      const matchedView = pathToViewMap[cleanPath] || 'landing';
      setCurrentView(matchedView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNavigate = useCallback((view: ViewType, sectionId?: string) => {
    setCurrentView(view);
    const targetPath = viewToPathMap[view] || '/';
    
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }

    if (view === 'landing' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleSelectTrack = (track: EventTrack) => {
    if (track.category === 'Hackathon') {
      handleNavigate('hackathon');
    } else if (track.category === 'Esports') {
      handleNavigate('esports');
    } else if (track.category === 'CTF') {
      handleNavigate('ctf');
    } else if (track.category === 'Treasure Hunt') {
      handleNavigate('treasure-hunt');
    } else if (track.category === 'Workshop') {
      handleNavigate('workshop');
    } else {
      handleNavigate('hackathon');
    }
  };

  const handleSelectCompetitionByName = (arena: string) => {
    if (arena === 'Hackathon') handleNavigate('hackathon');
    else if (arena === 'Esports') handleNavigate('esports');
    else if (arena === 'CTF') handleNavigate('ctf');
    else if (arena === 'Treasure Hunt') handleNavigate('treasure-hunt');
    else if (arena === 'Workshop') handleNavigate('workshop');
    else handleNavigate('hackathon');
  };

  const handleOpenRegister = (trackId?: string) => {
    setRegisterDefaultTrack(trackId);
    setIsRegisterOpen(true);
  };

  return (
    <div className={`relative min-h-screen bg-black text-white selection:bg-white selection:text-black ${isLightMode ? 'theme-light' : ''} ${customCursorEnabled ? 'custom-cursor' : ''}`}>
      {/* 0. Preloader */}
      <Preloader onComplete={() => setIsPreloaderComplete(true)} />

      {/* Top Navbar */}
      <Navbar
        onNavigate={(view, sectionId) => handleNavigate(view as ViewType, sectionId)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenRegister={() => handleOpenRegister()}
        onOpenDemo={() => setIsDemoOpen(true)}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode((current) => !current)}
        customCursorEnabled={customCursorEnabled}
        onToggleCursor={() => setCustomCursorEnabled((current) => !current)}
      />

      {/* Main Experience Router */}
      <main className="w-full flex flex-col">
        {currentView === 'landing' && (
          <>
            <NothinLandingHero
              isLoaded={isPreloaderComplete}
              onOpenRegister={() => handleOpenRegister()}
              onExploreEvents={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              countdown={<CountdownTimer />}
            />

            <HeroCarousel />

            <CircularFeaturesGallery
              onSelectTrackForNewspaper={handleSelectTrack}
              onOpenRegister={handleOpenRegister}
            />

            <HowItWorks onOpenRegister={() => handleOpenRegister()} />

            <FestSchedule />

            <SponsorsStrip />

            <ArchiveGallery />

            <GuestProfiles />

            <TestimonialsGallery />

            <FAQSection />

            <Footer
              onOpenRegister={() => handleOpenRegister()}
              onNavigateNewspaper={() => handleNavigate('hackathon')}
            />
          </>
        )}

        {currentView === 'hackathon' && (
          <HackathonPage
            onBackToLanding={() => handleNavigate('landing', 'features')}
            onOpenRegister={handleOpenRegister}
            onSelectOtherCompetition={handleSelectCompetitionByName}
          />
        )}

        {currentView === 'esports' && (
          <EsportsPage
            onBackToLanding={() => handleNavigate('landing', 'features')}
            onOpenRegister={handleOpenRegister}
            onSelectOtherCompetition={handleSelectCompetitionByName}
          />
        )}

        {currentView === 'ctf' && (
          <CtfPage
            onBackToLanding={() => handleNavigate('landing', 'features')}
            onOpenRegister={handleOpenRegister}
            onSelectOtherCompetition={handleSelectCompetitionByName}
          />
        )}

        {currentView === 'treasure-hunt' && (
          <TreasureHuntPage
            onBackToLanding={() => handleNavigate('landing', 'features')}
            onOpenRegister={handleOpenRegister}
            onSelectOtherCompetition={handleSelectCompetitionByName}
          />
        )}

        {currentView === 'workshop' && (
          <WorkshopPage
            onBackToLanding={() => handleNavigate('landing', 'features')}
            onOpenRegister={handleOpenRegister}
            onSelectOtherCompetition={handleSelectCompetitionByName}
          />
        )}
      </main>

      {/* Interactive AI Assistant Slide-Out Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onSelectTrack={() => {
          setIsAIOpen(false);
          handleNavigate('hackathon');
        }}
      />

      {/* Registration Modal with Confetti */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        defaultTrackId={registerDefaultTrack}
      />

      {/* Demo Video Modal */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      {customCursorEnabled && <CustomCursor />}
    </div>
  );
}

export default App;
