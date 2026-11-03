import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePlayer } from "../Player/PlayerContext";
import ClipPlayer from "./ClipPlayer";

// Grid tile: the clip's first frame as a cover, red overlay on hover like the YouTube page
const ClipTile = ({ clip, active, playing, onSelect }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  return (
    <div ref={ref}>
      <button
        onClick={onSelect}
        aria-label={`Pusti ${clip.title}`}
        className="group relative block w-full aspect-[4/5] overflow-hidden bg-neutral-900"
      >
        {inView && (
          <video
            src={`${clip.src}#t=0.5`}
            preload="metadata"
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span
          className={`absolute inset-0 grid place-items-center text-3xl transition-colors ${
            active ? "bg-brand/60" : "bg-transparent group-hover:bg-brand/55"
          }`}
        >
          {active ? (playing ? "SVIRA" : "❚❚") : "▶"}
        </span>
      </button>
      <p className="mt-3 text-base font-bold">{clip.title}</p>
    </div>
  );
};

const GalleryVideos = ({ videos }) => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const videoRef = useRef(null);
  const stageRef = useRef(null);
  const mixPlayer = usePlayer();

  // Picking a clip moves it into the big player and starts it
  const select = (i) => {
    setAutoplay(true);
    setCurrent(i);
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    if (autoplay) videoRef.current?.play().catch(() => {});
  }, [current, autoplay]);

  // Two soundtracks at once is noise: pause the mix while a clip plays
  const onPlay = () => {
    setPlaying(true);
    if (mixPlayer.playing) mixPlayer.toggle();
  };

  const clip = videos[current];

  return (
    <div>
      <div ref={stageRef} className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-center pb-12">
        <div className="border border-white/15">
          <ClipPlayer
            ref={videoRef}
            src={clip.src}
            onPlay={onPlay}
            onPause={() => setPlaying(false)}
            onEnded={() => (current < videos.length - 1 ? select(current + 1) : setPlaying(false))}
          />
        </div>
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-brand mb-2">
            KLIP {String(current + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
          </p>
          <h2 className="font-display uppercase text-[clamp(2.5rem,5vw,4.5rem)] leading-[.95] mb-5">{clip.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => select((current - 1 + videos.length) % videos.length)}
              className="border border-white/15 hover:border-brand px-4 py-3 text-sm font-bold uppercase tracking-wider"
            >
              ← Prethodni
            </button>
            <button
              onClick={() => select((current + 1) % videos.length)}
              className="bg-brand hover:bg-brand-hi transition-colors px-4 py-3 text-sm font-bold uppercase tracking-wider"
            >
              Sledeći →
            </button>
          </div>
          <p className="mt-4 text-xs text-white/50">Kad se klip završi, sam kreće sledeći.</p>
        </div>
      </div>

      <h2 className="font-display uppercase text-[clamp(3rem,8vw,6.5rem)] leading-none mb-6">Svi klipovi</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-6">
        {videos.map((v, i) => (
          <ClipTile key={v.src} clip={v} active={i === current} playing={playing} onSelect={() => select(i)} />
        ))}
      </div>
    </div>
  );
};

export default GalleryVideos;
