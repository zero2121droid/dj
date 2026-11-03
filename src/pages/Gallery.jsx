import React from 'react';
import GalleryContent from '../components/Gallery Components/GalleryContent';
import heroImage from '../assets/resized/promo/ISP_0683.jpg';
import { PageHero } from '../components/Other Components/Motion';

const Gallery = () => {
  return (
    <div>
      <PageHero image={heroImage} eyebrow="Galerija" title="Pogledaj energiju" outline="uživo" />
      <GalleryContent />
    </div>
  );
};

export default Gallery;
