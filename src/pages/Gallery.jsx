import React from 'react'
import GalleryTab from '../components/Gallery Components/GalleryTab'

const Gallery = () => {
  return (
    <div className='bg-black w-full py-32 h-screen text-white'>
    
    <h1 className='text-7xl'>Gallery</h1>
    
    <div className='py-32 flex justify-center items-center'>
        <div className='w-3/4'> {/* Adjust the width here */}
          <GalleryTab />
        </div>
      </div>

    </div>
  )
}

export default Gallery