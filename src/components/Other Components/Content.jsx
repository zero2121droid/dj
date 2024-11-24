import React, { useEffect, useRef, useState } from "react";
import video from "../../assets/cover-video.mp4";
import video2 from "../../assets/Deki Safari 3.mp4";
import image from "../../assets/rsz_isp_4283.jpg";
import imagesresized from '../../assets/resized/safari/ISP_7237JPG.jpg'
import Toast from '../Other Components/Toast';
import emailjs from 'emailjs-com';
import promoimage from '../../assets/resized/promo/ISP_4277.jpg'
import AnimateIn from "./AnimateIn";
import { FaEnvelope, FaInstagram, FaTiktok } from 'react-icons/fa';

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
  
  const [showToast, setShowToast] = useState(false);

  const handleSendMessage = () => {
    // Simulate a successful action
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  const [count, setCount] = useState(0);

  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_9d0y8dw',  // Service ID from EmailJS
      'template_rwgg14t', // Template ID from EmailJS
      form.current,
      '5PBfDkeFBYXq3Po_j'      // User ID from EmailJS
    )
    .then((result) => {
        console.log(result.text);
        // alert("Message sent successfully!");
        handleSendMessage()
    }, (error) => {
        console.log(error.text);
        alert("An error occurred, please try again.");
    });

    e.target.reset();
  };

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
   {/* Third Section */}
   <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-10">
  {/* First Row with Two Columns */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
  <div className="flex flex-col md:flex-row bg-neutral-900 text-white p-6 rounded-lg shadow-lg md:items-center md:space-x-6 max-w-3xl mx-auto">
  {/* Image Section */}
  <div className="w-full md:w-full">
    <img
      src={promoimage}
      alt="Card image"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>

  {/* Divider */}
  {/* <div className="border-l-2 border-gray-600 h-auto"></div> */}

  {/* Contact Information */}
  <div className="w-full md:w-1/2 mt-6 md:mt-0">
    <ul className="text-gray-400 space-y-4">
      {/* Email */}
      <li className="flex items-center">
        <FaEnvelope className="text-[#bd2025] mr-4 text-xl" />
        <a
          href="mailto:djdekli996@gmail.com"
          className="hover:text-[#bd2025] break-words"
        >
          <span className="font-bold">djdekli996@gmail.com</span>
        </a>
      </li>

      {/* Instagram */}
      <li className="flex items-center">
        <FaInstagram className="text-[#bd2025] mr-4 text-xl" />
        <a
          href="https://instagram.com/jorgacevicdj"
          className="hover:text-[#bd2025]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="font-bold">@jorgacevicdj</span>
        </a>
      </li>

      {/* TikTok */}
      <li className="flex items-center">
        <FaTiktok className="text-[#bd2025] mr-4 text-xl" />
        <a
          href="https://tiktok.com/@jorgacevicdj"
          className="hover:text-[#bd2025]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="font-bold">@jorgacevicdj</span>
        </a>
      </li>
    </ul>
  </div>
</div>

    {/* Second Card with Contact Form */}
    <div className="card w-full max-w-3xl bg-neutral-900 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-center">Ostavite poruku</h2>
        <form className="form-control" ref={form} onSubmit={sendEmail}>
          <div className="form-control mb-4">
            <label className="label" htmlFor="name">
              <span className="label-text text-white">Ime</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Unesite ime ovde"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="email">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Unesite Email ovde"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="message">
              <span className="label-text text-white">Poruka</span>
            </label>
            <textarea
              id="message"
              rows="4"
              name="message"
              placeholder="Napišite poruku ovde"
              className="textarea textarea-bordered w-full"
            />
          </div>
          <button type="submit" className="bg-[#bd2025] px-3 py-3 rounded-lg w-full">
            Pošalji poruku
          </button>
        </form>
      </div>
    </div>
  </div>

  {showToast && (
    <Toast
      message="Poruka je poslata!"
      onClose={() => setShowToast(false)}
    />
  )}
</div>


    </div>
  );
};

export default Content;
