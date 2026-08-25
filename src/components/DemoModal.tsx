import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-[#09090b] border border-white/20 p-8 sm:p-12 relative overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors cursor-pointer z-20"
              aria-label="Close demo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-500 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>SHOWREEL // NIRVAN 2026 EXPERIENCE</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Watch The 48-Hour Crucible In Action
            </h3>

            {/* Video Container */}
            <div className="aspect-[16/9] w-full bg-black border border-zinc-800 overflow-hidden relative group">
              <video
                src="/assets/HackathonVideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-zinc-800 text-xs font-mono-code text-zinc-400">
              <div>
                NIRVAN 2026 &bull; ₹5,00,000+ PRIZE CRUCIBLE &bull; HYBRID EDITION
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                CLOSE DEMO
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
