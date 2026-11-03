import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoContract, IoExpand, IoPause, IoPlay, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { formatTime } from "../Player/PlayerContext";

// Video player in the site's style. Same controls on every browser and phone:
// big red play, scrubber, time, sound, fullscreen. Controls fade while a clip plays.
// Keys: Space/K play, ←/→ 5 s, M sound, F fullscreen.
const ClipPlayer = forwardRef(({ src, onPlay, onPause, onEnded }, ref) => {
  const wrap = useRef(null);
  const video = useRef(null);
  const idle = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [full, setFull] = useState(false);
  const [showUi, setShowUi] = useState(true);

  useImperativeHandle(ref, () => ({ play: () => video.current?.play().catch(() => {}) }));

  useEffect(() => {
    const onFs = () => setFull(document.fullscreenElement === wrap.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => () => clearTimeout(idle.current), []);

  const poke = () => {
    setShowUi(true);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setShowUi(false), 2200);
  };

  const toggle = () => {
    const v = video.current;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const seekBy = (s) => {
    const v = video.current;
    v.currentTime = Math.min(Math.max(v.currentTime + s, 0), v.duration || 0);
    poke();
  };

  const toggleFull = () => {
    const v = video.current;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (wrap.current.requestFullscreen) wrap.current.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iPhone Safari
  };

  const onKey = (e) => {
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") { e.preventDefault(); toggle(); }
    else if (k === "arrowright") seekBy(5);
    else if (k === "arrowleft") seekBy(-5);
    else if (k === "m") { video.current.muted = !video.current.muted; }
    else if (k === "f") toggleFull();
  };

  const uiVisible = !playing || showUi;
  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <div
      ref={wrap}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerMove={poke}
      onPointerLeave={() => playing && setShowUi(false)}
      className={`group relative bg-black outline-none focus-visible:ring-2 focus-visible:ring-brand ${
        !uiVisible ? "cursor-none" : ""
      }`}
    >
      <video
        key={src}
        ref={video}
        src={src}
        playsInline
        preload="metadata"
        disablePictureInPicture
        onClick={toggle}
        onDoubleClick={toggleFull}
        onPlay={() => { setPlaying(true); poke(); onPlay?.(); }}
        onPause={() => { setPlaying(false); setShowUi(true); onPause?.(); }}
        onEnded={() => onEnded?.()}
        onLoadedMetadata={(e) => { setDuration(e.currentTarget.duration); setTime(0); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length && v.duration) setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
        }}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        className={`w-full object-contain bg-black ${full ? "h-full" : "max-h-[75vh]"}`}
      />

      {/* Big centre button while paused */}
      <AnimatePresence>
        {!playing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.2 }}
            onClick={toggle}
            aria-label="Pusti klip"
            className="absolute inset-0 m-auto w-20 h-20 grid place-items-center bg-brand hover:bg-brand-hi text-3xl shadow-2xl"
          >
            <IoPlay className="translate-x-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {waiting && playing && (
        <span className="absolute inset-0 m-auto w-12 h-12 border-4 border-white/20 border-t-brand rounded-full animate-spin pointer-events-none" />
      )}

      {/* Control bar */}
      <div
        className={`absolute inset-x-0 bottom-0 px-3 md:px-4 pb-3 pt-10 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${
          uiVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-1 mb-3 bg-white/20">
          <div className="absolute inset-y-0 left-0 bg-white/30" style={{ width: `${buffered}%` }} />
          <div className="absolute inset-y-0 left-0 bg-brand" style={{ width: `${pct}%` }} />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={time}
            onChange={(e) => { video.current.currentTime = Number(e.target.value); setTime(Number(e.target.value)); }}
            aria-label="Pozicija u klipu"
            className="clip-range absolute -inset-y-1.5 inset-x-0 w-full"
          />
        </div>
        <div className="flex items-center gap-3 text-lg">
          <button onClick={toggle} aria-label={playing ? "Pauziraj" : "Pusti"} className="hover:text-brand">
            {playing ? <IoPause /> : <IoPlay />}
          </button>
          <button
            onClick={() => { video.current.muted = !video.current.muted; }}
            aria-label={muted ? "Uključi zvuk" : "Isključi zvuk"}
            className="hover:text-brand"
          >
            {muted ? <IoVolumeMute /> : <IoVolumeHigh />}
          </button>
          <span className="text-xs font-bold tabular-nums text-white/80">
            {formatTime(time)} <span className="text-white/40">/ {formatTime(duration)}</span>
          </span>
          <span className="flex-1" />
          <button onClick={toggleFull} aria-label={full ? "Izađi iz celog ekrana" : "Ceo ekran"} className="hover:text-brand">
            {full ? <IoContract /> : <IoExpand />}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ClipPlayer;
