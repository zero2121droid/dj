import React from 'react';
import YouTube from 'react-youtube';

const VideoContent = ({ videoId }) => {
  const onReady = (event) => {
    // Optional: Pause the video when ready
    event.target.pauseVideo();
  };

  const onPlay = (event) => {
    console.log('Video is playing');
  };

  const onPause = (event) => {
    console.log('Video is paused');
  };

  const onEnd = (event) => {
    console.log('Video has ended');
  };

  return (
    <div className="video-container bg-gray-800 rounded-lg shadow-lg p-4">
      <YouTube
        videoId={videoId}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
        opts={{
          height: '390',
          width: '640',
          playerVars: {
            autoplay: 0, // Set to 1 for autoplay
          },
        }}
      />
    </div>
  );
};

export default VideoContent;
