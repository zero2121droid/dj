import React, { useState } from 'react';

const VideoContent = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&playsinline=1`;

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 relative">
      {!isPlaying ? (
        <div
          className="w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center relative"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
          }}
          onClick={handlePlay}
        >
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-5xl md:text-6xl lg:text-7xl p-4">             
              ▷
            </div>
          </div>
        </div>
      ) : (
        <div className="relative pb-[56.25%] w-full h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoContent;
