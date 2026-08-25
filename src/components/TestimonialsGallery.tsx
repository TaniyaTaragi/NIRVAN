import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    code: 'REVIEW // 001',
    name: 'Tanya Taragi',
    role: 'Lead Fullstack Engineer & Hackathon Winner',
    collegeOrOrg: 'IIT Delhi & Open Source Fellow',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80',
    quote:
      'NIRVAN provided the most intense and electrifying 48 hours of my developer journey. The live mentorship from Polygon and Google Cloud staff engineers helped us scale our decentralized AI pipeline from 0 to 10k live queries.',
    rating: 5,
  },
  {
    id: '2',
    code: 'REVIEW // 002',
    name: 'Aarav Sharma',
    role: 'AI Systems Researcher',
    collegeOrOrg: 'BITS Pilani & Autonomous Agent Lab',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80',
    quote:
      'The sheer caliber of judges and immediate VC pitch opportunities is unmatched. Winning the AI Synthesis track secured our team $15k in pre-seed funding on the spot.',
    rating: 5,
  },
  {
    id: '3',
    code: 'REVIEW // 003',
    name: 'Priya Patel',
    role: 'Product Designer & Frontend Hacker',
    collegeOrOrg: 'NID Ahmedabad & Web3 Creative Guild',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&q=80',
    quote:
      'The focus on genuine craft, tactile micro-interactions, and accessible engineering makes NIRVAN stand apart from generic college fests. It is where real products get built.',
    rating: 5,
  },
];

export const TestimonialsGallery = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((p) => (p === 0 ? TESTIMONIALS.length - 1 : p - 1));
  };

  const next = () => {
    setCurrent((p) => (p + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Exact Matching Blueprint) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              VOICES // TESTIMONIALS &amp; ALUMNI
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
              What Our Users Say
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400">
              (Real stories from real users who love our platform)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonial Active Card Display */}
        <div className="bg-[#09090b] border border-zinc-800 p-8 sm:p-14 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-6 text-white">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                  <span className="text-xs font-mono-code text-zinc-500 ml-3">{item.code}</span>
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl font-medium text-zinc-200 leading-snug mb-8">
                  "{item.quote}"
                </blockquote>

                {/* Author Info */}
                <div>
                  <h4 className="text-base font-bold text-white mb-0.5">{item.name}</h4>
                  <p className="text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                    {item.role} &bull; <span className="text-zinc-200">{item.collegeOrOrg}</span>
                  </p>
                </div>
              </div>

              {/* Author Photo */}
              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="w-32 h-32 sm:w-44 sm:h-44 bg-zinc-900 border border-zinc-700 overflow-hidden shadow-2xl relative">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="eager"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
