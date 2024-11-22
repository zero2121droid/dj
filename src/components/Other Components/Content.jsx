import React, { useEffect, useState } from "react";
import video from "../../assets/cover-video.mp4";
import video2 from "../../assets/Deki Safari 3.mp4";
import image from "../../assets/rsz_isp_4283.jpg";
import imagesresized from '../../assets/resized/safari/ISP_7237JPG.jpg'
import AnimateIn from "./AnimateIn";

// Custom hook for media query handling
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = (e) => setMatches(e.matches);

    mediaQuery.addEventListener("change", updateMatches);
    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};

const Content = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const currentVideo = isMobile ? video2 : video;

  const backgroundImage = isMobile
  ? `url(${imagesresized})`
  : `url(${image})`;

  return (
    <div id="content">
      {/* Hero Section with Video */}
      <div className="hero">
        <video
          className="w-full mx-auto"
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
      </div>

      {/* Content Section */}
      <div
        className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-8 bg-cover bg-center px-4 pb-10 sm:px-8"
        style={{ backgroundImage: backgroundImage }}
      >
        <AnimateIn from="opacity-0 blur-lg" to="opacity-100 blur-none" delay={100}>
          <div className="card mx-auto text-center w-full max-w-5xl bg-black bg-opacity-70 text-gray-100 mt-12 p-6 rounded-lg">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-mono">
              Dejan Jorgaćević
            </h1>
            <div className="divider divider-error my-4 w-full max-w-full"></div>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-bold text-[#bd2025] font-mono text-left sm:text-left">
              Mladi i talentovani <span className="text-white">Dejan Jorgaćević</span> DJ-ingom i produkcijom počinje da se bavi 2014. godine. Radio je u mnogim klubovima i na mnogim festivalima, sa imenima kao što su <span className="text-white">DJ Dea</span>, <span className="text-white">Igor Garnier</span>, <span className="text-white">DJ Architect</span>, <span className="text-white">Geo Da Silva</span>, <span className="text-white">Cavin Viviano</span>, <span className="text-white">Erick Kasell</span>, <span className="text-white">Divolly and Markward</span> i mnogi drugim.
              Takođe je sarađivao i sa domaćom scenom i delio stage sa imenima kao što su: <span className="text-white">Coby</span>, <span className="text-white">Mike Ride</span>, <span className="text-white">Gru</span>, <span className="text-white">Gazda Paja</span>, <span className="text-white">Sanja Vučić</span>...
              <span className="text-white">Dejan Jorgaćević</span> je jedan od najtraženijih na našim prostorima. On je resident DJ u <span className="text-white">SAFARI ABC</span>. U njegovom setu se može čuti sve od komercijalne house muzike pa do balkanske trend muzike pa takođe i afro house.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-bold text-[#bd2025] font-mono text-left sm:text-left mt-4">
              Njegova energija, harizma i sposobnost da "pročita" publiku čine svaki njegov nastup nezaboravnim iskustvom. Dejan je poznat po tome što svojom muzikom stvara jedinstvenu atmosferu koja spaja ljude na plesnom podijumu. Pored DJ-inga, posvećen je i muzičkoj produkciji, gde stalno eksperimentiše sa novim zvucima i žanrovima, donoseći osveženje na domaću i regionalnu scenu.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-bold text-[#bd2025] font-mono text-left sm:text-left mt-4">
              Sa preko decenije iskustva, <span className="text-white">Dejan Jorgaćević</span> je razvio prepoznatljiv stil koji kombinuje moderne ritmove sa klasičnim elementima, omogućavajući mu da se prilagodi različitim događajima, od ekskluzivnih privatnih zabava do masovnih festivala. Njegova posvećenost muzici i ljubav prema umetnosti su inspiracija mnogima, a njegovo ime postalo je sinonim za kvalitetan provod.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-bold text-[#bd2025] font-mono text-left sm:text-left mt-4">
              Kao jedan od vodećih DJ-eva na našim prostorima, <span className="text-white">Dejan Jorgaćević</span> nastavlja da pomera granice, kako na sceni tako i van nje, ostavljajući neizbrisiv trag na muzičkoj sceni Balkana.
            </p>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
};

export default Content;
