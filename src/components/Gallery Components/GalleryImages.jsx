import React, { useState, useEffect, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "daisyui/dist/full.css"; // Ensure DaisyUI styles are included

const GalleryImages = ({ images, label }) => {
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
  const slides = useMemo(() => images.map((src) => ({ src, title: label })), [images, label]);

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
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {currentImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group w-full h-56 md:h-72 relative overflow-hidden bg-neutral-900"
          >
            <img
              className={`w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]
                          group-hover:scale-105 will-change-transform ${
                            loadedImages[index] ? "" : "hidden"
                          }`}
              src={image}
              alt={`${label || "Galerija"} ${(currentPage - 1) * imagesPerPage + index + 1}`}
              loading="lazy"
            />
            <span className="absolute inset-x-0 bottom-0 bg-brand px-3 py-2 text-left text-xs font-bold uppercase tracking-wider translate-y-full transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          className="border border-white/15 hover:border-brand disabled:opacity-30 py-2 px-4 text-xs font-bold uppercase tracking-wider"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Prethodna
        </button>
        <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
          Strana {currentPage} od {totalPages}
        </span>
        <button
          className="bg-brand hover:bg-brand-hi disabled:opacity-30 py-2 px-4 text-xs font-bold uppercase tracking-wider"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Sledeća
        </button>
      </div>

      {open && (
        <Lightbox
          className="klub-lightbox"
          slides={slides}
          open={open}
          close={() => setOpen(false)}
          index={currentIndex}
          carousel={{ finite: true }}
          plugins={[Thumbnails, Counter, Captions, Zoom, Fullscreen, Slideshow]}
          thumbnails={{ width: 96, height: 64, border: 0, borderRadius: 0, padding: 0, gap: 8, vignette: true }}
          counter={{ container: { style: { top: 0, left: 0, bottom: "unset" } } }}
          captions={{ showToggle: false, descriptionTextAlign: "start" }}
          slideshow={{ delay: 3000 }}
          animation={{ swipe: 350 }}
          render={{
            iconPrev: () => <span className="klub-lb-arrow"><IoChevronBack /></span>,
            iconNext: () => <span className="klub-lb-arrow"><IoChevronForward /></span>,
          }}
        />
      )}
    </div>
  );
};

export default GalleryImages;
