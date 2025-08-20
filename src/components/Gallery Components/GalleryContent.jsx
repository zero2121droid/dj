import React, { useState, useEffect } from "react";
import GalleryImages from "./GalleryImages";
import sunsetImages from "./ModelImages";
import { safariImages } from "./ModelImages";
import { wildFestImages } from "./ModelImages";
import { promo } from "./ModelImages";
import { laCasa } from "./ModelImages";
import { wildnessFest2025 } from "./ModelImages";
import { SlPicture } from "react-icons/sl";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FaArrowUp } from "react-icons/fa";
import AnimateIn from "../Other Components/AnimateIn";
import GalleryVideos from "./GalleryVideos";
import videoList from "./ModelVideos";

const GalleryContent = () => {
  const [activeTab, setActiveTab] = useState("La_Casa");
  const [activeTab2, setActiveTab2] = useState("Pics");
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Simulated data for different categories
  const galleryData = {
    La_Casa: laCasa,
    Promo: promo,
    Sunset_Fest: sunsetImages,
    ABC_Safari: safariImages,
    Wildness_Fest_2025: wildnessFest2025,
    Wildness_Fest: wildFestImages,

  };

  const galleryType = ["Pics", "Videos"];

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-full mx-auto pt-24 pb-8">
      <div className="pb-12 max-w-[1240px] mx-auto">
        {/* Gallery Type Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {galleryType.map((item) => (
            <button
              key={item}
              className={`flex items-center justify-center transition-all duration-300 ease-in-out font-bold py-3 px-6 rounded-box text-lg ${activeTab2 === item
                  ? "bg-white text-[#bd2025] transform scale-105"
                  : "bg-black text-white"
                }`}
              onClick={() => setActiveTab2(item)}
            >
              {item === "Pics" && <SlPicture className="text-2xl" />}
              {item === "Videos" && <GoDeviceCameraVideo className="text-2xl" />}
            </button>
          ))}
        </div>

        {/* Category Buttons */}
        {activeTab2 === "Pics" && (
          <AnimateIn from="opacity-0 blur-lg" to="opacity-100 blur-none">
            <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-4 gap-4">
              {Object.keys(galleryData).map((category) => (
                <button
                  key={category}
                  className={`transition-all duration-300 ease-in-out font-bold py-5 px-4 rounded-box text-xl ${activeTab === category
                      ? "bg-white text-[#bd2025] transform scale-105"
                      : "bg-black text-white"
                    }`}
                  onClick={() => setActiveTab(category)}
                >
                  {category.replace(/_/g, " ")}              
                </button>
              ))}
            </div>
          </AnimateIn>
        )}

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab2 === "Pics" && <GalleryImages images={galleryData[activeTab]} />}
          {activeTab2 === "Videos" && <GalleryVideos videos={videoList} />}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 bg-black text-white rounded-full border border-white p-3 shadow-lg transition duration-300 sm:block"
        >
          <FaArrowUp className="text-3xl" />
        </button>
      )}
    </div>
  );
};

export default GalleryContent;
