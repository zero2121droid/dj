import React from "react";
import GalleryImages from "./GalleryImages";
import AnimateIn from "../Other Components/AnimateIn";


const GalleryContent = () => {
  return (
    <div className="bg-black max-w-full mx-auto md:grid-rows-2 pb-8">

      <div className="pb-12 grid max-w-[1240px] mx-auto">
  
        
      <GalleryImages></GalleryImages>

      {/* <CoolGallery></CoolGallery> */}
      </div>
     
   
    </div>
  );
};

export default GalleryContent;
