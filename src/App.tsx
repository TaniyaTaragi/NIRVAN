import { useState, useEffect } from 'react';
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
import { NewspaperEventPage } from './components/NewspaperEventPage';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { RegistrationModal } from './components/RegistrationModal';
import { DemoModal } from './components/DemoModal';
import { EventTrack } from './types';

export function App() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'newspaper'>('landing');
  const [selectedTrackForNewspaper, setSelectedTrackForNewspaper] = useState<EventTrack | null>(null);

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerDefaultTrack, setRegisterDefaultTrack] = useState<string | undefined>(undefined);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

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

  const handleNavigate = (view: 'landing' | 'newspaper', sectionId?: string) => {
    setCurrentView(view);
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
  };

  const handleSelectTrackForNewspaper = (track: EventTrack) => {
    setSelectedTrackForNewspaper(track);
    setCurrentView('newspaper');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (trackId?: string) => {
    setRegisterDefaultTrack(trackId);
    setIsRegisterOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 0. Authentic NIRVAN Preloader (000 -> 100 with 3D cycling assets) */}
      <Preloader onComplete={() => setIsPreloaderComplete(true)} />

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenRegister={() => handleOpenRegister()}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Main Experience Flow */}
      <main className="w-full flex flex-col">
        {currentView === 'landing' ? (
          <>
            {/* Page 1: Landing Page */}
            {/* 1. Hero with NIRVAN vector typography, Hinglish punchline, and dynamic foam canvas */}
            <NothinLandingHero
              isLoaded={isPreloaderComplete}
              onOpenRegister={() => handleOpenRegister()}
              onExploreEvents={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Hero Section 2-Slide Narrative Carousel ("Who We Are" / "What We Are Doing") */}
            <HeroCarousel />

            {/* 3. 360° Circular Orbital Constellation Gallery with Modal-to-Page Action Bridge */}
            <CircularFeaturesGallery
              onSelectTrackForNewspaper={handleSelectTrackForNewspaper}
              onOpenRegister={handleOpenRegister}
            />

            {/* 4. How It Works: 3-step structured participant flow (01 -> 02 -> 03) */}
            <HowItWorks onOpenRegister={() => handleOpenRegister()} />

            {/* 5. Corporate Sponsors & Campus Alliances Logo Grid */}
            <SponsorsStrip />

            {/* 6. Social Proof & Testimonials Gallery */}
            <TestimonialsGallery />

            {/* 7. FAQ Accordion */}
            <FAQSection />

            {/* 8. Pre-Footer Banner, Newsletter & 4-Column Directory */}
            <Footer
              onOpenRegister={() => handleOpenRegister()}
              onNavigateNewspaper={() => handleNavigate('newspaper')}
            />
          </>
        ) : (
          /* Page 2: Dedicated Event Page (Newspaper Editorial Style) */
          <NewspaperEventPage
            initialTrack={selectedTrackForNewspaper}
            onBackToLanding={() => handleNavigate('landing', 'features')}
            onOpenRegister={handleOpenRegister}
          />
        )}
      </main>

      {/* Interactive AI Assistant Slide-Out Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onSelectTrack={() => {
          setIsAIOpen(false);
          handleNavigate('newspaper');
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
    </div>
  );
}

export default App;
