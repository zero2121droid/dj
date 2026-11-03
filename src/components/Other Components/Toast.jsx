import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoCheckmark, IoClose } from "react-icons/io5";

// Confirmation in the site's style: black card, red rule, slides up from the bottom.
const Toast = ({ message, detail, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    // Outer layer centers; motion's transform on the card would override a translate-x class
    <div className="fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 pointer-events-none">
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="pointer-events-auto relative w-full max-w-md bg-black border border-white/15 border-l-4 border-l-brand shadow-2xl flex items-start gap-3 p-4"
    >
      <span className="w-8 h-8 shrink-0 grid place-items-center bg-brand text-lg">
        <IoCheckmark />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-bold uppercase tracking-wider text-sm">{message}</p>
        {detail && <p className="text-xs text-white/60 mt-1">{detail}</p>}
      </div>
      <button onClick={onClose} aria-label="Zatvori" className="p-1 text-white/50 hover:text-white">
        <IoClose />
      </button>
      <motion.span
        className="absolute left-0 bottom-0 h-0.5 bg-brand"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
    </div>
  );
};

export default Toast;
