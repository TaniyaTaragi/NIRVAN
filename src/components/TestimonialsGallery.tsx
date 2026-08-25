import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS_PAGES: TestimonialItem[][] = [
  [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&q=80',
      quote: 'NIRVAN has completely transformed the way we discover and mentor top-tier engineering talent.',
      rating: 5,
    },
    {
      id: '2',
      name: 'David Lee',
      role: 'CTO',
      company: 'DevLabs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80',
      quote: 'The AI insights and automated challenge matrix help us evaluate production-ready code with ease.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Priya Sharma',
      role: 'Operations Head',
      company: 'CloudNova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&q=80',
      quote: 'A must-have platform for teams who want to build, collaborate, and scale smarter and faster.',
      rating: 5,
    },
  ],
  [
    {
      id: '4',
      name: 'Alex Rivera',
      role: 'Lead AI Researcher',
      company: 'Autonomous AI',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&q=80',
      quote: 'The 48-hour crucible format pushed our team to architect verifiable on-chain AI models at scale.',
      rating: 5,
    },
    {
      id: '5',
      name: 'Ananya Roy',
      role: 'Smart Contract Auditor',
      company: 'Polygon Labs',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&q=80',
      quote: 'The zero-day CTF challenges and live scoreboard telemetry were world-class and deeply engaging.',
      rating: 5,
    },
    {
      id: '6',
      name: 'Marcus Vance',
      role: 'Esports Director',
      company: 'Collegiate LAN',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&fit=crop&q=80',
      quote: 'Zero lag, pristine 240Hz LAN routing, and incredible production value on the grand championship stage.',
      rating: 5,
    },
  ],
];

export const TestimonialsGallery: React.FC = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);

  const currentPage = TESTIMONIALS_PAGES[activePageIndex];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centered matching User Reference */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            What Our Users Say
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-medium">
            Real stories from real users who love our platform.
          </p>
        </div>

        {/* 3-Card Grid Matching 2nd Image Representation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePageIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {currentPage.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="p-8 sm:p-9 rounded-2xl bg-[#0a0a0c] border border-zinc-800/90 hover:border-zinc-500 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer group"
              >
                <div>
                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1.5 mb-6 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-sm sm:text-base font-normal text-zinc-300 leading-relaxed mb-8">
                    "{item.quote}"
                  </blockquote>
                </div>

                {/* Author Profile (Circular Avatar + Name + Role) */}
                <div className="flex items-center gap-3.5 pt-6 border-t border-zinc-800/80">
                  <div className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 shadow-md">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug group-hover:text-zinc-100 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-snug">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Pagination Dots Matching Reference */}
        <div className="flex items-center justify-center gap-2.5">
          {TESTIMONIALS_PAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActivePageIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activePageIndex === idx
                  ? 'w-6 h-2 bg-indigo-500'
                  : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
