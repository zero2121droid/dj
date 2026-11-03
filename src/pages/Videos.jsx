import React from 'react';
import image from '../assets/rsz_isp_4290.jpg';
import { CONTACT, MIXES } from '../data/site';
import { usePlayer } from '../components/Player/PlayerContext';
import { PageHero, Reveal } from '../components/Other Components/Motion';

const thumb = (id, size = 'hqdefault') => `https://img.youtube.com/vi/${id}/${size}.jpg`;

// Thumbnail that loads the mix into the site-wide mini player instead of leaving the page
const Thumb = ({ mix, i, large = false }) => {
  const { index, open, playing, playMix } = usePlayer();
  const current = open && index === i;
  return (
    <button
      onClick={() => playMix(i)}
      aria-label={`Pusti ${mix.title}`}
      className="group relative block w-full aspect-video overflow-hidden bg-neutral-900 text-left"
    >
      <img
        src={thumb(mix.id, large ? 'maxresdefault' : 'hqdefault')}
        onError={(e) => { e.currentTarget.src = thumb(mix.id); }}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {mix.number && (
        <span className="absolute left-0 top-0 bg-brand font-display text-xl md:text-2xl px-2.5 py-1">{mix.number}</span>
      )}
      <span
        className={`absolute inset-0 grid place-items-center text-3xl transition-colors ${
          current ? 'bg-brand/60' : 'bg-transparent group-hover:bg-brand/55'
        }`}
      >
        {current ? (playing ? 'SVIRA' : '❚❚') : '▶'}
      </span>
    </button>
  );
};

const Videos = () => {
  const [latest, ...older] = MIXES;

  return (
    <div>
      <PageHero image={image} eyebrow="YouTube · @JorgacevicDJ" title="Mixevi" outline="i mashupovi" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal className="pt-8 pb-14 grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-8 items-center">
          <Thumb mix={latest} i={0} large />
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-brand mb-2">NAJNOVIJE</p>
            <h2 className="font-display uppercase text-[clamp(2.5rem,5vw,4.5rem)] leading-[.95] mb-4">{latest.title}</h2>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {latest.artists.split(',').map((a) => (
                <span key={a} className="border border-white/15 px-2 py-1 text-xs text-white/60">{a.trim()}</span>
              ))}
            </div>
            <p className="text-xs text-white/50">Pušta se u plejeru u uglu i svira dalje dok šetaš po sajtu.</p>
          </div>
        </Reveal>

        <Reveal className="pb-14">
          <h2 className="font-display uppercase text-[clamp(3rem,8vw,6.5rem)] leading-none mb-6">Starije</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {older.map((mix, k) => (
              <div key={mix.id}>
                <Thumb mix={mix} i={k + 1} />
                <p className="mt-3 text-base font-bold">{mix.title}</p>
                <p className="text-xs text-white/60">{mix.artists}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border border-white/15 p-5 md:p-6">
            <b className="font-display font-normal uppercase text-3xl md:text-4xl">Ceo kanal</b>
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand hover:bg-brand-hi transition-colors px-5 py-3 text-sm font-bold uppercase tracking-widest"
            >
              YouTube ↗
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Videos;
