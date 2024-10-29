import React from "react";
import video from "../../assets/Deki Safari 3.mp4"

const boxCount = Array.apply(null, Array(100));

const Content = () => {
  return (
    <div id="content">
      <div className="hero">
      <video className="w-full" autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {boxCount.map((box, index) => (
        <div className="box" key={index} />
      ))}
      {/* <div className="hero">
        <img className="w-full" src="https://images.unsplash.com/photo-1566545455366-bcae28fd3929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1956&q=80" />
      </div>
      {boxCount.map((box, index) => (
        <div className="box" key={index} /> */}
      {/* ))} */}
    </div>
  );
};

export default Content;