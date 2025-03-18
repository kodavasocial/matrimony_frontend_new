import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const BannerCarousel = () => {
  const bannerImages = [
    '1.png',
    '2.jpg',
    '3.jpg',
    '4.png',
    '5.jpg',
  ];
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const preloadImages = () => {
      const images = [];
      bannerImages.forEach((image) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          images.push(img);
          if (images.length === bannerImages.length) {
            setPreloadedImages(images);
            setIsLoading(false);
          }
        };
      });
    };

    preloadImages();
  }, [bannerImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (index + 1) % bannerImages.length;
      setIndex(newIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [index, bannerImages.length]);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} pause={false}>
      {preloadedImages.map((image, idx) => (
        <Carousel.Item key={idx}>
          {isLoading && (
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Loading...
            </div>
          )}
          <img
            src={image.src}
            alt={`Slide ${idx}`}
            style={isLoading ? { display: 'none' } : {}}
          />
          <Carousel.Caption>
            <h3>{`Slide ${idx + 1} label`}</h3>
            <p>{`Description for Slide ${idx + 1}`}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;
