import React, { useState } from "react";
import GalleryImages from "./GalleryImages";
import sunsetImages from "./ModelImages";
import { safariImages } from "./ModelImages";
import { wildFestImages } from "./ModelImages";
import { SlPicture } from "react-icons/sl";
import { GoDeviceCameraVideo } from "react-icons/go";
import AnimateIn from "../Other Components/AnimateIn";
import GalleryVideos from "./GalleryVideos";
import videoList from "./ModelVideos";

const GalleryContent = () => {
  const [activeTab, setActiveTab] = useState("Sunset_Fest");
  const [activeTab2, setActiveTab2] = useState("Pics");

  // Simulated data for different categories
  const galleryData = {
    Sunset_Fest: sunsetImages,
    ABC_Safari: safariImages,
    Wildness_Fest: wildFestImages,
  };

  const galleryType = ["Pics", "Videos"];

  return (
    <div className="max-w-full mx-auto pt-24 pb-8">
      <div className="pb-12 max-w-[1240px] mx-auto">
          <div className="flex justify-center gap-4 mb-8">
              {galleryType.map((item) => (
                <button
                  key={item}
                  className={`flex items-center justify-center transition-all duration-300 ease-in-out font-bold py-3 px-6 rounded-box text-lg ${
                    activeTab2 === item
                      ? "bg-white text-[#bd2025] transform scale-105"
                      : "bg-black text-white"
                  }`}
                  onClick={() => setActiveTab2(item)}
                >
                  {item === "Pics" && <SlPicture className=" text-2xl" />}
                  {item === "Videos" && <GoDeviceCameraVideo className=" text-2xl" />}
                </button>
              ))}
            </div>
        {/* Tabs */}
        {activeTab2 === "Pics" && 
          <AnimateIn from="opacity-0 blur-lg" to="opacity-100 blur-none">
          <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-4">
            {Object.keys(galleryData).map((category) => (
              <button
                key={category}
                className={`transition-all duration-300 ease-in-out font-bold py-5 px-4 rounded-box text-xl ${
                  activeTab === category
                    ? "bg-white text-[#bd2025] transform scale-105"
                    : "bg-black text-white"
                }`}
                onClick={() => setActiveTab(category)}
              >
                {category.replace("_", " ")} {/* Replace underscore with space */}
              </button>
            ))}
          </div>

          {/* Second Row Buttons */}
        
        </AnimateIn>
        }
      

        {/* Tab Content */}
        <div className="mt-8">
         {activeTab2 === "Pics" && <GalleryImages images={galleryData[activeTab]} /> }
         {activeTab2 === "Videos" && <GalleryVideos videos={videoList} /> }
        </div>
      </div>
    </div>
  );
};

export default GalleryContent;
