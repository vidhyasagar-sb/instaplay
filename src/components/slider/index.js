import React, { useState } from "react";
import "./slider.scss";

const Slider = ({ movie }) => {
  const [slideIndex, setSlideIndex] = useState(2);

  const prevSlide = () => {
    const firstSlide = slideIndex === 0;
    const newIndex = firstSlide ? movie.length - 1 : slideIndex - 1;
    setSlideIndex(newIndex);
  };
  const nextSlide = () => {
    const lastSlide = movie.length - 1;
    const newIndex = lastSlide ? 0 : slideIndex + 1;
    setSlideIndex(newIndex);
  };

  return (
    <div className="sliderContainer">
      <img
        className="banner"
        src={`https://image.tmdb.org/t/p/original${movie[slideIndex].backdrop_path}`}
        alt={movie[slideIndex].title}
      />
    </div>
  );
};

export default Slider;
