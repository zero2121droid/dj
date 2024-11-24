import React, { useState, useEffect, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "daisyui/dist/full.css"; // Ensure DaisyUI styles are included

const GalleryImages = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 16; // Number of images per page
  const totalPages = Math.ceil(images.length / imagesPerPage);

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

  // Reset pagination to the first page when the `images` prop changes
  useEffect(() => {
    setCurrentPage(1);
  }, [images]);

  // Memoized Lightbox slides
  const slides = useMemo(() => images.map((src) => ({ src })), [images]);

  // Get images for the current page
  const currentImages = useMemo(
    () =>
      images.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
      ),
    [images, currentPage]
  );

  const openLightbox = (index) => {
    setCurrentIndex((currentPage - 1) * imagesPerPage + index);
    setOpen(true);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentImages.map((image, index) => (
          <div key={index} className="w-full h-64 relative">
            <img
              className={`w-full h-full object-cover rounded-lg cursor-pointer 
                          transition-transform duration-300 ease-in-out 
                          hover:scale-110 will-change-transform ${
                            loadedImages[index] ? "" : "hidden"
                          }`}
              src={image}
              alt={`Gallery image ${(currentPage - 1) * imagesPerPage + index + 1}`}
              onClick={() => openLightbox(index)}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          className="rounded-lg py-1 px-2 bg-[#bd2025] text-white font-bold"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Prethodna
        </button>
        <span className="text-white font-bold">
          Strana {currentPage} od {totalPages}
        </span>
        <button
          className="rounded-lg py-1 px-2 bg-[#bd2025] text-white font-bold"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Sledeća
        </button>
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
