import React, { useState, useEffect, useRef } from "react";

const GalleryVideos = ({ videos }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // State to manage the current video in carousel
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

  // Pause all videos
  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  // Handle video navigation for small screens
  const nextVideo = () => {
    // Pause current video
    pauseAllVideos();

    // Move to the next video (looping)
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    // Pause current video
    pauseAllVideos();

    // Move to the previous video (looping)
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  // Handle video click for small screens
  const handleVideoClick = (index) => {
    // Pause all other videos when a video is clicked
    pauseAllVideos();

    // Play the selected video
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  return (
    <div className="px-4">
      <div className={isSmallScreen ? "relative" : "grid grid-cols-2 md:grid-cols-4 gap-4"}>
        {isSmallScreen ? (
          // Carousel for small screens
          <div className="relative w-full h-74">
            <video
              ref={(el) => (videoRefs.current[0] = el)} // Store video reference
              className="w-full h-full object-cover rounded-lg"
              src={videos[currentVideoIndex]}
              controls
              loading="lazy"
              poster={videos[currentVideoIndex]} // Display the first frame
              onClick={() => handleVideoClick(0)} // Pause and play the clicked video
            />
            {/* Left Navigation Button with DaisyUI styling */}
            <button
              onClick={prevVideo}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
            >
              &lt;
            </button>
            {/* Right Navigation Button with DaisyUI styling */}
            <button
              onClick={nextVideo}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
            >
              &gt;
            </button>
            {/* Play/Pause Button with DaisyUI styling */}
            <button
              onClick={() => {
                const video = videoRefs.current[0];
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl p-2 bg-black bg-opacity-50 rounded-full"
            >
              {videoRefs.current[0]?.paused ? "►" : "❚❚"}
            </button>
          </div>
        ) : (
          // Grid for larger screens
          videos.map((video, index) => (
            <div key={index} className="w-full h-74 relative">
              <video
                ref={(el) => (videoRefs.current[index] = el)} // Store video references
                className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 ease-in-out"
                src={video}
                controls
                loading="lazy"
                onClick={() => {
                  // Pause all other videos when a video is clicked
                  pauseAllVideos();
                  // Play the selected video
                  videoRefs.current[index].play();
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryVideos;
