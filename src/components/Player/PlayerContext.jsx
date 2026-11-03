import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { IoClose, IoPause, IoPlay, IoPlaySkipForward } from 'react-icons/io5';
import { MIXES } from '../../data/site';

// One YouTube player for the whole site. It lives outside <Routes>, so a mix keeps
// playing while the visitor moves between pages. YouTube requires the player to stay
// visible (at least 200x200), so it shows as a small window in the corner.
const PlayerContext = createContext(null);

export const usePlayer = () => useContext(PlayerContext);

export const formatTime = (s) => {
  const t = Math.max(0, Math.floor(s || 0));
  const h = Math.floor(t / 3600);
  const m = String(Math.floor((t % 3600) / 60)).padStart(h ? 2 : 1, '0');
  return `${h ? `${h}:` : ''}${m}:${String(t % 60).padStart(2, '0')}`;
};

export const PlayerProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // YouTube refuses some embeds (owner settings, music rights, some phones): show a way out instead
  const [blocked, setBlocked] = useState(false);
  const player = useRef(null);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setInterval(() => {
      if (!player.current) return;
      setTime(player.current.getCurrentTime());
      setDuration(player.current.getDuration());
    }, 500);
    return () => clearInterval(timer);
  }, [playing]);

  const playMix = useCallback((i) => {
    setTime(0);
    setBlocked(false);
    setIndex(i);
    setOpen(true);
    if (i === index && player.current) player.current.playVideo();
  }, [index]);

  const toggle = useCallback(() => {
    if (!open) return playMix(index);
    if (!player.current) return undefined;
    return playing ? player.current.pauseVideo() : player.current.playVideo();
  }, [open, playing, index, playMix]);

  const next = useCallback(() => playMix((index + 1) % MIXES.length), [index, playMix]);

  const close = useCallback(() => {
    if (player.current) player.current.stopVideo();
    player.current = null;
    setPlaying(false);
    setOpen(false);
  }, []);

  const value = { mix: MIXES[index], index, open, playing, time, duration, playMix, toggle, next, close };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {open && (
        <div className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] max-w-[356px] bg-black border border-white/15 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/15">
            <span className={`w-2 h-2 shrink-0 ${playing ? 'bg-brand animate-pulse' : 'bg-white/30'}`} />
            <p className="flex-1 min-w-0 truncate text-xs font-bold uppercase tracking-wider">
              {MIXES[index].title}
            </p>
            <button onClick={toggle} aria-label={playing ? 'Pauziraj' : 'Pusti'} className="p-1 hover:text-brand">
              {playing ? <IoPause /> : <IoPlay />}
            </button>
            <button onClick={next} aria-label="Sledeći mix" className="p-1 hover:text-brand">
              <IoPlaySkipForward />
            </button>
            <button onClick={close} aria-label="Zatvori plejer" className="p-1 hover:text-brand">
              <IoClose />
            </button>
          </div>
          <YouTube
            videoId={MIXES[index].id}
            className="w-full h-[200px]"
            iframeClassName="w-full h-full"
            opts={{ playerVars: { autoplay: 1, playsinline: 1, modestbranding: 1, rel: 0 } }}
            onReady={(e) => { player.current = e.target; }}
            onStateChange={(e) => setPlaying(e.data === 1)}
            onEnd={next}
            onError={() => {
              setBlocked(true);
              setPlaying(false);
            }}
            style={blocked ? { display: 'none' } : undefined}
          />
          {blocked && (
            // Fallback: the plain embed the old site used. No remote control from the navbar,
            // but it plays in places where the API player gets refused.
            <>
              <iframe
                key={MIXES[index].id}
                className="w-full h-[200px] block border-0"
                src={`https://www.youtube.com/embed/${MIXES[index].id}?autoplay=1&controls=1&modestbranding=1&playsinline=1&rel=0`}
                title={MIXES[index].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <a
                href={`https://www.youtube.com/watch?v=${MIXES[index].id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-xs text-white/60 hover:text-white border-t border-white/15"
              >
                Ne radi? Gledaj na YouTube-u ↗
              </a>
            </>
          )}
        </div>
      )}
    </PlayerContext.Provider>
  );
};
