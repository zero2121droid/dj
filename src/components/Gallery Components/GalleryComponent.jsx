// GalleryComponent.js

import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";

const GalleryComponent = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery Item ${index + 1}`}
          className="rounded-lg cursor-pointer transition-transform transform hover:scale-105"
          loading="lazy"
          onClick={() => openLightbox(index)}
        />
      ))}

      {/* Lightbox Component */}
      {open && (
        <Lightbox
          slides={images.map((src) => ({ src }))}
          open={open}
          close={() => setOpen(false)}
          index={currentIndex}
          portal
          carousel={{ finite: true }}
        />
      )}
    </div>
  );
};

export default GalleryComponent;
