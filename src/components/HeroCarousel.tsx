import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  Code2,
  Users,
  Flame,
  Award,
  Trophy,
  CheckCircle2,
  Zap,
} from 'lucide-react';

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
    id: 'what-is-nirvan',
    badge: '01 // ARCHITECTURE & DEFINITION',
    title: 'What is NIRVAN?',
    subtitle: 'India’s Premier Multi-Disciplinary Technology Crucible',
    description:
      'NIRVAN is a high-velocity innovation ecosystem uniting software architects, AI researchers, hardware engineers, ethical hackers, and product designers. It is not just a hackathon — it is a crucible where bold ideas transform into production-grade systems in 48 hours.',
    actionText: 'EXPLORE OUR MANIFESTO',
    actionLink: '#features',
    highlights: [
      {
        icon: Users,
        title: 'Open To All Builders',
        description: 'Undergrads, postgrads, self-taught coders, and high school prodigies welcome.',
      },
      {
        icon: Code2,
        title: '5 Specialized Arenas',
        description: 'Hackathon, Esports Arena, CTF Cyber Siege, Cryptic Treasure Hunt, and Masterclasses.',
      },
      {
        icon: Sparkles,
        title: 'Decentralized & AI First',
        description: 'Built for real-world architectures from autonomous agents to ZK-protocols.',
      },
    ],
  },
  {
    id: 'why-it-is-organized',
    badge: '02 // PURPOSE & VISION',
    title: 'Why It Is Organized?',
    subtitle: 'Bridging Academia to Production & Eliminating Corporate Slop',
    description:
      'Traditional tech fests focus on theoretical slide decks and generic presentations. NIRVAN was forged to give genuine builders an uncompromising playground: real problem statements, actual codebase judging, live telemetry, and direct VC & grant opportunities.',
    actionText: 'VIEW THE 5 ARENAS',
    actionLink: '#features',
    highlights: [
      {
        icon: Flame,
        title: 'Zero Corporate Slop',
        description: 'High-stakes bounties sponsored by actual Web3, AI, and cloud protocols.',
      },
      {
        icon: Award,
        title: 'Direct Seed & Grant Fast-Tracks',
        description: 'Pitching directly to venture partners, angels, and tier-1 startup incubators.',
      },
      {
        icon: Terminal,
        title: 'Elite Builder Network',
        description: 'Cultivating an electric community where lifelong technical co-founders meet.',
      },
    ],
  },
  {
    id: 'what-to-expect',
    badge: '03 // PARTICIPANT EXPERIENCE',
    title: 'What You Can Expect',
    subtitle: '48 Hours of Pure Building, Mentorship & ₹5,00,000+ in Rewards',
    description:
      'Expect an adrenaline-fueled experience: round-the-clock office hours with staff engineers from Google, Polygon & AWS, competitive LAN gaming tournaments, zero registration fees (₹0), 24/7 catering, Red Bull lounges, and an electric live Demo Day.',
    actionText: 'VIEW EVENT SCHEDULE',
    actionLink: '#how-it-works',
    highlights: [
      {
        icon: Trophy,
        title: '₹5,00,000+ Prize Pool',
        description: 'Cash rewards, arena bounties, $10,000+ cloud credits, and physical trophies.',
      },
      {
        icon: CheckCircle2,
        title: '1-on-1 Staff Mentorship',
        description: 'Continuous architecture reviews and live debugging with senior industry leads.',
      },
      {
        icon: Zap,
        title: 'All-Inclusive Hospitality',
        description: 'Free gourmet meals, midnight snacks, Red Bull fuel stations, and custom swag kits.',
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
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Perspective &amp; Architecture
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Slide Index Tabs / Dots */}
            <div className="flex items-center gap-2 mr-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-mono-code font-bold ${
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
        <div className="relative border border-zinc-800 bg-[#080808] p-8 sm:p-14 overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Headline & Manifesto Copy */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[11px] font-mono-code text-zinc-400 uppercase tracking-widest mb-6">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>{slide.badge}</span>
                </div>

                <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                  {slide.title}
                </h3>

                <h4 className="text-base sm:text-lg font-semibold text-zinc-300 mb-6 leading-snug">
                  {slide.subtitle}
                </h4>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-xl font-normal">
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
                      transition={{ delay: index * 0.1, duration: 0.35 }}
                      className="p-5 border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 flex items-start gap-4 shadow-sm"
                    >
                      <div className="p-2.5 bg-black border border-zinc-800 text-white shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed font-normal">{item.description}</p>
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
