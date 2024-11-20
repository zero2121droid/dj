import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";

const YouTubeVisualizer = ({ videoId }) => {
    const canvasRef = useRef(null);
    const [playing, setPlaying] = useState(false);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const renderFrame = () => {
        const barCount = 30;
        const barWidth = canvas.width / barCount;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        for (let i = 0; i < barCount; i++) {
          const barHeight = playing ? Math.random() * canvas.height : 0;
          ctx.fillStyle = `rgb(${50 + i * 10}, 50, 150)`;
          ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
        }
  
        requestAnimationFrame(renderFrame);
      };
  
      renderFrame();
    }, [playing]);
  
    const onPlayerStateChange = (event) => {
      if (event.data === 1) {
        // Playing
        setPlaying(true);
      } else {
        // Paused or ended
        setPlaying(false);
      }
    };
  
    return (
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} className="w-full h-48 bg-black rounded-lg" />
        <YouTube
          videoId={videoId}
          opts={{
            playerVars: {
              autoplay: 0,
              controls: 1,
            },
          }}
          onStateChange={onPlayerStateChange}
        />
      </div>
    );
  };
  

export default YouTubeVisualizer;