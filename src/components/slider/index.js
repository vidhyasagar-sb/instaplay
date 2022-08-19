import React, { useEffect, useState } from "react";
import "./slider.scss";

import leftArrow from "../../assets/images/leftArrow.svg";
import rightArrow from "../../assets/images/rightArrow.svg";
import { useNavigate } from "react-router-dom";

const Slider = ({ movie }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    const firstSlide = slideIndex === 0;
    const newIndex = firstSlide ? movie.length - 1 : slideIndex - 1;
    setSlideIndex(newIndex);
  };
  const nextSlide = () => {
    const lastSlide = movie.length - 1 === slideIndex;
    const newIndex = lastSlide ? 0 : slideIndex + 1;
    setSlideIndex(newIndex);
  };

  // auto slide
  useEffect(() => {
    const autoSlider = setInterval(nextSlide, 3000);
    return () => {
      clearInterval(autoSlider);
    };
  }, [nextSlide]);

  const clickHandler = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="sliderContainer">
      <img
        className="leftArrow"
        src={leftArrow}
        alt="go back"
        onClick={prevSlide}
      />
      <img
        onClick={() => clickHandler(movie[slideIndex].id)}
        className="banner"
        src={`https://image.tmdb.org/t/p/original${movie[slideIndex].backdrop_path}`}
        alt={movie[slideIndex].title}
      />
      <img
        className="rightArrow"
        src={rightArrow}
        alt="go next"
        onClick={nextSlide}
      />
    </div>
  );
};

export default Slider;
