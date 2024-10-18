import React, { useState } from 'react';
import "./ImageSlider.css"
interface SlideImage {
  image: string;
  name: string;
}

const ImageSlider: React.FC<{ slides: SlideImage[] }> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };


  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };


  const sliderStyles = {
    width: '100%',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as 'relative',
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${slides[currentIndex].image})`,
  };

  return (
    <div className="slider">

      <button onClick={prevSlide} className="left-arrow">
        &#10094;
      </button>

      <div style={sliderStyles}>
        <div style={imageStyles}>
          <span className="image-name">{slides[currentIndex].name}</span>
        </div>
      </div>


      <button onClick={nextSlide} className="right-arrow">
        &#10095;
      </button>


      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
