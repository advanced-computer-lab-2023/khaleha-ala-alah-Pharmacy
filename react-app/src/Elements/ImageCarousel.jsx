import React, { useState } from "react";
import "../Elements/ImageCarousel.css";

const ImageCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <div className="slide-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={index === currentSlide ? "slide active" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={slide.image} alt="slide" />
                <div className="text-overlay">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="right-arrow">
        {">"}
      </button>
    </div>
  );
};

export default ImageCarousel;
