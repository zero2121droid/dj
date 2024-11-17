import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "daisyui/dist/full.css"; // Ensure DaisyUI styles are included
// import safariImages from "./ModelImages";

const GalleryImages = ({images}) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const imagesPerPage = 50;

  const openLightbox = (index) => {
    setCurrentIndex(index + (currentPage - 1) * imagesPerPage);
    setOpen(true);
  };

  // Preload images when component mounts
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedImages((prev) => ({ ...prev, [index]: true }));
    });
  }, []);

  // Calculate images for the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Handle page change
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Reset loading state when images are updated
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300); // Adjust time based on your loading needs
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="px-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-[#bd2025]"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentImages.map((image, index) => (
            <div key={index} className="grid gap-4">
              <div className="w-full h-64 relative">
                {/* {!loadedImages[index + indexOfFirstImage] && (
                  <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg" />
                )} */}
                <img
                  className={`w-full h-full object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out ${
                    loadedImages[index + indexOfFirstImage] ? "" : "hidden"
                  }`}
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  onClick={() => openLightbox(index)}
                  onLoad={() =>
                    setLoadedImages((prev) => ({
                      ...prev,
                      [index + indexOfFirstImage]: true,
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {/* <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-[#bd2025] rounded-lg hover:bg-gray-300"
          onClick={handlePrevPage}
          disabled={currentPage === 1 || loading} // Disable if loading
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 mx-2 bg-[#bd2025] rounded-lg hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading} // Disable if loading
        >
          Next
        </button>
      </div> */}

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
