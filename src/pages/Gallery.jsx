import React from 'react';
import GalleryTab from '../components/Gallery Components/GalleryTab';
import GalleryHeader from '../components/Gallery Components/GalleryHeader';
import GalleryContent from '../components/Gallery Components/GalleryContent';
import image from '../assets/ISP_7185.JPG'
import imagesresized from '../assets/resized/safari/ISP_7185JPG.jpg'

const Gallery = () => {
  return (
    <div className='relative bg-black text-white min-h-screen flex flex-col items-center  bg-cover bg-center px-4 sm:px-8 py-10'
     style={{ backgroundImage: `url(${imagesresized})` }}
    > {/* Changed h-full to min-h-screen */}
           
          <GalleryHeader></GalleryHeader> {/*Centered the heading*/}
      
      {/* <div className='py-16 flex justify-center items-center'>
        <div className='w-11/12 max-h-[90vh]'> 
          <GalleryTab />
        </div>
      </div> */}
      <GalleryContent />
    </div>
  );
}

export default Gallery;
