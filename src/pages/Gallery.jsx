import React from 'react';
import GalleryTab from '../components/Gallery Components/GalleryTab';

const Gallery = () => {
  return (
    <div className='bg-black w-full min-h-screen py-20 text-white'> {/* Changed h-full to min-h-screen */}
      <h1 className='text-7xl text-center'>Gallery</h1> {/* Centered the heading */}
      
      <div className='py-16 flex justify-center items-center'>
        <div className='w-11/12 max-h-[90vh] overflow-auto'> {/* Adjusted width for responsiveness */}
          <GalleryTab />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
