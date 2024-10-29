import React, { useEffect, useState } from "react";
import video from "../../assets/cover-video.mp4";
import video2 from "../../assets/Deki Safari 3.mp4";
import image from "../../assets/ISP_4283.jpg";

const Content = () => {
  const [currentVideo, setCurrentVideo] = useState(video);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMediaChange = (e) => {
      setCurrentVideo(e.matches ? video2 : video);
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div id="content">
      <div className="hero">
        <video
          key={currentVideo}
          className="w-full mx-auto"
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

   
      <div
        className="bg-black text-white h-screen flex flex-col items-center justify-center gap-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >

   
        <div className="card w-full max-w-3xl bg-black bg-opacity-50 text-gray-100 mt-12">
          <div className="card-body p-6">
          <h1 className="md:text-7xl sm:text-6xl text-6xl font-bold font-mono">Dejan Jorgacevic</h1>
            <div className="flex justify-center">
            <div className="divider w-[95%] md:w-[90%] h-[2px] bg-white"></div>
            </div>
            <p className="text-lg leading-relaxed font-bold text-[#bd2025] mt-4 font-mono">
              Mladi i talentovani Dejan Jorgaćević DJ-ingom i produkcijom počinje da se bavi 2014. godine. Radio je u mnogim klubovima i na mnogim festivalima, sa imenima kao što su DJ Dea, Igor Garnier, DJ Architect, Geo Da Silva, Cavin Viviano, Erick Kasell, Divolly and Markward i mnogi drugim.
              Takođe je sarađivao i sa domaćom scenom i delio stage sa imenima kao što su: Coby, Mike Ride, Gru, Gazda Paja, Sanja Vučić...
              Dejan Jorgaćević je jedan od najtraženijih na našim prostorima. On je resident DJ u SAFARI ABC. U njegovom setu se može čuti sve od komercijalne house muzike pa do balkanske trend muzike pa takođe i afro house.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
