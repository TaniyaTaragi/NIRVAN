import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Terminal, Code2, Users, Flame, Award } from 'lucide-react';

interface SlideData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  actionLink: string;
  highlights: {
    icon: typeof Terminal;
    title: string;
    description: string;
  }[];
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'who-we-are',
    badge: '01 // IDENTITY & PHILOSOPHY',
    title: 'Who We Are',
    subtitle: 'India’s Premier Innovation Crucible for Builders & Hackers',
    description:
      'NIRVAN is a multi-disciplinary technology ecosystem born out of raw developer passion. We unite software architects, AI researchers, hardware engineers, and UI/UX designers to push the boundaries of what is possible in 48 hours.',
    actionText: 'EXPLORE OUR MANIFESTO',
    actionLink: '#features',
    highlights: [
      {
        icon: Users,
        title: 'Open To All Builders',
        description: 'Undergrads, postgrads, self-taught coders, and high school prodigies welcome.',
      },
      {
        icon: Flame,
        title: 'Zero Corporate Slop',
        description: 'Real problem statements backed by leading Web3, AI, and fintech protocols.',
      },
      {
        icon: Code2,
        title: 'Fluid Collaboration',
        description: 'Smart matchmaking algorithms to help solo builders find complementary teammates.',
      },
    ],
  },
  {
    id: 'what-we-do',
    badge: '02 // MISSION & EXECUTION',
    title: 'What We Are Doing',
    subtitle: '48-Hour High-Stakes Build Sprint with ₹5L+ in Grants & Prizes',
    description:
      'We are engineering an adrenaline-fueled platform where teams conceive, prototype, test, and ship complete products. Backed by industry mentors, top-tier venture capitalists, and open-source bounties.',
    actionText: 'VIEW EVENT SCHEDULE',
    actionLink: '#how-it-works',
    highlights: [
      {
        icon: Award,
        title: '₹5,00,000+ Prize Pool',
        description: 'Cash rewards, track bounties, cloud credits, and direct incubator fast-tracks.',
      },
      {
        icon: Terminal,
        title: 'Tier-1 Mentorship',
        description: '1-on-1 office hours with staff engineers from Google, Polygon, Intel & Vercel.',
      },
      {
        icon: Sparkles,
        title: 'Live Pitch & Demo Day',
        description: 'Pitch to an esteemed jury panel with instant feedback and investment interest.',
      },
    ],
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              DISCOVER NIRVAN // PERSPECTIVE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Perspective &amp; Mission
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Slide Index Dots */}
            <div className="flex items-center gap-2 mr-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
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
        <div className="relative border border-zinc-800 bg-[#080808] p-8 sm:p-14 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Headline & Manifesto Copy */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[11px] font-mono-code text-zinc-400 uppercase tracking-widest mb-6">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>{slide.badge}</span>
                </div>

                <h3 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
                  {slide.title}
                </h3>

                <h4 className="text-base sm:text-lg font-semibold text-zinc-300 mb-6">
                  {slide.subtitle}
                </h4>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-xl">
                  {slide.description}
                </p>

                <a
                  href={slide.actionLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  <span>{slide.actionText}</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Right Column: Key Feature Highlights Bento */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {slide.highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="p-5 border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 flex items-start gap-4"
                    >
                      <div className="p-2.5 bg-black border border-zinc-800 text-white shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
