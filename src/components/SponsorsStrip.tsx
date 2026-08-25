import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Users } from 'lucide-react';

const SPONSOR_TIERS = [
  {
    tier: 'TITLE SPONSOR',
    color: 'text-amber-400',
    borderColor: 'hover:border-amber-400/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    badgeBg: 'bg-amber-400/10 border-amber-400/20 text-amber-300',
    icon: Sparkles,
    sponsors: ['TechCorp', 'Zeopto'],
    tagline: 'Lead Computing & Infrastructure Partner',
  },
  {
    tier: 'GOLD SPONSORS',
    color: 'text-blue-400',
    borderColor: 'hover:border-blue-400/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    badgeBg: 'bg-blue-400/10 border-blue-400/20 text-blue-300',
    icon: Award,
    sponsors: ['DevLabs', 'CloudNova', '.xyz', 'lovable.Ai', 'HackNest'],
    tagline: 'Track Bounties, Cloud Credits & Platform Grants',
  },
  {
    tier: 'COMMUNITY PARTNERS',
    color: 'text-purple-400',
    borderColor: 'hover:border-purple-400/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    badgeBg: 'bg-purple-400/10 border-purple-400/20 text-purple-300',
    icon: Users,
    sponsors: ['GitHub Community', 'GDG'],
    tagline: 'Ecosystem Alliances & Developer Chapters',
  },
];

export const SponsorsStrip: React.FC = () => {
  return (
    <section className="relative w-full py-24 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 pb-6 border-b border-zinc-900 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              SPONSOR WALL
            </h2>
          </div>
          <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
            BACKED BY INDUSTRY LEADERS &bull; ₹10L+ GRANTS
          </div>
        </div>

        {/* 3 Tier Divs with Rich Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPONSOR_TIERS.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative p-8 sm:p-10 rounded-2xl bg-[#0a0a0c] border border-zinc-800 transition-all duration-300 flex flex-col justify-between ${tier.borderColor} ${tier.glowColor} cursor-pointer shadow-xl`}
              >
                <div>
                  {/* Tier Header Badge */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/80">
                    <span className={`text-xs font-mono-code font-bold tracking-widest uppercase ${tier.color}`}>
                      {tier.tier}
                    </span>
                    <div className={`p-2 rounded-lg border ${tier.badgeBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Sponsor Names List */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 mb-6">
                    {tier.sponsors.map((sp, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <span className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-100 transition-colors">
                          {sp}
                        </span>
                        {sIdx < tier.sponsors.length - 1 && (
                          <span className="text-zinc-600 font-bold">&bull;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Footer Tagline */}
                <div className="pt-4 border-t border-zinc-800/60 text-xs font-mono-code text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {tier.tagline}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
