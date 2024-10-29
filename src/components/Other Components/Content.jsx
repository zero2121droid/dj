import React, { useEffect, useState } from "react";
import video from "../../assets/cover-video.mp4";
import video2 from "../../assets/Deki Safari 3.mp4";
import image from "../../assets/ISP_4283.jpg"

const boxCount = Array.apply(null, Array(100));

const Content = () => {
  const [currentVideo, setCurrentVideo] = useState(video);

  useEffect(() => {
    // Define a media query to check for small screens
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    // Function to update the video based on the screen size
    const handleMediaChange = (e) => {
      setCurrentVideo(e.matches ? video2 : video); // Use video2 on small screens, otherwise use video
    };

    // Set initial video based on current screen size
    handleMediaChange(mediaQuery);

    // Add event listener for screen size changes
    mediaQuery.addEventListener("change", handleMediaChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div id="content">
      <div className="hero">
        {/* Use key to force re-render when currentVideo changes */}
        <video key={currentVideo} className="w-full md:w-3/4 lg:w-1/2 mx-auto" autoPlay loop muted  playsInline disablePictureInPicture controlsList="nodownload noplaybackrate">
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="bg-black text-white h-screen grid grid-rows-2 place-items-center bg-cover bg-center"
      style={{ backgroundImage:  `url(${image})`  }}>
      <div>
        <h1 className='md:text-7xl sm:text-6xl text-8xl font-bold md:py-6'>Dejan Jorgacevic</h1>
      </div>
      
      <div>
      
      <p className="">Mladi i talentovani Dejan Jorgaćević DJ-ingom i produkcijom počinje da se bavi 2014. godine. Radio je u mnogim klubovima i na mnogim festivalima, sa imenima kao što su DJ Dea, Igor Garnier, DJ Architect, Geo Da Silva, Cavin Viviano, Erick Kasell, Divolly and Markward i mnogi drugim.
        Takodje je saradjivao i sa domacom scenom i delio stage sa imenima kao sto su: 
        Coby, Mike Ride, Gru, Gazda Paja, Sanja Vucic...
        Dejan Jorgacevic je jedan od najtrazeniji na nasim prostorima.On je resident DJ u SAFARI ABC. U Njegovom setu se moze cuti sve od komercijalne House muzike pa do Balkanske trend muzike pa takodje i AFRO HOUSE.</p>
            {/* <img
              src={image}
              alt="Shoes" /> */}
         
      </div>
      
      {/* <p>Mladi i talentovani Dejan Jorgaćević DJ-ingom i produkcijom počinje da se bavi 2014. godine. Radio je u mnogim klubovima i na mnogim festivalima, sa imenima kao što su DJ Dea, Igor Garnier, DJ Architect, Geo Da Silva, Cavin Viviano, Erick Kasell, Divolly and Markward i mnogi drugim.
        Takodje je saradjivao i sa domacom scenom i delio stage sa imenima kao sto su: 
        Coby, Mike Ride, Gru, Gazda Paja, Sanja Vucic...
        Dejan Jorgacevic je jedan od najtrazeniji na nasim prostorima.On je resident DJ u SAFARI ABC. U Njegovom setu se moze cuti sve od komercijalne House muzike pa do Balkanske trend muzike pa takodje i AFRO HOUSE.</p> */}
        
      </div>
    </div>
  );
};

export default Content;
