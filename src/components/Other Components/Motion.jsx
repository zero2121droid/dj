import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { PAGES } from '../../data/site';
import logo from '../../assets/Logo beli.png';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Section slides up and un-clips when it scrolls into view. It starts faint, never invisible.
export const Reveal = ({ children, className = '', as: Tag = 'section' }) => {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
        inView ? 'opacity-100 translate-y-0 [clip-path:inset(0)]' : 'opacity-20 translate-y-10 [clip-path:inset(0_0_30%_0)] motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:[clip-path:none]'
      } ${className}`}
    >
      {children}
    </Tag>
  );
};

// The intro stays up until the visitor clicks in. Anything that should wait for it
// (the hero name scramble) subscribes here instead of guessing a delay.
let introOpen = !reducedMotion();
const introListeners = new Set();
const finishIntro = () => {
  introOpen = false;
  introListeners.forEach((fn) => fn());
  introListeners.clear();
};

// Letters shuffle before settling on the real text; replays on hover.
export const Scramble = ({ text, delay = 0 }) => {
  const [shown, setShown] = useState(text);
  const timer = useRef(null);

  const run = () => {
    if (reducedMotion()) return;
    const chars = 'ABCDĆEFGHIJKLMNOPRSŠTUVZŽ#%&';
    let i = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setShown([...text].map((c, k) => (k < i ? c : chars[Math.floor(Math.random() * chars.length)])).join(''));
      i += 0.5;
      if (i > text.length) {
        clearInterval(timer.current);
        setShown(text);
      }
    }, 40);
  };

  useEffect(() => {
    let t;
    const start = () => { t = setTimeout(run, delay); };
    if (introOpen) introListeners.add(start);
    else start();
    return () => {
      introListeners.delete(start);
      clearTimeout(t);
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay]);

  return (
    <span className="block" onMouseEnter={run} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
};

// Loader on every visit: counts to 128 BPM, holds a beat, then lifts away.
export const Intro = () => {
  const [show, setShow] = useState(introOpen);
  const [bpm, setBpm] = useState(0);
  const ready = bpm >= 128;

  useEffect(() => {
    if (!show) return undefined;
    document.body.style.overflow = 'hidden';
    let v = 0;
    const count = setInterval(() => {
      v += 2;
      setBpm(Math.min(v, 128));
      if (v >= 128) clearInterval(count);
    }, 22);
    const done = setTimeout(() => setShow(false), 2000);
    return () => {
      clearInterval(count);
      clearTimeout(done);
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <AnimatePresence onExitComplete={finishIntro}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col justify-end gap-6 p-6 md:p-12"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
        >
          <img src={logo} alt="Jorgačević DJ" className="absolute top-6 left-6 md:top-10 md:left-12 w-36 md:w-52" />
          <div>
            <small className="text-xs md:text-sm tracking-[.2em] text-brand">
              {ready ? 'SET JE SPREMAN' : 'UČITAVANJE SETA'}
            </small>
            <div className="font-display text-[clamp(5rem,16vw,14rem)] leading-[.85] tabular-nums">
              {String(bpm).padStart(3, '0')} <span className={ready ? 'text-brand' : ''}>BPM</span>
            </div>
            <div className="h-1 mt-4 bg-white/15 max-w-3xl">
              <div className="h-full bg-brand" style={{ width: `${(bpm / 128) * 100}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Red curtain carrying the new page's name, wiping off the screen after a route change.
export const PageWipe = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [key, setKey] = useState(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!reducedMotion()) setKey(pathname);
  }, [pathname]);

  const name = PAGES.find((p) => p.path === key)?.name ?? '';

  return (
    <AnimatePresence>
      {key && (
        <motion.div
          key={key}
          className="fixed inset-0 z-[90] bg-brand text-black grid place-items-center font-display uppercase text-[clamp(3rem,10vw,8rem)] pointer-events-none"
          initial={{ x: 0 }}
          animate={{ x: '101%' }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.7, 0, 0.3, 1] }}
          onAnimationComplete={() => setKey(null)}
        >
          {name}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Shared header for inner pages: photo, red rule, solid line + hollow line.
export const PageHero = ({ image, eyebrow, title, outline, position = 'center 25%' }) => (
  <section className="relative min-h-[22rem] md:min-h-[30rem] flex items-end overflow-hidden">
    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: position }} />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black" />
    <div className="relative z-10 mb-8 ml-4 md:ml-8 pl-4 md:pl-5 border-l-[6px] border-brand">
      <p className="text-xs font-bold tracking-[.18em] uppercase text-brand mb-2">{eyebrow}</p>
      <h1 className="font-display uppercase leading-[.95] text-[clamp(3.5rem,9vw,9rem)] [text-shadow:0_4px_40px_rgba(0,0,0,.6)]">
        {title}
        {/* Solid red second line: hollow type got lost on photos, and the extra top margin keeps accents (Ž, Ć) off the line above */}
        <span className="block text-brand mt-[0.06em]">{outline}</span>
      </h1>
    </div>
  </section>
);
