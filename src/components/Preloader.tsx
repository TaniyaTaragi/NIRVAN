import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const PRELOADER_IMAGES = [
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a7084cbb4dfa4268c289f_smiley.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a708485f3984771b5bfc0_sac-plastic.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a708485f3984771b5bfd6_chien.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a7084f7d5b72a2a90fb9f_piniata.webp',
  'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a70847eeb828c7456d387_cube.webp',
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 1000);
          }, 400);
          return 100;
        }

        let increment = 1;
        if (prev < 30) {
          increment = Math.floor(Math.random() * 2) + 1;
        } else if (prev < 70) {
          increment = Math.floor(Math.random() * 3) + 2;
        } else if (prev < 90) {
          increment = Math.floor(Math.random() * 2) + 1;
        } else {
          increment = 1;
        }

        return Math.min(100, prev + increment);
      });

      setCurrentImageIdx((prev) => (prev + 1) % PRELOADER_IMAGES.length);
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100000] bg-[#000000] text-white flex flex-col justify-between items-center py-12 px-6 select-none"
        >
          {/* Top Meta */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest pt-2 text-center"
          >
            NIRVAN 2026 // NATIONAL HACKATHON &amp; WEBATHON
          </motion.div>

          {/* Center Morphing Logo & Cycling 3D Objects */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 my-auto">
            <span className="font-extrabold text-7xl sm:text-9xl md:text-[140px] tracking-tighter text-white">
              N
            </span>

            <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 relative flex items-center justify-center">
              <motion.img
                key={currentImageIdx}
                initial={{ scale: 0.85, opacity: 0.4, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.1, opacity: 0, rotate: 10 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                src={PRELOADER_IMAGES[currentImageIdx]}
                alt="3D object"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(255,255,255,0.18)] select-none pointer-events-none"
              />
            </div>

            <span className="font-extrabold text-7xl sm:text-9xl md:text-[140px] tracking-tighter text-white">
              '
            </span>
          </div>

          {/* Bottom Numeric Counter (000 -> 100) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono-code text-sm sm:text-base font-semibold tracking-widest text-zinc-400 pb-2 flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{progress.toString().padStart(3, '0')}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
