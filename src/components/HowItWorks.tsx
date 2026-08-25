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
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-[#050505] text-white border-t border-zinc-900 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20 pb-6 border-b border-zinc-900">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              ROADMAP // PARTICIPANT JOURNEY
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              How It Works
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-sm">
            From squad formation to live demo day in 3 seamless steps.
          </p>
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
                className="relative bg-[#0a0a0a] border border-zinc-800 p-8 sm:p-10 flex flex-col justify-between hover:border-zinc-500 transition-all duration-300 group"
              >
                {/* Connecting Arrow for Step 01 and 02 */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black border border-zinc-700 items-center justify-center text-zinc-400 group-hover:border-white group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                <div>
                  {/* Top Step Counter & Icon */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                    <span className="text-3xl font-mono-code font-black text-white">
                      {item.step}
                    </span>
                    <div className="p-3 bg-zinc-900 border border-zinc-800 text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest mb-2">
                    {item.subtitle}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Micro Points List */}
                <div className="space-y-2 pt-6 border-t border-zinc-900">
                  {item.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-400 font-mono-code">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenRegister}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-2xl cursor-pointer"
          >
            <span>JOIN THE 2026 CRUCIBLE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
