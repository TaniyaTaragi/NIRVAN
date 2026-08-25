import React, { useState, useEffect } from 'react';
import { Bot, Newspaper, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'newspaper';
  onNavigate: (view: 'landing' | 'newspaper', sectionId?: string) => void;
  onOpenAI: () => void;
  onOpenRegister: () => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAI,
  onOpenRegister,
  onOpenDemo,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightHero = currentView === 'landing' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
          : isLightHero
          ? 'bg-black/85 backdrop-blur-md border-b border-black/10 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Left: Brand Logo / Name */}
        <button
          onClick={() => onNavigate('landing', 'home')}
          className="flex items-center gap-3 cursor-pointer group text-left"
        >
          <div className="w-8 h-8 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-sm tracking-tighter group-hover:scale-105 transition-transform shadow-md">
            N
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block leading-none">
              NIRVAN
            </span>
            <span className="text-[9px] font-mono-code text-zinc-400 uppercase tracking-widest block">
              WEBATHON 2026
            </span>
          </div>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-mono-code uppercase tracking-wider text-zinc-300">
          <button
            onClick={() => onNavigate('landing', 'home')}
            className={`hover:text-white transition-colors cursor-pointer ${
              currentView === 'landing' ? 'text-white font-bold' : ''
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => onNavigate('landing', 'features')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            FEATURES
          </button>
          <button
            onClick={() => onNavigate('landing', 'how-it-works')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            HOW IT WORKS
          </button>
          <button
            onClick={() => onNavigate('landing', 'testimonials')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            VOICES
          </button>
          <button
            onClick={() => onNavigate('landing', 'faq')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('landing', 'contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            CONTACT
          </button>

          {/* AI Assistant Navigation Item */}
          <button
            onClick={onOpenAI}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15"
          >
            <Bot className="w-3.5 h-3.5 text-white" />
            <span>AI ASSISTANT</span>
          </button>

          {/* Newspaper View Switcher */}
          <button
            onClick={() => onNavigate(currentView === 'landing' ? 'newspaper' : 'landing')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer border ${
              currentView === 'newspaper'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>{currentView === 'newspaper' ? 'LANDING VIEW' : 'NEWSPAPER EDITORIAL'}</span>
          </button>
        </nav>

        {/* Right Actions: Demo (Optional) & Register Now CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenDemo}
            className="px-4 py-2 rounded-full border border-white/30 text-xs font-mono-code uppercase tracking-wider text-zinc-200 hover:text-white hover:border-white transition-all cursor-pointer"
          >
            DEMO
          </button>

          <button
            onClick={onOpenRegister}
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenRegister}
            className="px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-mono-code font-bold uppercase tracking-wider"
          >
            REGISTER
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white border border-white/20 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-black/95 border-b border-white/15 px-6 py-6 flex flex-col gap-4 text-xs font-mono-code uppercase tracking-wider text-zinc-300">
          <button
            onClick={() => {
              onNavigate('landing', 'home');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('landing', 'features');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-white"
          >
            Features &amp; Tracks
          </button>
          <button
            onClick={() => {
              onNavigate('landing', 'how-it-works');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-white"
          >
            How it Works
          </button>
          <button
            onClick={() => {
              onNavigate('landing', 'testimonials');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-white"
          >
            Testimonials
          </button>
          <button
            onClick={() => {
              onNavigate('landing', 'faq');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 hover:text-white"
          >
            FAQ
          </button>
          <button
            onClick={() => {
              onOpenAI();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-white font-bold flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            AI Assistant
          </button>
          <button
            onClick={() => {
              onNavigate(currentView === 'landing' ? 'newspaper' : 'landing');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-white font-bold flex items-center gap-2"
          >
            <Newspaper className="w-4 h-4" />
            {currentView === 'newspaper' ? 'Switch to Landing' : 'Newspaper Edition'}
          </button>
          <button
            onClick={() => {
              onOpenDemo();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-zinc-400"
          >
            Watch Demo
          </button>
        </div>
      )}
    </header>
  );
};
