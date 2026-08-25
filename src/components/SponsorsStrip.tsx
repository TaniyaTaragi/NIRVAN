import { motion } from 'framer-motion';

const SPONSORS = [
  { name: 'GOOGLE CLOUD', tier: 'TITLE PARTNER', category: 'COMPUTE & AI' },
  { name: 'GITHUB', tier: 'PLATINUM', category: 'DEV TOOLS' },
  { name: 'POLYGON', tier: 'PLATINUM', category: 'WEB3 PROTOCOL' },
  { name: 'DEVFOLIO', tier: 'COMMUNITY', category: 'HACKATHON PLATFORM' },
  { name: 'INTEL', tier: 'GOLD', category: 'HARDWARE & EDGE' },
  { name: 'AWS', tier: 'GOLD', category: 'CLOUD INFRA' },
  { name: 'VERCEL', tier: 'SILVER', category: 'FRONTEND PLATFORM' },
  { name: 'RED BULL', tier: 'ENERGY PARTNER', category: 'FUEL & LOUNGE' },
];

export const SponsorsStrip = () => {
  return (
    <section className="relative w-full py-16 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-zinc-900">
          <div className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-500">
            ECOSYSTEM // CORPORATE SPONSORS &amp; CAMPUS ALLIANCES
          </div>
          <div className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-400">
            ₹10L+ TOTAL SPONSORSHIP GRANTS
          </div>
        </div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SPONSORS.map((sp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 bg-[#09090b] border border-zinc-800/80 hover:border-zinc-500 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="text-[9px] font-mono-code text-zinc-500 uppercase tracking-wider mb-3">
                {sp.tier} &bull; {sp.category}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                {sp.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
