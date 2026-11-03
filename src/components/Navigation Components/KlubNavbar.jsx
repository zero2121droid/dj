import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoPause, IoPlay, IoPlaySkipForward } from 'react-icons/io5';
import logo from '../../assets/Logo beli.png';
import { CONTACT, PAGES } from '../../data/site';
import { formatTime, usePlayer } from '../Player/PlayerContext';

const NavPlayer = () => {
  const { mix, open, playing, time, duration, toggle, next } = usePlayer();
  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div className="hidden xl:flex items-center gap-3 ml-6 w-[18rem] 2xl:w-[22rem] min-w-0 p-1.5 pr-2 border border-white/15 bg-black/55 backdrop-blur-md">
      <button
        onClick={toggle}
        aria-label={playing ? 'Pauziraj' : 'Pusti mix'}
        className="w-11 h-11 shrink-0 grid place-items-center bg-brand hover:bg-brand-hi transition-colors text-lg"
      >
        {playing ? <IoPause /> : <IoPlay />}
      </button>
      <div className="flex items-end gap-0.5 h-3.5 shrink-0" aria-hidden="true">
        {[0, -0.2, -0.1, -0.3].map((delay) => (
          <span
            key={delay}
            className="eq-bar !w-[3px]"
            style={{ animationDelay: `${delay}s`, animationPlayState: playing ? 'running' : 'paused' }}
          />
        ))}
      </div>
      <div className="flex-1 min-w-0 leading-tight">
        <p className="truncate text-sm font-bold uppercase">{mix.title}</p>
        <p className="text-[0.7rem] tracking-wider text-white/60">
          {playing ? 'SADA SVIRA' : open ? 'PAUZIRANO' : 'NAJNOVIJI MIX'}
          {open && ` · ${formatTime(time)}`}
        </p>
        <div className="h-0.5 mt-1 bg-white/20">
          <div className="h-full bg-brand transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <button onClick={next} aria-label="Sledeći mix" className="p-1 text-white/60 hover:text-white">
        <IoPlaySkipForward />
      </button>
    </div>
  );
};

const KlubNavbar = () => {
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { pathname } = useLocation();
  const { playing, toggle } = usePlayer();

  // Shrink after the hero, hide while scrolling down, come back on any scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY.current) > 4) {
        setHidden(y > 140 && y > lastY.current);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setDrawer(false), [pathname]);

  const linkClass = ({ isActive }) =>
    `relative py-1.5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand after:origin-left after:transition-transform ${
      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 flex items-center px-4 md:px-6 transition-all duration-300 ${
          scrolled ? 'h-16 md:h-20 bg-black/90' : 'h-20 md:h-28 bg-transparent'
        } ${hidden && !drawer ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <Link to="/" aria-label="Početna">
          <img
            src={logo}
            alt="Jorgačević DJ"
            className={`transition-all duration-300 ${scrolled ? 'w-32 md:w-40' : 'w-36 md:w-52'}`}
          />
        </Link>
        <NavPlayer />
        <span className="flex-1" />
        <nav className="hidden md:flex shrink-0 gap-5 lg:gap-7 2xl:gap-8 text-sm 2xl:text-base font-bold uppercase tracking-widest whitespace-nowrap">
          {PAGES.map((p) => (
            <NavLink key={p.path} to={p.path} end className={linkClass}>
              {p.name}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={toggle}
          aria-label={playing ? 'Pauziraj mix' : 'Pusti mix'}
          className="xl:hidden shrink-0 w-10 h-10 ml-4 md:ml-6 grid place-items-center bg-brand"
        >
          {playing ? <IoPause /> : <IoPlay />}
        </button>
        <button
          onClick={() => setDrawer(true)}
          aria-label="Otvori meni"
          className="md:hidden ml-3 p-2 flex flex-col gap-1.5"
        >
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </header>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.nav
              className="fixed inset-y-0 left-0 z-[56] w-[78%] max-w-sm bg-black border-r-4 border-brand flex flex-col justify-center gap-2 px-8"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: [0.7, 0, 0.2, 1], duration: 0.5 }}
            >
              <img src={logo} alt="" className="absolute top-6 left-8 w-28" />
              <button
                onClick={() => setDrawer(false)}
                className="absolute top-6 right-6 border border-white px-3 py-1.5 text-xs font-bold tracking-widest"
              >
                ZATVORI ✕
              </button>
              {PAGES.map((p, i) => (
                <motion.div
                  key={p.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <NavLink
                    to={p.path}
                    end
                    className={({ isActive }) =>
                      `font-display text-5xl uppercase leading-tight ${isActive ? 'text-brand' : 'text-white'}`
                    }
                  >
                    {p.name}
                  </NavLink>
                </motion.div>
              ))}
              <div className="absolute bottom-8 left-8 text-xs leading-7 font-bold">
                <span className="text-brand font-normal tracking-widest mr-3">EMAIL</span>{CONTACT.email}<br />
                <span className="text-brand font-normal tracking-widest mr-3">IG</span>@{CONTACT.instagram}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default KlubNavbar;
