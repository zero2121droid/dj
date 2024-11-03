import React from 'react';
import GalleryTab from '../components/Gallery Components/GalleryTab';
import GalleryHeader from '../components/Gallery Components/GalleryHeader';
import GalleryContent from '../components/Gallery Components/GalleryContent';

const Gallery = () => {
  return (
    <div className='bg-black w-full min-h-screen py-20 text-white'> {/* Changed h-full to min-h-screen */}
          <GalleryHeader></GalleryHeader> {/* Centered the heading */}
      
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
