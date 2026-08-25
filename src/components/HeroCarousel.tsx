import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  actionLink: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'what-is-nirvan',
    title: 'What is NIRVAN?',
    subtitle: 'India’s Premier Multi-Disciplinary Technology Crucible',
    description:
      'NIRVAN ’26 brings together developers, innovators, designers, and technology enthusiasts for two days of challenges, competitions, workshops, and collaboration. It is a high-velocity innovation ecosystem where bold ideas become working systems.',
    actionText: 'EXPLORE OUR ARENAS',
    actionLink: '#features',
  },
  {
    id: 'why-it-is-organized',
    title: 'Why It Is Organized?',
    subtitle: 'Bridging Academia to Production & Eliminating Corporate Slop',
    description:
      'Traditional tech fests focus on theoretical slide decks and generic presentations. NIRVAN was forged to give genuine builders an uncompromising playground: real problem statements, actual codebase judging, live telemetry, and direct VC & grant opportunities.',
    actionText: 'VIEW THE 5 TRACKS',
    actionLink: '#features',
  },
  {
    id: 'what-to-expect',
    title: 'What You Can Expect',
    subtitle: '48 Hours of Pure Building, Mentorship & ₹5,00,000+ in Rewards',
    description:
      'Expect an adrenaline-fueled experience: round-the-clock office hours with staff engineers from Google, Polygon & AWS, competitive LAN gaming tournaments, zero registration fees (₹0), 24/7 catering, Red Bull lounges, and an electric live Demo Day.',
    actionText: 'VIEW EVENT SCHEDULE',
    actionLink: '#how-it-works',
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="carousel-hero"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Top Header & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-800/80">
          <div>
            <p className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-3">01 // ABOUT THE FEST</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              About NIRVAN
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Slide Index Tabs */}
            <div className="flex items-center gap-2 mr-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-mono-code font-bold ${
                    currentSlide === idx
                      ? 'w-10 bg-white text-black'
                      : 'w-6 bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Narrative Slide Deck */}
        <div className="hero-carousel-panel relative border border-zinc-800 bg-[#080808] p-8 sm:p-16 md:p-20 overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                {slide.title}
              </h3>

              <h4 className="text-lg sm:text-2xl font-semibold text-zinc-300 mb-6 leading-snug">
                {slide.subtitle}
              </h4>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 font-normal max-w-3xl">
                {slide.description}
              </p>

              <a
                href={slide.actionLink}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <span>{slide.actionText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
