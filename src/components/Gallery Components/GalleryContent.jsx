import React, { useState } from "react";
import GalleryImages from "./GalleryImages";
import sunsetImages from "./ModelImages";
import { safariImages } from "./ModelImages";
import { wildFestImages } from "./ModelImages";
import AnimateIn from "../Other Components/AnimateIn";

const GalleryContent = () => {
  const [activeTab, setActiveTab] = useState("Sunset_Fest");

  // Simulated data for different categories
  const galleryData = {
    Sunset_Fest: sunsetImages,
    Safari: safariImages,
    // Test1: ["architecture1.jpg", "architecture2.jpg"],
    // Test2: ["architecture1.jpg", "architecture2.jpg"],
    Wild_Fest: wildFestImages,
  };

  return (
    <div className="max-w-full mx-auto pb-8">
      <div className="pb-12 max-w-[1240px] mx-auto">
        {/* Tabs */}
        <AnimateIn 
          from="opacity-0 blur-lg" 
          to="opacity-100 blur-none"
          delay={600}
        >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
          {Object.keys(galleryData).map((category) => (
            <button
              key={category}
              className={`transition-all duration-300 ease-in-out font-bold py-5 px-10 rounded-full text-2xl ${
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
      </AnimateIn>
        {/* Tab Content */}

        <div className="mt-8">
          <GalleryImages images={galleryData[activeTab]} />
        </div>
      </div>
    </div>
  );
};

export default GalleryContent;
