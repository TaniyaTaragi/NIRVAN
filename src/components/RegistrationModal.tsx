import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENT_TRACKS } from './CircularFeaturesGallery';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrackId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultTrackId,
}) => {
  const [teamName, setTeamName] = useState('');
  const [leadName, setLeadName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(defaultTrackId || EVENT_TRACKS[0].id);
  const [teamSize, setTeamSize] = useState('4');
  const [githubUrl, setGithubUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#a1a1aa', '#52525b', '#e4e4e7'],
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 sm:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0a0a0c] border border-white/20 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors cursor-pointer z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-500 uppercase tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>REGISTRATION // FREE ENTRY (₹0)</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Register for NIRVAN 2026
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-8 font-mono-code">
                  Join India’s top builders for a 48-hour high-stakes crucible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1.5">
                        Team Name / Squad *
                      </label>
                      <input
                        type="text"
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. NeuralVanguard"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white font-mono-code"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1.5">
                        Team Lead Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g. Tanya Taragi"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white font-mono-code"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1.5">
                        Lead Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="lead@developer.org"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white font-mono-code"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1.5">
                        College / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. IIT Delhi"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white font-mono-code"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1.5">
                        Preferred Track *
                      </label>
                      <select
                        value={selectedTrack}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono-code"
                      >
                        {EVENT_TRACKS.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.code} - {t.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1.5">
                        Team Size
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono-code"
                      >
                        <option value="1">1 Member (Solo)</option>
                        <option value="2">2 Members</option>
                        <option value="3">3 Members</option>
                        <option value="4">4 Members (Full Squad)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-code text-zinc-400 uppercase mb-1.5">
                      GitHub or Portfolio URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white font-mono-code"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-2xl cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>CONFIRM &amp; COMPLETE REGISTRATION</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center mb-6 shadow-2xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                  Registration Confirmed!
                </h3>
                <p className="text-sm font-mono-code text-zinc-300 mb-6 max-w-md mx-auto">
                  Team <strong className="text-white">"{teamName}"</strong> has been successfully registered for NIRVAN 2026.
                </p>
                <div className="p-4 bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-400 mb-8 max-w-md mx-auto">
                  Confirmation credentials and Discord Lounge invites sent to <strong className="text-white">{email}</strong>.
                </div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  RETURN TO DASHBOARD
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
