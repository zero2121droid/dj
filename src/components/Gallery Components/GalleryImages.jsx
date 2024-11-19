import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "daisyui/dist/full.css"; // Ensure DaisyUI styles are included

const GalleryImages = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  // Preload images when component mounts
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedImages((prev) => ({ ...prev, [index]: true }));
    });
  }, [images]);

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="grid gap-4">
            <div className="w-full h-64 relative">
              <img
                className={`w-full h-full object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out ${
                  loadedImages[index] ? "" : "hidden"
                }`}
                src={image}
                alt={`Gallery image ${index + 1}`}
                onClick={() => openLightbox(index)}
                onLoad={() =>
                  setLoadedImages((prev) => ({
                    ...prev,
                    [index]: true,
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          slides={images.map((src) => ({ src }))}
          open={open}
          close={() => setOpen(false)}
          index={currentIndex}
          carousel={{ finite: true }}
          on={{
            click: (nextIndex) => setCurrentIndex(nextIndex),
          }}
        />
      )}
    </div>
  );
};

export default GalleryImages;
