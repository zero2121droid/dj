import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";

const LazyVideo = ({ url }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Load once when in view
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="w-full aspect-w-17 aspect-h-10">
      {inView && <ReactPlayer url={url} controls width="100%" height="100%" />}
    </div>
  );
};

const VideoGallery = ({ videos }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {videos.map((video, index) => (
      <LazyVideo key={index} url={video} />
    ))}
  </div>
);

export default VideoGallery;
