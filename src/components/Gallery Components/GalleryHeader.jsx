import React from 'react'
import AnimateIn from '../Other Components/AnimateIn'

const GalleryHeader = () => {
  return (
    <div className='max-w-full  w-full mx-auto text-center flex flex-col justify-center pb-20'>
 <AnimateIn
          
          from="opacity-0 -translate-y-16" 
          to="opacity-100 translate-y-0 translate-x-0"
          // style={{transitionTimingFunction:"cubic-bezier(0.25, 0.4, 0.55, 1.4)"}}
          delay={200}
          duration={300}
  
    >
     <div className='pt-12 pb-4'>
         <h1 className='md:text-7xl sm:text-6xl text-4xl text-white font-bold md:py-6'>
         Pogledaj energiju uživo!
         </h1>
        
        <p className="md:text-2xl text-xl text-[#bd2025]">
        Ova galerija beleži trenutke kada muzika postaje više od zvuka, kada svaki ton donosi nove uspomene i svaki korak postaje deo ritma.
         </p>
    
     </div>
   
   
     </AnimateIn>
 </div>
  )
}

export default GalleryHeader
