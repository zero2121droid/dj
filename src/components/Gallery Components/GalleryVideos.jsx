import React, { useState, useEffect, useRef } from "react";

const GalleryVideos = ({ videos }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const videoRefs = useRef([]); // Ref to track all video elements

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust for your desired breakpoint
    };

    // Initial check
    handleResize();

    // Set up resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
      }
    }
  };

  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="w-full h-74 relative">
            <video
              ref={(el) => (videoRefs.current[index] = el)} // Store video references
              key={index} // Add a key for each video
              className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform"
              src={video}
              controls
              playsInline
              poster={isSmallScreen ? video : undefined} // Use poster only on small screens
              onClick={() => {
                // Pause all other videos when a video is clicked
                pauseAllVideos();
                // Play the selected video
                videoRefs.current[index].play();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryVideos;
