import React from 'react';

const GalleryComponent = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery Item ${index + 1}`}
          className="rounded-lg"
        />
      ))}
    </div>
  );
};

export default GalleryComponent;