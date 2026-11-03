import React, { useState } from "react";
import GalleryImages from "./GalleryImages";
import sunsetImages from "./ModelImages";
import { safariImages } from "./ModelImages";
import { wildFestImages } from "./ModelImages";
import { promo } from "./ModelImages";
import { laCasa } from "./ModelImages";
import { wildnessFest2025 } from "./ModelImages";
import { tomorrowle2026 } from "./ModelImages";
import GalleryVideos from "./GalleryVideos";
import { galleryVideos } from "./ModelVideos";

const GalleryContent = () => {
  const [activeTab, setActiveTab] = useState("TomorrowLE");
  const [activeTab2, setActiveTab2] = useState("Pics");

  const galleryData = {
    TomorrowLE: tomorrowle2026,
    La_Casa: laCasa,
    Promo: promo,
    Sunset_Fest: sunsetImages,
    ABC_Safari: safariImages,
    Wildness_Fest_2025: wildnessFest2025,
    Wildness_Fest: wildFestImages,
  };

  const galleryType = [
    ["Pics", "Foto"],
    ["Videos", "Video"],
  ];

  const chip = (active) =>
    `shrink-0 border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
      active ? "bg-brand border-brand text-white" : "border-white/15 text-white/60 hover:text-white"
    }`;

  return (
    <div className="relative">
      {/* Filter bar sticks to the top while scrolling through photos */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap md:flex-nowrap items-center gap-3">
          <div className="flex md:order-2">
            {galleryType.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab2(key)}
                className={`border px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                  activeTab2 === key ? "bg-white text-black border-white" : "border-white/15 text-white/60"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {activeTab2 === "Pics" && (
            <div className="flex gap-1.5 overflow-x-auto flex-1 min-w-0 w-full md:w-auto [scrollbar-width:none]">
              {Object.keys(galleryData).map((category) => (
                <button key={category} className={chip(activeTab === category)} onClick={() => setActiveTab(category)}>
                  {category.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {activeTab2 === "Pics" && <GalleryImages images={galleryData[activeTab]} label={activeTab.replace(/_/g, " ")} />}
        {activeTab2 === "Videos" && <GalleryVideos videos={galleryVideos} />}
      </div>

    </div>
  );
};

export default GalleryContent;
