import React from 'react';
import VideoContent from '../components/Video Components/VideoContent';
import VideoHeader from '../components/Video Components/VideoHeader';
import image from '../assets/rsz_isp_4290.jpg';
import imageYouTube from '../assets/ISP_5671.JPG';
import { PiYoutubeLogoBold } from 'react-icons/pi';
import { ImYoutube2 } from "react-icons/im";
import AnimateIn from '../components/Other Components/AnimateIn';

const Videos = () => {
  return (
    <div
      className="relative bg-black text-white min-h-screen flex flex-col items-center gap-8 bg-cover bg-center px-4 sm:px-8 py-10"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Optional Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header */}
        <VideoHeader />

        {/* Video Grid with Increased Gap */}
        <div className="grid grid-cols-1 gap-12 w-full mt-3 max-w-7xl">
          {/* Each pair of videos in a separate div */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VideoContent videoId="qL96iv_bfZo" />
            <VideoContent videoId="TNG2IKKNUDo" />
          </div>

          <AnimateIn 
            from="opacity-0 translate-x-32" 
            to="opacity-100 translate-y-0 translate-x-0"
            delay={100}
          >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VideoContent videoId="LDsSFx2PFzw" />
            <VideoContent videoId="RQkUln0mpz0" />
          </div>
          </AnimateIn>
          <AnimateIn 
            from="opacity-0 -translate-x-32" 
            to="opacity-100 translate-y-0 translate-x-0"
            delay={200}
          >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VideoContent videoId="a1Mj0DgQIK0" />
            <VideoContent videoId="K-OQLXAil_s" />
          </div>
          </AnimateIn>
          <div>
          <AnimateIn 
            from="opacity-0 blur-lg" 
            to="opacity-100 blur-none"
        
          >
          <a href='https://www.youtube.com/@JorgacevicDJ/videos' target="_blank" rel="noopener noreferrer">
          <button class=" bg-neutral-900 text-white hover:bg-white hover:text-[#bd2025] transition-all delay-150 ease-in-out font-bold py-0 px-10 md:py-2 md:px-16 rounded-full text-3xl">
          <div className='flex items-center justify-between gap-5'>
          <ImYoutube2 className='w-24 h-24'></ImYoutube2>
          <img
            src={imageYouTube}
            alt="Channel Logo"
            className="w-16 h-16 rounded-full"
            loading="lazy"
          />
          </div>
         
          </button>
          </a>
          </AnimateIn>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Videos;
