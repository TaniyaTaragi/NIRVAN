import { motion } from 'framer-motion';
import { Users, Code, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Assemble Squad & Register',
    subtitle: 'FREE REGISTRATION & MATCHMAKING',
    description:
      'Form a team of 2-4 builders or register solo to get matched with complementary engineers and designers via our Discord hub.',
    points: ['₹0 Registration fee', 'Solo & squad entries accepted', 'Hardware tracks kit access'],
    icon: Users,
  },
  {
    step: '02',
    title: '48-Hour Hack & Mentorship',
    subtitle: 'SUB-MILLISECOND BUILDS & TIER-1 REVIEWS',
    description:
      'Hack live over 48 hours with continuous milestone reviews, 1-on-1 office hours with staff engineers, and round-the-clock coffee & red bull.',
    points: ['Live keynote & theme reveal', 'Midnight snack & gaming break', 'Cloud compute & GPU bounties'],
    icon: Code,
  },
  {
    step: '03',
    title: 'Pitch, Win & Get Funded',
    subtitle: 'DEMO DAY & INCUBATOR FAST-TRACK',
    description:
      'Present your working prototype directly to an esteemed jury of VCs, founders, and tech leads. Compete for ₹5,00,000+ in cash and grants.',
    points: ['5-Minute pitch + 2-min Q&A', '₹5L+ Cash & track bounties', 'Direct VC seed fast-tracks'],
    icon: Trophy,
  },
];

export const HowItWorks = ({ onOpenRegister }: { onOpenRegister: () => void }) => {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#050505] text-white border-t border-zinc-900 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-zinc-900">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
        </div>

        {/* 3-Step Milestone Connected Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="how-it-works-card relative bg-[#0a0a0a] border border-zinc-800 p-8 sm:p-10 flex flex-col justify-between hover:border-zinc-500 transition-all duration-300 group"
              >
                {/* Connecting Arrow for Step 01 and 02 */}
                {index < 2 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 items-center justify-center text-zinc-400 group-hover:border-white group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80">
                    <span className="font-mono-code text-4xl font-black text-white/40 group-hover:text-white transition-colors tracking-tighter">
                      {item.step}
                    </span>
                    <div className="p-3 bg-zinc-900 border border-zinc-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title & Subtitle */}
                  <div className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest mb-1.5">
                    {item.subtitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Key Bullet Points */}
                <div className="pt-4 border-t border-zinc-800/60 space-y-2">
                  {item.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono-code text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Registrations Now Open Globally
              </h4>
              <p className="text-xs font-mono-code text-zinc-400">
                ₹0 entry fee &bull; 100% free participation with food &amp; cloud grants
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <span>JOIN NIRVAN 2026</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
