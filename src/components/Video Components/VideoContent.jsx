import React, { useState } from 'react';
import YouTube from 'react-youtube';

const VideoContent = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const options = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      playsinline: 1,
    },
  };

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
        <YouTube videoId={videoId} opts={options} className="w-full h-full" />
      )}
    </div>
  );
};

export default VideoContent;
