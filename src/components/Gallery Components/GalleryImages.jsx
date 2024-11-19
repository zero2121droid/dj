import React, { useState, useEffect, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "daisyui/dist/full.css"; // Ensure DaisyUI styles are included

const GalleryImages = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () =>
          setLoadedImages((prev) => ({ ...prev, [index]: true }));
      });
    };
    preloadImages();
  }, [images]);

  // Memoized Lightbox slides
  const slides = useMemo(
    () => images.map((src) => ({ src })),
    [images]
  );

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="w-full h-64 relative">
            <img
              className={`w-full h-full object-cover rounded-lg cursor-pointer 
                          transition-transform duration-300 ease-in-out 
                          hover:scale-110 will-change-transform ${
                            loadedImages[index] ? "" : "hidden"
                          }`}
              src={image}
              alt={`Gallery image ${index + 1}`}
              onClick={() => openLightbox(index)}
            />
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          slides={slides}
          open={open}
          close={() => setOpen(false)}
          index={currentIndex}
          carousel={{ finite: true }}
        />
      )}
    </div>
  );
};

export default GalleryImages;
