import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: '1',
    category: 'ELIGIBILITY',
    question: 'Who is eligible to participate in NIRVAN 2026?',
    answer:
      'NIRVAN is open to all enrolled college undergraduate & postgraduate students, self-taught developers, and high school innovators globally. Both solo hackers and squads of 2-4 members can register for free.',
  },
  {
    id: '2',
    category: 'REGISTRATION & FEES',
    question: 'Is there any registration or participation fee?',
    answer:
      'No. Participation in NIRVAN 2026 is completely free (₹0). All shortlisted participants receive free cloud compute credits, access to all workshops, 24/7 food, red bull, and exclusive swag kits.',
  },
  {
    id: '3',
    category: 'TEAM FORMATION',
    question: 'What if I don’t have a team before registering?',
    answer:
      'You can register as a solo hacker! Once registered, you will gain access to the NIRVAN Discord Matchmaking Lounge and our AI Teammate Finder to connect with complementary engineers, designers, and domain experts.',
  },
  {
    id: '4',
    category: 'PROJECT GUIDELINES',
    question: 'Can we build upon a pre-existing project or codebase?',
    answer:
      'No. All code and prototypes must be initiated after the official opening keynote and theme reveal. You may leverage open-source libraries, APIs, and frameworks, but all core product logic must be authored during the 48-hour sprint.',
  },
  {
    id: '5',
    category: 'PRIZES & FUNDING',
    question: 'How are prizes, grants, and fast-track interviews distributed?',
    answer:
      'Prizes totaling ₹5,00,000+ are distributed across Track Winners, Overall Champions, Best Beginner Hack, and Sponsor Bounties (Google Cloud, Polygon, Intel). Top 5 teams receive direct fast-track interviews with venture partner incubators.',
  },
  {
    id: '6',
    category: 'HARDWARE & VENUE',
    question: 'Are hardware kits available for Robotics & IoT tracks?',
    answer:
      'Yes. For shortlisted teams in the Autonomous Robotics & Embedded IoT track, development boards (ESP32, Raspberry Pi, sensor kits) and testing arenas will be provided on-site.',
  },
];

export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>INQUIRIES // ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm font-mono-code text-zinc-400">
            ANSWERS TO COMMON QUESTIONS REGARDING ELIGIBILITY, RULES, TEAMS &amp; AWARDS.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-b border-zinc-800/90 pb-4 transition-colors"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 flex items-center justify-between text-left gap-4 hover:text-zinc-300 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-code text-zinc-500">
                      [{faq.category}]
                    </span>
                    <span className="text-base sm:text-xl font-bold text-white group-hover:text-zinc-200">
                      {faq.question}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-white group-hover:text-white shrink-0 transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed pt-2 pb-4 pr-12 font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
