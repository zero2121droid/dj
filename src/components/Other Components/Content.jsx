import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper } from 'react-icons/fa';
import { IoPause, IoPlay } from 'react-icons/io5';
import video from '../../assets/Landscape La CASA.mp4';
import video2 from '../../assets/deki la casa-2.mp4';
import { ARTICLES, ARTISTS, GIGS, MIXES } from '../../data/site';
import { usePlayer } from '../Player/PlayerContext';
import { Reveal, Scramble } from './Motion';

// Custom hook for media query handling
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = (e) => setMatches(e.matches);

    mediaQuery.addEventListener('change', updateMatches);
    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
};

const W = ({ children }) => <span className="text-white">{children}</span>;

const EQ_BARS = Array.from({ length: 22 }, () => ({
  delay: -(Math.random() * 0.5).toFixed(2),
  duration: (0.3 + Math.random() * 0.4).toFixed(2),
}));

const Content = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const currentVideo = isMobile ? video2 : video;
  const { index, playing, open, playMix, toggle } = usePlayer();
  const latestPlaying = open && index === 0 && playing;

  return (
    <div id="content">
      {/* Hero: video at its natural size, name over the lower left */}
      <section className="relative overflow-hidden">
        <video
          key={currentVideo}
          className="w-full h-[100svh] min-h-[32rem] object-cover block"
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-8 md:bottom-16 left-4 md:left-10 z-10 pl-4 md:pl-6 border-l-[6px] md:border-l-8 border-brand">
          <h1 className="font-display uppercase leading-[.86] text-[clamp(3.5rem,11vw,12rem)] [text-shadow:0_4px_40px_rgba(0,0,0,.65)]">
            <Scramble text="Dejan" />
            <span className="block">
              <Scramble text="Jorgaćević" />
            </span>
          </h1>
          <div className="flex items-end gap-[3px] h-10 md:h-14 mt-5" aria-hidden="true">
            {EQ_BARS.map((b, i) => (
              <span key={i} className="eq-bar" style={{ animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s` }} />
            ))}
          </div>
          <Link
            to="/booking"
            className="inline-block mt-6 bg-brand hover:bg-brand-hi transition-colors px-7 py-4 text-sm md:text-base font-bold uppercase tracking-widest"
          >
            Booking →
          </Link>
        </div>
      </section>

      {/* Artists he has shared the stage with */}
      <div className="overflow-hidden whitespace-nowrap border-y border-white/15 py-4 md:py-5 font-display text-3xl md:text-5xl uppercase">
        <div className="marquee-track">
          {[...ARTISTS, ...ARTISTS].map((a, i) => (
            <span key={i}>
              <span className="mx-5">{a}</span>
              <span className="text-brand">✶</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal className="py-14 md:py-20">
          <h2 className="font-display uppercase text-[clamp(3rem,8vw,6.5rem)] leading-none mb-6">Bio</h2>
          <div className="max-w-[68ch] space-y-5 text-base md:text-lg leading-relaxed text-white/70">
            <p>
              Mladi i talentovani <W>Dejan Jorgaćević</W> DJ-ingom i produkcijom počinje da se bavi 2014. godine.
              Radio je u mnogim klubovima i na mnogim festivalima, sa imenima kao što su <W>DJ Dea</W>,{' '}
              <W>Igor Garnier</W>, <W>DJ Architect</W>, <W>Geo Da Silva</W>, <W>Cavin Viviano</W>,{' '}
              <W>Erick Kasell</W>, <W>Divolly and Markward</W> i mnogi drugi. Takođe je sarađivao i sa domaćom
              scenom i delio stage sa imenima kao što su: <W>Coby</W>, <W>Edita</W>, <W>Biba</W>, <W>Seksi</W>,{' '}
              <W>Voyage</W>, <W>Desingerica</W>, <W>Sladja Alegro</W>, <W>Tropico</W>, <W>Ema Raduljko</W>,{' '}
              <W>Mike Ride</W>, <W>Gru</W>, <W>Gazda Paja</W>, <W>Sanja Vučić</W>...
            </p>
            <p>
              <W>Dejan Jorgaćević</W> je jedan od najtraženijih na našim prostorima. On je resident DJ u{' '}
              <W>LA CASA</W> i <W>SAFARI ABC</W>. U njegovom setu se može čuti sve od komercijalne house muzike pa
              do balkanske trend muzike pa takođe i afro house.
            </p>
            <p>
              Njegova energija, harizma i sposobnost da "pročita" publiku čine svaki njegov nastup nezaboravnim
              iskustvom. Dejan je poznat po tome što svojom muzikom stvara jedinstvenu atmosferu koja spaja ljude
              na plesnom podijumu. Pored DJ-inga, posvećen je i muzičkoj produkciji, gde stalno eksperimentiše sa
              novim zvucima i žanrovima, donoseći osveženje na domaću i regionalnu scenu.
            </p>
            <p>
              Sa preko decenije iskustva, <W>Dejan Jorgaćević</W> je razvio prepoznatljiv stil koji kombinuje
              moderne ritmove sa klasičnim elementima, omogućavajući mu da se prilagodi različitim događajima, od
              ekskluzivnih privatnih zabava do masovnih festivala. Njegova posvećenost muzici i ljubav prema
              umetnosti su inspiracija mnogima, a njegovo ime postalo je sinonim za kvalitetan provod.
            </p>
            <p>
              Kao jedan od vodećih DJ-eva na našim prostorima, <W>Dejan Jorgaćević</W> nastavlja da pomera granice,
              kako na sceni tako i van nje, ostavljajući neizbrisiv trag na muzičkoj sceni Balkana.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-6 mt-8 max-w-2xl">
            {[
              ['2014', 'Prvi nastup'],
              ['2', 'Rezidencije'],
              ['3', 'House · Balkan · Afro'],
            ].map(([n, l]) => (
              <div key={l} className="border-t-2 border-brand pt-3">
                <strong className="block font-display font-normal text-4xl md:text-6xl leading-none">{n}</strong>
                <small className="text-xs uppercase tracking-wider text-white/60">{l}</small>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="pb-14 md:pb-20">
          <h2 className="font-display uppercase text-[clamp(3rem,8vw,6.5rem)] leading-none mb-4">Nastupi</h2>
          {GIGS.map((g) => (
            <div
              key={g.title}
              className="grid grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[110px_minmax(0,1fr)_auto] gap-x-4 items-baseline py-5 border-b border-white/15 text-base md:text-lg"
            >
              <span className="text-brand font-bold">{g.when}</span>
              <span className="font-bold">
                {g.title}
                <small className="block font-normal text-sm text-white/60">{g.detail}</small>
              </span>
              <span className="col-start-2 md:col-start-3 text-xs uppercase tracking-wider text-white/60">{g.status}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="pb-14 md:pb-20">
          <h2 className="font-display uppercase text-[clamp(3rem,8vw,6.5rem)] leading-none mb-6">Mixevi</h2>
          <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-5 items-center p-4 md:p-5 border border-white/15">
            <button
              onClick={() => (open && index === 0 ? toggle() : playMix(0))}
              aria-label={latestPlaying ? 'Pauziraj' : 'Pusti najnoviji mix'}
              className="w-16 h-16 grid place-items-center bg-brand hover:bg-brand-hi transition-colors text-2xl"
            >
              {latestPlaying ? <IoPause /> : <IoPlay />}
            </button>
            <div className="min-w-0">
              <p className="font-bold uppercase">{MIXES[0].title}</p>
              <p className="text-xs text-white/60 truncate">{MIXES[0].artists}</p>
              <Link to="/videos" className="inline-block mt-2 text-xs text-brand hover:underline">
                Svi mixevi →
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="pb-16 md:pb-24">
          <h2 className="font-display uppercase text-[clamp(3rem,8vw,6.5rem)] leading-none mb-6">U medijima</h2>
          <ul className="space-y-3">
            {ARTICLES.map((article) => (
              <li key={article.url}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 md:p-5 border border-white/15 hover:bg-white/5 transition-colors"
                >
                  <FaNewspaper className="text-brand text-2xl shrink-0" />
                  <div>
                    <p className="font-bold text-sm md:text-base">{article.title}</p>
                    <p className="text-brand text-xs md:text-sm">{article.source} ↗</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
};

export default Content;
