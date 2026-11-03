import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { IoArrowUp } from 'react-icons/io5';

// Bottom-left (the mix player owns bottom-right). The red ring fills as the page is read.
const BackToTop = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useEffect(() => scrollY.on('change', (y) => setShow(y > 400)), [scrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Na vrh strane"
          className="group fixed bottom-4 left-4 z-50 w-14 h-14 grid place-items-center rounded-full bg-black/80 backdrop-blur"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="28" cy="28" r="25" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
            <motion.circle cx="28" cy="28" r="25" fill="none" stroke="#bd2025" strokeWidth="3" style={{ pathLength: ring }} />
          </svg>
          <IoArrowUp className="relative text-xl transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
