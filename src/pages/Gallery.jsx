import React from 'react';
import GalleryContent from '../components/Gallery Components/GalleryContent';
import imagesresized from '../assets/resized/safari/ISP_7185JPG.jpg';

const Gallery = () => {
  return (
    <div
      className="relative bg-black text-white min-h-screen flex flex-col items-center px-4 sm:px-8 py-10"
      style={{
        backgroundImage: `url(${imagesresized})`,
        backgroundSize: 'cover', // Ensures the image covers the entire area
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents tiling
      }}
    >
      <GalleryContent />
    </div>
  );
};

export default Gallery;
